// src/app/tools/word-character-counter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "word-character-counter");
const WordCharacterCounterClient = dynamic(
  () => import("./WordCharacterCounterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Word & Character Counter — Live Count Online",
  description:
    "Count words, characters (with and without spaces), sentences, paragraphs, and get reading and speaking time estimates. Real-time, free, no signup.",
  keywords:
    "word counter, character counter, word and character counter, reading time calculator, speaking time calculator, sentence counter, paragraph counter, word count tool, free word counter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/word-character-counter` },
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
    url: `${SITE_URL}/tools/word-character-counter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Word & Character Counter — Live Count Online",
    description:
      "Count words, characters, sentences, and paragraphs. Get reading and speaking time estimates. Real-time, free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Word & Character Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Word & Character Counter — Live Count Online",
    description:
      "Count words, characters, sentences, and paragraphs. Reading and speaking time estimates. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word & Character Counter",
  description:
    "Count words, characters, sentences, and paragraphs with reading and speaking time estimates.",
  url: `${SITE_URL}/tools/word-character-counter`,
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
      name: "Text Tools",
      item: `${SITE_URL}/tools/category/text`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Word & Character Counter",
      item: `${SITE_URL}/tools/word-character-counter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How are words counted — does punctuation affect the count?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool counts words by splitting your text on whitespace — spaces, tabs, and newlines. Punctuation attached to a word (commas, full stops, hyphens, apostrophes) is treated as part of that word token and does not create extra word counts. So 'it's', 'end.' and 'well-designed' each count as one word. Hyphenated compound words like 'state-of-the-art' count as one word — if you prefer them counted separately, replace hyphens with spaces before pasting. Leading and trailing whitespace is trimmed before counting, so extra blank lines do not inflate the word count.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between 'characters' and 'characters (no spaces)'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Characters is the total number of character positions in your text, including every letter, number, punctuation mark, and space. Characters (no spaces) strips all whitespace before counting — only actual content characters are counted. Most social media platforms that impose character limits — Twitter/X, LinkedIn, Instagram captions — use the total character count including spaces. Some character-limited platforms like certain SMS services or meta descriptions count without spaces. Always check the specific platform's counting method...",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are the reading and speaking time estimates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reading time is calculated at 200 words per minute, which is widely cited as the average adult silent reading speed for non-technical general content. Academic research on reading rates typically finds adults read between 175 and 300 wpm depending on text complexity, familiarity, and individual ability. Speaking time uses 150 wpm, typical for a deliberate, clear presentation or lecture pace — conversational speech is faster (160–180 wpm) while careful public speaking is often slower (120–140 wpm). For a precise reading or speaking time, do a timed test of your first paragraph and extrapolate.",
      },
    },
    {
      "@type": "Question",
      name: "Why do my sentence counts seem off?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The sentence counter splits on full stops, exclamation marks, and question marks. This works well for most prose but can produce unexpected results in some situations: abbreviations with full stops (e.g. 'Dr.', 'U.S.', 'etc.') are counted as sentence endings; decimal numbers (3.14) may be counted as a sentence boundary; and ellipses (...) count as three sentence endings if each dot triggers a split. If you need a highly accurate sentence count, review the result manually for texts that contain many abbreviations or numerical data.",
      },
    },
    {
      "@type": "Question",
      name: "How are paragraphs counted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paragraphs are counted by splitting your text on double newlines (blank lines between blocks of text), which is the standard paragraph separator in plain text. If you're pasting from a word processor where paragraphs are separated by a single newline, the tool may count all your text as one paragraph. In that case, replace single line breaks between paragraphs with double line breaks (one blank line between each paragraph) before pasting. Single-line breaks within a paragraph — such as in poetry or bullet points — do not start a new paragraph count.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this as a text editor and save my work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The textarea functions as a basic plain-text editor — you can type, paste, and edit freely. Use the Copy button to copy your text to the clipboard and paste it into another application, or click Download to save the current content as a .txt file. Saved files are plain text only — there's no formatting, font information, or document metadata. The tool does not auto-save: if you navigate away or close the tab, your text is lost. For longer editing sessions, periodically download your work as a backup.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Word & Character Counter",
  description:
    "Step-by-step guide to using the free Word & Character Counter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Word & Character Counter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Word & Character Counter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function WordCharacterCounterPage() {
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
              Word &amp; Character Counter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Real-Time Counting
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Word &amp; Character Counter — Free Online Word Counter with Reading
          Time
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Count words, characters, sentences, and paragraphs in real time.
          Includes reading and speaking time estimates. No account needed.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Word and Character Counter tool">
          <WordCharacterCounterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="word-character-counter"
          toolName="Word & Character Counter"
        />
      </SidebarAdLayout>
    </>
  );
}
