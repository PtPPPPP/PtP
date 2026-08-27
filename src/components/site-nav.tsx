"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function SiteNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  // 打开菜单时锁定页面滚动（链接点击时已同步关闭菜单）
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // 同一 Header，仅 background / foreground / border 可因 variant 不同
  const variantClass = isHome
    ? "absolute inset-x-0 top-0 text-white"
    : "relative border-b border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)]";
  const linkClass = isHome
    ? "text-white/80 transition-colors duration-150 hover:text-white"
    : "text-[var(--color-text-secondary)] transition-colors duration-150 hover:text-[var(--color-text-primary)]";
  const ctaClass = isHome
    ? "bg-white text-black transition-colors duration-150 hover:bg-white/85"
    : "bg-[var(--color-text-primary)] text-white transition-colors duration-150 hover:bg-[#2f343c]";

  return (
    <>
      <nav
        className={`z-50 py-5 ${variantClass}`}
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
                <Link key={item.href} href={item.href} className={`text-sm ${linkClass}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            className={`hidden rounded-md px-5 py-2 text-sm font-medium md:block ${ctaClass}`}
          >
            联系我
          </Link>
          <button
            type="button"
            className={`relative z-50 flex h-10 w-10 items-center justify-center active:scale-90 md:hidden ${
              mobileMenuOpen ? "text-[var(--color-text-primary)]" : ""
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu
              size={22}
              className={`absolute transition-all duration-300 ${
                mobileMenuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              size={22}
              className={`absolute transition-all duration-300 ${
                mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — 全站统一同一套 */}
      <div
        className={`fixed inset-x-0 top-0 z-40 h-screen w-full bg-[var(--color-background)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`container flex h-full flex-col justify-center transition-all delay-100 duration-500 ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-4 text-3xl font-medium text-[var(--color-text-primary)] transition-colors duration-150 hover:text-[var(--color-text-secondary)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-6 rounded-md bg-[var(--color-text-primary)] px-8 py-3.5 text-center text-base font-medium text-white transition-colors duration-150 hover:bg-[#2f343c]"
            onClick={() => setMobileMenuOpen(false)}
          >
            联系我
          </Link>
        </div>
      </div>
    </>
  );
}
