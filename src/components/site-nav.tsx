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

  return (
    <>
      <nav
        className={`z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16 ${
          isHome
            ? "absolute inset-x-0 top-0"
            : "relative border-b border-white/10 bg-black"
        }`}
        aria-label={isHome ? "首屏导航" : "主导航"}
      >
        <div className="flex items-center">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            {profile.englishName}
          </Link>
          <div className="ml-10 hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href="/contact"
          className="hidden rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:block"
        >
          联系我
        </Link>
        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center text-white active:scale-90 md:hidden"
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
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-x-0 top-0 z-40 h-screen w-full bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all delay-100 duration-500 ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-4 text-3xl font-medium text-white/90 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-6 rounded-full bg-white px-8 py-3.5 text-center text-base font-medium text-black transition-transform hover:scale-105"
            onClick={() => setMobileMenuOpen(false)}
          >
            联系我
          </Link>
        </div>
      </div>
    </>
  );
}
