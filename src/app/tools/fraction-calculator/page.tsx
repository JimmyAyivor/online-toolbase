// src/app/tools/fraction-calculator/page.tsx
import type { Metadata } from "next";
import FractionCalculatorClient from "./FractionCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import { Link } from "lucide-react";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Fraction Calculator — Add, Subtract, Multiply & Divide Fractions Free Online",
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
    title:
      "Fraction Calculator — Add, Subtract, Multiply & Divide Fractions Free Online",
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
    title:
      "Fraction Calculator — Add, Subtract, Multiply & Divide Fractions Free Online",
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

export default function FractionCalculatorPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label='Breadcrumb' className='max-w-6xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-indigo-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <Link
              href='/tools/category/calculator'
              className='hover:text-indigo-600 transition-colors'
            >
              Calculator Tools
            </Link>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Fraction Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Fraction Calculator — Add, Subtract, Multiply &amp; Divide Fractions
          Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Add, subtract, multiply, or divide any two fractions — get the
          simplified result and decimal equivalent with step-by-step working
          shown.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Fraction Calculator tool'>
          <FractionCalculatorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
