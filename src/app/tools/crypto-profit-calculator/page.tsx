// src/app/tools/crypto-profit-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CryptoProfitCalculatorClient = dynamic(
  () => import("./CryptoProfitCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "crypto-profit-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Crypto Profit Calculator — P&L Including Fees",
  description:
    "Calculate your cryptocurrency profit or loss from any trade. Enter buy and sell prices to see your gains. Free.",
  keywords:
    "crypto profit calculator, cryptocurrency profit calculator, crypto gains, bitcoin profit calculator, crypto ROI",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/crypto-profit-calculator` },
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
    url: `${SITE_URL}/tools/crypto-profit-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Crypto Profit Calculator — P&L Including Fees",
    description:
      "Calculate your cryptocurrency profit or loss from any trade. Enter buy and sell prices to see your gains. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Crypto Profit Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Crypto Profit Calculator — P&L Including Fees",
    description:
      "Calculate your cryptocurrency profit or loss from any trade. Enter buy and sell prices to see your gains. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Crypto Profit Calculator",
  description:
    "Calculate your cryptocurrency profit or loss from any trade. Enter buy and sell prices to see your gains. Free.",
  url: `${SITE_URL}/tools/crypto-profit-calculator`,
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
      name: "Crypto Profit Calculator",
      item: `${SITE_URL}/tools/crypto-profit-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is net profit calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Net profit = (Coins × Sell price) − Investment − Entry fee − Exit fee. Coins purchased = Investment ÷ Buy price. Entry fee = Investment × fee rate. Exit fee = Gross sale value × fee rate. So for a $1,000 investment at $30,000/coin sold at $45,000 with 0.1% fees: you buy 0.0333 coins, sell for $1,500, pay ~$2.50 total in fees, and net approximately $497.50 profit.",
      },
    },
    {
      "@type": "Question",
      name: "What trading fees should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common exchange fees: Binance spot trading 0.1% (0.075% with BNB discount), Coinbase Advanced 0.6% maker / 0.6% taker (regular), Kraken 0.16% maker / 0.26% taker, Gemini 0.2% maker / 0.4% taker. Note that fees apply to both the buy and the sell side. A seemingly small 0.5% fee per side equals 1% round-trip — on a $10,000 trade that is $100 in fees regardless of profit.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator account for taxes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — this calculator shows pre-tax profit. Cryptocurrency gains are typically subject to capital gains tax: short-term (held under 1 year) is taxed as ordinary income in the US, long-term (held 1+ year) at 0%, 15%, or 20% depending on your bracket. Some jurisdictions treat crypto trading losses as tax-deductible. Always consult a tax professional familiar with crypto for your jurisdiction.",
      },
    },
    {
      "@type": "Question",
      name: "What is ROI and how is it interpreted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ROI (Return on Investment) is the net profit as a percentage of the total invested (including entry fees). A 50% ROI means you made half of your original investment back in profit. An ROI of −20% means you lost 20% of what you put in. ROI does not account for time — a 50% gain over 10 years is very different from a 50% gain over 1 month. Annualised ROI factors in the holding period.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate profit for DCA positions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dollar-cost averaging (DCA) means buying at multiple prices over time. To calculate overall profit, you need your total investment amount and weighted average buy price. Add up all purchase costs and divide by total coins held to get your average entry price. Then enter that as your buy price in this calculator with your total investment amount.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Crypto Profit Calculator",
  description:
    "Step-by-step guide to using the free Crypto Profit Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Crypto Profit Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Crypto Profit Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function CryptoProfitCalculatorPage() {
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
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/finance-calculators"
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
              Crypto Profit Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Crypto Profit Calculator — Free Online Crypto Profit Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate your cryptocurrency profit or loss from any trade. Enter buy
          and sell prices to see your gains. Free.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Crypto Profit Calculator tool">
          <CryptoProfitCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="crypto-profit-calculator"
          toolName="Crypto Profit Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
