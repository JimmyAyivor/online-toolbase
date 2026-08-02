// src/app/tools/text-difference-checker/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "text-difference-checker");
const TextDifferenceCheckerClient = dynamic(
  () => import("./TextDifferenceCheckerClient"),
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
  title: "Free Text Difference Checker — Compare & Highlight",
  description:
    "Compare two pieces of text side-by-side or in unified view. Highlights added, removed, and modified lines instantly. Free, browser-based, no signup.",
  keywords:
    "text difference checker, text compare tool, diff checker, compare two texts, text diff, find differences in text, online diff tool, text comparison",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-difference-checker` },
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
    url: `${SITE_URL}/tools/text-difference-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Free Text Difference Checker — Compare & Highlight",
    description:
      "Compare two pieces of text side-by-side or in unified view. Highlights added, removed, and modified lines instantly. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text Difference Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Free Text Difference Checker — Compare & Highlight",
    description:
      "Compare two texts side-by-side or unified. Highlights added, removed, and modified lines. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Difference Checker",
  description:
    "Compare two pieces of text and highlight added, removed, and modified lines instantly.",
  url: `${SITE_URL}/tools/text-difference-checker`,
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
      name: "Text Difference Checker",
      item: `${SITE_URL}/tools/text-difference-checker`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the text difference checker determine what has changed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool compares your two texts line by line. For each line number, it checks whether the line in the original matches the corresponding line in the modified version exactly. If they match, the line is marked unchanged. If the original has a line but the modified version has a different line at the same position, it's marked as modified (shown in amber). If the modified version has a line where the original has nothing (because the modified text is longer), it's marked as added (green). If the original has a line where the modified text has nothing, it's marked as removed (red)...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Side by Side view and Unified view?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Side by Side view shows your original and modified text in two parallel columns. Each line is highlighted according to its change type, and you can scroll both columns simultaneously to scan for differences. This view is best for comparing documents where you need to read both versions in context — for example, comparing two drafts of a report or two versions of a contract. Unified view shows a single scrollable stream with − markers for removed lines and + markers for added lines, similar to the output of the git diff command in version control...",
      },
    },
    {
      "@type": "Question",
      name: "What does the similarity percentage mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The similarity score is calculated as the percentage of lines that are identical between the two texts. For example, if you have 10 lines and 8 are unchanged, the similarity is 80%. A score of 100% means the texts are identical. A score of 0% means no lines match at all. The score gives a quick at-a-glance quality metric — for content editing, a similarity of 85–95% typically indicates a light revision, while 50–70% suggests substantial rewrites. Note that the score is based on exact line matching — a line with a single changed word counts as a modified line rather than a partial match.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to compare code files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the tool works well for comparing code, configuration files, SQL queries, JSON, YAML, and other structured text. The monospace font in the input and output areas is specifically chosen to make code easier to read. The line-by-line comparison approach matches how professional diff tools like git diff, Meld, and Beyond Compare work. For large files with hundreds of lines, paste the full content and use the scrollable output area...",
      },
    },
    {
      "@type": "Question",
      name: "Is my text kept private when I use this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — all comparison logic runs entirely in your browser using JavaScript. Your text is never sent to a server or stored anywhere. The tool performs the diff calculation locally on your device, which is also why it's instant — there's no network request involved. This makes it safe to use with confidential content: internal documents, proprietary code, sensitive communications, or unpublished drafts. Unlike some online diff tools that require you to upload files to a server, this tool processes everything client-side.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when the two texts have different numbers of lines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When the texts have different line counts, the shorter text is effectively padded with empty lines to match the length of the longer text. Lines that exist in the modified text but not the original (because the modified text is longer) are marked as added. Lines that exist in the original but not the modified text (because the original is longer) are marked as removed...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Text Difference Checker",
  description: "Step-by-step guide to using the free Text Difference Checker on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Text Difference Checker on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Text Difference Checker provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function TextDifferenceCheckerPage() {
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
            <a href="/" className="hover:text-teal-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/text"
              className="hover:text-teal-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Text Difference Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Text Difference Checker — Compare Two Texts &amp; Highlight
          Differences
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Compare two text blocks side-by-side or unified. Added, removed, and
          modified lines highlighted instantly — runs entirely in your browser.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Text Difference Checker tool">
          <TextDifferenceCheckerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="text-difference-checker"
          toolName="Text Difference Checker"
        />
      </SidebarAdLayout>
    </>
  );
}
