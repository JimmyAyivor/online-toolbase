// src/app/tools/reading-time-estimator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "reading-time-estimator");
const ReadingTimeEstimatorClient = dynamic(
  () => import("./ReadingTimeEstimatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Free Reading Time Estimator — How Long to Read?",
  description:
    "Estimate reading time for any text at your custom reading speed. Adjustable WPM slider, image time calculator, and a comparison across slow, average, fast, and speed readers. Free, instant, no signup.",
  keywords:
    "reading time estimator, reading time calculator, how long to read, words per minute calculator, article reading time, blog reading time, wpm calculator, reading speed calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/reading-time-estimator` },
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
    url: `${SITE_URL}/tools/reading-time-estimator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Reading Time Estimator — How Long to Read?",
    description:
      "Estimate reading time at your custom WPM. Includes image time, multi-speed comparison, and full text stats. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Reading Time Estimator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Free Reading Time Estimator — How Long to Read?",
    description:
      "Estimate reading time at your custom WPM. Image time, multi-speed comparison, and text stats. Free, instant.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Reading Time Estimator",
  description:
    "Estimate how long it takes to read any text at a custom reading speed. Includes image time and multi-speed comparison.",
  url: `${SITE_URL}/tools/reading-time-estimator`,
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
      name: "Reading Time Estimator",
      item: `${SITE_URL}/tools/reading-time-estimator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What reading speed should I use for my reading time estimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The default of 200 words per minute is the most widely cited average for adult silent reading of general non-technical prose. Research on reading rates is consistent in this range: a 2019 meta-analysis of 190 studies found a mean of 238 wpm for adults reading in their native language, with large variation based on text complexity, vocabulary familiarity, and individual ability. For technical or academic content, use 150–175 wpm. For a novel or easy blog post, 220–250 wpm may be more accurate...",
      },
    },
    {
      "@type": "Question",
      name: "How is image time calculated and why does it add 12 seconds per image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 12-second-per-image estimate is based on the standard established by Medium, the publishing platform, which conducted internal research on how long readers spend on images in long-form articles. Medium's algorithm adds 12 seconds for the first image and smaller amounts for subsequent images, rounding to a reading time that matches observed user behaviour. This tool uses a flat 12 seconds per image as a reasonable approximation. The actual time varies: a simple chart might take 5 seconds to scan, while a detailed infographic might take 30+ seconds...",
      },
    },
    {
      "@type": "Question",
      name: "What is a good reading time for a blog post?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most-cited benchmark for blog reading time comes from research showing that content with a 7-minute read time — approximately 1,600–1,700 words — receives the most engagement. However, the optimal length depends heavily on topic and audience. For SEO-focused content targeting competitive keywords, 1,500–2,500 words is typical. For news articles and quick-answer posts, 300–700 words performs well. For in-depth guides and pillar content, 3,000–5,000+ words can outrank shorter competitors...",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the reading time estimate for different types of content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Accuracy varies significantly by content type. For general prose — blog posts, news articles, fiction — the estimate at 200 wpm is typically within 20% of actual reading time. For technical documentation, code-heavy tutorials, or academic papers, actual reading time is often 40–60% longer than the estimate because readers slow down to process complex information and may reread passages. For simple, familiar content like social media posts or light entertainment, readers often go faster than 200 wpm...",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this tool to estimate speaking or presentation time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool calculates a speaking time estimate at 150 words per minute (shown in the Word & Character Counter tool, which links to this one). A standard presentation pace is 120–150 wpm — slow enough for clear comprehension but natural-sounding. TED Talks average around 130 wpm. Conversational speech is faster at 150–180 wpm. Fast or excited speech reaches 200+ wpm. If you're preparing a speech, write your script, paste it here to check the reading time, then adjust: a 5-minute presentation needs approximately 750 words at 150 wpm. Add 15–20% padding for pauses, emphasis, and natural variation.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my reading time show seconds instead of minutes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When the word count is low enough that the estimated reading time falls below one minute, the tool displays the result in seconds for more precision — for example, '45s' rather than '1m'. This occurs for short content like social media captions, product descriptions, or brief excerpts. For content under 100 words, the seconds display is more useful than rounding up to '1 minute'. As your word count increases past the one-minute threshold, the display automatically switches to the minutes-and-seconds format (e.g. '1m 23s') and then to hours and minutes (e.g. '1h 15m') for very long documents.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Reading Time Estimator",
  description:
    "Step-by-step guide to using the free Reading Time Estimator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Reading Time Estimator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Reading Time Estimator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function ReadingTimeEstimatorPage() {
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
              href="/tools/category/writing-text-tools"
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
              Reading Time Estimator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">
          Free Text Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Reading Time Estimator — How Long Does It Take to Read Any Text?
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Paste any text and get an instant reading time estimate at your chosen
          WPM. Includes image time, multi-speed comparison, and full text
          statistics.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Reading Time Estimator tool">
          <ReadingTimeEstimatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="reading-time-estimator"
          toolName="Reading Time Estimator"
        />
      </SidebarAdLayout>
    </>
  );
}
