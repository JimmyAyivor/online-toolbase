// src/app/tools/plagiarism-checker/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const PlagiarismCheckerClient = dynamic(
  () => import("./PlagiarismCheckerClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "meeting-cost-calculator");

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Plagiarism Checker — Free Online Plagiarism Checker",
  description:
    "Check your text against web sources for duplicate content and plagiarism. Free, instant, no signup required.",
  keywords:
    "plagiarism checker, free plagiarism checker, online plagiarism checker, duplicate content checker, originality checker, plagiarism detector",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/plagiarism-checker` },
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
    url: `${SITE_URL}/tools/plagiarism-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Plagiarism Checker — Free Online Plagiarism Checker",
    description:
      "Check your text against web sources for duplicate content and plagiarism. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Plagiarism Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Plagiarism Checker — Free Online Plagiarism Checker",
    description:
      "Check your text against web sources for duplicate content and plagiarism. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Plagiarism Checker",
  description:
    "Check your text against web sources for duplicate content and plagiarism.",
  url: `${SITE_URL}/tools/plagiarism-checker`,
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
      name: "Plagiarism Checker",
      item: `${SITE_URL}/tools/plagiarism-checker`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does this plagiarism checker work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool extracts key phrases and sentences from your submitted text, then searches those phrases against live web sources using real-time web search. Any pages whose content closely matches your phrases are returned as potential matches, and an originality score is calculated based on how many unique matches were found. Because it uses live web search, results reflect the current state of indexed content on the internet — not a fixed database.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool accurate enough for academic submissions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool is designed for quick checks and content review, not academic submission verification. Academic plagiarism detection tools (Turnitin, iThenticate) check against much larger databases including academic journals, institutional repositories, and student paper archives that are not publicly indexed on the web. Use this tool to catch obvious web-sourced plagiarism and as a preliminary check — always use your institution's official tool before submitting academic work.",
      },
    },
    {
      "@type": "Question",
      name: "Why does legitimate original text sometimes show matches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Several factors can trigger matches in genuinely original text: common factual phrases that appear widely online (e.g. 'The mitochondria is the powerhouse of the cell'), technical terminology that appears in many documents, proper nouns and place names, standard legal or regulatory language, widely-used idioms and expressions, and quotations you have included and cited. A match does not mean plagiarism — it means similar text was found online. Context, intent, and citation practice determine whether text is plagiarised.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good originality score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An originality score of 80% or higher indicates the text is mostly original based on the web sources checked. 50–79% suggests some phrases have matches and warrants review of the matched content. Below 50% indicates significant similarity with web sources and should be carefully reviewed. These thresholds are guidelines — the nature of the matches matters as much as the score. A 60% score from matching properly cited quotations is very different from a 60% score from uncited copied passages.",
      },
    },
    {
      "@type": "Question",
      name: "Does using this tool keep my text private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your text is processed by sending key phrases (not your entire text) to the web search API for matching. The tool does not store your text on any server — processing happens transiently during the check. However, the phrases used as search queries pass through the API's infrastructure during the check. If your text contains sensitive, confidential, or unpublished material, consider using an offline plagiarism tool or your institution's dedicated system, which may offer stronger data privacy guarantees.",
      },
    },
    {
      "@type": "Question",
      name: "Can this tool detect AI-generated content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — this tool is a plagiarism checker that looks for matching text across web sources. It does not detect AI-generated content. AI text detection is a separate, distinct problem that requires different tools (GPTZero, Copyleaks AI detector, Originality.ai). AI-generated text is typically not plagiarised from the web — it is synthesised — so web-search-based plagiarism checking will generally score AI text as 'highly original', which may be misleading in academic contexts where AI use is restricted.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Plagiarism Checker",
  description:
    "Step-by-step guide to using the free Plagiarism Checker on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Plagiarism Checker on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Plagiarism Checker provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function PlagiarismCheckerPage() {
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
              Plagiarism Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Plagiarism Checker — Free Online Plagiarism Checker
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Check your text against live web sources for duplicate content and
          plagiarism. Free, instant, no account needed.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Plagiarism Checker tool">
          <PlagiarismCheckerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="plagiarism-checker"
          toolName="Plagiarism Checker"
        />
      </SidebarAdLayout>
    </>
  );
}
