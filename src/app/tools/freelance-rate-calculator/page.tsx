// src/app/tools/freelance-rate-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const FreelanceRateCalculatorClient = dynamic(
  () => import("./FreelanceRateCalculatorClient"),
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

const tool = tools.find((t) => t.slug === "freelance-rate-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Freelance Rate Calculator — Set Your Day Rate",
  description:
    "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours. Free, no signup.",
  keywords:
    "freelance rate calculator, freelance hourly rate, freelance pricing calculator, consultant rate calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/freelance-rate-calculator` },
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
    url: `${SITE_URL}/tools/freelance-rate-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Freelance Rate Calculator — Set Your Day Rate",
    description:
      "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Freelance Rate Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Freelance Rate Calculator — Set Your Day Rate",
    description:
      "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Freelance Rate Calculator",
  description:
    "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours. Free, no signup.",
  url: `${SITE_URL}/tools/freelance-rate-calculator`,
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
      name: "Freelance Rate Calculator",
      item: `${SITE_URL}/tools/freelance-rate-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is the minimum rate calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula works backwards from your income goal: Gross revenue needed = (Desired income + Business expenses) ÷ (1 − Tax rate). Then: Hourly rate = Gross revenue ÷ Billable hours per year. Billable hours = Hours per week × Weeks per year × Billable percentage. For example: $80k take-home + $5k expenses ÷ (1 − 0.25 tax) = $113,333 gross needed ÷ 1,440 billable hours (40h × 48wk × 75%) = $78.70/hour.",
      },
    },
    {
      "@type": "Question",
      name: "What billable percentage should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Billable percentage is the fraction of your working time that you actually charge clients for. The rest goes to admin, invoicing, marketing, sales calls, proposal writing, professional development, and downtime between projects. Experienced freelancers with full pipelines typically bill 65–80%. New freelancers with less established client bases may only bill 40–60%. Use 70% as a realistic starting point.",
      },
    },
    {
      "@type": "Question",
      name: "How should I estimate self-employment tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the US, self-employment tax (Social Security + Medicare) is 15.3% on net self-employment income, plus ordinary income tax on the rest. A common rough estimate is 25–30% all-in for moderate incomes. You can deduct half of SE tax and the cost of self-employed health insurance, which lowers the effective rate. Quarterly estimated tax payments are due in April, June, September, and January.",
      },
    },
    {
      "@type": "Question",
      name: "Should I add a buffer above the minimum rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — always. The calculated rate is your survival floor, not your market rate. Add at least 20–30% buffer to cover: scope creep and unpaid revision rounds, late-paying clients, client losses and dry spells, skills development, retirement savings, and the premium clients pay for expertise. Your market rate is also anchored by what competitors charge — research your sector's going rates.",
      },
    },
    {
      "@type": "Question",
      name: "How do I raise my rates with existing clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Give existing clients 30–60 days notice and frame the increase as a reflection of your growing expertise and the value you've delivered. A 10–15% annual increase is typical and usually accepted if delivered professionally. New clients should always receive your current rate — never discount for new business at the expense of your minimum viable rate.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Freelance Rate Calculator",
  description:
    "Step-by-step guide to using the free Freelance Rate Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Freelance Rate Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Freelance Rate Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function FreelanceRateCalculatorPage() {
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
              Freelance Rate Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Freelance Rate Calculator — Free Online Freelance Rate Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate your ideal freelance hourly rate based on income goals,
          expenses, and billable hours. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Freelance Rate Calculator tool">
          <FreelanceRateCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="freelance-rate-calculator"
          toolName="Freelance Rate Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
