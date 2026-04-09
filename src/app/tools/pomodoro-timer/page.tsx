// src/app/tools/pomodoro-timer/page.tsx
import type { Metadata } from "next";
import PomodoroTimerClient from "./PomodoroTimerClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

export const metadata: Metadata = {
  title: "Pomodoro Timer — Free Online Pomodoro Timer with Work/Break Intervals",
  description: "Stay focused with the Pomodoro Technique — customisable 25-minute work sessions, 5-minute short breaks, and 15-minute long breaks. Track completed sessions and adjust durations. Free, no signup.",
  keywords: "pomodoro timer, pomodoro technique, focus timer, work break timer, productivity timer, 25 minute timer, pomodoro clock, study timer",
  authors: [{ name: SITE_NAME, url: SITE_URL }], creator: SITE_NAME, publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/pomodoro-timer` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: `${SITE_URL}/tools/pomodoro-timer`, siteName: SITE_NAME, locale: "en_US", title: "Pomodoro Timer — Free Online Pomodoro Timer with Work/Break Intervals", description: "Pomodoro timer with customisable work/break durations. Tracks sessions, auto-advances modes, plays audio alert. Free, no signup.", images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Free Pomodoro Timer" }] },
  twitter: { card: "summary_large_image", site: "@onlinetoolbase", creator: "@onlinetoolbase", title: "Pomodoro Timer — Free Online Pomodoro Timer with Work/Break Intervals", description: "Pomodoro timer with work/break cycles, session tracking, and custom durations. Free." },
};

const toolJsonLd = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Pomodoro Timer", description: "Implements the Pomodoro Technique with three modes: Work (default 25 minutes), Short Break (5 minutes), and Long Break (15 minutes). Automatically advances to the next mode when a timer completes, tracks completed work sessions, plays an audio beep on completion, and allows customisation of all durations and the sessions-until-long-break threshold via a settings panel.", url: `${SITE_URL}/tools/pomodoro-timer`, applicationCategory: "WebApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Productivity Tools", item: `${SITE_URL}/tools/category/productivity` }, { "@type": "ListItem", position: 3, name: "Pomodoro Timer", item: `${SITE_URL}/tools/pomodoro-timer` }] };

export default function PomodoroTimerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-red-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/tools/category/productivity" className="hover:text-red-600 transition-colors">Productivity Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">Pomodoro Timer</span></li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">Free Productivity Tool · No Signup · Works Instantly</p>
        <h1 className="sr-only">Pomodoro Timer — Free Online Pomodoro Timer with Work/Break Intervals</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">Stay focused with the Pomodoro Technique — 25-minute work sessions, 5-minute breaks, customisable durations, and session tracking.</p>
      </header>
      <SidebarAdLayout>
        <main id="main-content" aria-label="Pomodoro Timer tool"><PomodoroTimerClient /></main>
        <PageEditorial />
              <ToolEngagement toolSlug="pomodoro-timer" toolName="Pomodoro Timer" />
      </SidebarAdLayout>
    </>
  );
}