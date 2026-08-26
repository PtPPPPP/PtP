import Link from "next/link";
import type { BlogListItem } from "@/types/content";

export function BlogCard({
  post,
  index,
}: {
  post: BlogListItem;
  index: number;
}) {
  return (
    <article className="blog-card">
      <div className="blog-card__meta">
        <span>NOTE {String(index + 1).padStart(2, "0")}</span>
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
        <div className="blog-card__footer">
          <div className="tag-row" aria-label="文章标签">
            {post.tags.map((tag) => (
              <span className="tech-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <Link className="text-link" href={`/blog/${post.slug}`}>
            阅读文章 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
