import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://localhost:3010";
const outputDirectory = path.resolve(
  process.env.VISUAL_OUTPUT_DIR ?? ".visual-checks",
);
const browserCandidates = [
  process.env.BROWSER_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const executablePath = browserCandidates.find((candidate) =>
  fs.existsSync(candidate),
);

if (!executablePath) {
  throw new Error(
    "没有找到可用的 Chrome/Edge。可以通过 BROWSER_PATH 指定浏览器路径。",
  );
}

const routes = [
  "/",
  "/projects",
  "/projects/aiot-greenhouse",
  "/experience",
  "/blog",
  "/blog/from-idea-to-mvp",
  "/about",
  "/contact",
  "/robots.txt",
  "/sitemap.xml",
];
const visualRoutes = [
  { name: "home", route: "/" },
  { name: "projects", route: "/projects" },
  { name: "project-detail", route: "/projects/aiot-greenhouse" },
  { name: "experience", route: "/experience" },
  { name: "blog", route: "/blog" },
  { name: "blog-detail", route: "/blog/from-idea-to-mvp" },
  { name: "about", route: "/about" },
  { name: "contact", route: "/contact" },
];
const viewportSizes = [
  { name: "1440", width: 1440, height: 1000 },
  { name: "1024", width: 1024, height: 900 },
  { name: "768", width: 768, height: 900 },
  { name: "390", width: 390, height: 844 },
];
const viewports = viewportSizes.flatMap((viewport) =>
  visualRoutes.map((route) => ({
    viewportName: viewport.name,
    routeName: route.name,
    width: viewport.width,
    height: viewport.height,
    route: route.route,
  })),
);

async function waitForStableVisualState(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });

  const hero = page.locator(".hero-display");
  if (await hero.count()) {
    await page.waitForFunction(() => {
      const heading = document.querySelector(".hero-display");
      const lead = document.querySelector(".hero-lead");
      const cta = document.querySelector(".hero-lead + .button");
      const video = document.querySelector("video");
      return (
        heading &&
        lead &&
        cta &&
        Number.parseFloat(getComputedStyle(heading).opacity) >= 0.99 &&
        Number.parseFloat(getComputedStyle(lead).opacity) >= 0.99 &&
        Number.parseFloat(getComputedStyle(cta).opacity) >= 0.99 &&
        video instanceof HTMLVideoElement &&
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
      );
    });
  }
}

async function findCjkHeadingWrapProblems(page) {
  return page.evaluate(() => {
    const segmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });
    const closingPunctuation = "，。！？；：、）】》";
    const problems = [];

    for (const heading of document.querySelectorAll("h1, h2, h3")) {
      const range = document.createRange();
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const characters = [];
      let text = "";
      let textNode = walker.nextNode();

      while (textNode) {
        for (let index = 0; index < textNode.textContent.length; index += 1) {
          range.setStart(textNode, index);
          range.setEnd(textNode, index + 1);
          text += textNode.textContent[index];
          characters.push({
            character: textNode.textContent[index],
            y: Math.round(range.getBoundingClientRect().y),
          });
        }
        textNode = walker.nextNode();
      }

      for (const segment of segmenter.segment(text)) {
        if (!segment.isWordLike || !/[\p{Script=Han}]/u.test(segment.segment)) {
          continue;
        }
        const linePositions = new Set(
          characters
            .slice(segment.index, segment.index + segment.segment.length)
            .filter(({ character }) => character.trim())
            .map(({ y }) => y),
        );
        if (linePositions.size > 1) {
          problems.push(`词组“${segment.segment}”被拆行`);
        }
      }

      for (let index = 1; index < characters.length; index += 1) {
        const current = characters[index];
        let previousIndex = index - 1;
        while (
          previousIndex >= 0 &&
          !characters[previousIndex].character.trim()
        ) {
          previousIndex -= 1;
        }
        if (
          previousIndex >= 0 &&
          closingPunctuation.includes(current.character) &&
          current.y !== characters[previousIndex].y
        ) {
          problems.push(`标点“${current.character}”位于行首`);
        }
      }
    }

    return problems;
  });
}

fs.mkdirSync(outputDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage();

try {
  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: "load",
      timeout: 60000,
    });
    if (!response || response.status() !== 200) {
      throw new Error(`${route} 返回 ${response?.status() ?? "无响应"}`);
    }
  }

  const missingResponse = await page.goto(
    `${baseUrl}/projects/not-a-real-project`,
    { waitUntil: "load", timeout: 60000 },
  );
  if (missingResponse?.status() !== 404) {
    throw new Error(
      `不存在的项目应返回 404，实际为 ${missingResponse?.status() ?? "无响应"}`,
    );
  }

  const missingBlogResponse = await page.goto(
    `${baseUrl}/blog/not-a-real-post`,
    {
      waitUntil: "load",
      timeout: 60000,
    },
  );
  if (missingBlogResponse?.status() !== 404) {
    throw new Error(
      `不存在的文章应返回 404，实际为 ${missingBlogResponse?.status() ?? "无响应"}`,
    );
  }

  for (const viewport of viewports) {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.goto(`${baseUrl}${viewport.route}`, {
      waitUntil: "load",
      timeout: 60000,
    });
    await waitForStableVisualState(page);
    const layout = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    if (layout.scrollWidth > layout.clientWidth + 1) {
      throw new Error(
        `${viewport.viewportName}px ${viewport.route} 存在横向溢出：${layout.scrollWidth}px > ${layout.clientWidth}px`,
      );
    }
    if (viewport.viewportName === "390") {
      const headingWrapProblems = await findCjkHeadingWrapProblems(page);
      if (headingWrapProblems.length) {
        throw new Error(
          `390px ${viewport.route} 中文标题断行异常：${headingWrapProblems.join("；")}`,
        );
      }
    }
    await page.screenshot({
      path: path.join(
        outputDirectory,
        `${viewport.routeName}-${viewport.viewportName}.png`,
      ),
      fullPage: false,
    });
    if (
      viewport.viewportName === "390" &&
      (viewport.route === "/" || viewport.route === "/projects")
    ) {
      const openMenuButton = page.locator('button[aria-label="打开导航菜单"]');
      const mobileMenu = page.locator("[data-testid='mobile-menu']");
      const closedMenuIsInert = await mobileMenu.evaluate(
        (element) => element.inert,
      );
      if (!closedMenuIsInert) {
        throw new Error(`390px ${viewport.route} 关闭的移动菜单仍可聚焦`);
      }

      await openMenuButton.focus();
      await page.keyboard.press("Tab");
      const focusEnteredClosedMenu = await page.evaluate(() =>
        Boolean(document.activeElement?.closest("[data-testid='mobile-menu']")),
      );
      if (focusEnteredClosedMenu) {
        throw new Error(`390px ${viewport.route} 键盘进入了隐藏菜单`);
      }

      await openMenuButton.focus();
      await openMenuButton.click();
      await page.waitForTimeout(900);
      const overlayOpen = await page.evaluate(() => {
        const overlay = document.querySelector("[data-testid='mobile-menu']");
        return overlay ? getComputedStyle(overlay).opacity === "1" : false;
      });
      if (!overlayOpen) {
        throw new Error(`390px ${viewport.route} 移动菜单无法打开`);
      }

      await page.keyboard.press("Shift+Tab");
      const shiftTabStayedInMenu = await page.evaluate(() => {
        const activeElement = document.activeElement;
        return (
          activeElement?.closest("[data-testid='mobile-menu']") !== null &&
          activeElement?.textContent?.trim() === "联系我"
        );
      });
      if (!shiftTabStayedInMenu) {
        throw new Error(`390px ${viewport.route} 移动菜单反向焦点循环失败`);
      }

      await page.keyboard.press("Tab");
      const tabReturnedToCloseButton = await page.evaluate(
        () =>
          document.activeElement?.getAttribute("aria-label") === "关闭导航菜单",
      );
      if (!tabReturnedToCloseButton) {
        throw new Error(`390px ${viewport.route} 移动菜单正向焦点循环失败`);
      }

      await page.keyboard.press("Escape");
      await page.waitForTimeout(600);
      const keyboardCloseState = await page.evaluate(() => {
        const overlay = document.querySelector("[data-testid='mobile-menu']");
        const activeElement = document.activeElement;
        return {
          hidden: overlay?.getAttribute("aria-hidden") === "true",
          inert: overlay instanceof HTMLElement && overlay.inert,
          focusReturned:
            activeElement?.getAttribute("aria-label") === "打开导航菜单",
        };
      });
      if (
        !keyboardCloseState.hidden ||
        !keyboardCloseState.inert ||
        !keyboardCloseState.focusReturned
      ) {
        throw new Error(`390px ${viewport.route} Escape 关闭或焦点返回失败`);
      }
    }
    if (viewport.viewportName === "390" && viewport.route === "/projects") {
      const searchInput = page.getByRole("searchbox", { name: "搜索项目" });
      await searchInput.fill("FastAPI");
      await page.waitForTimeout(100);
      if (new URL(page.url()).searchParams.get("q") !== "FastAPI") {
        throw new Error("项目筛选没有同步到 URL");
      }

      await page
        .getByRole("link", { name: "Embodied Training Platform" })
        .click();
      await page.waitForURL("**/projects/embodied-training-platform");
      await page.goBack();
      await page.waitForURL(
        (url) =>
          url.pathname === "/projects" &&
          url.searchParams.get("q") === "FastAPI",
      );
      if ((await searchInput.inputValue()) !== "FastAPI") {
        throw new Error("从项目详情返回后没有恢复筛选状态");
      }
      await searchInput.fill("");
    }
    if (viewport.viewportName === "390" && viewport.route === "/blog") {
      const searchInput = page.getByRole("searchbox", { name: "搜索文章" });
      await searchInput.fill("MVP");
      await page.waitForTimeout(100);
      const resultCount = page.locator(".filter-count");
      if (
        (await resultCount.getAttribute("aria-live")) !== "polite" ||
        !(await resultCount.innerText()).startsWith("显示 1 /") ||
        new URL(page.url()).searchParams.get("q") !== "MVP"
      ) {
        throw new Error("博客筛选结果反馈或 URL 同步失败");
      }
      await searchInput.fill("");
    }
    if (viewport.viewportName === "1440" && viewport.route === "/") {
      await page.evaluate(() => window.scrollTo(0, window.innerHeight));
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(outputDirectory, "home-scroll-1440.png"),
        fullPage: false,
      });
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    console.log(
      `${viewport.viewportName}px ${viewport.route}：通过，无横向溢出（${layout.clientWidth}px）`,
    );
  }

  console.log(`页面状态：${routes.length} 个 200，2 个预期 404`);
} finally {
  await browser.close();
}
