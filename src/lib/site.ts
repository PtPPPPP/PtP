const fallbackSiteUrl = "https://example.com";
const localHostnames = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

export const siteConfig = {
  defaultOgImage: "/opengraph-image",
  themeColor: "#f5f7fa",
} as const;

let hasWarnedAboutProductionUrl = false;

function warnAboutProductionUrl(reason: string): void {
  if (hasWarnedAboutProductionUrl) return;
  hasWarnedAboutProductionUrl = true;
  console.warn(
    `[site] ${reason}。当前 canonical、Open Graph、JSON-LD 与 sitemap 使用 ${fallbackSiteUrl} 占位；部署前必须配置 NEXT_PUBLIC_SITE_URL。`,
  );
}

export function getSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const siteUrl = new URL(configuredUrl ?? fallbackSiteUrl);

    if (process.env.NODE_ENV === "production") {
      if (!configuredUrl) {
        warnAboutProductionUrl("生产环境缺少 NEXT_PUBLIC_SITE_URL");
        return new URL(fallbackSiteUrl);
      }

      if (localHostnames.has(siteUrl.hostname)) {
        warnAboutProductionUrl(
          `生产环境的 NEXT_PUBLIC_SITE_URL 仍指向 ${siteUrl.origin}`,
        );
        return new URL(fallbackSiteUrl);
      }
    }

    return siteUrl;
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL 必须是完整 URL，当前值为：${configuredUrl}`,
    );
  }
}

export function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}
