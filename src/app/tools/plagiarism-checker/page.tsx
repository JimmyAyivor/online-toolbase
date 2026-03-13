// src/app/tools/plagiarism-checker/page.tsx
import type { Metadata } from "next";
import PlagiarismCheckerClient from "./PlagiarismCheckerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Plagiarism Checker — Free Online Plagiarism Checker",
  description:
    "Check your text against web sources for duplicate content and plagiarism. Free, instant, no signup required.",
  keywords:
    "plagiarism checker, free plagiarism checker, online plagiarism checker, duplicate content checker, originality checker, plagiarism detector",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/plagiarism-checker` },
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
    url: `${SITE_URL}/tools/plagiarism-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Plagiarism Checker — Free Online Plagiarism Checker",
    description:
      "Check your text against web sources for duplicate content and plagiarism. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Plagiarism Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Plagiarism Checker — Free Online Plagiarism Checker",
    description:
      "Check your text against web sources for duplicate content and plagiarism. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Plagiarism Checker",
  description:
    "Check your text against web sources for duplicate content and plagiarism.",
  url: `${SITE_URL}/tools/plagiarism-checker`,
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
      name: "Plagiarism Checker",
      item: `${SITE_URL}/tools/plagiarism-checker`,
    },
  ],
};

export default function PlagiarismCheckerPage() {
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
              href='/tools/category/writing'
              className='hover:text-indigo-600 transition-colors'
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Plagiarism Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Plagiarism Checker — Free Online Plagiarism Checker
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Check your text against live web sources for duplicate content and
          plagiarism. Free, instant, no account needed.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Plagiarism Checker tool'>
          <PlagiarismCheckerClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
