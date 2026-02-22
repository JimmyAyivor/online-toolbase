// src/app/tools/image-cropper-resizer/page.tsx
import type { Metadata } from "next";
import ImageCropperResizerClient from "./ImageCropperResizerClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title:
    "Image Cropper & Resizer — Free Online Image Cropper & Resizer | Free Online Tools",
  description:
    "Crop and resize images quickly online without any software. Free, instant, no signup required.",
  keywords:
    "image cropper & resizer, free image cropper & resizer, online image cropper & resizer, image cropper & resizer free, image cropper & resizer online, image tool, free online image cropper & resizer, best image cropper & resizer",
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
    title: "Image Cropper & Resizer — Free Online Image Cropper & Resizer",
    description:
      "Crop and resize images quickly online without any software. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/og/image-cropper-resizer.png`,
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
    title: "Image Cropper & Resizer — Free Online Image Cropper & Resizer",
    description: "Crop and resize images quickly online without any software.",
    images: [`${SITE_URL}/og/image-cropper-resizer.png`],
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Cropper & Resizer",
  description: "Crop and resize images quickly online without any software.",
  url: `${SITE_URL}/tools/image-cropper-resizer`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
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

      {/* Breadcrumb */}
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
              href='/tools/category/image'
              className='hover:text-indigo-600 transition-colors'
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Image Cropper & Resizer
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Image Cropper & Resizer — Free Online Image Cropper & Resizer
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Crop and resize images quickly online without any software. Free,
          instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id='main-content' aria-label='Image Cropper & Resizer tool'>
          <ImageCropperResizerClient />
        </main>

        {/* ── Zone G: below tool result — highest value placement ──────── */}
        {/* Sits immediately after the tool, before any editorial content   */}
        <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
          {/* desktop: rectangle 336×280; mobile: medium rectangle 300×250 */}
          <div className='hidden sm:block'>
            <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
          </div>
          <div className='block sm:hidden'>
            <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
          </div>
        </div>

        {/* ── Zone H: between tool + How To editorial ──────────────────── */}
        <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
          <AdSlot
            variant='leaderboard'
            slotId={SLOT_LEADERBOARD}
            className='hidden sm:flex'
          />
          <AdSlot
            variant='mediumrectangle'
            slotId={SLOT_LEADERBOARD}
            className='flex sm:hidden'
          />
        </div>

        {/* ── Editorial: How To + Related Tools ────────────────────────── */}
        <section
          aria-labelledby='about-image-cropper-resizer'
          className='max-w-6xl mx-auto px-4 py-12'
        >
          <div className='bg-white rounded-2xl shadow-lg p-8 md:p-10'>
            <h2
              id='about-image-cropper-resizer'
              className='text-2xl font-bold text-gray-900 mb-4'
            >
              How to Use This Free Image Cropper & Resizer
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              Our free online <strong>image cropper & resizer</strong> is
              designed for speed and simplicity. Crop and resize images quickly
              online without any software. No software installation or account
              is required — just use the tool above and get results instantly.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              All processing runs entirely in your browser. Your data is never
              sent to or stored on our servers. This tool is part of our{" "}
              <a
                href='/'
                className='text-indigo-600 hover:underline font-medium'
              >
                free online tools directory
              </a>{" "}
              — 60+ tools covering calculators, converters, generators, and
              social media utilities.
            </p>
          </div>

          {/* ── Zone I: related tools grid with native ad slot ──────────── */}
          <div className='mt-8'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Related Free Image Tools
            </h3>
            {/* 3-slot grid; the 4th card position (index 3) is reserved for */}
            {/* a native sponsored card — set data-ad-format="fluid" in AdSense */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {[
                {
                  href: "/tools/image-compressor",
                  label: "Image Compressor",
                  desc: "Compress JPG, PNG, and WebP images to reduce file size without losing quality.",
                },
                {
                  href: "/tools/image-format-converter",
                  label: "Image Format Converter",
                  desc: "Convert images between PNG, JPG, WebP, and other formats online.",
                },
                {
                  href: "/tools/background-remover",
                  label: "Background Remover",
                  desc: "Remove image backgrounds automatically with AI-powered precision.",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='block bg-white rounded-xl shadow p-5 border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200'
                  aria-label={`${link.label} — ${link.desc}`}
                >
                  <div className='font-bold text-gray-900 text-sm mb-1'>
                    {link.label}
                  </div>
                  <div className='text-xs text-gray-500'>{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </SidebarAdLayout>
    </>
  );
}
