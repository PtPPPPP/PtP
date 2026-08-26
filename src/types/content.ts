export type ProjectStatus =
  | "concept"
  | "in-progress"
  | "mvp"
  | "completed"
  | "maintained"
  | "archived"
  | "pending-details";

export type ProjectCategory =
  | "AI 与计算机视觉"
  | "具身智能与机器人"
  | "AIoT 与自动化"
  | "Web 与产品开发"
  | "交互与视觉设计";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  evidenceReady: boolean;
  year: string;
  github: string | null;
  demo: string | null;
  admin?: string | null;
  cover?: string;
  gallery?: string[];
  background: string;
  problem: string;
  features: string[];
  architecture: string[];
  responsibilities: string[];
  highlights: string[];
  challenges: Array<{ problem: string; solution: string }>;
  nextSteps: string[];
  limitations: string[];
}

export type ProjectListItem = Pick<
  Project,
  | "slug"
  | "title"
  | "description"
  | "category"
  | "tags"
  | "technologies"
  | "status"
  | "year"
  | "demo"
>;

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updated: string;
  tags: string[];
  category: string;
  draft: boolean;
  sample: boolean;
  published: boolean;
  cover?: string;
}

export type BlogListItem = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "description"
  | "date"
  | "tags"
  | "category"
  | "sample"
  | "cover"
  | "readingTime"
>;

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
  headings: Array<{ id: string; text: string; level: number }>;
}

export interface ExperienceItem {
  id: string;
  period: string;
  type: "教育" | "项目" | "社团" | "实践";
  title: string;
  organization: string;
  description: string;
  pending?: boolean;
}
