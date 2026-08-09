// src/app/tools/loan-mortgage-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const LoanMortgageCalculatorClient = dynamic(
  () => import("./LoanMortgageCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "loan-mortgage-calculator");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Loan & Mortgage Calculator — Payment & Interest",
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
    title: "Free Loan & Mortgage Calculator — Payment & Interest",
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
    title: "Free Loan & Mortgage Calculator — Payment & Interest",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is a monthly mortgage payment calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monthly mortgage payments use the standard loan amortisation formula: M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where P is the principal (loan amount minus down payment), r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (years × 12). For example, a $250,000 loan at 6.5% for 30 years: r = 0.065/12 = 0.005417; n = 360; M = 250,000 × [0.005417 × (1.005417)^360] ÷ [(1.005417)^360 − 1] = $1,580.17 per month. Over 30 years, total payments = $568,861 — meaning $318,861 goes to interest on a $250,000 principal...",
      },
    },
    {
      "@type": "Question",
      name: "What is an amortisation schedule and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An amortisation schedule shows how each monthly payment is split between principal and interest over the life of the loan. In the early months, most of the payment goes to interest because the outstanding balance is high. As the balance decreases with each payment, progressively more goes toward principal. For a $250,000 mortgage at 6.5% for 30 years with a $1,580 monthly payment: Month 1 — $1,354 goes to interest, only $226 to principal. Month 60 — ~$1,289 interest, ~$291 principal. Month 180 — ~$1,143 interest, ~$437 principal. Month 360 — ~$9 interest, ~$1,571 principal...",
      },
    },
    {
      "@type": "Question",
      name: "How does the down payment affect my mortgage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A larger down payment reduces your loan in three important ways. First, it directly reduces the principal, which lowers every monthly payment and reduces the total interest paid over the life of the loan. Second, putting at least 20% down typically eliminates the requirement for Private Mortgage Insurance (PMI), which typically adds 0.5–1.5% of the loan amount annually — on a $300,000 loan, that's $1,500–$4,500 per year in additional cost. Third, a lower loan-to-value ratio (LTV) often qualifies you for a better interest rate, further reducing both monthly payments and total cost...",
      },
    },
    {
      "@type": "Question",
      name: "Is a 15-year mortgage or 30-year mortgage better?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 15-year mortgage has higher monthly payments but substantially lower total interest cost. On a $300,000 loan at 6.5%: a 30-year mortgage has a monthly payment of ~$1,896 and total interest of ~$382,560. The same loan on a 15-year term at 6.0% (15-year rates are typically lower) has a monthly payment of ~$2,532 — $636 more per month — but total interest of only ~$155,760, saving over $226,000. The 15-year is better if you can comfortably afford the higher payment, plan to stay in the property long-term, and prioritise building equity quickly...",
      },
    },
    {
      "@type": "Question",
      name: "What costs are not included in this calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator computes the principal and interest (P&I) component of a mortgage payment. A real mortgage payment often includes additional costs, commonly bundled into an 'PITI' payment: Property taxes (T) — typically 1–2% of home value per year, added to monthly payments held in escrow by the lender. Homeowner's insurance (I) — typically $100–200/month depending on coverage and location. Private Mortgage Insurance (PMI) if down payment is less than 20% — typically 0.5–1.5% of loan annually. HOA fees if applicable...",
      },
    },
    {
      "@type": "Question",
      name: "How does paying extra principal each month affect the loan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Making additional principal payments reduces the outstanding balance faster, which reduces the interest charged in every subsequent period (since interest accrues on the remaining balance). The compounding effect is significant: adding just $100/month in extra principal to a $300,000 mortgage at 6.5% for 30 years saves approximately $57,000 in total interest and pays off the loan about 4.5 years early. Adding $500/month saves about $151,000 and pays off the loan 10 years early. The savings are highest in the early years because interest is charged on a larger balance...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Loan & Mortgage Calculator",
  description:
    "Step-by-step guide to using the free Loan & Mortgage Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Loan & Mortgage Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Loan & Mortgage Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
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
              href="/tools/category/calculators"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Loan &amp; Mortgage Calculator — Monthly Payment, Total Interest &amp;
          Amortisation, Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate monthly payments, total interest, and a first-year
          amortisation schedule for any home mortgage, auto loan, or personal
          loan.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
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
