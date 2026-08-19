// src/app/tools/markdown-to-html-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const MarkdownToHtmlConverterClient = dynamic(
  () => import("./MarkdownToHtmlConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "markdown-to-html-converter");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Markdown to HTML Converter — Live Preview",
  description:
    "Convert Markdown to clean HTML instantly with a live rendered preview and syntax-highlighted output. Supports headings, tables, code blocks, lists, links, images, and more. Free, no signup.",
  keywords:
    "markdown to html converter, markdown to html, markdown converter online, markdown preview, markdown parser, convert md to html, markdown syntax, github markdown, commonmark, free markdown tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/markdown-to-html-converter` },
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
    url: `${SITE_URL}/tools/markdown-to-html-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Markdown to HTML Converter — Live Preview",
    description:
      "Convert Markdown to clean HTML with a live rendered preview. Supports headings, tables, code blocks, lists, links, and more. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Markdown to HTML Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Markdown to HTML Converter — Live Preview",
    description:
      "Convert Markdown to HTML instantly with a live preview. Supports tables, code blocks, lists, and more. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Markdown to HTML Converter",
  description:
    "Convert Markdown text to clean HTML with a live rendered preview and syntax-highlighted code output. Supports headings, paragraphs, bold, italic, links, images, lists, blockquotes, tables, and code blocks.",
  url: `${SITE_URL}/tools/markdown-to-html-converter`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Markdown to HTML Converter",
      item: `${SITE_URL}/tools/markdown-to-html-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Markdown and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text formatting conventions — asterisks for bold, underscores for italic, hashes for headings, dashes for lists — that are readable as plain text but also convert cleanly to formatted HTML. The guiding principle is that a Markdown document should look good as-is, even without being rendered. Markdown is widely used for documentation (GitHub READMEs, GitBook, Notion), blog posts (Hugo, Jekyll, Ghost), technical writing, and content management systems...",
      },
    },
    {
      "@type": "Question",
      name: "What Markdown syntax is supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool supports the core CommonMark Markdown specification plus common extensions. Supported elements include: headings (# through ######), paragraphs, bold (**text** or __text__), italic (*text* or _text_), bold italic (***text***), strikethrough (~~text~~), inline code (`code`), code blocks (``` fenced or indented), unordered lists (-, *, +), ordered lists (1. 2. 3.), nested lists, blockquotes (>), horizontal rules (---, ***, ___), links ([text](url) and reference links), images (![alt](url)), HTML tables with alignment, and line breaks...",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a table in Markdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Markdown tables use pipes (|) to separate columns and hyphens (---) to create the header separator row. A basic table looks like: | Header 1 | Header 2 | on the first line, then | --- | --- | on the second (separator) line, then | Cell 1 | Cell 2 | for each data row. You can control column alignment by adding colons to the separator row: | :--- | for left-align, | ---: | for right-align, and | :---: | for centre-align. The pipes at the start and end of each row are optional but recommended for readability...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between inline code and code blocks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Inline code is used for short code snippets within a sentence — wrap the text in single backticks: `variable_name` renders as a monospace inline element. Code blocks are for multi-line code samples — wrap the code in triple backticks (```) on their own lines, with an optional language identifier after the opening fence for syntax highlighting: ```python starts a Python-highlighted code block. Indented code blocks (four spaces or one tab of indentation) are the original Markdown method, still supported but less common than fenced blocks in modern usage...",
      },
    },
    {
      "@type": "Question",
      name: "Why does my Markdown look different on GitHub vs other tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Different Markdown renderers implement different specs. GitHub uses GitHub Flavored Markdown (GFM), which extends CommonMark with tables, strikethrough, task lists (- [ ] and - [x]), autolinked URLs, and @mentions. Some older tools use the original Gruber Markdown or Markdown Extra, which handle edge cases differently — particularly around nested lists, code block indentation, and emphasis inside words. CommonMark was created specifically to resolve these inconsistencies with a strict, unambiguous specification...",
      },
    },
    {
      "@type": "Question",
      name: "Can I include raw HTML in Markdown?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In most Markdown parsers, yes — raw HTML can be mixed directly into Markdown documents. Block-level HTML elements (divs, sections, tables) typically work when they're separated from surrounding Markdown by blank lines. Inline HTML (spans, strong tags, anchor tags) can be mixed inline with Markdown text. However, some platforms sanitise HTML for security — notably GitHub, Notion, and most user-generated content platforms strip or escape HTML to prevent XSS attacks...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Markdown to HTML Converter",
  description:
    "Step-by-step guide to using the free Markdown to HTML Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Markdown to HTML Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Markdown to HTML Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function MarkdownToHtmlConverterPage() {
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
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/developer-tools"
              className="hover:text-blue-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Markdown to HTML Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Markdown to HTML Converter — Free Online Converter with Live Preview
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert Markdown to clean HTML with a live rendered preview — supports
          tables, code blocks, headings, links, and more.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Markdown to HTML Converter tool">
          <MarkdownToHtmlConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="markdown-to-html-converter"
          toolName="Markdown to HTML Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
