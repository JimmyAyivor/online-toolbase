// src/app/tools/word-frequency-counter/page.tsx
import type { Metadata } from "next";
import WordFrequencyCounterClient from "./WordFrequencyCounterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Word Frequency Counter — Count Most Common Words in Any Text",
  description:
    "Analyse any text to see word frequency counts and percentages. Filter stop words, set minimum length, sort alphabetically or by frequency, and export results to CSV. Free, instant, no signup.",
  keywords:
    "word frequency counter, word frequency analyser, most common words, word count frequency, text analysis, stop words filter, word frequency chart, keyword frequency counter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/word-frequency-counter` },
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
    url: `${SITE_URL}/tools/word-frequency-counter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Word Frequency Counter — Count Most Common Words in Any Text",
    description:
      "Analyse text to see word frequency counts, percentages, and bar charts. Filter stop words, export CSV. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Word Frequency Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Word Frequency Counter — Count Most Common Words in Any Text",
    description:
      "Analyse text to see word frequency counts and percentages. Filter stop words, export CSV. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word Frequency Counter",
  description:
    "Count the frequency of every word in your text with filters, sorting, and CSV export.",
  url: `${SITE_URL}/tools/word-frequency-counter`,
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
      name: "Word Frequency Counter",
      item: `${SITE_URL}/tools/word-frequency-counter`,
    },
  ],
};

export default function WordFrequencyCounterPage() {
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
              Word Frequency Counter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Word Frequency Counter — Count Most Common Words in Any Text
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Analyse any text to see word frequency, counts, and percentages.
          Filter stop words, set minimum word length, and export results to CSV.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Word Frequency Counter tool'>
          <WordFrequencyCounterClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="word-frequency-counter" toolName="Word Frequency Counter" />
      </SidebarAdLayout>
    </>
  );
}
