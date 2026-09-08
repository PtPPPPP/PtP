import { chromium } from "playwright-core";
import fs from "node:fs";

const browserCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = browserCandidates.find((p) => fs.existsSync(p));
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext();
await context.route("**/*.mp4*", (r) => r.abort());
const page = await context.newPage();
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3010/experience", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll("*")) {
    const rect = el.getBoundingClientRect();
    if (el.scrollWidth > el.clientWidth + 1) {
      const cs = getComputedStyle(el);
      out.push({
        tag: el.tagName,
        cls: String(el.className).slice(0, 60),
        pos: cs.position,
        sw: el.scrollWidth, cw: el.clientWidth,


        text: (el.textContent ?? "").slice(0, 30),
      });
    }
  }
  return {
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    out,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
