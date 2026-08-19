// src/app/tools/text-summarizer/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "text-summarizer");
const TextSummarizerClient = dynamic(() => import("./TextSummarizerClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Text Summarizer — Condense Any Text Instantly",
  description:
    "Summarize long articles, essays, and documents into concise key points. Extractive summarisation with adjustable length ratio — runs entirely in your browser, no signup.",
  keywords:
    "text summarizer, summarize text online, article summarizer, auto summarizer, text condensing tool, extractive summarizer, free text summarizer, summarize paragraph online",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-summarizer` },
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
    url: `${SITE_URL}/tools/text-summarizer`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Text Summarizer — Condense Any Text Instantly",
    description:
      "Extractive text summarisation with adjustable length ratio. Paste any article or document and get a concise summary instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text Summarizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Text Summarizer — Condense Any Text Instantly",
    description:
      "Extractive text summariser with adjustable length ratio. Free, instant, runs in your browser.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Summarizer",
  description:
    "Summarize long articles, essays, and documents into concise key points using extractive summarisation with an adjustable length ratio.",
  url: `${SITE_URL}/tools/text-summarizer`,
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
      name: "Writing Tools",
      item: `${SITE_URL}/tools/category/writing`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Text Summarizer",
      item: `${SITE_URL}/tools/text-summarizer`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does extractive text summarisation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Extractive summarisation works by scoring each sentence in the original text based on the importance of the words it contains, then selecting the highest-scoring sentences to form the summary. This tool scores sentences using term frequency: it counts how often each non-trivial word appears across the full document (ignoring common stop words like 'the', 'and', 'is'), then scores each sentence by the average frequency of its words. The top-scoring sentences — up to the number set by your length ratio — are extracted and re-ordered to match their original sequence in the document...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between extractive and abstractive summarisation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Extractive summarisation (what this tool does) selects and stitches together the most important sentences from the original text without changing the wording. The summary is a subset of the original. Abstractive summarisation generates new sentences that paraphrase and condense the original ideas — similar to how a human would write a summary from scratch. Abstractive summaries can be more fluent and concise, but require advanced natural language generation models (such as transformer-based AI) to produce reliably...",
      },
    },
    {
      "@type": "Question",
      name: "What does the Summary Length percentage control?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Summary Length slider (10%–70%) controls what fraction of the original sentences are included in the summary. At 30% (the default), the tool keeps roughly the top 30% of sentences by word-importance score. At 10%, you get a very tight summary — only the most content-dense sentences. At 70%, the summary is nearly as long as the original but with the least-relevant sentences removed. The tool enforces a minimum of 2 sentences regardless of the ratio, so very short texts will always produce at least a 2-sentence output...",
      },
    },
    {
      "@type": "Question",
      name: "What types of text work best with this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool works best with well-structured factual prose — news articles, academic papers, research reports, business documents, encyclopaedia entries, and technical documentation. These text types have clear sentences where each one carries identifiable information density, making frequency-based sentence scoring reliable...",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool store or share my text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All processing runs entirely in your browser using JavaScript. Your text is never sent to a server, stored in a database, or shared with any third party. The moment you close or refresh the page, the text is gone. This makes the tool suitable for summarising documents that contain personal, confidential, or commercially sensitive information — since the content never leaves your device. The only external resource loaded when you use this page is standard advertising (AdSense), which does not receive your document content.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my summary sometimes seem to miss the main point?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Frequency-based extractive summarisation ranks sentences by how often their words appear across the full document. This works well when the key topic is mentioned repeatedly — a common pattern in informational and journalistic text...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Text Summarizer",
  description:
    "Step-by-step guide to using the free Text Summarizer on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Text Summarizer on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Text Summarizer provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function TextSummarizerPage() {
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
              Writing Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Text Summarizer
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Text Summarizer — Condense Any Text to Key Points, Free & Instant
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Paste any article, essay, or document and get a concise extractive
          summary instantly. Adjustable length ratio, copy with one click.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Text Summarizer tool">
          <TextSummarizerClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="text-summarizer" toolName="Text Summarizer" />
      </SidebarAdLayout>
    </>
  );
}
