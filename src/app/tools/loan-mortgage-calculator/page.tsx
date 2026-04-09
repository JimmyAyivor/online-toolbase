// src/app/tools/loan-mortgage-calculator/page.tsx
import type { Metadata } from "next";
import LoanMortgageCalculatorClient from "./LoanMortgageCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Loan & Mortgage Calculator — Monthly Payment, Total Interest & Amortisation, Free Online",
  description:
    "Calculate monthly payments, total interest paid, and a first-year amortisation schedule for home mortgages, auto loans, and personal loans. Adjust loan amount, down payment, interest rate, and term. Free, no signup.",
  keywords:
    "mortgage calculator, loan calculator, monthly payment calculator, amortisation schedule, how much mortgage can I afford, auto loan calculator, personal loan calculator, total interest calculator, free mortgage calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/loan-mortgage-calculator` },
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
    url: `${SITE_URL}/tools/loan-mortgage-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Loan & Mortgage Calculator — Monthly Payment, Total Interest & Amortisation, Free Online",
    description:
      "Calculate monthly loan or mortgage payments, total interest, and a first-year amortisation breakdown. Home, auto, or personal loan. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Loan & Mortgage Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Loan & Mortgage Calculator — Monthly Payment, Total Interest & Amortisation, Free Online",
    description:
      "Monthly payment, total cost, and first-year amortisation schedule for any loan or mortgage. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Loan & Mortgage Calculator",
  description:
    "Calculate monthly loan payments, total interest paid, and a first-year amortisation schedule for home mortgages, auto loans, and personal loans. Adjustable sliders for loan amount ($10k–$1M), down payment, interest rate (0.1–20%), and loan term (1–30 years). Includes a principal vs interest payment breakdown chart.",
  url: `${SITE_URL}/tools/loan-mortgage-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Loan & Mortgage Calculator",
      item: `${SITE_URL}/tools/loan-mortgage-calculator`,
    },
  ],
};

export default function LoanMortgageCalculatorPage() {
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
            <a href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculator"
              className="hover:text-emerald-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Loan &amp; Mortgage Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Loan &amp; Mortgage Calculator — Monthly Payment, Total Interest &amp;
          Amortisation, Free Online
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Calculate monthly payments, total interest, and a first-year
          amortisation schedule for any home mortgage, auto loan, or personal
          loan.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Loan and Mortgage Calculator tool">
          <LoanMortgageCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="loan-mortgage-calculator"
          toolName="Loan & Mortgage Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
