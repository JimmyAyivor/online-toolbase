// src/app/about/page.tsx
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://onlinetoolbase.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We built 130+ free browser-based tools because the internet deserves better. No accounts, no paywalls, no data collection — ever. Learn our story and our mission.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: "About Free Online Tools",
    description:
      "130+ free browser-based tools. No signup, no data collection, no cost — ever. Learn why we built them.",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
