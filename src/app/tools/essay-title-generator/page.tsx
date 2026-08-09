// src/app/tools/essay-title-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const EssayTitleGeneratorClient = dynamic(
  () => import("./EssayTitleGeneratorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "essay-title-generator");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Essay Title Generator — 10 Titles Instantly",
  description:
    "Enter a topic and instantly generate 10 compelling titles for essays, research papers, blog posts, or reports. 4 writing modes, regenerate for variety, one-click copy. Free, no signup.",
  keywords:
    "essay title generator, blog title generator, research paper title generator, article title ideas, essay topic title, academic title generator, writing title generator, title ideas for essays",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/essay-title-generator` },
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
    url: `${SITE_URL}/tools/essay-title-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Essay Title Generator — 10 Titles Instantly",
    description:
      "Enter a topic and get 10 title ideas for essays, research papers, blog posts, or reports. 4 writing modes, regenerate for variety, one-click copy.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Essay Title Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Essay Title Generator — 10 Titles Instantly",
    description:
      "Enter a topic and get 10 title ideas for essays, research papers, blog posts, or reports. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Essay Title Generator",
  description:
    "Generate 10 compelling title ideas for essays, research papers, blog posts, or reports. Enter a topic, choose a writing mode, and regenerate for variety.",
  url: `${SITE_URL}/tools/essay-title-generator`,
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
      name: "Essay Title Generator",
      item: `${SITE_URL}/tools/essay-title-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the title generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The generator applies your topic keyword to a library of 20 proven title templates — structural formulas like '[Topic]: A Critical Analysis', 'The Future of [Topic]', and 'Why [Topic] Matters More Than Ever' — and combines them with mode-specific prefixes appropriate to your chosen writing type. Each click of Generate or Regenerate randomly selects and shuffles 10 titles from the combined pool, so every generation produces a different mix. The keyword you enter is capitalised and inserted into each template at the placeholder position...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between the four writing type modes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The four modes add different prefix styles on top of the shared title templates. Essay mode uses the templates without additional prefixes, producing general-purpose academic and analytical titles. Research Paper mode adds formal academic prefixes such as 'An Empirical Study of', 'A Systematic Review of', and 'Investigating' — these signal the scholarly, evidence-based nature of research writing. Blog Post mode adds engagement-focused prefixes like 'Why', 'How to Master', and 'The Ultimate Guide to', which are optimised for click-through and search intent...",
      },
    },
    {
      "@type": "Question",
      name: "How do I write a good essay title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong essay title does three things: it accurately describes the content, it signals the approach or angle (analytical, argumentative, descriptive), and it engages the reader. For academic essays, the most effective format is a two-part title separated by a colon — a memorable phrase or question before the colon, and a precise descriptive subtitle after it. For example: 'The Weight of Words: How Social Media Language Shapes Political Opinion'. The first part creates interest; the second delivers clarity...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated titles directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the titles are written to be usable as-is, or as starting points you edit to fit your specific angle. Many users pick the closest matching title and personalise it: adjusting the keyword to be more specific, adding a colon subtitle, changing a word or two for tone, or combining elements of two generated titles. The most effective use of the tool is as a brainstorming aid — it quickly generates 10 candidate structures so you can identify which title direction feels right for your content, then refine that direction...",
      },
    },
    {
      "@type": "Question",
      name: "What makes a research paper title different from a blog post title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Research paper titles follow academic conventions: they are typically longer, more precise, and often include technical terminology. They signal methodology (empirical study, systematic review, meta-analysis), scope (global, longitudinal, cross-sectional), and the specific population or context studied. They rarely use rhetorical questions or engagement-bait phrasing. Blog post titles, by contrast, are optimised for search intent and emotional resonance — they are typically shorter, use second-person ('you'), include numbers, and promise a direct benefit or answer...",
      },
    },
    {
      "@type": "Question",
      name: "Should I use a question as my essay title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Question titles can be effective, especially for argumentative and persuasive essays — they signal that the paper will take a position in response to a debated issue. For example: 'Is Social Media Making Us More Isolated?' or 'Should Governments Regulate Artificial Intelligence?'. However, question titles work better in some contexts than others. In academic writing, many style guides and instructors prefer statement titles over question titles, arguing that a well-framed statement is more precise about the paper's conclusion...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Essay Title Generator",
  description:
    "Step-by-step guide to using the free Essay Title Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Essay Title Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Essay Title Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function EssayTitleGeneratorPage() {
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
              Essay Title Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Essay Title Generator — Generate 10 Compelling Titles Instantly Free
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Enter a topic and generate 10 compelling title ideas for essays,
          research papers, blog posts, or reports — with one-click copy and
          regenerate for variety.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Essay Title Generator tool">
          <EssayTitleGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="essay-title-generator"
          toolName="Essay Title Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
