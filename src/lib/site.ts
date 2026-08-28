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

// SIGNAL HUNT（抽奖系统）入口。NEXT_PUBLIC_SIGNAL_HUNT_URL 可覆盖站点根地址，
// 这里统一拼接访客抽奖页 /display 与管理后台 /admin/dashboard。
// 未配置时回退到正式域名：这些 NEXT_PUBLIC_* 变量在构建时内联，
// 部署环境一旦漏配，入口会在上线后静默消失（已发生过），因此正式域名直接写进代码兜底，
// 环境变量只作为开发环境指向本机服务器的覆盖手段。生产构建仍拒绝本机地址。
const SIGNAL_HUNT_FALLBACK_ORIGIN = "https://lottery.berl1n.xyz";
const localSignalHuntHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

function getSignalHuntOrigin(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SIGNAL_HUNT_URL?.trim();

  if (!configuredUrl) {
    return SIGNAL_HUNT_FALLBACK_ORIGIN;
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

export function getSignalHuntUrl(): string {
  return new URL("/display", getSignalHuntOrigin()).toString();
}

export function getSignalHuntAdminUrl(): string {
  return new URL("/admin/dashboard", getSignalHuntOrigin()).toString();
}

// Diamond Track Atlas（钻石田径图鉴）入口。NEXT_PUBLIC_STDM_URL 可覆盖站点根地址。
// 与 SIGNAL HUNT 相同：正式域名写进代码兜底，环境变量仅用于开发环境指向本机服务器；
// 生产构建仍拒绝本机地址。
const STDM_FALLBACK_ORIGIN = "https://stdm.berl1n.xyz";

export function getStdmUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_STDM_URL?.trim();

  if (!configuredUrl) {
    return STDM_FALLBACK_ORIGIN;
  }

  let baseUrl: URL;
  try {
    baseUrl = new URL(configuredUrl);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_STDM_URL 必须是完整 URL，当前值为：${configuredUrl}`,
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    localSignalHuntHosts.has(baseUrl.hostname)
  ) {
    throw new Error(
      `NEXT_PUBLIC_STDM_URL 在生产构建中不能使用本机地址：${baseUrl.origin}，请配置正式域名。`,
    );
  }

  return baseUrl.origin;
}
