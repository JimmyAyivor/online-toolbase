// src/app/tools/keyword-density-checker/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const KeywordDensityCheckerClient = dynamic(
  () => import("./KeywordDensityCheckerClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "keyword-density-checker");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Keyword Density Checker — Analyse Any Text",
  description:
    "Check keyword density and frequency in any text. Identify overused or underused keywords for SEO optimisation. Free, instant, no signup.",
  keywords:
    "keyword density checker, keyword frequency checker, seo keyword density, keyword analysis tool, text keyword counter, on-page seo tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/keyword-density-checker` },
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
    url: `${SITE_URL}/tools/keyword-density-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Keyword Density Checker — Analyse Any Text",
    description:
      "Analyse keyword density and frequency in any text for SEO optimisation.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Keyword Density Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Keyword Density Checker — Analyse Any Text",
    description: "Check keyword density and frequency in any text. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Keyword Density Checker",
  description: "Analyse keyword frequency and density in any text for SEO.",
  url: `${SITE_URL}/tools/keyword-density-checker`,
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
      name: "SEO Tools",
      item: `${SITE_URL}/tools/category/seo`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Keyword Density Checker",
      item: `${SITE_URL}/tools/keyword-density-checker`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is keyword density and why does it matter for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keyword density is the percentage of times a specific word or phrase appears in a piece of text relative to the total word count. For example, if 'SEO' appears 10 times in a 500-word article, its density is 2%. It matters for SEO because search engines use keyword frequency as one signal of a page's relevance to a topic — but only as one of hundreds of factors. Unnaturally high density is a spam signal; unnaturally low density may indicate weak topical coverage.",
      },
    },
    {
      "@type": "Question",
      name: "What is the ideal keyword density for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no universally agreed ideal — Google does not publish a target. The practical consensus among SEO practitioners is that a focus keyword appearing at 1–3% density sits in a natural range for most content types. Above 4–5% starts to look unnatural and risks a manual or algorithmic spam penalty for 'keyword stuffing'. Modern search algorithms primarily evaluate semantic relevance and user intent satisfaction rather than counting keyword occurrences.",
      },
    },
    {
      "@type": "Question",
      name: "What is keyword stuffing and why is it penalised?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keyword stuffing is the practice of deliberately repeating a keyword an unnatural number of times to manipulate search rankings — for example, repeating 'cheap flights' 40 times in a 300-word page. Google's Webmaster Guidelines explicitly prohibit keyword stuffing. It degrades the reading experience, was widely abused in early search optimization, and modern algorithms are effective at detecting it. Pages identified as keyword-stuffed can receive ranking penalties or be removed from the index.",
      },
    },
    {
      "@type": "Question",
      name: "Should I check density for single words or multi-word phrases?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. For SEO, your focus keyword is typically a multi-word phrase (e.g. 'running pace calculator'). Check its exact phrase density using the focus keyword field. Single-word analysis in the main table shows you the broader vocabulary distribution — useful for identifying whether you're relying too heavily on exact matches versus using semantically related variations (e.g. 'run', 'runner', 'running', 'pace', 'race') that signal natural, comprehensive coverage to search engines.",
      },
    },
    {
      "@type": "Question",
      name: "How does stop word filtering affect the keyword analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stop words are common function words (the, a, and, is, for) that carry little topical meaning. Filtering them out focuses the density analysis on meaningful content words — which is what matters for SEO. Keep stop words enabled if you need a full word frequency distribution for copywriting or readability work. For SEO density checking, filtering stop words is recommended to surface the keywords that actually influence ranking signals.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Keyword Density Checker",
  description:
    "Step-by-step guide to using the free Keyword Density Checker on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Keyword Density Checker on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Keyword Density Checker provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function KeywordDensityCheckerPage() {
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
              href="/tools/category/seo"
              className="hover:text-teal-600 transition-colors"
            >
              SEO Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Keyword Density Checker
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
          Free SEO Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Keyword Density Checker — Analyse Keyword Frequency in Any Text
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Paste any text to see keyword frequency, density percentages, and word
          count — instantly identify keyword stuffing or missed opportunities.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Keyword Density Checker tool">
          <KeywordDensityCheckerClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="keyword-density-checker"
          toolName="Keyword Density Checker"
        />
      </SidebarAdLayout>
    </>
  );
}
