// src/app/tools/random-name-generator/page.tsx
import type { Metadata } from "next";
import RandomNameGeneratorClient from "./RandomNameGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Random Name Generator — Generate Random Names Free Online",
  description: "Generate random first names, last names, or full names by gender and origin. Useful for fiction writing, game characters, testing, and privacy. Generate up to 50 names at once. Free, no signup.",
  keywords: "random name generator, random first name, random last name, character name generator, fake name generator, fiction name generator, baby name ideas, random person name",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/random-name-generator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/random-name-generator`, siteName: SITE_NAME, locale: "en_US", title: "Random Name Generator — Generate Random Names Free Online", description: "Generate random first, last, or full names by gender and origin. Up to 50 names at once. Copy all as CSV. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Random Name Generator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Random Name Generator — Generate Random Names Free Online", description: "Generate random names by gender and origin. Up to 50 at once. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Random Name Generator", description: "Generates random first names, last names, or full names with options for gender (male, female, neutral) and cultural origin. Generates 1–50 names per run. Results can be copied individually or exported as a CSV list. Runs in the browser.", url: `${SITE_URL}/tools/random-name-generator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Fun Tools", item: `${SITE_URL}/tools/category/fun` }, { "@type": "ListItem", position: 3, name: "Random Name Generator", item: `${SITE_URL}/tools/random-name-generator` }] };

export default function RandomNameGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-purple-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/fun" className="hover:text-purple-600 transition-colors">Fun Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Random Name Generator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">Free Fun Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Random Name Generator — Generate Random Names Free Online</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Generate random first names, last names, or full names by gender and cultural origin — up to 50 at a time, with CSV export.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Random Name Generator tool"><RandomNameGeneratorClient /></main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}