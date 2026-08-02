// src/app/tools/sales-tax-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { stateTaxData } from "@/lib/stateTaxData";
const SalesTaxCalculatorClient = dynamic(
  () => import("./SalesTaxCalculatorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
import { tools } from "@/lib/tools";
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

const tool = tools.find((t) => t.slug === "sales-tax-calculator");

export const metadata: Metadata = {
  title:
    "Free Sales Tax Calculator — All 50 US States | Instant",
  description:
    "Calculate sales tax amount and final price for any purchase. Select your US state for the exact tax rate, or enter a custom rate. Add multiple items to a cart and calculate tax on the total. Free, no signup.",
  keywords:
    "sales tax calculator, sales tax by state, calculate sales tax, sales tax rate, how much is sales tax, tax on purchase, price after tax, US sales tax calculator, free sales tax calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/sales-tax-calculator` },
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
    url: `${SITE_URL}/tools/sales-tax-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Free Sales Tax Calculator — All 50 US States | Instant",
    description:
      "Calculate sales tax for any US state or custom rate. Add multiple items to a cart and see the total tax and final price instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Sales Tax Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Free Sales Tax Calculator — All 50 US States | Instant",
    description:
      "Calculate sales tax by US state or custom rate — single item or multi-item cart. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sales Tax Calculator",
  description:
    "Calculate sales tax amount and total price for any purchase. Select a US state to auto-fill the tax rate, or enter a custom rate. Supports both single-item and multi-item cart modes with an itemised breakdown of tax per item.",
  url: `${SITE_URL}/tools/sales-tax-calculator`,
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
      name: "Sales Tax Calculator",
      item: `${SITE_URL}/tools/sales-tax-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which US states have no sales tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Five US states have no statewide sales tax: Oregon, Montana, New Hampshire, Delaware, and Alaska. Alaska is a partial exception — it has no state sales tax, but many Alaskan boroughs and municipalities levy their own local sales taxes, so purchases in some Alaskan cities may still incur tax. New Hampshire taxes certain goods like cars, restaurant meals, and hotel rooms through separate specific taxes, but has no general sales tax. The other three states (Oregon, Montana, Delaware) have no sales tax at the state or local level...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between sales tax and use tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sales tax is collected by a seller at the point of purchase and remitted to the state government — the buyer pays it as part of the transaction. Use tax is a complementary tax imposed on the buyer for purchases made without paying sales tax — for example, buying goods online from an out-of-state retailer that doesn't collect your state's sales tax, or buying goods in a state with no sales tax and bringing them to a state with sales tax...",
      },
    },
    {
      "@type": "Question",
      name: "How is the sales tax rate calculated — state only or state plus local?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sales tax in the United States is typically a combination of the state rate plus any applicable county and city (local) rates. The state sets a base rate — for example, California's state rate is 7.25% — and local jurisdictions add their own on top. In California, some cities have combined rates as high as 10.75%. When this calculator shows a US state rate, it displays the state base rate. The actual combined rate including local taxes varies by city and county within the state, and changes frequently...",
      },
    },
    {
      "@type": "Question",
      name: "Is sales tax applied before or after discounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally, sales tax is applied to the final discounted price — the price you actually pay — rather than the original list price. If an item is $100 and there's a 20% discount, you pay $80 for the item. Sales tax is then calculated on $80, not $100. This is the standard treatment in most US states: taxable price = selling price after discount. However, some states have specific rules for coupon types...",
      },
    },
    {
      "@type": "Question",
      name: "What types of purchases are exempt from sales tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sales tax exemptions vary significantly by state, but several categories are commonly exempt. Food for home consumption (groceries) is exempt in 32 states, though prepared food (restaurant meals, hot deli items) is nearly always taxable. Prescription drugs are exempt in all states; over-the-counter medicines are exempt in many. Clothing is exempt in several states including Pennsylvania, New Jersey, and New York (below a per-item threshold). Medical devices and equipment are often exempt. Agricultural supplies and machinery used in production are typically exempt...",
      },
    },
    {
      "@type": "Question",
      name: "How does online sales tax work after the South Dakota v. Wayfair decision?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Before 2018, online retailers were only required to collect sales tax in states where they had a physical presence (nexus) — a store, warehouse, or employee. The 2018 Supreme Court decision in South Dakota v. Wayfair changed this, allowing states to require out-of-state online sellers to collect and remit sales tax based on economic nexus — typically triggered when a seller has more than $100,000 in annual sales into a state or more than 200 transactions per year in that state. All 45 states with a sales tax have now enacted economic nexus laws...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Sales Tax Calculator",
  description: "Step-by-step guide to using the free Sales Tax Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter the purchase price",
      text: "Type the pre-tax price of the item or shopping cart total into the price field.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select your state or enter a custom rate",
      text: "Choose one of the 45 US states with sales tax from the dropdown, or type a custom rate for a specific city or county.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "View your tax and total",
      text: "The calculator instantly shows the sales tax amount and the final price including tax. Use reverse mode to find the pre-tax price from a receipt total.",
    }
  ],
};

export default function SalesTaxCalculatorPage() {
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
            <a href="/" className="hover:text-purple-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/calculator"
              className="hover:text-purple-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Sales Tax Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Sales Tax Calculator — Calculate Tax &amp; Final Price by US State,
          Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate sales tax and final price for any US state or custom rate —
          single item or multi-item cart with full itemised breakdown.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Sales Tax Calculator tool">
          <SalesTaxCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="sales-tax-calculator"
          toolName="Sales Tax Calculator"
        />
      </SidebarAdLayout>
      <h2>Sales Tax by State</h2>
<ul>
  {stateTaxData.map((s) => (
    <li key={s.slug}>
      <a href={`/tools/sales-tax-calculator/state/${s.slug}`}>
        {s.name} Sales Tax Calculator
      </a>
    </li>
  ))}
</ul>
    </>
  );
}
