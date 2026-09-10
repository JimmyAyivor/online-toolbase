function positiveInteger(value: string | undefined) {
  return value && /^\d+$/.test(value) && Number(value) > 0 ? value : null;
}

export const REVIVE_DELIVERY_URL =
  process.env.NEXT_PUBLIC_REVIVE_DELIVERY_URL ?? "";

export const REVIVE_ZONE_IDS = {
  "blog-header-leaderboard": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_BLOG_HEADER_LEADERBOARD,
  ),
  "blog-content-leaderboard": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_BLOG_CONTENT_LEADERBOARD,
  ),
  "blog-sidebar": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_BLOG_SIDEBAR,
  ),
  "blog-sponsored-card": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_BLOG_SPONSORED_CARD,
  ),
  "blog-footer-leaderboard": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_BLOG_FOOTER_LEADERBOARD,
  ),
  "blog-mobile-sticky": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_BLOG_MOBILE_STICKY,
  ),
  "homepage-leaderboard": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_HOMEPAGE_LEADERBOARD,
  ),
  "category-page-leaderboard": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_CATEGORY_LEADERBOARD,
  ),
  "tool-page-leaderboard": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_TOOL_LEADERBOARD,
  ),
  "tool-sidebar": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_TOOL_SIDEBAR,
  ),
  "below-tool": positiveInteger(process.env.NEXT_PUBLIC_REVIVE_ZONE_BELOW_TOOL),
  "tool-inline-card": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_TOOL_INLINE_CARD,
  ),
  "tool-footer-leaderboard": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_TOOL_FOOTER_LEADERBOARD,
  ),
  "mobile-sticky": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_MOBILE_STICKY,
  ),
  "sponsored-tool-card": positiveInteger(
    process.env.NEXT_PUBLIC_REVIVE_ZONE_SPONSORED_TOOL_CARD,
  ),
} as const;
