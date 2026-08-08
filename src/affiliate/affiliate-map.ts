// src/affiliate/affiliate-map.ts
//
// Status of each program (April 2026):
//   grammarly   ✅ Applied — instant approval
//   jasper      ✅ Apply at jasper.ai/partners
//   quillbot    ✅ Apply at quillbot.com/affiliates (PartnerStack)
//   copyai      ✅ Apply at copy.ai/affiliate-program
//   semrush     ✅ Applied — pending approval (Impact)
//   surfer      ✅ Apply at surferseo.com/affiliate-program (selective)
//   seranking   ✅ Apply at seranking.com/affiliate-program
//   digitalocean ✅ Apply at digitalocean.com/affiliates (CJ Affiliate)
//   cloudways   ✅ Apply at cloudways.com/en/web-hosting-affiliate-program.php
//   adobe       ✅ Apply at adobe.com/affiliates (CJ Affiliate)
//   removebg    ✅ Apply at remove.bg/affiliate
//   nordvpn     ✅ Applied — apply at nordvpn.com/affiliate
//   fiverr      ✅ Apply at affiliates.fiverr.com
//   hubspot     ✅ Apply at hubspot.com/partners/affiliates
//
// Removed:
//   ahrefs  — no public affiliate program
//   canva   — Canvassador program closed, not suitable for tool sites
//   vercel  — no affiliate program
//   notion  — not accepting new affiliates

export type AffiliateOffer = {
  key: string;
  name: string;
  description: string;
  url: string;
  categories: string[];
  priority: number;
};

export const affiliateOffers: Record<string, AffiliateOffer> = {
  // ── Writing ──────────────────────────────────────────────────────────────────
  // grammarly: {
  //   key: "grammarly",
  //   name: "Grammarly",
  //   description: "Fix grammar, clarity, and tone instantly.",
  //   url: "https://grammarly.com/ref/YOUR_ID",
  //   categories: ["Writing"],
  //   priority: 10,
  // },
  // quillbot: {
  //   key: "quillbot",
  //   name: "QuillBot",
  //   description: "Rewrite and paraphrase content easily.",
  //   url: "https://quillbot.com/ref/YOUR_ID",
  //   categories: ["Calculator"],
  //   priority: 9,
  // },
  // jasper: {
  //   key: "jasper",
  //   name: "Jasper AI",
  //   description: "Generate high-converting AI content.",
  //   url: "https://jasper.ai/ref/YOUR_ID",
  //   categories: ["Writing", "Marketing", "Social Media"],
  //   priority: 8,
  // },
  // copyai: {
  //   key: "copyai",
  //   name: "Copy.ai",
  //   description: "Create marketing copy in seconds.",
  //   url: "https://copy.ai/ref/YOUR_ID",
  //   categories: ["Writing", "Marketing"],
  //   priority: 7,
  // },

  // ── Marketing / SEO ──────────────────────────────────────────────────────────
  // semrush: {
  //   key: "semrush",
  //   name: "Semrush",
  //   description: "Advanced SEO and marketing toolkit.",
  //   url: "https://semrush.sjv.io/YOUR_ID", // ← replace with your Impact tracking link
  //   categories: ["Marketing"],
  //   priority: 10,
  // },
  // surfer: {
  //   key: "surfer",
  //   name: "Surfer SEO",
  //   description: "Optimize content to rank higher on Google.",
  //   url: "https://surferseo.com/ref/YOUR_ID",
  //   categories: ["Marketing"],
  //   priority: 9,
  // },
  // seranking: {
  //   key: "seranking",
  //   name: "SE Ranking",
  //   description: "All-in-one SEO toolkit with recurring payouts.",
  //   url: "https://seranking.com/ref/YOUR_ID",
  //   categories: ["Marketing"],
  //   priority: 8,
  // },

  // ── Developer / Hosting ───────────────────────────────────────────────────────
  // digitalocean: {
  //   key: "digitalocean",
  //   name: "DigitalOcean",
  //   description: "Simple cloud hosting for developers.",
  //   url: "https://digitalocean.com/ref/YOUR_ID",
  //   categories: ["Developer"],
  //   priority: 10,
  // },
  cloudways: {
    key: "cloudways",
    name: "Cloudways",
    description: "Managed Cloud Hosting Platform Simplified.",
    url: "https://www.cloudways.com/en/?id=2153484",
    categories: ["Developer"],
    priority: 10,
  },

  // ── Design / Image ────────────────────────────────────────────────────────────
  // adobe: {
  //   key: "adobe",
  //   name: "Adobe Creative Cloud",
  //   description: "Professional creative tools for design and more.",
  //   url: "https://adobe.com/ref/YOUR_ID",
  //   categories: ["Design", "Image", "Document"],
  //   priority: 10,
  // },
  // removebg: {
  //   key: "removebg",
  //   name: "remove.bg",
  //   description: "Remove image backgrounds instantly.",
  //   url: "https://remove.bg/ref/YOUR_ID",
  //   categories: ["Image"],
  //   priority: 9,
  // },

  // ── Security ──────────────────────────────────────────────────────────────────
  nordvpn: {
    key: "nordvpn",
    name: "NordVPN",
    description: "Secure your browsing and data.",
    url: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=145493&url_id=902",
    categories: ["Security"],
    priority: 10,
  },
  nordpass: {
    key: "nordpass",
    name: "NordPass",
    description:
      "A password manager that keeps your credentials protected and organized.",
    url: "https://go.nordpass.io/aff_c?offer_id=488&aff_id=145493&url_id=9356",
    categories: ["Security"],
    priority: 10,
  },
  // ── Business / Productivity ───────────────────────────────────────────────────
  // fiverr: {
  //   key: "fiverr",
  //   name: "Fiverr",
  //   description: "Hire expert freelancers for any project.",
  //   url: "https://go.fiverr.com/visit/?bta=YOUR_ID&brand=fiverrcpa",
  //   categories: ["Business", "Design", "Writing"],
  //   priority: 10,
  // },
  // hubspot: {
  //   key: "hubspot",
  //   name: "HubSpot",
  //   description: "CRM and marketing tools for growing businesses.",
  //   url: "https://hubspot.com/ref/YOUR_ID",
  //   categories: ["Business", "Marketing"],
  //   priority: 9,
  // },
};
