import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// 把 finding_job（北京具身智能求职导航，Vite SPA）构建产物同步到静态导出的
// out/finding-jobs/ 目录，使其随博客一起部署到 /finding-jobs/ 子路径。
// 该 SPA 的 vite base 已固定为 "/finding-jobs/"（见 finding_job/vite.config.ts）。

const findingJobDir = path.resolve("../finding_job");
const distDir = path.join(findingJobDir, "dist");
const targetDir = path.resolve("out/finding-jobs");

if (!fs.existsSync(findingJobDir)) {
  console.warn(
    `[sync-finding-jobs] 未找到相邻目录 ${findingJobDir}，跳过 finding-jobs 同步；/finding-jobs/ 路由将不可用。`,
  );
  process.exit(0);
}

console.log("[sync-finding-jobs] 构建 finding_job ...");
execSync("npm run build", { cwd: findingJobDir, stdio: "inherit" });

if (!fs.existsSync(path.join(distDir, "index.html"))) {
  throw new Error("finding_job 构建完成但未生成 dist/index.html");
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.cpSync(distDir, targetDir, { recursive: true });

// /privacy、/terms 是 SPA 客户端路由，纯静态托管下直接访问会 404。
// 为它们各复制一份 index.html，让静态服务器（含 wrangler assets 的
// auto-trailing-slash）能直接命中，SPA 启动后再渲染对应页面。
for (const route of ["privacy", "terms"]) {
  const routeDir = path.join(targetDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(path.join(targetDir, "index.html"), path.join(routeDir, "index.html"));
}

console.log(`[sync-finding-jobs] 已同步到 ${path.relative(process.cwd(), targetDir)}/`);
