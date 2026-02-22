// src/app/tools/plagiarism-checker/page.tsx
import type { Metadata } from "next";
import PlagiarismCheckerClient from "./PlagiarismCheckerClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title:
    "Plagiarism Checker — Free Online Plagiarism Checker | Free Online Tools",
  description:
    "Detect duplicate content and plagiarism in your text. Free, instant, no signup required.",
  keywords:
    "plagiarism checker, free plagiarism checker, online plagiarism checker, plagiarism checker free, plagiarism checker online, writing tool, free online plagiarism checker, best plagiarism checker",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/plagiarism-checker` },
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
    url: `${SITE_URL}/tools/plagiarism-checker`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Plagiarism Checker — Free Online Plagiarism Checker",
    description:
      "Detect duplicate content and plagiarism in your text. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/og/plagiarism-checker.png`,
        width: 1200,
        height: 630,
        alt: "Free Online Plagiarism Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "Plagiarism Checker — Free Online Plagiarism Checker",
    description: "Detect duplicate content and plagiarism in your text.",
    images: [`${SITE_URL}/og/plagiarism-checker.png`],
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Plagiarism Checker",
  description: "Detect duplicate content and plagiarism in your text.",
  url: `${SITE_URL}/tools/plagiarism-checker`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
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
      name: "Writing Tools",
      item: `${SITE_URL}/?category=writing`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Plagiarism Checker",
      item: `${SITE_URL}/tools/plagiarism-checker`,
    },
  ],
};

export default function PlagiarismCheckerPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label='Breadcrumb' className='max-w-6xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-indigo-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/?category=writing'
              className='hover:text-indigo-600 transition-colors'
            >
              Writing Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Plagiarism Checker
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Writing Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Plagiarism Checker — Free Online Plagiarism Checker
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Detect duplicate content and plagiarism in your text. Free, instant,
          no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id='main-content' aria-label='Plagiarism Checker tool'>
          <PlagiarismCheckerClient />
        </main>

        {/* ── Zone G: below tool result — highest value placement ──────── */}
        {/* Sits immediately after the tool, before any editorial content   */}
        <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
          {/* desktop: rectangle 336×280; mobile: medium rectangle 300×250 */}
          <div className='hidden sm:block'>
            <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
          </div>
          <div className='block sm:hidden'>
            <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
          </div>
        </div>

        {/* ── Zone H: between tool + How To editorial ──────────────────── */}
        <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
          <AdSlot
            variant='leaderboard'
            slotId={SLOT_LEADERBOARD}
            className='hidden sm:flex'
          />
          <AdSlot
            variant='mediumrectangle'
            slotId={SLOT_LEADERBOARD}
            className='flex sm:hidden'
          />
        </div>

        {/* ── Editorial: How To + Related Tools ────────────────────────── */}
        <section
          aria-labelledby='about-plagiarism-checker'
          className='max-w-6xl mx-auto px-4 py-12'
        >
          <div className='bg-white rounded-2xl shadow-lg p-8 md:p-10'>
            <h2
              id='about-plagiarism-checker'
              className='text-2xl font-bold text-gray-900 mb-4'
            >
              How to Use This Free Plagiarism Checker
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              Our free online <strong>plagiarism checker</strong> is designed
              for speed and simplicity. Detect duplicate content and plagiarism
              in your text. No software installation or account is required —
              just use the tool above and get results instantly.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              All processing runs entirely in your browser. Your data is never
              sent to or stored on our servers. This tool is part of our{" "}
              <a
                href='/'
                className='text-indigo-600 hover:underline font-medium'
              >
                free online tools directory
              </a>{" "}
              — 60+ tools covering calculators, converters, generators, and
              social media utilities.
            </p>
          </div>

          {/* ── Zone I: related tools grid with native ad slot ──────────── */}
          <div className='mt-8'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>
              Related Free Writing Tools
            </h3>
            {/* 3-slot grid; the 4th card position (index 3) is reserved for */}
            {/* a native sponsored card — set data-ad-format="fluid" in AdSense */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {[
                {
                  href: "/tools/grammar-spell-checker",
                  label: "Grammar & Spell Checker",
                  desc: "Automatically correct grammar and spelling errors in your writing.",
                },
                {
                  href: "/tools/paraphrasing-tool",
                  label: "Paraphrasing Tool",
                  desc: "Rewrite any text in different words while preserving the original meaning.",
                },
                {
                  href: "/tools/text-difference-checker",
                  label: "Text Difference Checker",
                  desc: "Compare two pieces of text and highlight the differences instantly.",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='block bg-white rounded-xl shadow p-5 border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200'
                  aria-label={`${link.label} — ${link.desc}`}
                >
                  <div className='font-bold text-gray-900 text-sm mb-1'>
                    {link.label}
                  </div>
                  <div className='text-xs text-gray-500'>{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </SidebarAdLayout>
    </>
  );
}
