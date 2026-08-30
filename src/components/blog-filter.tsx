"use client";

import { useMemo } from "react";
import { BlogList } from "@/components/blog-list";
import { EmptyState } from "@/components/empty-state";
import { FilterControls } from "@/components/filter-controls";
import { matchesKeywordQuery } from "@/lib/filter";
import { useFilterSearchParams } from "@/lib/filter-search-params";
import type { BlogListItem } from "@/types/content";

export function BlogFilter({ posts }: { posts: BlogListItem[] }) {
  const categories = useMemo(
    () => ["全部", ...new Set(posts.map((post) => post.category))],
    [posts],
  );
  const { query, category, setQuery, setCategory } = useFilterSearchParams(
    categories,
    "全部",
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatches = category === "全部" || post.category === category;
      return (
        categoryMatches &&
        matchesKeywordQuery([post.title, post.description, ...post.tags], query)
      );
    });
  }, [category, posts, query]);

  return (
    <div>
      <FilterControls
        className="filter-panel filter-panel--blog"
        searchLabel="搜索文章"
        placeholder="标题、摘要或标签"
        query={query}
        onQueryChange={setQuery}
        categoriesAriaLabel="按分类筛选文章"
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
      >
        <p className="filter-count" aria-live="polite">
          显示 {filteredPosts.length} / {posts.length} 篇文章
        </p>
      </FilterControls>
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
