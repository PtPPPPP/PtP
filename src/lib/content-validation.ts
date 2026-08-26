import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateProjectData(): string[] {
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const project of projects) {
    if (slugs.has(project.slug)) {
      errors.push(`重复项目 slug：${project.slug}`);
    }
    slugs.add(project.slug);

    if (!slugPattern.test(project.slug)) {
      errors.push(`项目 slug 格式无效：${project.slug}`);
    }

    const requiredValues = [
      project.title,
      project.subtitle,
      project.description,
      project.category,
      project.status,
      project.year,
      project.background,
      project.problem,
    ];
    if (requiredValues.some((value) => value.trim() === "")) {
      errors.push(`项目 ${project.slug} 存在空的必填字段`);
    }
    if (project.tags.length === 0 || project.technologies.length === 0) {
      errors.push(`项目 ${project.slug} 的标签或技术栈为空`);
    }
  }

  for (const item of navigation) {
    if (!item.href.startsWith("/")) {
      errors.push(`导航链接不是站内绝对路径：${item.href}`);
    }
  }

  return errors;
}
