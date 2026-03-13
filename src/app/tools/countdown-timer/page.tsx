// src/app/tools/countdown-timer/page.tsx
import type { Metadata } from "next";
import CountdownTimerClient from "./CountdownTimerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";
export const metadata: Metadata = {
  title: "Countdown Timer — Set a Timer Online, Free",
  description:
    "Set a countdown timer for any duration or target date. Alarm alert when time is up. Free, no signup, works in browser.",
  keywords:
    "countdown timer, online timer, timer online, countdown clock, set timer online, free countdown timer",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/countdown-timer` },
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
    url: `${SITE_URL}/tools/countdown-timer`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Countdown Timer — Set a Timer Online",
    description: "Free online countdown timer with alarm alert.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Countdown Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Countdown Timer",
    description: "Set a free online countdown timer. No signup.",
  },
};
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Countdown Timer",
  description: "Set a countdown timer for any duration.",
  url: `${SITE_URL}/tools/countdown-timer`,
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
      name: "Countdown Timer",
      item: `${SITE_URL}/tools/countdown-timer`,
    },
  ],
};
export default function CountdownTimerPage() {
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
              href='/tools/category/productivity'
              className='hover:text-indigo-600 transition-colors'
            >
              Productivity
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Countdown Timer
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Productivity Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>Countdown Timer — Set a Timer Online, Free</h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Countdown Timer tool'>
          <CountdownTimerClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
