// src/app/tools/html-entity-encoder/page.tsx
import type { Metadata } from "next";
import HtmlEntityEncoderClient from "./HtmlEntityEncoderClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "HTML Entity Encoder & Decoder — Free Online Tool for XSS-Safe HTML",
  description:
    "Encode plain text to HTML entities or decode HTML entities back to plain text. Converts &, <, >, \", ', ©, ™, €, and more. Prevents XSS vulnerabilities. Free, browser-based, no signup.",
  keywords:
    "html entity encoder, html entity decoder, encode html entities, decode html entities, xss prevention, html special characters, html escape, ampersand encoding, html sanitiser, free html encoder",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/html-entity-encoder` },
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
    url: `${SITE_URL}/tools/html-entity-encoder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "HTML Entity Encoder & Decoder — Free Online Tool for XSS-Safe HTML",
    description:
      "Encode plain text to HTML entities or decode HTML entities back to plain text. Handles &, <, >, quotes, copyright, currency symbols, and more. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online HTML Entity Encoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "HTML Entity Encoder & Decoder — Free Online Tool for XSS-Safe HTML",
    description:
      "Encode or decode HTML entities instantly — handles &, <, >, quotes, copyright, currency and more. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HTML Entity Encoder & Decoder",
  description:
    "Encode plain text to HTML entities (&amp;, &lt;, &gt;, &quot;, etc.) or decode HTML entity strings back to plain text. Includes a reference table of common entities with click-to-insert functionality. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/html-entity-encoder`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "HTML Entity Encoder",
      item: `${SITE_URL}/tools/html-entity-encoder`,
    },
  ],
};

export default function HtmlEntityEncoderPage() {
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
              HTML Entity Encoder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          HTML Entity Encoder &amp; Decoder — Free Online Tool for XSS-Safe HTML
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Encode plain text to HTML entities or decode entity strings back to
          plain text — prevents XSS, handles all special characters.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="HTML Entity Encoder tool">
          <HtmlEntityEncoderClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="html-entity-encoder"
          toolName="HTML Entity Encoder"
        />
      </SidebarAdLayout>
    </>
  );
}
