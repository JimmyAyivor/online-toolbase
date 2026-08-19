// src/app/tools/roi-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "roi-calculator");
const RoiCalculatorClient = dynamic(() => import("./RoiCalculatorClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "ROI Calculator — Calculate Return on Investment Free Online",
  description:
    "Calculate ROI, annualised ROI, net profit, and return multiple for any investment or campaign. Enter initial investment, final value, and time period. Free, no signup.",
  keywords:
    "ROI calculator, return on investment calculator, annualised ROI, investment return calculator, marketing ROI, campaign ROI, profit calculator, return multiple calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/roi-calculator` },
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
    url: `${SITE_URL}/tools/roi-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "ROI Calculator — Calculate Return on Investment Free Online",
    description:
      "Calculate ROI %, annualised ROI, net profit, and return multiple. Enter initial investment, final value, and time period. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free ROI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "ROI Calculator — Calculate Return on Investment Free Online",
    description:
      "Calculate ROI %, annualised ROI, net profit, and return multiple. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ROI Calculator",
  description:
    "Calculates return on investment (ROI) from initial investment amount, final value or total return, and time period in years. Outputs: ROI percentage [(Final Value - Initial Investment) ÷ Initial Investment × 100], annualised ROI [(Final Value / Initial Investment)^(1/years) - 1 × 100], net profit/loss (Final Value - Initial Investment), and return multiple (Final Value ÷ Initial Investment). Runs in the browser.",
  url: `${SITE_URL}/tools/roi-calculator`,
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
      name: "Finance Tools",
      item: `${SITE_URL}/tools/category/finance`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "ROI Calculator",
      item: `${SITE_URL}/tools/roi-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ROI and how is it calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ROI (Return on Investment) is a percentage that measures the profitability of an investment relative to its cost. The formula is: ROI = (Net Profit ÷ Initial Investment) × 100, where Net Profit = Final Value − Initial Investment. For example, if you invest $10,000 and receive $14,000 back, your Net Profit is $4,000 and your ROI is ($4,000 ÷ $10,000) × 100 = 40%. A positive ROI means the investment was profitable; a negative ROI means you lost money...",
      },
    },
    {
      "@type": "Question",
      name: "What is annualised ROI and why is it more useful than total ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Annualised ROI (also called Compound Annual Growth Rate or CAGR) adjusts the total ROI to account for the time period of the investment, expressing it as an equivalent annual rate. The formula is: Annualised ROI = [(Final Value ÷ Initial Investment)^(1 ÷ Years) − 1] × 100. For example, a 100% total ROI over 5 years is a 14.9% annualised ROI — not 20% (which would be the simple annual average)...",
      },
    },
    {
      "@type": "Question",
      name: "What is a 'return multiple' and when is it used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A return multiple (also called a money-on-money multiple or MoM) is the total final value divided by the initial investment, expressed as a multiplier. If you invest $10,000 and receive $30,000 back, your return multiple is 3.0× (you tripled your money). Return multiples are commonly used in private equity, venture capital, and real estate investment discussions because they provide an immediately intuitive measure of how much money was made relative to what was put in, without requiring knowledge of the investment period...",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate ROI for a marketing campaign?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For marketing ROI, the initial investment is your total campaign spend (ad spend, creative costs, agency fees, staff time, etc.) and the return is the revenue attributed to that campaign. Use the simple ROI formula: Marketing ROI = (Revenue − Cost) ÷ Cost × 100. For example, if you spend $5,000 on a campaign and it generates $20,000 in revenue, your marketing ROI is ($15,000 ÷ $5,000) × 100 = 300%. A common industry benchmark is that a 5:1 revenue-to-cost ratio (400% ROI) is considered good for marketing, and a 10:1 ratio (900% ROI) is exceptional...",
      },
    },
    {
      "@type": "Question",
      name: "What is a good ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "What constitutes a 'good' ROI depends heavily on the type of investment, the risk involved, and the time period. For stock market investments, the S&P 500 has historically returned approximately 10% per year on average (7% after inflation), so a 10% annualised ROI on equity investments is broadly considered 'market average'. For real estate, a 6–10% annualised ROI is typical depending on location and leverage. For venture capital and private equity, target returns are typically 20–25%+ annualised due to the high risk and illiquidity premium...",
      },
    },
    {
      "@type": "Question",
      name: "What are the limitations of ROI as a metric?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ROI has several important limitations. It doesn't account for risk — two investments with identical ROI percentages may have very different risk profiles. It can be manipulated by choice of inputs — marketing ROI calculations in particular vary enormously depending on how costs and revenues are defined. Simple ROI doesn't account for the time value of money beyond the annualised version — a dollar received today is worth more than a dollar received in 5 years. ROI doesn't capture opportunity cost — a 15% ROI might be poor if the same capital could earn 25% elsewhere...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the ROI Calculator",
  description:
    "Step-by-step guide to using the free ROI Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free ROI Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The ROI Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function RoiCalculatorPage() {
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
              ROI Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          ROI Calculator — Calculate Return on Investment Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate ROI %, annualised ROI, net profit, and return multiple —
          enter your initial investment, final value, and time period.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="ROI Calculator tool">
          <RoiCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="roi-calculator" toolName="ROI Calculator" />
      </SidebarAdLayout>
    </>
  );
}
