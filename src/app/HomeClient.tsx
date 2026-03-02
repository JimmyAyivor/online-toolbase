"use client";
// src/app/HomeClient.tsx
// Contains ONLY the interactive parts that require client state:
//   - search input
//   - category filter
//   - smooth scroll
// Everything else (hero text, FAQ, footer) is rendered server-side in page.tsx.

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
}

/* ─── Category meta ──────────────────────────────────────────────────────── */

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

interface CategoryMeta {
  color: ColorKey;
  icon: string;
  description: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
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
  "Social Media": {
    color: "rose",
    description: "Instagram, TikTok, X, LinkedIn, YouTube & Facebook tools",
    icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
  },
};

const DEFAULT_META: CategoryMeta = {
  color: "indigo",
  icon: "M13 10V3L4 14h7v7l9-11h-7z",
  description: "Free online tool",
};

/* ─── Color map ──────────────────────────────────────────────────────────── */

const COLOR_MAP: Record<
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
  const meta = CATEGORY_META[category] ?? DEFAULT_META;
  return { ...COLOR_MAP[meta.color], icon: meta.icon };
}

/* ─── Static data (computed once at module level, not per-render) ─────────── */

const ALL_CATEGORIES = Array.from(
  new Set(tools.map((t: Tool) => t.category)),
).sort();

const CATEGORY_COUNTS: Record<string, number> = {};
tools.forEach((t: Tool) => {
  CATEGORY_COUNTS[t.category] = (CATEGORY_COUNTS[t.category] ?? 0) + 1;
});

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function HomeClient() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = useMemo(
    () =>
      tools.filter((t: Tool) => {
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

  const scrollToTools = useCallback((): void => {
    if (typeof window !== "undefined") {
      document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const clearFilters = useCallback((): void => {
    setSearch("");
    setActiveCategory(null);
  }, []);

  return (
    <>
      {/* ── Categories ─────────────────────────────────────────────────────── */}
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
          {ALL_CATEGORIES.length} categories covering writing, development,
          design, health, finance, social media, and more.
        </p>

        <ul
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
          role='list'
        >
          {/* All tools button */}
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
                  ? "bg-linear-to-r from-indigo-600 to-purple-600 border-indigo-600 text-white"
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

          {ALL_CATEGORIES.map((cat) => {
            const c = getColors(cat);
            const meta = CATEGORY_META[cat] ?? DEFAULT_META;
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
                  aria-label={`Filter by ${cat} — ${CATEGORY_COUNTS[cat] ?? 0} tools`}
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
                  <span className='font-bold text-sm block'>
                    {cat
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <span
                    className={`text-xs mt-1 block ${isActive ? "text-white/80" : "text-gray-500"}`}
                  >
                    {CATEGORY_COUNTS[cat] ?? 0} tools
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Tools Grid ─────────────────────────────────────────────────────── */}
      <section
        id='tools'
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-3xl shadow-xl mb-16'
        aria-labelledby='tools-heading'
        aria-live='polite'
        aria-atomic='true'
      >
        {/* Search */}
        <div className='mb-8' role='search'>
          <label htmlFor='tool-search' className='sr-only'>
            Search free online tools
          </label>
          <div className='relative max-w-2xl'>
            <input
              id='tool-search'
              type='search'
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
                setActiveCategory(null);
              }}
              placeholder='Search tools — e.g. BMI calculator, QR code generator…'
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

        <p className='text-gray-600 mb-12 max-w-2xl'>
          {activeCategory && CATEGORY_META[activeCategory]
            ? CATEGORY_META[activeCategory].description + ". "
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
              onClick={clearFilters}
              className='mt-4 text-indigo-600 font-medium hover:underline'
            >
              Clear search
            </button>
          </div>
        ) : (
          <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-6' role='list'>
            {filteredTools.map((tool: Tool) => {
              const c = getColors(tool.category);
              return (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className={`block h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border-2 border-transparent ${c.hoverBorder} hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300`}
                    aria-label={`${tool.name} — ${tool.description}`}
                  >
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
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${c.text} mb-2 block`}
                    >
                      {tool.category
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                      {tool.name}
                    </h3>
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
    </>
  );
}
