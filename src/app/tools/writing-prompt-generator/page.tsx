// src/app/tools/writing-prompt-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "writing-prompt-generator");
const WritingPromptGeneratorClient = dynamic(
  () => import("./WritingPromptGeneratorClient"),
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
  title:
    "Free Writing Prompt Generator — 80+ Genre Prompts",
  description:
    "Beat writer's block instantly with a random creative writing prompt. 8 genres — Fiction, Sci-Fi, Horror, Romance, Mystery, Fantasy, Non-Fiction, Poetry — 10 prompts each. No repeat prompts, one-click copy, no signup.",
  keywords:
    "writing prompt generator, creative writing prompts, story ideas generator, fiction writing prompts, poetry prompts, horror prompts, romance story ideas, mystery writing prompts, fantasy prompts, beat writers block",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/writing-prompt-generator` },
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
    url: `${SITE_URL}/tools/writing-prompt-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Free Writing Prompt Generator — 80+ Genre Prompts",
    description:
      "Beat writer's block with a random creative writing prompt. 8 genres, 80+ unique prompts, no repeats, one-click copy. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Writing Prompt Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Free Writing Prompt Generator — 80+ Genre Prompts",
    description:
      "Beat writer's block with a random creative writing prompt. 8 genres, 80+ unique prompts, no repeats.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Writing Prompt Generator",
  description:
    "Generate random creative writing prompts across 8 genres — Fiction, Sci-Fi, Horror, Romance, Mystery, Fantasy, Non-Fiction, and Poetry. 80+ unique prompts with no-repeat cycling.",
  url: `${SITE_URL}/tools/writing-prompt-generator`,
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
      name: "Writing Prompt Generator",
      item: `${SITE_URL}/tools/writing-prompt-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the writing prompt generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The generator maintains a library of 80 hand-written prompts across 8 genres — 10 prompts per genre. When you click Generate Prompt, the tool randomly selects a prompt from the current genre's pool that hasn't appeared in your last 10 generations. This prevents repeats within a session. Once all prompts in a genre have been shown, the cycle resets and the full pool becomes available again. Switching genres resets both the prompt display and the history for that session...",
      },
    },
    {
      "@type": "Question",
      name: "How do I use a writing prompt effectively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most effective approach is to set a timer — usually between 10 and 25 minutes — and write without stopping. This is sometimes called freewriting or timed writing. The key rules are: don't edit as you go, don't delete what you've written, and don't worry about whether it's good. The goal of a prompt session is not to produce a finished piece but to generate raw material and break through mental blocks...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between the 8 genre modes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each genre mode draws from a different prompt pool, each with its own conventions and atmosphere. Fiction prompts are literary and character-driven, focusing on moments of discovery or change. Sci-Fi prompts involve speculative concepts — AI consciousness, colonisation, memory transfer, simulation theory — told through individual human stories rather than as world-building exercises. Horror prompts rely on the uncanny: something is wrong but not immediately explicable. Romance prompts are built around circumstance and timing — two people in the right situation...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these prompts for commercial writing or publishing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the prompts are provided without restriction for any use, including commercial writing, publication, workshop distribution, and classroom use. A prompt is simply a starting point; the story you write from it is your own work. There is no attribution required. Many published novels, short stories, and poems began as timed writing from a prompt — the prompt itself contributes nothing to the finished work beyond the initial spark.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use writing prompts for writer's block?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Writer's block usually has one of three causes: perfectionism (fear that what you write won't be good enough), decision paralysis (too many options, unclear where to start), or creative depletion (you've been consuming but not producing). Writing prompts address all three. They reduce decision paralysis by giving you a specific starting point. They reduce perfectionism by framing the writing as a response to a prompt rather than as your own work — it's easier to write something imperfect when you're 'just following a prompt'...",
      },
    },
    {
      "@type": "Question",
      name: "What is the best way to use prompts in a writing workshop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In a workshop setting, prompts work best as low-stakes warm-up exercises at the start of a session. A 10-minute timed write from a shared prompt gives every participant something to work from and normalises the act of writing quickly without editing. After the timer, participants can choose to share what they've written or simply use it as a warm-up. For more structured workshop use, the genre-specific modes are useful: a horror workshop can use the Horror prompts exclusively, while a personal essay workshop can work through the Non-Fiction prompts...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Writing Prompt Generator",
  description: "Step-by-step guide to using the free Writing Prompt Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Writing Prompt Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Writing Prompt Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function WritingPromptGeneratorPage() {
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
            <a href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/writing"
              className="hover:text-emerald-600 transition-colors"
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Writing Prompt Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Writing Prompt Generator — 80+ Prompts Across 8 Genres, Free & Instant
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Choose a genre and generate a random creative writing prompt — 8
          genres, 80+ unique prompts, no-repeat cycling, one-click copy.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Writing Prompt Generator tool">
          <WritingPromptGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="writing-prompt-generator"
          toolName="Writing Prompt Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
