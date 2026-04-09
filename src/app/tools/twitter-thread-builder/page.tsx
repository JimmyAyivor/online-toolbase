// src/app/tools/twitter-thread-builder/page.tsx
import type { Metadata } from "next";
import TwitterThreadBuilderClient from "./TwitterThreadBuilderClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Twitter Thread Builder — Write, Reorder & Export X/Twitter Threads Free Online",
  description:
    "Build Twitter / X threads tweet-by-tweet with a live character counter, tweet reordering, numbered formatting, and one-click export. Start from a template or scratch. Free, no signup.",
  keywords:
    "twitter thread builder, x thread builder, write twitter thread, thread composer, tweet thread tool, long-form twitter, thread template, social media thread, free thread builder",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/twitter-thread-builder` },
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
    url: `${SITE_URL}/tools/twitter-thread-builder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Twitter Thread Builder — Write, Reorder & Export X/Twitter Threads Free Online",
    description:
      "Write Twitter/X threads with live character counts, tweet reordering, numbered formatting, and template options. Export as text. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Twitter Thread Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Twitter Thread Builder — Write, Reorder & Export X/Twitter Threads Free Online",
    description:
      "Write and reorder Twitter/X threads with live character counts and numbered formatting. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Twitter Thread Builder",
  description:
    "Write Twitter / X threads with individual tweet panels, live 280-character counters, drag-to-reorder functionality, auto-numbering (1/, 2/...), template options, and one-click export as a formatted text file. Runs entirely in the browser — no signup required.",
  url: `${SITE_URL}/tools/twitter-thread-builder`,
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
      name: "Social Media Tools",
      item: `${SITE_URL}/tools/category/social-media`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Twitter Thread Builder",
      item: `${SITE_URL}/tools/twitter-thread-builder`,
    },
  ],
};

export default function TwitterThreadBuilderPage() {
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
            <a href="/" className="hover:text-sky-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media"
              className="hover:text-sky-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Twitter Thread Builder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Twitter Thread Builder — Write, Reorder &amp; Export X/Twitter Threads
          Free Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Write Twitter / X threads with live character counts, numbered tweets,
          reordering, and one-click export — start from a template or blank.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Twitter Thread Builder tool">
          <TwitterThreadBuilderClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="twitter-thread-builder"
          toolName="Twitter Thread Builder"
        />
      </SidebarAdLayout>
    </>
  );
}
