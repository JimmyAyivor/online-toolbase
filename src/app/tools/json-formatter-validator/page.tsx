// src/app/tools/json-formatter-validator/page.tsx
import type { Metadata } from "next";
import JsonFormatterValidatorClient from "./JsonFormatterValidatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "JSON Formatter & Validator — Format, Beautify & Validate JSON Free & Instant",
  description:
    "Format, beautify, and validate JSON data instantly in your browser. Adjustable indentation, sort keys, minify, copy, and download. Real-time error messages. Free, no signup.",
  keywords:
    "json formatter, json validator, json beautifier, json minifier, format json online, validate json, json pretty print, json lint, online json formatter, free json tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/json-formatter-validator` },
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
    url: `${SITE_URL}/tools/json-formatter-validator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "JSON Formatter & Validator — Format, Beautify & Validate JSON Free & Instant",
    description:
      "Format, beautify, and validate JSON instantly. Adjustable indentation, sort keys, minify, copy, and download. Real-time validation errors. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online JSON Formatter & Validator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "JSON Formatter & Validator — Format, Beautify & Validate JSON Free & Instant",
    description:
      "Format, validate, and minify JSON instantly. Real-time error messages, sort keys, download. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON Formatter & Validator",
  description:
    "Format, beautify, and validate JSON data instantly. Adjustable indentation, sort keys alphabetically, minify, copy, and download. Real-time error messages with exact error position.",
  url: `${SITE_URL}/tools/json-formatter-validator`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "JSON Formatter & Validator",
      item: `${SITE_URL}/tools/json-formatter-validator`,
    },
  ],
};

export default function JsonFormatterValidatorPage() {
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
            <a href='/' className='hover:text-cyan-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/developer'
              className='hover:text-cyan-600 transition-colors'
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              JSON Formatter &amp; Validator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          JSON Formatter &amp; Validator — Format, Beautify &amp; Validate JSON
          Free &amp; Instant
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Format, validate, and minify JSON instantly — adjustable indentation,
          sort keys, real-time error messages, copy and download.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='JSON Formatter & Validator tool'>
          <JsonFormatterValidatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="json-formatter-validator" toolName="JSON Formatter & Validator" />
      </SidebarAdLayout>
    </>
  );
}
