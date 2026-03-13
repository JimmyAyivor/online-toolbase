// src/app/tools/keyword-density-checker/page.tsx
import type { Metadata } from "next";
import KeywordDensityCheckerClient from "./KeywordDensityCheckerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Keyword Density Checker — Analyse Keyword Frequency in Any Text",
  description:
    "Check keyword density and frequency in any text. Identify overused or underused keywords for SEO optimisation. Free, instant, no signup.",
  keywords:
    "keyword density checker, keyword frequency checker, seo keyword density, keyword analysis tool, text keyword counter, on-page seo tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/keyword-density-checker` },
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
    url: `${SITE_URL}/tools/keyword-density-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Keyword Density Checker — Keyword Frequency Analysis",
    description:
      "Analyse keyword density and frequency in any text for SEO optimisation.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Keyword Density Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Keyword Density Checker",
    description: "Check keyword density and frequency in any text. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Keyword Density Checker",
  description: "Analyse keyword frequency and density in any text for SEO.",
  url: `${SITE_URL}/tools/keyword-density-checker`,
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
      name: "SEO Tools",
      item: `${SITE_URL}/tools/category/seo`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Keyword Density Checker",
      item: `${SITE_URL}/tools/keyword-density-checker`,
    },
  ],
};

export default function KeywordDensityCheckerPage() {
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
            <a href='/' className='hover:text-teal-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/seo'
              className='hover:text-teal-600 transition-colors'
            >
              SEO Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Keyword Density Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1'>
          Free SEO Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Keyword Density Checker — Analyse Keyword Frequency in Any Text
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Paste any text to see keyword frequency, density percentages, and word
          count — instantly identify keyword stuffing or missed opportunities.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Keyword Density Checker tool'>
          <KeywordDensityCheckerClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
