import Link from "next/link";
import {
  getProjectStatusLabel,
  StatusBadge,
} from "@/components/status-badge";
import { TechTag } from "@/components/tech-tag";
import type { ProjectListItem } from "@/types/content";

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectListItem;
  index: number;
}) {
  const publicTechnologies = project.technologies.filter(
    (technology) => !technology.includes("待补充"),
  );
  const hasYear = !project.year.includes("待补充");

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
        {publicTechnologies.length ? (
          <div className="tag-row" aria-label="技术栈">
            {publicTechnologies.slice(0, 4).map((technology) => (
              <TechTag key={technology}>{technology}</TechTag>
            ))}
          </div>
        ) : null}
        <div className="project-card__actions">
          <Link className="text-link" href={`/projects/${project.slug}`}>
            查看项目档案 <span aria-hidden="true">→</span>
          </Link>
          {project.demo ? (
            <a
              className="text-link"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              在线体验 <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
      <dl className="project-card__facts" aria-label="项目档案信息">
        <div>
          <dt>Category</dt>
          <dd>{project.category}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{getProjectStatusLabel(project.status)}</dd>
        </div>
        {publicTechnologies.length ? (
          <div>
            <dt>Stack</dt>
            <dd>
              <ul>
                {publicTechnologies.slice(0, 4).map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
        {hasYear ? (
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
