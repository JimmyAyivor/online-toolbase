// src/app/tools/word-frequency-counter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "word-frequency-counter");
const WordFrequencyCounterClient = dynamic(
  () => import("./WordFrequencyCounterClient"),
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
  title: "Word Frequency Counter — Count Most Common Words in Any Text",
  description:
    "Analyse any text to see word frequency counts and percentages. Filter stop words, set minimum length, sort alphabetically or by frequency, and export results to CSV. Free, instant, no signup.",
  keywords:
    "word frequency counter, word frequency analyser, most common words, word count frequency, text analysis, stop words filter, word frequency chart, keyword frequency counter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/word-frequency-counter` },
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
    url: `${SITE_URL}/tools/word-frequency-counter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Word Frequency Counter — Count Most Common Words in Any Text",
    description:
      "Analyse text to see word frequency counts, percentages, and bar charts. Filter stop words, export CSV. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Word Frequency Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Word Frequency Counter — Count Most Common Words in Any Text",
    description:
      "Analyse text to see word frequency counts and percentages. Filter stop words, export CSV. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word Frequency Counter",
  description:
    "Count the frequency of every word in your text with filters, sorting, and CSV export.",
  url: `${SITE_URL}/tools/word-frequency-counter`,
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
      name: "Word Frequency Counter",
      item: `${SITE_URL}/tools/word-frequency-counter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a word frequency counter actually measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A word frequency counter reads through your text, splits it into individual words, and tallies how many times each unique word appears. The output shows each word alongside its raw count and its frequency as a percentage of all words analysed. For example, if your text contains 500 words and 'innovation' appears 10 times, its frequency is 10/500 = 2.00%. Frequency analysis is used in linguistics (corpus analysis), content strategy (keyword density), text mining, and natural language processing research.",
      },
    },
    {
      "@type": "Question",
      name: "What are 'common words' and why would I filter them out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common words — also called stop words, function words, or grammatical words — are the high-frequency words that hold sentences together grammatically but carry little semantic meaning on their own: 'the', 'and', 'of', 'to', 'a', 'in', 'is', 'it', 'for', 'not', and so on. Because these words appear in almost every English text, they dominate the frequency table and obscure the meaningful content words. Enabling the 'Ignore common words' filter removes over 100 of these function words, so the top results reflect the actual subjects and themes of your text rather than the grammatical scaffolding.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good keyword density for SEO content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keyword density is the percentage of times a target keyword appears relative to the total word count. The commonly cited guideline is 1–3% for a primary keyword — high enough to signal relevance to search engines, low enough to read naturally. However, modern SEO is more nuanced: Google's algorithms evaluate topical relevance, semantic context, and natural language patterns rather than raw keyword counts. A density below 0.5% may indicate under-optimisation, while above 4–5% risks appearing keyword-stuffed, which can negatively impact rankings...",
      },
    },
    {
      "@type": "Question",
      name: "How does the minimum word length filter work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum length slider (1–10) filters out all words shorter than the selected value. At the default of 1, every word including single letters is counted. Setting it to 3 removes one and two-letter words ('a', 'an', 'to', 'of', 'is', etc.), which tend to be grammatical function words. Setting it to 5 or higher retains only longer, more content-rich words. The minimum length filter works independently from the common words filter — you can use either or both simultaneously...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to analyse keyword density in my blog posts or website copy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — paste the full text of your page (excluding navigation, headers, and footer boilerplate) into the tool to see keyword distribution. Look at the top 20 words to understand how your copy is weighted. If your primary keyword is not appearing in the top results, you may want to include it more prominently. If it's appearing at very high frequency (above 4%), consider varying vocabulary with synonyms. You can also use the CSV export to import results into a spreadsheet for more detailed analysis — for example, to track keyword density changes between content drafts.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between 'total words' and 'unique words'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Total words is the count of every word token in your text, including repetitions. If you write 'the cat sat on the mat', total words = 6. Unique words counts how many distinct words appear — in that example, 'the' appears twice, so unique words = 5 ('the', 'cat', 'sat', 'on', 'mat'). The ratio of unique words to total words is called the type-token ratio (TTR) and is used as a measure of lexical diversity. A higher TTR indicates more varied vocabulary. Academic and literary writing typically has a higher TTR than repetitive marketing copy or transcribed speech.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Word Frequency Counter",
  description: "Step-by-step guide to using the free Word Frequency Counter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Word Frequency Counter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Word Frequency Counter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function WordFrequencyCounterPage() {
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
              href="/tools/category/text"
              className="hover:text-indigo-600 transition-colors"
            >
              Text Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Word Frequency Counter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Word Frequency Counter — Count Most Common Words in Any Text
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Analyse any text to see word frequency, counts, and percentages.
          Filter stop words, set minimum word length, and export results to CSV.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Word Frequency Counter tool">
          <WordFrequencyCounterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="word-frequency-counter"
          toolName="Word Frequency Counter"
        />
      </SidebarAdLayout>
    </>
  );
}
