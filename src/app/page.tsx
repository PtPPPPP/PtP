import type { Metadata } from "next";
import Link from "next/link";
import { BlogList } from "@/components/blog-list";
import { ContactLinks } from "@/components/contact-links";
import { Container } from "@/components/container";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ImmersiveHero } from "@/components/immersive-hero";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { SkillMatrix } from "@/components/skill-matrix";
import { getPublicExperiences } from "@/data/experience";
import { profile } from "@/data/profile";
import {
  getFeaturedProjects,
  projects,
  toProjectListItem,
} from "@/data/projects";
import { getAllBlogPosts, toBlogListItem } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  description: profile.introduction,
  pathname: "/",
});

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().map(toProjectListItem);
  const latestPosts = getAllBlogPosts().slice(0, 3).map(toBlogListItem);
  const publicExperiences = getPublicExperiences();

  return (
    <>
      <ImmersiveHero />

      <section className="section section--projects">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="用完整项目，验证一个具体问题。"
            description="这里优先展示有明确场景、技术边界和个人工作的项目，而不是只列出技术名词。"
          />
          <ProjectGrid projects={featuredProjects} />
          <div className="section-action">
            <Link className="button button--secondary" href="/projects">
              查看全部 {projects.length} 个项目
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="section section--skills">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Capabilities"
            title="从界面到系统，保持可解释的连接。"
            description="技能不是独立清单，而是完成项目所需的不同层次。以下内容只基于已提供的项目技术与关注方向。"
          />
          <SkillMatrix />
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Experience"
            title="学习与实践，沿着真实问题展开。"
            description="这里只公开已经确认的信息，未确认的单位、职位与时间不会生成时间线节点。"
          />
          <ExperienceTimeline items={publicExperiences.slice(0, 4)} compact />
          <div className="section-action">
            <Link className="text-link" href="/experience">
              查看完整时间线 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="section section--notes">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Latest notes"
            title="记录过程，不只陈列结果。"
            description="正式文章发布后会显示在这里；样例与草稿不会进入生产页面。"
          />
          {latestPosts.length ? (
            <BlogList posts={latestPosts} />
          ) : (
            <p className="empty-note">正式文章正在整理，当前没有公开内容。</p>
          )}
          <div className="section-action">
            <Link className="button button--secondary" href="/blog">
              查看全部文章 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="section section--contact">
        <Container>
          <SectionHeading
            index="05"
            eyebrow="Contact"
            title="如果你正在做相近的事，欢迎交流。"
            description="当前公开入口为 GitHub、手机号与微信；未填写的联系方式不会显示。"
          />
          <ContactLinks />
          <div className="section-action">
            <Link className="button button--primary" href="/contact">
              前往联系页面 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
