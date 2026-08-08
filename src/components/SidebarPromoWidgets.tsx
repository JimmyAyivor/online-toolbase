// src/components/SidebarPromoWidgets.tsx
//
// Sidebar-only version of the ad/ClickBank widgets — no outer layout wrapper.
// Use this when embedding inside a page that already owns its own grid/column
// layout (e.g. BlogPostPage's lg:grid-cols-[1fr_300px]). Drop it directly into
// your existing sidebar column alongside your other sidebar cards.
//
// Contents: Google AdSense half-page → Latest Articles → ClickBank recommendation.
//
// Do NOT wrap this in SidebarAdLayout — that component brings its own
// max-w-screen-2xl + two-column flex layout and is meant to own the whole
// page's content+sidebar split, not to be nested inside another layout's
// sidebar slot.

import AdSlot from "./AdSlot";
import SidebarRecentPosts from "./SidebarRecentPosts";
import ClickBankWrapper from "./ClickBankWrapper";
import { selectClickBankProduct } from "@/ads/clickbank-config";

const SIDEBAR_SLOT_ID = process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "0000000000";

interface SidebarPromoWidgetsProps {
  tool: {
    slug: string;
    category: string;
    name: string;
    description?: string;
  };
}

export default function SidebarPromoWidgets({
  tool,
}: SidebarPromoWidgetsProps) {
  const cbProduct = selectClickBankProduct(tool);

  return (
    <>
      {/* Google AdSense */}
      <AdSlot variant="halfpage" slotId={SIDEBAR_SLOT_ID} />

      {/* Latest Articles */}
      <SidebarRecentPosts />

      {/* ClickBank offer card */}
      {cbProduct && (
        <ClickBankWrapper
          product={cbProduct}
          toolSlug={tool.slug}
          variant="sidebar"
        />
      )}
    </>
  );
}
