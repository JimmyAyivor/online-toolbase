// src/app/tools/speed-distance-time-calculator/page.tsx
import type { Metadata } from "next";
import SpeedDistanceTimeCalculatorClient from "./SpeedDistanceTimeCalculatorClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title:
    "Speed Distance Time Calculator — Free Online Speed Distance Time Calculator",
  description:
    "Calculate speed, distance, or time using the speed-distance-time formula. Supports mph, km/h, m/s. Free, no signup.",
  keywords:
    "speed distance time calculator, sdt calculator, speed calculator, distance calculator, time calculator, mph calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/speed-distance-time-calculator` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/speed-distance-time-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Speed Distance Time Calculator — Free Online Speed Distance Time Calculator",
    description:
      "Calculate speed, distance, or time using the speed-distance-time formula. Supports mph, km/h, m/s. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Speed Distance Time Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Speed Distance Time Calculator — Free Online Speed Distance Time Calculator",
    description:
      "Calculate speed, distance, or time using the speed-distance-time formula. Supports mph, km/h, m/s. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Speed Distance Time Calculator",
  description:
    "Calculate speed, distance, or time using the speed-distance-time formula. Supports mph, km/h, m/s. Free, no signup.",
  url: `${SITE_URL}/tools/speed-distance-time-calculator`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Speed Distance Time Calculator",
      item: `${SITE_URL}/tools/speed-distance-time-calculator`,
    },
  ],
};

export default function SpeedDistanceTimeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculator"
              className="hover:text-indigo-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Speed Distance Time Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Speed Distance Time Calculator — Free Online Speed Distance Time
          Calculator
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Calculate speed, distance, or time using the speed-distance-time
          formula. Supports mph, km/h, m/s. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout>
        <main
          id="main-content"
          aria-label="Speed Distance Time Calculator tool"
        >
          <SpeedDistanceTimeCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="speed-distance-time-calculator"
          toolName="Speed Distance Time Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
