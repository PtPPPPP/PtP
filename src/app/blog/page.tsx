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
        title="学习记录"
        englishTitle="Notes"
        description="记录项目中的技术选择、实践过程与学习笔记。"
      />
      <BlogFilter posts={posts} />
    </Container>
  );
}
