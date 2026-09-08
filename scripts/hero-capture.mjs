// Hero 实景截图（含视频）与移动菜单打开态
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const outputDirectory = path.resolve(".responsive-audit/hero");
fs.mkdirSync(outputDirectory, { recursive: true });
const browserCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = browserCandidates.find((candidate) =>
  fs.existsSync(candidate),
);
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext();
const page = await context.newPage();

// 首页加载（等待视频真正有帧）
for (const [name, width, height] of [
  ["hero-1440", 1440, 900],
  ["hero-390", 390, 844],
]) {
  await page.setViewportSize({ width, height });
  await page.goto("http://localhost:3010/", { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  try {
    await page.waitForFunction(
      () => {
        const video = document.querySelector("video");
        return video && video.readyState >= 2;
      },
      { timeout: 45000 },
    );
  } catch {}
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(outputDirectory, `${name}.png`) });
  console.log(`${name} done, video readyState:`, await page.evaluate(() => document.querySelector("video")?.readyState));
}

// 移动菜单打开态
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3010/about", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(800);
await page.click('button[aria-label="打开导航菜单"]');
await page.waitForTimeout(900);
await page.screenshot({ path: path.join(outputDirectory, "mobile-menu-390.png") });
console.log("mobile menu done");

// 平板 768 hero
await page.setViewportSize({ width: 768, height: 1024 });
await page.goto("http://localhost:3010/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: path.join(outputDirectory, "hero-768.png") });
console.log("hero-768 done");

await browser.close();
