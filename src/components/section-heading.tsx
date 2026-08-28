export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading__meta">
        <span className="section-heading__index" aria-hidden="true">
          {index}
        </span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
