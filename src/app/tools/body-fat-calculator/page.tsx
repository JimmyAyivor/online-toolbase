// src/app/tools/body-fat-calculator/page.tsx
import type { Metadata } from "next";
import BodyFatCalculatorClient from "./BodyFatCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Body Fat Calculator — Estimate Body Fat % with the US Navy Method Free",
  description: "Calculate body fat percentage using the US Navy circumference method. Enter height, weight, waist, neck, and hip measurements — get body fat %, category, lean mass, and fat mass. Metric and imperial. Free, no signup.",
  keywords: "body fat calculator, US navy body fat formula, body fat percentage calculator, lean mass calculator, fat mass calculator, body composition calculator, navy method body fat, waist neck height formula",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/body-fat-calculator` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/body-fat-calculator`, siteName: SITE_NAME, locale: "en_US", title: "Body Fat Calculator — Estimate Body Fat % with the US Navy Method Free", description: "Estimate body fat % using the US Navy formula. Enter circumference measurements and weight. Shows body fat %, category, lean mass, and fat mass. Metric and imperial. Free.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Body Fat Calculator" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Body Fat Calculator — Estimate Body Fat % with the US Navy Method Free", description: "Estimate body fat % using the US Navy circumference method. Shows lean mass and category. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Body Fat Calculator", description: "Estimates body fat percentage using the US Navy circumference method (also called the Hodgdon-Beckett formula). Takes height, weight, waist (at navel), and neck (below larynx) measurements for males; adds hip (widest point) for females. Returns body fat percentage, body composition category (Essential Fat, Athletes, Fitness, Average, Obese), lean mass, and fat mass. Supports metric (cm/kg) and imperial (in/lbs) units. Runs in the browser.", url: `${SITE_URL}/tools/body-fat-calculator`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Health Tools", item: `${SITE_URL}/tools/category/health` }, { "@type": "ListItem", position: 3, name: "Body Fat Calculator", item: `${SITE_URL}/tools/body-fat-calculator` }] };

export default function BodyFatCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-green-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/health" className="hover:text-green-600 transition-colors">Health Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Body Fat Calculator</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">Free Health Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Body Fat Calculator — Estimate Body Fat % with the US Navy Method Free</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Estimate your body fat percentage using the US Navy circumference method — enter your measurements and get body fat %, lean mass, fat mass, and a category rating.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Body Fat Calculator tool"><BodyFatCalculatorClient /></main>
        <PageEditorial />
              <ToolEngagement toolSlug="body-fat-calculator" toolName="Body Fat Calculator" />
      </SidebarAdLayout>
    </>
  );
}