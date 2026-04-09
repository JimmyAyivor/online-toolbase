// src/app/tools/date-difference-calculator/page.tsx
import type { Metadata } from "next";
import DateDifferenceCalculatorClient from "./DateDifferenceCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Date Difference Calculator — Calculate Days Between Two Dates Free Online",
  description: "Calculate the exact number of days, weeks, months, years, hours, minutes, workdays, and weekend days between any two dates. Quick presets for common ranges. Free, no signup.",
  keywords: "date difference calculator, days between dates, how many days between, date calculator, workdays calculator, days weeks months calculator, date span calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/date-difference-calculator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/date-difference-calculator`, siteName: SITE_NAME, locale: "en_US", title: "Date Difference Calculator — Calculate Days Between Two Dates Free Online", description: "Calculate days, weeks, months, years, hours, workdays, and weekend days between two dates. Quick presets included. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Date Difference Calculator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Date Difference Calculator — Calculate Days Between Two Dates Free Online", description: "Calculate days, weeks, months, workdays between two dates. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Date Difference Calculator", description: "Calculates the difference between two dates in multiple units: days, weeks, approximate months, approximate years, hours, minutes, workdays (Mon–Fri), and weekend days (Sat–Sun). Handles reversed date order (showing absolute difference). Includes quick preset buttons for last 30 days, last 90 days, last 365 days, and next 30 days. Runs in the browser.", url: `${SITE_URL}/tools/date-difference-calculator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Calculator Tools", item: `${SITE_URL}/tools/category/calculator` }, { "@type": "ListItem", position: 3, name: "Date Difference Calculator", item: `${SITE_URL}/tools/date-difference-calculator` }] };

export default function DateDifferenceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/calculator" className="hover:text-blue-600 transition-colors">Calculator Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Date Difference Calculator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Free Calculator Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Date Difference Calculator — Calculate Days Between Two Dates Free Online</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Calculate the exact days, weeks, months, hours, workdays, and weekend days between any two dates — with quick presets for common ranges.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Date Difference Calculator tool"><DateDifferenceCalculatorClient /></main>
        <PageEditorial />
              <ToolEngagement toolSlug="date-difference-calculator" toolName="Date Difference Calculator" />
      </SidebarAdLayout>
    </>
  );
}