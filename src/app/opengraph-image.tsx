import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "黄柏霖 · Huang Bolin · Portfolio & Notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        background: "#f5f7fa",
        color: "#101828",
        borderTop: "12px solid #2563eb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#475467" }}>
        <span>PERSONAL TECHNICAL ARCHIVE</span>
        <span>PROFILE / 001</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.04em" }}>黄柏霖</div>
        <div style={{ marginTop: 18, fontSize: 34, fontWeight: 600, letterSpacing: "0.08em", color: "#475467" }}>HUANG BOLIN</div>
      </div>
      <div style={{ fontSize: 28, color: "#2563eb" }}>PORTFOLIO &amp; NOTES</div>
    </div>,
    size,
  );
}
