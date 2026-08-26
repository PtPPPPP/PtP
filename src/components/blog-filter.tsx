"use client";

import { useMemo, useState } from "react";
import { BlogList } from "@/components/blog-list";
import { EmptyState } from "@/components/empty-state";
import type { BlogListItem } from "@/types/content";

export function BlogFilter({ posts }: { posts: BlogListItem[] }) {
  const categories = ["全部", ...new Set(posts.map((post) => post.category))];
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const categoryMatches =
        category === "全部" || post.category === category;
      const content = [post.title, post.description, ...post.tags]
        .join(" ")
        .toLowerCase();
      return categoryMatches && content.includes(normalizedQuery);
    });
  }, [category, posts, query]);

  return (
    <div>
      <div className="filter-panel filter-panel--blog">
        <label className="search-field">
          <span>搜索文章</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="标题、摘要或标签"
          />
        </label>
        <div className="category-filter" aria-label="按分类筛选文章">
          {categories.map((item) => (
            <button
              className={category === item ? "is-active" : ""}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {filteredPosts.length ? (
        <BlogList posts={filteredPosts} />
      ) : (
        <EmptyState
          title="没有匹配的文章"
          description="换一个关键词或分类再试试。"
        />
      )}
    </div>
  );
}
