// src/app/tools/image-cropper-resizer/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const ImageCropperResizerClient = dynamic(
  () => import("./ImageCropperResizerClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "image-cropper-resizer");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Image Cropper & Resizer — Crop & Resize Online",
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
    title: "Free Image Cropper & Resizer — Crop & Resize Online",
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
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Image Cropper & Resizer — Crop & Resize Online",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does this tool upload my images to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — all processing happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device: they are not uploaded to any server, stored in a database, or transmitted over the internet. The tool reads your image file locally, draws it onto an off-screen HTML canvas element, applies the crop and resize operations, and then generates a downloadable file from the canvas — all within your browser tab. This means the tool works offline once the page has loaded, is completely private, and there are no file size limits imposed by server upload restrictions...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between cropping and resizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cropping and resizing are two distinct operations that are often confused. Resizing changes the dimensions of the entire image — the full image content is scaled up or down to fit new width and height values. If you maintain the aspect ratio, the image proportions stay the same; if you don't, the image will be stretched or squashed. Resizing does not remove any content — it scales everything. Cropping, in contrast, removes part of the image — it selects a rectangular area of the original image and discards everything outside that area...",
      },
    },
    {
      "@type": "Question",
      name: "What does 'lock aspect ratio' mean and when should I use it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The aspect ratio is the proportional relationship between width and height — for example, 16:9, 4:3, or 1:1. Locking the aspect ratio means that when you change one dimension (width or height), the other adjusts automatically to maintain the same proportion. This prevents distortion — the image content won't be stretched or squashed. Enable aspect ratio lock when you need to make an image smaller or larger while keeping it looking correct, or when a platform requires a specific aspect ratio (like 1:1 for Instagram or 16:9 for YouTube)...",
      },
    },
    {
      "@type": "Question",
      name: "What are the standard image sizes for social media profiles and posts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Social media platforms have specific recommended image dimensions. Profile pictures are typically square: 400×400 px for Twitter/X, 170×170 px for Facebook, 110×110 px for Instagram (displayed as a circle). For cover/banner photos: Twitter/X header is 1500×500 px; Facebook cover is 820×312 px on desktop; LinkedIn profile banner is 1584×396 px. For post images: Instagram square posts are 1080×1080 px; Instagram portrait posts are 1080×1350 px; Twitter/X post images are 1200×675 px (16:9); Facebook shared images are 1200×630 px...",
      },
    },
    {
      "@type": "Question",
      name: "What output formats are supported and which should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool outputs JPEG, PNG, and WebP. Choose JPEG for photographs and images with many colours and gradients — it offers good quality at small file sizes using lossy compression, but does not support transparency. JPEG is the standard for photos shared on social media and the web. Choose PNG when you need lossless quality (no compression artefacts), transparency (transparent backgrounds), or for screenshots and graphics with text and sharp edges. PNG files are larger than JPEGs at equivalent dimensions...",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize an image for email without it being too large to send?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Email attachments are typically limited to 10–25 MB by most providers (Gmail, Outlook), and email clients may display large images at reduced quality anyway. For email images: resize photos to a maximum of 1200 pixels wide for inline images, or 800 pixels wide if the email will be viewed primarily on mobile. A good target file size is under 500 KB per image. Use JPEG format with quality set to 70–80% for the best size-to-quality ratio...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Image Cropper & Resizer",
  description:
    "Step-by-step guide to using the free Image Cropper & Resizer on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Image Cropper & Resizer on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Image Cropper & Resizer provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function ImageCropperResizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-teal-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/image-design-tools"
              className="hover:text-teal-600 transition-colors"
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Image Cropper &amp; Resizer
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Image Cropper &amp; Resizer — Crop, Resize, Rotate &amp; Flip Images
          Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Crop and resize images in your browser — exact pixel dimensions,
          aspect ratio lock, social media presets, rotate and flip. No upload
          required.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Image Cropper and Resizer tool">
          <ImageCropperResizerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="image-cropper-resizer"
          toolName="Image Cropper & Resizer"
        />
      </SidebarAdLayout>
    </>
  );
}
