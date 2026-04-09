// src/app/tools/text-repeater/page.tsx
import type { Metadata } from "next";
import TextRepeaterClient from "./TextRepeaterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Text Repeater — Free Online Text Repeater",
  description:
    "Repeat any text or phrase multiple times with a custom separator. Choose new line, space, comma, pipe, or your own separator. Free, instant, no signup required.",
  keywords:
    "text repeater, repeat text online, duplicate text tool, text duplicator, repeat words online, text multiplier, free text repeater, online text repeater",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-repeater` },
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
    url: `${SITE_URL}/tools/text-repeater`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Text Repeater — Free Online Text Repeater",
    description:
      "Repeat any text multiple times with custom separators. Newline, comma, pipe, or your own. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text Repeater",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Text Repeater — Free Online Text Repeater",
    description:
      "Repeat any text multiple times with custom separators. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Repeater",
  description: "Repeat any text multiple times with customizable separators.",
  url: `${SITE_URL}/tools/text-repeater`,
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
      name: "Text Repeater",
      item: `${SITE_URL}/tools/text-repeater`,
    },
  ],
};

export default function TextRepeaterPage() {
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
              Text Repeater
            </span>
          </li>
        </ol>
      </nav>

      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>Text Repeater — Free Online Text Repeater</h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Repeat any text or phrase multiple times with a custom separator.
          Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout>
        <main id='main-content' aria-label='Text Repeater tool'>
          <TextRepeaterClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="text-repeater" toolName="Text Repeater" />
      </SidebarAdLayout>
    </>
  );
}
