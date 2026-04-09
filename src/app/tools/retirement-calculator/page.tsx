// src/app/tools/retirement-calculator/page.tsx
import type { Metadata } from "next";
import RetirementCalculatorClient from "./RetirementCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Retirement Calculator — How Much Do You Need to Retire?",
  description:
    "Estimate your retirement savings target and monthly contributions needed based on your age, income, and retirement goals. Free.",
  keywords:
    "retirement calculator, how much to retire, retirement savings calculator, retirement planning tool, nest egg calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/retirement-calculator` },
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
    url: `${SITE_URL}/tools/retirement-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Retirement Calculator — How Much Do You Need to Retire?",
    description:
      "Estimate your retirement savings target and monthly contributions needed based on your age, income, and retirement goals. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Retirement Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Retirement Calculator — How Much Do You Need to Retire?",
    description:
      "Estimate your retirement savings target and monthly contributions needed based on your age, income, and retirement goals. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Retirement Calculator",
  description:
    "Estimate your retirement savings target and monthly contributions needed based on your age, income, and retirement goals. Free.",
  url: `${SITE_URL}/tools/retirement-calculator`,
  applicationCategory: "FinanceApplication",
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
      name: "Finance Tools",
      item: `${SITE_URL}/tools/category/finance`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Retirement Calculator",
      item: `${SITE_URL}/tools/retirement-calculator`,
    },
  ],
};

export default function RetirementCalculatorPage() {
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
            <a href='/' className='hover:text-blue-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/finance'
              className='hover:text-blue-600 transition-colors'
            >
              Finance Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Retirement Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1'>
          Free Finance Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Retirement Calculator — How Much Do You Need to Retire?
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Retirement Calculator tool'>
          <RetirementCalculatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="retirement-calculator" toolName="Retirement Calculator" />
      </SidebarAdLayout>
    </>
  );
}
