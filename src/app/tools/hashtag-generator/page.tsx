// src/app/tools/hashtag-generator/page.tsx
import type { Metadata } from "next";
import HashtagGeneratorClient from "./HashtagGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Hashtag Generator — Generate Relevant Hashtags for Instagram, TikTok & Twitter Free",
  description:
    "Generate hashtags for Instagram, TikTok, Twitter/X, LinkedIn, and YouTube by topic and niche. Mix high-volume, medium, and niche hashtags, select your set, and copy. Free, no signup.",
  keywords:
    "hashtag generator, instagram hashtags, tiktok hashtags, twitter hashtags, hashtag ideas, hashtag research, niche hashtags, best hashtags, free hashtag generator, hashtags for reach",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/hashtag-generator` },
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
    url: `${SITE_URL}/tools/hashtag-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Hashtag Generator — Generate Relevant Hashtags for Instagram, TikTok & Twitter Free",
    description:
      "Generate hashtag sets for Instagram, TikTok, Twitter/X, LinkedIn, and YouTube by topic and niche. Mix popularity tiers and copy your set. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Hashtag Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Hashtag Generator — Generate Relevant Hashtags for Instagram, TikTok & Twitter Free",
    description:
      "Generate hashtag sets for any topic and niche, mixed by popularity tier. Copy and use instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hashtag Generator",
  description:
    "Generates relevant hashtags by topic, niche, and target platform (Instagram, TikTok, Twitter/X, LinkedIn, YouTube). Organises hashtags by popularity tier (broad, medium, niche), allows individual selection and removal, tracks the platform hashtag limit, and copies the final set. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/hashtag-generator`,
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
      name: "Social Media Tools",
      item: `${SITE_URL}/tools/category/social-media`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Hashtag Generator",
      item: `${SITE_URL}/tools/hashtag-generator`,
    },
  ],
};

export default function HashtagGeneratorPage() {
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
              href='/tools/category/social-media'
              className='hover:text-violet-600 transition-colors'
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Hashtag Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1'>
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Hashtag Generator — Generate Relevant Hashtags for Instagram, TikTok
          &amp; Twitter Free
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate hashtag sets for Instagram, TikTok, Twitter/X, LinkedIn, and
          YouTube — mixed by popularity tier, selectable, and ready to copy.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Hashtag Generator tool'>
          <HashtagGeneratorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
