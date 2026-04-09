// src/app/tools/sales-tax-calculator/page.tsx
import type { Metadata } from "next";
import SalesTaxCalculatorClient from "./SalesTaxCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
import { tools } from "@/lib/tools";
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

const tool = tools.find((t) => t.slug === "sales-tax-calculator");

export const metadata: Metadata = {
  title:
    "Sales Tax Calculator — Calculate Tax & Final Price by US State, Free Online",
  description:
    "Calculate sales tax amount and final price for any purchase. Select your US state for the exact tax rate, or enter a custom rate. Add multiple items to a cart and calculate tax on the total. Free, no signup.",
  keywords:
    "sales tax calculator, sales tax by state, calculate sales tax, sales tax rate, how much is sales tax, tax on purchase, price after tax, US sales tax calculator, free sales tax calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/sales-tax-calculator` },
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
    url: `${SITE_URL}/tools/sales-tax-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Sales Tax Calculator — Calculate Tax & Final Price by US State, Free Online",
    description:
      "Calculate sales tax for any US state or custom rate. Add multiple items to a cart and see the total tax and final price instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Sales Tax Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Sales Tax Calculator — Calculate Tax & Final Price by US State, Free Online",
    description:
      "Calculate sales tax by US state or custom rate — single item or multi-item cart. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sales Tax Calculator",
  description:
    "Calculate sales tax amount and total price for any purchase. Select a US state to auto-fill the tax rate, or enter a custom rate. Supports both single-item and multi-item cart modes with an itemised breakdown of tax per item.",
  url: `${SITE_URL}/tools/sales-tax-calculator`,
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
      name: "Sales Tax Calculator",
      item: `${SITE_URL}/tools/sales-tax-calculator`,
    },
  ],
};

export default function SalesTaxCalculatorPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label='Breadcrumb' className='max-w-6xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-purple-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/calculator'
              className='hover:text-purple-600 transition-colors'
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Sales Tax Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1'>
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Sales Tax Calculator — Calculate Tax &amp; Final Price by US State,
          Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Calculate sales tax and final price for any US state or custom rate —
          single item or multi-item cart with full itemised breakdown.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id='main-content' aria-label='Sales Tax Calculator tool'>
          <SalesTaxCalculatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="sales-tax-calculator" toolName="Sales Tax Calculator" />
      </SidebarAdLayout>
    </>
  );
}
