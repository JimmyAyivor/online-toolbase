// src/app/tools/pomodoro-timer/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "pomodoro-timer");

const PomodoroTimerClient = dynamic(() => import("./PomodoroTimerClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Pomodoro Timer — Work & Break Intervals Online",
  description:
    "Stay focused with the Pomodoro Technique — customisable 25-minute work sessions, 5-minute short breaks, and 15-minute long breaks. Track completed sessions and adjust durations. Free, no signup.",
  keywords:
    "pomodoro timer, pomodoro technique, focus timer, work break timer, productivity timer, 25 minute timer, pomodoro clock, study timer",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/pomodoro-timer` },
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
    url: `${SITE_URL}/tools/pomodoro-timer`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Pomodoro Timer — Work & Break Intervals Online",
    description:
      "Pomodoro timer with customisable work/break durations. Tracks sessions, auto-advances modes, plays audio alert. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Pomodoro Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Pomodoro Timer — Work & Break Intervals Online",
    description:
      "Pomodoro timer with work/break cycles, session tracking, and custom durations. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pomodoro Timer",
  description:
    "Implements the Pomodoro Technique with three modes: Work (default 25 minutes), Short Break (5 minutes), and Long Break (15 minutes). Automatically advances to the next mode when a timer completes, tracks completed work sessions, plays an audio beep on completion, and allows customisation of all durations and the sessions-until-long-break threshold via a settings panel.",
  url: `${SITE_URL}/tools/pomodoro-timer`,
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
      name: "Productivity Tools",
      item: `${SITE_URL}/tools/category/productivity`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Pomodoro Timer",
      item: `${SITE_URL}/tools/pomodoro-timer`,
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
        text: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The method uses a timer to break work into 25-minute focused intervals (called 'Pomodoros' after the Italian word for tomato, from the tomato-shaped kitchen timer Cirillo used as a student) separated by short breaks. The standard sequence is: 25 minutes of focused work, 5-minute short break, repeat for 4 cycles, then take a longer 15-minute break...",
      },
    },
    {
      "@type": "Question",
      name: "Why 25 minutes? Can I change the interval length?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cirillo originally chose 25 minutes as the interval duration based on his observation that this was a sustainable focus period for most tasks before mental fatigue set in. Research since then has varied on the 'optimal' focus window — some studies suggest 52-minute work periods with 17-minute breaks (the popular '52/17' variation), others suggest 90-minute 'ultradian rhythm' cycles. The most important principle is consistency: whatever interval length you choose, maintaining it regularly across multiple sessions is more important than the specific duration...",
      },
    },
    {
      "@type": "Question",
      name: "When should I take a break if I'm in flow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Pomodoro Technique is intentionally prescriptive — you end the session when the timer goes off even if you're mid-task. This is by design: the end of a Pomodoro is meant to be a hard stop, and making a note of where you are before taking the break. The reasoning is that enforcing breaks prevents the kind of unrecognised mental fatigue that degrades work quality without feeling tiring. If you find yourself consistently in flow when the timer goes off, consider extending your work interval to 35 or 45 minutes in settings — the underlying principle matters more than the specific number.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do during a Pomodoro break?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Short breaks (5 minutes) should involve complete disconnection from work: stand up and move around, stretch, look out a window at a distant point (helps eye strain from screens), get water or a snack, or simply breathe. Avoid checking work emails, social media, or news during short breaks — these activities engage the same prefrontal cortex activity as work and don't provide the cognitive rest the break is meant to deliver. Long breaks (15 minutes) allow for a more complete rest: a short walk outside, a conversation with a colleague or friend, light exercise, or simple relaxation...",
      },
    },
    {
      "@type": "Question",
      name: "Does the Pomodoro Technique work for creative or collaborative work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The technique works well for tasks with clear deliverables and independent execution — writing, coding, studying, analysis, and design work. It is less suitable for collaborative work requiring continuous communication, meetings, or creative sessions where interruptions break the creative flow in ways that are difficult to resume. Many professionals use a hybrid approach: Pomodoros for deep independent work and unstructured time for collaborative or creative sessions. Some creatives extend intervals to 50–90 minutes for creative work while keeping the break structure...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Pomodoro Timer",
  description:
    "Step-by-step guide to using the free Pomodoro Timer on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Pomodoro Timer on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Pomodoro Timer provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function PomodoroTimerPage() {
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
              Productivity Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Pomodoro Timer
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
          Free Productivity Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Pomodoro Timer — Free Online Pomodoro Timer with Work/Break Intervals
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Stay focused with the Pomodoro Technique — 25-minute work sessions,
          5-minute breaks, customisable durations, and session tracking.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Pomodoro Timer tool">
          <PomodoroTimerClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="pomodoro-timer" toolName="Pomodoro Timer" />
      </SidebarAdLayout>
    </>
  );
}
