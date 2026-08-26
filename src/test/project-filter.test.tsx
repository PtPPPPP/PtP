import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectFilter } from "@/components/project-filter";
import { projects, toProjectListItem } from "@/data/projects";

const projectItems = projects.map(toProjectListItem);

describe("项目筛选", () => {
  it("可以按关键词筛选项目", () => {
    render(<ProjectFilter projects={projectItems} />);

    fireEvent.change(screen.getByLabelText("搜索项目"), {
      target: { value: "FastAPI" },
    });

    expect(
      screen.getByRole("heading", { name: "Embodied Training Platform" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "SIGNAL-HUNT" }),
    ).not.toBeInTheDocument();
  });

  it("可以按分类筛选项目", () => {
    render(<ProjectFilter projects={projectItems} />);

    fireEvent.click(screen.getByRole("button", { name: "AIoT 与自动化" }));

    expect(
      screen.getByRole("heading", {
        name: "AIoT 智慧温室种植系统原型",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Finding Job" }),
    ).not.toBeInTheDocument();
  });
});
