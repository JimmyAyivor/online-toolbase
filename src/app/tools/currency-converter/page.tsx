// src/app/tools/currency-converter/page.tsx
import type { Metadata } from "next";
import CurrencyConverterClient from "./CurrencyConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Currency Converter — Live Exchange Rates for 30+ Currencies, Free Online",
  description:
    "Convert between 30+ world currencies using live exchange rates. USD to EUR, GBP to JPY, AUD to CAD, and more. Includes a multi-currency comparison table and rate history context. Free, no signup.",
  keywords:
    "currency converter, live exchange rates, USD to EUR, GBP to USD, forex converter, foreign exchange calculator, dollar to pound, dollar to euro, free currency converter, online currency converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/currency-converter` },
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
    url: `${SITE_URL}/tools/currency-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Currency Converter — Live Exchange Rates for 30+ Currencies, Free Online",
    description:
      "Convert between 30+ currencies with live exchange rates — USD, EUR, GBP, JPY, AUD, CAD, CHF, and more. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Currency Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Currency Converter — Live Exchange Rates for 30+ Currencies, Free Online",
    description:
      "Live rates for 30+ currencies — USD, EUR, GBP, JPY, AUD, CAD and more. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Currency Converter",
  description:
    "Convert between 30+ world currencies using live exchange rates fetched from a public API. Includes a multi-currency comparison table showing the entered amount in all available currencies simultaneously. Covers major currencies: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, MXN, and more.",
  url: `${SITE_URL}/tools/currency-converter`,
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
      name: "Currency Converter",
      item: `${SITE_URL}/tools/currency-converter`,
    },
  ],
};

export default function CurrencyConverterPage() {
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
            <a href='/' className='hover:text-emerald-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/finance'
              className='hover:text-emerald-600 transition-colors'
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Currency Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1'>
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Currency Converter — Live Exchange Rates for 30+ Currencies, Free
          Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Convert between 30+ world currencies with live exchange rates —
          includes a multi-currency comparison table.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Currency Converter tool'>
          <CurrencyConverterClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="currency-converter" toolName="Currency Converter" />
      </SidebarAdLayout>
    </>
  );
}
