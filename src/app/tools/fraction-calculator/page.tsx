// src/app/tools/fraction-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const FractionCalculatorClient = dynamic(
  () => import("./FractionCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import { Link } from "lucide-react";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "fraction-calculator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Fraction Calculator — Add, Subtract & Multiply",
  description:
    "Calculate with fractions — add, subtract, multiply, or divide any two fractions and get the simplified result with step-by-step working shown. Free, instant, no signup.",
  keywords:
    "fraction calculator, add fractions, subtract fractions, multiply fractions, divide fractions, simplify fractions, fraction steps, fraction solver, GCD calculator, LCM fractions",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/fraction-calculator` },
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
    url: `${SITE_URL}/tools/fraction-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Fraction Calculator — Add, Subtract & Multiply",
    description:
      "Add, subtract, multiply, or divide two fractions and get the simplified result with step-by-step working. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Fraction Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Fraction Calculator — Add, Subtract & Multiply",
    description:
      "Calculate fractions with step-by-step working shown. Results in simplest form. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Fraction Calculator",
  description:
    "Calculates the result of adding, subtracting, multiplying, or dividing two fractions. Accepts integer numerators and denominators (including negatives). Displays result as a simplified fraction and decimal, with a numbered step-by-step working section showing the LCM for addition/subtraction, reciprocal multiplication for division, and GCD simplification. Runs in the browser.",
  url: `${SITE_URL}/tools/fraction-calculator`,
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
      name: "Fraction Calculator",
      item: `${SITE_URL}/tools/fraction-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you add fractions with different denominators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To add fractions with different denominators, you first need to find a common denominator — the Least Common Multiple (LCM) of both denominators. Then convert each fraction so it has that common denominator by multiplying its numerator and denominator by the same factor. Once both fractions share the same denominator, add the numerators and keep the denominator. Finally, simplify the result by dividing both numerator and denominator by their Greatest Common Divisor (GCD). For example, to add 1/3 + 1/4: the LCM of 3 and 4 is 12. Convert to 4/12 + 3/12. Add to get 7/12...",
      },
    },
    {
      "@type": "Question",
      name: "How do you subtract fractions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fraction subtraction follows the same process as addition, except you subtract the second numerator from the first after finding the common denominator. Find the LCM of both denominators, convert each fraction to the common denominator, subtract the numerators, and simplify. For example, 3/4 − 1/3: the LCM of 4 and 3 is 12. Convert to 9/12 − 4/12. Subtract to get 5/12. The result is already simplified. If the result is negative (because the second numerator is larger than the first), the fraction will have a negative numerator — this is correct and expected.",
      },
    },
    {
      "@type": "Question",
      name: "How do you multiply fractions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multiplying fractions is the simplest of the four operations: multiply the numerators together to get the new numerator, and multiply the denominators together to get the new denominator, then simplify. No common denominator is needed. For example, 2/3 × 3/4 = (2×3)/(3×4) = 6/12. Simplify by dividing by the GCD of 6 and 12, which is 6, to get 1/2. A useful shortcut is to simplify before multiplying — in 2/3 × 3/4, the 3 in the numerator of the second fraction and the 3 in the denominator of the first cancel out, giving 2/1 × 1/4 = 2/4 = 1/2.",
      },
    },
    {
      "@type": "Question",
      name: "How do you divide fractions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To divide fractions, multiply the first fraction by the reciprocal of the second fraction. The reciprocal means the fraction flipped — the numerator and denominator are swapped. So a/b ÷ c/d becomes a/b × d/c = (a×d)/(b×c). For example, 2/3 ÷ 4/5 becomes 2/3 × 5/4 = (2×5)/(3×4) = 10/12. Simplify by dividing by the GCD of 10 and 12, which is 2, to get 5/6. Remember: dividing by a fraction is the same as multiplying by its reciprocal.",
      },
    },
    {
      "@type": "Question",
      name: "What is a simplified fraction and how do you simplify one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A simplified fraction (also called a reduced fraction or fraction in lowest terms) is a fraction where the numerator and denominator share no common factors other than 1. To simplify a fraction, find the Greatest Common Divisor (GCD) of the numerator and denominator, then divide both by it. For example, 12/18: the GCD of 12 and 18 is 6. Divide both by 6: 12/6 = 2 and 18/6 = 3. The simplified fraction is 2/3. A fraction is fully simplified when its GCD is 1 — meaning no number larger than 1 divides evenly into both numerator and denominator. This calculator automatically simplifies all results.",
      },
    },
    {
      "@type": "Question",
      name: "What is LCM and why is it used in fraction addition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LCM stands for Least Common Multiple — the smallest positive number that is a multiple of two given numbers. When adding or subtracting fractions, you need both fractions to have the same denominator before you can combine their numerators. The LCM of the two denominators gives the smallest possible common denominator, which keeps numbers smaller and makes simplification easier. For example, to add 1/4 + 1/6: the LCM of 4 and 6 is 12 (smaller than 24, which is 4×6 but not the smallest). Convert to 3/12 + 2/12 = 5/12...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Fraction Calculator",
  description:
    "Step-by-step guide to using the free Fraction Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Fraction Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Fraction Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function FractionCalculatorPage() {
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
            <Link
              href="/tools/category/calculators"
              className="hover:text-indigo-600 transition-colors"
            >
              Calculator Tools
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Fraction Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Fraction Calculator — Add, Subtract, Multiply &amp; Divide Fractions
          Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Add, subtract, multiply, or divide any two fractions — get the
          simplified result and decimal equivalent with step-by-step working
          shown.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Fraction Calculator tool">
          <FractionCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="fraction-calculator"
          toolName="Fraction Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
