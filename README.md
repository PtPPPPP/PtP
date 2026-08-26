# 黄柏霖的个人博客与作品集

面向实习、求职、项目展示和学习记录的个人网站。首页优先展示作品与经历，博客作为过程记录补充。项目使用 Next.js App Router、严格 TypeScript、本地数据文件和 Markdown 构建，可部署到支持 Node.js 的托管平台。

## 本地运行

环境要求：Node.js 20.9 或更高版本，npm 10 或更高版本。

```bash
npm install
copy .env.example .env.local
npm run dev
```

浏览器访问 `http://localhost:3000`。

生产检查与运行：

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run start
```

构建完成后，`postbuild` 会把 `public` 与静态资源复制到 standalone 目录；`npm run start` 再启动 `.next/standalone/server.js`。需要修改端口时先设置 `PORT` 环境变量；Windows PowerShell 示例：

```powershell
$env:PORT=3010
npm run start
```

## 内容结构

```text
content/blog/              Markdown 文章
public/images/             本地图片和当前占位图
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
3. 把封面和截图放进 `public/images/projects/`，并更新 `cover` 与 `gallery`。
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
cover: "/images/blog/cover.svg"
---
```

正文支持标题、列表、引用、代码块、表格和图片。二级、三级标题会自动进入目录。开发环境可以预览样例内容；生产环境只公开同时满足 `draft: false`、`sample: false`、`published: true` 的文章。

## 修改个人信息

- `src/data/profile.ts`：姓名、身份、介绍、方向和目标
- `src/data/experience.ts`：教育、项目、社团和实践时间线
- `src/data/skills.ts`：技能分类
- `src/data/contact.ts`：邮箱、GitHub 与社交平台
- `src/data/navigation.ts`：导航

当前联系方式、部分项目时间、技术栈、链接与真实截图仍标记为待补充。填写真实信息后再公开部署。

## 环境变量与部署

复制 `.env.example` 为 `.env.local`，把 `NEXT_PUBLIC_SITE_URL` 改成最终域名。它用于 canonical URL、sitemap 和结构化数据。

项目使用 `output: "standalone"`，可以部署到支持 Next.js/Node.js 的平台。部署前必须把 `NEXT_PUBLIC_SITE_URL` 设置为正式域名并运行 `npm run build`；缺少正式域名时构建会输出明确警告，且不会把 localhost 写入公开 SEO URL。
