// src/app/tools/paraphrasing-tool/page.tsx
import type { Metadata } from "next";
import ParaphrasingToolClient from "./ParaphrasingToolClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Paraphrasing Tool — Rewrite Text in 6 Styles, Free & Instant",
  description:
    "Rewrite any text in Standard, Fluent, Formal, Simple, Creative, or Expand mode. Synonym replacement, sentence restructuring, copy and download. Free, instant, no signup.",
  keywords:
    "paraphrasing tool, paraphrase text online, rewrite text free, rephrase tool, synonym replacer, text rewriter, paraphrase generator, reword tool, free paraphrasing tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/paraphrasing-tool` },
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
    url: `${SITE_URL}/tools/paraphrasing-tool`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Paraphrasing Tool — Rewrite Text in 6 Styles, Free & Instant",
    description:
      "Rewrite any text in Standard, Fluent, Formal, Simple, Creative, or Expand mode. Synonym replacement and sentence restructuring. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Paraphrasing Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Paraphrasing Tool — Rewrite Text in 6 Styles, Free & Instant",
    description:
      "Rewrite any text in 6 modes — Standard, Fluent, Formal, Simple, Creative, Expand. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Paraphrasing Tool",
  description:
    "Rewrite any text in different words using 6 modes: Standard, Fluent, Formal, Simple, Creative, and Expand. Includes synonym replacement, sentence restructuring, copy, and download.",
  url: `${SITE_URL}/tools/paraphrasing-tool`,
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
      name: "Paraphrasing Tool",
      item: `${SITE_URL}/tools/paraphrasing-tool`,
    },
  ],
};

export default function ParaphrasingToolPage() {
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
            <a href='/' className='hover:text-violet-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/writing'
              className='hover:text-violet-600 transition-colors'
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Paraphrasing Tool
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1'>
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Paraphrasing Tool — Rewrite Text in 6 Styles, Free & Instant
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Rewrite any text in 6 modes — Standard, Fluent, Formal, Simple,
          Creative, or Expand. Synonym replacement, sentence restructuring, copy
          and download.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Paraphrasing Tool'>
          <ParaphrasingToolClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
