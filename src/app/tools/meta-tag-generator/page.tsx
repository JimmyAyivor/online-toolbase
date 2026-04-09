// src/app/tools/meta-tag-generator/page.tsx
import type { Metadata } from "next";
import MetaTagGeneratorClient from "./MetaTagGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Meta Tag Generator — Free SEO Meta Tags, Open Graph & Twitter Card Builder",
  description:
    "Generate complete HTML meta tags for SEO, Open Graph (Facebook/LinkedIn), and Twitter Cards. Preview how your page will look when shared. Free, instant, no signup.",
  keywords:
    "meta tag generator, open graph generator, twitter card generator, seo meta tags, og tags generator, meta description generator, html meta tags, social media meta tags, free meta tag tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/meta-tag-generator` },
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
    url: `${SITE_URL}/tools/meta-tag-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Meta Tag Generator — Free SEO Meta Tags, Open Graph & Twitter Card Builder",
    description:
      "Generate complete HTML meta tags for SEO, Open Graph, and Twitter Cards. Preview social sharing appearance. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Meta Tag Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Meta Tag Generator — Free SEO Meta Tags, Open Graph & Twitter Card Builder",
    description:
      "Generate SEO meta tags, Open Graph tags, and Twitter Cards with a live social share preview. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Meta Tag Generator",
  description:
    "Generate complete HTML meta tags for SEO, Open Graph social sharing (Facebook, LinkedIn), and Twitter Cards. Includes a live preview of how the page will appear when shared on social media.",
  url: `${SITE_URL}/tools/meta-tag-generator`,
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
      name: "Meta Tag Generator",
      item: `${SITE_URL}/tools/meta-tag-generator`,
    },
  ],
};

export default function MetaTagGeneratorPage() {
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
              href='/tools/category/developer'
              className='hover:text-teal-600 transition-colors'
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Meta Tag Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Meta Tag Generator — Free SEO Meta Tags, Open Graph &amp; Twitter Card
          Builder
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate SEO meta tags, Open Graph tags, and Twitter Cards with a live
          social sharing preview — free, no account needed.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Meta Tag Generator tool'>
          <MetaTagGeneratorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="meta-tag-generator" toolName="Meta Tag Generator" />
      </SidebarAdLayout>
    </>
  );
}
