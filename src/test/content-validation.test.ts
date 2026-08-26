import { describe, expect, it } from "vitest";
import { navigation } from "@/data/navigation";
import {
  getFeaturedProjects,
  getProjectBySlug,
  projects,
} from "@/data/projects";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { validateProjectData } from "@/lib/content-validation";

describe("内容数据", () => {
  it("项目 slug 唯一且必填字段完整", () => {
    expect(validateProjectData()).toEqual([]);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(
      projects.length,
    );
  });

  it("可以按 slug 读取项目，不存在的 slug 返回 undefined", () => {
    expect(getProjectBySlug("aiot-greenhouse")?.title).toContain("智慧温室");
    expect(getProjectBySlug("not-a-project")).toBeUndefined();
  });

  it("首页有精选项目可渲染", () => {
    const featuredProjects = getFeaturedProjects();
    expect(featuredProjects.length).toBeGreaterThan(0);
    expect(featuredProjects.every((project) => project.featured)).toBe(true);
  });

  it("Markdown 文章可以读取并生成目录", () => {
    const posts = getAllBlogPosts({ includeUnpublished: true });
    expect(posts.length).toBeGreaterThanOrEqual(4);
    expect(posts.every((post) => post.content.length > 0)).toBe(true);
    expect(posts.every((post) => post.headings.length > 0)).toBe(true);
    expect(
      getBlogPostBySlug("designing-aiot-greenhouse", {
        includeUnpublished: true,
      })?.sample,
    ).toBe(true);
    expect(
      getAllBlogPosts({ includeUnpublished: false }).every(
        (post) => post.published && !post.sample && !post.draft,
      ),
    ).toBe(true);
  });

  it("导航链接使用有效站内路径", () => {
    expect(navigation.every((item) => item.href.startsWith("/"))).toBe(true);
    expect(new Set(navigation.map((item) => item.href)).size).toBe(
      navigation.length,
    );
  });
});
