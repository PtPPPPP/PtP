import type { Metadata } from "next";
import { ContactLinks } from "@/components/contact-links";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { SkillMatrix } from "@/components/skill-matrix";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "关于",
  description: "关于黄柏霖的技术兴趣、学习方式、项目方法与当前目标。",
  pathname: "/about",
});

const principles = [
  {
    index: "01",
    title: "从真实问题开始",
    description:
      "先明确对象、场景和限制，再决定技术方案。一个可验证的小闭环，比没有边界的功能清单更有价值。",
  },
  {
    index: "02",
    title: "让系统可以解释",
    description:
      "不仅展示结果，也记录数据从哪里来、状态如何变化、哪些部分仍是模拟或待验证。",
  },
  {
    index: "03",
    title: "用完整交付检验学习",
    description:
      "把算法或想法放进可运行的项目，补齐界面、接口、测试、文档与部署，才能看到真正的工程问题。",
  },
];

export default function AboutPage() {
  return (
    <Container className="page-shell about-page">
      <PageIntro
        index="04"
        eyebrow="About"
        title="在自动化与软件之间，建立自己的工程坐标。"
        description={profile.introduction}
      />
      <section className="about-statement">
        <p>Current direction</p>
        <h2>{profile.goal}</h2>
      </section>
      <section className="about-section">
        <div className="about-section__label">项目与学习方法</div>
        <div className="principle-list">
          {principles.map((principle) => (
            <article key={principle.index}>
              <span>{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-section">
        <div className="about-section__label">技能与兴趣</div>
        <SkillMatrix />
      </section>
      <section className="about-section">
        <div className="about-section__label">公开联系入口</div>
        <ContactLinks />
      </section>
    </Container>
  );
}
