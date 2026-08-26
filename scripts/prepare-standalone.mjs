import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standaloneDirectory = path.join(root, ".next", "standalone");

if (!existsSync(standaloneDirectory)) {
  console.log("未检测到 .next/standalone（静态导出模式），跳过 standalone 资源准备。");
  process.exit(0);
}

const assets = [
  [path.join(root, "public"), path.join(standaloneDirectory, "public")],
  [
    path.join(root, ".next", "static"),
    path.join(standaloneDirectory, ".next", "static"),
  ],
];

for (const [source, destination] of assets) {
  if (!existsSync(source)) continue;
  mkdirSync(path.dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
}

console.log("Standalone 运行资源已准备完成。");
