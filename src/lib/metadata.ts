import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

type PageMetadataInput = {
  title?: string;
  description: string;
  pathname: string;
  image?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  pathname,
  image = siteConfig.defaultOgImage,
  type = "website",
}: PageMetadataInput): Metadata {
  const socialTitle = title ? `${title} | ${profile.name}` : profile.siteName;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type,
      locale: "zh_CN",
      siteName: profile.siteName,
      title: socialTitle,
      description,
      url: pathname,
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
