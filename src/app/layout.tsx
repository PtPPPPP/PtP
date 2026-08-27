import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl, getSiteUrl } from "@/lib/site";
import "./globals.css";

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
    <html lang="zh-CN">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
