// src/app/tools/online-stopwatch/page.tsx
import type { Metadata } from "next";
import OnlineStopwatchClient from "./OnlineStopwatchClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./Pageeditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Online Stopwatch — Free Stopwatch with Lap Timer",
  description:
    "Free online stopwatch with start, stop, reset, and lap timer. No signup, works instantly in any browser.",
  keywords:
    "online stopwatch, stopwatch online, free stopwatch, lap timer, timer stopwatch",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/online-stopwatch` },
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
    url: `${SITE_URL}/tools/online-stopwatch`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Online Stopwatch — Free Stopwatch with Lap Timer",
    description:
      "Free online stopwatch with start, stop, reset, and lap timer. No signup, works instantly in any browser.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Stopwatch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Online Stopwatch — Free Stopwatch with Lap Timer",
    description:
      "Free online stopwatch with start, stop, reset, and lap timer. No signup, works instantly in any browser.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Online Stopwatch",
  description:
    "Free online stopwatch with start, stop, reset, and lap timer. No signup, works instantly in any browser.",
  url: `${SITE_URL}/tools/online-stopwatch`,
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
      name: "Productivity Tools",
      item: `${SITE_URL}/tools/category/productivity`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Online Stopwatch",
      item: `${SITE_URL}/tools/online-stopwatch`,
    },
  ],
};

export default function OnlineStopwatchPage() {
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
            <a href='/' className='hover:text-cyan-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/productivity'
              className='hover:text-cyan-600 transition-colors'
            >
              Productivity Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Online Stopwatch
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1'>
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Online Stopwatch — Free Stopwatch with Lap Timer
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Online Stopwatch tool'>
          <OnlineStopwatchClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
