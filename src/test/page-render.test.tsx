import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import { SiteNav } from "@/components/site-nav";
import { projects } from "@/data/projects";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("关键页面渲染", () => {
  it("首页显示身份、精选项目和可到达的作品入口", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "黄柏霖" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "查看我的作品" })).toHaveAttribute(
      "href",
      "#selected-work",
    );
    expect(screen.getByRole("region", { name: "精选项目" })).toHaveAttribute(
      "id",
      "selected-work",
    );
    expect(
      screen.getByText("北京信息科技大学自动化专业学生"),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "联系我" })).toBeInTheDocument();
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
    const menuButton = screen.getByRole("button", { name: "打开导航菜单" });
    const mobileMenu = screen.getByTestId("mobile-menu");

    expect(menuButton).toHaveAttribute("aria-controls", "mobile-navigation");
    expect(mobileMenu).toHaveAttribute("inert");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(mobileMenu).not.toHaveAttribute("inert");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(mobileMenu).toHaveAttribute("inert");
    expect(menuButton).toHaveFocus();
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
