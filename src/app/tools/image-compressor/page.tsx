// src/app/tools/image-compressor/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";   
import { tools } from "@/lib/tools";
const ImageCompressorClient = dynamic(
  () => import("./ImageCompressorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "image-compressor");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Free Image Compressor — Reduce JPG, PNG & WebP Size",
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
    title: "Free Image Compressor — Reduce JPG, PNG & WebP Size",
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
    title: "Free Image Compressor — Reduce JPG, PNG & WebP Size",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does this tool upload my images to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All compression processing happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device — they are not uploaded to any server, stored in any database, or transmitted over the internet. The tool reads your image file locally, draws it to an off-screen canvas, re-encodes it as JPEG at the selected quality level, and produces a downloadable file — all within your browser tab. This means the tool is completely private, works offline once loaded, and has no file size limits imposed by upload restrictions...",
      },
    },
    {
      "@type": "Question",
      name: "What quality setting should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The optimal quality setting depends on your use case. For images displayed on websites or shared on social media, 70–80% quality typically produces files 40–60% smaller than the original with no visually perceptible quality loss to most viewers — this is the standard range used by major platforms like Facebook and Instagram when they re-compress uploaded images. For professional photography or print, use 90%+. For small preview images or thumbnails, 50–65% is fine. For maximum file size reduction where quality is not critical (e.g., loading placeholders), go as low as 30–40%...",
      },
    },
    {
      "@type": "Question",
      name: "Why is the compressed file sometimes larger than the original?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This can happen in a few specific situations. If the original image was already heavily compressed (e.g., a JPEG saved at quality 60%), re-encoding it as JPEG at quality 80–100% may produce a larger file because you're encoding a lossy-compressed source at higher quality than the original. Additionally, PNG files use lossless compression — converting a well-optimised PNG to JPEG at high quality can sometimes be larger than the original PNG, depending on the image content...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between lossy and lossless compression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lossy compression permanently discards some image data to achieve smaller file sizes. JPEG uses lossy compression — at lower quality settings, the algorithm discards fine detail, colour gradients, and sharp edges, producing visible artefacts (blockiness, blurring) at extreme settings. The advantage is dramatically smaller files: a 5 MB JPEG photo might compress to 200–500 KB at quality 75 with minimal visible difference. Lossless compression reduces file size without discarding any data — the decompressed image is pixel-for-pixel identical to the original...",
      },
    },
    {
      "@type": "Question",
      name: "What image formats does this tool support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool accepts JPG/JPEG, PNG, and WebP as input. The output is always JPEG, which is the most universally compatible format for sharing and displaying photos on the web, via email, and in documents. JPEG is ideal for photographs and images with smooth colour gradients. If you need lossless output (preserving transparency or avoiding any quality loss), a different tool would be needed, as JPEG does not support transparency and always applies lossy compression...",
      },
    },
    {
      "@type": "Question",
      name: "How much will my image actually be reduced in size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The reduction depends on the original image's content, its existing compression level, and your chosen quality setting. A typical uncompressed or lightly-compressed JPEG photo at quality 80% will be reduced by 40–60% — a 4 MB photo might compress to 1.5–2.5 MB. At quality 60%, reductions of 65–75% are common. PNG files, which use lossless compression, often compress more dramatically when converted to JPEG: a 2 MB PNG screenshot might become a 200 KB JPEG at quality 80%. Images with lots of flat colour, simple graphics, or text compress more than photos with complex textures...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Image Compressor",
  description: "Step-by-step guide to using the free Image Compressor on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Image Compressor on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Image Compressor provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function ImageCompressorPage() {
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
            <a href="/" className="hover:text-violet-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/image"
              className="hover:text-violet-600 transition-colors"
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Image Compressor
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Image Compressor — Reduce JPG, PNG &amp; WebP File Size Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Compress JPG, PNG, and WebP images in your browser — adjustable
          quality, before/after comparison, no upload to any server.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Image Compressor tool">
          <ImageCompressorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="image-compressor"
          toolName="Image Compressor"
        />
      </SidebarAdLayout>
    </>
  );
}
