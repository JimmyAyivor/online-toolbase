// src/app/tools/favicon-generator/page.tsx
import type { Metadata } from "next";
import FaviconGeneratorClient from "./FaviconGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Favicon Generator — Create Favicon PNG & ICO from Any Image Free Online",
  description:
    "Generate favicons in all required sizes (16×16, 32×32, 180×180, 192×192, 512×512) from any image. Download individual PNGs, a favicon.ico, or the full set with HTML code and site.webmanifest. Free, no signup.",
  keywords:
    "favicon generator, favicon creator, favicon from image, favicon ico, apple touch icon, web manifest icon, favicon sizes, create favicon, free favicon tool, png to favicon",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/favicon-generator` },
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
    url: `${SITE_URL}/tools/favicon-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Favicon Generator — Create Favicon PNG & ICO from Any Image Free Online",
    description:
      "Upload any image and generate favicons in all required sizes — 16×16, 32×32, 180×180, 192×192, 512×512. Includes HTML code and site.webmanifest. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Favicon Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Favicon Generator — Create Favicon PNG & ICO from Any Image Free Online",
    description:
      "Generate favicons in all sizes from any image. Download PNGs, ICO, HTML code, and webmanifest. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Favicon Generator",
  description:
    "Generates favicon PNG files in all standard sizes (16×16, 32×32, 48×48, 64×64, 128×128, 180×180 Apple Touch Icon, 192×192 and 512×512 Android Chrome) from an uploaded image. Also outputs a favicon.ico (32×32 PNG renamed), ready-to-paste HTML link tags, and a site.webmanifest JSON file. All processing runs in the browser using the Canvas API.",
  url: `${SITE_URL}/tools/favicon-generator`,
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
      name: "Image Tools",
      item: `${SITE_URL}/tools/category/image`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Favicon Generator",
      item: `${SITE_URL}/tools/favicon-generator`,
    },
  ],
};

export default function FaviconGeneratorPage() {
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
            <a href='/' className='hover:text-orange-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/image'
              className='hover:text-orange-600 transition-colors'
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Favicon Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-orange-600 uppercase tracking-widest mb-1'>
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Favicon Generator — Create Favicon PNG &amp; ICO from Any Image Free
          Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Upload any image and generate favicons in all standard sizes —
          download individual PNGs, favicon.ico, the full set, HTML code, and
          site.webmanifest.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Favicon Generator tool'>
          <FaviconGeneratorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="favicon-generator" toolName="Favicon Generator" />
      </SidebarAdLayout>
    </>
  );
}
