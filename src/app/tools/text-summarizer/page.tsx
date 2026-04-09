// src/app/tools/text-summarizer/page.tsx
import type { Metadata } from "next";
import TextSummarizerClient from "./TextSummarizerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Text Summarizer — Condense Any Text to Key Points, Free & Instant",
  description:
    "Summarize long articles, essays, and documents into concise key points. Extractive summarisation with adjustable length ratio — runs entirely in your browser, no signup.",
  keywords:
    "text summarizer, summarize text online, article summarizer, auto summarizer, text condensing tool, extractive summarizer, free text summarizer, summarize paragraph online",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-summarizer` },
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
    url: `${SITE_URL}/tools/text-summarizer`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Text Summarizer — Condense Any Text to Key Points, Free & Instant",
    description:
      "Extractive text summarisation with adjustable length ratio. Paste any article or document and get a concise summary instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text Summarizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Text Summarizer — Condense Any Text to Key Points, Free & Instant",
    description:
      "Extractive text summariser with adjustable length ratio. Free, instant, runs in your browser.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Summarizer",
  description:
    "Summarize long articles, essays, and documents into concise key points using extractive summarisation with an adjustable length ratio.",
  url: `${SITE_URL}/tools/text-summarizer`,
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
      name: "Writing Tools",
      item: `${SITE_URL}/tools/category/writing`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Text Summarizer",
      item: `${SITE_URL}/tools/text-summarizer`,
    },
  ],
};

export default function TextSummarizerPage() {
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
              href="/tools/category/writing"
              className="hover:text-indigo-600 transition-colors"
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Text Summarizer
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Text Summarizer — Condense Any Text to Key Points, Free & Instant
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Paste any article, essay, or document and get a concise extractive
          summary instantly. Adjustable length ratio, copy with one click.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Text Summarizer tool">
          <TextSummarizerClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="text-summarizer" toolName="Text Summarizer" />
      </SidebarAdLayout>
    </>
  );
}
