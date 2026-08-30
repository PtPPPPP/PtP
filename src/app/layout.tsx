import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl, getSiteUrl } from "@/lib/site";
import "./globals.css";

// 构建时自托管 Geist（不再从 fonts.googleapis.com 拉取，大陆访客不再被外链阻塞）。
// 中文回退栈仍由 globals.css 的 --font-sans 提供，Geist 只覆盖拉丁字形。
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-font",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: profile.siteName,
    template: `%s | ${profile.name}`,
  },
  ...createPageMetadata({ description: profile.introduction, pathname: "/" }),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: profile.name,
        alternateName: profile.englishName,
        description: profile.introduction,
        url: absoluteUrl("/"),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: profile.siteName,
        alternateName: profile.englishSiteName,
        url: absoluteUrl("/"),
        inLanguage: "zh-CN",
      },
    ],
  };

  return (
    <html lang="zh-CN" className={geist.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要内容
        </a>
        <JsonLd data={structuredData} />
        <SiteNav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
