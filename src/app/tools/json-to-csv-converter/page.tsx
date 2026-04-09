// src/app/tools/json-to-csv-converter/page.tsx
import type { Metadata } from "next";
import JsonToCsvConverterClient from "./JsonToCsvConverterClient";
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
  title: "JSON to CSV Converter — Free Online JSON to CSV Converter",
  description:
    "Convert JSON arrays to CSV format instantly. Download as a .csv file or copy to clipboard. Free, no signup required.",
  keywords:
    "json to csv converter, json to csv, convert json to csv, json csv converter online, free json to csv, json to spreadsheet, json converter, csv from json, online json to csv",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/json-to-csv-converter` },
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
    url: `${SITE_URL}/tools/json-to-csv-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "JSON to CSV Converter — Free Online JSON to CSV Converter",
    description:
      "Convert JSON arrays to CSV format instantly. Download as .csv or copy to clipboard. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online JSON to CSV Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "JSON to CSV Converter — Free Online JSON to CSV Converter",
    description:
      "Convert JSON arrays to CSV format instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON to CSV Converter",
  description:
    "Convert JSON arrays to CSV format. Download as .csv or copy to clipboard.",
  url: `${SITE_URL}/tools/json-to-csv-converter`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "JSON to CSV Converter",
      item: `${SITE_URL}/tools/json-to-csv-converter`,
    },
  ],
};

export default function JsonToCsvConverterPage() {
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
              href="/tools/category/developer"
              className="hover:text-indigo-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              JSON to CSV Converter
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          JSON to CSV Converter — Free Online JSON to CSV Converter
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Paste a JSON array and convert it to a properly formatted CSV file.
          Download instantly or copy to clipboard. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout>
        <main id="main-content" aria-label="JSON to CSV Converter tool">
          <JsonToCsvConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="json-to-csv-converter"
          toolName="JSON to CSV Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
