// src/app/tools/number-to-words-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const NumberToWordsConverterClient = dynamic(
  () => import("./NumberToWordsConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "number-to-words-converter");

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Number to Words Converter — Spell Any Number",
  description:
    "Convert any number to its English word form instantly. Supports negatives, decimals, and currency mode for cheque writing. Free, no signup required.",
  keywords:
    "number to words, number to words converter, numbers in words, spell out numbers, number word form, cheque writing tool, free number to words converter, online number to words converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/number-to-words-converter` },
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
    url: `${SITE_URL}/tools/number-to-words-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Number to Words Converter — Spell Any Number",
    description:
      "Convert any number to its English word form. Supports negatives, decimals, and currency mode. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Number to Words Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Number to Words Converter — Spell Any Number",
    description:
      "Convert numbers to English words. Negatives, decimals, currency mode. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Number to Words Converter",
  description:
    "Convert numbers to English words. Supports negative numbers, decimals, and currency formatting.",
  url: `${SITE_URL}/tools/number-to-words-converter`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Number to Words Converter",
      item: `${SITE_URL}/tools/number-to-words-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the largest number this tool can convert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports numbers up to 999 trillion (999,999,999,999,999). This range covers the vast majority of real-world use cases including financial documents, legal amounts, government budgets, scientific measurements, and invoices. Numbers above this limit will trigger a validation error. If you need to convert numbers beyond 999 trillion, you can break the number into parts — the word-form structure for quadrillions and beyond follows the same pattern: thousand, million, billion, trillion, quadrillion, quintillion.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use this for cheque or cheque writing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enable Currency mode by clicking the '💵 Currency mode' toggle — this appends 'dollars' to the word form, giving you the standard written amount used on personal and business cheques. For example, entering 1234.56 with currency mode on produces 'One thousand, two hundred thirty-four and 56/100 dollars'. For UK cheques, the format is the same but you would write 'pounds' in place of 'dollars' — you can copy the output and make that substitution manually. Most banks require the written amount to match the numeric amount exactly, so always double-check the output before writing it on a cheque.",
      },
    },
    {
      "@type": "Question",
      name: "How are decimal numbers handled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decimals up to two places are supported. The decimal portion is expressed as a fraction with 100 in the denominator — for example, 3.14 becomes 'three and 14/100' and 0.50 becomes 'zero and 50/100'. This format matches the convention used in formal financial writing, particularly cheque writing, where the cents portion is written as a fraction of a dollar. If you enter a number with more than two decimal places, the tool rounds to two places before converting.",
      },
    },
    {
      "@type": "Question",
      name: "Can I enter numbers with commas already in them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the tool automatically strips commas from the input before processing. You can paste formatted numbers like '1,234,567' or '10,000,000.00' directly from a spreadsheet or document and the tool will handle them correctly. The formatted display below the currency toggle shows how the tool has interpreted your input, which is a useful way to confirm it's read the number correctly.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the output use commas between groups in the word form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Commas are inserted between the scale groups (thousands, millions, billions, etc.) in the word form — for example, 'one million, two hundred thousand, three hundred' — to match standard English number-writing conventions and improve readability for very large numbers. In formal financial and legal writing, this punctuation is standard. Some style guides omit the comma after the millions group in smaller numbers, but the comma-separated form produced by this tool is widely accepted and unambiguous.",
      },
    },
    {
      "@type": "Question",
      name: "What is the correct way to write numbers in legal documents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In legal documents such as contracts, deeds, wills, and settlement agreements, the convention is to write both the numeric form and the word form — typically with the words first and the digits in parentheses, or vice versa. For example: 'the sum of Ten Thousand Dollars ($10,000)' or '$10,000 (ten thousand dollars)'. This double representation reduces the risk of fraud or misreading. Many jurisdictions have specific requirements for how amounts should be written in legal documents, so always check the relevant style guide or consult a legal professional for high-stakes documents...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Number to Words Converter",
  description:
    "Step-by-step guide to using the free Number to Words Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Number to Words Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Number to Words Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function NumberToWordsConverterPage() {
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
            <a href="/" className="hover:text-teal-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/writing-text-tools"
              className="hover:text-teal-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Number to Words Converter
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Number to Words Converter — Free Online Number to Words Converter
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert any number to its full English word form. Perfect for cheques,
          legal documents, and educational use.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Number to Words Converter tool">
          <NumberToWordsConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="number-to-words-converter"
          toolName="Number to Words Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
