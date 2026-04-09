// src/app/tools/pay-raise-calculator/page.tsx
import type { Metadata } from "next";
import PayRaiseCalculatorClient from "./PayRaiseCalculatorClient";
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
  title: "Pay Raise Calculator — Free Online Pay Raise Calculator",
  description:
    "Calculate the dollar value and percentage of a pay raise instantly. Compare before and after salary. Free, no signup.",
  keywords:
    "pay raise calculator, salary increase calculator, raise calculator, percentage raise, salary raise, pay increase calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/pay-raise-calculator` },
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
    url: `${SITE_URL}/tools/pay-raise-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Pay Raise Calculator — Free Online Pay Raise Calculator",
    description:
      "Calculate the dollar value and percentage of a pay raise instantly. Compare before and after salary. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Pay Raise Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Pay Raise Calculator — Free Online Pay Raise Calculator",
    description:
      "Calculate the dollar value and percentage of a pay raise instantly. Compare before and after salary. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pay Raise Calculator",
  description:
    "Calculate the dollar value and percentage of a pay raise instantly. Compare before and after salary. Free, no signup.",
  url: `${SITE_URL}/tools/pay-raise-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Pay Raise Calculator",
      item: `${SITE_URL}/tools/pay-raise-calculator`,
    },
  ],
};

export default function PayRaiseCalculatorPage() {
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
              href="/tools/category/calculator"
              className="hover:text-indigo-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Pay Raise Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Pay Raise Calculator — Free Online Pay Raise Calculator
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Calculate the dollar value and percentage of a pay raise instantly.
          Compare before and after salary. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Pay Raise Calculator tool">
          <PayRaiseCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="pay-raise-calculator"
          toolName="Pay Raise Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
