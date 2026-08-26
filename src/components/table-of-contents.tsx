import type { BlogPost } from "@/types/content";

export function TableOfContents({
  headings,
}: {
  headings: BlogPost["headings"];
}) {
  return (
    <nav className="toc" aria-label="文章目录">
      <p>本页目录</p>
      <ol>
        {headings.map((heading) => (
          <li
            className={heading.level === 3 ? "toc__nested" : ""}
            key={`${heading.id}-${heading.text}`}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
