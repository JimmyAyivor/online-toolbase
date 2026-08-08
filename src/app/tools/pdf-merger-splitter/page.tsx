// src/app/tools/pdf-merger-splitter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";

const PdfMergerSplitterClient = dynamic(
  () => import("./PdfMergerSplitterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "pdf-merger-splitter");

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "PDF Merger & Splitter — Merge or Split PDF Files Free Online",
  description:
    "Merge multiple PDF files into a single document, or split a PDF into individual pages — all in your browser. Drag to reorder pages before merging. No upload, no signup, no data stored.",
  keywords:
    "pdf merger, pdf splitter, merge PDF files, split PDF pages, combine PDF, PDF tools online, free PDF merger, PDF page extractor, no upload PDF tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/pdf-merger-splitter` },
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
    url: `${SITE_URL}/tools/pdf-merger-splitter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "PDF Merger & Splitter — Merge or Split PDF Files Free Online",
    description:
      "Merge multiple PDFs into one or split a PDF into individual pages. Reorder before merging. Runs entirely in your browser — no upload, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online PDF Merger & Splitter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "PDF Merger & Splitter — Merge or Split PDF Files Free Online",
    description:
      "Merge or split PDFs in your browser — no upload, no signup, no data stored. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PDF Merger & Splitter",
  description:
    "Merges multiple PDF files into a single document (with drag-to-reorder page control) or splits a single PDF into individual pages for separate download. All processing runs entirely in the browser using pdf-lib — files are never uploaded to any server. Free with no signup required.",
  url: `${SITE_URL}/tools/pdf-merger-splitter`,
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
      name: "Business Tools",
      item: `${SITE_URL}/tools/category/business`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "PDF Merger & Splitter",
      item: `${SITE_URL}/tools/pdf-merger-splitter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are my PDF files uploaded to any server when I use this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — all PDF processing in this tool happens entirely within your browser using the pdf-lib JavaScript library. Your files are read locally by your browser and processed in memory. No data is transmitted to any server, stored remotely, or accessible by anyone other than you. This makes the tool safe to use with confidential, sensitive, or proprietary documents — contracts, financial records, medical documents, and legal files — since the contents never leave your device. This browser-based approach also means the tool works offline once the page has loaded.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit for merging or splitting PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no strict server-imposed file size limit since all processing happens in your browser. Practical limits depend on your device's available memory (RAM). On most modern laptops and desktop computers, PDFs up to 100–200 MB can be processed without issue. Very large PDFs (over 300 MB) or merging many large files simultaneously may slow down or run out of browser memory on older or low-spec devices...",
      },
    },
    {
      "@type": "Question",
      name: "Will merging PDFs affect the quality or formatting of the original files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — merging PDFs with this tool combines them at the document level without re-encoding, compressing, or re-rendering the content. The text, images, fonts, and formatting in each original PDF are preserved exactly as they were. This is different from tools that convert PDFs to images and back (which degrades quality) — this tool operates on the native PDF structure, so the merged output maintains the original quality of all input files. Page size, orientation (portrait/landscape), and margins are preserved per page...",
      },
    },
    {
      "@type": "Question",
      name: "Can I reorder pages before merging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — once you've uploaded multiple PDF files in merge mode, you can reorder them using the arrow buttons before generating the merged output. The final merged PDF will contain pages in the order shown in the tool. This is useful when combining a cover page, main document, and appendices that were created as separate files and need to be merged in a specific sequence. For reordering individual pages within a single large PDF (rather than reordering entire documents), use the split function to extract individual pages, then re-merge them in the desired order.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to password-protected PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool cannot open, process, or bypass password-protected PDFs. If you upload a password-protected PDF, the tool will not be able to read its content and the operation will fail. To merge or split a password-protected PDF, you first need to remove the password protection using the PDF's original password in a PDF editor such as Adobe Acrobat (File → Properties → Security → No Security) or Preview on Mac (open with password, then export without password). Never share your password with third-party online tools to remove PDF passwords — use only trusted software you control.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between merging and combining PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Merging and combining are the same operation — both terms describe taking multiple separate PDF files and joining them into a single PDF document. 'Merging' is more commonly used in the context of document management tools and enterprise software; 'combining' is used by Adobe in its product marketing. The end result is identical: all pages from all input PDFs, in the specified order, in a single output PDF file...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the PDF Merger & Splitter",
  description:
    "Step-by-step guide to using the free PDF Merger & Splitter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free PDF Merger & Splitter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The PDF Merger & Splitter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function PdfMergerSplitterPage() {
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
            <a href="/" className="hover:text-red-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/business-productivity"
              className="hover:text-red-600 transition-colors"
            >
              Business Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              PDF Merger &amp; Splitter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
          Free Business Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          PDF Merger &amp; Splitter — Merge or Split PDF Files Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Merge multiple PDFs into one document or split a PDF into individual
          pages — runs entirely in your browser, nothing uploaded to any server.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="PDF Merger & Splitter tool">
          <PdfMergerSplitterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="pdf-merger-splitter"
          toolName="PDF Merger & Splitter"
        />
      </SidebarAdLayout>
    </>
  );
}
