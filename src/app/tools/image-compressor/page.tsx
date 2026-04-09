// src/app/tools/image-compressor/page.tsx
import type { Metadata } from "next";
import ImageCompressorClient from "./ImageCompressorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Image Compressor — Reduce JPG, PNG & WebP File Size Free Online",
  description:
    "Compress JPG, PNG, and WebP images in your browser — adjust quality from 10–100%, see original vs compressed side-by-side, and download. Runs entirely locally: your images are never uploaded. Free, no signup.",
  keywords:
    "image compressor, compress image online, reduce image file size, compress jpg, compress png, compress webp, image size reducer, free image compressor, web image optimiser",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/image-compressor` },
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
    url: `${SITE_URL}/tools/image-compressor`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Image Compressor — Reduce JPG, PNG & WebP File Size Free Online",
    description:
      "Compress images in your browser with an adjustable quality slider — see before/after sizes and percentage saved. JPG, PNG, WebP. No upload. Free.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Image Compressor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Image Compressor — Reduce JPG, PNG & WebP File Size Free Online",
    description:
      "Compress images in your browser — adjustable quality, before/after comparison, no upload. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Compressor",
  description:
    "Compress JPG, PNG, and WebP images using the HTML5 Canvas API — entirely in the browser with no file upload. Adjustable quality slider (10–100%) with real-time before/after size comparison, percentage reduction display, and one-click download. Supports JPG, PNG, and WebP input.",
  url: `${SITE_URL}/tools/image-compressor`,
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
      name: "Image Compressor",
      item: `${SITE_URL}/tools/image-compressor`,
    },
  ],
};

export default function ImageCompressorPage() {
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
            <a href='/' className='hover:text-violet-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/image'
              className='hover:text-violet-600 transition-colors'
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Image Compressor
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1'>
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Image Compressor — Reduce JPG, PNG &amp; WebP File Size Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Compress JPG, PNG, and WebP images in your browser — adjustable
          quality, before/after comparison, no upload to any server.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Image Compressor tool'>
          <ImageCompressorClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="image-compressor" toolName="Image Compressor" />
      </SidebarAdLayout>
    </>
  );
}
