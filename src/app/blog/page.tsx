import type { Metadata } from "next";
import { BlogFilter } from "@/components/blog-filter";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { getAllBlogPosts, toBlogListItem } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "文章",
  description: "关于 AIoT、具身智能、产品工程与学习过程的技术笔记。",
  pathname: "/blog",
});

export default function BlogPage() {
  const posts = getAllBlogPosts().map(toBlogListItem);

  return (
    <Container className="page-shell">
      <PageIntro
        index="03"
        eyebrow="Notes & essays"
        title="把思考过程写下来。"
        description="文章用于记录项目取舍、技术学习和实践方法。未正式发布的样例与草稿只在开发环境预览。"
      />
      <BlogFilter posts={posts} />
    </Container>
  );
}
