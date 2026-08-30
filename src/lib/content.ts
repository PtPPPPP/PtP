import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import type {
  BlogFrontmatter,
  BlogListItem,
  BlogPost,
} from "@/types/content";

const blogDirectory = path.join(process.cwd(), "content", "blog");

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isIsoDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function validateFrontmatter(
  value: Record<string, unknown>,
  filename: string,
): BlogFrontmatter {
  const requiredStrings = [
    "title",
    "description",
    "date",
    "updated",
    "category",
  ] as const;

  for (const key of requiredStrings) {
    if (typeof value[key] !== "string" || value[key].trim() === "") {
      throw new Error(`${filename} 的 ${key} 必须是非空字符串`);
    }
  }

  if (!isStringArray(value.tags) || value.tags.length === 0) {
    throw new Error(`${filename} 的 tags 必须是非空字符串数组`);
  }

  if (
    typeof value.draft !== "boolean" ||
    typeof value.sample !== "boolean" ||
    typeof value.published !== "boolean"
  ) {
    throw new Error(`${filename} 的 draft、sample 与 published 必须是布尔值`);
  }

  for (const key of ["date", "updated"] as const) {
    if (!isIsoDateString(value[key] as string)) {
      throw new Error(`${filename} 的 ${key} 必须是 YYYY-MM-DD 格式`);
    }
  }

  return {
    title: value.title as string,
    description: value.description as string,
    date: value.date as string,
    updated: value.updated as string,
    tags: value.tags,
    category: value.category as string,
    draft: value.draft,
    sample: value.sample,
    published: value.published,
    cover:
      typeof value.cover === "string" && value.cover.trim() !== ""
        ? value.cover
        : undefined,
  };
}

function getHeadings(content: string): BlogPost["headings"] {
  // 与页面渲染端 rehype-slug（github-slugger）使用同一套锚点算法，
  // 保证目录链接 id 与实际标题 id 一致（含重复标题的 -1 后缀）；
  // fenced code block 里的 # 注释不能当成标题。
  const slugger = new GithubSlugger();
  const headings: BlogPost["headings"] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const text = match[2].trim();
    headings.push({ level: match[1].length, text, id: slugger.slug(text) });
  }

  return headings;
}

function getReadingTime(content: string): string {
  const chineseCharacters = content.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const latinWords =
    content
      .replace(/[\u4e00-\u9fff]/g, " ")
      .match(/[A-Za-z0-9]+/g)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil((chineseCharacters + latinWords) / 350));
  return `${minutes} 分钟`;
}

// 模块级缓存：构建期 generateStaticParams / generateMetadata / page 会重复调用，
// 避免每次调用都重读目录并重新解析所有 Markdown。
let cachedAllPosts: BlogPost[] | null = null;

function readAllBlogPosts(): BlogPost[] {
  if (cachedAllPosts) return cachedAllPosts;

  if (!fs.existsSync(blogDirectory)) {
    cachedAllPosts = [];
    return cachedAllPosts;
  }

  cachedAllPosts = fs
    .readdirSync(blogDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(blogDirectory, filename), "utf8");
      const parsed = matter(source);
      const frontmatter = validateFrontmatter(parsed.data, filename);

      return {
        slug,
        ...frontmatter,
        content: parsed.content,
        readingTime: getReadingTime(parsed.content),
        headings: getHeadings(parsed.content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return cachedAllPosts;
}

export function getAllBlogPosts(options?: {
  includeDrafts?: boolean;
  includeUnpublished?: boolean;
}): BlogPost[] {
  return readAllBlogPosts().filter((post) => {
    const includeUnpublished =
      options?.includeUnpublished ?? process.env.NODE_ENV !== "production";
    if (options?.includeDrafts) return true;
    if (post.draft) return false;
    return includeUnpublished || (post.published && !post.sample);
  });
}

export function getBlogPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean; includeUnpublished?: boolean },
): BlogPost | undefined {
  return getAllBlogPosts(options).find((post) => post.slug === slug);
}

export function toBlogListItem(post: BlogPost): BlogListItem {
  const {
    slug,
    title,
    description,
    date,
    tags,
    category,
    sample,
    cover,
    readingTime,
  } = post;
  return {
    slug,
    title,
    description,
    date,
    tags,
    category,
    sample,
    cover,
    readingTime,
  };
}
