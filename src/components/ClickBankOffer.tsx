"use client";
// src/components/ClickBankOffer.tsx
//
// Inline ClickBank affiliate offer card — shown below the tool result.
// Renders as a "Recommended Resource" section, distinct from sponsored ads.
//
// Usage in SidebarAdLayout.tsx (server component):
//   import { selectClickBankProduct } from "@/ads/clickbank-config";
//   const cbProduct = tool ? selectClickBankProduct(tool) : null;
//   {cbProduct && <ClickBankOfferWrapper product={cbProduct} toolSlug={tool.slug} />}

import { useState, useEffect } from "react";
import type { ClickBankProduct } from "@/ads/clickbank-config";

interface Props {
  product: ClickBankProduct;
  toolSlug?: string;
  /** Delay before fading in — gives users time to see their result first */
  delayMs?: number;
}

export default function ClickBankOffer({
  product,
  toolSlug = "",
  delayMs = 1200,
}: Props) {
  const [visible, setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  if (dismissed) return null;

  const clickUrl = `/api/cb-click?key=${encodeURIComponent(product.key)}&tool=${encodeURIComponent(toolSlug)}`;

  return (
    <div
      className={`transition-all duration-700 ease-out mt-6 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50 bg-gray-50/60">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Recommended resource
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-300 hover:text-gray-500 transition-colors text-xs"
            aria-label="Dismiss recommendation"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <a
          href={clickUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group no-underline"
          aria-label={`${product.name} — ${product.headline}`}
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center text-2xl select-none">
            {product.icon}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                {product.name}
              </span>
              {product.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  {product.badge}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-700 leading-snug">
              {product.headline}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* CTA arrow */}
          <div className="flex-shrink-0 self-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-indigo-600 transition-colors flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </a>

        {/* Affiliate disclosure — legally required */}
        <div className="px-5 py-2 border-t border-gray-50 bg-gray-50/40">
          <p className="text-[10px] text-gray-300 leading-relaxed">
            Affiliate disclosure: We may earn a commission if you purchase through this link, at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}