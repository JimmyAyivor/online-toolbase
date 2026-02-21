"use client";
import React, { useState } from "react";
import { Copy, Check, RefreshCw, Zap } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ContentCategory =
  | "education"
  | "entertainment"
  | "motivation"
  | "tutorial"
  | "storytime"
  | "product"
  | "challenge";
type HookStyle =
  | "question"
  | "statement"
  | "controversy"
  | "curiosity"
  | "relatability"
  | "urgency";

interface HookTemplate {
  style: HookStyle;
  label: string;
  icon: string;
  template: (topic: string, niche: string) => string;
  why: string;
}

interface CategoryConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  bestStyles: HookStyle[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES: Record<ContentCategory, CategoryConfig> = {
  education: {
    label: "Education",
    icon: "📚",
    color: "text-blue-700",
    bgColor: "bg-blue-600",
    bestStyles: ["curiosity", "statement", "question"],
  },
  entertainment: {
    label: "Entertainment",
    icon: "🎭",
    color: "text-pink-600",
    bgColor: "bg-pink-600",
    bestStyles: ["relatability", "controversy", "question"],
  },
  motivation: {
    label: "Motivation",
    icon: "🔥",
    color: "text-orange-600",
    bgColor: "bg-orange-500",
    bestStyles: ["statement", "urgency", "controversy"],
  },
  tutorial: {
    label: "Tutorial",
    icon: "🛠️",
    color: "text-green-700",
    bgColor: "bg-green-600",
    bestStyles: ["question", "curiosity", "statement"],
  },
  storytime: {
    label: "Storytime",
    icon: "📖",
    color: "text-purple-700",
    bgColor: "bg-purple-600",
    bestStyles: ["relatability", "question", "curiosity"],
  },
  product: {
    label: "Product",
    icon: "🛍️",
    color: "text-teal-700",
    bgColor: "bg-teal-600",
    bestStyles: ["curiosity", "urgency", "statement"],
  },
  challenge: {
    label: "Challenge",
    icon: "🏆",
    color: "text-yellow-700",
    bgColor: "bg-yellow-500",
    bestStyles: ["relatability", "controversy", "urgency"],
  },
};

const HOOK_TEMPLATES: HookTemplate[] = [
  {
    style: "question",
    label: "Open Question",
    icon: "❓",
    why: "Questions create a loop in the brain — people stay to hear the answer.",
    template: (topic, niche) =>
      `Did you know that ${topic || "this"} could completely change how you approach ${niche || "your life"}? Here's what no one tells you…`,
  },
  {
    style: "question",
    label: "Direct Question",
    icon: "🙋",
    why: "Second-person questions feel personal and stop the scroll instantly.",
    template: (topic, niche) =>
      `Are you making this ${topic || "common"} mistake that's costing you in ${niche || "your niche"}? 👀`,
  },
  {
    style: "statement",
    label: "Bold Claim",
    icon: "💥",
    why: "Confident, counterintuitive statements demand attention and challenge assumptions.",
    template: (topic, niche) =>
      `${topic || "This"} is the most underrated skill in ${niche || "any industry"} and barely anyone talks about it.`,
  },
  {
    style: "statement",
    label: "Number Hook",
    icon: "🔢",
    why: "Specificity signals credibility. Numbers stop scrolling because they set a clear expectation.",
    template: (topic, niche) =>
      `I tested ${topic || "this"} every day for 30 days. Here's what actually happened in ${niche || "my journey"}.`,
  },
  {
    style: "controversy",
    label: "Hot Take",
    icon: "🌶️",
    why: "Controversial openers spike comments and shares — the algorithm rewards the debate.",
    template: (topic, niche) =>
      `Unpopular opinion: most advice about ${topic || "this"} in ${niche || "your space"} is completely wrong. Let me explain.`,
  },
  {
    style: "controversy",
    label: "Myth Buster",
    icon: "🚫",
    why: "Debunking myths positions you as the authority and triggers 'wait, really?' curiosity.",
    template: (topic, niche) =>
      `Stop believing this ${topic || "popular"} myth about ${niche || "your niche"}. It's holding you back more than you know.`,
  },
  {
    style: "curiosity",
    label: "Secret Reveal",
    icon: "🤫",
    why: "The promise of insider knowledge makes people feel they're about to get exclusive access.",
    template: (topic, niche) =>
      `The one thing about ${topic || "this"} that ${niche || "industry"} insiders never talk about publicly…`,
  },
  {
    style: "curiosity",
    label: "Cliffhanger",
    icon: "🪝",
    why: "Open loops compel the brain to stay until they're closed.",
    template: (topic, niche) =>
      `I discovered something about ${topic || "this"} that changed everything in ${niche || "my life"}. And no, I was not prepared.`,
  },
  {
    style: "relatability",
    label: "Pain Point",
    icon: "😩",
    why: "Instantly validating a frustration makes viewers feel seen — they keep watching for the solution.",
    template: (topic, niche) =>
      `If you've ever struggled with ${topic || "this"} in ${niche || "your life"}, you need to see this.`,
  },
  {
    style: "relatability",
    label: "Shared Experience",
    icon: "🫂",
    why: "Saying 'you're not alone' creates community and trust in the first 3 seconds.",
    template: (topic, niche) =>
      `Nobody talks about how hard ${topic || "this"} actually is in ${niche || "our space"}. You're not alone. Here's what helped me.`,
  },
  {
    style: "urgency",
    label: "FOMO Hook",
    icon: "⏰",
    why: "Fear of missing out is one of the most powerful psychological motivators on short-form video.",
    template: (topic, niche) =>
      `Before you scroll — this ${topic || "information"} about ${niche || "your niche"} is something most people won't find out until it's too late.`,
  },
  {
    style: "urgency",
    label: "Action Required",
    icon: "🚨",
    why: "Imperatives create immediate engagement and signal high-value, time-sensitive content.",
    template: (topic, niche) =>
      `Stop what you're doing. If you care about ${topic || "this"} in ${niche || "your field"}, this changes everything.`,
  },
];

const STYLE_LABELS: Record<HookStyle, string> = {
  question: "Questions",
  statement: "Bold Statements",
  controversy: "Controversy",
  curiosity: "Curiosity Gaps",
  relatability: "Relatability",
  urgency: "Urgency",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function TikTokHookGeneratorClient() {
  const [topic, setTopic] = useState<string>("");
  const [niche, setNiche] = useState<string>("");
  const [category, setCategory] = useState<ContentCategory>("education");
  const [filter, setFilter] = useState<HookStyle | "all">("all");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const cfg = CATEGORIES[category];

  const visibleHooks = HOOK_TEMPLATES.filter((h) => {
    if (filter !== "all" && h.style !== filter) return false;
    return true;
  });

  const bestHooks = HOOK_TEMPLATES.filter((h) =>
    cfg.bestStyles.includes(h.style),
  );

  const copyHook = (hook: HookTemplate, idx: number): void => {
    const text = hook.template(topic, niche);
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-rose-950 p-4 md:p-8'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-rose-600 rounded-2xl mb-4 shadow-lg'>
              <Zap className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-white mb-2'>
              TikTok Hook Generator
            </h2>
            <p className='text-gray-400'>
              Scroll-stopping opening lines that keep viewers watching
            </p>
          </div>

          {/* Inputs */}
          <div className='grid md:grid-cols-2 gap-4 mb-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-300 mb-2'>
                Topic / Subject
              </label>
              <input
                type='text'
                value={topic}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTopic(e.target.value)
                }
                placeholder='e.g. morning routines, investing, meal prep…'
                className='w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 focus:border-rose-500 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors'
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-300 mb-2'>
                Your Niche / Audience
              </label>
              <input
                type='text'
                value={niche}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNiche(e.target.value)
                }
                placeholder='e.g. entrepreneurs, busy moms, gym-goers…'
                className='w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 focus:border-rose-500 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors'
              />
            </div>
          </div>

          {/* Category */}
          <div className='mb-4'>
            <label className='block text-sm font-semibold text-gray-300 mb-2'>
              Content Category
            </label>
            <div className='grid grid-cols-4 md:grid-cols-7 gap-2'>
              {(Object.keys(CATEGORIES) as ContentCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl text-xs font-semibold transition-all border-2 ${
                    category === cat
                      ? "border-rose-500 bg-rose-950 text-rose-300 scale-105"
                      : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <span className='text-lg'>{CATEGORIES[cat].icon}</span>
                  <span className='text-center leading-tight'>
                    {CATEGORIES[cat].label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Best hooks for this category */}
          <div className='bg-gray-800 border border-rose-900 rounded-xl p-4 mb-6'>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-rose-400 font-bold text-sm'>
                🔥 Best hooks for {cfg.label}
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {cfg.bestStyles.map((s) => (
                <span
                  key={s}
                  className='px-3 py-1 bg-rose-900 text-rose-300 rounded-full text-xs font-semibold'
                >
                  {STYLE_LABELS[s]}
                </span>
              ))}
            </div>
          </div>

          {/* Style filter */}
          <div className='mb-4'>
            <label className='block text-sm font-semibold text-gray-300 mb-2'>
              Filter by Style
            </label>
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${filter === "all" ? "bg-white text-gray-900 border-white" : "border-gray-600 text-gray-400 hover:border-gray-400"}`}
              >
                All Styles
              </button>
              {(Object.keys(STYLE_LABELS) as HookStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    filter === s
                      ? "bg-rose-600 text-white border-rose-600"
                      : "border-gray-600 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {STYLE_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Hook cards */}
          <div className='grid md:grid-cols-2 gap-3'>
            {visibleHooks.map((hook, idx) => {
              const generated = hook.template(topic, niche);
              const isCopied = copiedIdx === idx;
              return (
                <div
                  key={`${hook.style}-${hook.label}`}
                  className='bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-500 transition-all'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-lg'>{hook.icon}</span>
                      <span className='text-sm font-bold text-white'>
                        {hook.label}
                      </span>
                      <span className='px-2 py-0.5 bg-gray-700 text-gray-400 rounded-full text-xs'>
                        {STYLE_LABELS[hook.style]}
                      </span>
                    </div>
                    <button
                      onClick={() => copyHook(hook, idx)}
                      aria-label='Copy hook'
                      className='p-1.5 bg-gray-700 hover:bg-rose-700 rounded-lg transition-colors'
                    >
                      {isCopied ? (
                        <Check className='w-4 h-4 text-green-400' />
                      ) : (
                        <Copy className='w-4 h-4 text-gray-300' />
                      )}
                    </button>
                  </div>

                  <p className='text-gray-200 text-sm leading-relaxed mb-3 min-h-[60px]'>
                    {generated}
                  </p>

                  <div className='border-t border-gray-700 pt-2'>
                    <p className='text-xs text-gray-500'>
                      <span className='text-rose-400 font-semibold'>
                        Why it works:{" "}
                      </span>
                      {hook.why}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tips */}
          <div className='mt-6 p-4 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-400'>
            <p className='font-semibold text-white mb-2'>
              ⚡ Hook Writing Rules
            </p>
            <ul className='space-y-1 list-disc list-inside'>
              <li>
                First 1–3 seconds is all that matters — hook before the cut
              </li>
              <li>Speak directly to your viewer: "you", "your", "you're"</li>
              <li>
                Never use "Hi guys" or "So today I'm going to…" — start
                mid-action
              </li>
              <li>
                The hook creates a promise; the rest of the video delivers it
              </li>
              <li>
                Test multiple hooks with the same content to find what converts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
