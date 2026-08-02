// src/app/tools/word-counter-live/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "word-counter-live");
const WordCounterLiveClient = dynamic(
  () => import("./WordCounterLiveClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Word Counter Live — Free Online Word Counter",
  description:
    "Count words, characters, sentences, and paragraphs in real time. Get reading time, speaking time, unique word count, and top word frequency. Free, instant, no signup required.",
  keywords:
    "word counter, word count tool, character counter, live word counter, reading time calculator, online word counter, word frequency counter, free word counter, free online word counter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/word-counter-live` },
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
    url: `${SITE_URL}/tools/word-counter-live`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Word Counter Live — Free Online Word Counter",
    description:
      "Real-time word counter with character count, reading time, speaking time, and top word frequency. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Word Counter Live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Word Counter Live — Free Online Word Counter",
    description:
      "Real-time word count with reading time, speaking time, and word frequency. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word Counter Live",
  description:
    "Real-time word counter with character count, reading time, speaking time, and word frequency analysis.",
  url: `${SITE_URL}/tools/word-counter-live`,
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
      name: "Word Counter Live",
      item: `${SITE_URL}/tools/word-counter-live`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is reading time calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reading time is estimated using the average adult silent reading speed of 238 words per minute, as established by multiple academic studies. The result is rounded up to the nearest second, so even a single word shows as 1 second.",
      },
    },
    {
      "@type": "Question",
      name: "How is speaking time calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Speaking time uses 130 words per minute — the average comfortable speaking pace for presentations and public speaking. This is slower than reading speed because spoken delivery includes natural pauses, emphasis, and breathing.",
      },
    },
    {
      "@type": "Question",
      name: "What does the word target feature do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter a word count target in the field above the text area to see a progress bar and percentage. The bar turns green when you reach 100% of your target. This is useful for essays, articles, or any writing with a minimum or maximum word count.",
      },
    },
    {
      "@type": "Question",
      name: "What words are excluded from the word frequency list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common English stop words (the, a, an, and, or, but, in, on, at, to, for, of, with, is, are, was, were, it, I, you, he, she, we, they, etc.) are automatically filtered out. This leaves only the meaningful, content-bearing words in your text.",
      },
    },
    {
      "@type": "Question",
      name: "Does it count characters with or without spaces?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. The tool shows total characters (including spaces) and characters without spaces as separate statistics, so you can use whichever metric your target platform requires — for example, Twitter counts all characters including spaces.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Word Counter Live",
  description: "Step-by-step guide to using the free Word Counter Live on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Word Counter Live on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Word Counter Live provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function WordCounterLivePage() {
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
              href="/tools/category/text"
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
              Word Counter Live
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Word Counter Live — Free Online Word Counter
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Real-time word and character count with reading time, speaking time,
          and word frequency analysis. Free, no account needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Word Counter Live tool">
          <WordCounterLiveClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="word-counter-live" toolName="Word Counter" />
      </SidebarAdLayout>
    </>
  );
}
