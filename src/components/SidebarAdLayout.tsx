// src/components/SidebarAdLayout.tsx
//
// Updated with ClickBank affiliate offers alongside sponsored ads.
// Load order below tool results:
//   1. PageEditorial (how-to, FAQ, related tools)
//   2. ToolEngagement (reviews/comments)
//   3. SponsoredAd (direct sponsor — fades in at 800ms)
//   4. ClickBankOffer (affiliate product — fades in at 1200ms, after sponsored ad)
//
// In sidebar (desktop):
//   1. AdSlot (Google AdSense half-page 300×600)
//   2. AffiliateSection (existing affiliate links)
//   3. SidebarRecentPosts (blog posts)
//   4. ClickBankSidebar (affiliate product card)
//   5. SponsoredAdSidebar (direct sponsor card)
//   6. SubscribeForm (newsletter)

import AdSlot from "./AdSlot";
import AffiliateSection from "./AffiliateSection";
import SidebarRecentPosts from "./SidebarRecentPosts";
import SponsoredAdWrapper from "./SponsoredAdWrapper";
import ClickBankWrapper from "./ClickBankWrapper";
import SubscribeForm from "./SubscribeForm";
import { selectAdForTool } from "@/ads/ad-config";
import { selectClickBankProduct } from "@/ads/clickbank-config";

const SIDEBAR_SLOT_ID = process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "0000000000";

interface SidebarAdLayoutProps {
  children: React.ReactNode;
  tool?: {
    slug: string;
    name: string;
    description?: string;
    category: string;
  };
}

export default function SidebarAdLayout({ children, tool }: SidebarAdLayoutProps) {
  // Select ads server-side — zero client JS required for selection
  const sponsoredAd  = tool ? selectAdForTool(tool) : null;
  const cbProduct    = tool ? selectClickBankProduct(tool) : null;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex gap-6 items-start">

        {/* ── Main content column ──────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {children}

          {/* Affiliate section (existing SaaS offers) */}
          {tool && (
            <div className="mt-8">
              <AffiliateSection tool={tool} />
            </div>
          )}

          {/* Sponsored ad — direct sponsor, fades in after 800ms */}
          {sponsoredAd && tool && (
            <SponsoredAdWrapper
              ad={sponsoredAd}
              toolSlug={tool.slug}
              variant="inline"
              delayMs={800}
            />
          )}

          {/* ClickBank offer — affiliate product, fades in after 1200ms */}
          {cbProduct && tool && (
            <ClickBankWrapper
              product={cbProduct}
              toolSlug={tool.slug}
              variant="inline"
              delayMs={1200}
            />
          )}
        </div>

        {/* ── Sticky sidebar — desktop only ─────────────────────────────────── */}
        <aside
          className="hidden lg:block w-[320px] flex-shrink-0"
          aria-label="Sidebar"
        >
          <div className="sticky top-20 space-y-4">
            {/* Google AdSense */}
            <AdSlot variant="halfpage" slotId={SIDEBAR_SLOT_ID} />

            {/* Direct sponsor card */}
            {sponsoredAd && tool && (
              <SponsoredAdWrapper
                ad={sponsoredAd}
                toolSlug={tool.slug}
                variant="sidebar"
                delayMs={0}
              />
            )}

            {/* SaaS affiliate links */}
            {tool && <AffiliateSection tool={tool} />}

            {/* Blog posts */}
            <SidebarRecentPosts />

            {/* ClickBank offer card */}
            {cbProduct && tool && (
              <ClickBankWrapper
                product={cbProduct}
                toolSlug={tool.slug}
                variant="sidebar"
              />
            )}

            

            {/* Newsletter */}
            <SubscribeForm variant="inline" />
          </div>
        </aside>

      </div>
    </div>
  );
}