import { describe, expect, it } from "vitest";
import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as blogMetadata } from "@/app/blog/page";
import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as projectsMetadata } from "@/app/projects/page";

describe("页面级 metadata", () => {
  it.each([
    ["/projects", projectsMetadata],
    ["/blog", blogMetadata],
    ["/about", aboutMetadata],
    ["/contact", contactMetadata],
  ])("%s 使用自己的 canonical、Open Graph 与 Twitter 标题", (pathname, metadata) => {
    expect(metadata.alternates?.canonical).toBe(pathname);
    expect(metadata.openGraph?.url).toBe(pathname);
    expect(metadata.openGraph?.title).not.toBeUndefined();
    expect(metadata.twitter?.title).not.toBeUndefined();
    expect(metadata.openGraph?.url).not.toBe("/");
  });
});
