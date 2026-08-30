import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import {
  getProjectStatusLabel,
  StatusBadge,
} from "@/components/status-badge";
import { TechTag } from "@/components/tech-tag";
import { getProjectBySlug, projects } from "@/data/projects";
import { isInternalHref } from "@/lib/link";
import { isPendingValue } from "@/lib/pending";
import { absoluteUrl } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    ...createPageMetadata({
      title: project.title,
      description: project.description,
      pathname: `/projects/${project.slug}`,
      type: "article",
    }),
    title: project.title,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const publicTechnologies = project.technologies.filter(
    (technology) => !isPendingValue(technology),
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    author: {
      "@type": "Person",
      name: "黄柏霖",
    },
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Container className="case-study">
        <BackLink href="/projects" label="返回作品索引" />
        <header className="case-study__header">
          <div className="case-study__meta">
            <span>{project.category}</span>
            <StatusBadge status={project.status} />
            {isPendingValue(project.year) ? null : <span>{project.year}</span>}
          </div>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
          {project.github || project.demo || project.admin ? <div className="case-study__links">
            {project.github ? (
              <Button href={project.github} external variant="secondary">
                查看源码 <span aria-hidden="true">↗</span>
              </Button>
            ) : null}
            {project.admin ? (
              <Button href={project.admin} external variant="secondary">
                管理后台 <span aria-hidden="true">↗</span>
              </Button>
            ) : null}
            {project.demo ? (
              <Button
                href={project.demo}
                external={!isInternalHref(project.demo)}
                variant="primary"
              >
                在线演示 <span aria-hidden="true">{isInternalHref(project.demo) ? "→" : "↗"}</span>
              </Button>
            ) : null}
          </div> : null}
        </header>

        <div className="case-study__body">
          <aside className="case-study__rail">
            <div>
              <span>状态</span>
              <strong>{getProjectStatusLabel(project.status)}</strong>
            </div>
            <div>
              <span>项目类型</span>
              {project.tags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
            {publicTechnologies.length ? <div>
              <span>技术栈</span>
              <div className="tag-row">
                {publicTechnologies.map((technology) => (
                  <TechTag key={technology}>{technology}</TechTag>
                ))}
              </div>
            </div> : null}
          </aside>

          <article className="case-study__content">
            <CaseSection index="01" title="项目概览">
              <p>{project.background}</p>
            </CaseSection>
            <CaseSection index="02" title="要解决的问题">
              <p>{project.problem}</p>
            </CaseSection>
            <CaseSection index="03" title="方案与实现思路">
              <div className="challenge-list">
                {project.challenges.map((challenge) => (
                  <div key={challenge.problem}>
                    <p><strong>问题</strong>{challenge.problem}</p>
                    <p><strong>处理</strong>{challenge.solution}</p>
                  </div>
                ))}
              </div>
            </CaseSection>
            <CaseSection index="04" title="核心功能">
              <ul className="feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </CaseSection>
            <CaseSection index="05" title="系统架构与流程">
              <ol className="architecture-list">
                {project.architecture.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </CaseSection>
            <CaseSection index="06" title="我的工作">
              <ul>
                {project.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CaseSection>
            <CaseSection index="07" title="项目亮点">
              <ul>
                {project.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </CaseSection>
            {project.evidenceReady && project.gallery?.length ? (
              <CaseSection index="08" title="项目证据">
                <div className="case-gallery">
                  {project.gallery.map((image, index) => (
                    <figure key={image}>
                      <Image
                        src={image}
                        alt={`${project.title} 项目截图 ${index + 1}`}
                        width={1600}
                        height={1000}
                        sizes="(max-width: 768px) calc(100vw - 2rem), 680px"
                      />
                      <figcaption>项目截图 {String(index + 1).padStart(2, "0")}</figcaption>
                    </figure>
                  ))}
                </div>
              </CaseSection>
            ) : null}
            <CaseSection index="09" title="当前限制">
              <ul>
                {project.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CaseSection>
            <CaseSection index="10" title="后续计划">
              <ul>
                {project.nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CaseSection>
          </article>
        </div>
      </Container>
    </>
  );
}

function CaseSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="case-section">
      <div className="case-section__title">
        <span>{index}</span>
        <h2>{title}</h2>
      </div>
      <div className="case-section__content">{children}</div>
    </section>
  );
}
