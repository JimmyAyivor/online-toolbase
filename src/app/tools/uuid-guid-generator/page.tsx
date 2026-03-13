// src/app/tools/uuid-guid-generator/page.tsx
import type { Metadata } from "next";
import UuidGuidGeneratorClient from "./UuidGuidGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "UUID/GUID Generator — Generate v4 UUIDs Instantly, Free Online",
  description:
    "Generate one or hundreds of Version 4 UUIDs/GUIDs instantly. Multiple formats: default, uppercase, braces, no dashes. Copy all or download as a file. Free, no signup.",
  keywords:
    "uuid generator, guid generator, uuid v4 generator, random uuid, generate uuid online, bulk uuid generator, uuid formats, globally unique identifier, universally unique identifier, free uuid tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/uuid-guid-generator` },
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
    url: `${SITE_URL}/tools/uuid-guid-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "UUID/GUID Generator — Generate v4 UUIDs Instantly, Free Online",
    description:
      "Generate one or hundreds of Version 4 UUIDs instantly. Multiple formats, copy all, download as file. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online UUID/GUID Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "UUID/GUID Generator — Generate v4 UUIDs Instantly, Free Online",
    description:
      "Generate Version 4 UUIDs instantly — multiple formats, bulk generation, copy all, download. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "UUID/GUID Generator",
  description:
    "Generate Version 4 (random) UUIDs/GUIDs instantly in your browser. Supports bulk generation up to 100 at once, multiple output formats (default, uppercase, braces, no dashes), copy all, and download as a text file.",
  url: `${SITE_URL}/tools/uuid-guid-generator`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "UUID/GUID Generator",
      item: `${SITE_URL}/tools/uuid-guid-generator`,
    },
  ],
};

export default function UuidGuidGeneratorPage() {
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
            <a href='/' className='hover:text-emerald-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/developer'
              className='hover:text-emerald-600 transition-colors'
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              UUID/GUID Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          UUID/GUID Generator — Generate v4 UUIDs Instantly, Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate Version 4 UUIDs instantly — bulk generation, multiple
          formats, copy all or download as a file.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='UUID/GUID Generator tool'>
          <UuidGuidGeneratorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
