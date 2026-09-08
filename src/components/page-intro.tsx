import type { ReactNode } from "react";

export function PageIntro({
  title,
  description,
  englishTitle,
  children,
}: {
  title: string;
  description: string;
  englishTitle?: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-intro">
      <div className="page-intro__title">
        <h1>{title}</h1>
        {englishTitle ? <p lang="en">{englishTitle}</p> : null}
      </div>
      <div className="page-intro__summary">
        <p className="page-intro__lead">{description}</p>
        {children}
      </div>
    </header>
  );
}
