// src/app/tools/resume-builder/page.tsx
import type { Metadata } from "next";
import ResumeBuilderClient from "./ResumeBuilderClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Resume Builder — Build & Download a Professional Resume Free Online",
  description:
    "Build a professional resume with sections for work experience, education, skills, and a summary. Live preview updates as you type. Download as PDF. Free, no signup, no data stored.",
  keywords:
    "resume builder, free resume builder, online resume maker, CV builder, resume template, resume PDF download, professional resume, ATS resume, resume creator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/resume-builder` },
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
    url: `${SITE_URL}/tools/resume-builder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Resume Builder — Build & Download a Professional Resume Free Online",
    description:
      "Build a resume with work experience, education, skills, and summary. Live preview. Download as PDF. Free, no signup, no data stored.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Resume Builder — Build & Download a Professional Resume Free Online",
    description:
      "Build a professional resume with live preview and PDF download. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Resume Builder",
  description:
    "Builds a professional resume with sections for personal details, professional summary, work experience (multiple entries with dates and bullet points), education, and skills. Includes a live preview that updates as you type and a one-click PDF download. All data stays in the browser — nothing is sent to or stored on servers.",
  url: `${SITE_URL}/tools/resume-builder`,
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
      name: "Business Tools",
      item: `${SITE_URL}/tools/category/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Resume Builder",
      item: `${SITE_URL}/tools/resume-builder`,
    },
  ],
};

export default function ResumeBuilderPage() {
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
              Resume Builder
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1'>
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Resume Builder — Build &amp; Download a Professional Resume Free
          Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Build a professional resume with work experience, education, skills,
          and summary — live preview updates as you type and downloads as a PDF.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Resume Builder tool'>
          <ResumeBuilderClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
