// src/app/tools/flip-text-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const FlipTextGeneratorClient = dynamic(
  () => import("./FlipTextGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "flip-text-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Flip Text Generator — Upside Down & Reversed Text",
  description:
    "Flip text upside down, reverse it, or mirror it. Great for social media, messages, and creative formatting. Free, instant.",
  keywords:
    "flip text, upside down text generator, reverse text, mirror text, flipped text generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/flip-text-generator` },
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
    url: `${SITE_URL}/tools/flip-text-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Flip Text Generator — Upside Down & Reversed Text",
    description:
      "Flip text upside down, reverse it, or mirror it. Great for social media, messages, and creative formatting. Free, instant.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Flip Text Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Flip Text Generator — Upside Down & Reversed Text",
    description:
      "Flip text upside down, reverse it, or mirror it. Great for social media, messages, and creative formatting. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Flip Text Generator",
  description:
    "Flip text upside down, reverse it, or mirror it. Great for social media, messages, and creative formatting. Free, instant.",
  url: `${SITE_URL}/tools/flip-text-generator`,
  applicationCategory: "UtilitiesApplication",
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Flip Text Generator",
      item: `${SITE_URL}/tools/flip-text-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does upside-down text work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upside-down text uses special Unicode characters that visually resemble standard Latin letters but are actually different code points — typically from the IPA (International Phonetic Alphabet) and other Unicode blocks. For example, the upside-down 'a' is the Unicode character ɐ (U+0250), not a rotated version of the letter a. When the text is reversed left-to-right and each letter replaced with its upside-down Unicode equivalent, the result reads correctly when physically rotated 180 degrees. Not all letters have exact Unicode equivalents, so some characters are approximations.",
      },
    },
    {
      "@type": "Question",
      name: "Does flipped text work on all social media platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flipped text works on any platform that renders standard Unicode — which includes Twitter/X, Instagram, Facebook, WhatsApp, TikTok, Discord, Reddit, and most other major platforms. It is rendered as plain text, so no special formatting is needed. Some very old or limited platforms may show placeholder characters for unusual Unicode code points, but this is rare on modern platforms.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use flipped text in usernames?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most platforms allow Unicode characters in display names (but often not usernames/handles). Instagram, Twitter, TikTok, and Discord allow Unicode in display names, so flipped or stylised text works there. Platform URL-based usernames (like @username) are typically restricted to ASCII characters. Always test on your specific platform before committing to a flipped name.",
      },
    },
    {
      "@type": "Question",
      name: "What is the strikethrough text effect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Strikethrough text uses the Unicode combining character U+0336 (COMBINING LONG STROKE OVERLAY), which overlays a horizontal line through each character. It works on any platform that renders combining Unicode characters — most modern platforms support this. Unlike HTML strikethrough tags, this method works in plain text fields, social media posts, and messaging apps.",
      },
    },
    {
      "@type": "Question",
      name: "What does the bold text option produce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The bold text option converts standard Latin letters to their Unicode Mathematical Bold equivalents — characters in the Mathematical Alphanumeric Symbols Unicode block (U+1D400 onwards). These look bold but are technically different characters, which means they render in bold appearance wherever Unicode is rendered, regardless of whether the platform supports bold formatting. This is why bold text in social media bios and posts works even where markdown formatting is not supported.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Flip Text Generator",
  description:
    "Step-by-step guide to using the free Flip Text Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Flip Text Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Flip Text Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function FlipTextGeneratorPage() {
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
            <a href="/" className="hover:text-purple-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/writing-text-tools"
              className="hover:text-purple-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Flip Text Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-1">
          Free Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Flip Text Generator — Upside Down & Reversed Text
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Flip Text Generator tool">
          <FlipTextGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="flip-text-generator"
          toolName="Flip Text Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
