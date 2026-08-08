// src/app/tools/countdown-timer/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CountdownTimerClient = dynamic(() => import("./CountdownTimerClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "countdown-timer");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";
export const metadata: Metadata = {
  title: "Countdown Timer — Set a Timer Online, Free",
  description:
    "Set a countdown timer for any duration or target date. Alarm alert when time is up. Free, no signup, works in browser.",
  keywords:
    "countdown timer, online timer, timer online, countdown clock, set timer online, free countdown timer",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/countdown-timer` },
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
    url: `${SITE_URL}/tools/countdown-timer`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Countdown Timer — Set a Timer Online",
    description: "Free online countdown timer with alarm alert.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Countdown Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Countdown Timer",
    description: "Set a free online countdown timer. No signup.",
  },
};
const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Countdown Timer",
  description: "Set a countdown timer for any duration.",
  url: `${SITE_URL}/tools/countdown-timer`,
  applicationCategory: "UtilitiesApplication",
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
      name: "Productivity Tools",
      item: `${SITE_URL}/tools/category/productivity`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Countdown Timer",
      item: `${SITE_URL}/tools/countdown-timer`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Pomodoro Technique?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It involves working in 25-minute focused intervals (Pomodoros) separated by 5-minute short breaks, with a longer 15–30 minute break after every four Pomodoros. The 25-minute preset in this timer is specifically designed for Pomodoro sessions. Research supports short work sprints for maintaining concentration and reducing mental fatigue over long work periods.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use a countdown timer for studying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For studying, the most effective approach is fixed-interval timing. Set a 25–45 minute timer and commit to working only on one topic until it ends — no phone, no context switching. When the timer completes, take a genuine 5–10 minute break away from the screen. This method, supported by research on deliberate practice, helps build sustained concentration over time. Track how many focused sessions you complete per day for a concrete measure of productive study time.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a timer for cooking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — kitchen timing is one of the most practical uses. Set the timer for your cooking duration, add a label like 'Pasta' or 'Roast chicken', and keep the browser tab open. The tab shows the remaining time in the title, so you can monitor it while using other tabs. For recipes requiring multiple timers simultaneously, open the tool in multiple browser tabs.",
      },
    },
    {
      "@type": "Question",
      name: "Does the timer continue if I change browser tabs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the countdown uses JavaScript's setInterval which continues running in the background when you switch tabs. However, some mobile browsers aggressively suspend background tabs to save battery. For reliable background timing on mobile, keep the timer tab visible or adjust your browser's background activity settings. Desktop browsers are generally reliable for background timers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a countdown timer and a stopwatch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A countdown timer counts down from a set duration to zero — you define the end point. A stopwatch counts up from zero — you measure elapsed time. Use a countdown timer when you have a fixed duration to manage (cooking, work sprints, exam time limits). Use a stopwatch when you are measuring how long something takes without a predefined limit (running laps, task time tracking).",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Countdown Timer",
  description:
    "Step-by-step guide to using the free Countdown Timer on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Countdown Timer on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Countdown Timer provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};
export default function CountdownTimerPage() {
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
              href="/tools/category/business-productivity"
              className="hover:text-indigo-600 transition-colors"
            >
              Productivity
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Countdown Timer
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Productivity Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Countdown Timer — Set a Timer Online, Free
        </h1>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Countdown Timer tool">
          <CountdownTimerClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="countdown-timer" toolName="Countdown Timer" />
      </SidebarAdLayout>
    </>
  );
}
