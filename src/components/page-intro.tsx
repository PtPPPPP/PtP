export function PageIntro({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro">
      <div className="page-intro__meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
