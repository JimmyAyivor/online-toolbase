// src/app/tools/hex-color-code-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const HexColorCodeGeneratorClient = dynamic(
  () => import("./HexColorCodeGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "hex-color-code-generator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Hex Color Generator — HEX, RGB & HSL Values",
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
    title: "Free Hex Color Generator — HEX, RGB & HSL Values",
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
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Hex Color Generator — HEX, RGB & HSL Values",
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
      item: `${SITE_URL}/tools/category/image-design-tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Hex Color Code Generator",
      item: `${SITE_URL}/tools/hex-color-code-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a HEX colour code and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A HEX (hexadecimal) colour code is a six-character string preceded by a # symbol that represents a specific colour in the RGB colour model. The six characters are divided into three pairs: the first pair represents the Red channel (00–FF), the second pair represents the Green channel (00–FF), and the third pair represents the Blue channel (00–FF). Each pair is a hexadecimal number from 00 (0 in decimal, minimum intensity) to FF (255 in decimal, maximum intensity). For example, #FF0000 is pure red (red=255, green=0, blue=0), #00FF00 is pure green, and #0000FF is pure blue...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between HEX, RGB, and HSL colour formats?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEX, RGB, and HSL are three different ways to express the same colour. HEX (#RRGGBB) is a compact hexadecimal representation of RGB values — mostly used in HTML/CSS and design tools because it's short and easy to copy. RGB (Red, Green, Blue) expresses colour as three integer values from 0–255 — rgb(255, 99, 71) — or as a CSS function. It's intuitive for thinking about light mixing but not great for choosing colours intuitively since adjusting one channel affects perceived hue and brightness simultaneously...",
      },
    },
    {
      "@type": "Question",
      name: "When should I use HEX vs RGB vs HSL in CSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All three formats are valid in CSS and produce identical results — it's primarily a matter of workflow preference and readability. Use HEX (#RRGGBB) for static colour values in CSS or design tokens, especially when copying colours from design tools — it's compact and familiar. Use RGB / rgba() when you need to control opacity: rgba(255, 99, 71, 0.5) for 50% transparent tomato red. The 'a' (alpha) channel in rgba is only available with the function syntax, not HEX (though CSS now supports 8-digit HEX like #FF634780 for transparency)...",
      },
    },
    {
      "@type": "Question",
      name: "What is colour contrast and why does it matter for accessibility?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Colour contrast refers to the difference in luminance between two colours — typically text and its background. The Web Content Accessibility Guidelines (WCAG) define contrast ratios to ensure content is readable by people with low vision or colour blindness. WCAG 2.1 Level AA requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt bold). Level AAA requires 7:1 for normal text. A contrast ratio of 1:1 means no contrast (same colour); 21:1 is the maximum (black on white)...",
      },
    },
    {
      "@type": "Question",
      name: "What are CSS custom properties (variables) and how do I use colour codes in them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSS custom properties (also called CSS variables) allow you to store colour values (and other values) in reusable named variables, then reference them throughout your stylesheet. This makes it easy to maintain a consistent colour system and update colours globally by changing one value. Define custom properties in the :root selector: :root { --color-primary: #E63946; --color-secondary: #457B9D; }. Then use them anywhere in your CSS: button { background-color: var(--color-primary); }...",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert between HEX, RGB, and HSL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To convert HEX to RGB: take each pair of hex digits and convert from base-16 to base-10. For #FF6347: FF=255 (red), 63=99 (green), 47=71 (blue) → rgb(255, 99, 71). To convert RGB to HEX: convert each value from decimal to hexadecimal and pad to two digits. 255=FF, 99=63, 71=47 → #FF6347. To convert RGB to HSL: normalise each RGB value to 0–1, find the max and min values, then calculate Hue using the formula H = 60° × ((G-B)/(max-min)) for max=R; Saturation = (max-min) / (1-|2L-1|); Lightness = (max+min)/2...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Hex Color Code Generator",
  description:
    "Step-by-step guide to using the free Hex Color Code Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Hex Color Code Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Hex Color Code Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
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
              href="/tools/category/image-design-tools"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Hex Color Code Generator — Pick Any Colour, Get HEX, RGB &amp; HSL
          Values Free
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Pick any colour and instantly get the HEX code, RGB values, and HSL
          string — copy-ready for CSS, Figma, or any design tool.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
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
