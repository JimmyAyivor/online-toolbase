// src/app/tools/color-contrast-checker/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic"; 
import { tools } from "@/lib/tools";
const ColorContrastCheckerClient = dynamic(
  () => import("./ColorContrastCheckerClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "color-contrast-checker");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Free Color Contrast Checker — WCAG AA & AAA Tool",
  description:
    "Check color contrast ratios for WCAG AA and AAA accessibility compliance. Test text and background color pairs instantly. Free, no signup.",
  keywords:
    "color contrast checker, WCAG contrast ratio, accessibility contrast, AA contrast ratio, AAA contrast ratio, text background contrast, color accessibility checker",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/color-contrast-checker` },
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
    url: `${SITE_URL}/tools/color-contrast-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Color Contrast Checker — WCAG AA & AAA Tool",
    description:
      "Test text/background color pairs against WCAG AA and AAA contrast ratio standards instantly.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Color Contrast Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Color Contrast Checker — WCAG AA & AAA Tool",
    description:
      "Check WCAG color contrast ratios for web accessibility. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Color Contrast Checker",
  description:
    "Check color contrast ratios for WCAG AA and AAA accessibility compliance.",
  url: `${SITE_URL}/tools/color-contrast-checker`,
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
      item: `${SITE_URL}/tools/category/design`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Color Contrast Checker",
      item: `${SITE_URL}/tools/color-contrast-checker`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is WCAG and why does contrast ratio matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WCAG (Web Content Accessibility Guidelines) is the international standard for web accessibility, published by the W3C. Contrast ratio measures the luminance difference between foreground (text) and background colors. Low contrast makes text difficult or impossible to read for users with low vision, colour blindness, or in high-glare environments. WCAG AA compliance (4.5:1 for normal text) is legally required in many jurisdictions under accessibility laws such as the ADA (US), EN 301 549 (EU), and the Equality Act (UK).",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between WCAG AA and AAA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WCAG AA is the minimum legal standard for most contexts: 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt+ bold). WCAG AAA is the enhanced level: 7:1 for normal text and 4.5:1 for large text. WCAG AAA is recommended for high-priority content such as body text in health, legal, or financial applications, but achieving AAA for all colors simultaneously is extremely difficult. Most teams target AA as the baseline with AAA for critical text.",
      },
    },
    {
      "@type": "Question",
      name: "Does contrast ratio apply to images and icons?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — WCAG 1.4.11 (Non-text Contrast) requires a minimum 3:1 contrast ratio for UI components like buttons, input borders, and icons against adjacent colors. This is distinct from the 4.5:1 text contrast requirement. Icons that convey meaning (not just decorative) must meet the 3:1 UI component requirement. Images used as text must meet the full text contrast requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a light gray text on a white background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Light gray on white is one of the most common accessibility failures in modern web design. For example, #999999 on #FFFFFF has a contrast ratio of only 2.85:1 — failing WCAG AA. The lightest gray that passes AA for normal text on white is approximately #767676 (4.54:1). Use this checker to verify before using any light gray in your design.",
      },
    },
    {
      "@type": "Question",
      name: "Is dark mode automatically more accessible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not automatically — dark mode shifts the contrast equation rather than solving it. Light text on dark backgrounds can fail just as easily as dark text on light backgrounds if the colors are not properly chosen. White (#FFFFFF) on true black (#000000) has a 21:1 ratio (maximum), but many dark mode palettes use off-blacks and off-whites that can drop below 4.5:1. Always check both light and dark mode color pairs with this tool.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Color Contrast Checker",
  description: "Step-by-step guide to using the free Color Contrast Checker on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Color Contrast Checker on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Color Contrast Checker provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function ColorContrastCheckerPage() {
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
              href="/tools/category/design"
              className="hover:text-violet-600 transition-colors"
            >
              Design Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Color Contrast Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Design Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Color Contrast Checker — WCAG AA & AAA Accessibility Ratio Tool
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Check text and background color pairs for WCAG AA and AAA contrast
          ratio compliance — see pass/fail for normal text, large text, and UI
          components.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Color Contrast Checker tool">
          <ColorContrastCheckerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="color-contrast-checker"
          toolName="Color Contrast Checker"
        />
      </SidebarAdLayout>
    </>
  );
}
