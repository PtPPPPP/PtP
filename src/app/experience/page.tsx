import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageIntro } from "@/components/page-intro";
import { getPublicExperiences } from "@/data/experience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "经历",
  description: "黄柏霖的教育、项目、社团与实践经历时间线。",
  pathname: "/experience",
});

export default function ExperiencePage() {
  return (
    <Container className="page-shell">
      <PageIntro
        title="学习与经历"
        englishTitle="Experience"
        description="教育背景与项目实践。"
      />
      <ExperienceTimeline items={getPublicExperiences()} />
    </Container>
  );
}
