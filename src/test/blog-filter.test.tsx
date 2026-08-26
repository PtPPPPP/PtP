import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogFilter } from "@/components/blog-filter";
import { getAllBlogPosts, toBlogListItem } from "@/lib/content";

const posts = getAllBlogPosts({ includeUnpublished: true }).map(toBlogListItem);

describe("文章筛选", () => {
  it("可以按关键词筛选轻量文章数据", () => {
    render(<BlogFilter posts={posts} />);

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
  });
});
