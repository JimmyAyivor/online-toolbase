// src/app/tools/essay-title-generator/page.tsx
import type { Metadata } from "next";
import EssayTitleGeneratorClient from "./EssayTitleGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Essay Title Generator — Generate 10 Compelling Titles Instantly Free",
  description:
    "Enter a topic and instantly generate 10 compelling titles for essays, research papers, blog posts, or reports. 4 writing modes, regenerate for variety, one-click copy. Free, no signup.",
  keywords:
    "essay title generator, blog title generator, research paper title generator, article title ideas, essay topic title, academic title generator, writing title generator, title ideas for essays",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/essay-title-generator` },
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
    url: `${SITE_URL}/tools/essay-title-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Essay Title Generator — Generate 10 Compelling Titles Instantly Free",
    description:
      "Enter a topic and get 10 title ideas for essays, research papers, blog posts, or reports. 4 writing modes, regenerate for variety, one-click copy.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Essay Title Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Essay Title Generator — Generate 10 Compelling Titles Instantly Free",
    description:
      "Enter a topic and get 10 title ideas for essays, research papers, blog posts, or reports. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Essay Title Generator",
  description:
    "Generate 10 compelling title ideas for essays, research papers, blog posts, or reports. Enter a topic, choose a writing mode, and regenerate for variety.",
  url: `${SITE_URL}/tools/essay-title-generator`,
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
      name: "Essay Title Generator",
      item: `${SITE_URL}/tools/essay-title-generator`,
    },
  ],
};

export default function EssayTitleGeneratorPage() {
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
              Essay Title Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1'>
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Essay Title Generator — Generate 10 Compelling Titles Instantly Free
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Enter a topic and generate 10 compelling title ideas for essays,
          research papers, blog posts, or reports — with one-click copy and
          regenerate for variety.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Essay Title Generator tool'>
          <EssayTitleGeneratorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="essay-title-generator" toolName="Essay Title Generator" />
      </SidebarAdLayout>
    </>
  );
}
