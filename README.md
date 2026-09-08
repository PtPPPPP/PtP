# 黄柏霖的个人博客与作品集

面向实习、求职、项目展示和学习记录的个人网站。使用 Next.js App Router、严格 TypeScript、本地数据文件和 Markdown 构建。

视觉方向是以编辑排版为主的技术作品集：冷白背景、石墨黑主项目版面、单一功能蓝。首页依次呈现双语姓名与身份、四个精选项目、学习方向与记录、联系方式；技能矩阵保留在关于页。

排版规则集中在 `src/app/globals.css`。全站共享最大 1248px 内容宽度、740px 阅读栏与统一边距；项目按编号、标题、说明形成非对称网格。中文姓名与内页标题使用常规字重，英文姓名和页名负责主要尺度对比。首个精选项目使用黑底文字版面，不制造项目封面。项目详情取消重复侧栏，事实、技术栈和当前限制继续保留。

768px 及以下重排身份和项目内容，520px 及以下重新组织主项目与联系方式。筛选采用文字与下划线；保留搜索、URL 状态、键盘导航、移动菜单焦点管理和减少动态效果设置。所有页面共享导航和署名页脚，不加载背景视频。

## 本地运行

环境要求：Node.js 20.9 或更高版本，npm 10 或更高版本。

```bash
npm install
copy .env.example .env.local
npm run dev
```

浏览器访问 `http://localhost:3000`。

生产检查与构建：

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

浏览器冒烟与响应式检查（需要先启动一个服务，如 `npm run dev`，并在 `.responsive-audit/` 输出 10 档宽度 × 全部页面的截图与横向溢出报告）：

```bash
npm run visual:check  # scripts/visual-smoke.mjs，全路由状态码 + 390/768/1024/1440 截图与交互检查
npm run audit:responsive   # scripts/responsive-audit.mjs，320–1920 十档宽度截图 + 溢出检测
```

项目使用静态导出（`output: "export"`），`npm run build` 生成 `out/` 目录，直接部署静态资源即可，不需要启动 Node 服务。

## 内容结构

```text
content/blog/              Markdown 文章
public/                    favicon 等静态资源（新增项目图片时创建 images/projects/）
src/app/                   页面、SEO 路由与全局样式
src/components/            可复用界面组件
src/data/                  个人、项目、经历、技能、导航与联系数据
src/lib/                   Markdown 读取、站点 URL 与数据校验
src/types/                 公共内容类型
src/test/                  单元测试与关键页面渲染测试
```

## 新增项目

1. 在 `src/data/projects.ts` 的 `projects` 数组中新增一个完整对象。
2. `slug` 使用唯一的小写英文和连字符，例如 `robot-vision-demo`。
3. `cover` 与 `gallery` 是可选字段：有真实封面或截图时放入 `public/images/projects/` 并填写路径；没有时留空，页面会自动切换为无图片的档案式布局，不要使用占位图。
4. 没有 GitHub 或在线演示时，把字段保持为 `null`，页面不会生成假链接。
5. 运行 `npm run test`，数据完整性测试会检查 slug 和必填字段。

项目详情页、SEO 元数据和 sitemap 会根据数据自动生成，不需要新建页面。

## 新增博客文章

在 `content/blog/` 新建 `.md` 文件，文件名会成为文章 slug。需要包含以下 frontmatter：

```yaml
---
title: "文章标题"
description: "文章摘要"
date: "2026-07-31"
updated: "2026-07-31"
tags:
  - "标签"
category: "文章分类"
draft: false
sample: false
published: true
---
```

`cover` 是可选字段；省略时文章列表与详情页不显示封面图。

正文支持标题、列表、引用、代码块、表格和图片。二级、三级标题会自动进入目录。开发环境可以预览样例内容；生产环境只公开同时满足 `draft: false`、`sample: false`、`published: true` 的文章。

## 修改个人信息

- `src/data/profile.ts`：姓名、身份、介绍、方向和目标
- `src/data/experience.ts`：教育、项目、社团和实践时间线
- `src/data/skills.ts`：技能分类
- `src/data/contact.ts`：邮箱、GitHub 与社交平台
- `src/data/navigation.ts`：导航

当前联系方式、部分项目时间、技术栈、链接与真实截图仍标记为待补充。填写真实信息后再公开部署。

## 环境变量与部署

复制 `.env.example` 为 `.env.local`，把 `NEXT_PUBLIC_SITE_URL` 改成最终 HTTPS 域名。它用于 canonical URL、sitemap 和结构化数据；生产构建缺失、使用 `example.com`、本机地址或 HTTP 时会直接失败。`NEXT_PUBLIC_SIGNAL_HUNT_URL` 可选，未配置时使用正式地址 `https://lottery.berl1n.xyz`；该变量只用于开发环境覆盖到本机服务。`NEXT_PUBLIC_STDM_URL` 采用相同规则，未配置时使用 `https://stdm.berl1n.xyz`。

项目使用 `output: "export"` 静态导出，部署在 Cloudflare Workers（静态资源托管）。部署命令：

```bash
npm run deploy        # next build + wrangler deploy
npm run deploy:preview  # 本地用 wrangler 预览生产构建
```

域名与路由配置在 `wrangler.jsonc`（当前绑定 `berl1n.xyz` 与 `www.berl1n.xyz`）。首次使用需要 `npx wrangler login` 登录 Cloudflare 账号。
