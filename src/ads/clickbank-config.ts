// src/ads/clickbank-config.ts
//
// ClickBank affiliate catalog — built from clickbank_all_offers.csv
// Last refreshed: May 2026
//
// ── Offer selection methodology ───────────────────────────────────────────────
// Every offer was scored by a composite metric:
//   score = (gravity × 0.50) + (epc × 20 × 0.25) + (cvr% × 100 × 0.25)
//
// Only offers with:
//   gravity  ≥ 15     (proven: affiliates are actively earning)
//   EPC      ≥ $0.20  (minimum earnings per click)
//   CVR      ≥ 0.15%  (minimum conversion rate)
// were considered. Offers with adult/explicit themes were excluded.
//
// ── Intent matching strategy ──────────────────────────────────────────────────
// Intent clusters match tool psychology, not just category labels:
//
//  Brain/Memory → user is processing information → primed for focus/memory offers
//  Sleep/Energy → user is calculating rest/time → primed for sleep/energy offers
//  Weight/Body  → user knows their numbers → primed for weight loss action
//  Finance/Income → user is thinking about money → primed for income/wealth offers
//  Social/Grow  → user wants reach/engagement → primed for income-online offers
//  DIY/Home     → user is measuring/planning → primed for hands-on projects
//  Education    → user is learning → primed for skill-building courses
//  Fun/Fate     → user wants novelty → primed for astrology/entertainment offers
//
// ── Hoplink format ────────────────────────────────────────────────────────────
// https://hop.clickbank.net/?affiliate=[YOUR_AFFILIATE_ID]&vendor=[VENDOR_ID]&tid=[tool-slug]
//
// NOTE (Aug 2026): switched from the affiliate.vendor.hop.clickbank.net subdomain
// format to ClickBank's documented query-param format after hitting SSL cert
// warnings — the two-nickname subdomain format isn't listed as a supported
// pattern in ClickBank's HopLinks Guide and its cert coverage is unreliable.
//
// ── .env ─────────────────────────────────────────────────────────────────────
// CLICKBANK_AFFILIATE_ID=your_nickname_here
//
// ── Refreshing offers ─────────────────────────────────────────────────────────
// 1. Download latest CSV from ClickBank Marketplace
// 2. Run: python3 scripts/cb-import.py clickbank_all_offers.csv
// 3. Review the output and paste updated entries here

export type ClickBankProduct = {
  key:           string;   // internal identifier
  vendorId:      string;   // ClickBank seller ID — used in hoplink
  name:          string;   // display name
  headline:      string;   // outcome-focused one-liner  ≤60 chars
  description:   string;   // 1–2 sentences, what they get
  badge?:        string;   // optional trust label
  icon:          string;   // emoji representing the offer
  intentCluster: string;   // which intent group this belongs to
  categories:    string[]; // site categories to match
  toolSlugs?:    string[]; // specific tool slugs (overrides category)
  priority:      number;   // 1–10, higher wins when multiple match
  // ── Performance data from CSV ──
  gravity:       number;   // ClickBank gravity (higher = more active affiliates)
  epc:           number;   // earnings per click (USD)
  cvr:           number;   // conversion rate (percentage)
  avgCommission: number;   // average commission per sale (USD)
  score:         number;   // composite score used for ranking
  active:        boolean;
};

export const CLICKBANK_PRODUCTS: Record<string, ClickBankProduct> = {

  // ════════════════════════════════════════════════════════════════════════════
  // BRAIN & MEMORY CLUSTER
  // Score drivers: Genius Song #1 CVR (1.84%), Brain Song #1 Gravity (183)
  // Best for: writing tools, text tools, productivity, education
  // Psychology: user is processing text/information → receptive to focus/memory
  // ════════════════════════════════════════════════════════════════════════════

  geniusSong: {
    key:           "geniusSong",
    vendorId:      "GENIUSBR",
    name:          "The Genius Song",
    headline:      "Sharpen memory in 7 minutes a day",
    description:   "A neuroscience-backed audio program that rewires memory and focus. Tens of thousands of users, 1.84% conversion rate.",
    badge:         "1.84% CVR",
    icon:          "🧠",
    intentCluster: "brain_memory",
    categories:    ["Writing", "Text", "Productivity", "Education"],
    toolSlugs:     [
      "word-character-counter", "reading-time-estimator", "text-summarizer",
      "readability-score-calculator", "keyword-density-checker",
      "sentence-counter", "text-difference-checker",
    ],
    priority:      10,
    gravity:       139.86,
    epc:           0.98,
    cvr:           1.84,
    avgCommission: 52.81,
    score:         120.8,
    active:        true,
  },

  brainSong: {
    key:           "brainSong",
    vendorId:      "BRAINSONGX",
    name:          "The Brain Song",
    headline:      "The #1 memory offer on ClickBank",
    description:   "A proven audio-based memory training program. Gravity 183 — the highest-ranked product on the entire ClickBank marketplace.",
    badge:         "Gravity 183",
    icon:          "🎵",
    intentCluster: "brain_memory",
    categories:    ["Writing", "Text", "Education", "Productivity"],
    toolSlugs:     [
      "essay-title-generator", "writing-prompt-generator", "rhyme-finder",
      "text-to-bullet-points", "markdown-to-html-converter",
    ],
    priority:      9,
    gravity:       182.51,
    epc:           0.30,
    cvr:           0.57,
    avgCommission: 52.98,
    score:         107.0,
    active:        true,
  },

  memoryWave: {
    key:           "memoryWave",
    vendorId:      "MEMORYW",
    name:          "The Memory Wave",
    headline:      "Train your brain to remember anything",
    description:   "A frequency-based audio program that activates long-term memory retention. 1.11% CVR, $54 average commission.",
    icon:          "〰️",
    intentCluster: "brain_memory",
    categories:    ["Education", "Productivity"],
    toolSlugs:     ["pomodoro-timer", "countdown-timer", "online-stopwatch"],
    priority:      8,
    gravity:       78.62,
    epc:           0.60,
    cvr:           1.11,
    avgCommission: 54.22,
    score:         70.1,
    active:        true,
  },

  geniusSwitch: {
    key:           "geniusSwitch",
    vendorId:      "THEGENIUSX",
    name:          "The Genius Switch",
    headline:      "Activate the hidden genius in your brain",
    description:   "A 7-minute daily audio ritual based on Stanford neuroplasticity research. 1.17% CVR — one of the highest in the brain niche.",
    badge:         "1.17% CVR",
    icon:          "💡",
    intentCluster: "brain_memory",
    categories:    ["Productivity", "Education"],
    toolSlugs:     ["meeting-cost-calculator", "time-zone-converter", "date-difference-calculator"],
    priority:      8,
    gravity:       47.68,
    epc:           0.62,
    cvr:           1.17,
    avgCommission: 51.30,
    score:         56.2,
    active:        true,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SLEEP & ENERGY CLUSTER
  // Score drivers: Energy Revolution #1 gravity (151), YU Sleep $131 avg
  // Best for: sleep calculator, pomodoro timer, productivity tools
  // Psychology: user is managing time/rest → primed for sleep/energy solutions
  // ════════════════════════════════════════════════════════════════════════════

  energyRevolution: {
    key:           "energyRevolution",
    vendorId:      "ENREV",
    name:          "Energy Revolution System",
    headline:      "All-day energy without caffeine or crashes",
    description:   "A natural energy system used by 85,000+ people. 1.21% CVR and $0.60 EPC — one of the most consistent converters on the marketplace.",
    badge:         "1.21% CVR",
    icon:          "⚡",
    intentCluster: "sleep_energy",
    categories:    ["Health", "Productivity"],
    toolSlugs:     [
      "pomodoro-timer", "meeting-cost-calculator", "time-zone-converter",
      "countdown-timer", "online-stopwatch",
    ],
    priority:      10,
    gravity:       150.77,
    epc:           0.60,
    cvr:           1.21,
    avgCommission: 49.44,
    score:         108.6,
    active:        true,
  },

  yuSleep: {
    key:           "yuSleep",
    vendorId:      "YUSLEEP",
    name:          "YU Sleep",
    headline:      "Fall asleep in 12 minutes — proven formula",
    description:   "The #1 sleep offer on ClickBank in 2026. $131 average commission per sale, Gravity 89. New VSL converts cold traffic.",
    badge:         "$131 avg sale",
    icon:          "😴",
    intentCluster: "sleep_energy",
    categories:    ["Health"],
    toolSlugs:     ["sleep-calculator", "pomodoro-timer"],
    priority:      10,
    gravity:       89.05,
    epc:           0.47,
    cvr:           0.34,
    avgCommission: 131.01,
    score:         55.4,
    active:        true,
  },

  derilaErgo: {
    key:           "derilaErgo",
    vendorId:      "DERILAERGO",
    name:          "Derila Ergonomic Pillow",
    headline:      "Wake up pain-free with the right support",
    description:   "A memory foam pillow engineered for neck and shoulder alignment. 2.96% CVR — the highest on this list. Physical product, ships globally.",
    badge:         "2.96% CVR — top converter",
    icon:          "🛏️",
    intentCluster: "sleep_energy",
    categories:    ["Health"],
    toolSlugs:     ["sleep-calculator"],
    priority:      9,
    gravity:       59.71,
    epc:           1.76,
    cvr:           2.96,
    avgCommission: 51.24,
    score:         112.7,
    active:        true,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // WEIGHT & BODY HEALTH CLUSTER
  // Best for: BMI, calorie, body fat, water intake, protein, macro tools
  // Psychology: user knows their body numbers → ready to act on them
  // ════════════════════════════════════════════════════════════════════════════

  acvDetox: {
    key:           "acvDetox",
    vendorId:      "DWAHLER",
    name:          "Apple Cider Vinegar Detox",
    headline:      "Lose weight with this 21-day detox system",
    description:   "A proven weight loss programme using apple cider vinegar. 1.46% CVR, broad audience appeal — one of the safest bets for health tool pages.",
    badge:         "1.46% CVR",
    icon:          "🍎",
    intentCluster: "weight_health",
    categories:    ["Health"],
    toolSlugs:     [
      "bmi-calculator", "calorie-calculator", "calorie-deficit-calculator",
      "calorie-macro-calculator", "body-fat-calculator",
    ],
    priority:      10,
    gravity:       26.31,
    epc:           0.38,
    cvr:           1.46,
    avgCommission: 24.69,
    score:         51.6,
    active:        true,
  },

  moringaMagic: {
    key:           "moringaMagic",
    vendorId:      "MORINGAMAG",
    name:          "Moringa Magic",
    headline:      "The most nutrient-dense plant on Earth",
    description:   "A moringa supplement with 46 antioxidants, studied for energy, immunity, and weight management. 1.02% CVR, $1.29 EPC, $130 avg commission.",
    badge:         "$130 avg sale",
    icon:          "🌿",
    intentCluster: "weight_health",
    categories:    ["Health"],
    toolSlugs:     [
      "water-intake-calculator", "protein-intake-calculator",
      "calorie-macro-calculator", "body-fat-calculator",
    ],
    priority:      9,
    gravity:       18.13,
    epc:           1.29,
    cvr:           1.02,
    avgCommission: 129.77,
    score:         41.0,
    active:        true,
  },

  cardioSlimTea: {
    key:           "cardioSlimTea",
    vendorId:      "CARDIOSLIM",
    name:          "Cardio Slim Tea",
    headline:      "Flatten your belly with one cup a day",
    description:   "A metabolism-boosting tea formula backed by 18 herbs. Gravity 67, $160 average commission — one of the highest-payout weight loss offers available.",
    badge:         "$160 avg sale",
    icon:          "🍵",
    intentCluster: "weight_health",
    categories:    ["Health"],
    toolSlugs:     ["bmi-calculator", "calorie-deficit-calculator", "calorie-calculator"],
    priority:      8,
    gravity:       66.61,
    epc:           0.34,
    cvr:           0.20,
    avgCommission: 159.60,
    score:         40.0,
    active:        true,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FINANCE & INCOME CLUSTER
  // Best for: budget planner, loan/mortgage, investment, compound interest
  // Psychology: user is thinking about money → receptive to wealth/income offers
  // ════════════════════════════════════════════════════════════════════════════

  moneyScript: {
    key:           "moneyScript",
    vendorId:      "MONEYSCRIP",
    name:          "The Money Script",
    headline:      "Rewire your mindset to attract wealth",
    description:   "A neuroscience-based wealth psychology programme. 1.47% CVR and $0.75 EPC — one of the strongest performing finance offers in the marketplace.",
    badge:         "1.47% CVR",
    icon:          "💰",
    intentCluster: "finance_income",
    categories:    ["Finance", "Business"],
    toolSlugs:     [
      "budget-planner", "compound-interest-calculator", "investment-return-calculator",
      "freelance-rate-calculator", "hourly-to-salary-calculator",
      "mortgage-affordability-calculator", "credit-card-payoff-calculator",
    ],
    priority:      10,
    gravity:       19.96,
    epc:           0.75,
    cvr:           1.47,
    avgCommission: 48.95,
    score:         50.5,
    active:        true,
  },

  teslaWealthScript: {
    key:           "teslaWealthScript",
    vendorId:      "TESLAWS18",
    name:          "Tesla Wealth Script",
    headline:      "Activate the Tesla frequency for wealth",
    description:   "A manifestation and wealth mindset programme based on Tesla's 369 method. 0.89% CVR, broad appeal across financial and business audiences.",
    icon:          "⚡",
    intentCluster: "finance_income",
    categories:    ["Finance", "Business", "Productivity"],
    toolSlugs:     [
      "loan-mortgage-calculator", "mortgage-calculator", "invoice-generator",
      "vat-calculator", "discount-calculator",
    ],
    priority:      8,
    gravity:       23.77,
    epc:           0.51,
    cvr:           0.89,
    avgCommission: 55.60,
    score:         36.7,
    active:        true,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SOCIAL MEDIA & ONLINE INCOME CLUSTER
  // Best for: hashtag, engagement rate, TikTok, Instagram, content calendar
  // Psychology: user wants reach/followers → receptive to income-from-content offers
  // ════════════════════════════════════════════════════════════════════════════

  // moneyScript doubles here — online content creators think about money too
  // Using same product, different pitch angle handled in copy

  soulManifest: {
    key:           "soulManifest",
    vendorId:      "00SMANIF",
    name:          "Soul Manifestation",
    headline:      "Manifest the life your content is pointing to",
    description:   "A personalised manifestation programme based on your birth date and name. 1.20% CVR with a $34 average payout — broad appeal for social and fun audiences.",
    badge:         "1.20% CVR",
    icon:          "✨",
    intentCluster: "social_fun",
    categories:    ["Social Media", "Marketing", "Fun"],
    toolSlugs:     [
      "hashtag-generator", "tiktok-hook-generator", "viral-hook-generator",
      "instagram-post-planner", "social-media-bio-generator",
    ],
    priority:      9,
    gravity:       25.85,
    epc:           0.40,
    cvr:           1.20,
    avgCommission: 33.85,
    score:         44.9,
    active:        true,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // DIY & HOME CLUSTER
  // Best for: unit converter, tip calculator, general calculators
  // Psychology: user is practical, measuring, planning → DIY project offer
  // ════════════════════════════════════════════════════════════════════════════

  tedsWoodworking: {
    key:           "tedsWoodworking",
    vendorId:      "TEDSPLANS",
    name:          "TedsWoodworking",
    headline:      "16,000 woodworking plans — start building today",
    description:   "The highest-converting woodworking offer online. Gravity 108, 0.50% CVR. Evergreen DIY audience — appeals to the practical, hands-on users of calculator and converter tools.",
    badge:         "Gravity 108",
    icon:          "🪵",
    intentCluster: "diy_home",
    categories:    ["Calculator", "Education"],
    toolSlugs:     [
      "unit-converter", "tip-calculator", "percentage-calculator",
      "fraction-calculator", "speed-distance-time-calculator",
      "aspect-ratio-calculator", "random-number-generator",
    ],
    priority:      10,
    gravity:       107.58,
    epc:           0.35,
    cvr:           0.50,
    avgCommission: 65.78,
    score:         68.0,
    active:        true,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // EDUCATION & SKILLS CLUSTER
  // Best for: writing prompts, essay tools, rhyme finder, reading time
  // Psychology: user is learning or creating → receptive to skill courses
  // ════════════════════════════════════════════════════════════════════════════

  pianoforall: {
    key:           "pianoforall",
    vendorId:      "PIANO4ALL",
    name:          "Pianoforall",
    headline:      "Learn piano and keyboard in 30 days",
    description:   "A revolutionary self-paced piano course used by 500,000+ students. 1.10% CVR and Gravity 42 — the most enduring education offer in the marketplace.",
    badge:         "500k students",
    icon:          "🎹",
    intentCluster: "education",
    categories:    ["Education", "Fun"],
    toolSlugs:     [
      "writing-prompt-generator", "essay-title-generator", "rhyme-finder",
      "slogan-generator", "business-name-generator",
    ],
    priority:      10,
    gravity:       42.41,
    epc:           0.34,
    cvr:           1.10,
    avgCommission: 29.48,
    score:         50.4,
    active:        true,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FUN & ASTROLOGY CLUSTER
  // Best for: random number generator, meme generator, fun tools
  // Psychology: user is in a playful/curious mindset → high receptivity to fate/destiny
  // ════════════════════════════════════════════════════════════════════════════

  moonReading: {
    key:           "moonReading",
    vendorId:      "THOUGHTOP",
    name:          "Moon Reading",
    headline:      "Your personalised moon sign reading",
    description:   "An interactive astrology reading that generates a unique birth chart report. Gravity 83, 0.82% CVR — one of the most viral spiritual offers in the market.",
    badge:         "Gravity 83",
    icon:          "🌙",
    intentCluster: "fun_astrology",
    categories:    ["Fun"],
    toolSlugs:     [
      "random-number-generator", "meme-generator", "dice-roller",
      "qr-code-generator", "uuid-guid-generator", "random-name-generator",
    ],
    priority:      10,
    gravity:       82.55,
    epc:           0.25,
    cvr:           0.82,
    avgCommission: 27.73,
    score:         63.0,
    active:        true,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // DEVELOPER / SECURITY TOOLS CLUSTER
  // Most CB health/wealth offers don't map well to developer intent.
  // Best fallback: brain/memory (developers want cognitive performance)
  // ════════════════════════════════════════════════════════════════════════════
  // → geniusSong and energyRevolution are used here as the category fallback

};

// ── Intent cluster fallback map ────────────────────────────────────────────────
// When a tool doesn't match any toolSlugs, pick the best offer for its category
// using this intent mapping (category string → intentCluster key)

export const CATEGORY_INTENT_MAP: Record<string, string> = {
  Writing:      "brain_memory",
  Text:         "brain_memory",
  Education:    "education",
  Productivity: "sleep_energy",
  Health:       "weight_health",
  Finance:      "finance_income",
  Business:     "finance_income",
  Marketing:    "social_fun",
  "Social Media": "social_fun",
  Calculator:   "diy_home",
  Fun:          "fun_astrology",
  Design:       "brain_memory",
  Image:        "brain_memory",
  Security:     "brain_memory",
  Developer:    "brain_memory",
  Document:     "brain_memory",
  Analytics:    "finance_income",
};

// ── Selection logic ────────────────────────────────────────────────────────────

/**
 * Selects the best ClickBank product for a given tool.
 *
 * Priority order:
 *   1. Exact toolSlug match, sorted by score desc
 *   2. Category → intentCluster match, sorted by score desc
 *   3. null (no ad shown)
 */
export function selectClickBankProduct(tool: {
  slug: string;
  category: string;
}): ClickBankProduct | null {
  const active = Object.values(CLICKBANK_PRODUCTS).filter(p => p.active);

  // 1. Exact slug match
  const bySlug = active
    .filter(p => p.toolSlugs?.includes(tool.slug))
    .sort((a, b) => b.score - a.score);
  if (bySlug.length > 0) return bySlug[0];

  // 2. Category → intent cluster match
  const clusterKey = CATEGORY_INTENT_MAP[tool.category];
  if (clusterKey) {
    const byCluster = active
      .filter(p => p.intentCluster === clusterKey)
      .sort((a, b) => b.score - a.score);
    if (byCluster.length > 0) return byCluster[0];
  }

  // 3. Fallback: highest-scoring active product with matching category
  const byCategory = active
    .filter(p => p.categories.includes(tool.category))
    .sort((a, b) => b.score - a.score);
  if (byCategory.length > 0) return byCategory[0];

  return null;
}

/**
 * Builds the ClickBank hoplink.
 * tid param lets you track which tool slug drove the conversion in CB reporting.
 */
export function buildHopLink(
  vendorId: string,
  affiliateId: string,
  toolSlug: string
): string {
  return `https://hop.clickbank.net/?affiliate=${affiliateId}&vendor=${vendorId}&tid=${toolSlug}`;
}