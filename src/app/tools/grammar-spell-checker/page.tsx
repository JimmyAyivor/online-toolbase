// src/app/tools/grammar-spell-checker/page.tsx
import type { Metadata } from "next";
import GrammarSpellCheckerClient from "./GrammarSpellCheckerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Grammar & Spell Checker — Free Online Grammar Checker",
  description:
    "Automatically correct grammar, spelling, punctuation, and style errors in your writing. Get a writing score and corrected text instantly. Free, no signup.",
  keywords:
    "grammar checker, spell checker, free grammar checker, online grammar checker, grammar and spell checker, spelling checker, writing checker, grammar correction tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/grammar-spell-checker` },
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
    url: `${SITE_URL}/tools/grammar-spell-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Grammar & Spell Checker — Free Online Grammar Checker",
    description:
      "Automatically correct grammar, spelling, punctuation, and style errors. Get a writing score and corrected text instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Grammar & Spell Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Grammar & Spell Checker — Free Online Grammar Checker",
    description:
      "Automatically correct grammar, spelling, punctuation, and style errors. Free, instant, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Grammar & Spell Checker",
  description:
    "Automatically correct grammar, spelling, punctuation, and style errors in your writing.",
  url: `${SITE_URL}/tools/grammar-spell-checker`,
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
      name: "Writing Tools",
      item: `${SITE_URL}/tools/category/writing`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Grammar & Spell Checker",
      item: `${SITE_URL}/tools/grammar-spell-checker`,
    },
  ],
};

export default function GrammarSpellCheckerPage() {
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
            <a href='/' className='hover:text-green-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/writing'
              className='hover:text-green-600 transition-colors'
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Grammar &amp; Spell Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-green-600 uppercase tracking-widest mb-1'>
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Grammar &amp; Spell Checker — Free Online Grammar Checker
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Correct grammar, spelling, punctuation, and style errors instantly.
          Get a writing score and a fully corrected version of your text.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Grammar and Spell Checker tool'>
          <GrammarSpellCheckerClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
