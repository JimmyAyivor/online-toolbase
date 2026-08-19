// src/app/tools/hourly-to-salary-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const HourlyToSalaryCalculatorClient = dynamic(
  () => import("./HourlyToSalaryCalculatorClient"),
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

const tool = tools.find((t) => t.slug === "hourly-to-salary-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Hourly to Salary Calculator — Annual Pay Finder",
  description:
    "Convert hourly wage to annual salary and salary to hourly rate instantly. See weekly, monthly, and yearly breakdowns. Free, no signup.",
  keywords:
    "hourly to salary calculator, hourly wage to annual salary, salary to hourly, hourly rate calculator, annual salary calculator, hourly pay calculator, free salary calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/hourly-to-salary-calculator` },
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
    url: `${SITE_URL}/tools/hourly-to-salary-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Hourly to Salary Calculator — Annual Pay Finder",
    description:
      "Convert hourly wage to annual salary instantly. See weekly, monthly and yearly pay. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Hourly to Salary Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Hourly to Salary Calculator — Annual Pay Finder",
    description:
      "Convert hourly wage to annual salary instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hourly to Salary Calculator",
  description: "Convert hourly wage to annual salary and vice versa.",
  url: `${SITE_URL}/tools/hourly-to-salary-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Hourly to Salary Calculator",
      item: `${SITE_URL}/tools/hourly-to-salary-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is annual salary calculated from hourly rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Annual salary = Hourly rate × Hours per week × Weeks per year. The standard assumption for a full-time employee is 40 hours per week and 52 weeks per year, giving 2,080 working hours annually. So a $25/hour wage equals $52,000 per year gross. Adjust the hours and weeks fields if your work schedule differs — for example, part-time workers or those with unpaid leave periods.",
      },
    },
    {
      "@type": "Question",
      name: "Are these figures before or after tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All figures shown are gross (before-tax) amounts. Your actual take-home pay depends on your tax filing status, deductions, retirement contributions, health insurance premiums, and applicable federal, state, and local taxes. To estimate net pay, you'll need to apply your marginal tax rate or use a dedicated paycheck calculator that accounts for your specific withholdings.",
      },
    },
    {
      "@type": "Question",
      name: "What does biweekly pay mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biweekly means paid every two weeks — 26 pay periods per year. It is the most common pay schedule in the US. This differs from semi-monthly (twice a month, 24 pay periods per year). The biweekly amount shown is two weeks' worth of pay (weekly rate × 2). Some months have three biweekly pay periods, which is worth knowing for budgeting.",
      },
    },
    {
      "@type": "Question",
      name: "How do I compare a salary offer with my current hourly rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Switch to Salary → Hourly mode and enter the offered annual salary. Keep your standard hours (40/week, 52 weeks) to get the direct hourly equivalent. If the offered role requires more hours — say 50 per week — enter 50 in the hours field. The resulting lower hourly rate helps you compare like-for-like when evaluating whether the salary offer represents a pay increase, decrease, or lateral move relative to your current hourly wage.",
      },
    },
    {
      "@type": "Question",
      name: "How should I handle paid time off in this calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your salary includes paid vacation and sick days, you work fewer than 52 paid weeks but still receive pay for all 52. In that case, keep weeks at 52 — your hourly rate over actual working hours will be slightly higher than the standard calculation. If you are comparing with a role that offers no paid leave, reduce the weeks field to 50 (for 2 weeks unpaid) to get the true comparison on an hours-worked basis.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Hourly to Salary Calculator",
  description:
    "Step-by-step guide to using the free Hourly to Salary Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Hourly to Salary Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Hourly to Salary Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function HourlyToSalaryCalculatorPage() {
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
              href="/tools/category/calculators"
              className="hover:text-indigo-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Hourly to Salary Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Hourly to Salary Calculator — Free Online Hourly to Salary Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert hourly wage to annual salary or salary to hourly rate. See
          weekly, biweekly, monthly and yearly breakdowns. Free, no account
          needed.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Hourly to Salary Calculator tool">
          <HourlyToSalaryCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="hourly-to-salary-calculator"
          toolName="Hourly to Salary Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
