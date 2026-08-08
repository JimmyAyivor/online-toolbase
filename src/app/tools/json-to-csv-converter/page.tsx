// src/app/tools/json-to-csv-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const JsonToCsvConverterClient = dynamic(
  () => import("./JsonToCsvConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "json-to-csv-converter");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What JSON structure does the converter accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The converter works best with a JSON array of objects, where each object represents one row and its keys become column headers. It also accepts a single JSON object (which becomes one row), and flat arrays of primitive values (which are converted with an index and value column). Deeply nested objects are supported — nested values are serialised as JSON strings inside their cell rather than expanded into sub-columns.",
      },
    },
    {
      "@type": "Question",
      name: "What delimiter should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most spreadsheet applications — Excel, Google Sheets, LibreOffice Calc — use comma (the default). If your data contains commas in values, switch to semicolon or pipe to avoid quoting issues. European locales sometimes use semicolons as the default CSV delimiter, so if your target audience uses European regional settings, semicolon may be the better choice. Tab-separated values (TSV) work well when importing into databases or data pipelines.",
      },
    },
    {
      "@type": "Question",
      name: "How are values with commas or quotes handled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Any cell value that contains the chosen delimiter, double-quote characters, or newlines is automatically wrapped in double quotes, and any embedded double-quote characters are escaped by doubling them (e.g. \'He said "hi"\' becomes \'"He said ""hi"""\'). This follows the RFC 4180 CSV specification and ensures the output is valid in all compliant CSV parsers.',
      },
    },
    {
      "@type": "Question",
      name: "What happens if different objects have different keys?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The converter collects all unique keys across every object in the array and uses them as columns. If a particular object is missing a key, its cell for that column is left empty. This handles inconsistent or sparse JSON datasets gracefully without throwing an error, which is common when working with API responses where optional fields are omitted.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert very large JSON files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — since all processing happens in your browser, file size is limited only by your device's available memory. Most browsers can comfortably handle JSON files up to several megabytes. For very large datasets (tens of megabytes or more), processing may take a few seconds, and the CSV preview will display a scrollable portion of the output. Clicking Download will always give you the complete file.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the JSON to CSV Converter",
  description:
    "Step-by-step guide to using the free JSON to CSV Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free JSON to CSV Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The JSON to CSV Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
              href="/tools/category/developer-tools"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          JSON to CSV Converter — Free Online JSON to CSV Converter
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Paste a JSON array and convert it to a properly formatted CSV file.
          Download instantly or copy to clipboard. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
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
