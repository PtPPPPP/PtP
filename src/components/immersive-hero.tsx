"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4";

export function ImmersiveHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
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

      {/* Hero content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between pt-12 pb-10 sm:pb-12 sm:pt-16 md:pb-16 md:pt-20">
        <Container>
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
        </Container>
        <Container>
          <div>
            <p className="mb-5 max-w-sm animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">
              通过完整项目验证想法，从产品设计、前端开发到算法与系统集成，持续探索软件与现实世界的连接。
            </p>
            <Link
              href="/projects"
              className="inline-flex animate-[fadeSlideUp_0.8s_ease_0.9s_both] items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors duration-150 hover:bg-white/85 sm:px-6 sm:py-3"
            >
              查看我的作品
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
