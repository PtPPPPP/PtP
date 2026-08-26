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
        index="02"
        eyebrow="Experience"
        title="成长不是一条填满的时间线。"
        description="这里记录教育、项目和实践过程。没有被确认的单位、职位与时间会保持空缺，等真实信息补充后再更新。"
      />
      <ExperienceTimeline items={getPublicExperiences()} />
    </Container>
  );
}
