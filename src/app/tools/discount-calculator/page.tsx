// src/app/tools/discount-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const DiscountCalculatorClient = dynamic(
  () => import("./DiscountCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "discount-calculator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Discount Calculator — Sale Price & Savings",
  description:
    "Calculate the discounted price and amount saved for any percentage or fixed discount. Stack two discounts, add sales tax on top, or find what percentage off a price represents. Free, no signup.",
  keywords:
    "discount calculator, sale price calculator, percentage off calculator, how much will I save, stacked discounts, calculate discount, price after discount, free discount calculator, savings calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/discount-calculator` },
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
    url: `${SITE_URL}/tools/discount-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Discount Calculator — Sale Price & Savings",
    description:
      "Calculate discounted price, savings amount, and effective discount percentage. Stack two discounts or add sales tax. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Discount Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Discount Calculator — Sale Price & Savings",
    description:
      "Calculate sale price and savings for any discount — percentage, fixed, stacked, or with tax. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Discount Calculator",
  description:
    "Calculate discounted prices, savings amounts, and effective discount percentages. Supports percentage discounts, fixed amount discounts, stacked double discounts, and optional sales tax. Also calculates what percentage off a given sale price represents.",
  url: `${SITE_URL}/tools/discount-calculator`,
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
      name: "Discount Calculator",
      item: `${SITE_URL}/tools/discount-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate a percentage discount?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find the discounted price after a percentage discount, multiply the original price by (1 − discount/100). For example, a 30% discount on $80: $80 × (1 − 0.30) = $80 × 0.70 = $56. The amount saved is the original price minus the discounted price: $80 − $56 = $24. Equivalently, calculate the discount amount first — 30% of $80 = $24 — then subtract from the original price: $80 − $24 = $56. The multiplier method is faster for repeated calculations: multiply by 0.70 for 30% off, 0.75 for 25% off, 0.80 for 20% off, 0.85 for 15% off, 0.90 for 10% off.",
      },
    },
    {
      "@type": "Question",
      name: "How do stacked discounts work — is '20% off + an extra 10% off' the same as 30% off?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — stacked discounts are not additive. A 20% discount followed by an additional 10% discount results in a 28% total discount, not 30%. Here's why: the second discount is applied to the already-reduced price, not the original. Starting at $100: apply 20% off → $80. Then apply 10% off on $80 → $72. Total discount: $28, which is 28% off the original $100. The formula for stacked discounts is: Effective discount = 1 − ((1 − d1/100) × (1 − d2/100)). For 20% + 10%: 1 − (0.80 × 0.90) = 1 − 0.72 = 0.28 = 28%...",
      },
    },
    {
      "@type": "Question",
      name: "How do I find the original price if I only know the sale price and discount percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find the original price from the sale price and discount percentage, divide the sale price by (1 − discount/100). For example, if an item is on sale for $63 after a 30% discount: Original price = $63 ÷ (1 − 0.30) = $63 ÷ 0.70 = $90. Verification: 30% off $90 = $27 discount, $90 − $27 = $63. This reverse calculation is useful when a price tag shows the sale price and the discount percentage but not the original price — common in clearance sales where original prices are removed.",
      },
    },
    {
      "@type": "Question",
      name: "Is sales tax calculated on the original price or the discounted price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sales tax is applied to the final sale price after the discount has been applied — not on the original pre-discount price. If an item is $100 with a 20% discount and 8% sales tax, the calculation is: Discounted price = $100 × 0.80 = $80. Sales tax = $80 × 0.08 = $6.40. Total paid = $80 + $6.40 = $86.40. The exception applies to manufacturer coupons in some US states, where the state may require tax on the pre-coupon price because the retailer is reimbursed by the manufacturer. For retailer-issued discounts and promotional sales, tax is always on the discounted price.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate what percentage off a sale price is?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find the discount percentage when you know the original and sale price, use: Discount % = ((Original Price − Sale Price) ÷ Original Price) × 100. For example, an item originally $120 now selling for $84: ((120 − 84) ÷ 120) × 100 = (36 ÷ 120) × 100 = 30% off. This is the 'Find Discount %' mode in this calculator — enter the original and sale prices and it calculates the discount percentage automatically. This calculation is useful for comparing across different products or stores to determine which sale offers the best effective discount.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a discount and a markdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In retail, these terms are often used interchangeably by consumers but have distinct meanings in accounting and merchandising. A discount is a price reduction offered to a specific customer or under specific conditions — volume discounts, loyalty discounts, coupon discounts, or trade discounts given to wholesale buyers. A markdown is a permanent or semi-permanent reduction in the retail selling price of an item, typically applied to slow-moving inventory or at end-of-season. Markdowns are a cost to the retailer because they reduce the margin on goods already purchased at wholesale...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Discount Calculator",
  description:
    "Step-by-step guide to using the free Discount Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Discount Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Discount Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function DiscountCalculatorPage() {
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
            <a href="/" className="hover:text-red-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculators"
              className="hover:text-red-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Discount Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Discount Calculator — Calculate Sale Price &amp; Savings Instantly,
          Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate the discounted price and savings for any sale — percentage
          discount, fixed amount, stacked discounts, or with sales tax.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Discount Calculator tool">
          <DiscountCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="discount-calculator"
          toolName="Discount Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
