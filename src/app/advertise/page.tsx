// src/app/advertise/page.tsx
import type { Metadata } from "next";
import AdvertiseClient from "./AdvertiseClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://onlinetoolbase.com";

export const metadata: Metadata = {
  title: "Advertise With Us — Reach Millions of Tool Users | Calculators, Pdf Tools & More",
  description:
    "Reach a high-intent audience of professionals, students, and creators who actively use Calculators, Pdf Tools & More. Banner ads, sponsored placements, newsletter features and more. Request our media kit.",
  keywords:
    "advertise Calculators, Pdf Tools & More, digital advertising, banner ads, sponsored content, media kit, tool website advertising, reach tool users",
  alternates: { canonical: `${SITE_URL}/advertise` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/advertise`,
    title: "Advertise With Us — Calculators, Pdf Tools & More",
    description:
      "Put your brand in front of millions of high-intent users actively searching for tools to solve real problems. Request our media kit.",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    title: "Advertise With Us — Calculators, Pdf Tools & More",
    description:
      "Reach millions of high-intent users. Banner ads, sponsored placements, newsletter features. Request our media kit.",
  },
};

export default function AdvertisePage() {
  return <AdvertiseClient />;
}
