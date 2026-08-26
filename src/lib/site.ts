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

// SIGNAL HUNT（抽奖系统）入口。NEXT_PUBLIC_SIGNAL_HUNT_URL 配置站点根地址，
// 这里统一拼接访客抽奖页 /display 与管理后台 /admin/dashboard。开发环境允许指向本地开发服务器；
// 生产构建必须配置正式域名，否则入口隐藏，绝不回退到 localhost。
const localSignalHuntHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

let hasWarnedAboutSignalHuntUrl = false;

function getSignalHuntOrigin(): string | null {
  const configuredUrl = process.env.NEXT_PUBLIC_SIGNAL_HUNT_URL?.trim();

  if (!configuredUrl) {
    if (process.env.NODE_ENV === "production" && !hasWarnedAboutSignalHuntUrl) {
      hasWarnedAboutSignalHuntUrl = true;
      console.warn(
        "[site] 生产构建未配置 NEXT_PUBLIC_SIGNAL_HUNT_URL，SIGNAL HUNT 入口将隐藏；部署前必须配置正式域名。",
      );
    }
    return null;
  }

  let baseUrl: URL;
  try {
    baseUrl = new URL(configuredUrl);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SIGNAL_HUNT_URL 必须是完整 URL，当前值为：${configuredUrl}`,
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    localSignalHuntHosts.has(baseUrl.hostname)
  ) {
    throw new Error(
      `NEXT_PUBLIC_SIGNAL_HUNT_URL 在生产构建中不能使用本机地址：${baseUrl.origin}，请配置正式域名。`,
    );
  }

  return baseUrl.origin;
}

export function getSignalHuntUrl(): string | null {
  const origin = getSignalHuntOrigin();
  if (!origin) return null;
  return new URL("/display", origin).toString();
}

export function getSignalHuntAdminUrl(): string | null {
  const origin = getSignalHuntOrigin();
  if (!origin) return null;
  return new URL("/admin/dashboard", origin).toString();
}
