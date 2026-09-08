// 响应式审计脚本：在全部要求档位截图 + 检测横向溢出。
// 用法：VISUAL_BASE_URL=http://localhost:3010 node scripts/responsive-audit.mjs
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright-core";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://localhost:3010";
const outputDirectory = path.resolve(
  process.env.VISUAL_OUTPUT_DIR ?? ".responsive-audit",
);
const browserCandidates = [
  process.env.BROWSER_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const executablePath = browserCandidates.find((candidate) =>
  fs.existsSync(candidate),
);
if (!executablePath) {
  throw new Error("没有找到可用的 Chrome/Edge。可以通过 BROWSER_PATH 指定浏览器路径。");
}

const routes = [
  "/",
  "/projects",
  "/projects/aiot-greenhouse",
  "/blog",
  "/blog/from-idea-to-mvp",
  "/experience",
  "/about",
  "/contact",
];
// 任务要求的十档宽度
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

fs.mkdirSync(outputDirectory, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });
// 单 context 复用缓存：外链 Hero 视频不会被每个档位重复下载
const context = await browser.newContext();
// 拦截外链 Hero 视频：绝对定位层，不影响布局审计；避免大 MP4 拖慢每档截图
await context.route(
  "**/*.mp4*",
  (route) => route.abort(),
);
const page = await context.newPage();

const problems = [];

for (const width of widths) {
  const height = width <= 430 ? 900 : width <= 1024 ? 1000 : 1080;
  await page.setViewportSize({ width, height });

  for (const route of routes) {
    try {
      // domcontentloaded：外链视频不阻塞 load，用固定 settle 时间代替
      await page.goto(`${baseUrl}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForTimeout(1200);
    } catch (error) {
      problems.push(`${width}px ${route} 加载失败：${error.message}`);
      continue;
    }

    try {
      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      if (layout.scrollWidth > layout.clientWidth + 1) {
        const offenders = await page.evaluate(() => {
          const viewportWidth = document.documentElement.clientWidth;
          const bad = [];
          for (const element of document.querySelectorAll("body *")) {
            const rect = element.getBoundingClientRect();
            if (rect.right > viewportWidth + 1 || rect.left < -1) {
              const style = getComputedStyle(element);
              if (style.position === "fixed") continue;
              bad.push(
                `${element.tagName.toLowerCase()}.${String(element.className).split(" ")[0]} right=${Math.round(rect.right)}`,
              );
              if (bad.length >= 5) break;
            }
          }
          return bad;
        });
        problems.push(
          `${width}px ${route} 横向溢出：scrollWidth=${layout.scrollWidth} > clientWidth=${layout.clientWidth}${offenders.length ? `（${offenders.join(" | ")}）` : ""}`,
        );
      }

      const dir = path.join(outputDirectory, String(width));
      fs.mkdirSync(dir, { recursive: true });
      const name =
        route === "/" ? "home" : route.replaceAll("/", "_").slice(1);
      await page.screenshot({
        path: path.join(dir, `${name}.png`),
        fullPage: true,
      });
    } catch (error) {
      problems.push(`${width}px ${route} 检查失败：${error.message}`);
    }
  }

  console.log(`${width}px 完成`);
}

await context.close();
await browser.close();

if (problems.length) {
  console.error("\n=== 发现问题 ===");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log("\n全部档位无横向溢出");
}
