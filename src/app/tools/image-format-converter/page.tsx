// src/app/tools/image-format-converter/page.tsx
import type { Metadata } from "next";
import ImageFormatConverterClient from "./ImageFormatConverterClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Image Format Converter — Convert JPG, PNG, WebP Free Online",
  description: "Convert images between JPG, PNG, and WebP formats in your browser. Adjust quality, see file size comparison, and download the converted image. Free, no signup, nothing uploaded.",
  keywords: "image format converter, jpg to png, png to webp, webp to jpg, convert image format, image converter online, jpg png webp converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/image-format-converter` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/image-format-converter`, siteName: SITE_NAME, locale: "en_US", title: "Image Format Converter — Convert JPG, PNG, WebP Free Online", description: "Convert images between JPG, PNG, and WebP. Adjust quality, preview size change, download result. Runs in browser — nothing uploaded. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Image Format Converter" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Image Format Converter — Convert JPG, PNG, WebP Free Online", description: "Convert between JPG, PNG, and WebP in your browser. Nothing uploaded. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Image Format Converter", description: "Converts uploaded images between JPEG, PNG, and WebP formats using the browser Canvas API. Supports quality adjustment for JPEG and WebP outputs. Displays original and converted file sizes for comparison before download. All processing runs in the browser — files are never uploaded to any server.", url: `${SITE_URL}/tools/image-format-converter`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Image Tools", item: `${SITE_URL}/tools/category/image` }, { "@type": "ListItem", position: 3, name: "Image Format Converter", item: `${SITE_URL}/tools/image-format-converter` }] };

export default function ImageFormatConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/image" className="hover:text-blue-600 transition-colors">Image Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Image Format Converter</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Free Image Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Image Format Converter — Convert JPG, PNG, WebP Free Online</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Convert images between JPG, PNG, and WebP — adjust quality, compare file sizes, and download the result. Runs entirely in your browser.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Image Format Converter tool"><ImageFormatConverterClient /></main>
        <PageEditorial />
              <ToolEngagement toolSlug="image-format-converter" toolName="Image Format Converter" />
      </SidebarAdLayout>
    </>
  );
}