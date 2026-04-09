// src/app/tools/rent-affordability-calculator/page.tsx
import type { Metadata } from "next";
import RentAffordabilityCalculatorClient from "./RentAffordabilityCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator — How Much Rent Can You Afford?",
  description:
    "Find out how much rent you can afford based on your income and the 30% rule. Calculate your maximum monthly rent instantly. Free.",
  keywords:
    "rent affordability calculator, how much rent can i afford, rent calculator, 30 percent rule rent, monthly rent budget",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/rent-affordability-calculator` },
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
    url: `${SITE_URL}/tools/rent-affordability-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Rent Affordability Calculator — How Much Rent Can You Afford?",
    description:
      "Find out how much rent you can afford based on your income and the 30% rule. Calculate your maximum monthly rent instantly. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Rent Affordability Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Rent Affordability Calculator — How Much Rent Can You Afford?",
    description:
      "Find out how much rent you can afford based on your income and the 30% rule. Calculate your maximum monthly rent instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rent Affordability Calculator",
  description:
    "Find out how much rent you can afford based on your income and the 30% rule. Calculate your maximum monthly rent instantly. Free.",
  url: `${SITE_URL}/tools/rent-affordability-calculator`,
  applicationCategory: "FinanceApplication",
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
      name: "Rent Affordability Calculator",
      item: `${SITE_URL}/tools/rent-affordability-calculator`,
    },
  ],
};

export default function RentAffordabilityCalculatorPage() {
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
            <a href="/" className="hover:text-violet-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/finance"
              className="hover:text-violet-600 transition-colors"
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Rent Affordability Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Rent Affordability Calculator — How Much Rent Can You Afford?
        </h1>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Rent Affordability Calculator tool">
          <RentAffordabilityCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="rent-affordability-calculator"
          toolName="Rent Affordability Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
