import fs from "node:fs";
import path from "node:path";
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

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function getHeadings(content: string): BlogPost["headings"] {
  return content
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line);
      if (!match) return null;
      return {
        level: match[1].length,
        text: match[2].trim(),
        id: slugifyHeading(match[2]),
      };
    })
    .filter((heading): heading is BlogPost["headings"][number] =>
      Boolean(heading),
    );
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

export function getAllBlogPosts(options?: {
  includeDrafts?: boolean;
  includeUnpublished?: boolean;
}): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
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
    .filter((post) => {
      const includeUnpublished =
        options?.includeUnpublished ?? process.env.NODE_ENV !== "production";
      if (options?.includeDrafts) return true;
      if (post.draft) return false;
      return includeUnpublished || (post.published && !post.sample);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
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
