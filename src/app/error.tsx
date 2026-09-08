"use client";

import { useEffect } from "react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";

// 客户端渲染兜底：静态导出下服务端不会报错，但 hydration /
// 客户端组件异常仍会落到这里。样式复用 404 页的居中开场结构。
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="not-found">
      <span>ERROR</span>
      <h1>页面渲染出了问题。</h1>
      <p>可以重试一次；如果反复出现，请通过联系页面告知我。</p>
      <div className="case-study__links">
        <button className="button button--primary" onClick={reset} type="button">
          重试
        </button>
        <Button href="/" variant="secondary">
          返回首页 <span aria-hidden="true">→</span>
        </Button>
      </div>
    </Container>
  );
}
