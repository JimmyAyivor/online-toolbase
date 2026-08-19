// src/app/tools/investment-return-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const InvestmentReturnCalculatorClient = dynamic(
  () => import("./InvestmentReturnCalculatorClient"),
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

const tool = tools.find((t) => t.slug === "investment-return-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Investment Return Calculator — Growth & ROI",
  description:
    "Calculate the return on any investment with compound interest. See growth over time with charts. Free, no signup.",
  keywords:
    "investment return calculator, ROI calculator, compound interest calculator, investment calculator, stock return",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/investment-return-calculator` },
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
    url: `${SITE_URL}/tools/investment-return-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Investment Return Calculator — Growth & ROI",
    description:
      "Calculate the return on any investment with compound interest. See growth over time with charts. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Investment Return Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Investment Return Calculator — Growth & ROI",
    description:
      "Calculate the return on any investment with compound interest. See growth over time with charts. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Investment Return Calculator",
  description:
    "Calculate the return on any investment with compound interest. See growth over time with charts. Free, no signup.",
  url: `${SITE_URL}/tools/investment-return-calculator`,
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
      name: "Investment Return Calculator",
      item: `${SITE_URL}/tools/investment-return-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does compound interest work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compound interest means you earn returns on both your original principal and the accumulated interest from previous periods. With monthly compounding at 7% annually, each month you earn 7%/12 = 0.583% on the current balance. That earned interest is added to the balance and itself earns interest the next month. Over 20–30 years, this compounding effect becomes the dominant driver of portfolio growth — often called the 'eighth wonder of the world'.",
      },
    },
    {
      "@type": "Question",
      name: "What return rate should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The S&P 500 has historically returned ~10% nominal and ~7% inflation-adjusted annually over long periods. A globally diversified equity portfolio typically targets 6–8% real. Bonds average 2–4%. A conservative balanced portfolio (60% equity, 40% bond) might target 5–6%. Use 5–7% for planning purposes to avoid overestimating — being pleasantly surprised is better than being caught short.",
      },
    },
    {
      "@type": "Question",
      name: "How do monthly contributions affect growth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monthly contributions have a dramatic effect over long time horizons because each contribution also compounds. Adding $500/month to a $10,000 initial investment at 7% over 30 years produces roughly $600,000 — vs just $76,000 from the lump sum alone. Starting contributions early matters more than the amount: $200/month for 40 years often beats $500/month for 20 years.",
      },
    },
    {
      "@type": "Question",
      name: "Does this account for inflation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — the calculator shows nominal returns. To get inflation-adjusted results, subtract the expected inflation rate from your return rate before entering it. If your expected return is 8% and expected inflation is 3%, enter 5% to see real purchasing power growth. The year-by-year table still shows nominal dollar values, but they represent a consistent purchasing power basis.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Rule of 72?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Rule of 72 is a quick mental maths shortcut: divide 72 by your annual return rate to get the approximate years needed for your investment to double. At 7% return, 72 ÷ 7 ≈ 10.3 years to double. At 10% return, 72 ÷ 10 = 7.2 years. At 3% (a savings account), 72 ÷ 3 = 24 years. This illustrates why even small differences in return rate compound dramatically over decades.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Investment Return Calculator",
  description:
    "Step-by-step guide to using the free Investment Return Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Investment Return Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Investment Return Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function InvestmentReturnCalculatorPage() {
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
              Investment Return Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Investment Return Calculator — Free Online Investment Return
          Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate the return on any investment with compound interest. See
          growth over time with charts. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Investment Return Calculator tool">
          <InvestmentReturnCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="investment-return-calculator"
          toolName="Investment Return Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
