import type { Metadata } from "next";
import Link from "next/link";
import { ContactLinks } from "@/components/contact-links";
import { Container } from "@/components/container";
import { HomeIntro } from "@/components/home-intro";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/data/profile";
import {
  getFeaturedProjects,
  projects,
  toProjectListItem,
} from "@/data/projects";
import { getAllBlogPosts } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  description: profile.introduction,
  pathname: "/",
});

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().map(toProjectListItem);
  const latestPosts = getAllBlogPosts().slice(0, 2);

  return (
    <Container className="page-shell home-page">
      <HomeIntro />
      <section
        id="selected-work"
        className="home-work"
        aria-labelledby="work-heading"
      >
        <div className="home-work__heading">
          <SectionHeading id="work-heading" title="精选项目" />
          <span>
            Selected work / {String(featuredProjects.length).padStart(2, "0")}
          </span>
        </div>
        <ProjectGrid projects={featuredProjects} variant="featured" />
        <div className="section-action">
          <Link className="text-link" href="/projects">
            查看全部 {projects.length} 个项目 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <div className="home-support">
        <section className="home-direction" aria-labelledby="direction-heading">
          <h2 id="direction-heading">学习与方向</h2>
          <p className="home-direction__statement">{profile.headline}</p>
          <p>{profile.goal}</p>
          <div className="section-action">
            <Link className="text-link" href="/about">
              关于我 <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href="/experience">
              学习与经历 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        <section aria-labelledby="notes-heading">
          <h2 id="notes-heading">最近记录</h2>
          {latestPosts.length ? (
            <ul className="home-notes">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <div className="home-notes__meta">
                    <time dateTime={post.date}>{post.date}</time>
                    {post.sample ? <span>示例文章</span> : null}
                  </div>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-note">暂无公开文章。</p>
          )}
          <div className="section-action">
            <Link className="text-link" href="/blog">
              全部记录 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
      <section className="home-contact" aria-labelledby="contact-heading">
        <SectionHeading
          id="contact-heading"

          title="联系我"
          description="欢迎交流项目、技术与实习机会。"
        />
        <ContactLinks />
      </section>
    </Container>
  );
}
