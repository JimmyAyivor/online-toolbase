// src/lib/partners.ts
import ProductHuntLogo from "@/components/logos/product-hunt-logo";
import type { ComponentType } from "react";
import BetaListLogo from "@/components/logos/betalist-logo";
import StartupBaseLogo from "@/components/logos/startupbase-logo";
import SemrushLogo from "@/components/logos/semrush-logo";
import AlternativeToLogo from "@/components/logos/alternativeto-logo";
import ToolifyLogo from "@/components/logos/toolify-logo";
import FuturepediaLogo from "@/components/logos/futurepedia-logo";
import TinyStartUpsLogo from "@/components/logos/tinystartups-logo";
import MicroLaunchLogo from "@/components/logos/microlaunch-logo";
import SaaSHubLogo from "@/components/logos/saashub-logo";
import LaunchingNextLogo from "@/components/logos/launching-next-logo";
import AhrefsLogo from "@/components/logos/ahrefs-logo";
import MozLogo from "@/components/logos/moz-logo";
import SearchEngineJournalLogo from "@/components/logos/search-engine-journal-logo";
import NetlifyLogo from "@/components/logos/netlify-logo";
import BufferLogo from "@/components/logos/buffer-logo";
import SEOLogo from "@/components/logos/seo-logo";
import BacklinkoLogo from "@/components/logos/backlinko-logo";
import SearchEngineLandLogo from "@/components/logos/search-engine-land-logo";
import CloudflareLogo from "@/components/logos/cloudflare-logo";
import N8NLogo from "@/components/logos/n8n-logo";
import SmallSEOToolsLogo from "@/components/logos/smallseotools-logo";
import UbersuggestLogo from "@/components/logos/ubersuggest-logo";
import AnswerThePublicLogo from "@/components/logos/answer-the-public-logo";
import ScreamingFrogLogo from "@/components/logos/screaming-frog-logo";
import SeobilityLogo from "@/components/logos/seobility-logo";
import SEOptimerLogo from "@/components/logos/seoptimer-logo";
import PageSpeedLogo from "@/components/logos/pagespeed-logo";
import GitHubLogo from "@/components/logos/github-logo";
import CodePenLogo from "@/components/logos/codepen-logo";
import DevToLogo from "@/components/logos/devto-logo";
import HashnodeLogo from "@/components/logos/hashnode-logo";
import IndieHackersLogo from "@/components/logos/indie-hackers-logo";
import HackerNewsLogo from "@/components/logos/hackernews-logo";
import StackOverflowLogo from "@/components/logos/stackoverflow-logo";
import CanvaLogo from "@/components/logos/canva-logo";
import NotionLogo from "@/components/logos/notion-logo";
import ZapierLogo from "@/components/logos/zapier-logo";
import GTmetrixLogo from "@/components/logos/gtmetrix-logo";
import CloudwaysLogo from "@/components/logos/cloudways-logo";
import NordPassLogo from "@/components/logos/nordpass-logo";
import NordVPNLogo from "@/components/logos/nordvpn-logo";

export type Partner = {
    name: string;
    href: string;
    description: string;
    category: string;
    logo:
    | string
    | ComponentType<{ className?: string }>;  };
  
  export const partnerCategories = [
    "Launch Platforms",
    "SEO & Marketing",
    "Performance & Dev Tools",
    "Developer Communities",
    "Productivity & Design",
    "Hosting & Infrastructure",
  ] as const;
  
  export type PartnerCategory = (typeof partnerCategories)[number];
  
  export const partners: Partner[] = [
    // ── Launch Platforms ────────────────────────────────────────────────────────
    {
      name: "Product Hunt",
      href: "https://www.producthunt.com",
      description: "The place to launch and discover new products. One of the highest-traffic directories for tools and SaaS products.",
      category: "Launch Platforms",
      logo:ProductHuntLogo,
    },
    {
      name: "BetaList",
      href: "https://betalist.com",
      description: "Discover and get early access to tomorrow's startups. A curated directory for pre-launch and newly launched products.",
      category: "Launch Platforms",
      logo: BetaListLogo,
    },
    {
      name: "StartupBase",
      href: "https://startupbase.io",
      description: "A community-driven directory of startups and internet products, organised by category.",
      category: "Launch Platforms",
      logo: StartupBaseLogo,
    },
    {
      name: "AlternativeTo",
      href: "https://alternativeto.net",
      description: "The go-to site for finding alternatives to software and apps. High-intent traffic from users actively looking for tools.",
      category: "Launch Platforms",
      logo: AlternativeToLogo,
    },
    {
      name: "Toolify",
      href: "https://www.toolify.ai",
      description: "A large directory of AI and online tools. Strong organic traffic for tool-category searches.",
      category: "Launch Platforms",
      logo: ToolifyLogo,
    },
    {
      name: "Futurepedia",
      href: "https://www.futurepedia.io",
      description: "The largest AI tools directory with millions of monthly visitors. Excellent for discovery and backlinks.",
      category: "Launch Platforms",
      logo:  FuturepediaLogo,
    },
    {
      name: "Tiny Startups",
      href: "https://tinystartups.com",
      description: "A community and directory for indie-made products and micro-SaaS tools.",
      category: "Launch Platforms",
      logo: TinyStartUpsLogo,
    },
    {
      name: "Microlaunch",
      href: "https://microlaunch.net",
      description: "A launch platform built specifically for micro-SaaS and indie maker products.",
      category: "Launch Platforms",
      logo: MicroLaunchLogo,
    },
    {
      name: "SaaSHub",
      href: "https://www.saashub.com",
      description: "Software alternatives and reviews. Well-indexed by Google and a reliable source of referral traffic for tools.",
      category: "Launch Platforms",
      logo: SaaSHubLogo,
    },
    {
      name: "Launching Next",
      href: "https://www.launchingnext.com",
      description: "A startup and product directory for founders to share upcoming and newly launched tools.",
      category: "Launch Platforms",
      logo: LaunchingNextLogo,
    },
  
    // ── SEO & Marketing ─────────────────────────────────────────────────────────
    {
      name: "Ahrefs",
      href: "https://ahrefs.com",
      description: "The industry-standard SEO toolset for backlink analysis, keyword research, and site auditing.",
      category: "SEO & Marketing",
      logo: AhrefsLogo,
    },
    {
      name: "Semrush",
      href: "https://www.semrush.com",
      description: "An all-in-one digital marketing platform covering SEO, PPC, content, and competitive research.",
      category: "SEO & Marketing",
      logo: SemrushLogo,
    },
    {
      name: "Moz",
      href: "https://moz.com",
      description: "Trusted SEO software and resources including Domain Authority scores, Moz Pro, and the MozBar extension.",
      category: "SEO & Marketing",
      logo: MozLogo,
    },
    {
      name: "Search Engine Journal",
      href: "https://www.searchenginejournal.com",
      description: "One of the most respected SEO and digital marketing publications, covering industry news and in-depth guides.",
      category: "SEO & Marketing",
      logo: SearchEngineJournalLogo,
    },
    {
      name: "SEO.com",
      href: "https://seo.com",
      description: "SEO tools and resources helping businesses improve their search engine rankings and organic visibility.",
      category: "SEO & Marketing",
      logo: SEOLogo,
    },
    {
      name: "Buffer",
      href: "https://buffer.com",
      description: "Social media scheduling and analytics platform trusted by over 140,000 businesses worldwide.",
      category: "SEO & Marketing",
      logo: BufferLogo,
    },
    {
      name: "Search Engine Land",
      href: "https://searchengineland.com",
      description: "Breaking news and analysis covering SEO, SEM, Google, Bing, and the search marketing industry.",
      category: "SEO & Marketing",
      logo: SearchEngineLandLogo,
    },
    {
      name: "Backlinko",
      href: "https://backlinko.com",
      description: "Brian Dean's SEO training site — known for data-driven guides and the Skyscraper Technique.",
      category: "SEO & Marketing",
      logo: BacklinkoLogo,
    },
    {
      name: "SmallSEOTools",
      href: "https://smallseotools.com",
      description: "A large collection of free SEO and webmaster tools used by millions of website owners monthly.",
      category: "SEO & Marketing",
      logo: SmallSEOToolsLogo,
    },
    {
      name: "Ubersuggest",
      href: "https://neilpatel.com/ubersuggest",
      description: "Neil Patel's free keyword research and SEO audit tool, popular with bloggers and small businesses.",
      category: "SEO & Marketing",
      logo: UbersuggestLogo,
    },
    {
      name: "AnswerThePublic",
      href: "https://answerthepublic.com",
      description: "Visualises search questions and autocomplete data to reveal what people are asking about any topic.",
      category: "SEO & Marketing",
      logo: AnswerThePublicLogo,
    },
    {
      name: "Screaming Frog",
      href: "https://www.screamingfrog.co.uk",
      description: "The SEO Spider — the industry-standard website crawling tool for technical SEO audits.",
      category: "SEO & Marketing",
      logo: ScreamingFrogLogo,
    },
    {
      name: "Seobility",
      href: "https://www.seobility.net",
      description: "Comprehensive SEO software for website analysis, rank tracking, and backlink monitoring.",
      category: "SEO & Marketing",
      logo: SeobilityLogo,
    },
    {
      name: "SEOptimer",
      href: "https://www.seoptimer.com",
      description: "Free SEO audit tool that analyses websites and provides actionable improvement recommendations.",
      category: "SEO & Marketing",
      logo: SEOptimerLogo,
    },
  
    // ── Performance & Dev Tools ──────────────────────────────────────────────────
    {
      name: "GTmetrix",
      href: "https://gtmetrix.com",
      description: "Analyses website performance and provides detailed recommendations for improving page speed and Core Web Vitals.",
      category: "Performance & Dev Tools",
      logo: GTmetrixLogo,
    },
    {
      name: "PageSpeed Insights",
      href: "https://pagespeed.web.dev",
      description: "Google's free tool for measuring real-world and lab performance of web pages, powered by Lighthouse.",
      category: "Performance & Dev Tools",
      logo: PageSpeedLogo,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      description: "The world's largest code hosting platform, used by over 100 million developers to collaborate on software.",
      category: "Performance & Dev Tools",
      logo: GitHubLogo,
    },
    {
      name: "CodePen",
      href: "https://codepen.io",
      description: "A social development environment for front-end designers and developers to build, test, and showcase HTML, CSS, and JavaScript.",
      category: "Performance & Dev Tools",
      logo: CodePenLogo,
    },
  
    // ── Developer Communities ────────────────────────────────────────────────────
    {
      name: "Dev.to",
      href: "https://dev.to",
      description: "A constructive and inclusive community for software developers — great for publishing technical articles and driving traffic.",
      category: "Developer Communities",
      logo: DevToLogo,
    },
    {
      name: "Hashnode",
      href: "https://hashnode.com",
      description: "A blogging platform built for developers, with built-in SEO, newsletter, and community features.",
      category: "Developer Communities",
      logo: HashnodeLogo,
    },
    {
      name: "Indie Hackers",
      href: "https://www.indiehackers.com",
      description: "A community of founders building profitable online businesses. High-quality, engaged audience of builders and makers.",
      category: "Developer Communities",
      logo: IndieHackersLogo,
    },
    {
      name: "Hacker News",
      href: "https://news.ycombinator.com",
      description: "Y Combinator's social news site for anything relating to tech and startups. Show HN posts can drive massive traffic.",
      category: "Developer Communities",
      logo: HackerNewsLogo,
    },
    {
      name: "Stack Overflow",
      href: "https://stackoverflow.com",
      description: "The world's largest Q&A platform for programmers, with over 21 million questions across 170 topics.",
      category: "Developer Communities",
      logo: StackOverflowLogo,
    },
  
    // ── Productivity & Design ────────────────────────────────────────────────────
    {
      name: "Canva",
      href: "https://www.canva.com",
      description: "The world's most popular visual communication platform, used by over 170 million people for design, presentations, and content creation.",
      category: "Productivity & Design",
      logo: CanvaLogo,
    },
    {
      name: "Notion",
      href: "https://www.notion.so",
      description: "The all-in-one workspace combining notes, docs, databases, and project management for teams and individuals.",
      category: "Productivity & Design",
      logo: NotionLogo,
    },
    {
      name: "Zapier",
      href: "https://zapier.com",
      description: "The leading no-code automation platform connecting 6,000+ apps to automate workflows without writing code.",
      category: "Productivity & Design",
      logo: ZapierLogo,
    },
    {
      name: "n8n",
      href: "https://n8n.io",
      description: "A powerful open-source workflow automation tool — a developer-friendly alternative to Zapier with self-hosting support.",
      category: "Productivity & Design",
      logo: N8NLogo,
    },
  
    // ── Hosting & Infrastructure ─────────────────────────────────────────────────
    {
      name: "Cloudways",
      href: "https://www.cloudways.com/en/?id=2153484",
      description: "The leading CDN, DNS, and security platform trusted by millions of websites for performance and DDoS protection.",
      category: "Hosting & Infrastructure",
      logo: CloudwaysLogo,
    },
    {
      name: "NordVPN",
      href: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=145493&url_id=902",
      description: "Secure your browsing and data.Encrypt your connection and keep your data protected.",
      category: "Hosting & Infrastructure",
      logo: NordVPNLogo,
    },
    {
      name: "NordPass",
      href: "https://go.nordpass.io/aff_c?offer_id=488&aff_id=145493&url_id=9356",
      description: "A password manager that keeps your credentials protected and organized.",
      category: "Hosting & Infrastructure",
      logo: NordPassLogo,
    },
    {
      name: "Cloudflare",
      href: "https://www.cloudflare.com",
      description: "The leading CDN, DNS, and security platform trusted by millions of websites for performance and DDoS protection.",
      category: "Hosting & Infrastructure",
      logo: CloudflareLogo,
    },
    {
      name: "Vercel",
      href: "https://vercel.com",
      description: "The platform for front-end developers — instant deployments, edge functions, and the home of Next.js.",
      category: "Hosting & Infrastructure",
      logo: "▲",
    },
    {
      name: "Netlify",
      href: "https://www.netlify.com",
      description: "A cloud platform for deploying and scaling modern web applications with CI/CD, forms, and edge functions built in.",
      category: "Hosting & Infrastructure",
      logo: NetlifyLogo,
    },
  ];
  
  export function getPartnersByCategory(category: PartnerCategory): Partner[] {
    return partners.filter((p) => p.category === category);
  }