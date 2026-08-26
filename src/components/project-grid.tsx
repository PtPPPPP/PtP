import { ProjectCard } from "@/components/project-card";
import type { ProjectListItem } from "@/types/content";

export function ProjectGrid({ projects }: { projects: ProjectListItem[] }) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard project={project} index={index} key={project.slug} />
      ))}
    </div>
  );
}
