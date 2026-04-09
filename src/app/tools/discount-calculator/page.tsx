// src/app/tools/discount-calculator/page.tsx
import type { Metadata } from "next";
import DiscountCalculatorClient from "./DiscountCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Discount Calculator — Calculate Sale Price & Savings Instantly, Free Online",
  description:
    "Calculate the discounted price and amount saved for any percentage or fixed discount. Stack two discounts, add sales tax on top, or find what percentage off a price represents. Free, no signup.",
  keywords:
    "discount calculator, sale price calculator, percentage off calculator, how much will I save, stacked discounts, calculate discount, price after discount, free discount calculator, savings calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/discount-calculator` },
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
    url: `${SITE_URL}/tools/discount-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Discount Calculator — Calculate Sale Price & Savings Instantly, Free Online",
    description:
      "Calculate discounted price, savings amount, and effective discount percentage. Stack two discounts or add sales tax. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Discount Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Discount Calculator — Calculate Sale Price & Savings Instantly, Free Online",
    description:
      "Calculate sale price and savings for any discount — percentage, fixed, stacked, or with tax. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Discount Calculator",
  description:
    "Calculate discounted prices, savings amounts, and effective discount percentages. Supports percentage discounts, fixed amount discounts, stacked double discounts, and optional sales tax. Also calculates what percentage off a given sale price represents.",
  url: `${SITE_URL}/tools/discount-calculator`,
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
      name: "Discount Calculator",
      item: `${SITE_URL}/tools/discount-calculator`,
    },
  ],
};

export default function DiscountCalculatorPage() {
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
            <a href='/' className='hover:text-red-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/calculator'
              className='hover:text-red-600 transition-colors'
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Discount Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-red-600 uppercase tracking-widest mb-1'>
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Discount Calculator — Calculate Sale Price &amp; Savings Instantly,
          Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Calculate the discounted price and savings for any sale — percentage
          discount, fixed amount, stacked discounts, or with sales tax.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Discount Calculator tool'>
          <DiscountCalculatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="discount-calculator" toolName="Discount Calculator" />
      </SidebarAdLayout>
    </>
  );
}
