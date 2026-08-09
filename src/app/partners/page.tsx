// src/app/partners/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { createElement } from "react";
import type { Partner } from "@/lib/partners";
import {
  partners,
  partnerCategories,
  getPartnersByCategory,
} from "@/lib/partners";

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

export const metadata: Metadata = {
  title: "Partners & Resources | Online Tool Base",
  description:
    "Trusted tools, platforms, and communities that we recommend alongside Online Tool Base — from SEO software and launch platforms to developer communities and hosting providers.",
  alternates: { canonical: `${SITE_URL}/partners` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/partners`,
    siteName: SITE_NAME,
    title: "Partners & Resources | Online Tool Base",
    description:
      "Trusted tools, platforms, and communities recommended by Online Tool Base.",
  },
};

const CATEGORY_META: Record<
  string,
  {
    emoji: string;
    color: string;
    bg: string;
    border: string;
    description: string;
  }
> = {
  "Launch Platforms": {
    emoji: "🚀",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    description:
      "Directories and communities to discover and launch your product",
  },
  "SEO & Marketing": {
    emoji: "📈",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    description:
      "Tools and publications for search visibility and digital marketing",
  },
  "Performance & Dev Tools": {
    emoji: "⚡",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    description:
      "Tools for measuring, building, and optimising web performance",
  },
  "Developer Communities": {
    emoji: "👩‍💻",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    description: "Where developers publish, learn, and connect",
  },
  "Productivity & Design": {
    emoji: "🎨",
    color: "text-pink-700",
    bg: "bg-pink-50",
    border: "border-pink-200",
    description: "Apps for creating, automating, and organising your work",
  },
  "Hosting & Infrastructure": {
    emoji: "☁️",
    color: "text-slate-700",
    bg: "bg-slate-50",
    border: "border-slate-200",
    description:
      "Platforms for deploying, scaling, and securing web applications",
  },
};

function PartnerCard({
  name,
  href,
  description,
  logo,
  categoryMeta,
}: {
  name: string;
  href: string;
  description: string;
  logo: Partner["logo"];
  categoryMeta: (typeof CATEGORY_META)[string];
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Card top */}
      <div className="p-5 flex items-start gap-4 flex-1">
        {/* Logo / emoji */}
        <div
          className={`w-11 h-11 rounded-xl ${categoryMeta.bg} ${categoryMeta.border} border flex items-center justify-center shrink-0 text-xl`}
        >
          {typeof logo === "string"
            ? logo
            : createElement(logo, { className: "w-7 h-7 shrink-0" })}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Card footer */}
      <div
        className={`px-5 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs`}
      >
        <span className="text-slate-400 font-mono truncate">
          {href.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
        </span>
        <svg
          className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </a>
  );
}

export default function PartnersPage() {
  const totalPartners = partners.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-slate-300">Partners & Resources</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
              Recommended Resources
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Partners &amp; Resources
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              We've curated{" "}
              <strong className="text-white">
                {totalPartners} trusted tools
              </strong>
              , platforms, and communities that complement Online Tool Base.
              These are resources we genuinely use and recommend — grouped by
              category so you can find what you need quickly.
            </p>

            {/* Quick jump pills */}
            <div className="flex flex-wrap gap-2">
              {partnerCategories.map((cat) => {
                const meta = CATEGORY_META[cat];
                return (
                  <a
                    key={cat}
                    href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    <span>{meta.emoji}</span>
                    {cat}
                    <span className="text-white/50">
                      ({getPartnersByCategory(cat as any).length})
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {partnerCategories.map((cat) => {
          const catPartners = getPartnersByCategory(cat as any);
          const meta = CATEGORY_META[cat];
          const anchorId = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");

          return (
            <section key={cat} id={anchorId} className="scroll-mt-8">
              {/* Section header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl ${meta.bg} ${meta.border} border flex items-center justify-center text-2xl shrink-0`}
                >
                  {meta.emoji}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{cat}</h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    {meta.description}
                  </p>
                </div>
                <span className="ml-auto text-sm text-slate-400 font-medium shrink-0 mt-1">
                  {catPartners.length} resource
                  {catPartners.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {catPartners.map((p) => (
                  <PartnerCard
                    key={p.name}
                    name={p.name}
                    href={p.href}
                    description={p.description}
                    logo={p.logo}
                    categoryMeta={meta}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA — partner application */}
        <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 md:p-12">
          <div className="md:flex md:items-center md:gap-10">
            <div className="flex-1 mb-6 md:mb-0">
              <h2 className="text-2xl font-black text-white mb-3">
                Want to be featured here?
              </h2>
              <p className="text-indigo-200 leading-relaxed">
                We add partners on merit — tools and resources that genuinely
                help our users work smarter. If your product or platform serves
                developers, content creators, designers, or small businesses,
                we'd love to hear from you.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Free or freemium tier available",
                  "Complementary to online tools and productivity",
                  "Quality product with real users",
                ].map((req) => (
                  <li
                    key={req}
                    className="flex items-center gap-2 text-sm text-indigo-100"
                  >
                    <svg
                      className="w-4 h-4 text-indigo-300 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Apply to be a partner
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <p className="text-indigo-300 text-xs mt-3 text-center">
                We review every application personally
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center max-w-2xl mx-auto leading-relaxed">
          Links to external sites are provided for your convenience. Online Tool
          Base is not affiliated with or sponsored by the organisations listed
          above unless explicitly stated. All links open in a new tab.
        </p>
      </div>
    </div>
  );
}
