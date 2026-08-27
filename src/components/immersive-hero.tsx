"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4";

export function ImmersiveHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-geist relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Navbar */}
      <nav
        className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16"
        aria-label="首屏导航"
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
        className={`absolute inset-x-0 top-0 z-20 w-full bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "h-screen opacity-100"
            : "pointer-events-none h-0 opacity-0"
        }`}
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

      {/* Hero content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <span className="mb-4 block animate-[fadeSlideUp_0.8s_ease_0.2s_both] text-xs text-white/90 sm:mb-6 sm:text-sm">
            自动化 · 人工智能 · 机器人
          </span>
          <h1 className="animate-[fadeSlideUp_0.8s_ease_0.4s_both] text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            把自动化、人工智能
            <br />
            与产品工程，
            <br />
            一步步连接起来。
          </h1>
        </div>
        <div>
          <p className="mb-5 max-w-sm animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">
            通过完整项目验证想法，从产品设计、前端开发到算法与系统集成，持续探索软件与现实世界的连接。
          </p>
          <Link
            href="/projects"
            className="inline-flex animate-[fadeSlideUp_0.8s_ease_0.9s_both] items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 sm:px-6 sm:py-3"
          >
            查看我的作品
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
