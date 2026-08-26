import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { BackLink } from "@/components/back-link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const baseMetadata = createPageMetadata({
    title: post.title,
    description: post.description,
    pathname: `/blog/${post.slug}`,
    type: "article",
  });
  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const postIndex = posts.findIndex((item) => item.slug === slug);
  const post = posts[postIndex];
  if (!post) notFound();

  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Person", name: "黄柏霖" },
    url: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: "zh-CN",
  };

  return (
    <>
      <ReadingProgress />
      <JsonLd data={structuredData} />
      <Container className="article-shell">
        <BackLink href="/blog" label="返回文章列表" />
        <header className="article-header">
          <div className="article-header__meta">
            <span>{post.category}</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>更新于 {post.updated}</span>
            <span>{post.readingTime}</span>
            {post.sample ? <strong>示例文章</strong> : null}
          </div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="tag-row">
            {post.tags.map((tag) => (
              <span className="tech-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div className="article-layout">
          <aside>
            <TableOfContents headings={post.headings} />
          </aside>
          <article className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeHighlight]}
              components={{
                img: ({ src, alt }) =>
                  typeof src === "string" ? (
                    <Image
                      src={src}
                      alt={alt ?? ""}
                      width={1200}
                      height={675}
                      sizes="(max-width: 768px) calc(100vw - 2rem), 720px"
                    />
                  ) : null,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </div>
        <nav className="article-pagination" aria-label="上一篇与下一篇文章">
          <div>
            <span>上一篇</span>
            {previousPost ? (
              <Link href={`/blog/${previousPost.slug}`}>
                {previousPost.title}
              </Link>
            ) : (
              <p>没有更早的文章</p>
            )}
          </div>
          <div>
            <span>下一篇</span>
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`}>{nextPost.title}</Link>
            ) : (
              <p>没有更新的文章</p>
            )}
          </div>
        </nav>
      </Container>
    </>
  );
}
