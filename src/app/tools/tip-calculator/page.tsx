// src/app/tools/tip-calculator/page.tsx
import type { Metadata } from "next";
import TipCalculatorClient from "./TipCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Tip Calculator — Calculate Tips & Split Bills Instantly, Free Online",
  description:
    "Calculate the tip amount and total bill for any percentage. Split between any number of people — shows per-person tip, bill, and total. Five quick-select presets plus custom tip. Free, no signup.",
  keywords:
    "tip calculator, bill splitter, how much to tip, tip percentage calculator, restaurant tip calculator, split bill calculator, tip and split, gratuity calculator, free tip calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/tip-calculator` },
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
    url: `${SITE_URL}/tools/tip-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Tip Calculator — Calculate Tips & Split Bills Instantly, Free Online",
    description:
      "Calculate tip amount and total bill for any percentage. Split between up to 20 people — shows per-person breakdown. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Tip Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Tip Calculator — Calculate Tips & Split Bills Instantly, Free Online",
    description:
      "Calculate tip and total, split by any number of people. Quick presets (10–25%) plus custom tip. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tip Calculator",
  description:
    "Calculate tip amounts and total bills instantly. Choose from preset tip percentages (10%, 15%, 18%, 20%, 25%) or enter a custom amount. Split the bill between 1–20 people with a per-person breakdown showing individual bill, tip, and total amounts.",
  url: `${SITE_URL}/tools/tip-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Tip Calculator",
      item: `${SITE_URL}/tools/tip-calculator`,
    },
  ],
};

export default function TipCalculatorPage() {
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
            <a href="/" className="hover:text-green-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculator"
              className="hover:text-green-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Tip Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Tip Calculator — Calculate Tips &amp; Split Bills Instantly, Free
          Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Calculate tip and total bill for any percentage — split between up to
          20 people with a full per-person breakdown.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Tip Calculator tool">
          <TipCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="tip-calculator" toolName="Tip Calculator" />
      </SidebarAdLayout>
    </>
  );
}
