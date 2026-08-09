// src/app/tools/html-minifier/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const HtmlMinifierClient = dynamic(() => import("./HtmlMinifierClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "html-minifier");

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "HTML Minifier — Free Online HTML Minifier",
  description:
    "Minify HTML by removing whitespace, comments, and redundant code. Reduce file size instantly. Free, no signup required.",
  keywords:
    "html minifier, minify html, html compressor, html minifier online, free html minifier, compress html, html minifier tool, online html compressor, reduce html size",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/html-minifier` },
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
    url: `${SITE_URL}/tools/html-minifier`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "HTML Minifier — Free Online HTML Minifier",
    description:
      "Minify HTML by removing whitespace, comments, and redundant code. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online HTML Minifier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "HTML Minifier — Free Online HTML Minifier",
    description: "Minify and compress HTML code instantly. Free, no signup.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HTML Minifier",
  description:
    "Minify HTML by removing whitespace, comments, and redundant attributes to reduce file size.",
  url: `${SITE_URL}/tools/html-minifier`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
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
      name: "HTML Minifier",
      item: `${SITE_URL}/tools/html-minifier`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does minifying HTML break my page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. HTML minification only removes characters that browsers ignore — excess whitespace, line breaks, and comments. The HTML structure, tag order, and attributes remain unchanged, so the rendered page looks and behaves identically. The only exception is whitespace inside pre or textarea tags, which this tool preserves by design.",
      },
    },
    {
      "@type": "Question",
      name: "How much file size reduction should I expect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical HTML files see a 10–30% reduction in raw file size after minification. Pages with a lot of inline CSS, JavaScript, or lengthy comments can see savings of 40% or more. However, if your server already uses gzip or Brotli compression, the marginal gain from minification is smaller, since compression algorithms already remove repeated patterns very efficiently.",
      },
    },
    {
      "@type": "Question",
      name: "Should I minify HTML in production?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for high-traffic sites it's worth doing — even small reductions in HTML size compound over millions of requests, reducing bandwidth costs and slightly improving Time to First Byte (TTFB). Most modern build tools like Vite, Next.js, and webpack minify HTML automatically in production builds, so you may already have this covered if you're using a framework.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between minification and compression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minification changes the source code by removing unnecessary characters, producing a smaller but still valid HTML file. Compression (gzip, Brotli) is applied at the transport layer by your web server, encoding the file into a binary format for transmission and decompressing it in the browser. They work at different levels and can both be applied simultaneously for the best result.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the tool preserve IE conditional comments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IE conditional comments (<!--[if IE]>...<![endif]-->) are a special Microsoft extension used to serve different HTML to Internet Explorer versions. Although IE is now retired, many legacy codebases still contain these comments and removing them would change the HTML's conditional behaviour. The tool detects and preserves them to avoid unexpected breakage.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the HTML Minifier",
  description:
    "Step-by-step guide to using the free HTML Minifier on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free HTML Minifier on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The HTML Minifier provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function HtmlMinifierPage() {
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
              href="/tools/category/developer-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              HTML Minifier
            </span>
          </li>
        </ol>
      </nav>

      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          HTML Minifier — Free Online HTML Minifier
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Paste your HTML and minify it instantly — removes whitespace,
          comments, and redundant code to shrink file size. Free, no account
          needed.
        </p>
      </header>

      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="HTML Minifier tool">
          <HtmlMinifierClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="html-minifier" toolName="HTML Minifier" />
      </SidebarAdLayout>
    </>
  );
}
