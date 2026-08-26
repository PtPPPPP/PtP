"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { ProjectGrid } from "@/components/project-grid";
import { projectCategories } from "@/data/projects";
import type { ProjectCategory, ProjectListItem } from "@/types/content";

export function ProjectFilter({ projects }: { projects: ProjectListItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"全部" | ProjectCategory>("全部");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatches =
        category === "全部" || project.category === category;
      const text = [
        project.title,
        project.description,
        project.category,
        ...project.tags,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return categoryMatches && text.includes(normalizedQuery);
    });
  }, [category, projects, query]);

  return (
    <div>
      <div className="filter-panel">
        <label className="search-field">
          <span>搜索项目</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="名称、方向或技术"
          />
        </label>
        <div className="category-filter" aria-label="按分类筛选项目">
          {projectCategories.map((item) => (
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
        <p className="filter-count" aria-live="polite">
          显示 {filteredProjects.length} / {projects.length} 个项目
        </p>
      </div>
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
