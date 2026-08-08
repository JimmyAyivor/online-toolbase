// src/app/tools/tip-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "tip-calculator");
const TipCalculatorClient = dynamic(() => import("./TipCalculatorClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Tip Calculator — Tips & Bill Splitting Instantly",
  description:
    "Calculate the tip amount and total bill for any percentage. Split between any number of people — shows per-person tip, bill, and total. Five quick-select presets plus custom tip. Free, no signup.",
  keywords:
    "tip calculator, bill splitter, how much to tip, tip percentage calculator, restaurant tip calculator, split bill calculator, tip and split, gratuity calculator, free tip calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/tip-calculator` },
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
    url: `${SITE_URL}/tools/tip-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Tip Calculator — Tips & Bill Splitting Instantly",
    description:
      "Calculate tip amount and total bill for any percentage. Split between up to 20 people — shows per-person breakdown. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Tip Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Tip Calculator — Tips & Bill Splitting Instantly",
    description:
      "Calculate tip and total, split by any number of people. Quick presets (10–25%) plus custom tip. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tip Calculator",
  description:
    "Calculate tip amounts and total bills instantly. Choose from preset tip percentages (10%, 15%, 18%, 20%, 25%) or enter a custom amount. Split the bill between 1–20 people with a per-person breakdown showing individual bill, tip, and total amounts.",
  url: `${SITE_URL}/tools/tip-calculator`,
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
      name: "Tip Calculator",
      item: `${SITE_URL}/tools/tip-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is a tip calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A tip is calculated by multiplying the pre-tax bill amount by the tip percentage. For example, a 20% tip on a $45.00 bill is calculated as $45.00 × 0.20 = $9.00. The total amount due is the bill plus the tip: $45.00 + $9.00 = $54.00. To split the total between multiple people, divide the total by the number of diners: $54.00 ÷ 3 people = $18.00 per person. This calculator does all of this arithmetic automatically — enter the bill amount, select a tip percentage, and set the number of people to see the instant breakdown.",
      },
    },
    {
      "@type": "Question",
      name: "Should I tip on the pre-tax or post-tax total?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tipping convention in the United States is to tip on the pre-tax subtotal, not the post-tax total. The service you received was not affected by the tax rate in your jurisdiction. However, tipping on the post-tax total is common enough that it's considered acceptable, and many people find it simpler to calculate a percentage of the final bill shown on the receipt. The difference is typically small: on a $50 bill with 8% sales tax, tipping 20% pre-tax gives $10.00, while tipping 20% post-tax gives $10.80...",
      },
    },
    {
      "@type": "Question",
      name: "How much should I tip at a restaurant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the United States, standard restaurant tipping ranges from 15% for adequate service to 20–25% for good to excellent service. As a general guide: 10% is considered below standard and typically indicates genuine dissatisfaction with the service (not the food); 15% is the traditional baseline for satisfactory service; 18% is a common midpoint for good service; 20% has become the de facto standard tip in many US cities and is the most commonly expected amount; 25% or more is appropriate for exceptional service or special occasions...",
      },
    },
    {
      "@type": "Question",
      name: "How do I split a bill unevenly between people?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator splits the bill evenly — each person pays an equal share of the total including tip. For uneven splits (where different people ordered different amounts), you would need to calculate each person's share individually: multiply each person's subtotal by the tip percentage to get their tip, then add the two together. For example, if Person A ordered $30 and Person B ordered $60, and you're tipping 20%, Person A pays $30 + $6 = $36 and Person B pays $60 + $12 = $72...",
      },
    },
    {
      "@type": "Question",
      name: "Is the tip included if there's already a service charge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some restaurants — particularly for large groups (typically 6 or more people) — automatically add a gratuity or service charge, usually 18–20%, directly to the bill. This is labelled as 'auto-gratuity', 'service charge', or 'gratuity' on the receipt. If this is already included, you do not need to add an additional tip, though you may choose to add a small extra amount for exceptional service. Always check your receipt carefully before adding a tip — paying an auto-gratuity plus a manual tip means double-tipping, which is common but not expected.",
      },
    },
    {
      "@type": "Question",
      name: "What are typical tip amounts for services other than restaurants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tipping expectations vary widely by service type. Hair stylists and barbers: 15–20% of the service cost. Taxi and rideshare drivers: 15–20% of the fare, though many apps prompt this automatically. Hotel housekeeping: $2–5 per night, left each day rather than at checkout. Food delivery: 15–20% of the order total, with a minimum of $3–5 for small orders given the distance and time involved. Bartenders: $1–2 per drink at a bar, or 15–20% on a tab. Movers: $20–50 per mover for a half-day, $50–100 per mover for a full day. Tattoo artists: 15–25% of the service cost...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Tip Calculator",
  description:
    "Step-by-step guide to using the free Tip Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Tip Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Tip Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function TipCalculatorPage() {
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
            <a href="/" className="hover:text-green-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculators"
              className="hover:text-green-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Tip Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Tip Calculator — Calculate Tips &amp; Split Bills Instantly, Free
          Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate tip and total bill for any percentage — split between up to
          20 people with a full per-person breakdown.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Tip Calculator tool">
          <TipCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="tip-calculator" toolName="Tip Calculator" />
      </SidebarAdLayout>
    </>
  );
}
