// src/app/advertise/page.tsx
//
// Landing page for potential sponsors.
// Linked from the "Advertise with us" option in the ad dropdown menu.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise on Calculators, Pdf Tools & More — Reach 130+ Tool Pages",
  description:
    "Sponsor a placement on onlinetoolbase.com. Reach developers, writers, finance professionals, and productivity enthusiasts using our 130+ free tools.",
  robots: { index: true, follow: true },
};

const STATS = [
  { value: "130+", label: "Free tools" },
  { value: "4,147", label: "Monthly impressions (growing)" },
  { value: "100%", label: "Organic, intent-driven traffic" },
  { value: "0", label: "Annoying pop-ups" },
];

const CATEGORIES = [
  {
    name: "Writing & Text",
    tools:
      "Grammar checker, paraphrasing tool, text summarizer, word counter...",
  },
  {
    name: "Developer Tools",
    tools: "JSON formatter, JWT decoder, regex tester, base64 encoder...",
  },
  {
    name: "Finance",
    tools:
      "Sales tax calculator, mortgage calculator, budget planner, invoice generator...",
  },
  {
    name: "Health",
    tools:
      "BMI calculator, calorie calculator, macro calculator, sleep calculator...",
  },
  {
    name: "Social Media",
    tools:
      "Hashtag generator, engagement rate calculator, TikTok hook generator...",
  },
  {
    name: "Design & Image",
    tools:
      "Color palette generator, image compressor, background remover, favicon generator...",
  },
];

export default function AdvertisePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
          Advertising
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Reach people when they need your product
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
          Our users are actively working — calculating, converting, generating.
          They are in a problem-solving mindset and receptive to tools that
          help. That is the right moment to introduce your product.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {STATS.map((s) => (
          <div key={s.value} className="bg-gray-50 rounded-2xl p-5 text-center">
            <p className="text-2xl font-bold text-gray-900 mb-1">{s.value}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Ad format */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How your ad looks
        </h2>
        <p className="text-gray-500 mb-6 leading-relaxed">
          A single, non-intrusive sponsored placement appears below each tool.
          No banners. No pop-ups. No autoplay video. Just a clean,
          native-feeling card that matches the site's design and gives users the
          choice to engage.
        </p>

        {/* Demo ad */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
          <div className="border-t border-gray-100 pt-4 mt-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-600">
                  Y
                </div>
                <span className="font-medium text-gray-900 text-[13px]">
                  Your Brand
                </span>
                <span className="text-gray-400 text-[13px]">·</span>
                <span className="text-gray-400 text-[13px]">Sponsored</span>
              </div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle cx="3" cy="8" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="13" cy="8" r="1.5" />
                </svg>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between gap-3 rounded-[1.25rem] p-3 bg-gray-50 items-center max-w-[420px]">
                <div className="flex flex-col px-1">
                  <span className="font-medium text-gray-900 text-[14px]">
                    Your headline here
                  </span>
                  <p className="text-gray-500 text-[13px] mt-0.5">
                    Short supporting description — up to 80 chars.
                  </p>
                </div>
                <div className="shrink-0 w-16 h-16 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-400 text-xs font-medium">
                  Image
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Target by category
        </h2>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Your ad is matched to tool pages in categories you choose. A password
          manager ad appears on security tools. A writing tool appears on text
          and writing pages.
        </p>
        <div className="space-y-3">
          {CATEGORIES.map((c) => (
            <div
              key={c.name}
              className="flex gap-4 py-3 border-b border-gray-100 last:border-0"
            >
              <div className="w-40 shrink-0 font-medium text-gray-900 text-sm">
                {c.name}
              </div>
              <div className="text-sm text-gray-500 leading-relaxed">
                {c.tools}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Fixed weekly fee per category. No auctions. No minimum spend. You know
          exactly what you are paying before you commit.
        </p>
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="space-y-3">
            {[
              ["Single category", "Contact for pricing"],
              ["Two categories", "Contact for pricing"],
              ["All categories (run of site)", "Contact for pricing"],
            ].map(([tier, price]) => (
              <div
                key={tier}
                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
              >
                <span className="text-sm font-medium text-gray-900">
                  {tier}
                </span>
                <span className="text-sm text-gray-500">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
        <p className="text-indigo-200 leading-relaxed mb-6 text-sm">
          Send us your brand name, target category, and headline idea and we
          will get back to you within one business day with availability and
          pricing.
        </p>
        <a
          href="mailto:ads@onlinetoolbase.com?subject=Advertising%20inquiry&body=Brand%20name%3A%0ATarget%20categories%3A%0AHeadline%20idea%3A%0AWebsite%3A"
          className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
        >
          Email ads@onlinetoolbase.com →
        </a>
      </div>
    </main>
  );
}
