// src/app/tools/gpa-calculator/page.tsx
import type { Metadata } from "next";
import GpaCalculatorClient from "./GpaCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "GPA Calculator — Calculate Your GPA Free Online",
  description: "Calculate your GPA by entering course grades and credit hours. Supports letter grades (A+ to F) and percentage grades. Shows cumulative GPA and per-course contribution. Free, no signup.",
  keywords: "GPA calculator, grade point average calculator, college GPA, cumulative GPA, letter grade GPA, credit hour GPA, academic GPA calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/gpa-calculator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/gpa-calculator`, siteName: SITE_NAME, locale: "en_US", title: "GPA Calculator — Calculate Your GPA Free Online", description: "Calculate cumulative GPA from course grades and credit hours. Supports A+ to F letter grades and percentage grades. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free GPA Calculator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "GPA Calculator — Calculate Your GPA Free Online", description: "Calculate GPA from grades and credit hours. Letter grades and percentages. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "GPA Calculator", description: "Calculates cumulative GPA from multiple courses. Accepts letter grades (A+ through F on a 4.0 scale) and credit/unit hours per course. Displays each course's grade points, total credit hours, and weighted cumulative GPA. Courses can be added or removed dynamically. Runs in the browser.", url: `${SITE_URL}/tools/gpa-calculator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Calculator Tools", item: `${SITE_URL}/tools/category/calculator` }, { "@type": "ListItem", position: 3, name: "GPA Calculator", item: `${SITE_URL}/tools/gpa-calculator` }] };

export default function GpaCalculatorPage() {
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
          <li><span aria-current="page" className="text-gray-900 font-medium">GPA Calculator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Free Calculator Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">GPA Calculator — Calculate Your GPA Free Online</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Add your courses with grades and credit hours — get your cumulative GPA on the 4.0 scale instantly with a per-course breakdown.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="GPA Calculator tool"><GpaCalculatorClient /></main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}