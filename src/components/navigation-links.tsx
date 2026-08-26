"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";

export function NavigationLinks({ numbered = false }: { numbered?: boolean }) {
  const pathname = usePathname();

  return navigation.map((item, index) => {
    const isCurrent =
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
    return (
      <Link
        href={item.href}
        aria-current={isCurrent ? "page" : undefined}
        key={item.href}
      >
        {numbered ? <span>{String(index + 1).padStart(2, "0")}</span> : null}
        {item.label}
      </Link>
    );
  });
}
