// src/app/tools/regex-tester/page.tsx
import type { Metadata } from "next";
import RegexTesterClient from "./RegexTesterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Regex Tester — Test & Debug Regular Expressions Online, Free & Instant",
  description:
    "Test and debug regular expressions against sample text in real time. Live match highlighting, capture groups, flags, and a common patterns library. Free, no signup.",
  keywords:
    "regex tester, regular expression tester, regex debugger, regex online, test regex, regex match highlighter, regex capture groups, javascript regex, regex flags, free regex tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/regex-tester` },
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
    url: `${SITE_URL}/tools/regex-tester`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Regex Tester — Test & Debug Regular Expressions Online, Free & Instant",
    description:
      "Test and debug regular expressions in real time — live match highlighting, capture groups, flags, and a common patterns library. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Regex Tester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Regex Tester — Test & Debug Regular Expressions Online, Free & Instant",
    description:
      "Test regex in real time — live match highlighting, capture groups, flags, and common patterns library. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Regex Tester",
  description:
    "Test and debug regular expressions against sample text in real time. Live match highlighting, capture groups, regex flags (g, i, m, s), and a library of common patterns for emails, URLs, phone numbers, dates, and more.",
  url: `${SITE_URL}/tools/regex-tester`,
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
      name: "Regex Tester",
      item: `${SITE_URL}/tools/regex-tester`,
    },
  ],
};

export default function RegexTesterPage() {
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
            <a href="/" className="hover:text-rose-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer"
              className="hover:text-rose-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Regex Tester
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Regex Tester — Test &amp; Debug Regular Expressions Online, Free &amp;
          Instant
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Test and debug regular expressions in real time — live match
          highlighting, capture groups, flags, and a common patterns library.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Regex Tester tool">
          <RegexTesterClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="regex-tester" toolName="Regex Tester" />
      </SidebarAdLayout>
    </>
  );
}
