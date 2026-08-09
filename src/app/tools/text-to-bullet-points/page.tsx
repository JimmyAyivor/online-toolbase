// src/app/tools/text-to-bullet-points/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "text-to-bullet-points");
const TextToBulletPointsClient = dynamic(
  () => import("./TextToBulletPointsClient"),
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
  title: "Free Text to Bullet Points — Paragraphs to Lists",
  description:
    "Convert any paragraph or article into clean bullet points, dashes, or numbered lists instantly. Sentence-based splitting with one-click copy. Free, instant, no signup.",
  keywords:
    "text to bullet points, paragraph to bullet points, convert text to list, bullet point converter, text to numbered list, paragraph converter, sentence to bullet points",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/text-to-bullet-points` },
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
    url: `${SITE_URL}/tools/text-to-bullet-points`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Text to Bullet Points — Paragraphs to Lists",
    description:
      "Convert any paragraph into bullet points, dashes, or numbered lists. Sentence-based splitting, one-click copy. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Text to Bullet Points Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Text to Bullet Points — Paragraphs to Lists",
    description:
      "Convert any paragraph into bullets, dashes, or numbered lists. One-click copy. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text to Bullet Points",
  description:
    "Convert any paragraph or article into clean bullet points, dash lists, or numbered lists with sentence-based splitting and one-click copy.",
  url: `${SITE_URL}/tools/text-to-bullet-points`,
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
      name: "Text to Bullet Points",
      item: `${SITE_URL}/tools/text-to-bullet-points`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the sentence-based splitting work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The converter splits text at two types of boundaries: sentence-terminal punctuation (full stops, exclamation marks, and question marks followed by whitespace) and line breaks (single or multiple newline characters). After splitting, each segment is trimmed of leading whitespace and any existing bullet markers (•, -, *, or existing numbers like '1.') so that re-running the tool on already-bulleted text doesn't double-up the markers. Segments shorter than 3 characters are filtered out to remove stray fragments. The result is one bullet point per original sentence or line.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use Bullet (•), Dash (–), or Number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The choice of bullet style should match the context where you'll paste the output. Bullet points (•) are the most visually distinctive and work well for general lists, presentations, and web content where you want clear visual separation between items. Dash lists (–) are the standard Markdown format used in tools like Notion, GitHub, and many note-taking apps — paste dashes directly into these tools and they render as proper bullet points...",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert text that already has bullet points?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the converter strips existing bullet markers before applying the new style. It removes leading •, -, and * characters as well as existing numbered-list prefixes (1., 2), 3. etc.) from each segment before reformatting. This means you can paste an existing bullet list and switch it from bullet style to numbered style, or from dashes to bullets, without getting double markers. It also means you can clean up inconsistently formatted lists — mixing different bullet styles — by converting them to a single consistent format.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my text produce fewer bullet points than expected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The converter splits on sentence-terminal punctuation followed by whitespace, and on line breaks. If your text uses minimal punctuation — for example, long run-on sentences without full stops — the entire block may be treated as a single sentence and produce only one bullet. Similarly, text formatted as a single unbroken paragraph with no line breaks will produce one bullet per sentence only if each sentence ends with a full stop, question mark, or exclamation mark...",
      },
    },
    {
      "@type": "Question",
      name: "Can I paste the output directly into Notion, Google Docs, or Word?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the output uses plain text bullet markers that paste correctly into all major writing and productivity tools. In Notion: paste dash (-) formatted output and Notion will automatically convert dashes to its native bullet format. In Google Docs and Microsoft Word: paste any style and the plain text markers appear as text — to apply native list formatting, paste unformatted then apply the list style in the editor. In Markdown editors (GitHub README, Obsidian, Bear): use dash style output, which renders as a native unordered list...",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit to how much text I can convert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no explicit character or word limit enforced by the tool — it will process however much text you paste. Performance is browser-based JavaScript, so extremely long documents (tens of thousands of words) may take a moment to process on slower devices, but for typical use cases (articles, reports, meeting notes up to a few thousand words) conversion is instant. The output panel shows the total bullet count so you can verify how many points were extracted from the input.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Text to Bullet Points",
  description:
    "Step-by-step guide to using the free Text to Bullet Points on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Text to Bullet Points on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Text to Bullet Points provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function TextToBulletPointsPage() {
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
              href="/tools/category/writing-text-tools"
              className="hover:text-teal-600 transition-colors"
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Text to Bullet Points
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Text to Bullet Points — Convert Paragraphs to Bullet Lists Free
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Paste any paragraph or article and convert it into bullet points,
          dashes, or a numbered list — sentence-by-sentence, with one-click
          copy.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Text to Bullet Points tool">
          <TextToBulletPointsClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="text-to-bullet-points"
          toolName="Text to Bullet Points"
        />
      </SidebarAdLayout>
    </>
  );
}
