// src/app/tools/mortgage-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const MortgageCalculatorClient = dynamic(
  () => import("./MortgageCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "mortgage-calculator");

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Mortgage Calculator — Monthly Payment & Interest",
  description:
    "Calculate monthly mortgage payments, total interest, and full amortisation schedule. Enter home price, down payment, interest rate, and loan term. Includes property tax, insurance, PMI, and HOA. Free, no signup.",
  keywords:
    "mortgage calculator, monthly mortgage payment, mortgage amortisation, home loan calculator, mortgage interest calculator, down payment calculator, house payment calculator, principal and interest",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/mortgage-calculator` },
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
    url: `${SITE_URL}/tools/mortgage-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Mortgage Calculator — Monthly Payment & Interest",
    description:
      "Calculate monthly mortgage payments, total interest, and full amortisation schedule. Includes property tax, insurance, PMI, and HOA. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Mortgage Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Mortgage Calculator — Monthly Payment & Interest",
    description:
      "Monthly payments, total interest, full amortisation schedule. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mortgage Calculator",
  description:
    "Calculates monthly principal-and-interest mortgage payment using the standard amortisation formula, plus optional additional monthly costs (property tax, home insurance, PMI, HOA). Shows total monthly payment, total interest paid, total cost, and a paginated full amortisation schedule. Supports multiple currencies and loan terms 1–50 years. Runs in the browser. Not financial advice.",
  url: `${SITE_URL}/tools/mortgage-calculator`,
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
      name: "Mortgage Calculator",
      item: `${SITE_URL}/tools/mortgage-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is my monthly mortgage payment calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The monthly principal and interest payment is calculated using the standard amortisation formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1], where P is the loan principal (home price minus down payment), r is the monthly interest rate (annual rate divided by 12 and by 100), and n is the total number of monthly payments (loan term in years × 12). This formula distributes the loan repayment evenly across all monthly payments so that each payment is identical, while the split between principal and interest changes over time — early payments are mostly interest, and later payments are mostly principal...",
      },
    },
    {
      "@type": "Question",
      name: "How does a 15-year vs 30-year mortgage compare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 15-year mortgage has a higher monthly payment than a 30-year mortgage for the same loan amount but results in dramatically less total interest paid and builds equity much faster. For a $400,000 loan at 6.5%: the 30-year mortgage has a monthly payment of approximately $2,528 with total interest of approximately $510,000. The 15-year mortgage has a monthly payment of approximately $3,487 (38% higher) but total interest of only approximately $227,000 — saving around $283,000 in interest over the life of the loan. The trade-off is higher monthly cash flow commitment with a 15-year...",
      },
    },
    {
      "@type": "Question",
      name: "What is PMI and when is it required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PMI (Private Mortgage Insurance) is insurance that protects the lender — not the buyer — in case of default. It is typically required in the US when the down payment is less than 20% of the home price (i.e. the loan-to-value ratio exceeds 80%). PMI is not a fixed cost — it typically ranges from 0.1% to 2% of the loan amount per year, divided into monthly payments. On a $400,000 loan at 0.5% PMI, that's $2,000/year or approximately $167/month. PMI can be cancelled once you've paid down the loan to 80% of the original appraised value (by law in the US, lenders must cancel it at 78% LTV)...",
      },
    },
    {
      "@type": "Question",
      name: "What is an amortisation schedule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An amortisation schedule is a complete table showing each monthly payment broken down into its principal and interest components, plus the remaining loan balance after each payment. In early months, most of the payment covers interest — for a 6.5%, 30-year mortgage, over 70% of the first payment goes to interest. As the balance decreases, the interest portion shrinks and the principal portion grows, even though the total payment remains constant...",
      },
    },
    {
      "@type": "Question",
      name: "How much does an extra monthly payment save?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Making even one extra mortgage payment per year — or dividing your monthly payment by 12 and adding that amount to each monthly payment — can save tens of thousands in interest and shorten the loan term significantly. For a 30-year, $400,000 mortgage at 6.5%: making one extra payment per year shaves approximately 4–5 years off the loan term and saves approximately $60,000–70,000 in total interest...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Mortgage Calculator",
  description:
    "Step-by-step guide to using the free Mortgage Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Mortgage Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Mortgage Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function MortgageCalculatorPage() {
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
              Mortgage Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Mortgage Calculator — Free Online Mortgage Payment Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate monthly mortgage payments, total interest, and a full
          amortisation schedule — with property tax, insurance, PMI, and HOA
          included.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Mortgage Calculator tool">
          <MortgageCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="mortgage-calculator"
          toolName="Mortgage Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
