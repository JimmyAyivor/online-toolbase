"use client";

import { useState } from "react";

import { AD_PLACEMENTS } from "@/ads/placements";
import { buildReviveFrameUrl } from "@/ads/revive";
import type { AdContext, AdPlacementName } from "@/ads/types";
import AdFallback from "./AdFallback";
import SponsoredLabel from "./SponsoredLabel";

type Props = {
  className?: string;
  context?: AdContext;
  placement: AdPlacementName;
  sticky?: boolean;
};

export default function AdPlacement({
  className = "",
  context,
  placement,
  sticky = false,
}: Props) {
  const [closed, setClosed] = useState(false);
  const definition = AD_PLACEMENTS[placement];
  const source = definition.zoneId
    ? buildReviveFrameUrl(definition.zoneId, context)
    : null;

  if (closed) return null;
  if (!source) {
    return (
      <AdFallback
        className={className}
        fallback={definition.fallback}
        sticky={sticky}
      />
    );
  }

  const content = (
    <div
      className="mx-auto overflow-hidden"
      style={{ height: definition.height, maxWidth: definition.width }}
    >
      <iframe
        className="block border-0"
        height={definition.height}
        loading={definition.lazy ? "lazy" : "eager"}
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        src={source}
        title={`${placement.replaceAll("-", " ")} advertisement`}
        width={definition.width}
      />
    </div>
  );

  if (sticky) {
    return (
      <aside
        aria-label="Advertisement"
        className={`fixed inset-x-0 bottom-0 z-50 flex justify-center border-t border-gray-200 bg-white px-2 py-1 shadow-lg ${className}`}
      >
        <div className="relative">
          <SponsoredLabel />
          {content}
          <button
            aria-label="Close advertisement"
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-sm text-white hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            onClick={() => setClosed(true)}
            type="button"
          >
            ×
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`flex flex-col items-center overflow-hidden ${className}`}
      style={{ minHeight: definition.height + 20 }}
    >
      <SponsoredLabel />
      {content}
    </aside>
  );
}
