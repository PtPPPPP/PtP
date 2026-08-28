import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  /** primary = 主要动作；secondary = 次级动作 */
  variant?: "primary" | "secondary";
  /** inverse = 暗色场景（首页 Hero / overlay 导航）下的主按钮反白，规格与 default 一致 */
  tone?: "default" | "inverse";
  /** 外链时新窗口打开 */
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  tone = "default",
  external = false,
  className = "",
}: ButtonProps) {
  const classes = [
    "button",
    `button--${variant}`,
    tone === "inverse" ? "button--inverse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
