// src/app/tools/signature-generator/page.tsx
import type { Metadata } from "next";
import SignatureGeneratorClient from "./SignatureGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Signature Generator — Create a Digital Signature Free Online & Download PNG",
  description:
    "Create a handwritten-style digital signature from your name. Choose font style, colour, size, and line weight — download as a transparent PNG or copy for use in documents and emails. Free, no signup.",
  keywords:
    "signature generator, digital signature, online signature maker, handwritten signature, signature PNG, signature for documents, email signature, free signature creator, signature download",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/signature-generator` },
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
    url: `${SITE_URL}/tools/signature-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Signature Generator — Create a Digital Signature Free Online & Download PNG",
    description:
      "Create a handwritten-style digital signature from your name. Choose font, colour, and size. Download as transparent PNG. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Signature Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Signature Generator — Create a Digital Signature Free Online & Download PNG",
    description:
      "Create a handwritten-style digital signature and download as transparent PNG. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Signature Generator",
  description:
    "Generates a handwritten-style digital signature from typed text. Users can choose from multiple cursive and script font styles, select signature colour and ink opacity, adjust text size and line weight, and preview the result on a canvas element. The signature can be downloaded as a transparent PNG file for use in PDFs, documents, and email signatures. All processing runs in the browser — no data is uploaded.",
  url: `${SITE_URL}/tools/signature-generator`,
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
      name: "Signature Generator",
      item: `${SITE_URL}/tools/signature-generator`,
    },
  ],
};

export default function SignatureGeneratorPage() {
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
              href='/tools/category/business'
              className='hover:text-rose-600 transition-colors'
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Signature Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-rose-600 uppercase tracking-widest mb-1'>
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Signature Generator — Create a Digital Signature Free Online &amp;
          Download PNG
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Create a handwritten-style digital signature from your name — choose
          font, colour, and size, then download as a transparent PNG.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Signature Generator tool'>
          <SignatureGeneratorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="signature-generator" toolName="Signature Generator" />
      </SidebarAdLayout>
    </>
  );
}
