// src/app/tools/pdf-merger-splitter/page.tsx
import type { Metadata } from "next";
import PdfMergerSplitterClient from "./PdfMergerSplitterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "PDF Merger & Splitter — Merge or Split PDF Files Free Online",
  description:
    "Merge multiple PDF files into a single document, or split a PDF into individual pages — all in your browser. Drag to reorder pages before merging. No upload, no signup, no data stored.",
  keywords:
    "pdf merger, pdf splitter, merge PDF files, split PDF pages, combine PDF, PDF tools online, free PDF merger, PDF page extractor, no upload PDF tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/pdf-merger-splitter` },
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
    url: `${SITE_URL}/tools/pdf-merger-splitter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "PDF Merger & Splitter — Merge or Split PDF Files Free Online",
    description:
      "Merge multiple PDFs into one or split a PDF into individual pages. Reorder before merging. Runs entirely in your browser — no upload, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online PDF Merger & Splitter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "PDF Merger & Splitter — Merge or Split PDF Files Free Online",
    description:
      "Merge or split PDFs in your browser — no upload, no signup, no data stored. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PDF Merger & Splitter",
  description:
    "Merges multiple PDF files into a single document (with drag-to-reorder page control) or splits a single PDF into individual pages for separate download. All processing runs entirely in the browser using pdf-lib — files are never uploaded to any server. Free with no signup required.",
  url: `${SITE_URL}/tools/pdf-merger-splitter`,
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
      name: "Business Tools",
      item: `${SITE_URL}/tools/category/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "PDF Merger & Splitter",
      item: `${SITE_URL}/tools/pdf-merger-splitter`,
    },
  ],
};

export default function PdfMergerSplitterPage() {
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
            <a href="/" className="hover:text-red-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business"
              className="hover:text-red-600 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              PDF Merger &amp; Splitter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          PDF Merger &amp; Splitter — Merge or Split PDF Files Free Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Merge multiple PDFs into one document or split a PDF into individual
          pages — runs entirely in your browser, nothing uploaded to any server.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="PDF Merger & Splitter tool">
          <PdfMergerSplitterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="pdf-merger-splitter"
          toolName="PDF Merger & Splitter"
        />
      </SidebarAdLayout>
    </>
  );
}
