// src/app/tools/word-character-counter/page.tsx
import type { Metadata } from "next";
import WordCharacterCounterClient from "./WordCharacterCounterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Word & Character Counter — Free Online Word Counter with Reading Time",
  description:
    "Count words, characters (with and without spaces), sentences, paragraphs, and get reading and speaking time estimates. Real-time, free, no signup.",
  keywords:
    "word counter, character counter, word and character counter, reading time calculator, speaking time calculator, sentence counter, paragraph counter, word count tool, free word counter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/word-character-counter` },
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
    url: `${SITE_URL}/tools/word-character-counter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Word & Character Counter — Free Online Word Counter with Reading Time",
    description:
      "Count words, characters, sentences, and paragraphs. Get reading and speaking time estimates. Real-time, free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Word & Character Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Word & Character Counter — Free Online Word Counter with Reading Time",
    description:
      "Count words, characters, sentences, and paragraphs. Reading and speaking time estimates. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word & Character Counter",
  description:
    "Count words, characters, sentences, and paragraphs with reading and speaking time estimates.",
  url: `${SITE_URL}/tools/word-character-counter`,
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
      name: "Word & Character Counter",
      item: `${SITE_URL}/tools/word-character-counter`,
    },
  ],
};

export default function WordCharacterCounterPage() {
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
            <a
              href='/tools/category/text'
              className='hover:text-indigo-600 transition-colors'
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Word &amp; Character Counter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Real-Time Counting
        </p>
        <h1 className='sr-only'>
          Word &amp; Character Counter — Free Online Word Counter with Reading
          Time
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Count words, characters, sentences, and paragraphs in real time.
          Includes reading and speaking time estimates. No account needed.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Word and Character Counter tool'>
          <WordCharacterCounterClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
