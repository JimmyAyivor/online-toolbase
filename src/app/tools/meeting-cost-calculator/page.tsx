// src/app/tools/meeting-cost-calculator/page.tsx
import type { Metadata } from "next";
import MeetingCostCalculatorClient from "./MeetingCostCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Meeting Cost Calculator — What Does Your Meeting Really Cost?",
  description:
    "Calculate the real cost of any meeting based on number of attendees and hourly salaries. Free, instant, no signup.",
  keywords:
    "meeting cost calculator, cost of meetings, meeting calculator, hourly meeting cost, productivity calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/meeting-cost-calculator` },
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
    url: `${SITE_URL}/tools/meeting-cost-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Meeting Cost Calculator — What Does Your Meeting Really Cost?",
    description:
      "Calculate the real cost of any meeting based on number of attendees and hourly salaries. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Meeting Cost Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Meeting Cost Calculator — What Does Your Meeting Really Cost?",
    description:
      "Calculate the real cost of any meeting based on number of attendees and hourly salaries. Free, instant, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Meeting Cost Calculator",
  description:
    "Calculate the real cost of any meeting based on number of attendees and hourly salaries. Free, instant, no signup.",
  url: `${SITE_URL}/tools/meeting-cost-calculator`,
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
      name: "Meeting Cost Calculator",
      item: `${SITE_URL}/tools/meeting-cost-calculator`,
    },
  ],
};

export default function MeetingCostCalculatorPage() {
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
              href='/tools/category/productivity'
              className='hover:text-amber-600 transition-colors'
            >
              Productivity Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Meeting Cost Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1'>
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Meeting Cost Calculator — What Does Your Meeting Really Cost?
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Meeting Cost Calculator tool'>
          <MeetingCostCalculatorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
