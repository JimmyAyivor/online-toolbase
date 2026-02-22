"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools";

/* ─────────────────────────────────────────────
   CATEGORY META  (icon + color per category)
───────────────────────────────────────────── */
const categoryMeta: Record<
  string,
  { color: ColorKey; icon: string; description: string }
> = {
  Writing: {
    color: "blue",
    description: "Text editing, paraphrasing & writing utilities",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
  Developer: {
    color: "indigo",
    description: "JSON, Base64, regex, hashing & dev utilities",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  Image: {
    color: "purple",
    description: "Crop, compress, convert & edit images",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  Calculator: {
    color: "emerald",
    description: "Financial, unit & lifestyle calculators",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  Productivity: {
    color: "sky",
    description: "Timers, converters & focus tools",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  Security: {
    color: "red",
    description: "Password generation & security tools",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  Business: {
    color: "slate",
    description: "Invoices, resumes & business documents",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  Document: {
    color: "amber",
    description: "PDF merging, splitting & document tools",
    icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  Health: {
    color: "green",
    description: "BMI, calorie & health calculators",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  Education: {
    color: "violet",
    description: "GPA, study & academic tools",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  Finance: {
    color: "teal",
    description: "Currency, tax & financial converters",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c1.11 0 2.08-.402 2.599-1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  Fun: {
    color: "yellow",
    description: "Meme makers, dice rollers & fun generators",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  Design: {
    color: "pink",
    description: "Color palettes, hex codes & design tools",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  },
};
const defaultMeta = {
  color: "indigo" as ColorKey,
  icon: "M13 10V3L4 14h7v7l9-11h-7z",
  description: "Free online tool",
};

/* ─────────────────────────────────────────────
   COLOR MAP
───────────────────────────────────────────── */
type ColorKey =
  | "indigo"
  | "blue"
  | "purple"
  | "green"
  | "cyan"
  | "emerald"
  | "red"
  | "fuchsia"
  | "slate"
  | "yellow"
  | "sky"
  | "violet"
  | "rose"
  | "amber"
  | "teal"
  | "pink";

const colorMap: Record<
  ColorKey,
  {
    text: string;
    border: string;
    iconBg: string;
    catBg: string;
    hoverBorder: string;
    activeBg: string;
  }
> = {
  indigo: {
    text: "text-indigo-600",
    border: "border-indigo-200",
    iconBg: "bg-indigo-600",
    catBg: "bg-indigo-50",
    hoverBorder: "hover:border-indigo-400",
    activeBg: "bg-indigo-600",
  },
  blue: {
    text: "text-blue-600",
    border: "border-blue-200",
    iconBg: "bg-blue-600",
    catBg: "bg-blue-50",
    hoverBorder: "hover:border-blue-400",
    activeBg: "bg-blue-600",
  },
  purple: {
    text: "text-purple-600",
    border: "border-purple-200",
    iconBg: "bg-purple-600",
    catBg: "bg-purple-50",
    hoverBorder: "hover:border-purple-400",
    activeBg: "bg-purple-600",
  },
  green: {
    text: "text-green-600",
    border: "border-green-200",
    iconBg: "bg-green-600",
    catBg: "bg-green-50",
    hoverBorder: "hover:border-green-400",
    activeBg: "bg-green-600",
  },
  cyan: {
    text: "text-cyan-600",
    border: "border-cyan-200",
    iconBg: "bg-cyan-600",
    catBg: "bg-cyan-50",
    hoverBorder: "hover:border-cyan-400",
    activeBg: "bg-cyan-600",
  },
  emerald: {
    text: "text-emerald-600",
    border: "border-emerald-200",
    iconBg: "bg-emerald-600",
    catBg: "bg-emerald-50",
    hoverBorder: "hover:border-emerald-400",
    activeBg: "bg-emerald-600",
  },
  red: {
    text: "text-red-600",
    border: "border-red-200",
    iconBg: "bg-red-600",
    catBg: "bg-red-50",
    hoverBorder: "hover:border-red-400",
    activeBg: "bg-red-600",
  },
  fuchsia: {
    text: "text-fuchsia-600",
    border: "border-fuchsia-200",
    iconBg: "bg-fuchsia-600",
    catBg: "bg-fuchsia-50",
    hoverBorder: "hover:border-fuchsia-400",
    activeBg: "bg-fuchsia-600",
  },
  slate: {
    text: "text-slate-600",
    border: "border-slate-200",
    iconBg: "bg-slate-600",
    catBg: "bg-slate-50",
    hoverBorder: "hover:border-slate-400",
    activeBg: "bg-slate-600",
  },
  yellow: {
    text: "text-yellow-600",
    border: "border-yellow-200",
    iconBg: "bg-yellow-600",
    catBg: "bg-yellow-50",
    hoverBorder: "hover:border-yellow-400",
    activeBg: "bg-yellow-600",
  },
  sky: {
    text: "text-sky-600",
    border: "border-sky-200",
    iconBg: "bg-sky-600",
    catBg: "bg-sky-50",
    hoverBorder: "hover:border-sky-400",
    activeBg: "bg-sky-600",
  },
  violet: {
    text: "text-violet-600",
    border: "border-violet-200",
    iconBg: "bg-violet-600",
    catBg: "bg-violet-50",
    hoverBorder: "hover:border-violet-400",
    activeBg: "bg-violet-600",
  },
  rose: {
    text: "text-rose-600",
    border: "border-rose-200",
    iconBg: "bg-rose-600",
    catBg: "bg-rose-50",
    hoverBorder: "hover:border-rose-400",
    activeBg: "bg-rose-600",
  },
  amber: {
    text: "text-amber-600",
    border: "border-amber-200",
    iconBg: "bg-amber-600",
    catBg: "bg-amber-50",
    hoverBorder: "hover:border-amber-400",
    activeBg: "bg-amber-600",
  },
  teal: {
    text: "text-teal-600",
    border: "border-teal-200",
    iconBg: "bg-teal-600",
    catBg: "bg-teal-50",
    hoverBorder: "hover:border-teal-400",
    activeBg: "bg-teal-600",
  },
  pink: {
    text: "text-pink-600",
    border: "border-pink-200",
    iconBg: "bg-pink-600",
    catBg: "bg-pink-50",
    hoverBorder: "hover:border-pink-400",
    activeBg: "bg-pink-600",
  },
};

function getColors(category: string) {
  const meta = categoryMeta[category] ?? defaultMeta;
  return { ...colorMap[meta.color], icon: meta.icon };
}

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */
const SITE_URL = "https://yourdomain.com"; // ← update this
const allCategories = Array.from(new Set(tools.map((t) => t.category))).sort();
const featuredSlugs = [
  "bmi-calculator",
  "password-generator",
  "qr-code-generator",
  "currency-converter",
];

const faqs = [
  {
    question: "Are these tools really free?",
    answer:
      "Yes — every tool is free with no hidden costs, subscriptions, or premium tiers. Use them as often as you like.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed. Click any tool and start immediately — no email, no password, no friction.",
  },
  {
    question: "Is my data safe and private?",
    answer:
      "Absolutely. All tools run entirely in your browser. Nothing is sent to or stored on our servers.",
  },
  {
    question: "Can I use these tools on mobile?",
    answer:
      "Yes — every tool is fully responsive and tested on phones, tablets, and desktops.",
  },
];

/* ─────────────────────────────────────────────
   JSON-LD helpers
───────────────────────────────────────────── */
function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Free Online Tools",
    url: SITE_URL,
    description: `${tools.length}+ free online tools — calculators, converters, generators & more. No signup required.`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function buildItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Online Tools Directory",
    description: "A comprehensive directory of free online tools.",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/tools/${tool.slug}`,
      name: tool.name,
      description: tool.description,
    })),
  };
}

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Free Online Tools",
    url: SITE_URL,
    description: "Provider of free online productivity tools.",
  };
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function Page() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = useMemo(
    () =>
      tools.filter((t) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q);
        const matchCat = !activeCategory || t.category === activeCategory;
        return matchSearch && matchCat;
      }),
    [search, activeCategory],
  );

  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = {};
    tools.forEach((t) => {
      c[t.category] = (c[t.category] ?? 0) + 1;
    });
    return c;
  }, []);

  const scrollToTools = () =>
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── Structured Data ─────────────────────────────── */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebsiteJsonLd()),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildItemListJsonLd()),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd()) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd()),
        }}
      />

      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50'>
        {/* ── Header ──────────────────────────────────────── */}
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
                href='#tools'
                className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
              >
                All Tools
              </a>
              <a
                href='#categories'
                className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
              >
                Categories
              </a>
              <a
                href='#faq'
                className='text-gray-700 hover:text-indigo-600 font-medium transition-colors'
              >
                FAQ
              </a>
            </div>
          </nav>
        </header>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center'
          aria-labelledby='hero-heading'
        >
          {/* Primary H1 — keyword-rich, descriptive */}
          <h1
            id='hero-heading'
            className='text-5xl md:text-6xl font-extrabold text-gray-900 mb-6'
          >
            {tools.length}+ Free Online Tools —
            <span className='block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2'>
              Calculators, Converters &amp; Generators
            </span>
          </h1>

          {/* Meta-description-quality intro — also renders in HTML for crawlers */}
          <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            Access {tools.length}+ professional-grade free online tools — from
            BMI calculators and currency converters to password generators and
            QR code makers. No signup, no download, 100% free forever.
          </p>

          {/* Search — labelled for accessibility & crawlability */}
          <div className='max-w-2xl mx-auto mb-12' role='search'>
            <label htmlFor='tool-search' className='sr-only'>
              Search free online tools
            </label>
            <div className='relative'>
              <input
                id='tool-search'
                type='search'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveCategory(null);
                }}
                placeholder='Search tools — e.g. BMI calculator, QR code generator, currency converter…'
                aria-label='Search free online tools'
                className='w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all'
              />
              <svg
                className='absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <dl className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
            {(
              [
                {
                  value: `${tools.length}+`,
                  label: "Free Tools",
                  color: "text-indigo-600",
                },
                {
                  value: `${allCategories.length}`,
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

        {/* ── Categories ───────────────────────────────────── */}
        <section
          id='categories'
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'
          aria-labelledby='categories-heading'
        >
          <h2
            id='categories-heading'
            className='text-4xl font-bold text-gray-900 mb-4 text-center'
          >
            Browse Free Tools by Category
          </h2>
          <p className='text-center text-gray-500 mb-12 max-w-2xl mx-auto'>
            {allCategories.length} categories covering writing, development,
            design, health, finance, and more.
          </p>

          <ul
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            role='list'
          >
            {/* All */}
            <li>
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setSearch("");
                  scrollToTools();
                }}
                aria-pressed={activeCategory === null}
                aria-label='Show all tools'
                className={`w-full rounded-2xl shadow p-5 border-2 text-left hover:-translate-y-1 transition-all duration-300 ${
                  activeCategory === null
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-600 text-white"
                    : "bg-white border-gray-200 hover:border-indigo-300 text-gray-700"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeCategory === null ? "bg-white/20" : "bg-indigo-100"}`}
                  aria-hidden='true'
                >
                  <svg
                    className={`w-5 h-5 ${activeCategory === null ? "text-white" : "text-indigo-600"}`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 10h16M4 14h16M4 18h16'
                    />
                  </svg>
                </div>
                <span className='font-bold text-sm block'>All Tools</span>
                <span
                  className={`text-xs mt-1 block ${activeCategory === null ? "text-white/80" : "text-gray-500"}`}
                >
                  {tools.length} tools
                </span>
              </button>
            </li>

            {allCategories.map((cat) => {
              const c = getColors(cat);
              const meta = categoryMeta[cat] ?? defaultMeta;
              const isActive = activeCategory === cat;
              return (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setActiveCategory(isActive ? null : cat);
                      setSearch("");
                      scrollToTools();
                    }}
                    aria-pressed={isActive}
                    aria-label={`Filter by ${cat} — ${categoryCounts[cat] ?? 0} tools`}
                    title={meta.description}
                    className={`w-full rounded-2xl shadow p-5 border-2 text-left hover:-translate-y-1 transition-all duration-300 ${
                      isActive
                        ? `${c.activeBg} border-transparent text-white`
                        : `${c.catBg} ${c.border} text-gray-700 hover:shadow-lg`
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isActive ? "bg-white/20" : c.iconBg}`}
                      aria-hidden='true'
                    >
                      <svg
                        className='w-5 h-5 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d={c.icon}
                        />
                      </svg>
                    </div>
                    <span className='font-bold text-sm block'>{cat}</span>
                    <span
                      className={`text-xs mt-1 block ${isActive ? "text-white/80" : "text-gray-500"}`}
                    >
                      {categoryCounts[cat] ?? 0} tools
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── Tools Grid ───────────────────────────────────── */}
        <section
          id='tools'
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-3xl shadow-xl mb-16'
          aria-labelledby='tools-heading'
          aria-live='polite'
          aria-atomic='true'
        >
          <div className='flex items-center justify-between mb-4 flex-wrap gap-4'>
            <h2 id='tools-heading' className='text-4xl font-bold text-gray-900'>
              {activeCategory
                ? `${activeCategory} Tools`
                : "All Free Online Tools"}
            </h2>
            <span
              className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium'
              aria-live='polite'
            >
              {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Per-category description — keyword-rich, visible to crawlers */}
          <p className='text-gray-600 mb-12 max-w-2xl'>
            {activeCategory && categoryMeta[activeCategory]
              ? categoryMeta[activeCategory].description + ". "
              : ""}
            {activeCategory
              ? `Browse all free ${activeCategory.toLowerCase()} tools below — no signup required.`
              : `Browse all ${tools.length}+ free online tools below. Click any card to start instantly — no account needed.`}
          </p>

          {filteredTools.length === 0 ? (
            <div className='text-center py-20' role='status'>
              <div
                className='w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4'
                aria-hidden='true'
              >
                <svg
                  className='w-8 h-8 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <p className='text-gray-500 text-lg'>
                No tools found for &quot;{search}&quot;
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory(null);
                }}
                className='mt-4 text-indigo-600 font-medium hover:underline'
              >
                Clear search
              </button>
            </div>
          ) : (
            /* Semantic list — each tool is a list item with an anchor */
            <ul
              className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'
              role='list'
            >
              {filteredTools.map((tool) => {
                const c = getColors(tool.category);
                return (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className={`block h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border-2 border-transparent ${c.hoverBorder} hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300`}
                      /* Descriptive aria-label for screen readers + crawlers */
                      aria-label={`${tool.name} — ${tool.description}`}
                      /* Rel hint for crawlers */
                      rel='noopener'
                    >
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 ${c.iconBg} rounded-xl flex items-center justify-center mb-4`}
                        aria-hidden='true'
                      >
                        <svg
                          className='w-7 h-7 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d={c.icon}
                          />
                        </svg>
                      </div>

                      {/* Category badge */}
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${c.text} mb-2 block`}
                      >
                        {tool.category}
                      </span>

                      {/* Tool name — H3 for document outline */}
                      <h3 className='text-xl font-bold text-gray-900 mb-2'>
                        {tool.name}
                      </h3>

                      {/* Description — crawlable, descriptive */}
                      <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
                        {tool.description}
                      </p>

                      <div
                        className={`flex items-center ${c.text} font-semibold text-sm mt-auto`}
                        aria-hidden='true'
                      >
                        <span>Use Tool Free</span>
                        <svg
                          className='w-4 h-4 ml-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 5l7 7-7 7'
                          />
                        </svg>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* ── Why Us ───────────────────────────────────────── */}
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

        {/* ── FAQ ─────────────────────────────────────────── */}
        {/* Matches FAQPage schema above */}
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
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className='bg-white rounded-2xl shadow-lg p-8'
              >
                <dt className='text-xl font-bold text-gray-900 mb-3'>
                  {faq.question}
                </dt>
                <dd className='text-gray-600 leading-relaxed'>{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className='bg-gray-900 text-white mt-24' role='contentinfo'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid md:grid-cols-3 gap-8 mb-8'>
              {/* Brand */}
              <div>
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
                  {tools.length}+ free online tools for productivity, health,
                  finance, development, and more. No signup. No ads. No cost.
                </p>
              </div>

              {/* Popular Tools — internal links for crawlers */}
              <nav aria-label='Popular tools'>
                <h3 className='font-bold mb-4 text-white'>Popular Tools</h3>
                <ul className='space-y-2 text-gray-400'>
                  {featuredSlugs.map((slug) => {
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

              {/* Categories — internal links for crawlers */}
              <nav aria-label='Tool categories'>
                <h3 className='font-bold mb-4 text-white'>Categories</h3>
                <ul className='space-y-2 text-gray-400 columns-2'>
                  {allCategories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => {
                          setActiveCategory(cat);
                          scrollToTools();
                        }}
                        className='hover:text-white transition-colors text-left text-sm'
                      >
                        {cat}
                      </button>
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
                {tools.length}+ free tools — calculators, converters, generators
                &amp; more. No signup required.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
