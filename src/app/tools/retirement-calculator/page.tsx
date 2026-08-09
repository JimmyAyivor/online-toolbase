// src/app/tools/retirement-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "retirement-calculator");
const RetirementCalculatorClient = dynamic(
  () => import("./RetirementCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Retirement Calculator — How Much Do You Need to Retire?",
  description:
    "Estimate your retirement savings target and monthly contributions needed based on your age, income, and retirement goals. Free.",
  keywords:
    "retirement calculator, how much to retire, retirement savings calculator, retirement planning tool, nest egg calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/retirement-calculator` },
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
    url: `${SITE_URL}/tools/retirement-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Retirement Calculator — How Much Do You Need to Retire?",
    description:
      "Estimate your retirement savings target and monthly contributions needed based on your age, income, and retirement goals. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Retirement Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Retirement Calculator — How Much Do You Need to Retire?",
    description:
      "Estimate your retirement savings target and monthly contributions needed based on your age, income, and retirement goals. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Retirement Calculator",
  description:
    "Estimate your retirement savings target and monthly contributions needed based on your age, income, and retirement goals. Free.",
  url: `${SITE_URL}/tools/retirement-calculator`,
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
      name: "Retirement Calculator",
      item: `${SITE_URL}/tools/retirement-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the 4% withdrawal rule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 4% rule (also called the Bengen Rule) states that a retiree can withdraw 4% of their portfolio in the first year of retirement, then adjust subsequent withdrawals for inflation, with a high probability of the portfolio lasting 30 years. It is based on historical US stock and bond market data. To find the nest egg target under this rule, multiply your desired annual retirement income by 25 (e.g. $50,000/year × 25 = $1,250,000 target). Modern financial planners sometimes use 3.5% or 3% to account for potentially lower future returns.",
      },
    },
    {
      "@type": "Question",
      name: "How much should I have saved for retirement by age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common benchmarks (Fidelity guidelines): by 30 — 1× annual salary; by 40 — 3× salary; by 50 — 6× salary; by 60 — 8× salary; by retirement (67) — 10× salary. These are rough guides — the actual amount depends on your expected lifestyle, health, Social Security income, pension entitlements, and when you plan to retire. The most important variable is your personal monthly spending in retirement, not your pre-retirement income.",
      },
    },
    {
      "@type": "Question",
      name: "What expected annual return should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a diversified stock/bond portfolio, historical long-term real returns (after inflation) are approximately 5–7% for stocks and 1–2% for bonds. A typical 60/40 portfolio (60% stocks, 40% bonds) averages roughly 5–6% nominal returns historically. For conservative projections, use 5–6%. For aggressive (mostly stocks) projections, use 7–8%. Avoid using returns above 8% for planning purposes — optimistic assumptions create false confidence. The calculator uses nominal returns; subtract 2–3% mentally to estimate inflation-adjusted purchasing power.",
      },
    },
    {
      "@type": "Question",
      name: "What is Social Security and should I include it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Social Security (US) is a government retirement benefit based on your lifetime earnings history. The average benefit in 2025 is approximately $1,900/month. You can estimate your personal benefit at ssa.gov. When using this calculator, reduce your 'monthly income needed in retirement' by your expected Social Security income — this lowers the required nest egg significantly. For a $4,000/month retirement need with $1,900 in Social Security, you only need to fund $2,100/month from your portfolio.",
      },
    },
    {
      "@type": "Question",
      name: "Should I prioritise a 401(k) or IRA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Priority order for most people: (1) 401(k) up to employer match — this is a 50–100% instant return you can't beat; (2) HSA if eligible (triple tax advantaged); (3) Roth IRA to the annual contribution limit ($7,000 in 2025); (4) 401(k) to the annual maximum ($23,500 in 2025). Roth accounts (tax-free growth and withdrawals) are generally preferable if you expect to be in a higher tax bracket in retirement. Traditional accounts (tax-deferred) are better if you expect lower taxes in retirement.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Retirement Calculator",
  description:
    "Step-by-step guide to using the free Retirement Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Retirement Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Retirement Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function RetirementCalculatorPage() {
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
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/finance-calculators"
              className="hover:text-blue-600 transition-colors"
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Retirement Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Retirement Calculator — How Much Do You Need to Retire?
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Retirement Calculator tool">
          <RetirementCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="retirement-calculator"
          toolName="Retirement Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
