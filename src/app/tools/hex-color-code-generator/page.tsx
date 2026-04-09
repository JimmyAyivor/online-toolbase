// src/app/tools/hex-color-code-generator/page.tsx
import type { Metadata } from "next";
import HexColorCodeGeneratorClient from "./HexColorCodeGeneratorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title:
    "Hex Color Code Generator — Pick Any Colour, Get HEX, RGB & HSL Values Free",
  description:
    "Pick any colour with the visual colour picker and instantly get the HEX code, RGB values, HSL values, and CSS-ready colour strings. Includes a random colour generator and saved colour history. Free, no signup.",
  keywords:
    "hex color code, hex colour picker, color code generator, RGB to HEX, HSL color, CSS color code, pick color online, hex color picker, color converter, free color tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/hex-color-code-generator` },
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
    url: `${SITE_URL}/tools/hex-color-code-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Hex Color Code Generator — Pick Any Colour, Get HEX, RGB & HSL Values Free",
    description:
      "Visual colour picker that instantly shows HEX, RGB, and HSL codes for any colour — copy with one click. Random colour generator included. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Hex Color Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Hex Color Code Generator — Pick Any Colour, Get HEX, RGB & HSL Values Free",
    description:
      "Pick any colour and instantly get HEX, RGB, and HSL codes ready to paste into CSS or design tools.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hex Color Code Generator",
  description:
    "Visual colour picker that generates HEX, RGB, and HSL colour codes for any selected colour. Includes a random colour generator button, one-click copy for each format, and a saved colour history panel. Useful for web design, CSS, and digital design workflows.",
  url: `${SITE_URL}/tools/hex-color-code-generator`,
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
      name: "Design Tools",
      item: `${SITE_URL}/tools/category/design`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Hex Color Code Generator",
      item: `${SITE_URL}/tools/hex-color-code-generator`,
    },
  ],
};

export default function HexColorCodeGeneratorPage() {
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
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-pink-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/design"
              className="hover:text-pink-600 transition-colors"
            >
              Design Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Hex Color Code Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
          Free Design Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">
          Hex Color Code Generator — Pick Any Colour, Get HEX, RGB &amp; HSL
          Values Free
        </h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          Pick any colour and instantly get the HEX code, RGB values, and HSL
          string — copy-ready for CSS, Figma, or any design tool.
        </p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Hex Color Code Generator tool">
          <HexColorCodeGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="hex-color-code-generator"
          toolName="Hex Color Code Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
