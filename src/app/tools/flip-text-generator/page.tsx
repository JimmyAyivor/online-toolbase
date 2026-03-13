// src/app/tools/flip-text-generator/page.tsx
import type { Metadata } from "next";
import FlipTextGeneratorClient from "./FlipTextGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Flip Text Generator — Upside Down & Reversed Text",
  description:
    "Flip text upside down, reverse it, or mirror it. Great for social media, messages, and creative formatting. Free, instant.",
  keywords:
    "flip text, upside down text generator, reverse text, mirror text, flipped text generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/flip-text-generator` },
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
    url: `${SITE_URL}/tools/flip-text-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Flip Text Generator — Upside Down & Reversed Text",
    description:
      "Flip text upside down, reverse it, or mirror it. Great for social media, messages, and creative formatting. Free, instant.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Flip Text Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Flip Text Generator — Upside Down & Reversed Text",
    description:
      "Flip text upside down, reverse it, or mirror it. Great for social media, messages, and creative formatting. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Flip Text Generator",
  description:
    "Flip text upside down, reverse it, or mirror it. Great for social media, messages, and creative formatting. Free, instant.",
  url: `${SITE_URL}/tools/flip-text-generator`,
  applicationCategory: "UtilitiesApplication",
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
      name: "Flip Text Generator",
      item: `${SITE_URL}/tools/flip-text-generator`,
    },
  ],
};

export default function FlipTextGeneratorPage() {
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
            <a href='/' className='hover:text-purple-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/text'
              className='hover:text-purple-600 transition-colors'
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Flip Text Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1'>
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Flip Text Generator — Upside Down & Reversed Text
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Flip Text Generator tool'>
          <FlipTextGeneratorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
