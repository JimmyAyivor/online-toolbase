// src/app/tools/roman-numeral-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "roman-numeral-converter");
const RomanNumeralConverterClient = dynamic(
  () => import("./RomanNumeralConverterClient"),
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
  title: "Roman Numeral Converter — Numbers to Roman Numerals",
  description:
    "Convert numbers to Roman numerals and Roman numerals back to numbers. Works for 1 to 3,999. Free, instant.",
  keywords:
    "roman numeral converter, number to roman numerals, roman numerals to numbers, roman numeral calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/roman-numeral-converter` },
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
    url: `${SITE_URL}/tools/roman-numeral-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Roman Numeral Converter — Numbers to Roman Numerals",
    description:
      "Convert numbers to Roman numerals and Roman numerals back to numbers. Works for 1 to 3,999. Free, instant.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Roman Numeral Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Roman Numeral Converter — Numbers to Roman Numerals",
    description:
      "Convert numbers to Roman numerals and Roman numerals back to numbers. Works for 1 to 3,999. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Roman Numeral Converter",
  description:
    "Convert numbers to Roman numerals and Roman numerals back to numbers. Works for 1 to 3,999. Free, instant.",
  url: `${SITE_URL}/tools/roman-numeral-converter`,
  applicationCategory: "UtilitiesApplication",
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Roman Numeral Converter",
      item: `${SITE_URL}/tools/roman-numeral-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the rules of Roman numerals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Roman numerals follow two core rules: addition and subtraction. Addition: symbols are generally written largest-to-smallest left-to-right and their values added together (VIII = 5+1+1+1 = 8). Subtraction: a smaller symbol placed before a larger symbol is subtracted (IV = 5-1 = 4, IX = 10-1 = 9). The six subtractive pairs are IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). The same symbol cannot be repeated more than three times in a row (except M which can repeat for large thousands).",
      },
    },
    {
      "@type": "Question",
      name: "Why do Roman numerals not have a zero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Roman numeral system was developed for counting and recording quantities — contexts where zero (the absence of something) was not a concept that required representation. The number zero as a mathematical concept was developed independently in India and later introduced to Europe through Arabic mathematics in the medieval period. Roman numerals are therefore inadequate for algebra, positional arithmetic, or any calculation requiring zero. This is one reason the Indo-Arabic numeral system (1, 2, 3...) with its zero eventually replaced Roman numerals for mathematics.",
      },
    },
    {
      "@type": "Question",
      name: "What is the largest number in standard Roman numerals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard Roman numerals represent 1 to 3,999. The largest is MMMCMXCIX (3,999). For numbers above 3,999, historical texts used a vinculum (an overbar) to multiply a numeral by 1,000 — so V̄ = 5,000 and M̄ = 1,000,000. This tool uses the standard 1–3,999 range without vinculum notation.",
      },
    },
    {
      "@type": "Question",
      name: "Where are Roman numerals still used today?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Roman numerals remain common in: clock faces (I–XII), chapter and section numbering in books and legal documents, year numbering in film and television credits (copyright years like MMXXIV), Super Bowl numbering, Olympic Games editions, monarchs and popes (King Charles III, Pope John XXIII), centuries (21st Century → XXI Century), and decorative inscriptions on buildings and monuments. They convey formality, tradition, and permanence — which is why they are maintained in these contexts.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write years in Roman numerals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Convert the year digit by digit from thousands down. Example for 2024: 2000 = MM, 0 hundreds = nothing, 20 = XX, 4 = IV → MMXXIV. Example for 1999: 1000 = M, 900 = CM, 90 = XC, 9 = IX → MCMXCIX. Use this tool's examples list to quickly check any recent year — click any example to load it into the converter.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Roman Numeral Converter",
  description: "Step-by-step guide to using the free Roman Numeral Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Roman Numeral Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Roman Numeral Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function RomanNumeralConverterPage() {
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
            <a href="/" className="hover:text-orange-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/text"
              className="hover:text-orange-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Roman Numeral Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1">
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Roman Numeral Converter — Numbers to Roman Numerals
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Roman Numeral Converter tool">
          <RomanNumeralConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="roman-numeral-converter"
          toolName="Roman Numeral Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
