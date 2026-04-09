// src/app/tools/freelance-rate-calculator/page.tsx
import type { Metadata } from "next";
import FreelanceRateCalculatorClient from "./FreelanceRateCalculatorClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Freelance Rate Calculator — Free Online Freelance Rate Calculator",
  description:
    "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours. Free, no signup.",
  keywords:
    "freelance rate calculator, freelance hourly rate, freelance pricing calculator, consultant rate calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/freelance-rate-calculator` },
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
    url: `${SITE_URL}/tools/freelance-rate-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Freelance Rate Calculator — Free Online Freelance Rate Calculator",
    description:
      "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Freelance Rate Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Freelance Rate Calculator — Free Online Freelance Rate Calculator",
    description:
      "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Freelance Rate Calculator",
  description:
    "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours. Free, no signup.",
  url: `${SITE_URL}/tools/freelance-rate-calculator`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
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
      name: "Freelance Rate Calculator",
      item: `${SITE_URL}/tools/freelance-rate-calculator`,
    },
  ],
};

export default function FreelanceRateCalculatorPage() {
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
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/finance"
              className="hover:text-indigo-600 transition-colors"
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Freelance Rate Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Freelance Rate Calculator — Free Online Freelance Rate Calculator
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Calculate your ideal freelance hourly rate based on income goals,
          expenses, and billable hours. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Freelance Rate Calculator tool">
          <FreelanceRateCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="freelance-rate-calculator"
          toolName="Freelance Rate Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
