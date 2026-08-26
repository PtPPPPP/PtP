import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { ProjectFilter } from "@/components/project-filter";
import { projects, toProjectListItem } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "作品",
  description: "黄柏霖的技术项目、产品原型与交互作品。",
  pathname: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container className="page-shell">
      <PageIntro
        index="01"
        eyebrow="Project index"
        title="作品不是终点，验证才是。"
        description="按方向、技术或关键词浏览项目。每个项目档案都明确说明当前状态、个人工作与已知限制。"
      />
      <ProjectFilter projects={projects.map(toProjectListItem)} />
    </Container>
  );
}
