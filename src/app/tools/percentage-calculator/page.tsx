// src/app/tools/percentage-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const PercentageCalculatorClient = dynamic(
  () => import("./PercentageCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "percentage-calculator");

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


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
    site: "@utilvia",
    creator: "@utilvia",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate X% of a number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find X% of a number, multiply the number by the percentage divided by 100. The formula is: Result = (Percentage ÷ 100) × Number. For example, to find 15% of 80: (15 ÷ 100) × 80 = 0.15 × 80 = 12. A quick mental shortcut: to find 10% of any number, move the decimal point one place to the left (10% of 250 = 25). For 5%, halve the 10% result (5% of 250 = 12.5). For 20%, double the 10% result (20% of 250 = 50). For 1%, move the decimal two places left (1% of 250 = 2.5). Combine these for any percentage: 17% = 10% + 5% + 2%.",
      },
    },
    {
      "@type": "Question",
      name: "What is the formula for percentage change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Percentage change measures how much a value has increased or decreased relative to its original value. The formula is: Percentage Change = ((New Value − Old Value) ÷ Old Value) × 100. A positive result means an increase; a negative result means a decrease. For example, if a product's price rises from $40 to $52: ((52 − 40) ÷ 40) × 100 = (12 ÷ 40) × 100 = 30% increase. If the price drops from $52 to $40: ((40 − 52) ÷ 52) × 100 = (−12 ÷ 52) × 100 = −23.08% (a 23.08% decrease)...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between percentage change and percentage difference?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Percentage change compares a new value to an original (old) value — it has a clear direction (increase or decrease) and the old value is always the reference point. It answers the question 'by what percentage did this change?'. Percentage difference compares two values where neither is the definitive 'original' — it measures the relative gap between them using their average as the base. The formula is: Percentage Difference = (|Value A − Value B| ÷ ((Value A + Value B) ÷ 2)) × 100. For example, comparing 80 and 120: |80 − 120| ÷ ((80 + 120) ÷ 2) × 100 = 40 ÷ 100 × 100 = 40% difference...",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate what percentage one number is of another?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find what percentage number A is of number B, divide A by B and multiply by 100. The formula is: Percentage = (A ÷ B) × 100. For example, to find what percentage 35 is of 140: (35 ÷ 140) × 100 = 0.25 × 100 = 25%. In plain language: 35 is 25% of 140. This calculation is commonly used for test scores (you got 42 out of 60 — what percentage?), budget analysis (expenses are $3,200 of a $8,000 budget — what percentage?), and proportional comparisons (segment A has 1,250 customers out of 5,000 total — what percentage?).",
      },
    },
    {
      "@type": "Question",
      name: "How do I increase or decrease a number by a percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To increase a number by X%, multiply by (1 + X/100). To decrease a number by X%, multiply by (1 − X/100). For example, to increase $200 by 15%: $200 × (1 + 0.15) = $200 × 1.15 = $230. To decrease $200 by 15%: $200 × (1 − 0.15) = $200 × 0.85 = $170. Equivalently, you can find X% of the number and add/subtract: 15% of $200 = $30; $200 + $30 = $230 (increase) or $200 − $30 = $170 (decrease). The multiplication method is more efficient for repeated calculations. Note: increasing by X% and then decreasing by X% does not return to the original — e.g. $200 → +15% → $230 → −15% → $195.50.",
      },
    },
    {
      "@type": "Question",
      name: "Why does a percentage increase followed by the same percentage decrease not return to the original value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is one of the most counterintuitive aspects of percentage arithmetic. When you increase by X%, the new value is larger — so the same percentage decrease is applied to a larger base, removing more in absolute terms than was added. For example, start at $100. Increase by 50%: $100 × 1.5 = $150. Decrease by 50%: $150 × 0.5 = $75 — not back to $100. The original $100 plus 50% added $50, but 50% of the new $150 removes $75. To reverse a percentage increase of X%, you need to decrease by X/(1+X/100)% — for a 50% increase, you need a 33.33% decrease to return to the original...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Percentage Calculator",
  description:
    "Step-by-step guide to using the free Percentage Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Percentage Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Percentage Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function PercentageCalculatorPage() {
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
            <a href="/" className="hover:text-yellow-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculators"
              className="hover:text-yellow-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Percentage Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-yellow-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Percentage Calculator — 5 Percentage Formulas, Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Five percentage calculators in one — find X% of Y, calculate
          percentage change, increase/decrease by %, and more.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Percentage Calculator tool">
          <PercentageCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="percentage-calculator"
          toolName="Percentage Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
