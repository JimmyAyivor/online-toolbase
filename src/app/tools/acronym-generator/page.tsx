// src/app/tools/acronym-generator/page.tsx
import type { Metadata } from "next";
import AcronymGeneratorClient from "./AcronymGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolReviews from "@/components/ToolReviews";
import { tools } from "@/lib/tools";

const tool = tools.find((t) => t.slug === "acronym-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Acronym Generator — Free Online Acronym Generator",
  description:
    "Turn any phrase into an acronym instantly. Choose uppercase, lowercase, or dot-separated styles. Free, instant, no signup required.",
  keywords:
    "acronym generator, free acronym generator, online acronym generator, acronym maker, phrase to acronym, abbreviation generator, acronym creator, free online acronym generator, best acronym generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/acronym-generator` },
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
    url: `${SITE_URL}/tools/acronym-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Acronym Generator — Free Online Acronym Generator",
    description:
      "Turn any phrase into an acronym instantly. Choose uppercase, lowercase, or dot-separated styles. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Acronym Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Acronym Generator — Free Online Acronym Generator",
    description: "Turn any phrase into an acronym instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Acronym Generator",
  description:
    "Generate acronyms from any phrase with uppercase, lowercase, or dot-separated formatting.",
  url: `${SITE_URL}/tools/acronym-generator`,
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
      name: "Acronym Generator",
      item: `${SITE_URL}/tools/acronym-generator`,
    },
  ],
};

export default function AcronymGeneratorPage() {
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

      {/* Breadcrumb */}
      <nav aria-label='Breadcrumb' className='max-w-6xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-sky-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/text'
              className='hover:text-sky-600 transition-colors'
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Acronym Generator
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Acronym Generator — Free Online Acronym Generator
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Turn any phrase into an acronym instantly. Choose uppercase,
          lowercase, or dot-separated styles. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id='main-content' aria-label='Acronym Generator tool'>
          <AcronymGeneratorClient />
          <ToolReviews toolSlug='acronym-generator' />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
