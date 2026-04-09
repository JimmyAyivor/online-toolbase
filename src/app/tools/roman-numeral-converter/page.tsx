// src/app/tools/roman-numeral-converter/page.tsx
import type { Metadata } from "next";
import RomanNumeralConverterClient from "./RomanNumeralConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

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

export default function RomanNumeralConverterPage() {
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
            <a href='/' className='hover:text-orange-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/text'
              className='hover:text-orange-600 transition-colors'
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Roman Numeral Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1'>
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Roman Numeral Converter — Numbers to Roman Numerals
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Roman Numeral Converter tool'>
          <RomanNumeralConverterClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="roman-numeral-converter" toolName="Roman Numeral Converter" />
      </SidebarAdLayout>
    </>
  );
}
