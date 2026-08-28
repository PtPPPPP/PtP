import Link from "next/link";
import { getProjectStatusLabel } from "@/components/status-badge";
import type { ProjectListItem } from "@/types/content";

export function ProjectCard({
  project,
  index,
  variant = "full",
}: {
  project: ProjectListItem;
  index: number;
  variant?: "featured" | "full";
}) {
  const publicTechnologies = project.technologies.filter(
    (technology) => !technology.includes("待补充"),
  );
  const hasYear = !project.year.includes("待补充");
  const meta = [
    project.category,
    getProjectStatusLabel(project.status),
    hasYear ? project.year : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="project-card">
      <div className="project-card__number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="project-card__body">
        <p className="project-card__meta">{meta}</p>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.description}</p>
        {variant === "full" && publicTechnologies.length ? (
          <p className="project-card__stack">
            {publicTechnologies.slice(0, 6).join(" · ")}
          </p>
        ) : null}
        <div className="project-card__actions">
          <Link className="text-link" href={`/projects/${project.slug}`}>
            查看项目 <span aria-hidden="true">→</span>
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
    </article>
  );
}
