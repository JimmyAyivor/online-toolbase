// src/app/tools/linkedin-post-formatter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const LinkedinPostFormatterClient = dynamic(
  () => import("./LinkedInPostFormatterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "linkedin-post-formatter");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free LinkedIn Post Formatter — Format & Preview Posts",
  description:
    "Format LinkedIn posts with bold, italic, bullet points, and line spacing. Live preview shows how your post will look when published. Add templates, copy formatted text, and check character count. Free, no signup.",
  keywords:
    "linkedin post formatter, linkedin text formatter, bold text linkedin, format linkedin post, linkedin character counter, linkedin post template, linkedin post preview, linkedin formatting tool",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/linkedin-post-formatter` },
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
    url: `${SITE_URL}/tools/linkedin-post-formatter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free LinkedIn Post Formatter — Format & Preview Posts",
    description:
      "Format LinkedIn posts with bold, italic, bullets, and spacing. Live preview shows exactly how your post will look. Choose a template, copy formatted text. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online LinkedIn Post Formatter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free LinkedIn Post Formatter — Format & Preview Posts",
    description:
      "Format LinkedIn posts with bold, italic, bullets, and live preview. Copy formatted text. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LinkedIn Post Formatter",
  description:
    "Formats LinkedIn post text with bold, italic, bullet symbols, and line spacing using Unicode characters that display correctly on LinkedIn. Includes a live split-pane preview, post templates (story, tips list, case study, thought leadership), character counter with LinkedIn's 3,000-character limit, and one-click copy. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/linkedin-post-formatter`,
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
      name: "LinkedIn Post Formatter",
      item: `${SITE_URL}/tools/linkedin-post-formatter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why doesn't LinkedIn support basic text formatting like bold and italic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LinkedIn's post composer and feed renderer use plain text — it doesn't process Markdown or HTML styling the way platforms like Slack or GitHub do. Bold and italic text in LinkedIn posts work through a workaround: Unicode mathematical alphanumeric symbols, which are technically different characters that visually look like bold or italic versions of standard letters. Because they are different Unicode code points, not HTML formatting, they display as bold or italic in LinkedIn's feed. This is the same technique used by tools like this formatter...",
      },
    },
    {
      "@type": "Question",
      name: "What is LinkedIn's character limit for posts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LinkedIn allows up to 3,000 characters for standard posts (status updates). Articles published through LinkedIn's article/newsletter feature can be much longer — up to approximately 125,000 characters. For standard posts, the first 210–220 characters appear before the 'See more' truncation point — this is the most valuable real estate in your post, as it's what appears in the feed without requiring a click. The character counter in this formatter tracks your total against the 3,000-character limit and highlights when you're approaching it...",
      },
    },
    {
      "@type": "Question",
      name: "What are the best LinkedIn post formats for engagement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Data from LinkedIn creators and analytics tools consistently shows several high-performing post structures. The hook-story-lesson format — a strong opening line, a personal or professional narrative, and a takeaway — consistently generates high dwell time and comments. The numbered list ('5 things I learned about X') performs well because LinkedIn's algorithm rewards content that generates saves and reshares, and lists are highly saved...",
      },
    },
    {
      "@type": "Question",
      name: "Does adding emojis affect LinkedIn post reach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Emojis in LinkedIn posts can improve or hurt reach depending on usage. Moderate emoji use — 1–3 emojis used as visual anchors or bullet alternatives — tends to improve feed scanability and engagement rates, particularly for list and tips posts. Excessive emoji use (every line decorated with 3–5 emojis) is associated with spammy content and may reduce credibility among professional audiences on LinkedIn, which is more formal than Instagram or Twitter/X. Emojis count as 2 characters each for the 3,000-character limit...",
      },
    },
    {
      "@type": "Question",
      name: "How do I add a line break in LinkedIn posts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On LinkedIn's desktop web composer, press Shift+Enter for a soft line break (stays on the same paragraph visually) or Enter for a full line break. On mobile, the Enter key creates a new line. The tricky part is that LinkedIn's feed renderer tends to collapse multiple consecutive blank lines into a single visual line break, so you can't create large visual gaps between paragraphs by pressing Enter multiple times. Single blank lines between paragraphs display correctly...",
      },
    },
    {
      "@type": "Question",
      name: "What's the best time to post on LinkedIn for maximum reach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LinkedIn engagement data from multiple analytics studies points to Tuesday through Thursday as the highest-engagement days, with peak times between 8–10 AM and 12–1 PM in the local timezone of your primary audience. This reflects LinkedIn's core professional audience checking the platform during work hours and the start of lunch breaks. Monday mornings tend to be lower engagement as users focus on catching up on work, and Fridays see drop-off as people disengage ahead of the weekend. Sunday posting is generally low-reach but can work for motivational or weekend-appropriate content...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the LinkedIn Post Formatter",
  description:
    "Step-by-step guide to using the free LinkedIn Post Formatter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free LinkedIn Post Formatter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The LinkedIn Post Formatter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function LinkedinPostFormatterPage() {
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
              href="/tools/category/social-media-tools"
              className="hover:text-blue-600 transition-colors"
            >
              Social Media Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              LinkedIn Post Formatter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          Free Social Media Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          LinkedIn Post Formatter — Format, Preview &amp; Copy LinkedIn Posts
          Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Format LinkedIn posts with bold, italic, bullets, and spacing — live
          preview shows exactly how your post will render when published.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="LinkedIn Post Formatter tool">
          <LinkedinPostFormatterClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="linkedin-post-formatter"
          toolName="LinkedIn Post Formatter"
        />
      </SidebarAdLayout>
    </>
  );
}
