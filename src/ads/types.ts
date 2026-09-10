export type AdPlacementName =
  | "blog-header-leaderboard"
  | "blog-content-leaderboard"
  | "blog-sidebar"
  | "blog-sponsored-card"
  | "blog-footer-leaderboard"
  | "blog-mobile-sticky"
  | "homepage-leaderboard"
  | "category-page-leaderboard"
  | "tool-page-leaderboard"
  | "tool-sidebar"
  | "below-tool"
  | "tool-inline-card"
  | "tool-footer-leaderboard"
  | "mobile-sticky"
  | "sponsored-tool-card";

export type AdContext = {
  category?: string;
  toolSlug?: string;
};

export type NetworkFallback = {
  slotId: string;
  variant:
    | "leaderboard"
    | "rectangle"
    | "halfpage"
    | "mediumrectangle"
    | "mobilebanner"
    | "responsive";
};

export type AdPlacementDefinition = {
  fallback: NetworkFallback;
  height: number;
  lazy: boolean;
  width: number;
  zoneId: string | null;
};
