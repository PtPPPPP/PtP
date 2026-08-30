import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/project-card";
import { projects, toProjectListItem } from "@/data/projects";

function projectBySlug(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`测试项目不存在：${slug}`);
  return toProjectListItem(project);
}

describe("项目体验链接", () => {
  it("站内 Demo 在当前标签页打开", () => {
    render(<ProjectCard project={projectBySlug("finding-job")} index={0} />);

    const demoLink = screen.getByRole("link", { name: /在线体验/ });
    expect(demoLink).toHaveAttribute("href", "/finding-jobs");
    expect(demoLink).not.toHaveAttribute("target");
  });

  it("外部 Demo 在新标签页安全打开", () => {
    render(<ProjectCard project={projectBySlug("signal-hunt")} index={0} />);

    const demoLink = screen.getByRole("link", { name: /在线体验/ });
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
