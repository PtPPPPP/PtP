import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { TechTag } from "@/components/tech-tag";
import type { ProjectListItem } from "@/types/content";

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectListItem;
  index: number;
}) {
  return (
    <article className="project-card">
      <div className="project-card__number" aria-hidden="true">
        <span>PROJECT</span>
        <strong>{String(index + 1).padStart(2, "0")}</strong>
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.category}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.description}</p>
        <div className="tag-row" aria-label="技术栈">
          {project.technologies
            .filter((technology) => !technology.includes("待补充"))
            .slice(0, 4)
            .map((technology) => (
            <TechTag key={technology}>{technology}</TechTag>
          ))}
        </div>
        <Link className="text-link" href={`/projects/${project.slug}`}>
          查看项目档案 <span aria-hidden="true">→</span>
        </Link>
      </div>
      <Link
        className="project-card__media"
        href={`/projects/${project.slug}`}
        aria-label={`查看项目：${project.title}`}
      >
        <Image
          src={project.cover}
          alt={`${project.title} 项目封面占位图，非真实项目截图`}
          width={1200}
          height={750}
          sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1200px) 36vw, 420px"
        />
      </Link>
    </article>
  );
}
