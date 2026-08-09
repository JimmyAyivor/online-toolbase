// src/app/tools/aspect-ratio-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const AspectRatioCalculatorClient = dynamic(
  () => import("./AspectRatioCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "aspect-ratio-calculator");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Aspect Ratio Calculator — Resize Any Dimension",
  description:
    "Calculate aspect ratios from dimensions, find missing width or height from a ratio, and scale images proportionally. Includes 8 common ratio presets and a resolution reference table. Free, no signup.",
  keywords:
    "aspect ratio calculator, image aspect ratio, video aspect ratio, 16:9 calculator, 4:3 ratio, dimension calculator, scale image proportionally, resolution calculator, widescreen ratio",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/aspect-ratio-calculator` },
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
    url: `${SITE_URL}/tools/aspect-ratio-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Aspect Ratio Calculator — Resize Any Dimension",
    description:
      "Find ratio from dimensions, calculate missing width/height, and scale proportionally. Common ratio presets and resolution reference. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Aspect Ratio Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Aspect Ratio Calculator — Resize Any Dimension",
    description:
      "Find ratio, missing dimensions, and scale images. Common ratio presets. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Aspect Ratio Calculator",
  description:
    "Four-mode aspect ratio calculator: Find Ratio (calculates simplified ratio and decimal from width and height), Find Height (calculates height from width and ratio), Find Width (calculates width from height and ratio), and Scale (scales dimensions by percentage). Includes 8 common ratio presets (16:9, 4:3, 1:1, 9:16, 21:9, 3:2, 5:4, 16:10), visual dimension preview, megapixel calculation, and a 9-entry resolution reference table. Runs in the browser.",
  url: `${SITE_URL}/tools/aspect-ratio-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Aspect Ratio Calculator",
      item: `${SITE_URL}/tools/aspect-ratio-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an aspect ratio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An aspect ratio is the proportional relationship between a rectangle's width and height, expressed as two numbers separated by a colon — for example, 16:9 or 4:3. It describes the shape of the rectangle without specifying its size. A 16:9 display can be 1280×720, 1920×1080, or 3840×2160 — all are the same shape. Aspect ratios are used in display technology, photography, film production, graphic design, and video for consistent proportional framing regardless of actual resolution...",
      },
    },
    {
      "@type": "Question",
      name: "What is the 16:9 aspect ratio and why is it the standard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "16:9 (pronounced 'sixteen by nine') is the aspect ratio used by virtually all modern HD and 4K video content, displays, and monitors. It was adopted as the standard for HDTV in the late 1990s as a compromise between the 4:3 ratio of standard-definition television and the wider cinema ratios (2.35:1, 2.39:1) used in film. 16:9 provides a wider field of view than 4:3 while remaining practical for broadcast and streaming. It matches how human peripheral vision naturally extends horizontally...",
      },
    },
    {
      "@type": "Question",
      name: "How do I maintain aspect ratio when resizing an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To resize an image while maintaining its aspect ratio, use the Scale mode in this calculator: enter the original width and height, then set the percentage to scale to (50% = half size, 200% = double size). The calculator applies the same percentage to both dimensions, preserving the ratio exactly. In image editing software: in Photoshop, check the 'Constrain Proportions' or chain-link icon before entering a new dimension. In most software, holding Shift while dragging a resize handle constrains the ratio...",
      },
    },
    {
      "@type": "Question",
      name: "What aspect ratio should I use for social media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Different platforms use different optimal ratios. Instagram feed posts perform best at 4:5 (1080×1350px) as it takes up the most vertical space in the feed; square 1:1 (1080×1080px) also works well. Instagram Stories and Reels use 9:16 (1080×1920px). TikTok is 9:16 (1080×1920px). YouTube videos are 16:9 (1920×1080px); YouTube Shorts are 9:16. Twitter/X images display at various ratios — 16:9 and 2:1 work well in feed previews. LinkedIn posts use 1:1 or 1.91:1 (1200×628px) for shared links. Facebook feed posts are 1.91:1 for link previews and 1:1 or 4:5 for direct image posts...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Aspect Ratio Calculator",
  description:
    "Step-by-step guide to using the free Aspect Ratio Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Aspect Ratio Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Aspect Ratio Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function AspectRatioCalculatorPage() {
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
              href="/tools/category/calculators"
              className="hover:text-blue-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Aspect Ratio Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Aspect Ratio Calculator — Free Online Aspect Ratio &amp; Dimension
          Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Find the aspect ratio from any dimensions, calculate a missing width
          or height, or scale images proportionally — with common ratio presets
          and a resolution reference.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Aspect Ratio Calculator tool">
          <AspectRatioCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="aspect-ratio-calculator"
          toolName="Aspect Ratio Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
