// src/app/tools/text-difference-checker/page.tsx
import type { Metadata } from "next";
import TextDifferenceCheckerClient from "./TextDifferenceCheckerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Text Difference Checker — Compare Two Texts & Highlight Differences",
  description:
    "Compare two pieces of text side-by-side or in unified view. Highlights added, removed, and modified lines instantly. Free, browser-based, no signup.",
  keywords:
    "text difference checker, text compare tool, diff checker, compare two texts, text diff, find differences in text, online diff tool, text comparison",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-difference-checker` },
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
    url: `${SITE_URL}/tools/text-difference-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Text Difference Checker — Compare Two Texts & Highlight Differences",
    description:
      "Compare two pieces of text side-by-side or in unified view. Highlights added, removed, and modified lines instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text Difference Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Text Difference Checker — Compare Two Texts & Highlight Differences",
    description:
      "Compare two texts side-by-side or unified. Highlights added, removed, and modified lines. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Difference Checker",
  description:
    "Compare two pieces of text and highlight added, removed, and modified lines instantly.",
  url: `${SITE_URL}/tools/text-difference-checker`,
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Text Difference Checker",
      item: `${SITE_URL}/tools/text-difference-checker`,
    },
  ],
};

export default function TextDifferenceCheckerPage() {
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
              href='/tools/category/text'
              className='hover:text-teal-600 transition-colors'
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Text Difference Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Text Difference Checker — Compare Two Texts &amp; Highlight
          Differences
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Compare two text blocks side-by-side or unified. Added, removed, and
          modified lines highlighted instantly — runs entirely in your browser.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Text Difference Checker tool'>
          <TextDifferenceCheckerClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="text-difference-checker" toolName="Text Difference Checker" />
      </SidebarAdLayout>
    </>
  );
}
