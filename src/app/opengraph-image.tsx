import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Online Tool Base — Free Online Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: "white",
          marginBottom: 16,
        }}
      >
        🛠️ Online Tool Base
      </div>
      <div style={{ fontSize: 32, color: "rgba(255,255,255,0.85)" }}>
        60+ Free Online Tools — No Signup Required
      </div>
    </div>,
    { ...size },
  );
}
