// src/app/tools/lorem-ipsum-generator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const LoremIpsumGeneratorClient = dynamic(
  () => import("./LoremIpsumGeneratorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "lorem-ipsum-generator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Free Placeholder Text Generator",
  description:
    "Generate lorem ipsum placeholder text in paragraphs, sentences, words, or lists. Adjustable count, start-with-Lorem option, and quick presets. Free, instant, no signup.",
  keywords:
    "lorem ipsum generator, placeholder text generator, dummy text generator, lorem ipsum online, fake text generator, filler text generator, lorem ipsum paragraphs, design placeholder text",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/lorem-ipsum-generator` },
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
    url: `${SITE_URL}/tools/lorem-ipsum-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Lorem Ipsum Generator — Free Placeholder Text Generator",
    description:
      "Generate lorem ipsum in paragraphs, sentences, words, or lists. Adjustable count, quick presets, copy and download. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Lorem Ipsum Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Lorem Ipsum Generator — Free Placeholder Text Generator",
    description:
      "Generate lorem ipsum in paragraphs, sentences, words, or lists. Copy or download instantly. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lorem Ipsum Generator",
  description:
    "Generate lorem ipsum placeholder text in paragraphs, sentences, words, or lists with adjustable count and quick presets.",
  url: `${SITE_URL}/tools/lorem-ipsum-generator`,
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
      name: "Lorem Ipsum Generator",
      item: `${SITE_URL}/tools/lorem-ipsum-generator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Lorem Ipsum and where does it come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lorem ipsum is a scrambled extract from 'De Finibus Bonorum et Malorum' (On the Ends of Good and Evil), a philosophical work by the Roman statesman and orator Cicero, written in 45 BCE. The passage beginning 'Lorem ipsum dolor sit amet...' is derived from sections 1.10.32 and 1.10.33 of that work. The words have been deliberately scrambled and altered so they are not readable as Latin — the goal is to produce text that looks natural and has a realistic letter-frequency distribution without being legible enough to distract readers from the design...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between the four output modes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paragraphs mode generates full blocks of connected prose, each containing 4–7 randomly constructed sentences. This is the most common mode and is best for prototyping body text, article layouts, blog posts, and long-form content areas. Sentences mode generates individual standalone sentences — useful for shorter content blocks like product descriptions, caption placeholders, tooltip text, and UI help text fields. Words mode generates a flat sequence of words with a full stop at the end, best for filling a specific word budget or a very short text field without sentence structure...",
      },
    },
    {
      "@type": "Question",
      name: "Should I start my Lorem Ipsum with 'Lorem ipsum'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 'Start with Lorem ipsum' option makes the generated text begin with the iconic 'Lorem ipsum dolor sit amet...' opening, which is the traditional and universally recognised placeholder format. Designers and developers tend to use this by default because it immediately signals to collaborators that the text is a placeholder and not real content. However, if you're generating multiple independent blocks of placeholder text — for example, 10 different product descriptions in a grid — you may want to disable this so the blocks don't all look identical from the first line...",
      },
    },
    {
      "@type": "Question",
      name: "How does this Lorem Ipsum generator work? Is it the same every time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The generator uses a predefined vocabulary of 90 Latin-derived lorem ipsum words and constructs random sentences and paragraphs from them on the fly using JavaScript. Sentence length is randomised between 8 and 15 words, and paragraph length is randomised between 4 and 7 sentences — which means every click of Regenerate produces different output. The text is not pulled from a fixed database or API — it is generated fresh in your browser each time...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Lorem Ipsum text on a live website or in production?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — lorem ipsum is exclusively a design placeholder and should never appear in a finished, live product. Using lorem ipsum in production is a common mistake with real consequences: it can appear in search engine indexes, confusing crawlers and users; it fails accessibility requirements since the text is not meaningful; it reduces user trust if spotted; and it indicates an incomplete publishing workflow. Always replace all placeholder text with real content before launching a website, app, or document...",
      },
    },
    {
      "@type": "Question",
      name: "What is the standard length for a Lorem Ipsum paragraph?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standard lorem ipsum paragraph used in most style sheets and type specimens is the opening passage from De Finibus, which contains approximately 200 words across 5–6 sentences. For design purposes, a 'typical' body text paragraph is considered to be 50–150 words, or 3–6 sentences, with an average sentence length of 15–20 words. This generator uses 4–7 sentences per paragraph with 8–15 words per sentence, which produces paragraphs of roughly 60–100 words — a realistic proxy for body copy in blog posts, news articles, and marketing content...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Lorem Ipsum Generator",
  description: "Step-by-step guide to using the free Lorem Ipsum Generator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Lorem Ipsum Generator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Lorem Ipsum Generator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function LoremIpsumGeneratorPage() {
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
            <a href="/" className="hover:text-amber-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/text"
              className="hover:text-amber-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Lorem Ipsum Generator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Lorem Ipsum Generator — Free Placeholder Text Generator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Generate lorem ipsum placeholder text in paragraphs, sentences, words,
          or lists. Adjustable count, presets, and download as .txt.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Lorem Ipsum Generator tool">
          <LoremIpsumGeneratorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="lorem-ipsum-generator"
          toolName="Lorem Ipsum Generator"
        />
      </SidebarAdLayout>
    </>
  );
}
