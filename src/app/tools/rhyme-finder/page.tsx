// src/app/tools/rhyme-finder/page.tsx
import type { Metadata } from "next";
import RhymeFinderClient from "./RhymeFinderClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Rhyme Finder — Find Rhyming Words for Poetry & Lyrics, Free & Instant",
  description:
    "Find perfect rhyming words for poetry, song lyrics, and creative writing. Built-in phonetic rhyme dictionary — no API, no signup, runs entirely in your browser.",
  keywords:
    "rhyme finder, find rhymes online, rhyming words, poetry rhyme tool, song lyrics rhyme finder, perfect rhymes, rhyme dictionary online, words that rhyme with",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/rhyme-finder` },
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
    url: `${SITE_URL}/tools/rhyme-finder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Rhyme Finder — Find Rhyming Words for Poetry & Lyrics, Free & Instant",
    description:
      "Find perfect rhyming words for poetry, lyrics, and creative writing. Built-in phonetic rhyme dictionary. No API, no signup, runs in your browser.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Rhyme Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Rhyme Finder — Find Rhyming Words for Poetry & Lyrics, Free & Instant",
    description:
      "Find perfect rhymes for poetry and lyrics. Built-in phonetic dictionary, no signup, instant results.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rhyme Finder",
  description:
    "Find perfect rhyming words for poetry, song lyrics, and creative writing using a built-in phonetic ending dictionary. No API or signup required.",
  url: `${SITE_URL}/tools/rhyme-finder`,
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
      name: "Rhyme Finder",
      item: `${SITE_URL}/tools/rhyme-finder`,
    },
  ],
};

export default function RhymeFinderPage() {
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
            <a href='/' className='hover:text-pink-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/writing'
              className='hover:text-pink-600 transition-colors'
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Rhyme Finder
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1'>
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Rhyme Finder — Find Rhyming Words for Poetry & Lyrics, Free & Instant
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Find perfect rhyming words for poetry, song lyrics, and creative
          writing — built-in phonetic dictionary, click any result to copy.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Rhyme Finder tool'>
          <RhymeFinderClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="rhyme-finder" toolName="Rhyme Finder" />
      </SidebarAdLayout>
    </>
  );
}
