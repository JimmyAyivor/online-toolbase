// src/app/tools/readability-score-calculator/page.tsx
import type { Metadata } from "next";
import ReadabilityScoreCalculatorClient from "./ReadabilityScoreCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Readability Score Calculator — Free Online Readability Score Calculator",
  description:
    "Calculate Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog Index, and ARI readability scores for any text. Free, instant, no signup required.",
  keywords:
    "readability score calculator, flesch reading ease, flesch kincaid grade, gunning fog index, readability checker, text readability tool, reading level calculator, free readability score calculator, online readability checker",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/readability-score-calculator` },
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
    url: `${SITE_URL}/tools/readability-score-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Readability Score Calculator — Free Online Readability Score Calculator",
    description:
      "Calculate Flesch, Kincaid, Gunning Fog, and ARI readability scores for any text. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Readability Score Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Readability Score Calculator — Free Online Readability Score Calculator",
    description:
      "Flesch, Kincaid, Gunning Fog & ARI scores for any text. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Readability Score Calculator",
  description:
    "Calculate Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog Index, and Automated Readability Index scores for any text.",
  url: `${SITE_URL}/tools/readability-score-calculator`,
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Readability Score Calculator",
      item: `${SITE_URL}/tools/readability-score-calculator`,
    },
  ],
};

export default function ReadabilityScoreCalculatorPage() {
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
            <a href="/" className="hover:text-orange-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/text"
              className="hover:text-orange-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Readability Score Calculator
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Readability Score Calculator — Free Online Readability Score
          Calculator
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Paste any text to get Flesch, Kincaid, Gunning Fog, and ARI
          readability scores instantly. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout>
        <main id="main-content" aria-label="Readability Score Calculator tool">
          <ReadabilityScoreCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="readability-score-calculator"
          toolName="Readability Score Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
