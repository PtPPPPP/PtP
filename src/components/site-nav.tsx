"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function SiteNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // 菜单打开时固定导航，让关闭按钮始终可见。
  const sceneClass = mobileMenuOpen
    ? "fixed inset-x-0 top-0 bg-paper text-ink"
    : "relative bg-paper text-ink";
  const linkClass =
    "text-ink-soft transition-colors duration-150 hover:text-ink";

  return (
    <>
      <nav
        className={`site-nav z-50 transition-colors duration-150 ${sceneClass}`}
        aria-label="主导航"
      >
        <Container className="flex items-center justify-between">
          <div className="site-nav__main">
            <Link
              href="/"
              className="site-nav__brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              {profile.englishName}
            </Link>
            <div className="site-nav__links hidden items-center md:flex">
              {navigation
                .filter((item) => item.href !== "/contact")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm ${linkClass}`}
                    aria-current={
                      isCurrentRoute(item.href) ? "page" : undefined
                    }
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
          <Button
            href="/contact"
            variant="secondary"
            className="hidden md:inline-flex"
          >
            联系我
          </Button>
          <button
            type="button"
            ref={menuButtonRef}
            className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu
              size={22}
              className={`absolute transition-opacity duration-150 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <X
              size={22}
              className={`absolute transition-opacity duration-150 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            />
          </button>
        </Container>
      </nav>

      {/* Mobile menu overlay — 全站统一同一套 */}
      <div
        id="mobile-navigation"
        ref={mobileMenuRef}
        data-testid="mobile-menu"
        className={`fixed inset-x-0 top-0 z-40 h-dvh w-full bg-paper transition-opacity duration-150 ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        <Container className="flex h-full flex-col justify-center">
          {navigation
            .filter((item) => item.href !== "/contact")
            .map((item) => (
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
        </Container>
      </div>
    </>
  );
}
