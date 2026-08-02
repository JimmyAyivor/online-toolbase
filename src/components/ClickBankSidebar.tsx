"use client";
// src/components/ClickBankSidebar.tsx
//
// Compact ClickBank offer for the 320px sidebar.
// Shown below SidebarRecentPosts, above the newsletter widget.

import { useState } from "react";
import type { ClickBankProduct } from "@/ads/clickbank-config";

interface Props {
  product: ClickBankProduct;
  toolSlug?: string;
}

export default function ClickBankSidebar({ product, toolSlug = "" }: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const clickUrl = `/api/cb-click?key=${encodeURIComponent(product.key)}&tool=${encodeURIComponent(toolSlug)}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
          Recommended
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="text-slate-200 hover:text-slate-400 text-xs transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center text-xl flex-shrink-0 select-none">
            {product.icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-snug truncate">
              {product.name}
            </p>
            {product.badge && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Headline */}
        <p className="text-sm font-medium text-slate-700 leading-snug mb-1">
          {product.headline}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* CTA */}
        <a
          href={clickUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
          aria-label={`Learn more about ${product.name}`}
        >
          Learn more →
        </a>

        {/* Disclosure */}
        <p className="text-[10px] text-slate-300 text-center mt-2 leading-relaxed">
          Affiliate link — we may earn a commission
        </p>
      </div>
    </div>
  );
}