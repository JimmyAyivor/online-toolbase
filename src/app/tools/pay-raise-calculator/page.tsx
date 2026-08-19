// src/app/tools/pay-raise-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const PayRaiseCalculatorClient = dynamic(
  () => import("./PayRaiseCalculatorClient"),
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
const tool = tools.find((t) => t.slug === "pay-raise-calculator");

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Pay Raise Calculator — Free Online Pay Raise Calculator",
  description:
    "Calculate the dollar value and percentage of a pay raise instantly. Compare before and after salary. Free, no signup.",
  keywords:
    "pay raise calculator, salary increase calculator, raise calculator, percentage raise, salary raise, pay increase calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/pay-raise-calculator` },
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
    url: `${SITE_URL}/tools/pay-raise-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Pay Raise Calculator — Free Online Pay Raise Calculator",
    description:
      "Calculate the dollar value and percentage of a pay raise instantly. Compare before and after salary. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Pay Raise Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Pay Raise Calculator — Free Online Pay Raise Calculator",
    description:
      "Calculate the dollar value and percentage of a pay raise instantly. Compare before and after salary. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pay Raise Calculator",
  description:
    "Calculate the dollar value and percentage of a pay raise instantly. Compare before and after salary. Free, no signup.",
  url: `${SITE_URL}/tools/pay-raise-calculator`,
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
      name: "Pay Raise Calculator",
      item: `${SITE_URL}/tools/pay-raise-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is the raise calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The dollar raise is your current salary multiplied by the raise percentage divided by 100. So a 5% raise on a $60,000 salary is $60,000 × 0.05 = $3,000, giving a new annual salary of $63,000. The monthly figure is the new annual salary divided by 12, and weekly is divided by 52. All figures are gross — before any taxes or deductions.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good raise percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cost-of-living raise typically runs 2–4% and keeps your purchasing power roughly flat with inflation. A merit raise for solid performance is usually 4–7%. Exceptional performers or people who have taken on significant new responsibilities might receive 8–15%. Promotions often involve 10–20% increases. If you are changing companies, job-switchers historically earn 10–20% more than internal hires.",
      },
    },
    {
      "@type": "Question",
      name: "How do I counter a low raise offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Research market rates for your role using LinkedIn Salary, Glassdoor, and Levels.fyi before any negotiation. Come in 10–15% above your target to leave room for negotiation. Quantify your achievements in revenue, cost savings, or metrics. If salary is capped, negotiate equity, bonus, extra PTO, or a remote work allowance instead.",
      },
    },
    {
      "@type": "Question",
      name: "Does a higher salary affect my taxes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — a higher salary pushes more of your income into higher tax brackets, but only on the amount above each bracket threshold. The US has a progressive system, so a raise doesn't mean your entire salary is taxed at a higher rate. Your effective tax rate will increase slightly, but your net take-home will still go up. Maximising 401(k) contributions can offset some of the additional tax.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I expect a raise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most companies do annual performance reviews with accompanying salary adjustments. Some fast-growing companies or competitive roles review every 6 months. If you haven't received a raise in 18+ months and your performance is strong, it is entirely reasonable to proactively request a conversation. Changing jobs every 2–3 years remains the most reliably effective strategy for accelerating salary growth in many fields.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Pay Raise Calculator",
  description:
    "Step-by-step guide to using the free Pay Raise Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Pay Raise Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Pay Raise Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function PayRaiseCalculatorPage() {
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
              Pay Raise Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Pay Raise Calculator — Free Online Pay Raise Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate the dollar value and percentage of a pay raise instantly.
          Compare before and after salary. Free, no signup.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Pay Raise Calculator tool">
          <PayRaiseCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="pay-raise-calculator"
          toolName="Pay Raise Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
