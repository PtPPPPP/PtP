import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import { SiteNav } from "@/components/site-nav";
import { projects } from "@/data/projects";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("关键页面渲染", () => {
  it("首页渲染沉浸式 Hero 和精选项目", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /连接起来/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "查看我的作品" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "AIoT 智慧温室种植系统原型",
      }),
    ).toBeInTheDocument();
  });

  it("共享导航渲染 Logo、链接与移动端开关", () => {
    render(<SiteNav />);

    expect(
      screen.getByRole("link", { name: "Huang Bolin" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "联系我" }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("button", { name: "打开导航菜单" }),
    ).toBeInTheDocument();
  });

  it("项目列表渲染全部项目", () => {
    render(<ProjectsPage />);

    for (const project of projects) {
      expect(
        screen.getByRole("heading", { name: project.title }),
      ).toBeInTheDocument();
    }
  });
});
