import { affiliateOffers } from "./affiliate-map";

export function getAffiliateOffers(tool: {
  slug: string;
  category: string;
  name: string;
}) {
  const offers = Object.values(affiliateOffers);

  // 1. Category match
  const categoryMatches = offers.filter(o =>
    o.categories.includes(tool.category)
  );

  // 2. Keyword boosts (high intent)
  const keywordBoosts: string[] = [];

  if (tool.slug.includes("seo") || tool.slug.includes("keyword")) {
    keywordBoosts.push("ahrefs", "surfer");
  }

  if (tool.slug.includes("image") || tool.slug.includes("background")) {
    keywordBoosts.push("canva");
  }

  if (tool.slug.includes("password")) {
    keywordBoosts.push("nordvpn");
  }

  // Merge + dedupe
  const final = [
    ...keywordBoosts.map(k => affiliateOffers[k]),
    ...categoryMatches,
  ];

  return dedupe(final).slice(0, 3);
}

function dedupe(arr: any[]) {
  const seen = new Set();
  return arr.filter(item => {
    if (!item) return false;
    if (seen.has(item.key)) return false;
    seen.add(item.key);
    return true;
  });
}