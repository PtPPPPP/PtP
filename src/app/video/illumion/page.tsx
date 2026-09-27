import type { Metadata, Viewport } from "next";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Illumion 视频",
  description: "在线观看 Illumion 视频。",
  pathname: "/video/illumion",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function IllumionVideoPage() {
  return (
    <section className={styles.page} aria-label="Illumion 视频">
      <video
        className={styles.player}
        controls
        playsInline
        preload="none"
        aria-label="播放 Illumion 视频"
        src="https://www.qd-china.com/userfiles/1912111598370/qdfiles_one//qd/qdNews/2026/4/2026_4_15_1879882079.mp4"
      >
        您的浏览器不支持 HTML5 视频播放，请使用新版浏览器观看。
      </video>
    </section>
  );
}
