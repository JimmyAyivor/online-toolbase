// src/app/tools/ovulation-calculator/page.tsx
import type { Metadata } from "next";
import OvulationCalculatorClient from "./OvulationCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Ovulation Calculator — Predict Your Fertile Days",
  description:
    "Calculate your ovulation date and fertile window based on your last period and cycle length. Free, private, no signup.",
  keywords:
    "ovulation calculator, fertile window calculator, ovulation date, when do i ovulate, fertility calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/ovulation-calculator` },
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
    url: `${SITE_URL}/tools/ovulation-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Ovulation Calculator — Predict Your Fertile Days",
    description:
      "Calculate your ovulation date and fertile window based on your last period and cycle length. Free, private, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Ovulation Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Ovulation Calculator — Predict Your Fertile Days",
    description:
      "Calculate your ovulation date and fertile window based on your last period and cycle length. Free, private, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ovulation Calculator",
  description:
    "Calculate your ovulation date and fertile window based on your last period and cycle length. Free, private, no signup.",
  url: `${SITE_URL}/tools/ovulation-calculator`,
  applicationCategory: "HealthApplication",
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
      name: "Health Tools",
      item: `${SITE_URL}/tools/category/health`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Ovulation Calculator",
      item: `${SITE_URL}/tools/ovulation-calculator`,
    },
  ],
};

export default function OvulationCalculatorPage() {
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
            <a href="/" className="hover:text-pink-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/health"
              className="hover:text-pink-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Ovulation Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Ovulation Calculator — Predict Your Fertile Days
        </h1>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Ovulation Calculator tool">
          <OvulationCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="ovulation-calculator"
          toolName="Ovulation Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
