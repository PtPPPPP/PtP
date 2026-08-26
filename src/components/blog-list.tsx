import { BlogCard } from "@/components/blog-card";
import type { BlogListItem } from "@/types/content";

export function BlogList({ posts }: { posts: BlogListItem[] }) {
  return (
    <div className="blog-list">
      {posts.map((post, index) => (
        <BlogCard post={post} index={index} key={post.slug} />
      ))}
    </div>
  );
}
