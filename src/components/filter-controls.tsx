"use client";

import type { ReactNode } from "react";

type FilterControlsProps<TCategory extends string> = {
  searchLabel: string;
  placeholder: string;
  query: string;
  onQueryChange: (value: string) => void;
  categoriesAriaLabel: string;
  categories: readonly TCategory[];
  category: TCategory;
  onCategoryChange: (value: TCategory) => void;
  className?: string;
  children?: ReactNode;
};

export function FilterControls<TCategory extends string>({
  searchLabel,
  placeholder,
  query,
  onQueryChange,
  categoriesAriaLabel,
  categories,
  category,
  onCategoryChange,
  className = "filter-panel",
  children,
}: FilterControlsProps<TCategory>) {
  return (
    <div className={className}>
      <label className="search-field">
        <span>{searchLabel}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
        />
      </label>
      <div className="category-filter" aria-label={categoriesAriaLabel}>
        {categories.map((item) => (
          <button
            className={category === item ? "is-active" : ""}
            type="button"
            aria-pressed={category === item}
            onClick={() => onCategoryChange(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
