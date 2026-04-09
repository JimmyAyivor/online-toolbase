// src/app/tools/pregnancy-due-date-calculator/page.tsx
import type { Metadata } from "next";
import PregnancyDueDateCalculatorClient from "./PregnancyDueDateCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator — Calculate Your Baby's Due Date",
  description:
    "Calculate your estimated due date (EDD) based on your last menstrual period or conception date. See trimesters and key milestones. Free.",
  keywords:
    "pregnancy due date calculator, due date calculator, estimated due date, baby due date, pregnancy calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/pregnancy-due-date-calculator` },
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
    url: `${SITE_URL}/tools/pregnancy-due-date-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Pregnancy Due Date Calculator — Calculate Your Baby's Due Date",
    description:
      "Calculate your estimated due date (EDD) based on your last menstrual period or conception date. See trimesters and key milestones. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Pregnancy Due Date Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Pregnancy Due Date Calculator — Calculate Your Baby's Due Date",
    description:
      "Calculate your estimated due date (EDD) based on your last menstrual period or conception date. See trimesters and key milestones. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pregnancy Due Date Calculator",
  description:
    "Calculate your estimated due date (EDD) based on your last menstrual period or conception date. See trimesters and key milestones. Free.",
  url: `${SITE_URL}/tools/pregnancy-due-date-calculator`,
  applicationCategory: "HealthApplication",
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
      name: "Health Tools",
      item: `${SITE_URL}/tools/category/health`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Pregnancy Due Date Calculator",
      item: `${SITE_URL}/tools/pregnancy-due-date-calculator`,
    },
  ],
};

export default function PregnancyDueDateCalculatorPage() {
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
            <a href='/' className='hover:text-rose-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/health'
              className='hover:text-rose-600 transition-colors'
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Pregnancy Due Date Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1'>
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Pregnancy Due Date Calculator — Calculate Your Baby's Due Date
        </h1>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Pregnancy Due Date Calculator tool'>
          <PregnancyDueDateCalculatorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="pregnancy-due-date-calculator" toolName="Pregnancy Due Date Calculator" />
      </SidebarAdLayout>
    </>
  );
}
