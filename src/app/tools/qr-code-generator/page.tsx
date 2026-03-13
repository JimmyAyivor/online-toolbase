// src/app/tools/qr-code-generator/page.tsx
import type { Metadata } from "next";
import QrCodeGeneratorClient from "./QrCodeGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "QR Code Generator — Free Custom QR Codes for URLs, WiFi, Email & More",
  description:
    "Generate QR codes for URLs, text, WiFi, email, phone, SMS, vCard, and location. Custom colours and sizes. Download as PNG instantly. Free, no signup.",
  keywords:
    "qr code generator, free qr code generator, custom qr code, wifi qr code, url qr code, vcard qr code, qr code maker online, generate qr code free, qr code download, qr code creator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/qr-code-generator` },
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
    url: `${SITE_URL}/tools/qr-code-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "QR Code Generator — Free Custom QR Codes for URLs, WiFi, Email & More",
    description:
      "Generate QR codes for URLs, text, WiFi, email, phone, SMS, vCard, and location. Custom colours, sizes, download as PNG. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online QR Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "QR Code Generator — Free Custom QR Codes for URLs, WiFi, Email & More",
    description:
      "Generate QR codes for URLs, WiFi, email, vCard, and more. Custom colours and sizes, download as PNG. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QR Code Generator",
  description:
    "Generate QR codes for URLs, text, WiFi networks, email addresses, phone numbers, SMS, vCard contact cards, and geographic locations. Custom foreground and background colours, adjustable size, download as PNG.",
  url: `${SITE_URL}/tools/qr-code-generator`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "QR Code Generator",
      item: `${SITE_URL}/tools/qr-code-generator`,
    },
  ],
};

export default function QrCodeGeneratorPage() {
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
              href='/tools/category/developer'
              className='hover:text-cyan-600 transition-colors'
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              QR Code Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1'>
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          QR Code Generator — Free Custom QR Codes for URLs, WiFi, Email &amp;
          More
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate QR codes for URLs, WiFi, email, vCard, and more — custom
          colours, adjustable size, download as PNG.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='QR Code Generator tool'>
          <QrCodeGeneratorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
