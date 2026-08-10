// src/app/tools/color-code-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const ColorCodeConverterClient = dynamic(
  () => import("./ColorCodeConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "color-code-converter");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Color Code Converter — HEX, RGB, HSL & HSB Conversion Tool",
  description:
    "Convert color codes between HEX, RGB, HSL, and HSB formats instantly. Pick any color visually, copy values with one click. Free, no signup required.",
  keywords:
    "color code converter, hex to rgb, rgb to hex, hex to hsl, color converter, color picker, css color converter, hex rgb hsl hsb converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/color-code-converter` },
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
    url: `${SITE_URL}/tools/color-code-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Color Code Converter — HEX, RGB, HSL & HSB",
    description:
      "Instantly convert colors between HEX, RGB, HSL, and HSB. Visual picker + one-click copy.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Color Code Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Color Code Converter — HEX, RGB, HSL & HSB",
    description:
      "Convert between HEX, RGB, HSL, and HSB color formats. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Color Code Converter",
  description:
    "Convert color codes between HEX, RGB, HSL, and HSB formats with a visual color picker.",
  url: `${SITE_URL}/tools/color-code-converter`,
  applicationCategory: "DesignApplication",
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
      item: `${SITE_URL}/tools/category/image-design-tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Color Code Converter",
      item: `${SITE_URL}/tools/color-code-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between HEX and RGB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEX and RGB represent exactly the same color information but in different notations. RGB expresses each of the three color channels (Red, Green, Blue) as a decimal number from 0–255. HEX expresses each channel as a two-digit hexadecimal number from 00–FF. For example, rgb(99, 102, 241) and #6366F1 are identical — HEX is just a compact form preferred in HTML/CSS, while RGB is common in design software and CSS color functions.",
      },
    },
    {
      "@type": "Question",
      name: "What is HSL and when should I use it in CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HSL stands for Hue (0–360°), Saturation (0–100%), and Lightness (0–100%). It is the most intuitive format for designing because you can adjust brightness and saturation independently. In CSS, hsl() is preferable when you need to create color variations — for example, a button hover state is simply `hsl(240, 90%, 50%)` becoming `hsl(240, 90%, 40%)` (10 lightness units darker). Modern CSS also supports hsl() natively in all browsers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between HSL and HSB/HSV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HSL (Hue, Saturation, Lightness) and HSB/HSV (Hue, Saturation, Brightness/Value) both use the same Hue scale but define the other two axes differently. In HSL, pure white is L=100% regardless of saturation; in HSB, pure white is S=0%, B=100%. HSB is the format used in Photoshop, Figma, Sketch, and most design application colour pickers. HSL is the format supported natively in CSS. The converter outputs both so you can copy the appropriate one for your context.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert a color from Figma to CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Figma's color picker uses HSB (called HSB or HSV in the UI). To use it in CSS: pick the color in Figma, read the HEX value at the bottom of the colour panel (easiest), paste it into this converter, and copy the hsl() or rgb() value for your CSS. Alternatively, Figma's Inspect panel shows CSS-ready color values — but this converter is faster when working outside of Figma or for batch color work.",
      },
    },
    {
      "@type": "Question",
      name: "Does color format affect performance in CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — HEX, RGB, and HSL render identically at runtime. Browsers parse all three formats to the same internal representation. Choose the format that is most maintainable for your project: HEX for conciseness, HSL for design systems where you need programmatic lightness/saturation tweaks, and CSS custom properties (variables) for all approaches in larger projects.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Color Code Converter",
  description:
    "Step-by-step guide to using the free Color Code Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Color Code Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Color Code Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function ColorCodeConverterPage() {
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
              Color Code Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
          Free Design Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Color Code Converter — HEX, RGB, HSL & HSB Conversion Tool
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert any color between HEX, RGB, HSL, and HSB formats with a live
          preview and one-click copy for CSS, design tools, and code.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Color Code Converter tool">
          <ColorCodeConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="color-code-converter"
          toolName="Color Code Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
