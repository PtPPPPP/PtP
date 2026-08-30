import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogFilter } from "@/components/blog-filter";
import { getAllBlogPosts, toBlogListItem } from "@/lib/content";

const posts = getAllBlogPosts({ includeUnpublished: true }).map(toBlogListItem);

describe("文章筛选", () => {
  it("可以按关键词筛选轻量文章数据", () => {
    render(<BlogFilter posts={posts} />);

    expect(
      screen.getByText(`显示 ${posts.length} / ${posts.length} 篇文章`),
    ).toHaveAttribute("aria-live", "polite");

    fireEvent.change(screen.getByLabelText("搜索文章"), {
      target: { value: "AIoT" },
    });

    expect(
      screen.getByRole("heading", {
        name: "我如何设计一个 AIoT 智慧温室演示系统",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: "从二维仿真开始学习具身智能",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(`显示 1 / ${posts.length} 篇文章`),
    ).toBeInTheDocument();
    expect(new URLSearchParams(window.location.search).get("q")).toBe("AIoT");
  });

  it("从 URL 恢复文章筛选状态", () => {
    window.history.replaceState(null, "", "/blog?q=MVP&category=方法记录");

    render(<BlogFilter posts={posts} />);

    expect(screen.getByLabelText("搜索文章")).toHaveValue("MVP");
    expect(screen.getByRole("button", { name: "方法记录" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("heading", {
        name: "一个个人项目从想法到 MVP 的过程",
      }),
    ).toBeInTheDocument();
  });
});
