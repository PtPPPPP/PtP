import Link from "next/link";
import { getProjectStatusLabel } from "@/lib/project-status";
import { isInternalHref } from "@/lib/link";
import { isPendingValue } from "@/lib/pending";
import type { ProjectListItem } from "@/types/content";

export function ProjectCard({
  project,
  variant = "full",
  number,
}: {
  project: ProjectListItem;
  variant?: "featured" | "full";
  number?: number;
}) {
  const publicTechnologies = project.technologies.filter(
    (technology) => !isPendingValue(technology),
  );
  const hasYear = !isPendingValue(project.year);
  const meta = [
    project.category,
    getProjectStatusLabel(project.status),
    hasYear ? project.year : null,
  ].filter(Boolean);

  return (
    <article
      className={`project-card${variant === "featured" && number === 1 ? " project-card--lead" : ""}`}
    >
      {number ? (
        <span className="project-card__number" aria-hidden="true">
          {String(number).padStart(2, "0")}
        </span>
      ) : null}
      <div className="project-card__body">
        <p className="project-card__meta">
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-card__description">{project.description}</p>
        {publicTechnologies.length ? (
          <div className="project-card__stack">
            {publicTechnologies.slice(0, 6).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        ) : null}
        {project.demo ? (
          <div className="project-card__actions">
            {isInternalHref(project.demo) ? (
              <Link className="text-link" href={project.demo}>
                在线体验 <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <a
                className="text-link"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                在线体验 <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}
