export type AffiliateOffer = {
  key: string;
  name: string;
  description: string;
  url: string;
  categories: string[];
  priority: number;
};

export const affiliateOffers: Record<string, AffiliateOffer> = {
  grammarly: {
    key: "grammarly",
    name: "Grammarly",
    description: "Fix grammar, clarity, and tone instantly.",
    url: "https://grammarly.com/ref/YOUR_ID",
    categories: ["Writing"],
    priority: 10,
  },
  jasper: {
    key: "jasper",
    name: "Jasper AI",
    description: "Generate high-converting AI content.",
    url: "https://jasper.ai/ref/YOUR_ID",
    categories: ["Writing", "Marketing"],
    priority: 9,
  },
  quillbot: {
    key: "quillbot",
    name: "QuillBot",
    description: "Rewrite and paraphrase content easily.",
    url: "https://quillbot.com/ref/YOUR_ID",
    categories: ["Writing"],
    priority: 8,
  },
  copyai: {
    key: "copyai",
    name: "Copy.ai",
    description: "Create marketing copy in seconds.",
    url: "https://copy.ai/ref/YOUR_ID",
    categories: ["Writing", "Marketing"],
    priority: 7,
  },
  ahrefs: {
    key: "ahrefs",
    name: "Ahrefs",
    description: "Advanced SEO tools for serious growth.",
    url: "https://ahrefs.com/ref/YOUR_ID",
    categories: ["Marketing"],
    priority: 10,
  },
  surfer: {
    key: "surfer",
    name: "Surfer SEO",
    description: "Optimize content to rank higher on Google.",
    url: "https://surferseo.com/ref/YOUR_ID",
    categories: ["Marketing"],
    priority: 9,
  },
  seranking: {
    key: "seranking",
    name: "SE Ranking",
    description: "All-in-one SEO toolkit with recurring payouts.",
    url: "https://seranking.com/ref/YOUR_ID",
    categories: ["Marketing"],
    priority: 8,
  },
  digitalocean: {
    key: "digitalocean",
    name: "DigitalOcean",
    description: "Simple cloud hosting for developers.",
    url: "https://digitalocean.com/ref/YOUR_ID",
    categories: ["Developer"],
    priority: 10,
  },
  cloudways: {
    key: "cloudways",
    name: "Cloudways",
    description: "Managed cloud hosting with high payouts.",
    url: "https://cloudways.com/ref/YOUR_ID",
    categories: ["Developer"],
    priority: 9,
  },
  vercel: {
    key: "vercel",
    name: "Vercel",
    description: "Deploy modern web apps instantly.",
    url: "https://vercel.com/ref/YOUR_ID",
    categories: ["Developer"],
    priority: 7,
  },
  canva: {
    key: "canva",
    name: "Canva",
    description: "Create stunning visuals with ease.",
    url: "https://canva.com/ref/YOUR_ID",
    categories: ["Design", "Image"],
    priority: 10,
  },
  adobe: {
    key: "adobe",
    name: "Adobe Creative Cloud",
    description: "Professional design tools.",
    url: "https://adobe.com/ref/YOUR_ID",
    categories: ["Design"],
    priority: 8,
  },
  removebg: {
    key: "removebg",
    name: "remove.bg",
    description: "Remove image backgrounds instantly.",
    url: "https://remove.bg/ref/YOUR_ID",
    categories: ["Image"],
    priority: 9,
  },
  nordvpn: {
    key: "nordvpn",
    name: "NordVPN",
    description: "Secure your browsing and data.",
    url: "https://nordvpn.com/ref/YOUR_ID",
    categories: ["Security"],
    priority: 10,
  },
  notion: {
    key: "notion",
    name: "Notion",
    description: "Organize work and life in one place.",
    url: "https://notion.so/ref/YOUR_ID",
    categories: ["Productivity", "Business"],
    priority: 10,
  },
};
