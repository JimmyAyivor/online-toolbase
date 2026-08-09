// src/app/tools/paraphrasing-tool/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const ParaphrasingToolClient = dynamic(
  () => import("./ParaphrasingToolClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "paraphrasing-tool");

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Paraphrasing Tool — Rewrite Text in 6 Styles, Free & Instant",
  description:
    "Rewrite any text in Standard, Fluent, Formal, Simple, Creative, or Expand mode. Synonym replacement, sentence restructuring, copy and download. Free, instant, no signup.",
  keywords:
    "paraphrasing tool, paraphrase text online, rewrite text free, rephrase tool, synonym replacer, text rewriter, paraphrase generator, reword tool, free paraphrasing tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/paraphrasing-tool` },
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
    url: `${SITE_URL}/tools/paraphrasing-tool`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Paraphrasing Tool — Rewrite Text in 6 Styles, Free & Instant",
    description:
      "Rewrite any text in Standard, Fluent, Formal, Simple, Creative, or Expand mode. Synonym replacement and sentence restructuring. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Paraphrasing Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Paraphrasing Tool — Rewrite Text in 6 Styles, Free & Instant",
    description:
      "Rewrite any text in 6 modes — Standard, Fluent, Formal, Simple, Creative, Expand. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Paraphrasing Tool",
  description:
    "Rewrite any text in different words using 6 modes: Standard, Fluent, Formal, Simple, Creative, and Expand. Includes synonym replacement, sentence restructuring, copy, and download.",
  url: `${SITE_URL}/tools/paraphrasing-tool`,
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
      name: "Paraphrasing Tool",
      item: `${SITE_URL}/tools/paraphrasing-tool`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is paraphrasing and how is it different from summarising?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paraphrasing means rewriting a passage in different words while keeping roughly the same length and preserving all the original ideas. The output expresses the same meaning using different vocabulary, sentence structure, and phrasing. Summarising, by contrast, condenses a longer piece into a shorter one — capturing only the most important points and discarding detail. A paraphrase of a 200-word paragraph is roughly 200 words long; a summary of the same paragraph might be 40–60 words...",
      },
    },
    {
      "@type": "Question",
      name: "What do the six paraphrasing modes do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard mode performs balanced synonym replacement and light sentence restructuring — the most general-purpose option for most use cases. Fluent mode prioritises natural-sounding output, favouring readable flow over strict structural changes. Formal mode expands contractions (don't → do not, won't → will not, can't → cannot) and substitutes formal vocabulary, making it suitable for professional documents, academic writing, and business communication...",
      },
    },
    {
      "@type": "Question",
      name: "Is paraphrasing plagiarism?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paraphrasing is not plagiarism if it is done correctly and with attribution. The key distinction is: a plagiarist copies ideas without acknowledgement; a writer who paraphrases restates ideas in their own words and cites the original source. In academic and journalistic contexts, paraphrasing with attribution is a standard and required practice — it is how you incorporate others' research and arguments without reproducing their exact wording...",
      },
    },
    {
      "@type": "Question",
      name: "When should I choose Formal vs Simple mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose Formal mode when the output is intended for an audience that expects professional, authoritative language — such as business reports, academic essays, cover letters, legal correspondence, technical documentation, and formal presentations. Formal mode expands contractions and promotes elevated vocabulary, which signals professionalism and precision...",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the paraphrasing output? Do I need to edit it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — you should always review and edit paraphrasing tool output before using it. This tool performs rule-based synonym substitution and sentence restructuring, which produces useful first drafts but can occasionally result in awkward phrasing, inappropriate synonym choices, or sentences that lose subtle nuances of the original. The tool is best used as a starting point or inspiration generator — it handles the mechanical work of vocabulary variation so you can focus editorial attention on coherence and tone...",
      },
    },
    {
      "@type": "Question",
      name: "Can I paraphrase content in a different language?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool operates on English text only. The synonym vocabulary and mode-specific logic (contraction expansion in Formal mode, vocabulary simplification in Simple mode) are all calibrated for English grammar and usage patterns. Pasting text in other languages will produce unpredictable results because the synonym substitution and sentence restructuring rules do not account for the grammar, word order, or conjugation of other languages. For non-English paraphrasing, a language-specific tool or a multilingual AI writing assistant would be more appropriate.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Paraphrasing Tool",
  description:
    "Step-by-step guide to using the free Paraphrasing Tool on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Paraphrasing Tool on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Paraphrasing Tool provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function ParaphrasingToolPage() {
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
              href="/tools/category/writing-text-tools"
              className="hover:text-violet-600 transition-colors"
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Paraphrasing Tool
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Paraphrasing Tool — Rewrite Text in 6 Styles, Free & Instant
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Rewrite any text in 6 modes — Standard, Fluent, Formal, Simple,
          Creative, or Expand. Synonym replacement, sentence restructuring, copy
          and download.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Paraphrasing Tool">
          <ParaphrasingToolClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="paraphrasing-tool"
          toolName="Paraphrasing Tool"
        />
      </SidebarAdLayout>
    </>
  );
}
