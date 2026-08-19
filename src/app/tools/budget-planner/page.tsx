// src/app/tools/budget-planner/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const BudgetPlannerClient = dynamic(() => import("./BudgetPlannerClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "budget-planner");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Budget Planner — Free Online Budget Planner",
  description:
    "Plan your monthly budget by tracking income and expenses across categories. See where your money goes. Free, no signup.",
  keywords:
    "budget planner, monthly budget planner, budget calculator, expense tracker, income budget, personal budget planner",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/budget-planner` },
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
    url: `${SITE_URL}/tools/budget-planner`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Budget Planner — Free Online Budget Planner",
    description:
      "Plan your monthly budget by tracking income and expenses across categories. See where your money goes. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Budget Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Budget Planner — Free Online Budget Planner",
    description:
      "Plan your monthly budget by tracking income and expenses across categories. See where your money goes. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Budget Planner",
  description:
    "Plan your monthly budget by tracking income and expenses across categories. See where your money goes. Free, no signup.",
  url: `${SITE_URL}/tools/budget-planner`,
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
      name: "Budget Planner",
      item: `${SITE_URL}/tools/budget-planner`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the 50/30/20 budget rule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 50/30/20 rule divides your after-tax income into three buckets: 50% for needs (housing, utilities, groceries, insurance, transport), 30% for wants (dining out, entertainment, travel, hobbies), and 20% for savings and debt repayment. It's a popular starting framework because it's simple and flexible — but in high-cost cities, the 50% needs category often needs to go higher, squeezing other areas.",
      },
    },
    {
      "@type": "Question",
      name: "Should I budget from gross or net income?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Budget from your net (take-home) income for practical spending planning, since that's what you actually have available. Use gross income when calculating your savings rate as a percentage (since employer 401k matches and payroll deductions come out before you see your pay). If you're tracking everything including pre-tax savings like 401(k) contributions, gross is more comprehensive.",
      },
    },
    {
      "@type": "Question",
      name: "How do I handle irregular expenses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For irregular expenses like car registration, annual insurance premiums, or holiday gifts, calculate the annual total and divide by 12 to get a monthly figure. Add a 'Sinking funds' category to your budget at that monthly amount, and put that money into a dedicated savings account. When the bill arrives, you'll have the money waiting rather than scrambling.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good savings rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Financial independence research (the FIRE movement) suggests that a 50% savings rate leads to financial independence in roughly 17 years from a zero starting point. The standard financial planning benchmark is 15–20% (including employer contributions). At 10%, you're building a cushion but slowly. Below 5% leaves you vulnerable to any unexpected expense.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I review my budget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Review your budget monthly — compare actual bank and card spending against your plan and adjust category amounts based on reality. Do a bigger annual review each January to reset targets based on income changes, new financial goals, and lifestyle changes. Many budgeting apps sync with your accounts to automate the tracking; this planner is a great place to set the plan before importing it there.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Budget Planner",
  description:
    "Step-by-step guide to using the free Budget Planner on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Budget Planner on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Budget Planner provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function BudgetPlannerPage() {
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
              Budget Planner
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Budget Planner — Free Online Budget Planner
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Plan your monthly budget by tracking income and expenses across
          categories. See where your money goes. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Budget Planner tool">
          <BudgetPlannerClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="budget-planner" toolName="Budget Planner" />
      </SidebarAdLayout>
    </>
  );
}
