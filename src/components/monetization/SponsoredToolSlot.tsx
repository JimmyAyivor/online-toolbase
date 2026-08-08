// src/components/monetization/SponsoredToolSlot.tsx
// Server component — no "use client" needed.
//
// A "Featured" tool card that sits in the tools grid and links to an affiliate.
// Looks like a regular tool card but has a small sponsored badge.
// Revenue model: charge brands a flat fee for rotating featured slots.
//
// Usage in HomeClient.tsx — inject into the filteredTools list:
//   The sponsored slot is inserted at position 6 (after the 6th tool card).
//
// Or use standalone in any grid:
//   import SponsoredToolSlot from "@/components/monetization/SponsoredToolSlot";
//   <SponsoredToolSlot offerKey="canva" position={6} />

import { affiliateOffers } from "@/affiliate/affiliate-map";

// ─── Which offer shows in the sponsored slot ──────────────────────────────────
// Rotate this weekly/monthly or implement A/B testing.
// Could also be driven by a simple config or env var.

const DEFAULT_OFFER_KEY = "canva";

// ─── Category-aware offer selection ──────────────────────────────────────────
// Pass the active category filter to show a relevant sponsor.

const CATEGORY_SPONSOR: Record<string, string> = {
  Writing: "grammarly",
  Marketing: "ahrefs",
  Developer: "digitalocean",
  Design: "canva",
  Image: "canva",
  Security: "nordvpn, nordpass",
  Finance: "notion",
  Productivity: "notion",
  Business: "notion",
  Calculator: "quillbot",
  "Social Media": "jasper",
};

// ─── Icon paths per offer (matches the category icon style on the site) ───────
const OFFER_ICONS: Record<string, string> = {
  grammarly:
    "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  jasper:
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  copyai:
    "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  ahrefs:
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  surfer: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  digitalocean:
    "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  cloudways:
    "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  canva:
    "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  removebg:
    "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  nordvpn:
    "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  notion:
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  quillbot:
    "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
};

const OFFER_COLORS: Record<string, string> = {
  grammarly: "bg-green-600",
  jasper: "bg-orange-500",
  copyai: "bg-purple-600",
  ahrefs: "bg-orange-600",
  surfer: "bg-cyan-600",
  digitalocean: "bg-blue-500",
  cloudways: "bg-indigo-500",
  canva: "bg-violet-600",
  removebg: "bg-pink-600",
  nordvpn: "bg-blue-700",
  notion: "bg-gray-900",
  quillbot: "bg-teal-600",
  seranking: "bg-emerald-600",
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  offerKey?: string;
  activeCategory?: string | null;
  /** Descriptive label for the tool this links to */
  toolSlug?: string;
}

export default function SponsoredToolSlot({
  offerKey,
  activeCategory,
  toolSlug = "homepage",
}: Props) {
  const resolvedKey =
    offerKey ??
    (activeCategory ? CATEGORY_SPONSOR[activeCategory] : null) ??
    DEFAULT_OFFER_KEY;

  const offer = affiliateOffers[resolvedKey];
  if (!offer) return null;

  const iconPath = OFFER_ICONS[resolvedKey] ?? OFFER_ICONS.notion;
  const bgColor = OFFER_COLORS[resolvedKey] ?? "bg-indigo-600";
  const href = `/go?offer=${encodeURIComponent(resolvedKey)}&tool=${encodeURIComponent(toolSlug)}`;

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group block h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border-2 border-amber-200 hover:border-amber-300 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 relative overflow-hidden"
        aria-label={`Sponsored: ${offer.name} — ${offer.description}`}
      >
        {/* Sponsored badge */}
        <div className="absolute top-3 right-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
            Sponsored
          </span>
        </div>

        {/* Icon */}
        <div
          className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center mb-4`}
          aria-hidden="true"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={iconPath}
            />
          </svg>
        </div>

        {/* Category */}
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2 block">
          Featured Tool
        </span>

        {/* Name + description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
          {offer.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {offer.description}
        </p>

        {/* CTA */}
        <div
          className="flex items-center text-amber-600 font-semibold text-sm mt-auto"
          aria-hidden="true"
        >
          <span>Try it free</span>
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
        </div>
      </a>
    </li>
  );
}
