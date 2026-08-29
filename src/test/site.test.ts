import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl } from "@/lib/site";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("站点公开地址", () => {
  it("非生产环境未配置时使用公开示例地址", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");

    expect(getSiteUrl().toString()).toBe("https://example.com/");
  });

  it.each([
    "",
    "https://example.com",
    "https://preview.example.org",
    "http://localhost:3000",
  ])("生产环境拒绝不安全地址：%s", (siteUrl) => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);

    expect(() => getSiteUrl()).toThrow();
  });

  it("生产环境接受正式 HTTPS 地址", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://berl1n.xyz");

    expect(getSiteUrl().origin).toBe("https://berl1n.xyz");
  });
});
