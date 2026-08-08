// src/app/tools/net-worth-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const NetWorthCalculatorClient = dynamic(
  () => import("./NetWorthCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "net-worth-calculator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Net Worth Calculator — Calculate Your Net Worth Online",
  description:
    "Calculate your personal net worth by entering your assets and liabilities. Track what you own vs what you owe. Free, instant.",
  keywords:
    "net worth calculator, calculate net worth, personal net worth, assets and liabilities calculator, net worth tracker",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/net-worth-calculator` },
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
    url: `${SITE_URL}/tools/net-worth-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Net Worth Calculator — Calculate Your Net Worth Online",
    description:
      "Calculate your personal net worth by entering your assets and liabilities. Track what you own vs what you owe. Free, instant.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Net Worth Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Net Worth Calculator — Calculate Your Net Worth Online",
    description:
      "Calculate your personal net worth by entering your assets and liabilities. Track what you own vs what you owe. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Net Worth Calculator",
  description:
    "Calculate your personal net worth by entering your assets and liabilities. Track what you own vs what you owe. Free, instant.",
  url: `${SITE_URL}/tools/net-worth-calculator`,
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
      name: "Net Worth Calculator",
      item: `${SITE_URL}/tools/net-worth-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is net worth and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Net worth is the difference between everything you own (assets) and everything you owe (liabilities): Net Worth = Total Assets − Total Liabilities. It is the single most comprehensive snapshot of your financial position at any moment. Positive net worth means your assets exceed your debts. Negative net worth (more common than people realise, especially for young adults with student loans) means liabilities exceed assets. Net worth matters because it is the foundation for financial goals — it shows whether you are building wealth or accumulating debt, and tracks your progress over time.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as an asset?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assets are anything with monetary value that you own: cash and savings accounts, checking accounts, investment accounts (stocks, bonds, ETFs), retirement accounts (401k, IRA, pension values), property (home value, rental properties), vehicles (at current market value), business ownership stakes, valuable personal property (jewellery, art, collectibles with verifiable value), and money owed to you. Do not include depreciating consumer goods like ordinary furniture or clothing — only items with a resale value worth tracking.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as a liability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Liabilities are debts and financial obligations: mortgage balance (not your home's value — that's an asset), car loans, student loans, credit card balances, personal loans, medical debt, tax liabilities, and any other money you owe. Use current outstanding balances, not original loan amounts. If you have a business, include business debts only if you are personally liable for them.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good net worth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no universal 'good' net worth — it depends heavily on age, income, cost of living, and goals. Common benchmarks: by age 30, a net worth equal to your annual salary is a solid foundation; by 40, 3× salary; by 50, 6× salary; by 60, 8× salary. US Federal Reserve data shows the median net worth for Americans under 35 is approximately $39,000, rising to $409,000 for those 65 and older. Comparing yourself to age peers is more useful than comparing to absolute numbers.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I calculate my net worth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monthly or quarterly is ideal for most people — frequent enough to see trends, not so frequent that short-term market fluctuations cause unnecessary anxiety. Track it in a simple spreadsheet with the date so you can chart progress over months and years. The trend line matters more than any single data point. A consistent upward trend — even slow — indicates you are building wealth.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Net Worth Calculator",
  description:
    "Step-by-step guide to using the free Net Worth Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Net Worth Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Net Worth Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function NetWorthCalculatorPage() {
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
              Net Worth Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Net Worth Calculator — Calculate Your Net Worth Online
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Net Worth Calculator tool">
          <NetWorthCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="net-worth-calculator"
          toolName="Net Worth Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
