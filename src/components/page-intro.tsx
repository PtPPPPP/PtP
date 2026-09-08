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
      <div className="page-intro__body">
        <div>
          {englishTitle ? (
            <p className="page-intro__english" lang="en">
              {englishTitle}
            </p>
          ) : null}
          <h1>{title}</h1>
        </div>
        <div className="page-intro__summary">
          <p className="page-intro__lead">{description}</p>
          {children}
        </div>
      </div>
    </header>
  );
}
