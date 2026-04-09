// src/app/tools/random-number-generator/page.tsx
import type { Metadata } from "next";
import RandomNumberGeneratorClient from "./RandomNumberGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Random Number Generator — Generate Random Numbers in Any Range Free Online",
  description: "Generate one or many random numbers between any minimum and maximum value. Option for no duplicates. Shows count, min, max, and average stats. Copy all as comma-separated list. Free, no signup.",
  keywords: "random number generator, random number between 1 and 100, generate random numbers, lottery number generator, random number picker, no duplicate random numbers, random list generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/random-number-generator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/random-number-generator`, siteName: SITE_NAME, locale: "en_US", title: "Random Number Generator — Generate Random Numbers in Any Range Free Online", description: "Generate random numbers in any range — set min, max, and how many numbers. Option for unique (no duplicate) numbers. Copy as CSV. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Random Number Generator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Random Number Generator — Generate Random Numbers in Any Range Free Online", description: "Generate random numbers in any range. Set count and unique-only option. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Random Number Generator", description: "Generates random integers between a user-defined minimum and maximum value. Supports generating between 1 and 1000 numbers per run, with an optional no-duplicate mode that ensures each generated number is unique within the specified range. Shows count, smallest, largest, and average statistics. Results can be copied as a comma-separated list. Runs in the browser.", url: `${SITE_URL}/tools/random-number-generator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Calculator Tools", item: `${SITE_URL}/tools/category/calculator` }, { "@type": "ListItem", position: 3, name: "Random Number Generator", item: `${SITE_URL}/tools/random-number-generator` }] };

export default function RandomNumberGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-indigo-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/calculator" className="hover:text-indigo-600 transition-colors">Calculator Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Random Number Generator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Free Calculator Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Random Number Generator — Generate Random Numbers in Any Range Free Online</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Generate one or many random numbers between any minimum and maximum value — with optional no-duplicate mode and copy-all output.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Random Number Generator tool"><RandomNumberGeneratorClient /></main>
        <PageEditorial />
              <ToolEngagement toolSlug="random-number-generator" toolName="Random Number Generator" />
      </SidebarAdLayout>
    </>
  );
}