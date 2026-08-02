"use client";
// src/components/SponsoredAdSidebar.tsx
//
// Compact sidebar sponsored ad — fits the 320px sidebar column.
// Shows a card-style ad with logo, headline, body, and CTA button.

import { useState } from "react";
import type { SponsoredAd as SponsoredAdType } from "@/ads/ad-config";

interface Props {
  ad: SponsoredAdType;
  toolSlug?: string;
}

export default function SponsoredAdSidebar({ ad, toolSlug = "" }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  if (dismissed) return null;

  const clickUrl = `/api/ad-click?key=${encodeURIComponent(ad.key)}&tool=${encodeURIComponent(toolSlug)}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full overflow-hidden bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] flex-shrink-0">
            {!logoError ? (
              <img
                src={ad.logoUrl}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-[9px] font-bold text-gray-500 bg-gray-100">
                {ad.brandName.charAt(0)}
              </span>
            )}
          </div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            {ad.brandName}
          </p>
          <span className="text-[11px] text-slate-300">·</span>
          <p className="text-[11px] text-slate-400">Sponsored</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Ad options"
            className="-m-1 w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-100 hover:text-slate-500 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <circle cx="3" cy="8" r="1.4"/>
              <circle cx="8" cy="8" r="1.4"/>
              <circle cx="13" cy="8" r="1.4"/>
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-50 text-sm">
              <button
                onClick={() => { setDismissed(true); setMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                Hide this ad
              </button>
              <a
                href="/advertise"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                Advertise with us
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Ad content */}
      <div className="p-4">
        <p className="text-sm font-semibold text-slate-800 leading-snug mb-1">
          {ad.headline}
        </p>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          {ad.description}
        </p>
        <a
          href={clickUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
          aria-label={`${ad.headline} — ${ad.brandName} (sponsored)`}
        >
          Learn more →
        </a>
      </div>
    </div>
  );
}