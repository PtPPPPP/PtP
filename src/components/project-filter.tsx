"use client";

import { useMemo } from "react";
import { EmptyState } from "@/components/empty-state";
import { FilterControls } from "@/components/filter-controls";
import { ProjectGrid } from "@/components/project-grid";
import { projectCategories } from "@/data/projects";
import { matchesKeywordQuery } from "@/lib/filter";
import { useFilterSearchParams } from "@/lib/filter-search-params";
import type { ProjectCategory, ProjectListItem } from "@/types/content";

export function ProjectFilter({ projects }: { projects: ProjectListItem[] }) {
  const { query, category, setQuery, setCategory } = useFilterSearchParams<
    "全部" | ProjectCategory
  >(projectCategories, "全部");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatches =
        category === "全部" || project.category === category;
      const fields = [
        project.title,
        project.description,
        project.category,
        ...project.tags,
        ...project.technologies,
      ];
      return categoryMatches && matchesKeywordQuery(fields, query);
    });
  }, [category, projects, query]);

  return (
    <div>
      <FilterControls
        searchLabel="搜索项目"
        placeholder="名称、方向或技术"
        query={query}
        onQueryChange={setQuery}
        categoriesAriaLabel="按分类筛选项目"
        categories={projectCategories}
        category={category}
        onCategoryChange={setCategory}
      >
        <p className="filter-count" aria-live="polite">
          显示 {filteredProjects.length} / {projects.length} 个项目
        </p>
      </FilterControls>
      {filteredProjects.length ? (
        <ProjectGrid projects={filteredProjects} />
      ) : (
        <EmptyState
          title="没有匹配的项目"
          description="试试更短的关键词，或切换到其他分类。"
        />
      )}
    </div>
  );
}
