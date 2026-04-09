// src/app/tools/scientific-calculator/page.tsx
import type { Metadata } from "next";
import ScientificCalculatorClient from "./ScientificCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Scientific Calculator — Free Online Scientific Calculator with Trig & Log Functions",
  description: "Full-featured scientific calculator with sin, cos, tan, sqrt, log, ln, powers, constants π and e, and DEG/RAD angle modes. Calculation history saved. Free, no signup.",
  keywords: "scientific calculator, online scientific calculator, trig calculator, sin cos tan calculator, logarithm calculator, scientific calculator free, math calculator, DEG RAD calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/scientific-calculator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/scientific-calculator`, siteName: SITE_NAME, locale: "en_US", title: "Scientific Calculator — Free Online Scientific Calculator with Trig & Log Functions", description: "Scientific calculator with sin, cos, tan, log, ln, sqrt, powers, π, e, DEG/RAD modes, and calculation history. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Online Scientific Calculator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Scientific Calculator — Free Online Scientific Calculator with Trig & Log Functions", description: "Scientific calculator with trig, log, sqrt, powers, π, e, DEG/RAD. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Scientific Calculator", description: "Full-featured browser-based scientific calculator supporting arithmetic operations, trigonometric functions (sin, cos, tan) with selectable degree/radian mode, logarithmic functions (log base-10, natural log), square root, exponentiation (^), mathematical constants π and e, parenthetical expressions, and a scrollable calculation history of the last 10 results. Runs entirely in the browser.", url: `${SITE_URL}/tools/scientific-calculator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Calculator Tools", item: `${SITE_URL}/tools/category/calculator` }, { "@type": "ListItem", position: 3, name: "Scientific Calculator", item: `${SITE_URL}/tools/scientific-calculator` }] };

export default function ScientificCalculatorPage() {
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
          <li><span aria-current="page" className="text-gray-900 font-medium">Scientific Calculator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Free Calculator Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Scientific Calculator — Free Online Scientific Calculator with Trig &amp; Log Functions</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Full-featured scientific calculator with trigonometric, logarithmic, and power functions — DEG/RAD modes, π and e constants, and calculation history.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Scientific Calculator tool"><ScientificCalculatorClient /></main>
        <PageEditorial />
              <ToolEngagement toolSlug="scientific-calculator" toolName="Scientific Calculator" />
      </SidebarAdLayout>
    </>
  );
}