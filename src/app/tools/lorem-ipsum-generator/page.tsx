// src/app/tools/lorem-ipsum-generator/page.tsx
import type { Metadata } from "next";
import LoremIpsumGeneratorClient from "./LoremIpsumGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Free Placeholder Text Generator",
  description:
    "Generate lorem ipsum placeholder text in paragraphs, sentences, words, or lists. Adjustable count, start-with-Lorem option, and quick presets. Free, instant, no signup.",
  keywords:
    "lorem ipsum generator, placeholder text generator, dummy text generator, lorem ipsum online, fake text generator, filler text generator, lorem ipsum paragraphs, design placeholder text",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/lorem-ipsum-generator` },
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
    url: `${SITE_URL}/tools/lorem-ipsum-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Lorem Ipsum Generator — Free Placeholder Text Generator",
    description:
      "Generate lorem ipsum in paragraphs, sentences, words, or lists. Adjustable count, quick presets, copy and download. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Lorem Ipsum Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Lorem Ipsum Generator — Free Placeholder Text Generator",
    description:
      "Generate lorem ipsum in paragraphs, sentences, words, or lists. Copy or download instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lorem Ipsum Generator",
  description:
    "Generate lorem ipsum placeholder text in paragraphs, sentences, words, or lists with adjustable count and quick presets.",
  url: `${SITE_URL}/tools/lorem-ipsum-generator`,
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
      name: "Lorem Ipsum Generator",
      item: `${SITE_URL}/tools/lorem-ipsum-generator`,
    },
  ],
};

export default function LoremIpsumGeneratorPage() {
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
            <a href='/' className='hover:text-amber-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/text'
              className='hover:text-amber-600 transition-colors'
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Lorem Ipsum Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Lorem Ipsum Generator — Free Placeholder Text Generator
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate lorem ipsum placeholder text in paragraphs, sentences, words,
          or lists. Adjustable count, presets, and download as .txt.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Lorem Ipsum Generator tool'>
          <LoremIpsumGeneratorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="lorem-ipsum-generator" toolName="Lorem Ipsum Generator" />
      </SidebarAdLayout>
    </>
  );
}
