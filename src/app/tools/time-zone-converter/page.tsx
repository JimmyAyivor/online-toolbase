// src/app/tools/time-zone-converter/page.tsx
import type { Metadata } from "next";
import TimeZoneConverterClient from "./TimeZoneConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Time Zone Converter — Convert Times Between Time Zones Free Online",
  description: "Convert times between any two time zones instantly. Add multiple zones for a world clock comparison. See UTC offsets and local times side by side. Free, no signup.",
  keywords: "time zone converter, world clock, UTC converter, EST to GMT, PST to EST, time difference calculator, international time zones, meeting planner",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/time-zone-converter` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/time-zone-converter`, siteName: SITE_NAME, locale: "en_US", title: "Time Zone Converter — Convert Times Between Time Zones Free Online", description: "Convert times between any two time zones instantly. Add multiple zones for world clock comparison. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Time Zone Converter" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Time Zone Converter — Convert Times Between Time Zones Free Online", description: "Convert times between any time zones. Multi-zone world clock. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Time Zone Converter", description: "Converts a selected time and date between any two time zones. Supports adding multiple destination zones for a world clock panel. Displays UTC offset and local equivalent time for each zone. Uses the browser's Intl.DateTimeFormat API for accurate time zone data.", url: `${SITE_URL}/tools/time-zone-converter`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${SITE_URL}/tools/category/productivity` }, { "@type": "ListItem", position: 3, name: "Time Zone Converter", item: `${SITE_URL}/tools/time-zone-converter` }] };

export default function TimeZoneConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-sky-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/productivity" className="hover:text-sky-600 transition-colors">Productivity Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Time Zone Converter</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1">Free Productivity Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Time Zone Converter — Convert Times Between Time Zones Free Online</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Convert a time between any two time zones and add multiple zones for a side-by-side world clock comparison.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Time Zone Converter tool"><TimeZoneConverterClient /></main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}