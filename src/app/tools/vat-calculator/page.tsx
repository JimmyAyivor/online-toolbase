// src/app/tools/vat-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "vat-calculator");
const VatCalculatorClient = dynamic(
  () => import("./VatCalculatorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Free VAT Calculator — Add or Remove VAT Instantly",
  description:
    "Add VAT to a net price or remove VAT from a gross price. Supports UK 20%, reduced 5%, and any custom VAT rate. Shows net amount, VAT amount, and gross total. Free, no signup.",
  keywords:
    "VAT calculator, add VAT, remove VAT, VAT inclusive calculator, VAT exclusive, UK VAT calculator, 20% VAT, 5% VAT, reverse VAT calculator, net to gross, gross to net",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/vat-calculator` },
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
    url: `${SITE_URL}/tools/vat-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free VAT Calculator — Add or Remove VAT Instantly",
    description:
      "Add VAT to a net price or remove VAT from a gross price. UK 20%, reduced 5%, or custom rate. Shows net, VAT amount, and gross breakdown. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free VAT Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free VAT Calculator — Add or Remove VAT Instantly",
    description:
      "Add or remove VAT from any price. Custom rates supported. Shows full breakdown. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VAT Calculator",
  description:
    "Calculates VAT in two modes: Add VAT (net to gross — multiplies by 1 + rate) and Remove VAT (gross to net — divides by 1 + rate). Supports preset rates of 5%, 10%, 15%, 20%, 21%, 23%, and 25%, plus any custom rate. Displays the net amount, VAT amount, and gross total. Runs in the browser.",
  url: `${SITE_URL}/tools/vat-calculator`,
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
      name: "VAT Calculator",
      item: `${SITE_URL}/tools/vat-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you add VAT to a price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To add VAT to a net (ex-VAT) price, multiply the net amount by (1 + VAT rate as a decimal). For the UK standard rate of 20%: multiply by 1.20. For example, a net price of £100 + 20% VAT = £100 × 1.20 = £120 gross. The VAT amount alone is the net price multiplied by the rate: £100 × 0.20 = £20. The formula is: Gross = Net × (1 + rate/100). This tool calculates this instantly when you select 'Add VAT' mode — enter your net amount and select or type your VAT rate.",
      },
    },
    {
      "@type": "Question",
      name: "How do you remove VAT from a price (reverse VAT calculation)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To remove VAT from a gross (VAT-inclusive) price, divide the gross amount by (1 + VAT rate as a decimal). For 20% VAT: divide by 1.20. For example, a gross price of £120 ÷ 1.20 = £100 net. The VAT amount is the gross minus the net: £120 − £100 = £20. The formula is: Net = Gross ÷ (1 + rate/100). A common mistake is to simply subtract 20% from the gross, which gives the wrong answer (£120 − £20 = £100 happens to work for 20% because the percentages coincide, but this approach fails for other rates — for 5% VAT, subtracting 5% from gross gives the wrong net)...",
      },
    },
    {
      "@type": "Question",
      name: "What are the current UK VAT rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The UK has three main VAT rates. The standard rate is 20%, which applies to most goods and services — including electronics, adult clothing, restaurant meals, hotel rooms, and most professional services. The reduced rate of 5% applies to specific categories including domestic gas and electricity, children's car seats, contraceptive products, mobility aids for elderly or disabled people, and some residential renovation and conversion work...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between VAT-exempt and zero-rated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both zero-rated and VAT-exempt items are sold without VAT being charged to the customer, but they differ in their VAT treatment for the business. Zero-rated supplies are technically within the VAT system — businesses that sell zero-rated goods can still register for VAT and reclaim VAT on their costs (inputs). For example, a bakery selling bread (zero-rated) can reclaim VAT on the ingredients, equipment, and utilities it purchases. VAT-exempt supplies are outside the VAT system — businesses whose supplies are wholly exempt do not charge VAT but also cannot reclaim VAT on their costs...",
      },
    },
    {
      "@type": "Question",
      name: "When do I need to register for VAT in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the UK, VAT registration becomes compulsory when your taxable turnover exceeds £90,000 in any rolling 12-month period (as of 2024 — this threshold changes periodically). Taxable turnover includes standard-rated (20%) and reduced-rate (5%) and zero-rated (0%) sales, but not exempt sales. Once you exceed the threshold, you must register within 30 days...",
      },
    },
    {
      "@type": "Question",
      name: "What is VAT and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VAT (Value Added Tax) is a consumption tax charged on the sale of goods and services at each stage of the supply chain. Unlike a simple sales tax (which is only charged at the point of final sale), VAT is charged at each stage of production and distribution — but businesses registered for VAT can reclaim the VAT they pay on their own purchases (input VAT), so they only pay VAT on the value they add. The end consumer — who cannot reclaim VAT — ultimately bears the full VAT cost...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the VAT Calculator",
  description: "Step-by-step guide to using the free VAT Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free VAT Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The VAT Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function VatCalculatorPage() {
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
              href="/tools/category/calculator"
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
              VAT Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          VAT Calculator — Add or Remove VAT from Any Price Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Add VAT to a net price or remove VAT from a gross price — UK 20%,
          reduced 5%, or any custom rate with a full net/VAT/gross breakdown.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="VAT Calculator tool">
          <VatCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="vat-calculator" toolName="VAT Calculator" />
      </SidebarAdLayout>
    </>
  );
}
