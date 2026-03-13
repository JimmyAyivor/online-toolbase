// src/app/tools/percentage-calculator/page.tsx
import type { Metadata } from "next";
import PercentageCalculatorClient from "./PercentageCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Percentage Calculator — 5 Percentage Formulas, Free Online",
  description:
    "Calculate percentages five ways: X% of Y, percentage change, increase/decrease by %, what % is X of Y, and find the original value. Instant results, free, no signup.",
  keywords:
    "percentage calculator, percentage change calculator, percent of a number, percentage increase calculator, percentage decrease calculator, what percent is, free percentage calculator, online percent calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/percentage-calculator` },
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
    url: `${SITE_URL}/tools/percentage-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Percentage Calculator — 5 Percentage Formulas, Free Online",
    description:
      "Calculate percentages five ways: X% of Y, percentage change, increase by %, decrease by %, and what % is X of Y. Instant results, free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Percentage Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Percentage Calculator — 5 Percentage Formulas, Free Online",
    description:
      "Five percentage calculators in one: X% of Y, percentage change, increase/decrease by %, and what % is X of Y. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Percentage Calculator",
  description:
    "Calculate percentages using five common formulas: find X% of a number, calculate percentage change between two values, increase or decrease a number by a percentage, and find what percentage one number is of another.",
  url: `${SITE_URL}/tools/percentage-calculator`,
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
      name: "Percentage Calculator",
      item: `${SITE_URL}/tools/percentage-calculator`,
    },
  ],
};

export default function PercentageCalculatorPage() {
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
            <a href='/' className='hover:text-yellow-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/calculator'
              className='hover:text-yellow-600 transition-colors'
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Percentage Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-yellow-600 uppercase tracking-widest mb-1'>
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Percentage Calculator — 5 Percentage Formulas, Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Five percentage calculators in one — find X% of Y, calculate
          percentage change, increase/decrease by %, and more.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Percentage Calculator tool'>
          <PercentageCalculatorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
