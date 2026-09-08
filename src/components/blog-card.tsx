import Link from "next/link";
import type { BlogListItem } from "@/types/content";

export function BlogCard({ post }: { post: BlogListItem }) {
  return (
    <article className="blog-card">
      <div className="blog-card__meta">
        <time dateTime={post.date}>{post.date}</time>
        <span>{post.category}</span>
        <span>{post.readingTime}</span>
      </div>
      <div className="blog-card__main">
        <div className="blog-card__copy">
          {post.sample ? <span className="sample-label">示例文章</span> : null}
          <h3>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p>{post.description}</p>
        </div>
      </div>
    </article>
  );
}
