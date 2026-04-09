// src/app/tools/number-to-words-converter/page.tsx
import type { Metadata } from "next";
import NumberToWordsConverterClient from "./NumberToWordsConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Number to Words Converter — Free Online Number to Words Converter",
  description:
    "Convert any number to its English word form instantly. Supports negatives, decimals, and currency mode for cheque writing. Free, no signup required.",
  keywords:
    "number to words, number to words converter, numbers in words, spell out numbers, number word form, cheque writing tool, free number to words converter, online number to words converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/number-to-words-converter` },
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
    url: `${SITE_URL}/tools/number-to-words-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Number to Words Converter — Free Online Number to Words Converter",
    description:
      "Convert any number to its English word form. Supports negatives, decimals, and currency mode. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Number to Words Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Number to Words Converter — Free Online Number to Words Converter",
    description:
      "Convert numbers to English words. Negatives, decimals, currency mode. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Number to Words Converter",
  description:
    "Convert numbers to English words. Supports negative numbers, decimals, and currency formatting.",
  url: `${SITE_URL}/tools/number-to-words-converter`,
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
      name: "Number to Words Converter",
      item: `${SITE_URL}/tools/number-to-words-converter`,
    },
  ],
};

export default function NumberToWordsConverterPage() {
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
            <a href="/" className="hover:text-teal-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/text"
              className="hover:text-teal-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Number to Words Converter
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Number to Words Converter — Free Online Number to Words Converter
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Convert any number to its full English word form. Perfect for cheques,
          legal documents, and educational use.
        </p>
      </header>

      <SidebarAdLayout>
        <main id="main-content" aria-label="Number to Words Converter tool">
          <NumberToWordsConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="number-to-words-converter"
          toolName="Number to Words Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
