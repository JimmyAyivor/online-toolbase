// src/app/tools/timestamp-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "timestamp-converter");
const TimestampConverterClient = dynamic(
  () => import("./TimestampConverterClient"),
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

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Timestamp Converter — Free Online Unix Timestamp Converter",
  description:
    "Convert Unix timestamps to human-readable dates and dates to Unix timestamps instantly. Supports seconds, milliseconds, and multiple timezones. Free, no signup.",
  keywords:
    "timestamp converter, unix timestamp, epoch converter, unix time converter, timestamp to date, date to timestamp, epoch time, free timestamp converter, online unix converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/timestamp-converter` },
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
    url: `${SITE_URL}/tools/timestamp-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Timestamp Converter — Free Online Unix Timestamp Converter",
    description:
      "Convert Unix timestamps to dates and dates to timestamps instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Timestamp Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Timestamp Converter — Free Online Unix Timestamp Converter",
    description:
      "Convert Unix timestamps to readable dates instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Timestamp Converter",
  description:
    "Convert Unix timestamps to human-readable dates and dates to Unix timestamps.",
  url: `${SITE_URL}/tools/timestamp-converter`,
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
      name: "Timestamp Converter",
      item: `${SITE_URL}/tools/timestamp-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Unix timestamp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Unix timestamp is the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970, known as the Unix epoch. It is a timezone-independent way to represent any moment in time as a single integer. Because it doesn't store timezone information, the same timestamp refers to the same instant everywhere on Earth — it's only the display format that changes when you convert it to a local date and time.",
      },
    },
    {
      "@type": "Question",
      name: "Why does JavaScript use milliseconds instead of seconds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JavaScript's Date.now() and new Date().getTime() return milliseconds since the epoch rather than seconds. This design decision gives JavaScript more precision for measuring short intervals and animation frame timing. When working across languages, it's important to know which unit a given timestamp uses — a timestamp with 13 digits is almost certainly milliseconds, while a 10-digit timestamp is almost certainly seconds.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Year 2038 problem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many older systems store Unix timestamps as a signed 32-bit integer, which can hold values up to 2,147,483,647 — corresponding to 03:14:07 UTC on 19 January 2038. After that moment, the value wraps around to a large negative number, potentially causing systems to misinterpret the date as 1901. Modern systems use 64-bit integers for timestamps, which won't overflow for hundreds of billions of years.",
      },
    },
    {
      "@type": "Question",
      name: "Are timestamps affected by daylight saving time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Unix timestamps are always based on UTC and are completely unaffected by daylight saving time, leap seconds (mostly), or timezone changes. When you convert a timestamp to a human-readable date, the local time display changes based on your timezone and DST rules — but the underlying timestamp stays constant. This is one of the main reasons developers prefer timestamps for storing date/time data in databases.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get the current timestamp in different programming languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In JavaScript, use Date.now() for milliseconds or Math.floor(Date.now()/1000) for seconds. In Python, use import time; time.time() for seconds as a float. In PHP, use time() for seconds. In Java, use System.currentTimeMillis() for milliseconds. In SQL (PostgreSQL), use EXTRACT(EPOCH FROM NOW()). In SQL (MySQL), use UNIX_TIMESTAMP(). All of these return the number of seconds (or milliseconds) since the Unix epoch in UTC.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Timestamp Converter",
  description:
    "Step-by-step guide to using the free Timestamp Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Timestamp Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Timestamp Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function TimestampConverterPage() {
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
              Timestamp Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Timestamp Converter — Free Online Unix Timestamp Converter
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert Unix timestamps to readable dates and dates to Unix
          timestamps. Supports seconds, milliseconds, and timezones. Free, no
          account needed.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Timestamp Converter tool">
          <TimestampConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="timestamp-converter"
          toolName="Timestamp Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
