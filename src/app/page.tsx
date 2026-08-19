// src/app/page.tsx
// SERVER COMPONENT — exports metadata, renders JSON-LD and all static content.
// Interactive search/filter lives in HomeClient.tsx ("use client").

import type { Metadata } from "next";
//import Link from "next/link";
import { tools } from "@/lib/tools";
import HomeClient from "./HomeClient";
import RecentBlogPosts from "@/components/RecentBlogPosts";
/* ─── Config ─────────────────────────────────────────────────────────────── */

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.utilvia.com";
const SITE_NAME = "Utilvia";

const TWITTER = "@utilvia";
const TOOL_COUNT = tools.length; // real count, not hardcoded

/* ─── Metadata (works because this file has NO "use client") ─────────────── */

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${TOOL_COUNT}+ Free Calculators, Converters & Generators`,
  description: `Access ${TOOL_COUNT}+ Calculators, Pdf Tools & More — BMI calculators, currency converters, QR code generators, password tools, social media utilities, and more. No signup, no download, 100% free forever.`,
  keywords:
    "Calculators, Pdf Tools & More, calculators, converters, generators, utilities, BMI calculator, currency converter, password generator, QR code generator",
  alternates: { canonical: SITE_URL },
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
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — ${TOOL_COUNT}+ Calculators, Pdf Tools & More`,
    description: `${TOOL_COUNT}+ Calculators, Pdf Tools & More — calculators, converters, generators & more. No signup, no download, 100% free.`,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Calculators, Pdf Tools & More Directory`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER,
    creator: TWITTER,
    title: `${SITE_NAME} — ${TOOL_COUNT}+ Calculators, Pdf Tools & More`,
    description: `${TOOL_COUNT}+ Calculators, Pdf Tools & More. No signup required.`,
  },
};

/* ─── JSON-LD (computed server-side, not on every client render) ──────────── */

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: `${TOOL_COUNT}+ Calculators, Pdf Tools & More — calculators, converters, generators & more. No signup required.`,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Provider of free online productivity, health, finance, and developer tools.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "support@utilvia.com",
      contactType: "customer support",
    },
    {
      "@type": "ContactPoint",
      email: "business@utilvia.com",
      contactType: "business",
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Calculators, Pdf Tools & More Directory",
  description: "A comprehensive directory of Calculators, Pdf Tools & More.",
  numberOfItems: TOOL_COUNT,
  itemListElement: tools.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/tools/${tool.slug}`,
    name: tool.name,
    description: tool.description,
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are these tools really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every tool is free with no hidden costs, subscriptions, or premium tiers. Use them as often as you like.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account needed. Click any tool and start immediately — no email, no password, no friction.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data safe and private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All tools run entirely in your browser. Nothing is sent to or stored on our servers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these tools on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every tool is fully responsive and tested on phones, tablets, and desktops.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer social media tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we have platform-specific tools for Instagram, TikTok, X (Twitter), LinkedIn, YouTube, and Facebook, plus general social media utilities.",
      },
    },
  ],
};

const ALL_CATEGORIES = Array.from(new Set(tools.map((t) => t.category))).sort();

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── Structured data (server-rendered, present at crawl time) ───── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-purple-50">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center"
          aria-labelledby="hero-heading"
        >
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
          >
            {TOOL_COUNT}+ Calculators, Pdf Tools & More —
            <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Calculators, Converters &amp; Generators
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Access {TOOL_COUNT}+ professional-grade Calculators, Pdf Tools &
            More — from BMI calculators and currency converters to password
            generators, QR code makers, and social media tools. No signup, no
            download, 100% free forever.
          </p>

          {/* Stats */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {(
              [
                {
                  value: `${TOOL_COUNT}+`,
                  label: "Free Tools",
                  color: "text-indigo-600",
                },
                {
                  value: `${ALL_CATEGORIES.length}`,
                  label: "Categories",
                  color: "text-purple-600",
                },
                { value: "0", label: "Signups Needed", color: "text-pink-600" },
                { value: "∞", label: "Usage Limit", color: "text-blue-600" },
              ] as const
            ).map((s) => (
              <div key={s.label} className="bg-white rounded-2xl shadow-lg p-6">
                <dt className={`text-4xl font-bold ${s.color}`}>{s.value}</dt>
                <dd className="text-sm text-gray-600 mt-1">{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Client shell: category filter + tools grid ───────────────── */}
        <HomeClient />
        <RecentBlogPosts />
        {/* ── Why Us ───────────────────────────────────────────────────── */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          aria-labelledby="why-heading"
        >
          <h2
            id="why-heading"
            className="text-4xl font-bold text-gray-900 mb-4 text-center"
          >
            Why Use Our Calculators, Pdf Tools & More?
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Built for speed, privacy, and ease — professional results with zero
            friction.
          </p>
          <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {(
              [
                {
                  title: "Lightning Fast",
                  desc: "Instant results — no loading screens or server round-trips",
                  gradient: "from-blue-500 to-indigo-600",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                },
                {
                  title: "100% Private",
                  desc: "Everything runs in your browser — your data never leaves your device",
                  gradient: "from-green-500 to-emerald-600",
                  icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                },
                {
                  title: "Mobile Friendly",
                  desc: "Fully responsive — works great on phones, tablets and desktops",
                  gradient: "from-purple-500 to-pink-600",
                  icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                },
                {
                  title: "No Account Needed",
                  desc: "Click a tool and start — no signup, no email, no password",
                  gradient: "from-orange-500 to-red-600",
                  icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5",
                },
              ] as const
            ).map((f) => (
              <li key={f.title} className="text-center group list-none">
                <div
                  className={`w-16 h-16 bg-linear-to-br ${f.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={f.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600">{f.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section
          id="faq"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          aria-labelledby="faq-heading"
        >
          <h2
            id="faq-heading"
            className="text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            {[
              {
                q: "Are these tools really free?",
                a: "Yes — every tool on Online Tool Base is completely free with no hidden costs, subscriptions, or premium tiers. There's no freemium model where basic features are locked behind a paywall. Every feature of every tool is available to everyone, every time.",
              },
              {
                q: "Do I need to create an account?",
                a: "No account needed, ever. Click any tool and start using it immediately — no email address, no password, no credit card, no friction. We built the site specifically so you can get straight to work without any sign-up barriers.",
              },
              {
                q: "Is my data safe and private?",
                a: "Yes. All processing happens entirely in your browser using JavaScript — nothing you type, paste, or upload is sent to our servers. This means your text, files, passwords, and personal data never leave your device. This is especially important for sensitive tools like the Password Generator, Hash Generator, JWT Decoder, and any text-based tools you use with private content.",
              },
              {
                q: "Can I use these tools on mobile?",
                a: "Yes — every tool is fully responsive and works on phones, tablets, and desktops. We test across iOS and Android browsers. Some tools (like the image compressor and file converters) may be slower on older phones due to device processing power, but they will work.",
              },
              {
                q: "How many tools do you have?",
                a: "Over 80 tools across nine categories: Writing & Text, Developer & Code, Calculators & Finance, Social Media, Image & Media, Security & Privacy, Health & Fitness, Business & Productivity, and Everyday Utilities. We add new tools regularly — check the tools page for the latest additions.",
              },
              {
                q: "Do you have social media tools?",
                a: "Yes — we have a dedicated Social Media category with platform-specific tools for Instagram, TikTok, X (Twitter), LinkedIn, YouTube, and Facebook. This includes a Hashtag Generator, Engagement Rate Calculator, Caption Generator, Bio Generator, Social Media Character Counter, LinkedIn Post Formatter, and YouTube Title & Description Generator.",
              },
              {
                q: "What developer tools do you offer?",
                a: "The Developer & Code category covers the daily utilities most developers reach for constantly: JSON Formatter & Validator, Base64 Encoder/Decoder, URL Encoder/Decoder, JWT Decoder, Hash Generator (MD5, SHA-1, SHA-256, SHA-512), Regex Tester, UUID/GUID Generator, Cron Expression Builder, Markdown to HTML Converter, HTML Entity Encoder, and more.",
              },
              {
                q: "What's the difference between your tools and just using Google?",
                a: "Google can give you a formula or explain a concept — it can't run the calculation for you with your specific numbers. Our tools take your input and produce an immediate, accurate result: your compound interest over 15 years, your actual engagement rate, your specific BMI, the compressed version of your actual image. They're purpose-built for doing, not just reading.",
              },
              {
                q: "Do your tools work offline?",
                a: "Most tools will continue to work if you lose your internet connection mid-session, since the processing runs in your browser rather than on a server. However, you do need an internet connection to load the page initially. If you need offline access regularly, bookmark the tool pages while you're online.",
              },
              {
                q: "Can I embed or link to your tools?",
                a: "Yes — every tool has a permanent, shareable URL you can bookmark, link to, or share with others. We don't currently offer embeddable widgets, but if that's something you'd find useful, let us know via the contact page.",
              },
              {
                q: "How do you make money if everything is free?",
                a: "Online Tool Base is supported by non-intrusive display advertising. Ads appear on the page but never interrupt your workflow — we don't use pop-ups, auto-playing video ads, or interstitials. The tools themselves are always the focus of the page. If you use an ad blocker, the tools will still work perfectly.",
              },
              {
                q: "I found a bug or a tool isn't working — what should I do?",
                a: "Please let us know via the Contact page. Include the tool name, what you were trying to do, and which browser and device you're using. We fix reported bugs quickly. If a tool is producing unexpected results, double-check the input format — many tools have specific formatting requirements described in the tool's instructions.",
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl shadow-lg p-8">
                <dt className="text-xl font-bold text-gray-900 mb-3">
                  {faq.q}
                </dt>
                <dd className="text-gray-600 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
