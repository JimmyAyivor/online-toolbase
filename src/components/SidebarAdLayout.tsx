// src/components/SidebarAdLayout.tsx
//
// Updated with ClickBank affiliate offers alongside sponsored ads.
// Load order below tool results:
//   1. PageEditorial (how-to, FAQ, related tools)
//   2. ToolEngagement (reviews/comments)
//   3. SponsoredAd (direct sponsor — fades in at 800ms)
//   4. ClickBankOffer (affiliate product — fades in at 1200ms, after sponsored ad)
//
// In sidebar (desktop), variant="full" (default):
//   1. AdSlot (Google AdSense half-page 300×600)
//   2. AffiliateSection (existing affiliate links)
//   3. SidebarRecentPosts (blog posts)
//   4. ClickBankSidebar (affiliate product card)
//   5. SponsoredAdSidebar (direct sponsor card)
//   6. SubscribeForm (newsletter)
//
// In sidebar, variant="minimal":
//   1. AdSlot (Google AdSense half-page 300×600)
//   2. SidebarRecentPosts (blog posts, labelled "Latest Articles")
//   3. ClickBankSidebar (affiliate product card)
//   Main content column (AffiliateSection, SponsoredAd, ClickBankOffer) is unchanged either way.

import AdPlacement from "./advertising/AdPlacement";
import AffiliateSection from "./AffiliateSection";
import SidebarRecentPosts from "./SidebarRecentPosts";
import SponsoredAdWrapper from "./SponsoredAdWrapper";
import ClickBankWrapper from "./ClickBankWrapper";
import SubscribeForm from "./SubscribeForm";
import { selectAdForTool } from "@/ads/ad-config";
import { selectClickBankProduct } from "@/ads/clickbank-config";

interface SidebarAdLayoutProps {
  children?: React.ReactNode;
  tool?: {
    slug: string;
    name: string;
    description?: string;
    category: string;
  };
  /** "full" (default) = existing sidebar; "minimal" = ad + Latest Articles + ClickBank only */
  sidebarVariant?: "full" | "minimal";
}

export default function SidebarAdLayout({
  children,
  tool,
  sidebarVariant = "full",
}: SidebarAdLayoutProps) {
  // Select ads server-side — zero client JS required for selection
  const sponsoredAd = tool ? selectAdForTool(tool) : null;
  const cbProduct = tool ? selectClickBankProduct(tool) : null;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex gap-6 items-start">
        {/* ── Main content column ──────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {tool && (
            <AdPlacement
              className="mb-6 hidden md:flex"
              context={{ category: tool.category, toolSlug: tool.slug }}
              placement="tool-page-leaderboard"
            />
          )}

          {sidebarVariant !== "minimal" && children}

          {tool && (
            <AdPlacement
              className="mt-8 hidden md:flex"
              context={{ category: tool.category, toolSlug: tool.slug }}
              placement="below-tool"
            />
          )}

          {tool && (
            <AdPlacement
              className="mt-8 hidden md:flex"
              context={{ category: tool.category, toolSlug: tool.slug }}
              placement="tool-inline-card"
            />
          )}

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

          {tool && (
            <AdPlacement
              className="mt-10 hidden md:flex"
              context={{ category: tool.category, toolSlug: tool.slug }}
              placement="tool-footer-leaderboard"
            />
          )}
        </div>

        {/* ── Sticky sidebar — desktop only ─────────────────────────────────── */}
        <aside
          className="hidden lg:block w-[320px] flex-shrink-0"
          aria-label="Sidebar"
        >
          <div className="sticky top-20 space-y-4">
            {sidebarVariant === "minimal" ? (
              <>
                {/* Google AdSense */}
                <AdPlacement
                  context={
                    tool
                      ? { category: tool.category, toolSlug: tool.slug }
                      : undefined
                  }
                  placement="tool-sidebar"
                />

                {/* Latest Articles */}
                <SidebarRecentPosts />

                {/* ClickBank offer card */}
                {cbProduct && tool && (
                  <ClickBankWrapper
                    product={cbProduct}
                    toolSlug={tool.slug}
                    variant="sidebar"
                  />
                )}
              </>
            ) : (
              <>
                {/* Google AdSense */}
                <AdPlacement
                  context={
                    tool
                      ? { category: tool.category, toolSlug: tool.slug }
                      : undefined
                  }
                  placement="tool-sidebar"
                />

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
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
