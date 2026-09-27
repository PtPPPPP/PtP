"use client";

import { usePathname } from "next/navigation";

export function SiteFrame({
  children,
  navigation,
  footer,
}: Readonly<{
  children: React.ReactNode;
  navigation: React.ReactNode;
  footer: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isVideoPage = /^\/video\/illumion\/?$/.test(pathname);

  return (
    <>
      {!isVideoPage && navigation}
      <main id="main-content">{children}</main>
      {!isVideoPage && footer}
    </>
  );
}
