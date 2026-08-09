// src/app/tools/rent-affordability-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "rent-affordability-calculator");
const RentAffordabilityCalculatorClient = dynamic(
  () => import("./RentAffordabilityCalculatorClient"),
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
  title: "Free Rent Affordability Calculator — How Much Rent?",
  description:
    "Find out how much rent you can afford based on your income and the 30% rule. Calculate your maximum monthly rent instantly. Free.",
  keywords:
    "rent affordability calculator, how much rent can i afford, rent calculator, 30 percent rule rent, monthly rent budget",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/rent-affordability-calculator` },
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
    url: `${SITE_URL}/tools/rent-affordability-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Rent Affordability Calculator — How Much Rent?",
    description:
      "Find out how much rent you can afford based on your income and the 30% rule. Calculate your maximum monthly rent instantly. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Rent Affordability Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Rent Affordability Calculator — How Much Rent?",
    description:
      "Find out how much rent you can afford based on your income and the 30% rule. Calculate your maximum monthly rent instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rent Affordability Calculator",
  description:
    "Find out how much rent you can afford based on your income and the 30% rule. Calculate your maximum monthly rent instantly. Free.",
  url: `${SITE_URL}/tools/rent-affordability-calculator`,
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
      name: "Rent Affordability Calculator",
      item: `${SITE_URL}/tools/rent-affordability-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the 30% rent rule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 30% rule states that you should spend no more than 30% of your gross (pre-tax) monthly income on housing costs. It originated in US housing policy in the 1980s and became the default affordability benchmark. For example, if your gross monthly income is $5,000, the 30% rule suggests keeping rent at or below $1,500. The rule is a useful starting point but does not account for high-cost cities, varying lifestyle costs, or different income levels — someone earning $10,000/month has more flexibility above 30% than someone earning $3,000/month.",
      },
    },
    {
      "@type": "Question",
      name: "Is the 30% rule realistic in expensive cities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In high cost-of-living cities like New York, San Francisco, London, Sydney, and Toronto, the 30% rule is frequently impossible to achieve. Many renters in these cities spend 40–50% of income on housing. In these markets, focus on what remains after rent rather than the percentage: ensure you have enough left for food, transport, savings, and an emergency fund. Some financial planners use a modified rule for expensive cities: keep total fixed costs (rent + utilities + loan payments) under 50% of net income.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use gross or net income for the calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 30% rule traditionally uses gross income (before taxes and deductions). However, since you actually live on your net (take-home) income, many planners argue net income is more practical. As a rough guide: if you use gross income at 30%, that's approximately equivalent to 40–45% of net income for a typical tax burden. Using net income with a 35–40% threshold is a reasonable alternative for practical budgeting.",
      },
    },
    {
      "@type": "Question",
      name: "What costs should I include in my housing budget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beyond base rent, include: utilities (electricity, gas, water, internet — typically $100–300/month), renters insurance ($15–30/month), parking ($50–300/month in cities), pet fees or pet deposits if applicable, and any building amenity fees. In some markets, landlords charge separately for water, trash, or building amenity access. Your total housing cost is rent plus all these recurring fees — compare this total to the calculator's affordability figure.",
      },
    },
    {
      "@type": "Question",
      name: "How does existing debt affect rent affordability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lenders use the Debt-to-Income (DTI) ratio to assess borrowing capacity: total monthly debt payments divided by gross monthly income. For renters, landlords often require that rent plus existing debt payments stay below 40–43% of gross income. This calculator lets you input existing monthly debt payments and shows both the raw affordability limit and the adjusted limit after debts — giving a more realistic picture than the simple percentage rule alone.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Rent Affordability Calculator",
  description:
    "Step-by-step guide to using the free Rent Affordability Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Rent Affordability Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Rent Affordability Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function RentAffordabilityCalculatorPage() {
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
            <a href="/" className="hover:text-violet-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/finance-calculators"
              className="hover:text-violet-600 transition-colors"
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Rent Affordability Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Rent Affordability Calculator — How Much Rent Can You Afford?
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Rent Affordability Calculator tool">
          <RentAffordabilityCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="rent-affordability-calculator"
          toolName="Rent Affordability Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
