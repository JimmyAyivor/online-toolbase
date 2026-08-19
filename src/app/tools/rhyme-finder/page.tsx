// src/app/tools/rhyme-finder/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "rhyme-finder");
const RhymeFinderClient = dynamic(() => import("./RhymeFinderClient"), {
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
  title: "Free Rhyme Finder — Rhyming Words for Poetry & Songs",
  description:
    "Find perfect rhyming words for poetry, song lyrics, and creative writing. Built-in phonetic rhyme dictionary — no API, no signup, runs entirely in your browser.",
  keywords:
    "rhyme finder, find rhymes online, rhyming words, poetry rhyme tool, song lyrics rhyme finder, perfect rhymes, rhyme dictionary online, words that rhyme with",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/rhyme-finder` },
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
    url: `${SITE_URL}/tools/rhyme-finder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Rhyme Finder — Rhyming Words for Poetry & Songs",
    description:
      "Find perfect rhyming words for poetry, lyrics, and creative writing. Built-in phonetic rhyme dictionary. No API, no signup, runs in your browser.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Rhyme Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Rhyme Finder — Rhyming Words for Poetry & Songs",
    description:
      "Find perfect rhymes for poetry and lyrics. Built-in phonetic dictionary, no signup, instant results.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rhyme Finder",
  description:
    "Find perfect rhyming words for poetry, song lyrics, and creative writing using a built-in phonetic ending dictionary. No API or signup required.",
  url: `${SITE_URL}/tools/rhyme-finder`,
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
      name: "Rhyme Finder",
      item: `${SITE_URL}/tools/rhyme-finder`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the rhyme finder work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool uses a built-in dictionary of phonetic ending groups — 25 groups covering common English sound patterns like 'ay' (day, say, play), 'ight' (night, light, bright), 'ound' (sound, found, ground), and so on. When you enter a word, the tool checks whether the word belongs to one of these groups (either because it's listed in the group or because it ends with the group's suffix). If a match is found, the tool returns all other words in that group as rhymes, filtering out the input word itself and any words that contain the input word as a substring...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a perfect rhyme and a near-rhyme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A perfect rhyme (also called a true rhyme) occurs when two words share the same vowel sound and all subsequent sounds from the last stressed syllable onward — for example, 'cat' and 'hat', 'night' and 'bright', 'love' and 'above'. This tool returns perfect rhymes based on phonetic ending groups. A near-rhyme (also called a slant rhyme, half rhyme, or imperfect rhyme) occurs when words share some but not all of the matching sounds — for example, 'time' and 'dime' are a perfect rhyme, but 'time' and 'fine' are a near-rhyme...",
      },
    },
    {
      "@type": "Question",
      name: "Why does the tool return no results for some words?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool's rhyme dictionary covers 25 common English phonetic ending groups with approximately 400 words total. Words that belong to smaller or less common phonetic groups — proper nouns, technical terms, loanwords from other languages, and highly specific vocabulary — may not be included. The fallback suffix search broadens the search to 2–3 letter endings, but this can still return no results for unusual words. If you get no results, try entering a simpler or more common English word, or try the last syllable of a multi-syllable word as a separate search...",
      },
    },
    {
      "@type": "Question",
      name: "What are the most useful rhyme groups for songwriting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most productive rhyme groups for songwriting tend to be the ones with large, varied word sets that include both simple and emotionally resonant words. The '-ay' group (day, say, way, play, stay, away, betray, display) is among the most useful because it includes action words, time words, and emotionally charged vocabulary. The '-ight' group (night, light, bright, fight, right, sight, delight, ignite) is another favourite in pop and country music. The '-ine' group (line, mine, shine, divine, define, sunshine) offers strong lyrical potential...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for rap and hip-hop lyrics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — this tool returns perfect rhymes, which form the foundation of all rhyme schemes including rap. However, rap and hip-hop lyrics make especially heavy use of multisyllabic rhymes, near-rhymes, and internal rhymes (rhymes within a line rather than at the end), which this tool does not directly support. For multi-syllable rhyming, try searching the stressed syllable of a word independently — for example, for 'beautiful', search 'full' or 'ful'. For near-rhymes, search adjacent endings (words ending in '-ine' can often near-rhyme with '-ight' or '-ire' endings, for example)...",
      },
    },
    {
      "@type": "Question",
      name: "What are common rhyme schemes in poetry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A rhyme scheme is the pattern of end rhymes in a poem, typically denoted by assigning a letter to each new rhyme sound. ABAB is the most common — alternating rhymes across four lines, used in ballads, sonnets, and countless folk songs. AABB (couplets) rhymes successive pairs of lines and feels more immediate and conversational — used in heroic couplets, nursery rhymes, and rap punchlines. ABCB only rhymes the second and fourth lines, leaving the first and third free, which creates a more natural speech-like flow — very common in folk music and hymns...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Rhyme Finder",
  description:
    "Step-by-step guide to using the free Rhyme Finder on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Rhyme Finder on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Rhyme Finder provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function RhymeFinderPage() {
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
              href="/tools/category/writing-text-tools"
              className="hover:text-pink-600 transition-colors"
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Rhyme Finder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Rhyme Finder — Find Rhyming Words for Poetry & Lyrics, Free & Instant
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Find perfect rhyming words for poetry, song lyrics, and creative
          writing — built-in phonetic dictionary, click any result to copy.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Rhyme Finder tool">
          <RhymeFinderClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="rhyme-finder" toolName="Rhyme Finder" />
      </SidebarAdLayout>
    </>
  );
}
