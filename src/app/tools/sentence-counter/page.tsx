// src/app/tools/sentence-counter/page.tsx
import type { Metadata } from "next";
import SentenceCounterClient from "./SentenceCounterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Sentence Counter — Count Sentences, Paragraphs & Reading Level Live",
  description:
    "Count sentences, words, characters, paragraphs, syllables, and Flesch-Kincaid reading grade level. All statistics update live as you type. Free, instant, no signup.",
  keywords:
    "sentence counter, count sentences online, paragraph counter, flesch kincaid grade level, reading level checker, sentence count tool, syllable counter, average sentence length",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/sentence-counter` },
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
    url: `${SITE_URL}/tools/sentence-counter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Sentence Counter — Count Sentences, Paragraphs & Reading Level Live",
    description:
      "Live sentence, word, character, paragraph, and syllable counter with Flesch-Kincaid grade level. Stats update as you type. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Sentence Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Sentence Counter — Count Sentences, Paragraphs & Reading Level Live",
    description:
      "Live sentence counter with FK reading grade level. Stats update as you type. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sentence Counter",
  description:
    "Count sentences, words, characters, paragraphs, and syllables with a live Flesch-Kincaid reading grade level indicator. All statistics update in real time.",
  url: `${SITE_URL}/tools/sentence-counter`,
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
      name: "Sentence Counter",
      item: `${SITE_URL}/tools/sentence-counter`,
    },
  ],
};

export default function SentenceCounterPage() {
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
              href='/tools/category/writing'
              className='hover:text-indigo-600 transition-colors'
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Sentence Counter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Sentence Counter — Count Sentences, Paragraphs & Reading Level Live
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Count sentences, words, characters, paragraphs, and syllables with a
          live Flesch-Kincaid reading grade level. All stats update as you type.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Sentence Counter tool'>
          <SentenceCounterClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="sentence-counter" toolName="Sentence Counter" />
      </SidebarAdLayout>
    </>
  );
}
