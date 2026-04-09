// src/app/tools/word-counter-live/page.tsx
import type { Metadata } from "next";
import WordCounterLiveClient from "./WordCounterLiveClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Word Counter Live — Free Online Word Counter",
  description:
    "Count words, characters, sentences, and paragraphs in real time. Get reading time, speaking time, unique word count, and top word frequency. Free, instant, no signup required.",
  keywords:
    "word counter, word count tool, character counter, live word counter, reading time calculator, online word counter, word frequency counter, free word counter, free online word counter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/word-counter-live` },
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
    url: `${SITE_URL}/tools/word-counter-live`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Word Counter Live — Free Online Word Counter",
    description:
      "Real-time word counter with character count, reading time, speaking time, and top word frequency. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Word Counter Live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Word Counter Live — Free Online Word Counter",
    description:
      "Real-time word count with reading time, speaking time, and word frequency. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word Counter Live",
  description:
    "Real-time word counter with character count, reading time, speaking time, and word frequency analysis.",
  url: `${SITE_URL}/tools/word-counter-live`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
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
      name: "Word Counter Live",
      item: `${SITE_URL}/tools/word-counter-live`,
    },
  ],
};

export default function WordCounterLivePage() {
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
              Word Counter Live
            </span>
          </li>
        </ol>
      </nav>

      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Word Counter Live — Free Online Word Counter
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Real-time word and character count with reading time, speaking time,
          and word frequency analysis. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout>
        <main id='main-content' aria-label='Word Counter Live tool'>
          <WordCounterLiveClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="word-counter-live" toolName="Word Counter" />
      </SidebarAdLayout>
    </>
  );
}
