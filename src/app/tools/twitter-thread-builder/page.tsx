// src/app/tools/twitter-thread-builder/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "twitter-thread-builder");
const TwitterThreadBuilderClient = dynamic(
  () => import("./TwitterThreadBuilderClient"),
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
    "Free Twitter Thread Builder — Write & Export Threads",
  description:
    "Build Twitter / X threads tweet-by-tweet with a live character counter, tweet reordering, numbered formatting, and one-click export. Start from a template or scratch. Free, no signup.",
  keywords:
    "twitter thread builder, x thread builder, write twitter thread, thread composer, tweet thread tool, long-form twitter, thread template, social media thread, free thread builder",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/twitter-thread-builder` },
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
    url: `${SITE_URL}/tools/twitter-thread-builder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title:
      "Free Twitter Thread Builder — Write & Export Threads",
    description:
      "Write Twitter/X threads with live character counts, tweet reordering, numbered formatting, and template options. Export as text. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Twitter Thread Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title:
      "Free Twitter Thread Builder — Write & Export Threads",
    description:
      "Write and reorder Twitter/X threads with live character counts and numbered formatting. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Twitter Thread Builder",
  description:
    "Write Twitter / X threads with individual tweet panels, live 280-character counters, drag-to-reorder functionality, auto-numbering (1/, 2/...), template options, and one-click export as a formatted text file. Runs entirely in the browser — no signup required.",
  url: `${SITE_URL}/tools/twitter-thread-builder`,
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
      name: "Social Media Tools",
      item: `${SITE_URL}/tools/category/social-media`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Twitter Thread Builder",
      item: `${SITE_URL}/tools/twitter-thread-builder`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Twitter/X thread and why do creators use them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Twitter / X thread is a series of connected tweets published in sequence from the same account, linked together so they read as a continuous piece of content. Threads allow creators to share long-form ideas, stories, analyses, or guides within a platform that limits individual posts to 280 characters. They became popular because they combine the conversational feel and algorithmic distribution of Twitter with the substance and depth of long-form writing...",
      },
    },
    {
      "@type": "Question",
      name: "How long should a Twitter thread be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The optimal thread length depends on the content type and audience, but research into top-performing threads suggests 5–15 tweets is the sweet spot for most use cases. Threads shorter than 5 tweets often don't provide enough value to justify the format over a single tweet or short thread. Threads longer than 20 tweets risk losing readers due to length fatigue, though data-heavy breakdowns and in-depth analyses can sustain longer threads when every tweet adds genuine value. The key test: does each tweet standalone as a worthwhile insight, or is it padding? Cut aggressively...",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good thread hook (the first tweet)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The first tweet is the most important element of a thread — it determines whether anyone reads past it. A strong first tweet needs to do one of three things: make a bold claim ('Most advice about [X] is wrong'), promise specific value ('I spent 100 hours researching [X]. Here's what I found:'), or create a curiosity gap ('The [counterintuitive thing about X] nobody talks about. A thread:'). The first tweet should stand alone as interesting even without the thread — it's what gets retweeted and reshared independently...",
      },
    },
    {
      "@type": "Question",
      name: "What is the 280-character limit and does it apply to threads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard X / Twitter accounts have a 280-character limit per tweet, which applies to every tweet in a thread. X Premium (paid subscription) subscribers have an extended character limit of up to 25,000 characters per post, enabling long-form articles within X itself. For standard accounts, each tweet in a thread must fit within 280 characters. This constraint is actually a feature for thread-writers: it forces concision and makes each tweet punchy and scannable. Count URLs as 23 characters regardless of actual length (X auto-shortens all URLs). Emojis count as 2 characters each...",
      },
    },
    {
      "@type": "Question",
      name: "Should I number my tweets (1/, 2/, etc.)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Numbering is optional but recommended for most thread types. Numbers serve several purposes: they signal to the reader how long the thread is and where they are within it, they give each tweet a visual anchor that makes the thread easier to navigate, and they look professional and intentional. The most common format is '1/' at the start of each tweet followed by the content, or the number at the end '— (1/7)'...",
      },
    },
    {
      "@type": "Question",
      name: "How do I actually post a thread on X / Twitter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To post a thread on X: tap the compose button to start a new tweet, write your first tweet, then click the '+' icon (Add tweet) below the tweet to add a second tweet. Continue adding tweets until your thread is complete — each tweet stays connected in the compose interface. Review all tweets for character limits and typos, then click 'Post all' to publish the entire thread simultaneously. All tweets are posted at the same time and appear linked in sequence...",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Twitter Thread Builder",
  description: "Step-by-step guide to using the free Twitter Thread Builder on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Twitter Thread Builder on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Twitter Thread Builder provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function TwitterThreadBuilderPage() {
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
            <a href="/" className="hover:text-sky-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/social-media"
              className="hover:text-sky-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Twitter Thread Builder
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Twitter Thread Builder — Write, Reorder &amp; Export X/Twitter Threads
          Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Write Twitter / X threads with live character counts, numbered tweets,
          reordering, and one-click export — start from a template or blank.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Twitter Thread Builder tool">
          <TwitterThreadBuilderClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="twitter-thread-builder"
          toolName="Twitter Thread Builder"
        />
      </SidebarAdLayout>
    </>
  );
}
