"use client";
// src/components/SponsoredAd.tsx
//
// Sponsored ad unit that matches the inline ad format (similar to ChatGPT's).
// Shown at the bottom of tool pages, below the editorial section.
//
// Usage — in PageEditorial.tsx or SidebarAdLayout.tsx:
//   import SponsoredAd from "@/components/SponsoredAd";
//   <SponsoredAd ad={ad} toolSlug="sales-tax-calculator" />
//
// Or inject globally via SidebarAdLayout when `tool` prop is present:
//   import { selectAdForTool } from "@/ads/ad-config";
//   const ad = tool ? selectAdForTool(tool) : null;
//   {ad && <SponsoredAd ad={ad} toolSlug={tool.slug} />}

import { useState, useRef, useEffect } from "react";
import type { SponsoredAd as SponsoredAdType } from "@/ads/ad-config";

interface Props {
  ad: SponsoredAdType;
  toolSlug?: string;
  /** Delay in ms before the ad fades in — lets users see their result first */
  delayMs?: number;
}

export default function SponsoredAd({
  ad,
  toolSlug = "",
  delayMs = 800,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fade in after delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  if (dismissed) return null;

  const clickUrl = `/api/ad-click?key=${encodeURIComponent(ad.key)}&tool=${encodeURIComponent(toolSlug)}`;

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      role="region"
      aria-label={`Sponsored content from ${ad.brandName}`}
    >
      <div className="border-t border-gray-100 pt-4 mt-2 text-sm">
        {/* ── Header: logo + brand name + options button ── */}
        <div className="flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-2">
            {/* Brand logo circle */}
            <div className="pointer-events-none aspect-square shrink-0 overflow-clip rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] h-6 w-6">
              {!logoError ? (
                <img
                  src={ad.logoUrl}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                /* Fallback monogram if logo fails */
                <div className="h-full w-full flex items-center justify-center bg-gray-100 text-[9px] font-bold text-gray-500">
                  {ad.brandName.charAt(0)}
                </div>
              )}
            </div>

            {/* Brand name + Sponsored label */}
            <div className="flex flex-wrap items-center gap-1">
              <span className="font-medium text-gray-900 text-[13px] truncate max-w-[120px]">
                {ad.brandName}
              </span>
              <span className="text-gray-400 text-[13px]">·</span>
              <span className="text-gray-400 text-[13px]">Sponsored</span>
            </div>
          </div>

          {/* Options button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Ad options"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="-my-2 -me-2 flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              type="button"
            >
              {/* Ellipsis icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="3" cy="8" r="1.5" />
                <circle cx="8" cy="8" r="1.5" />
                <circle cx="13" cy="8" r="1.5" />
              </svg>
            </button>

            {/* Options dropdown */}
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-50"
              >
                <button
                  role="menuitem"
                  onClick={() => {
                    setDismissed(true);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hide this ad
                </button>
                <a
                  role="menuitem"
                  href="mailto:ads@onlinetoolbase.com?subject=Ad%20Report"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Report this ad
                </a>
                <a
                  role="menuitem"
                  href="/advertise"
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Advertise with us
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── Ad card ── */}
        <div className="flex flex-col gap-3 mt-3">
          <div className="max-w-[480px] min-w-[280px]">
            <a
              href={clickUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex w-full cursor-pointer justify-between gap-3 rounded-[1.25rem] p-3 text-sm items-center
                         bg-gray-50 hover:bg-gray-100 active:bg-gray-200
                         transition-colors duration-150 select-none no-underline group"
              aria-label={`${ad.headline} — ${ad.description} — Sponsored by ${ad.brandName}`}
            >
              {/* Text content */}
              <div className="flex flex-col px-1 min-w-0">
                <span className="font-medium text-gray-900 text-[14px] leading-snug">
                  {ad.headline}
                </span>
                <p className="text-gray-500 text-[13px] mt-0.5 line-clamp-2 leading-relaxed">
                  {ad.description}
                </p>
              </div>

              {/* Creative image */}
              <AdCreativeImage
                src={ad.creativeUrl}
                alt=""
                brandName={ad.brandName}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Creative image with fallback ──────────────────────────────────────────────

function AdCreativeImage({
  src,
  alt,
  brandName,
}: {
  src: string;
  alt: string;
  brandName: string;
}) {
  const [error, setError] = useState(false);

  if (error || !src || src === "/ads/placeholder.png") {
    // Branded monogram fallback
    const colors: Record<string, string> = {
      Grammarly: "bg-green-100 text-green-700",
      Semrush: "bg-orange-100 text-orange-700",
      NordVPN: "bg-blue-100 text-blue-700",
      DigitalOcean: "bg-blue-100 text-blue-700",
      "Jasper AI": "bg-orange-100 text-orange-700",
      Fiverr: "bg-green-100 text-green-700",
    };
    const cls = colors[brandName] ?? "bg-gray-100 text-gray-600";
    return (
      <div
        className={`shrink-0 rounded-lg aspect-square h-[64px] w-[64px] flex items-center justify-center font-bold text-xl ${cls}`}
      >
        {brandName.charAt(0)}
      </div>
    );
  }

  return (
    <img
      className="shrink-0 rounded-lg aspect-square object-cover h-[64px] w-[64px] bg-white"
      src={src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
}
