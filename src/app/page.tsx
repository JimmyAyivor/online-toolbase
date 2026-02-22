// src/app/page.tsx
// SERVER COMPONENT — exports metadata, renders JSON-LD and all static content.
// Interactive search/filter lives in HomeClient.tsx ("use client").

import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";
import HomeClient from "./HomeClient";

/* ─── Config ─────────────────────────────────────────────────────────────── */

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";
const TWITTER = "@onlinetoolbase";
const TOOL_COUNT = tools.length; // real count, not hardcoded

/* ─── Metadata (works because this file has NO "use client") ─────────────── */

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${TOOL_COUNT}+ Free Calculators, Converters & Generators`,
  description: `Access ${TOOL_COUNT}+ free online tools — BMI calculators, currency converters, QR code generators, password tools, social media utilities, and more. No signup, no download, 100% free forever.`,
  keywords:
    "free online tools, calculators, converters, generators, utilities, BMI calculator, currency converter, password generator, QR code generator",
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
    title: `${SITE_NAME} — ${TOOL_COUNT}+ Free Online Tools`,
    description: `${TOOL_COUNT}+ free online tools — calculators, converters, generators & more. No signup, no download, 100% free.`,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og/home.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Free Online Tools Directory`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER,
    creator: TWITTER,
    title: `${SITE_NAME} — ${TOOL_COUNT}+ Free Online Tools`,
    description: `${TOOL_COUNT}+ free online tools. No signup required.`,
    images: [`${SITE_URL}/og/home.png`],
  },
};

/* ─── JSON-LD (computed server-side, not on every client render) ──────────── */

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: `${TOOL_COUNT}+ free online tools — calculators, converters, generators & more. No signup required.`,
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
      email: "support@onlinetoolbase.com",
      contactType: "customer support",
    },
    {
      "@type": "ContactPoint",
      email: "business@onlinetoolbase.com",
      contactType: "business",
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Tools Directory",
  description: "A comprehensive directory of free online tools.",
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

/* ─── Static data for the footer ────────────────────────────────────────────*/

const FEATURED_SLUGS = [
  "bmi-calculator",
  "password-generator",
  "qr-code-generator",
  "currency-converter",
  "hashtag-generator",
  "instagram-post-planner",
];

const ALL_CATEGORIES = Array.from(new Set(tools.map((t) => t.category))).sort();

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── Structured data (server-rendered, present at crawl time) ───── */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50'>
        {/* ── Header ───────────────────────────────────────────────────── */}
        <header className='bg-white shadow-sm sticky top-0 z-50' role='banner'>
          <nav
            className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'
            aria-label='Main navigation'
          >
            <Link
              href='/'
              className='flex items-center gap-3'
              aria-label='Free Online Tools — Home'
            >
              <div
                className='w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center'
                aria-hidden='true'
              >
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <span className='text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                Free Online Tools
              </span>
            </Link>
            <div className='hidden md:flex items-center gap-6'>
              <a
                href='#categories'
                className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
              >
                Categories
              </a>
              <a
                href='#tools'
                className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
              >
                All Tools
              </a>
              <a
                href='#faq'
                className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
              >
                FAQ
              </a>
              <Link
                href='/contact'
                className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
              >
                Contact
              </Link>
            </div>
          </nav>
        </header>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center'
          aria-labelledby='hero-heading'
        >
          <h1
            id='hero-heading'
            className='text-5xl md:text-6xl font-extrabold text-gray-900 mb-6'
          >
            {TOOL_COUNT}+ Free Online Tools —
            <span className='block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2'>
              Calculators, Converters &amp; Generators
            </span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-12'>
            Access {TOOL_COUNT}+ professional-grade free online tools — from BMI
            calculators and currency converters to password generators, QR code
            makers, and social media tools. No signup, no download, 100% free
            forever.
          </p>

          {/* Stats */}
          <dl className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
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
              <div key={s.label} className='bg-white rounded-2xl shadow-lg p-6'>
                <dt className={`text-4xl font-bold ${s.color}`}>{s.value}</dt>
                <dd className='text-sm text-gray-600 mt-1'>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Client shell: category filter + tools grid ───────────────── */}
        <HomeClient />

        {/* ── Why Us ───────────────────────────────────────────────────── */}
        <section
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'
          aria-labelledby='why-heading'
        >
          <h2
            id='why-heading'
            className='text-4xl font-bold text-gray-900 mb-4 text-center'
          >
            Why Use Our Free Online Tools?
          </h2>
          <p className='text-center text-gray-500 mb-12 max-w-2xl mx-auto'>
            Built for speed, privacy, and ease — professional results with zero
            friction.
          </p>
          <ul className='grid md:grid-cols-2 lg:grid-cols-4 gap-8' role='list'>
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
              <li key={f.title} className='text-center group list-none'>
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  aria-hidden='true'
                >
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d={f.icon}
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {f.title}
                </h3>
                <p className='text-gray-600'>{f.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section
          id='faq'
          className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'
          aria-labelledby='faq-heading'
        >
          <h2
            id='faq-heading'
            className='text-4xl font-bold text-gray-900 mb-12 text-center'
          >
            Frequently Asked Questions
          </h2>
          <dl className='space-y-6'>
            {[
              {
                q: "Are these tools really free?",
                a: "Yes — every tool is free with no hidden costs, subscriptions, or premium tiers. Use them as often as you like.",
              },
              {
                q: "Do I need to create an account?",
                a: "No account needed. Click any tool and start immediately — no email, no password, no friction.",
              },
              {
                q: "Is my data safe and private?",
                a: "Absolutely. All tools run entirely in your browser. Nothing is sent to or stored on our servers.",
              },
              {
                q: "Can I use these tools on mobile?",
                a: "Yes — every tool is fully responsive and tested on phones, tablets, and desktops.",
              },
              {
                q: "Do you have social media tools?",
                a: "Yes — we have platform-specific tools for Instagram, TikTok, X (Twitter), LinkedIn, YouTube, and Facebook, plus a hashtag generator, engagement calculator, bio generator, and more.",
              },
            ].map((faq) => (
              <div key={faq.q} className='bg-white rounded-2xl shadow-lg p-8'>
                <dt className='text-xl font-bold text-gray-900 mb-3'>
                  {faq.q}
                </dt>
                <dd className='text-gray-600 leading-relaxed'>{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className='bg-gray-900 text-white mt-24' role='contentinfo'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid md:grid-cols-4 gap-8 mb-8'>
              {/* Brand */}
              <div className='md:col-span-1'>
                <Link
                  href='/'
                  className='flex items-center gap-3 mb-4'
                  aria-label='Free Online Tools — Home'
                >
                  <div
                    className='w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center'
                    aria-hidden='true'
                  >
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 10V3L4 14h7v7l9-11h-7z'
                      />
                    </svg>
                  </div>
                  <span className='text-xl font-bold'>Free Online Tools</span>
                </Link>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  {TOOL_COUNT}+ free online tools for productivity, health,
                  finance, development, social media, and more. No signup. No
                  cost.
                </p>
              </div>

              {/* Popular Tools — <Link> not <button> so they are crawlable */}
              <nav aria-label='Popular tools'>
                <h3 className='font-bold mb-4 text-white'>Popular Tools</h3>
                <ul className='space-y-2 text-gray-400'>
                  {FEATURED_SLUGS.map((slug) => {
                    const tool = tools.find((t) => t.slug === slug);
                    return tool ? (
                      <li key={slug}>
                        <Link
                          href={`/tools/${slug}`}
                          className='hover:text-white transition-colors text-sm'
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </nav>

              {/* Categories — <Link href> so they are crawlable */}
              <nav aria-label='Tool categories'>
                <h3 className='font-bold mb-4 text-white'>Categories</h3>
                <ul className='space-y-2 text-gray-400 columns-2'>
                  {ALL_CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/tools/category/${cat.toLowerCase()}`}
                        className='hover:text-white transition-colors text-sm'
                      >
                        {cat
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Legal — links to the new legal pages */}
              <nav aria-label='Legal and support'>
                <h3 className='font-bold mb-4 text-white'>
                  Legal &amp; Support
                </h3>
                <ul className='space-y-2 text-gray-400'>
                  {[
                    { href: "/privacy-policy", label: "Privacy Policy" },
                    { href: "/terms-of-service", label: "Terms of Service" },
                    { href: "/disclaimer", label: "Disclaimer" },
                    { href: "/contact", label: "Contact Us" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className='hover:text-white transition-colors text-sm'
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className='border-t border-gray-800 pt-8 text-center text-gray-400 text-sm'>
              <p>
                &copy; {new Date().getFullYear()} Free Online Tools. All rights
                reserved.
              </p>
              <p className='mt-2 text-gray-600'>
                {TOOL_COUNT}+ free tools — calculators, converters, generators
                &amp; more. No signup required.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
