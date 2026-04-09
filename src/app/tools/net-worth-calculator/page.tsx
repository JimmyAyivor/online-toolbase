// src/app/tools/net-worth-calculator/page.tsx
import type { Metadata } from "next";
import NetWorthCalculatorClient from "./NetWorthCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Net Worth Calculator — Calculate Your Net Worth Online",
  description:
    "Calculate your personal net worth by entering your assets and liabilities. Track what you own vs what you owe. Free, instant.",
  keywords:
    "net worth calculator, calculate net worth, personal net worth, assets and liabilities calculator, net worth tracker",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/net-worth-calculator` },
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
    url: `${SITE_URL}/tools/net-worth-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Net Worth Calculator — Calculate Your Net Worth Online",
    description:
      "Calculate your personal net worth by entering your assets and liabilities. Track what you own vs what you owe. Free, instant.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Net Worth Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Net Worth Calculator — Calculate Your Net Worth Online",
    description:
      "Calculate your personal net worth by entering your assets and liabilities. Track what you own vs what you owe. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Net Worth Calculator",
  description:
    "Calculate your personal net worth by entering your assets and liabilities. Track what you own vs what you owe. Free, instant.",
  url: `${SITE_URL}/tools/net-worth-calculator`,
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
      name: "Net Worth Calculator",
      item: `${SITE_URL}/tools/net-worth-calculator`,
    },
  ],
};

export default function NetWorthCalculatorPage() {
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
            <a href='/' className='hover:text-indigo-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/finance'
              className='hover:text-indigo-600 transition-colors'
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Net Worth Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Net Worth Calculator — Calculate Your Net Worth Online
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Net Worth Calculator tool'>
          <NetWorthCalculatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="net-worth-calculator" toolName="Net Worth Calculator" />
      </SidebarAdLayout>
    </>
  );
}
