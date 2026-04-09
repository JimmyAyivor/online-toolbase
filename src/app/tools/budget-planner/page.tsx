// src/app/tools/budget-planner/page.tsx
import type { Metadata } from "next";
import BudgetPlannerClient from "./BudgetPlannerClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";
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
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
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
              href="/tools/category/finance"
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
        <h1 className="sr-only">Budget Planner — Free Online Budget Planner</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Plan your monthly budget by tracking income and expenses across
          categories. See where your money goes. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Budget Planner tool">
          <BudgetPlannerClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="budget-planner" toolName="Budget Planner" />
      </SidebarAdLayout>
    </>
  );
}
