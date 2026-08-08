// src/app/tools/savings-goal-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "savings-goal-calculator");
const SavingsGoalCalculatorClient = dynamic(
  () => import("./SavingsGoalCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Savings Goal Calculator — How Long to Reach Your Goal?",
  description:
    "Calculate how long it will take to reach a savings goal, or how much to save per month. Includes compound interest. Free, no signup.",
  keywords:
    "savings goal calculator, how long to save, monthly savings calculator, savings target calculator, compound interest savings",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/savings-goal-calculator` },
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
    url: `${SITE_URL}/tools/savings-goal-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Savings Goal Calculator — How Long to Reach Your Goal?",
    description:
      "Calculate how long it will take to reach a savings goal, or how much to save per month. Includes compound interest. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Savings Goal Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Savings Goal Calculator — How Long to Reach Your Goal?",
    description:
      "Calculate how long it will take to reach a savings goal, or how much to save per month. Includes compound interest. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Savings Goal Calculator",
  description:
    "Calculate how long it will take to reach a savings goal, or how much to save per month. Includes compound interest. Free, no signup.",
  url: `${SITE_URL}/tools/savings-goal-calculator`,
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
      name: "Savings Goal Calculator",
      item: `${SITE_URL}/tools/savings-goal-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does compound interest affect my savings goal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compound interest means you earn interest on both your original deposit and the interest already accumulated. Over time this creates exponential growth — commonly called 'the snowball effect'. For example, $10,000 earning 4% annually becomes $14,800 after 10 years without any additional contributions, purely through compounding. The longer your timeframe, the more dramatic the effect. This is why starting earlier — even with smaller amounts — often beats starting later with larger amounts.",
      },
    },
    {
      "@type": "Question",
      name: "What is a high-yield savings account (HYSA)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A high-yield savings account is a savings account that pays significantly more interest than a standard savings account. Traditional bank savings accounts often pay 0.01–0.1% APY, while HYSAs at online banks typically offer 4–5% APY (as of 2024–2025). They are FDIC-insured (up to $250,000) and work identically to regular savings accounts. Examples include Marcus by Goldman Sachs, Ally Bank, SoFi, and many credit unions. Switching to an HYSA is one of the highest-impact, lowest-effort changes you can make to your savings plan.",
      },
    },
    {
      "@type": "Question",
      name: "Should I pay off debt or save toward a goal first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The answer depends on interest rates. If your debt carries a higher interest rate than your savings return (e.g. 20% credit card debt vs 5% savings), pay off the debt first — it is mathematically equivalent to a guaranteed 20% investment. If your debt interest rate is lower than your expected investment return (e.g. 3% car loan vs 7% stock market), contributing to savings/investments while making minimum debt payments may make sense. Always eliminate high-interest consumer debt before prioritising non-emergency savings goals.",
      },
    },
    {
      "@type": "Question",
      name: "How much should I save each month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most widely recommended guideline is the 50/30/20 rule: 50% of take-home pay for needs, 30% for wants, and 20% for savings and debt repayment. For specific goals, work backwards from your target: if you need $12,000 in 2 years, that's $500/month. Emergency fund priority should be 3–6 months of expenses before focusing on other goals. Once the emergency fund is in place, prioritise retirement savings (especially if your employer offers matching contributions) before other savings goals.",
      },
    },
    {
      "@type": "Question",
      name: "What interest rate should I use in the calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the rate from the specific account where you plan to save. For HYSAs in 2024–2025, 4–5% APY is realistic. For a standard savings account, use 0.5% or lower. For a money market account, 3–4%. For bonds or CDs, check current rates. For long-term investment accounts (stocks), historical average is roughly 7% real return (after inflation), though this carries risk and is not appropriate for short-term goals. Using a slightly conservative rate (1–2% below your expected rate) builds in a useful margin of safety.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Savings Goal Calculator",
  description:
    "Step-by-step guide to using the free Savings Goal Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Savings Goal Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Savings Goal Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function SavingsGoalCalculatorPage() {
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
              Savings Goal Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Savings Goal Calculator — How Long to Reach Your Goal?
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Savings Goal Calculator tool">
          <SavingsGoalCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="savings-goal-calculator"
          toolName="Savings Goal Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
