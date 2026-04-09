// src/app/tools/roi-calculator/page.tsx
import type { Metadata } from "next";
import RoiCalculatorClient from "./RoiCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "ROI Calculator — Calculate Return on Investment Free Online",
  description:
    "Calculate ROI, annualised ROI, net profit, and return multiple for any investment or campaign. Enter initial investment, final value, and time period. Free, no signup.",
  keywords:
    "ROI calculator, return on investment calculator, annualised ROI, investment return calculator, marketing ROI, campaign ROI, profit calculator, return multiple calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/roi-calculator` },
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
    url: `${SITE_URL}/tools/roi-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "ROI Calculator — Calculate Return on Investment Free Online",
    description:
      "Calculate ROI %, annualised ROI, net profit, and return multiple. Enter initial investment, final value, and time period. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free ROI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "ROI Calculator — Calculate Return on Investment Free Online",
    description:
      "Calculate ROI %, annualised ROI, net profit, and return multiple. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ROI Calculator",
  description:
    "Calculates return on investment (ROI) from initial investment amount, final value or total return, and time period in years. Outputs: ROI percentage [(Final Value - Initial Investment) ÷ Initial Investment × 100], annualised ROI [(Final Value / Initial Investment)^(1/years) - 1 × 100], net profit/loss (Final Value - Initial Investment), and return multiple (Final Value ÷ Initial Investment). Runs in the browser.",
  url: `${SITE_URL}/tools/roi-calculator`,
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
      name: "Finance Tools",
      item: `${SITE_URL}/tools/category/finance`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "ROI Calculator",
      item: `${SITE_URL}/tools/roi-calculator`,
    },
  ],
};

export default function RoiCalculatorPage() {
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
            <a href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/finance"
              className="hover:text-emerald-600 transition-colors"
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              ROI Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          ROI Calculator — Calculate Return on Investment Free Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Calculate ROI %, annualised ROI, net profit, and return multiple —
          enter your initial investment, final value, and time period.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="ROI Calculator tool">
          <RoiCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="roi-calculator" toolName="ROI Calculator" />
      </SidebarAdLayout>
    </>
  );
}
