import type { NextConfig } from "next";

function reviveFrameOrigin() {
  const configured = process.env.NEXT_PUBLIC_REVIVE_DELIVERY_URL;
  if (!configured) return null;
  try {
    const url = new URL(configured);
    const localDevelopment =
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");
    return url.protocol === "https:" || localDevelopment ? url.origin : null;
  } catch {
    return null;
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    const frameSources = [
      "'self'",
      "https://googleads.g.doubleclick.net",
      "https://tpc.googlesyndication.com",
      "https://dcbbwymp1bhlf.cloudfront.net",
      reviveFrameOrigin(),
    ].filter(Boolean);
    return [
      {
        headers: [
          {
            key: "Content-Security-Policy",
            value: `base-uri 'self'; frame-src ${frameSources.join(" ")}; object-src 'none'`,
          },
        ],
        source: "/(.*)",
      },
    ];
  },
};

export default nextConfig;
