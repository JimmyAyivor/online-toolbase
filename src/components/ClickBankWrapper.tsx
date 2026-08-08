"use client";
// src/components/ClickBankWrapper.tsx
//
// "use client" bridge so SidebarAdLayout (Server Component) can
// render the ClickBank components without making the whole layout client-side.

import ClickBankOffer from "./ClickBankOffer";
import ClickBankSidebar from "./ClickBankSidebar";
import type { ClickBankProduct } from "@/ads/clickbank-config";

interface Props {
  product: ClickBankProduct;
  toolSlug: string;
  variant?: "inline" | "sidebar";
  delayMs?: number;
}

export default function ClickBankWrapper({
  product,
  toolSlug,
  variant = "inline",
  delayMs = 1200,
}: Props) {
  if (variant === "sidebar") {
    return <ClickBankSidebar product={product} toolSlug={toolSlug} />;
  }
  return (
    <ClickBankOffer product={product} toolSlug={toolSlug} delayMs={delayMs} />
  );
}
