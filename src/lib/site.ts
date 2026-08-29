const fallbackSiteUrl = "https://example.com";
const localHostnames = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);
const placeholderDomains = ["example.com", "example.org", "example.net"];

export const siteConfig = {
  defaultOgImage: "/opengraph-image",
  themeColor: "#f5f7fa",
} as const;

function isInvalidProductionHostname(hostname: string): boolean {
  return (
    localHostnames.has(hostname) ||
    placeholderDomains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
    )
  );
}

export function getSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (process.env.NODE_ENV === "production" && !configuredUrl) {
    throw new Error(
      "生产构建必须配置 NEXT_PUBLIC_SITE_URL，不能使用 example.com 占位域名。",
    );
  }

  let siteUrl: URL;
  try {
    siteUrl = new URL(configuredUrl || fallbackSiteUrl);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL 必须是完整 URL，当前值为：${configuredUrl}`,
    );
  }

  if (process.env.NODE_ENV === "production") {
    if (siteUrl.protocol !== "https:") {
      throw new Error(
        `生产环境的 NEXT_PUBLIC_SITE_URL 必须使用 HTTPS，当前值为：${siteUrl.origin}`,
      );
    }
    if (isInvalidProductionHostname(siteUrl.hostname)) {
      throw new Error(
        `生产环境的 NEXT_PUBLIC_SITE_URL 不能使用占位或本机地址：${siteUrl.origin}`,
      );
    }
  }

  return siteUrl;
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
