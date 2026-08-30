"use client";

import { useCallback, useSyncExternalStore } from "react";

const filterSearchParamsEvent = "filter-search-params-change";

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(filterSearchParamsEvent, onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(filterSearchParamsEvent, onStoreChange);
  };
}

function getSnapshot(): string {
  return window.location.search;
}

function getServerSnapshot(): string {
  return "";
}

function replaceSearchParam(
  key: "q" | "category",
  value: string,
  defaultValue = "",
): void {
  const url = new URL(window.location.href);
  if (!value || value === defaultValue) {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }

  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${url.search}${url.hash}`,
  );
  window.dispatchEvent(new Event(filterSearchParamsEvent));
}

export function useFilterSearchParams<TCategory extends string>(
  categories: readonly TCategory[],
  defaultCategory: TCategory,
) {
  const search = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const params = new URLSearchParams(search);
  const query = params.get("q") ?? "";
  const categoryParam = params.get("category");
  const category = categories.includes(categoryParam as TCategory)
    ? (categoryParam as TCategory)
    : defaultCategory;

  const setQuery = useCallback((value: string) => {
    replaceSearchParam("q", value);
  }, []);
  const setCategory = useCallback(
    (value: TCategory) => {
      replaceSearchParam("category", value, defaultCategory);
    },
    [defaultCategory],
  );

  return { query, category, setQuery, setCategory };
}
