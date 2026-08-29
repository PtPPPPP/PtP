"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/button";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function SiteNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  const isCurrentRoute = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const menuLinks = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
      );
      const focusableElements = menuButtonRef.current
        ? [menuButtonRef.current, ...menuLinks]
        : menuLinks;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // 同一 Header，仅 background / foreground / border 可因 variant 不同。
  // 菜单打开时导航切换为亮色场景（fixed + 白底黑字）：Logo 成为菜单的品牌锚点，
  // 关闭按钮也始终留在视口内（否则首页滚动后打开菜单会够不到关闭按钮）。
  const sceneClass = mobileMenuOpen
    ? "fixed inset-x-0 top-0 bg-paper text-ink"
    : isHome
      ? "absolute inset-x-0 top-0 text-white"
      : "relative border-b border-hairline bg-paper text-ink";
  const linkClass = isHome
    ? "text-white/80 transition-colors duration-150 hover:text-white"
    : "text-ink-soft transition-colors duration-150 hover:text-ink";

  return (
    <>
      <nav
        className={`z-50 py-5 transition-colors duration-300 ${sceneClass}`}
        aria-label={isHome ? "首屏导航" : "主导航"}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight sm:text-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              {profile.englishName}
            </Link>
            <div className="ml-10 hidden items-center gap-8 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm ${linkClass}`}
                  aria-current={isCurrentRoute(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Button
            href="/contact"
            variant="primary"
            tone={isHome ? "inverse" : "default"}
            className="hidden md:inline-flex"
          >
            联系我
          </Button>
          <button
            type="button"
            ref={menuButtonRef}
            className="relative z-50 flex h-10 w-10 items-center justify-center active:scale-90 md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu
              size={22}
              className={`absolute transition-all duration-300 ${
                mobileMenuOpen
                  ? "rotate-90 scale-75 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              size={22}
              className={`absolute transition-all duration-300 ${
                mobileMenuOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-75 opacity-0"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — 全站统一同一套 */}
      <div
        id="mobile-navigation"
        ref={mobileMenuRef}
        data-testid="mobile-menu"
        className={`fixed inset-x-0 top-0 z-40 h-screen w-full bg-paper transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        <div
          className={`container flex h-full flex-col justify-center transition-all delay-100 duration-500 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-4 text-3xl font-medium text-ink transition-colors duration-150 hover:text-ink-soft"
              aria-current={isCurrentRoute(item.href) ? "page" : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button
            href="/contact"
            className="mt-6 w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            联系我
          </Button>
        </div>
      </div>
    </>
  );
}
