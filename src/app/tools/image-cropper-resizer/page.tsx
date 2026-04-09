// src/app/tools/image-cropper-resizer/page.tsx
import type { Metadata } from "next";
import ImageCropperResizerClient from "./ImageCropperResizerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Image Cropper & Resizer — Crop, Resize, Rotate & Flip Images Free Online",
  description:
    "Crop and resize images in your browser — set exact pixel dimensions, maintain aspect ratio, apply preset sizes for social media, and rotate or flip. Supports JPG, PNG, WebP, GIF. Free, no upload, no signup.",
  keywords:
    "image cropper, image resizer, crop image online, resize image online, resize photo, crop photo, image dimensions, social media image sizes, free image editor, no upload image tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/image-cropper-resizer` },
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
    url: `${SITE_URL}/tools/image-cropper-resizer`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Image Cropper & Resizer — Crop, Resize, Rotate & Flip Images Free Online",
    description:
      "Crop and resize images online — exact dimensions, aspect ratio lock, social media presets, rotate and flip. Runs entirely in your browser. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Image Cropper & Resizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Image Cropper & Resizer — Crop, Resize, Rotate & Flip Images Free Online",
    description:
      "Crop, resize, rotate, and flip images in your browser — social media presets, aspect ratio lock. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Cropper & Resizer",
  description:
    "Crop and resize images in the browser without uploading to a server. Set exact pixel dimensions with optional aspect ratio lock, apply social media size presets (Twitter header, Instagram square, Facebook cover, etc.), rotate 90° left or right, and flip horizontally or vertically. Supports JPG, PNG, WebP, and GIF.",
  url: `${SITE_URL}/tools/image-cropper-resizer`,
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
      name: "Image Cropper & Resizer",
      item: `${SITE_URL}/tools/image-cropper-resizer`,
    },
  ],
};

export default function ImageCropperResizerPage() {
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
            <a href='/' className='hover:text-teal-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/image'
              className='hover:text-teal-600 transition-colors'
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Image Cropper &amp; Resizer
            </span>
          </li>
        </ol>
      </nav>
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1'>
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Image Cropper &amp; Resizer — Crop, Resize, Rotate &amp; Flip Images
          Free Online
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Crop and resize images in your browser — exact pixel dimensions,
          aspect ratio lock, social media presets, rotate and flip. No upload
          required.
        </p>
      </header>
      <SidebarAdLayout>
        <main id='main-content' aria-label='Image Cropper and Resizer tool'>
          <ImageCropperResizerClient />
        </main>
        <PageEditorial />
              <ToolEngagement toolSlug="image-cropper-resizer" toolName="Image Cropper & Resizer" />
      </SidebarAdLayout>
    </>
  );
}
