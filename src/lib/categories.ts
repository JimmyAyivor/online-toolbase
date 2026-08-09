// src/lib/categories.ts
//
// Canonical category taxonomy for SEO category pages.
// tools.ts keeps its existing (messy) `category` strings — we never touch
// tool data. This file maps those raw strings to a clean set of canonical
// categories and carries the SEO copy for each one.
//
// Why a mapping layer instead of rewriting tools.ts:
// - tools.ts has 17 raw category values with inconsistent casing
//   ("Developer" vs "social-media") and several are too thin (1-2 tools)
//   to support their own indexable page.
// - Renormalizing 130+ tool entries by hand is error-prone. Mapping from
//   raw -> canonical here is a single source of truth and is trivially
//   reversible if you want to un-merge a category later.

import { tools, type Tool } from "@/lib/tools";

export type CategoryFaq = {
  question: string;
  answer: string;
};

export type Category = {
  /** URL slug — /tools/category/[slug] */
  slug: string;
  /** Display name, used in H1 / nav / breadcrumbs */
  name: string;
  /** <title> tag. Keep under ~60 chars. */
  title: string;
  /** <meta name="description">. 150-160 chars. */
  metaDescription: string;
  /** Unique 150-250 word intro rendered above the tool grid. Plain text,
   *  paragraphs separated by \n\n — render with a simple split+map. */
  intro: string;
  /** 3-5 category-specific FAQs. Also powers FAQPage schema. */
  faqs: CategoryFaq[];
  /** Slugs of 3-4 related categories, for internal linking. */
  relatedSlugs: string[];
  /** Raw `category` values from tools.ts that map into this category. */
  rawCategories: string[];
};

export const categories: Category[] = [
  {
    slug: "developer-tools",
    name: "Developer & Code Tools",
    title: "Free Developer Tools Online (20+) | Online Tool Base",
    metaDescription:
      "Free browser-based developer tools — JSON formatter, regex tester, UUID generator, Base64 encoder, JWT decoder & more. No signup, nothing leaves your browser.",
    intro:
      "Developer tools that don't send your data anywhere. Every tool here — the JSON formatter, regex tester, UUID generator, Base64 encoder, JWT decoder, and hash generator among them — runs entirely in your browser. That matters more than it sounds: pasting an API response, a config file, or a token with credentials into a random web tool means trusting a server you don't control. Ours never see it.\n\nMost of these solve a five-second annoyance: you need a UUID, you need to check if a JWT is expired, you need to know why your JSON won't parse. No account, no rate limit, no \"sign up to export.\" Open it, use it, close the tab.\n\nAlso includes password and hashing utilities for quick security checks alongside the day-to-day dev workflow tools.",
    faqs: [
      {
        question: "Is it safe to paste API keys or tokens into these tools?",
        answer:
          "Yes — every tool on this page processes data client-side in your browser. Nothing is uploaded to a server, logged, or stored. That said, as a general habit, avoid pasting production secrets into any third-party site, including this one, when you don't need to.",
      },
      {
        question: "Do I need to install anything to use these developer tools?",
        answer:
          "No. Everything runs directly in the browser tab — no extension, no CLI install, no account.",
      },
      {
        question:
          "What's the difference between the JSON formatter and JSON to CSV converter?",
        answer:
          "The JSON formatter validates and pretty-prints JSON so it's readable and checks for syntax errors. The JSON to CSV converter transforms a JSON array into a spreadsheet-ready CSV file — use it when you need to move API data into Excel or Sheets.",
      },
      {
        question: "Can I use these tools on mobile?",
        answer:
          "Yes, all tools are responsive and work on phone and tablet browsers, though tools with large text areas (like the JSON formatter) are easier to use on a larger screen.",
      },
    ],
    relatedSlugs: [
      "security-tools",
      "business-productivity",
      "marketing-seo-tools",
    ],
    rawCategories: ["Developer", "Security"],
  },
  {
    slug: "calculators",
    name: "Calculators",
    title: "Free Online Calculators (20+) | Online Tool Base",
    metaDescription:
      "Free calculators for everyday math — percentage, tip, mortgage, compound interest, GPA, unit conversion & more. Instant results, no signup required.",
    intro:
      "The calculators people actually search for, not the ones that make you scroll past a paywall to see the answer. Tip calculator, percentage calculator, unit converter, mortgage calculator, GPA calculator — the everyday math you need an answer to right now, not a spreadsheet template to download.\n\nEach calculator shows its work where it matters (the fraction calculator shows steps, the mortgage calculator breaks out the full amortization schedule) so you're not just getting a number, you're getting the reasoning behind it.",
    faqs: [
      {
        question: "Are these calculators accurate for financial decisions?",
        answer:
          "They use standard, widely-accepted formulas (e.g. standard amortization formulas for mortgage calculations, standard compound interest formulas). For decisions with real financial stakes — a mortgage, a major investment — treat the output as a planning estimate and confirm with a lender or financial advisor before committing.",
      },
      {
        question: "Do I need to create an account to save my calculations?",
        answer:
          "No account is needed to use any calculator. Results are calculated live in your browser and aren't stored on our end.",
      },
      {
        question:
          "What's the difference between the Loan & Mortgage Calculator and the Mortgage Calculator?",
        answer:
          "The Mortgage Calculator focuses specifically on home loans with a full amortization schedule. The Loan & Mortgage Calculator is more general-purpose for comparing loan payments across different loan types.",
      },
    ],
    relatedSlugs: [
      "finance-calculators",
      "health-fitness-calculators",
      "business-productivity",
    ],
    rawCategories: ["Calculator", "Education"],
  },
  {
    slug: "writing-text-tools",
    name: "Writing & Text Tools",
    title: "Free Writing & Text Tools Online (20+) | Online Tool Base",
    metaDescription:
      "Free writing tools — grammar checker, plagiarism checker, word counter, text case converter, paraphrasing tool & more. No signup, instant results.",
    intro:
      "Tools for the parts of writing that aren't the writing itself — checking grammar, counting words against a limit, catching accidental duplication, converting case, finding a rhyme. The kind of thing that used to mean five browser tabs and a Word plugin now runs in one page.\n\nStudents use the readability score calculator and sentence counter to hit assignment requirements; content writers use the plagiarism checker and paraphrasing tool before publishing; everyone eventually needs the word counter. All of it processes your text locally — nothing you paste in gets stored or sent anywhere.",
    faqs: [
      {
        question: "Does the plagiarism checker store the text I check?",
        answer: "No. Text you submit is checked and not retained afterward.",
      },
      {
        question: "What readability score do these tools use?",
        answer:
          "The Readability Score Calculator uses standard formulas including Flesch-Kincaid, giving you a grade-level estimate for how easy your text is to read.",
      },
      {
        question: "Is the paraphrasing tool safe to use for academic work?",
        answer:
          "The tool rewrites text while preserving meaning, but paraphrased text should always be understood and, where required, cited according to your institution's academic integrity policy. Treat it as a drafting aid, not a substitute for original writing.",
      },
    ],
    relatedSlugs: [
      "marketing-seo-tools",
      "social-media-tools",
      "developer-tools",
    ],
    rawCategories: ["Writing", "Text"],
  },
  {
    slug: "health-fitness-calculators",
    name: "Health & Fitness Calculators",
    title: "Free Health & Fitness Calculators (12) | Online Tool Base",
    metaDescription:
      "Free health calculators — BMI, calorie, macro, body fat, sleep cycle, running pace & more. Evidence-based formulas, instant results, no signup.",
    intro:
      "Health calculators built on standard, published formulas — not guesses. BMI, calorie needs, macro targets, body fat estimate, ideal bedtime based on sleep cycles, running pace for race day. The inputs are simple (height, weight, activity level) and the output is immediate.\n\nNone of these replace medical advice — they're planning tools, the same kind of quick-reference math a trainer or dietitian would run by hand. Use them to get a starting number, not a diagnosis.",
    faqs: [
      {
        question: "Are these health calculators medically accurate?",
        answer:
          "They use standard published formulas (e.g. Mifflin-St Jeor for calorie needs, standard BMI formula). They're useful for general planning but aren't a substitute for personalized advice from a doctor or registered dietitian, especially if you have an existing health condition.",
      },
      {
        question:
          "What's the difference between the Calorie Calculator and Calorie Deficit Calculator?",
        answer:
          "The Calorie Calculator estimates your total daily calorie needs (TDEE) to maintain your current weight. The Calorie Deficit Calculator takes that TDEE and calculates a target deficit for weight loss at a chosen rate.",
      },
      {
        question: "Is my health data stored when I use these calculators?",
        answer:
          "No — calculations run in your browser and inputs like weight, height, or cycle dates aren't saved or transmitted.",
      },
    ],
    relatedSlugs: ["calculators", "finance-calculators", "fun-generators"],
    rawCategories: ["Health"],
  },
  {
    slug: "image-design-tools",
    name: "Image & Design Tools",
    title: "Free Image & Design Tools Online (12) | Online Tool Base",
    metaDescription:
      "Free image and design tools — background remover, image compressor, color palette generator, gradient generator, favicon maker & more. No signup.",
    intro:
      "Image editing and design utilities for the tasks that don't need Photoshop — compressing a photo before upload, generating a favicon, pulling a color palette, checking contrast ratios for accessibility, or stripping a background out entirely. Fast, single-purpose, browser-based.\n\nDesigners use the color and contrast tools to check WCAG compliance before shipping; everyone else uses the compressor and resizer because a 12MB photo shouldn't be what's slowing down a website.",
    faqs: [
      {
        question: "Are my images uploaded to a server?",
        answer:
          "Processing happens in your browser for these tools — your images aren't uploaded to be stored on our servers as part of normal use.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "The Image Format Converter handles the common web formats — PNG, JPG, and WebP — converting between them while preserving quality settings you choose.",
      },
      {
        question: "Do the color tools check WCAG accessibility standards?",
        answer:
          "Yes — the Color Contrast Checker specifically checks text/background color pairs against WCAG AA and AAA contrast ratio thresholds.",
      },
    ],
    relatedSlugs: [
      "developer-tools",
      "social-media-tools",
      "marketing-seo-tools",
    ],
    rawCategories: ["Image", "Design"],
  },
  {
    slug: "social-media-tools",
    name: "Social Media Tools",
    title: "Free Social Media Tools Online (12) | Online Tool Base",
    metaDescription:
      "Free social media tools — hashtag generator, caption generator, post planner, character counter, engagement rate calculator & more. No signup.",
    intro:
      "Tools for the platform-specific busywork of posting — checking a caption against character limits, generating hashtags that fit the post, formatting a LinkedIn update so line breaks actually render, planning a content calendar. Built around the constraints each platform actually enforces, not generic text tools with a social label slapped on.\n\nThe Engagement Rate Calculator and Social Media Audit Tool are for after you've posted — figuring out what's actually working before you plan the next batch.",
    faqs: [
      {
        question: "Do these tools work for every platform?",
        answer:
          "Most tools are platform-aware — the Social Media Character Counter and Content Calendar Planner account for the specific limits and conventions of Instagram, X, LinkedIn, TikTok, and YouTube rather than using one generic limit.",
      },
      {
        question: "How is engagement rate calculated?",
        answer:
          "The Engagement Rate Calculator uses your likes, comments, and follower (or reach) count to compute a percentage, letting you compare posts or accounts on a like-for-like basis rather than raw counts.",
      },
      {
        question: "Can I schedule posts directly from these tools?",
        answer:
          "These are planning and formatting tools, not a scheduler — they help you prepare content (captions, hashtags, calendars) that you then post or schedule through the platform or your existing scheduling tool.",
      },
    ],
    relatedSlugs: [
      "marketing-seo-tools",
      "writing-text-tools",
      "image-design-tools",
    ],
    rawCategories: ["social-media"],
  },
  {
    slug: "finance-calculators",
    name: "Finance & Money Calculators",
    title: "Free Finance & Money Calculators (11) | Online Tool Base",
    metaDescription:
      "Free finance calculators — currency converter, budget planner, retirement calculator, investment return, net worth & more. Instant results, no signup.",
    intro:
      "Personal finance math without a financial advisor's hourly rate attached. Budget planner, retirement calculator, net worth calculator, investment return and CAGR, credit card payoff timeline, savings goal projections — the numbers people run before making a decision, not after.\n\nThese are planning tools built on standard financial formulas (compound interest, amortization, CAGR). They give you a solid estimate to work from — for decisions with real money on the line, pair the output with advice from a financial professional.",
    faqs: [
      {
        question:
          "Can I use these calculators to plan a real investment decision?",
        answer:
          "They're a good starting point for estimates using standard formulas, but investment and retirement decisions have tax and personal-circumstance factors these calculators don't account for. Treat results as planning estimates and confirm significant decisions with a financial advisor.",
      },
      {
        question: "How is net worth calculated?",
        answer:
          "The Net Worth Calculator totals the assets you enter (cash, investments, property, etc.) and subtracts your liabilities (debts, loans) to give a single net worth figure.",
      },
      {
        question: "Is my financial data saved?",
        answer:
          "No — figures you enter are calculated in your browser and not stored or transmitted.",
      },
    ],
    relatedSlugs: [
      "calculators",
      "business-productivity",
      "health-fitness-calculators",
    ],
    rawCategories: ["Finance"],
  },
  {
    slug: "business-productivity",
    name: "Business & Productivity Tools",
    title: "Free Business & Productivity Tools (10) | Online Tool Base",
    metaDescription:
      "Free business tools — invoice generator, resume builder, Pomodoro timer, meeting cost calculator, PDF merger & more. No signup, instant use.",
    intro:
      "The operational tools that come up constantly running a business or a workday — generating an invoice, building a resume, timing focus sessions, merging PDFs before sending a contract, working out what a meeting actually cost in salary hours. Small tasks, but ones that usually mean opening a paid app for a two-minute job.\n\nThe Meeting Cost Calculator in particular tends to change how people schedule — seeing a recurring meeting's dollar cost printed out is a different conversation than just seeing it on a calendar.",
    faqs: [
      {
        question: "Can I customize the invoice template?",
        answer:
          "The Invoice Generator lets you add your business details, line items, and totals to produce a professional invoice you can download or print.",
      },
      {
        question: "Does the PDF merger work with large files?",
        answer:
          "It handles typical business documents (contracts, reports) without issue; very large files may take longer to process since everything runs in your browser rather than on a server.",
      },
      {
        question: "Is the resume builder free to export?",
        answer: "Yes — there's no paywall to download your finished resume.",
      },
    ],
    relatedSlugs: ["calculators", "developer-tools", "finance-calculators"],
    rawCategories: ["Business", "Productivity", "Document"],
  },
  {
    slug: "marketing-seo-tools",
    name: "Marketing & SEO Tools",
    title: "Free Marketing & SEO Tools Online (5) | Online Tool Base",
    metaDescription:
      "Free marketing tools — Facebook ad copy generator, email subject line generator, slogan generator, keyword density checker & more. No signup.",
    intro:
      "Tools for the copy and analysis side of marketing — drafting ad copy, testing email subject lines, checking keyword density before publishing, generating a slogan that isn't a cliché. Built for the drafting stage, not as a replacement for strategy.\n\nPair the Keyword Density Checker with the Readability Score Calculator in Writing & Text Tools for a quick pre-publish check on any piece of content.",
    faqs: [
      {
        question: "What's a good keyword density for SEO?",
        answer:
          "There's no single correct number — modern search engines weigh relevance and context over exact density. The Keyword Density Checker is most useful for spotting unnatural over-repetition rather than hitting a specific target percentage.",
      },
      {
        question: "Does the ad copy generator write copy for me automatically?",
        answer:
          "It generates starting drafts based on the product details and angle you provide — treat the output as a first draft to edit into your brand voice, not finished copy.",
      },
    ],
    relatedSlugs: [
      "social-media-tools",
      "writing-text-tools",
      "developer-tools",
    ],
    rawCategories: ["Marketing", "Analytics"],
  },
  {
    slug: "fun-generators",
    name: "Fun & Random Generators",
    title: "Free Fun Tools & Random Generators (5) | Online Tool Base",
    metaDescription:
      "Free fun tools — dice roller, random name generator, Morse code translator, Roman numeral converter, flip text generator & more.",
    intro:
      "The lighter end of the toolkit — rolling virtual dice for a tabletop game, generating a random name for a character, flipping text upside down for a post, translating a message into Morse code, converting a year into Roman numerals. No practical justification needed.",
    faqs: [
      {
        question: "Is the dice roller truly random?",
        answer:
          "It uses your browser's random number generation, which is suitable for games and casual use.",
      },
      {
        question: "Can I generate multiple random names at once?",
        answer:
          "Yes — the Random Name Generator can produce a batch of names in one go rather than one at a time.",
      },
    ],
    relatedSlugs: [
      "writing-text-tools",
      "image-design-tools",
      "social-media-tools",
    ],
    rawCategories: ["Fun"],
  },
  {
    slug: "security-tools",
    name: "Security & Privacy Tools",
    title: "Free Security & Password Tools Online | Online Tool Base",
    metaDescription:
      "Free security tools — password generator and password strength checker. Generate strong passwords and check existing ones, entirely in your browser.",
    intro:
      "Password generation and strength checking, processed entirely client-side — your passwords are never transmitted or logged. Generate a strong password on the spot, or check whether an existing one holds up.",
    faqs: [
      {
        question: "Are passwords I generate or check ever sent to a server?",
        answer:
          "No — both the generator and strength checker run entirely in your browser. Nothing is transmitted or stored.",
      },
    ],
    relatedSlugs: ["developer-tools", "business-productivity", "calculators"],
    rawCategories: ["Security"],
  },

  {
    slug: "pdf-tools",
    name: "PDF Tools",
    title:
      "Free PDF Tools Online (15+) | Merge, Compress & Convert PDFs | Online Tool Base",

    metaDescription:
      "Free PDF tools to merge, split, compress, convert and manage PDF files online. Edit PDFs instantly in your browser with no signup, no uploads, and no software required.",

    intro:
      "Free PDF tools designed to handle the everyday document tasks people run into at work, school, and business. Merge multiple PDF files into one document, split large PDFs into smaller files, compress PDFs to reduce file size, and convert documents quickly without installing expensive software.\n\nWhether you are preparing a business proposal, submitting school documents, organizing invoices, or sending contracts, these browser-based PDF utilities help you complete common PDF tasks faster. Everything runs directly in your browser, making your files easier to manage while keeping the process simple and secure.",

    faqs: [
      {
        question: "Are these PDF tools free to use?",
        answer:
          "Yes. All PDF tools on Online Tool Base are free to use with no account required, subscriptions, or hidden fees. You can merge, compress, split, and convert PDF files instantly.",
      },
      {
        question: "Can I merge multiple PDF files together?",
        answer:
          "Yes. The PDF merger allows you to combine multiple PDF documents into a single organized file, making it easier to manage reports, invoices, contracts, and other documents.",
      },
      {
        question: "Can I compress a PDF without losing quality?",
        answer:
          "Yes. The PDF compressor reduces file size while maintaining readable document quality, making PDFs easier to email, upload, and share online.",
      },
      {
        question: "Are my PDF files uploaded to your servers?",
        answer:
          "No. PDF processing happens directly in your browser whenever possible. Your documents remain on your device instead of being stored permanently on external servers.",
      },
      {
        question: "Do these PDF tools work on mobile devices?",
        answer:
          "Yes. All PDF utilities are optimized for phones, tablets, and desktop browsers, allowing you to manage PDF files wherever you work.",
      },
    ],

    relatedSlugs: [
      "business-productivity",
      "developer-tools",
      "writing-tools",
      "image-tools",
    ],

    rawCategories: ["Document"],
  },
];

/** Build a lookup from raw tools.ts category string -> canonical Category, once. */
const rawToCanonical: Map<string, Category> = new Map();
for (const cat of categories) {
  for (const raw of cat.rawCategories) {
    rawToCanonical.set(raw, cat);
  }
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getToolsForCategory(slug: string): Tool[] {
  const cat = getCategoryBySlug(slug);
  if (!cat) return [];
  const rawSet = new Set(cat.rawCategories);
  return tools.filter((t) => rawSet.has(t.category));
}

export function getCanonicalCategoryForTool(tool: Tool): Category | undefined {
  return rawToCanonical.get(tool.category);
}

export function getRelatedCategories(slug: string): Category[] {
  const cat = getCategoryBySlug(slug);
  if (!cat) return [];
  return cat.relatedSlugs
    .map((s) => getCategoryBySlug(s))
    .filter((c): c is Category => Boolean(c));
}

// Sanity check (dev-time only) — surfaces if a raw category in tools.ts
// isn't mapped anywhere, so a new tool's category never silently vanishes
// from every category page.
if (process.env.NODE_ENV !== "production") {
  const mappedRaw = new Set(categories.flatMap((c) => c.rawCategories));
  const unmapped = new Set(
    tools.map((t) => t.category).filter((c) => !mappedRaw.has(c)),
  );
  if (unmapped.size > 0) {
    console.warn(
      `[categories.ts] Unmapped raw categories found in tools.ts: ${[...unmapped].join(", ")}`,
    );
  }
}
