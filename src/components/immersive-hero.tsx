"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4";

export function ImmersiveHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="hero-media absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Hero content — 顶部留白须 ≥ 导航高度，避免与 overlay 导航重叠 */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between pt-24 pb-10 sm:pb-12 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow--inverse mb-4 block animate-[fadeSlideUp_0.8s_ease_0.2s_both] sm:mb-6">
              自动化 · 人工智能 · 机器人
            </span>
            <h1 className="hero-display animate-[fadeSlideUp_0.8s_ease_0.4s_both] text-white">
              把自动化、人工智能与产品工程，一步步连接起来。
            </h1>
          </div>
        </Container>
        <Container>
          <div>
            <p className="hero-lead mb-5 animate-[fadeSlideUp_0.8s_ease_0.7s_both] sm:mb-6">
              通过完整项目验证想法，从产品设计、前端开发到算法与系统集成，持续探索软件与现实世界的连接。
            </p>
            <Button
              href="/projects"
              tone="inverse"
              className="animate-[fadeSlideUp_0.8s_ease_0.9s_both]"
            >
              查看我的作品
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
