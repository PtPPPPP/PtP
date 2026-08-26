import type { ProjectStatus } from "@/types/content";

const statusLabels: Record<ProjectStatus, string> = {
  concept: "概念",
  "in-progress": "进行中",
  mvp: "MVP",
  completed: "已完成",
  maintained: "持续维护",
  archived: "已归档",
  "pending-details": "资料整理中",
};

export function getProjectStatusLabel(status: ProjectStatus): string {
  return statusLabels[status];
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="status-badge">
      <i aria-hidden="true" />
      {getProjectStatusLabel(status)}
    </span>
  );
}
