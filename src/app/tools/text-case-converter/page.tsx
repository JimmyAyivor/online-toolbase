// src/app/tools/text-case-converter/page.tsx
import type { Metadata } from "next";
import TextCaseConverterClient from "./TextCaseConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./Pageeditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Text Case Converter — Free Online Text Case Converter",
  description:
    "Convert text to uppercase, lowercase, title case, camelCase, PascalCase, snake_case, kebab-case and more. 12 case formats. Free, instant, no signup.",
  keywords:
    "text case converter, uppercase converter, lowercase converter, title case, camelCase converter, snake_case converter, kebab-case, PascalCase, text transformer, case changer",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-case-converter` },
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
    url: `${SITE_URL}/tools/text-case-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Text Case Converter — Free Online Text Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case, camelCase, snake_case, and 8 more formats. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text Case Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Text Case Converter — Free Online Text Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case, camelCase, snake_case and more. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Case Converter",
  description:
    "Convert text to uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more.",
  url: `${SITE_URL}/tools/text-case-converter`,
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
      name: "Text Case Converter",
      item: `${SITE_URL}/tools/text-case-converter`,
    },
  ],
};

export default function TextCaseConverterPage() {
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
              Text Case Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Text Case Converter — Free Online Text Case Converter
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Convert text to uppercase, lowercase, title case, camelCase,
          snake_case, kebab-case and 6 more formats. Instant, no account needed.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Text Case Converter tool'>
          <TextCaseConverterClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
