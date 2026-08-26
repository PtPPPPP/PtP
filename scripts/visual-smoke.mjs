import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:3010";
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

fs.mkdirSync(outputDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage();

try {
  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: "networkidle",
    });
    if (!response || response.status() !== 200) {
      throw new Error(`${route} 返回 ${response?.status() ?? "无响应"}`);
    }
  }

  const missingResponse = await page.goto(
    `${baseUrl}/projects/not-a-real-project`,
    { waitUntil: "networkidle" },
  );
  if (missingResponse?.status() !== 404) {
    throw new Error(
      `不存在的项目应返回 404，实际为 ${missingResponse?.status() ?? "无响应"}`,
    );
  }

  const missingBlogResponse = await page.goto(`${baseUrl}/blog/not-a-real-post`, {
    waitUntil: "networkidle",
  });
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
      waitUntil: "networkidle",
    });
    const layout = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    if (layout.scrollWidth > layout.clientWidth + 1) {
      throw new Error(
        `${viewport.viewportName}px ${viewport.route} 存在横向溢出：${layout.scrollWidth}px > ${layout.clientWidth}px`,
      );
    }
    await page.screenshot({
      path: path.join(
        outputDirectory,
        `${viewport.routeName}-${viewport.viewportName}.png`,
      ),
      fullPage: false,
    });
    if (viewport.viewportName === "390" && viewport.route === "/") {
      await page
        .locator('summary[aria-label="打开导航菜单"]')
        .click();
      const mobileNavigation = page.getByRole("navigation", {
        name: "移动端主导航",
      });
      if (!(await mobileNavigation.isVisible())) {
        throw new Error("390px 移动端导航无法打开");
      }
    }
    console.log(
      `${viewport.viewportName}px ${viewport.route}：通过，无横向溢出（${layout.clientWidth}px）`,
    );
  }

  console.log(`页面状态：${routes.length} 个 200，2 个预期 404`);
} finally {
  await browser.close();
}
