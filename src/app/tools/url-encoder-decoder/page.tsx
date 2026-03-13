// src/app/tools/url-encoder-decoder/page.tsx
import type { Metadata } from "next";
import UrlEncoderDecoderClient from "./UrlEncoderDecoderClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "URL Encoder/Decoder — Encode & Decode URLs Instantly, Free Online",
  description:
    "Encode or decode URLs instantly in your browser. Supports encodeURIComponent and full URL encoding, URL parser, and common character reference table. Free, no signup.",
  keywords:
    "url encoder, url decoder, url encode decode online, encodeURIComponent online, urlencode, percent encoding, url percent decode, url encoder decoder free, online url encoder, url special characters",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/url-encoder-decoder` },
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
    url: `${SITE_URL}/tools/url-encoder-decoder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "URL Encoder/Decoder — Encode & Decode URLs Instantly, Free Online",
    description:
      "Encode or decode URLs instantly. Supports component and full URL encoding, URL parser, common character reference. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online URL Encoder/Decoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "URL Encoder/Decoder — Encode & Decode URLs Instantly, Free Online",
    description:
      "Encode or decode URLs instantly. Component and full URL modes, URL parser, character reference. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "URL Encoder/Decoder",
  description:
    "Encode or decode URLs for safe web transmission. Supports encodeURIComponent and full URL encoding modes, URL parser, and percent-encoding character reference table.",
  url: `${SITE_URL}/tools/url-encoder-decoder`,
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
      name: "URL Encoder/Decoder",
      item: `${SITE_URL}/tools/url-encoder-decoder`,
    },
  ],
};

export default function UrlEncoderDecoderPage() {
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
            <a href='/' className='hover:text-sky-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/developer'
              className='hover:text-sky-600 transition-colors'
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              URL Encoder/Decoder
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          URL Encoder/Decoder — Encode &amp; Decode URLs Instantly, Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Encode or decode URLs instantly — component and full URL modes, URL
          parser, and percent-encoding character reference table.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='URL Encoder/Decoder tool'>
          <UrlEncoderDecoderClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
