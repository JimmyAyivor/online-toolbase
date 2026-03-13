// src/app/tools/meme-generator/page.tsx
import type { Metadata } from "next";
import MemeGeneratorClient from "./MemeGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Meme Generator — Add Text to Any Image, Free Online Meme Maker",
  description:
    "Create custom memes in your browser — upload any image or choose a classic template, add top and bottom text with custom font size and colour, and download. All processing is local, no upload required. Free, no signup.",
  keywords:
    "meme generator, meme maker, create meme online, add text to image, meme template, custom meme, free meme generator, online meme creator, impact font meme",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/meme-generator` },
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
    url: `${SITE_URL}/tools/meme-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Meme Generator — Add Text to Any Image, Free Online Meme Maker",
    description:
      "Upload any image or pick a classic template, add top and bottom text, customise font size and colour, download your meme. Runs in your browser. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Meme Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Meme Generator — Add Text to Any Image, Free Online Meme Maker",
    description:
      "Upload any image or pick a classic template, add text, and download. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Meme Generator",
  description:
    "Create custom memes in the browser — upload your own image or choose from classic meme templates, add top and bottom text with adjustable font size, font colour, and stroke width, preview in real time on the canvas, and download as a PNG. No server upload required.",
  url: `${SITE_URL}/tools/meme-generator`,
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
      name: "Fun Tools",
      item: `${SITE_URL}/tools/category/fun`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Meme Generator",
      item: `${SITE_URL}/tools/meme-generator`,
    },
  ],
};

export default function MemeGeneratorPage() {
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
            <a href='/' className='hover:text-yellow-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/fun'
              className='hover:text-yellow-600 transition-colors'
            >
              Fun Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Meme Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-yellow-600 uppercase tracking-widest mb-1'>
          Free Fun Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Meme Generator — Add Text to Any Image, Free Online Meme Maker
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Upload any image or pick a classic template, add top and bottom text,
          customise font size and colour, and download your meme. Runs entirely
          in your browser.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Meme Generator tool'>
          <MemeGeneratorClient />
        </main>
        <PageEditorial />
      </SidebarAdLayout>
    </>
  );
}
