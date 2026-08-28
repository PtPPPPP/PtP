import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "页面未找到",
    description: "请求的页面不存在或尚未公开。",
    pathname: "/404",
  }),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="not-found">
      <span>404 / NOT FOUND</span>
      <h1>这条路径没有对应内容。</h1>
      <p>页面可能已移动，或者这个项目与文章还没有被创建。</p>
      <Button href="/" variant="primary">
        返回首页 <span aria-hidden="true">→</span>
      </Button>
    </Container>
  );
}
