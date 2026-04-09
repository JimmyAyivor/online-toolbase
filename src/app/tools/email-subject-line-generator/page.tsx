// src/app/tools/email-subject-line-generator/page.tsx
import type { Metadata } from "next";
import EmailSubjectLineGeneratorClient from "./EmailSubjectLineGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Email Subject Line Generator — High Open-Rate Subject Lines",
  description:
    "Generate compelling email subject lines for any campaign type. Get urgency, curiosity, and personalisation variants instantly. Free, no signup.",
  keywords:
    "email subject line generator, email subject lines, best email subject lines, marketing email subject, newsletter subject line generator, cold email subject line",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/email-subject-line-generator` },
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
    url: `${SITE_URL}/tools/email-subject-line-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Email Subject Line Generator — High Open-Rate Subject Lines",
    description:
      "Generate urgency, curiosity, and personalised email subject line variants for any campaign.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Email Subject Line Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Email Subject Line Generator",
    description:
      "Generate compelling email subject lines for any campaign. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Email Subject Line Generator",
  description:
    "Generate high open-rate email subject lines with urgency, curiosity, and personalisation variants.",
  url: `${SITE_URL}/tools/email-subject-line-generator`,
  applicationCategory: "BusinessApplication",
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
      name: "Business Tools",
      item: `${SITE_URL}/tools/category/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Email Subject Line Generator",
      item: `${SITE_URL}/tools/email-subject-line-generator`,
    },
  ],
};

export default function EmailSubjectLineGeneratorPage() {
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
              href='/tools/category/business'
              className='hover:text-blue-600 transition-colors'
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Email Subject Line Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1'>
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Email Subject Line Generator — High Open-Rate Subject Lines
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate compelling email subject lines across different psychological
          trigger styles — urgency, curiosity, benefit, and personalisation.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Email Subject Line Generator tool'>
          <EmailSubjectLineGeneratorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="email-subject-line-generator" toolName="Email Subject Line Generator" />
      </SidebarAdLayout>
    </>
  );
}
