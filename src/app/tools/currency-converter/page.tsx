// src/app/tools/currency-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CurrencyConverterClient = dynamic(
  () => import("./CurrencyConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "currency-converter");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Currency Converter — Live Rates, 30+ Currencies",
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
    title: "Free Currency Converter — Live Rates, 30+ Currencies",
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
    title: "Free Currency Converter — Live Rates, 30+ Currencies",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often are the exchange rates updated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This currency converter fetches live exchange rates from a public API. Rates are typically updated every few minutes to once per hour depending on the API provider, and reflect interbank mid-market rates — the midpoint between the buy and sell rates that banks use to trade with each other. These mid-market rates are the fairest reference rates and are what financial data services like Reuters and Bloomberg publish...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between the mid-market rate and the rate I get from my bank?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The mid-market rate (also called the interbank rate or spot rate) is the midpoint between the buy price and sell price at which banks trade currencies with each other in the wholesale forex market. This is the rate you see on this converter and on Google. When you exchange money through a bank, travel money service, or exchange bureau, they apply a markup (called a spread or margin) above the mid-market rate to make a profit. A high-street bank might offer USD/GBP at 0.76 when the mid-market rate is 0.80 — that's a 5% effective fee...",
      },
    },
    {
      "@type": "Question",
      name: "What currencies are included in this converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This converter includes 30+ major and widely-traded world currencies: US Dollar (USD), Euro (EUR), British Pound (GBP), Japanese Yen (JPY), Canadian Dollar (CAD), Australian Dollar (AUD), Swiss Franc (CHF), Chinese Yuan Renminbi (CNY), Hong Kong Dollar (HKD), Singapore Dollar (SGD), Swedish Krona (SEK), Norwegian Krone (NOK), Danish Krone (DKK), Indian Rupee (INR), Mexican Peso (MXN), Brazilian Real (BRL), South African Rand (ZAR), Turkish Lira (TRY), South Korean Won (KRW), Russian Ruble (RUB), and others...",
      },
    },
    {
      "@type": "Question",
      name: "What factors cause exchange rates to change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Exchange rates fluctuate continuously based on supply and demand in the global foreign exchange market, which trades over $7 trillion per day. The main factors driving rate changes include: interest rate differentials — currencies of countries with higher interest rates tend to strengthen as foreign investors move capital there for better returns; inflation — higher inflation erodes purchasing power and tends to weaken a currency; economic data releases — GDP growth, unemployment, manufacturing output, and trade balance data move rates as they update expectations for future interest rates; ..",
      },
    },
    {
      "@type": "Question",
      name: "What is a reserve currency and why does the US dollar dominate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A reserve currency is one held in significant quantities by central banks and major institutions as part of their foreign exchange reserves, and used internationally for trade, debt, and financial transactions. The US dollar is the world's primary reserve currency, comprising approximately 58–60% of global foreign exchange reserves...",
      },
    },
    {
      "@type": "Question",
      name: "How do I get the best exchange rate when travelling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To get the best exchange rate when travelling: use a no-foreign-transaction-fee credit card for purchases where possible, as the card network rate (Visa/Mastercard) is very close to the mid-market rate with no added spread — cards like Charles Schwab, Wise, and Revolut are popular for this. Withdraw local currency from ATMs rather than exchanging cash — use your bank's ATMs or networks to minimise withdrawal fees, and always choose to be charged in local currency (decline the 'dynamic currency conversion' offer to pay in your home currency, which always uses an unfavourable rate)...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Currency Converter",
  description:
    "Step-by-step guide to using the free Currency Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Select your currencies",
      text: "Choose the source currency and target currency from the dropdown menus.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter the amount",
      text: "Type the amount you want to convert — the result updates instantly using live mid-market rates.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "View the converted amount",
      text: "See the converted value alongside the current exchange rate and when it was last updated.",
    },
  ],
};

export default function CurrencyConverterPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/finance-calculators"
              className="hover:text-emerald-600 transition-colors"
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Currency Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Currency Converter — Live Exchange Rates for 30+ Currencies, Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert between 30+ world currencies with live exchange rates —
          includes a multi-currency comparison table.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Currency Converter tool">
          <CurrencyConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="currency-converter"
          toolName="Currency Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
