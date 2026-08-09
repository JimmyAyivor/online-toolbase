// src/app/tools/grammar-spell-checker/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const GrammarSpellCheckerClient = dynamic(
  () => import("./GrammarSpellCheckerClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "grammar-spell-checker");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Grammar & Spell Checker — Free Online Grammar Checker",
  description:
    "Automatically correct grammar, spelling, punctuation, and style errors in your writing. Get a writing score and corrected text instantly. Free, no signup.",
  keywords:
    "grammar checker, spell checker, free grammar checker, online grammar checker, grammar and spell checker, spelling checker, writing checker, grammar correction tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/grammar-spell-checker` },
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
    url: `${SITE_URL}/tools/grammar-spell-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Grammar & Spell Checker — Free Online Grammar Checker",
    description:
      "Automatically correct grammar, spelling, punctuation, and style errors. Get a writing score and corrected text instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Grammar & Spell Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Grammar & Spell Checker — Free Online Grammar Checker",
    description:
      "Automatically correct grammar, spelling, punctuation, and style errors. Free, instant, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Grammar & Spell Checker",
  description:
    "Automatically correct grammar, spelling, punctuation, and style errors in your writing.",
  url: `${SITE_URL}/tools/grammar-spell-checker`,
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
      name: "Grammar & Spell Checker",
      item: `${SITE_URL}/tools/grammar-spell-checker`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of errors does the grammar checker find?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool identifies four categories of writing issues. Grammar errors include subject-verb disagreement, incorrect tense usage, misplaced modifiers, sentence fragments, and run-on sentences. Spelling errors catch misspelled words, homophones used incorrectly (their/there/they're, your/you're), and typos. Punctuation issues cover missing or misplaced commas, incorrect apostrophe usage, missing full stops, and overuse of exclamation marks. Style suggestions flag passive voice, wordiness, repetitive vocabulary, and overly long or complex sentences.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the AI grammar checker compared to tools like Grammarly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool uses the same underlying Claude AI model that powers many professional writing tools, so accuracy is generally high for common grammar and spelling errors. For standard writing — emails, essays, articles, reports — it will catch the vast majority of errors. Grammarly and similar tools have advantages in real-time checking, browser integration, and large proprietary training datasets built specifically for grammar detection...",
      },
    },
    {
      "@type": "Question",
      name: "What does the writing score mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The writing score (0–100) reflects the overall quality of your text based on the number and severity of errors found relative to the length of the text. A score of 90–100 indicates excellent writing with minimal or no errors. 70–89 indicates good writing with a few correctable issues — typical of first-draft professional writing. Below 70 indicates significant issues that should be addressed before the text is published or submitted. The score is a relative guide, not an absolute standard — a highly technical document may score lower than a simple email even if both are well-written.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for academic essays and assignments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the grammar checker is well-suited for academic writing. It identifies the types of errors most commonly flagged by academic markers: subject-verb disagreement, incorrect tense, comma splices, apostrophe errors, and unclear sentence structure. However, a few caveats apply: the tool does not check citation formatting (APA, MLA, Chicago), does not verify factual accuracy, and its style suggestions reflect general professional writing rather than the specific conventions of every academic discipline. Always apply your own judgement and review corrections in context before accepting them.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text kept private when I use this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your text is sent to the Anthropic Claude API for analysis and a corrected response is returned. The text passes through the API's infrastructure during processing. It is not stored on this website's servers. If your text contains sensitive personal information, confidential business content, or unpublished creative work you want to protect, consider using a local grammar tool instead. For everyday writing — emails, blog posts, student essays, and general content — the privacy trade-off is comparable to any other AI-powered writing assistant.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the corrected text sometimes change meaning slightly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI grammar correction can occasionally make changes that alter nuance, especially when the original phrasing is unconventional but intentional — for example, sentence fragments used for stylistic effect, deliberate repetition for emphasis, or dialect-specific expressions. Always read the corrected text carefully before using it. Accept corrections that fix clear errors, but override suggestions that change your intended meaning or voice. The tool is an assistant, not an authority — you always have final editorial control.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Grammar & Spell Checker",
  description:
    "Step-by-step guide to using the free Grammar & Spell Checker on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Grammar & Spell Checker on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Grammar & Spell Checker provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function GrammarSpellCheckerPage() {
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
            <a href="/" className="hover:text-green-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/writing-text-tools"
              className="hover:text-green-600 transition-colors"
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Grammar &amp; Spell Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Grammar &amp; Spell Checker — Free Online Grammar Checker
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Correct grammar, spelling, punctuation, and style errors instantly.
          Get a writing score and a fully corrected version of your text.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Grammar and Spell Checker tool">
          <GrammarSpellCheckerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="grammar-spell-checker"
          toolName="Grammar & Spell Checker"
        />
      </SidebarAdLayout>
    </>
  );
}
