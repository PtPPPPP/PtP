import type { ExperienceItem } from "@/types/content";

export function ExperienceTimeline({
  items,
  compact = false,
}: {
  items: ExperienceItem[];
  compact?: boolean;
}) {
  return (
    <ol className={`timeline ${compact ? "timeline--compact" : ""}`}>
      {items.map((item) => (
        <li key={item.id}>
          <div className="timeline__marker" aria-hidden="true" />
          <div className="timeline__period">
            <span>{item.type}</span>
            <p>{item.period}</p>
          </div>
          <div className="timeline__content">
            <p className="timeline__organization">{item.organization}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.pending ? (
              <span className="pending-label">部分信息待补充</span>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
