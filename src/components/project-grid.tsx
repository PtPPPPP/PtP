import { ProjectCard } from "@/components/project-card";
import type { ProjectListItem } from "@/types/content";

export function ProjectGrid({
  projects,
  variant = "full",
}: {
  projects: ProjectListItem[];
  variant?: "featured" | "full";
}) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard
          project={project}
          index={index}
          variant={variant}
          key={project.slug}
        />
      ))}
    </div>
  );
}
