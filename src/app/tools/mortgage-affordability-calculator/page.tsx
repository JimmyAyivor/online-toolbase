// src/app/tools/mortgage-affordability-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const MortgageAffordabilityCalculatorClient = dynamic(
  () => import("./MortgageAffordabilityCalculatorClient"),
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
const tool = tools.find((t) => t.slug === "mortgage-affordability-calculator");

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Mortgage Affordability Calculator — Budget Check",
  description:
    "Calculate how much mortgage you can afford based on income, debts, and down payment. Free, no signup.",
  keywords:
    "mortgage affordability calculator, how much mortgage can I afford, home affordability calculator, mortgage calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: `${SITE_URL}/tools/mortgage-affordability-calculator`,
  },
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
    url: `${SITE_URL}/tools/mortgage-affordability-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Mortgage Affordability Calculator — Budget Check",
    description:
      "Calculate how much mortgage you can afford based on income, debts, and down payment. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Mortgage Affordability Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Mortgage Affordability Calculator — Budget Check",
    description:
      "Calculate how much mortgage you can afford based on income, debts, and down payment. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mortgage Affordability Calculator",
  description:
    "Calculate how much mortgage you can afford based on income, debts, and down payment. Free, no signup.",
  url: `${SITE_URL}/tools/mortgage-affordability-calculator`,
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
      name: "Mortgage Affordability Calculator",
      item: `${SITE_URL}/tools/mortgage-affordability-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do lenders determine affordability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lenders primarily use two debt-to-income (DTI) ratios. The front-end ratio limits housing costs (mortgage principal, interest, taxes, insurance) to 28% of gross monthly income. The back-end ratio limits all monthly debts (housing + car loans + student loans + credit card minimums) to 36% of gross monthly income. The calculator applies both and uses the lower of the two results.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as 'monthly debts'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Include minimum monthly payments on: car loans, student loans, credit cards (minimum payment, not balance), personal loans, and any existing mortgage or rent. Do not include utilities, groceries, subscriptions, or phone bills — lenders don't count these. If you have no recurring debt payments, the back-end rule won't constrain you and the 28% front-end rule will be the binding limit.",
      },
    },
    {
      "@type": "Question",
      name: "How much should my down payment be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 20% down payment eliminates the requirement for private mortgage insurance (PMI), which typically costs 0.5–1.5% of the loan annually. However, many first-time buyers use 3–10% down with FHA or conventional loans. A larger down payment means a smaller loan, lower monthly payments, and potentially a better interest rate. The minimum is 3% for conventional loans, 3.5% for FHA loans with a credit score of 580+.",
      },
    },
    {
      "@type": "Question",
      name: "What other costs should I budget for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beyond the mortgage payment, budget for: property taxes (0.5–2.5% of value annually, highly location-dependent), homeowner's insurance ($800–$2,000/year typically), HOA fees if applicable, maintenance (budget 1% of home value annually), and closing costs (2–5% of loan amount, paid upfront). This calculator includes estimated property tax and insurance in the monthly payment figure.",
      },
    },
    {
      "@type": "Question",
      name: "How does the interest rate affect affordability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Interest rate has a large impact on affordability. At 5% on a $400k, 30-year loan the monthly payment is ~$2,147. At 7% it rises to ~$2,661 — a difference of $514/month or $6,168/year. A 2 percentage point increase in rates reduces maximum affordability by roughly 20% if monthly payment is fixed. This is why mortgage affordability fell sharply when rates rose in 2022–2023.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Mortgage Affordability Calculator",
  description:
    "Step-by-step guide to using the free Mortgage Affordability Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Mortgage Affordability Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Mortgage Affordability Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function MortgageAffordabilityCalculatorPage() {
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
              Mortgage Affordability Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Mortgage Affordability Calculator — Free Online Mortgage Affordability
          Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate how much mortgage you can afford based on income, debts, and
          down payment. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main
          id="main-content"
          aria-label="Mortgage Affordability Calculator tool"
        >
          <MortgageAffordabilityCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="mortgage-affordability-calculator"
          toolName="Mortgage Affordability Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
