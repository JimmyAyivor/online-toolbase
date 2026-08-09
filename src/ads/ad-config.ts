// src/ads/ad-config.ts
//
// Sponsored ad configuration for https://www.onlinetoolbase.com
//
// ── Revenue model ────────────────────────────────────────────────────────────
// Charge brands a flat monthly CPM or fixed weekly fee for placement.
// Ads rotate across tool pages by category matching.
// All clicks are tracked in the `sponsored_ad_clicks` Postgres table.
//
// ── Adding a new sponsor ─────────────────────────────────────────────────────
// 1. Add an entry to SPONSORED_ADS below
// 2. Upload the sponsor's logo to /public/ads/[key]-logo.png
// 3. Upload the ad creative image to /public/ads/[key]-creative.png
// 4. Run: npx prisma db push (or add the SQL table manually — see bottom of file)
// 5. Update ACTIVE_AD_KEYS to include the new key
//
// ── Targeting ────────────────────────────────────────────────────────────────
// Each ad targets one or more tool categories.
// Categories: Writing, Marketing, Developer, Design, Image, Security,
//             Finance, Productivity, Business, Social Media, Health,
//             Calculator, Text, Education, Analytics, Fun, Document
//
// ── SQL table (run once) ─────────────────────────────────────────────────────
// create table sponsored_ad_clicks (
//   id          uuid primary key default gen_random_uuid(),
//   ad_key      text not null,
//   tool_slug   text,
//   ip          text,
//   user_agent  text,
//   referrer    text,
//   created_at  timestamptz not null default now()
// );
// create index on sponsored_ad_clicks (ad_key, created_at desc);
// create index on sponsored_ad_clicks (tool_slug, created_at desc);

export type SponsoredAd = {
  /** Unique key — must match logo/creative filenames */
  key: string;
  /** Brand name shown in the ad header */
  brandName: string;
  /** Absolute URL to brand logo (square, 64x64px min, shown as circle) */
  logoUrl: string;
  /** Short headline — max 40 chars */
  headline: string;
  /** Supporting description — max 80 chars */
  description: string;
  /** Ad creative image — 1:1 ratio, 128x128px min */
  creativeUrl: string;
  /** Destination URL (your tracking route handles the redirect) */
  destinationUrl: string;
  /** Tool categories this ad targets — shown on matching tool pages */
  categories: string[];
  /** If true, shown on all tool pages regardless of category */
  showEverywhere?: boolean;
  /** Priority 1–10 — higher wins when multiple ads match a category */
  priority: number;
  /** Whether this ad is currently active */
  active: boolean;
};

export const SPONSORED_ADS: Record<string, SponsoredAd> = {
  // grammarly: {
  //   key: "grammarly",
  //   brandName: "Grammarly",
  //   logoUrl: "https://www.grammarly.com/favicon.ico",
  //   headline: "Write with confidence",
  //   description: "Catch errors across every app you use — email, docs, social.",
  //   creativeUrl: "/ads/grammarly-creative.png",
  //   destinationUrl: "https://grammarly.com",
  //   categories: ["Writing", "Text", "Education"],
  //   priority: 10,
  //   active: true,
  // },
  // semrush: {
  //   key: "semrush",
  //   brandName: "Semrush",
  //   logoUrl: "https://www.semrush.com/favicon.ico",
  //   headline: "Outrank your competitors",
  //   description: "See exactly what drives their traffic — and how to beat it.",
  //   creativeUrl: "/ads/semrush-creative.png",
  //   destinationUrl: "https://semrush.com",
  //   categories: ["Marketing", "Analytics"],
  //   priority: 10,
  //   active: true,
  // },
  nordvpn: {
    key: "nordvpn",
    brandName: "NordVPN",
    logoUrl: "https://nordvpn.com/favicon.ico",
    headline: "Browse privately",
    description: "Encrypt your connection and keep your data protected.",
    creativeUrl: "/ads/nordvpn-creative.png",
    destinationUrl:
      "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=145493&url_id=902",
    categories: ["Security", "Developer"],
    priority: 10,
    active: true,
  },
  nordpass: {
    key: "nordpass",
    brandName: "NordPass",
    logoUrl: "https://nordvpn.com/favicon.ico",
    headline: "Browse privately",
    description:
      "A password manager that keeps your credentials protected and organized.",
    creativeUrl: "/ads/nordvpn-creative.png",
    destinationUrl:
      "https://go.nordpass.io/aff_c?offer_id=488&aff_id=145493&url_id=9356",
    categories: ["Security", "Developer"],
    priority: 10,
    active: true,
  },
  digitalocean: {
    key: "digitalocean",
    brandName: "DigitalOcean",
    logoUrl: "https://www.digitalocean.com/favicon.ico",
    headline: "Deploy in minutes",
    description: "Simple, predictable cloud hosting developers love.",
    creativeUrl: "/ads/digitalocean-creative.png",
    destinationUrl: "https://digitalocean.com",
    categories: ["Developer"],
    priority: 10,
    active: true,
  },
  // jasper: {
  //   key: "jasper",
  //   brandName: "Jasper AI",
  //   logoUrl: "https://www.jasper.ai/favicon.ico",
  //   headline: "10× your content output",
  //   description: "Write blog posts, ads, and social copy in your brand voice.",
  //   creativeUrl: "/ads/jasper-creative.png",
  //   destinationUrl: "https://jasper.ai",
  //   categories: ["Writing", "Marketing", "Social Media"],
  //   priority: 9,
  //   active: true,
  // },
  // fiverr: {
  //   key: "fiverr",
  //   brandName: "Fiverr",
  //   logoUrl: "https://www.fiverr.com/favicon.ico",
  //   headline: "Hire expert freelancers",
  //   description: "Get any project done — design, code, writing, and more.",
  //   creativeUrl: "/ads/fiverr-creative.png",
  //   destinationUrl: "https://fiverr.com",
  //   categories: ["Business", "Design", "Writing"],
  //   showEverywhere: true,
  //   priority: 7,
  //   active: true,
  // },
};

// ── Ad selection logic ────────────────────────────────────────────────────────

/**
 * Returns the best matching ad for a given tool.
 * Priority order:
 *   1. Category match with highest priority
 *   2. showEverywhere ads as fallback
 */
export function selectAdForTool(tool: {
  slug: string;
  category: string;
}): SponsoredAd | null {
  const activeAds = Object.values(SPONSORED_ADS).filter((ad) => ad.active);

  // Category matches first
  const categoryMatches = activeAds
    .filter((ad) => ad.categories.includes(tool.category))
    .sort((a, b) => b.priority - a.priority);

  if (categoryMatches.length > 0) return categoryMatches[0];

  // Fallback to showEverywhere
  const fallbacks = activeAds
    .filter((ad) => ad.showEverywhere)
    .sort((a, b) => b.priority - a.priority);

  return fallbacks[0] || null;
}

/**
 * Returns a random ad from category matches (for A/B rotation).
 * Use this if you want to rotate rather than always show the top priority ad.
 */
export function rotateAdForTool(tool: {
  slug: string;
  category: string;
}): SponsoredAd | null {
  const activeAds = Object.values(SPONSORED_ADS).filter((ad) => ad.active);
  const pool = activeAds.filter(
    (ad) => ad.categories.includes(tool.category) || ad.showEverywhere,
  );
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
