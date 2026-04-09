// src/app/tools/reading-time-estimator/page.tsx
import type { Metadata } from "next";
import ReadingTimeEstimatorClient from "./ReadingTimeEstimatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Reading Time Estimator — How Long Does It Take to Read Any Text?",
  description:
    "Estimate reading time for any text at your custom reading speed. Adjustable WPM slider, image time calculator, and a comparison across slow, average, fast, and speed readers. Free, instant, no signup.",
  keywords:
    "reading time estimator, reading time calculator, how long to read, words per minute calculator, article reading time, blog reading time, wpm calculator, reading speed calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/reading-time-estimator` },
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
    url: `${SITE_URL}/tools/reading-time-estimator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Reading Time Estimator — How Long Does It Take to Read Any Text?",
    description:
      "Estimate reading time at your custom WPM. Includes image time, multi-speed comparison, and full text stats. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Reading Time Estimator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Reading Time Estimator — How Long Does It Take to Read Any Text?",
    description:
      "Estimate reading time at your custom WPM. Image time, multi-speed comparison, and text stats. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Reading Time Estimator",
  description:
    "Estimate how long it takes to read any text at a custom reading speed. Includes image time and multi-speed comparison.",
  url: `${SITE_URL}/tools/reading-time-estimator`,
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
      name: "Reading Time Estimator",
      item: `${SITE_URL}/tools/reading-time-estimator`,
    },
  ],
};

export default function ReadingTimeEstimatorPage() {
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
            <a href='/' className='hover:text-amber-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/text'
              className='hover:text-amber-600 transition-colors'
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Reading Time Estimator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1'>
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Reading Time Estimator — How Long Does It Take to Read Any Text?
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Paste any text and get an instant reading time estimate at your chosen
          WPM. Includes image time, multi-speed comparison, and full text
          statistics.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Reading Time Estimator tool'>
          <ReadingTimeEstimatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="reading-time-estimator" toolName="Reading Time Estimator" />
      </SidebarAdLayout>
    </>
  );
}
