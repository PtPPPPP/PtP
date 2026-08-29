import { describe, expect, it } from "vitest";
import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as blogMetadata } from "@/app/blog/page";
import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as projectsMetadata } from "@/app/projects/page";
import sitemap from "@/app/sitemap";

describe("页面级 metadata", () => {
  it.each([
    ["/projects", projectsMetadata],
    ["/blog", blogMetadata],
    ["/about", aboutMetadata],
    ["/contact", contactMetadata],
  ])(
    "%s 使用自己的 canonical、Open Graph 与 Twitter 标题",
    (pathname, metadata) => {
      expect(metadata.alternates?.canonical).toBe(pathname);
      expect(metadata.openGraph?.url).toBe(pathname);
      expect(metadata.openGraph?.title).not.toBeUndefined();
      expect(metadata.twitter?.title).not.toBeUndefined();
      expect(metadata.openGraph?.url).not.toBe("/");
    },
  );

  it("sitemap 只为有真实更新时间的文章提供 lastModified", () => {
    const entries = sitemap();
    const projectEntry = entries.find((entry) =>
      entry.url.endsWith("/projects/aiot-greenhouse"),
    );
    const blogEntry = entries.find((entry) =>
      entry.url.endsWith("/blog/from-idea-to-mvp"),
    );

    expect(projectEntry?.lastModified).toBeUndefined();
    expect(blogEntry?.lastModified).toEqual(new Date("2026-07-12"));
  });
});
