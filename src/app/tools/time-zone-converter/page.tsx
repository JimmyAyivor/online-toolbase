// src/app/tools/time-zone-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "time-zone-converter");
const TimeZoneConverterClient = dynamic(
  () => import("./TimeZoneConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Time Zone Converter — Convert Between Any Zones",
  description:
    "Convert times between any two time zones instantly. Add multiple zones for a world clock comparison. See UTC offsets and local times side by side. Free, no signup.",
  keywords:
    "time zone converter, world clock, UTC converter, EST to GMT, PST to EST, time difference calculator, international time zones, meeting planner",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/time-zone-converter` },
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
    url: `${SITE_URL}/tools/time-zone-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Time Zone Converter — Convert Between Any Zones",
    description:
      "Convert times between any two time zones instantly. Add multiple zones for world clock comparison. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Time Zone Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Time Zone Converter — Convert Between Any Zones",
    description:
      "Convert times between any time zones. Multi-zone world clock. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Time Zone Converter",
  description:
    "Converts a selected time and date between any two time zones. Supports adding multiple destination zones for a world clock panel. Displays UTC offset and local equivalent time for each zone. Uses the browser's Intl.DateTimeFormat API for accurate time zone data.",
  url: `${SITE_URL}/tools/time-zone-converter`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
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
      name: "Productivity Tools",
      item: `${SITE_URL}/tools/category/productivity`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Time Zone Converter",
      item: `${SITE_URL}/tools/time-zone-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is UTC and why is it used as the reference time zone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UTC (Coordinated Universal Time) is the primary international time standard from which all other time zones are defined as positive or negative offsets. It replaced GMT (Greenwich Mean Time) as the global reference in 1972, though both are used interchangeably in everyday contexts. UTC has no daylight saving time offset — it stays constant year-round. Every time zone is expressed as UTC+N or UTC-N: New York is UTC-5 (EST) or UTC-4 (EDT) in summer, London is UTC+0 in winter and UTC+1 in summer, Tokyo is UTC+9 year-round...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between GMT and UTC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GMT (Greenwich Mean Time) and UTC (Coordinated Universal Time) are nearly identical for everyday purposes — both represent time at the prime meridian (0° longitude). The technical difference: GMT is an astronomical measurement based on Earth's rotation, while UTC is maintained by a network of atomic clocks adjusted with occasional leap seconds. For practical time zone conversions, the two are interchangeable. The UK observes GMT in winter and BST (British Summer Time, UTC+1) in summer — a common source of confusion.",
      },
    },
    {
      "@type": "Question",
      name: "How do I schedule a meeting across multiple time zones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add all participant time zones using this tool, then adjust the source time until the displayed local times fall within reasonable working hours for each location. Finding a single time that works across Americas, Europe, and Asia-Pacific simultaneously is often impossible during normal business hours — some participants will need to join early morning or evening. Aim for times between 8 AM and 6 PM in as many zones as possible. For recurring international meetings, rotating the inconvenient time slot between teams is standard practice.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the time difference between two cities change throughout the year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Daylight saving time (DST) transitions happen on different dates in different countries — the US and Europe both observe DST but switch on different dates, creating 2–3 week periods where the difference between them temporarily changes. Southern hemisphere countries (Australia, New Zealand) observe DST during their summer (northern winter), so their offset relative to northern zones changes at completely different points in the year. Some regions observe no DST at all — Arizona, Japan, India, China — so their offset relative to DST-observing zones shifts seasonally.",
      },
    },
    {
      "@type": "Question",
      name: "What time zone abbreviations are commonly confused?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Several abbreviations refer to multiple time zones. IST means Indian Standard Time (UTC+5:30), Irish Standard Time (UTC+1), and Israel Standard Time (UTC+2). CST is Central Standard Time (UTC-6 in the US), China Standard Time (UTC+8), and Cuba Standard Time (UTC-5). EST means Eastern Standard Time (UTC-5) in North America but is also used informally for Australian Eastern Standard Time (UTC+10). When precision matters for scheduling, always specify the UTC offset or the full time zone name rather than the abbreviation.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Time Zone Converter",
  description:
    "Step-by-step guide to using the free Time Zone Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Time Zone Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Time Zone Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function TimeZoneConverterPage() {
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
            <a href="/" className="hover:text-sky-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business-productivity"
              className="hover:text-sky-600 transition-colors"
            >
              Productivity Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Time Zone Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1">
          Free Productivity Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Time Zone Converter — Convert Times Between Time Zones Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert a time between any two time zones and add multiple zones for a
          side-by-side world clock comparison.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Time Zone Converter tool">
          <TimeZoneConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="time-zone-converter"
          toolName="Time Zone Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
