// src/app/tools/text-to-bullet-points/page.tsx
import type { Metadata } from "next";
import TextToBulletPointsClient from "./TextToBulletPointsClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Text to Bullet Points — Convert Paragraphs to Bullet Lists Free",
  description:
    "Convert any paragraph or article into clean bullet points, dashes, or numbered lists instantly. Sentence-based splitting with one-click copy. Free, instant, no signup.",
  keywords:
    "text to bullet points, paragraph to bullet points, convert text to list, bullet point converter, text to numbered list, paragraph converter, sentence to bullet points",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-to-bullet-points` },
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
    url: `${SITE_URL}/tools/text-to-bullet-points`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Text to Bullet Points — Convert Paragraphs to Bullet Lists Free",
    description:
      "Convert any paragraph into bullet points, dashes, or numbered lists. Sentence-based splitting, one-click copy. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text to Bullet Points Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Text to Bullet Points — Convert Paragraphs to Bullet Lists Free",
    description:
      "Convert any paragraph into bullets, dashes, or numbered lists. One-click copy. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text to Bullet Points",
  description:
    "Convert any paragraph or article into clean bullet points, dash lists, or numbered lists with sentence-based splitting and one-click copy.",
  url: `${SITE_URL}/tools/text-to-bullet-points`,
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
      name: "Text to Bullet Points",
      item: `${SITE_URL}/tools/text-to-bullet-points`,
    },
  ],
};

export default function TextToBulletPointsPage() {
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
            <a href='/' className='hover:text-teal-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/writing'
              className='hover:text-teal-600 transition-colors'
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Text to Bullet Points
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1'>
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Text to Bullet Points — Convert Paragraphs to Bullet Lists Free
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Paste any paragraph or article and convert it into bullet points,
          dashes, or a numbered list — sentence-by-sentence, with one-click
          copy.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Text to Bullet Points tool'>
          <TextToBulletPointsClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
