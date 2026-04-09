// src/app/tools/vat-calculator/page.tsx
import type { Metadata } from "next";
import VatCalculatorClient from "./VatCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "VAT Calculator — Add or Remove VAT from Any Price Free Online",
  description:
    "Add VAT to a net price or remove VAT from a gross price. Supports UK 20%, reduced 5%, and any custom VAT rate. Shows net amount, VAT amount, and gross total. Free, no signup.",
  keywords:
    "VAT calculator, add VAT, remove VAT, VAT inclusive calculator, VAT exclusive, UK VAT calculator, 20% VAT, 5% VAT, reverse VAT calculator, net to gross, gross to net",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/vat-calculator` },
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
    url: `${SITE_URL}/tools/vat-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "VAT Calculator — Add or Remove VAT from Any Price Free Online",
    description:
      "Add VAT to a net price or remove VAT from a gross price. UK 20%, reduced 5%, or custom rate. Shows net, VAT amount, and gross breakdown. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free VAT Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "VAT Calculator — Add or Remove VAT from Any Price Free Online",
    description:
      "Add or remove VAT from any price. Custom rates supported. Shows full breakdown. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VAT Calculator",
  description:
    "Calculates VAT in two modes: Add VAT (net to gross — multiplies by 1 + rate) and Remove VAT (gross to net — divides by 1 + rate). Supports preset rates of 5%, 10%, 15%, 20%, 21%, 23%, and 25%, plus any custom rate. Displays the net amount, VAT amount, and gross total. Runs in the browser.",
  url: `${SITE_URL}/tools/vat-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "VAT Calculator",
      item: `${SITE_URL}/tools/vat-calculator`,
    },
  ],
};

export default function VatCalculatorPage() {
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
              VAT Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          VAT Calculator — Add or Remove VAT from Any Price Free Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Add VAT to a net price or remove VAT from a gross price — UK 20%,
          reduced 5%, or any custom rate with a full net/VAT/gross breakdown.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="VAT Calculator tool">
          <VatCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="vat-calculator" toolName="VAT Calculator" />
      </SidebarAdLayout>
    </>
  );
}
