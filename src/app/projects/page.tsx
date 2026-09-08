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
        title="项目作品"
        englishTitle="Projects"
        description="围绕自动化、智能系统与产品开发的个人项目。"
      />
      <ProjectFilter projects={projects.map(toProjectListItem)} />
    </Container>
  );
}
