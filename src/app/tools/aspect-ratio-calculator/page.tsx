// src/app/tools/aspect-ratio-calculator/page.tsx
import type { Metadata } from "next";
import AspectRatioCalculatorClient from "./AspectRatioCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Aspect Ratio Calculator — Free Online Aspect Ratio & Dimension Calculator",
  description: "Calculate aspect ratios from dimensions, find missing width or height from a ratio, and scale images proportionally. Includes 8 common ratio presets and a resolution reference table. Free, no signup.",
  keywords: "aspect ratio calculator, image aspect ratio, video aspect ratio, 16:9 calculator, 4:3 ratio, dimension calculator, scale image proportionally, resolution calculator, widescreen ratio",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/aspect-ratio-calculator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/aspect-ratio-calculator`, siteName: SITE_NAME, locale: "en_US", title: "Aspect Ratio Calculator — Free Online Aspect Ratio & Dimension Calculator", description: "Find ratio from dimensions, calculate missing width/height, and scale proportionally. Common ratio presets and resolution reference. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Aspect Ratio Calculator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Aspect Ratio Calculator — Free Online Dimension Calculator", description: "Find ratio, missing dimensions, and scale images. Common ratio presets. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Aspect Ratio Calculator", description: "Four-mode aspect ratio calculator: Find Ratio (calculates simplified ratio and decimal from width and height), Find Height (calculates height from width and ratio), Find Width (calculates width from height and ratio), and Scale (scales dimensions by percentage). Includes 8 common ratio presets (16:9, 4:3, 1:1, 9:16, 21:9, 3:2, 5:4, 16:10), visual dimension preview, megapixel calculation, and a 9-entry resolution reference table. Runs in the browser.", url: `${SITE_URL}/tools/aspect-ratio-calculator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Calculator Tools", item: `${SITE_URL}/tools/category/calculator` }, { "@type": "ListItem", position: 3, name: "Aspect Ratio Calculator", item: `${SITE_URL}/tools/aspect-ratio-calculator` }] };

export default function AspectRatioCalculatorPage() {
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
          <li><span aria-current="page" className="text-gray-900 font-medium">Aspect Ratio Calculator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Free Calculator Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Aspect Ratio Calculator — Free Online Aspect Ratio &amp; Dimension Calculator</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Find the aspect ratio from any dimensions, calculate a missing width or height, or scale images proportionally — with common ratio presets and a resolution reference.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Aspect Ratio Calculator tool"><AspectRatioCalculatorClient /></main>
        <PageEditorial />
              <ToolEngagement toolSlug="aspect-ratio-calculator" toolName="Aspect Ratio Calculator" />
      </SidebarAdLayout>
    </>
  );
}