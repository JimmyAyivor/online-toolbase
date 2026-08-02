"use client";
// src/components/SponsoredAdWrapper.tsx
//
// Thin "use client" wrapper that bridges the Server Component SidebarAdLayout
// with the client-side SponsoredAd component.
// Also renders the compact sidebar variant.

import SponsoredAd from "./SponsoredAd";
import SponsoredAdSidebar from "./SponsoredAdSidebar";
import type { SponsoredAd as SponsoredAdType } from "@/ads/ad-config";

interface Props {
  ad: SponsoredAdType;
  toolSlug: string;
  variant?: "inline" | "sidebar";
  delayMs?: number;
}

export default function SponsoredAdWrapper({
  ad,
  toolSlug,
  variant = "inline",
  delayMs = 800,
}: Props) {
  if (variant === "sidebar") {
    return <SponsoredAdSidebar ad={ad} toolSlug={toolSlug} />;
  }
  return <SponsoredAd ad={ad} toolSlug={toolSlug} delayMs={delayMs} />;
}