// src/app/tools/image-format-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const ImageFormatConverterClient = dynamic(
  () => import("./ImageFormatConverterClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "image-format-converter");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Image Format Converter — Convert JPG, PNG, WebP Free Online",
  description:
    "Convert images between JPG, PNG, and WebP formats in your browser. Adjust quality, see file size comparison, and download the converted image. Free, no signup, nothing uploaded.",
  keywords:
    "image format converter, jpg to png, png to webp, webp to jpg, convert image format, image converter online, jpg png webp converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/image-format-converter` },
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
    url: `${SITE_URL}/tools/image-format-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Image Format Converter — Convert JPG, PNG, WebP Free Online",
    description:
      "Convert images between JPG, PNG, and WebP. Adjust quality, preview size change, download result. Runs in browser — nothing uploaded. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Image Format Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Image Format Converter — Convert JPG, PNG, WebP Free Online",
    description:
      "Convert between JPG, PNG, and WebP in your browser. Nothing uploaded. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Format Converter",
  description:
    "Converts uploaded images between JPEG, PNG, and WebP formats using the browser Canvas API. Supports quality adjustment for JPEG and WebP outputs. Displays original and converted file sizes for comparison before download. All processing runs in the browser — files are never uploaded to any server.",
  url: `${SITE_URL}/tools/image-format-converter`,
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
      name: "Image Format Converter",
      item: `${SITE_URL}/tools/image-format-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between PNG, JPG, and WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PNG (Portable Network Graphics) uses lossless compression — no quality is lost when saving, and it supports transparent backgrounds. Best for logos, graphics with flat colours, text-heavy images, and anything where sharp edges and exact colour reproduction matter. JPG/JPEG (Joint Photographic Experts Group) uses lossy compression — quality is reduced slightly each time you save, but file sizes are dramatically smaller than PNG for photographic images. Best for photos and complex images where some quality loss is imperceptible...",
      },
    },
    {
      "@type": "Question",
      name: "When should I convert to WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Convert to WebP when your primary use case is web deployment and you want the smallest possible file size without visible quality loss. WebP typically achieves 25–35% smaller files than JPEG and 26% smaller than PNG at comparable quality. It is now supported by all major browsers including Chrome, Firefox, Safari (from 14+), and Edge. If you are preparing images for a website and your target audience uses modern browsers, WebP is the recommended format. The main limitation: WebP has less universal support in image editors and older software than PNG or JPG.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting between formats reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the formats involved. Converting from a lossless format (PNG) to another lossless format (PNG, BMP) — no quality loss. Converting from a lossless format (PNG) to a lossy format (JPG, WebP lossy) — some quality reduction, controlled by the quality slider. Converting from a lossy format (JPG) to any format — the original quality loss from the JPEG encoding is permanent; you cannot recover detail that JPEG compression discarded. Converting JPG to PNG will not degrade the image further, but it also won't recover any quality lost in the original JPEG encoding...",
      },
    },
    {
      "@type": "Question",
      name: "What quality setting should I use for JPEG and WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quality settings for lossy formats (JPG, WebP lossy) range from 0 (maximum compression, poorest quality) to 100 (minimum compression, best quality). Practical guidance: 85–95% quality produces results that are visually identical to the original for most photographic content at significantly smaller file sizes than 100%. 70–85% is acceptable for web images where some quality trade-off is acceptable. Below 70%, visible compression artefacts (blocky patterns, smearing around edges) become noticeable at normal viewing distances...",
      },
    },
    {
      "@type": "Question",
      name: "Will my image be uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — all conversion processing in this tool happens entirely in your browser using the HTML5 Canvas API. When you upload an image, it is read locally by your browser's FileReader API, drawn onto a canvas element, and exported in the target format. Your image is never transmitted to any server. This makes the tool safe to use with personal photos, proprietary graphics, confidential documents, and any image you don't want stored on third-party servers.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Image Format Converter",
  description: "Step-by-step guide to using the free Image Format Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Image Format Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Image Format Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function ImageFormatConverterPage() {
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
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/image"
              className="hover:text-blue-600 transition-colors"
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Image Format Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Image Format Converter — Convert JPG, PNG, WebP Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert images between JPG, PNG, and WebP — adjust quality, compare
          file sizes, and download the result. Runs entirely in your browser.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Image Format Converter tool">
          <ImageFormatConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="image-format-converter"
          toolName="Image Format Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
