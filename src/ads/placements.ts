import { REVIVE_ZONE_IDS } from "./config";
import type { AdPlacementDefinition, AdPlacementName } from "./types";

export const MAX_AD_PLACEMENTS_PER_PAGE = 5;

export const AD_PLACEMENTS = {
  "blog-header-leaderboard": {
    fallback: {
      slotId:
        process.env.NEXT_PUBLIC_AD_SLOT_BLOG_HEADER ??
        process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_A ??
        "0000000000",
      variant: "leaderboard",
    },
    height: 250,
    lazy: false,
    width: 970,
    zoneId: REVIVE_ZONE_IDS["blog-header-leaderboard"],
  },
  "blog-content-leaderboard": {
    fallback: {
      slotId:
        process.env.NEXT_PUBLIC_AD_SLOT_BLOG_CONTENT ??
        process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ??
        "0000000000",
      variant: "leaderboard",
    },
    height: 90,
    lazy: true,
    width: 728,
    zoneId: REVIVE_ZONE_IDS["blog-content-leaderboard"],
  },
  "blog-sidebar": {
    fallback: {
      slotId:
        process.env.NEXT_PUBLIC_AD_SLOT_BLOG_SIDEBAR ??
        process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ??
        "0000000000",
      variant: "mediumrectangle",
    },
    height: 250,
    lazy: true,
    width: 300,
    zoneId: REVIVE_ZONE_IDS["blog-sidebar"],
  },
  "blog-sponsored-card": {
    fallback: {
      slotId:
        process.env.NEXT_PUBLIC_AD_SLOT_BLOG_SPONSORED ??
        process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_B ??
        "0000000000",
      variant: "rectangle",
    },
    height: 400,
    lazy: true,
    width: 600,
    zoneId: REVIVE_ZONE_IDS["blog-sponsored-card"],
  },
  "blog-footer-leaderboard": {
    fallback: {
      slotId:
        process.env.NEXT_PUBLIC_AD_SLOT_BLOG_FOOTER ??
        process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ??
        "0000000000",
      variant: "leaderboard",
    },
    height: 90,
    lazy: true,
    width: 728,
    zoneId: REVIVE_ZONE_IDS["blog-footer-leaderboard"],
  },
  "blog-mobile-sticky": {
    fallback: {
      slotId:
        process.env.NEXT_PUBLIC_AD_SLOT_BLOG_MOBILE_STICKY ??
        process.env.NEXT_PUBLIC_AD_SLOT_MOBILE_STICKY ??
        "0000000000",
      variant: "mobilebanner",
    },
    height: 50,
    lazy: false,
    width: 320,
    zoneId: REVIVE_ZONE_IDS["blog-mobile-sticky"],
  },
  "homepage-leaderboard": {
    fallback: {
      slotId: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_A ?? "0000000000",
      variant: "leaderboard",
    },
    height: 250,
    lazy: false,
    width: 970,
    zoneId: REVIVE_ZONE_IDS["homepage-leaderboard"],
  },
  "category-page-leaderboard": {
    fallback: {
      slotId:
        process.env.NEXT_PUBLIC_AD_SLOT_CATEGORY ??
        process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_A ??
        "0000000000",
      variant: "leaderboard",
    },
    height: 90,
    lazy: false,
    width: 728,
    zoneId: REVIVE_ZONE_IDS["category-page-leaderboard"],
  },
  "tool-page-leaderboard": {
    fallback: {
      slotId: process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000",
      variant: "leaderboard",
    },
    height: 90,
    lazy: false,
    width: 728,
    zoneId: REVIVE_ZONE_IDS["tool-page-leaderboard"],
  },
  "tool-sidebar": {
    fallback: {
      slotId: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "0000000000",
      variant: "mediumrectangle",
    },
    height: 250,
    lazy: true,
    width: 300,
    zoneId: REVIVE_ZONE_IDS["tool-sidebar"],
  },
  "below-tool": {
    fallback: {
      slotId: process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000",
      variant: "leaderboard",
    },
    height: 90,
    lazy: true,
    width: 728,
    zoneId: REVIVE_ZONE_IDS["below-tool"],
  },
  "tool-inline-card": {
    fallback: {
      slotId: process.env.NEXT_PUBLIC_AD_SLOT_TOOL_INLINE ?? "0000000000",
      variant: "rectangle",
    },
    height: 400,
    lazy: true,
    width: 600,
    zoneId: REVIVE_ZONE_IDS["tool-inline-card"],
  },
  "tool-footer-leaderboard": {
    fallback: {
      slotId:
        process.env.NEXT_PUBLIC_AD_SLOT_TOOL_FOOTER ??
        process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ??
        "0000000000",
      variant: "leaderboard",
    },
    height: 90,
    lazy: true,
    width: 728,
    zoneId: REVIVE_ZONE_IDS["tool-footer-leaderboard"],
  },
  "mobile-sticky": {
    fallback: {
      slotId: process.env.NEXT_PUBLIC_AD_SLOT_MOBILE_STICKY ?? "0000000000",
      variant: "mobilebanner",
    },
    height: 50,
    lazy: false,
    width: 320,
    zoneId: REVIVE_ZONE_IDS["mobile-sticky"],
  },
  "sponsored-tool-card": {
    fallback: {
      slotId: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_B ?? "0000000000",
      variant: "rectangle",
    },
    height: 400,
    lazy: true,
    width: 600,
    zoneId: REVIVE_ZONE_IDS["sponsored-tool-card"],
  },
} as const satisfies Record<AdPlacementName, AdPlacementDefinition>;
