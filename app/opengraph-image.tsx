import { ImageResponse } from "next/og";

export const alt = "KeepRatio aspect ratio calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e7e1d5",
          color: "#1b1714",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6 }}>
          KEEPRATIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -1 }}>
            Aspect Ratio Calculator
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#433e36" }}>
            16:9 · 9:16 · 4:5 · 1:1
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
          }}
        >
          <span>keepratio.com</span>
          <span>1920×1080</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
