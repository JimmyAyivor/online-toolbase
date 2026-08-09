// src/app/tools/credit-card-payoff-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CreditCardPayoffCalculatorClient = dynamic(
  () => import("./CreditCardPayoffCalculatorClient"),
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

const tool = tools.find((t) => t.slug === "credit-card-payoff-calculator");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Credit Card Payoff Calculator — Pay Off Faster",
  description:
    "Calculate how long it takes to pay off your credit card and how much interest you'll pay. Free, no signup.",
  keywords:
    "credit card payoff calculator, pay off credit card, credit card interest calculator, debt payoff calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/credit-card-payoff-calculator` },
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
    url: `${SITE_URL}/tools/credit-card-payoff-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Credit Card Payoff Calculator — Pay Off Faster",
    description:
      "Calculate how long it takes to pay off your credit card and how much interest you'll pay. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Credit Card Payoff Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Credit Card Payoff Calculator — Pay Off Faster",
    description:
      "Calculate how long it takes to pay off your credit card and how much interest you'll pay. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Credit Card Payoff Calculator",
  description:
    "Calculate how long it takes to pay off your credit card and how much interest you'll pay. Free, no signup.",
  url: `${SITE_URL}/tools/credit-card-payoff-calculator`,
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
      name: "Credit Card Payoff Calculator",
      item: `${SITE_URL}/tools/credit-card-payoff-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is the payoff calculation done?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator uses the standard loan amortization formula. Each month, interest is calculated on the remaining balance (Balance × APR ÷ 12). The payment is applied first to interest, then to principal. This repeats until the balance reaches zero. Because early payments are mostly interest, pay-down accelerates significantly as the balance drops.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my payment only covers the minimum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your monthly payment equals or barely exceeds the monthly interest charge, almost nothing goes to reducing the principal. Many credit cards set minimums at 1–2% of the balance or the interest charge plus $25, whichever is greater. At a $5,000 balance with 20% APR, the monthly interest alone is $83 — a $100 minimum payment puts only $17 toward principal.",
      },
    },
    {
      "@type": "Question",
      name: "What is a balance transfer and when does it help?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A balance transfer moves your high-interest debt to a new card with a promotional 0% APR period (typically 12–21 months). During that window, every dollar of your payment reduces principal. The tool's red 'Total interest' figure shows how much you could save by eliminating interest during a 0% period. Most transfers charge a 3–5% fee — compare that fee against the interest savings to confirm it's worthwhile.",
      },
    },
    {
      "@type": "Question",
      name: "Should I pay off my credit card or invest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your credit card APR (typically 18–24%) exceeds your expected investment return (historically ~7–10% for a diversified stock portfolio), paying off the card first is the mathematically superior choice. A guaranteed 20% return from eliminating 20% APR debt beats an uncertain 10% market return. The exception is employer 401(k) matching — always capture the full match before paying extra debt.",
      },
    },
    {
      "@type": "Question",
      name: "What is the debt avalanche vs debt snowball method?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The avalanche method pays off the highest-APR debt first, minimising total interest paid — mathematically optimal. The snowball method pays off the smallest balance first, providing psychological wins from eliminating individual debts — often more sustainable behaviourally. If you have multiple cards, run this calculator for each to compare the avalanche order and see total interest across all.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Credit Card Payoff Calculator",
  description:
    "Step-by-step guide to using the free Credit Card Payoff Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Credit Card Payoff Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Credit Card Payoff Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function CreditCardPayoffCalculatorPage() {
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
              Credit Card Payoff Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Credit Card Payoff Calculator — Free Online Credit Card Payoff
          Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate how long it takes to pay off your credit card and how much
          interest you'll pay. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Credit Card Payoff Calculator tool">
          <CreditCardPayoffCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="credit-card-payoff-calculator"
          toolName="Credit Card Payoff Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
