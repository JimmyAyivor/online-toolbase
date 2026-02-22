import { ImageResponse } from "next/og";
import { tools } from "@/lib/tools";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  const name = tool?.name ?? "Free Online Tool";
  const description = tool?.description ?? "Fast, free, no signup required.";

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
        padding: "60px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: "rgba(255,255,255,0.7)",
          marginBottom: 24,
          letterSpacing: 4,
        }}
      >
        ONLINETOOLBASE.COM
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 28,
          color: "rgba(255,255,255,0.85)",
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        {description}
      </div>
      <div
        style={{ marginTop: 40, fontSize: 22, color: "rgba(255,255,255,0.6)" }}
      >
        Free · Instant · No Signup Required
      </div>
    </div>,
    { ...size },
  );
}
