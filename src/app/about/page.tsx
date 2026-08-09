// src/app/about/page.tsx
import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { tools } from "@/lib/tools";
const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.onlinetoolbase.com";
const TOOL_COUNT = tools.length;
export const metadata: Metadata = {
  title: "About Us",
  description:
    `We built ${TOOL_COUNT} free browser-based tools because the internet deserves better. No accounts, no paywalls, no data collection — ever. Learn our story and our mission.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: "About Us | OnlineToolBase",
    description:
       "Learn more about OnlineToolBase, a free collection of online tools for calculators, PDFs, images, writing, developer tasks, and everyday needs.",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
