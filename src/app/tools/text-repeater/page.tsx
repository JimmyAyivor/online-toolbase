// src/app/tools/text-repeater/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "text-repeater");
const TextRepeaterClient = dynamic(() => import("./TextRepeaterClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Text Repeater — Free Online Text Repeater",
  description:
    "Repeat any text or phrase multiple times with a custom separator. Choose new line, space, comma, pipe, or your own separator. Free, instant, no signup required.",
  keywords:
    "text repeater, repeat text online, duplicate text tool, text duplicator, repeat words online, text multiplier, free text repeater, online text repeater",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-repeater` },
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
    url: `${SITE_URL}/tools/text-repeater`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Text Repeater — Free Online Text Repeater",
    description:
      "Repeat any text multiple times with custom separators. Newline, comma, pipe, or your own. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text Repeater",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Text Repeater — Free Online Text Repeater",
    description:
      "Repeat any text multiple times with custom separators. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Repeater",
  description: "Repeat any text multiple times with customizable separators.",
  url: `${SITE_URL}/tools/text-repeater`,
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Text Repeater",
      item: `${SITE_URL}/tools/text-repeater`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many times can I repeat text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool supports up to 1,000 repetitions. Use the slider for quick adjustments or type an exact number into the count field. The copy button always captures the full output regardless of how long it is.",
      },
    },
    {
      "@type": "Question",
      name: "What separators are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can choose from five built-in separators: New line (each repetition on its own line), Space (repetitions separated by a single space), Comma (comma and space), Pipe (space | space), or Custom (any character, emoji, or string you type). The Custom option gives you complete flexibility.",
      },
    },
    {
      "@type": "Question",
      name: "Will the tool copy the full output even if it is truncated on screen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The display truncates very long outputs at 2,000 characters for performance, but the Copy button always copies the complete, untruncated result to your clipboard.",
      },
    },
    {
      "@type": "Question",
      name: "Can I repeat multi-line text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can paste multiple lines of text into the input field and the entire block will be repeated as a unit, with your chosen separator placed between each repetition.",
      },
    },
    {
      "@type": "Question",
      name: "What are some practical uses for repeated text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common uses include: generating test data for forms and databases, creating placeholder content for design mockups, building practice typing exercises, producing repeated list entries for templates, and creating separator lines made from repeated characters.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Text Repeater",
  description:
    "Step-by-step guide to using the free Text Repeater on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Text Repeater on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Text Repeater provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function TextRepeaterPage() {
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
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/writing-text-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Text Repeater
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Text Repeater — Free Online Text Repeater
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Repeat any text or phrase multiple times with a custom separator.
          Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Text Repeater tool">
          <TextRepeaterClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="text-repeater" toolName="Text Repeater" />
      </SidebarAdLayout>
    </>
  );
}
