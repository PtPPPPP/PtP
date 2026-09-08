import type { Metadata } from "next";
import Link from "next/link";
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
    title: "明确问题",
    description: "先明确使用场景和限制，再选择技术方案。",
  },
  {
    index: "02",
    title: "记录过程",
    description: "记录数据来源、实现过程和仍待验证的部分。",
  },
  {
    index: "03",
    title: "完成交付",
    description: "通过可运行的项目，练习界面、接口、测试与部署。",
  },
];

export default function AboutPage() {
  return (
    <Container className="page-shell about-page">
      <PageIntro
        title="关于我"
        englishTitle="About"
        description={`${profile.role}。${profile.introduction}`}
      />
      <section className="about-statement">
        <h2>当前方向</h2>
        <p>{profile.goal}</p>
      </section>
      <section className="about-section">
        <h2 className="about-section__label">项目与学习方法</h2>
        <div className="principle-list">
          {principles.map((principle) => (
            <article key={principle.index}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-section">
        <h2 className="about-section__label">技能与方向</h2>
        <SkillMatrix />
      </section>
      <div className="section-action">
        <Link className="text-link" href="/experience">
          学习与经历 <span aria-hidden="true">→</span>
        </Link>
        <Link className="text-link" href="/contact">
          联系我 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Container>
  );
}
