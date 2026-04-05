"use client";
import React, { useState } from "react";
import { Copy, Check, RefreshCw, Youtube } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type VideoCategory =
  | "tutorial"
  | "review"
  | "vlog"
  | "education"
  | "entertainment"
  | "news"
  | "fitness"
  | "cooking";
type TitleStyle =
  | "curiosity"
  | "listicle"
  | "howto"
  | "challenge"
  | "emotional"
  | "seo";

interface TitleTemplate {
  style: TitleStyle;
  label: string;
  icon: string;
  template: (topic: string, niche: string, keyword: string) => string;
  why: string;
}

interface DescriptionSection {
  label: string;
  placeholder: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const VIDEO_CATEGORIES: {
  value: VideoCategory;
  label: string;
  icon: string;
}[] = [
  { value: "tutorial", label: "Tutorial", icon: "🛠️" },
  { value: "review", label: "Review", icon: "⭐" },
  { value: "vlog", label: "Vlog", icon: "🎒" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "entertainment", label: "Entertainment", icon: "🎭" },
  { value: "news", label: "News/Update", icon: "📰" },
  { value: "fitness", label: "Fitness", icon: "💪" },
  { value: "cooking", label: "Cooking", icon: "🍳" },
];

const TITLE_TEMPLATES: TitleTemplate[] = [
  {
    style: "curiosity",
    label: "Curiosity Gap",
    icon: "🪝",
    why: "Open loops make people click to close them.",
    template: (topic, niche, kw) =>
      `The Truth About ${topic || kw || "This"} That ${niche || "Nobody"} Is Talking About`,
  },
  {
    style: "curiosity",
    label: "Reveal",
    icon: "🤫",
    why: "Promises insider information the viewer doesn't have yet.",
    template: (topic, niche, kw) =>
      `I Tried ${topic || kw || "This"} For 30 Days — Here's What Actually Happened`,
  },
  {
    style: "listicle",
    label: "Numbered List",
    icon: "🔢",
    why: "Numbers set clear expectations and imply organized, digestible value.",
    template: (topic, niche, kw) =>
      `7 ${topic || kw || "Tips"} That Will Change How You ${niche ? `Approach ${niche}` : "Work"}`,
  },
  {
    style: "listicle",
    label: "Ranked List",
    icon: "🏆",
    why: "Ranking triggers curiosity about #1 and validates the viewer's own list.",
    template: (topic, niche, kw) =>
      `Best ${topic || kw || "Options"} in ${new Date().getFullYear()} (Ranked Worst to Best)`,
  },
  {
    style: "howto",
    label: "How To",
    icon: "📖",
    why: "Direct, searchable, and clearly signals the viewer's outcome.",
    template: (topic, niche, kw) =>
      `How To ${topic || kw || "Master This"} In ${niche || "Record Time"} (Step by Step)`,
  },
  {
    style: "howto",
    label: "Beginner Guide",
    icon: "🌱",
    why: "Lowers the barrier — beginners are the largest audience segment.",
    template: (topic, niche, kw) =>
      `${topic || kw || "Complete"} for Beginners: Everything You Need to Know in ${new Date().getFullYear()}`,
  },
  {
    style: "challenge",
    label: "Challenge",
    icon: "⚡",
    why: "Stakes create tension and keep viewers watching to see the outcome.",
    template: (topic, niche, kw) =>
      `I Challenged Myself to ${topic || kw || "Do This"} Every Day for 30 Days`,
  },
  {
    style: "emotional",
    label: "Story-driven",
    icon: "❤️",
    why: "Emotional stakes humanize content and drive shares.",
    template: (topic, niche, kw) =>
      `This ${topic || kw || "Experience"} Changed Everything I Knew About ${niche || "My Life"}`,
  },
  {
    style: "seo",
    label: "SEO Optimized",
    icon: "🔍",
    why: "Keyword-first titles rank higher in YouTube and Google search.",
    template: (topic, niche, kw) =>
      `${kw || topic || "Complete"} Tutorial ${new Date().getFullYear()} | ${niche || "Full"} Guide for Beginners`,
  },
  {
    style: "seo",
    label: "Comparison",
    icon: "⚖️",
    why: "'X vs Y' searches are high intent and have low competition.",
    template: (topic, niche, kw) =>
      `${topic || kw || "Option A"} vs ${niche || "Option B"}: Which Should You Choose? (${new Date().getFullYear()})`,
  },
];

const DESC_SECTIONS: DescriptionSection[] = [
  {
    label: "Intro (first 150 chars — crucial for SEO)",
    placeholder:
      "In this video, I'll show you exactly how to [outcome]. Whether you're a beginner or experienced, you'll learn [key benefit].",
  },
  {
    label: "What You'll Learn",
    placeholder: "✅ [Point 1]\n✅ [Point 2]\n✅ [Point 3]\n✅ [Point 4]",
  },
  {
    label: "Timestamps (Chapters)",
    placeholder:
      "00:00 Intro\n01:30 [Section 1]\n05:00 [Section 2]\n09:45 [Section 3]\n14:00 Final thoughts",
  },
  {
    label: "Resources & Links",
    placeholder:
      "🔗 [Tool/resource name]: [URL]\n📘 [Book/course]: [URL]\n📧 [Free download]: [URL]",
  },
  {
    label: "About the Channel",
    placeholder:
      "Subscribe for weekly videos on [topic]. Hit the bell 🔔 to never miss an upload.\n\n[Your channel tagline]",
  },
  {
    label: "Hashtags (last 3 shown in feed)",
    placeholder: "#[YourMainTag] #[NicheTag] #[TopicTag]",
  },
];

const TITLE_CHAR_LIMIT = 100;

// ─── Component ───────────────────────────────────────────────────────────────

export default function YouTubeTitleDescriptionGeneratorClient() {
  const [topic, setTopic] = useState<string>("");
  const [niche, setNiche] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [category, setCategory] = useState<VideoCategory>("tutorial");
  const [customTitle, setCustomTitle] = useState<string>("");
  const [sections, setSections] = useState<Record<string, string>>(
    Object.fromEntries(DESC_SECTIONS.map((s) => [s.label, ""])),
  );
  const [copiedTitle, setCopiedTitle] = useState<boolean>(false);
  const [copiedDesc, setCopiedDesc] = useState<boolean>(false);

  const updateSection = (label: string, value: string): void =>
    setSections((prev) => ({ ...prev, [label]: value }));

  const fullDescription = DESC_SECTIONS.map((s) => sections[s.label]?.trim())
    .filter(Boolean)
    .join("\n\n");

  const copyTitle = (): void => {
    navigator.clipboard.writeText(customTitle);
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2000);
  };

  const copyDesc = (): void => {
    navigator.clipboard.writeText(fullDescription);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  const titleLen = customTitle.length;
  const titleOver = titleLen > TITLE_CHAR_LIMIT;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-4 shadow-lg'>
              <Youtube className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              YouTube Title &amp; Description Generator
            </h2>
            <p className='text-gray-600'>
              SEO-optimized titles and structured descriptions that get clicks
            </p>
          </div>

          {/* Inputs */}
          <div className='grid md:grid-cols-3 gap-4 mb-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1'>
                Video Topic
              </label>
              <input
                type='text'
                value={topic}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTopic(e.target.value)
                }
                placeholder='e.g. morning routines, React hooks…'
                className='w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 text-sm'
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1'>
                Target Audience / Niche
              </label>
              <input
                type='text'
                value={niche}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNiche(e.target.value)
                }
                placeholder='e.g. beginners, entrepreneurs…'
                className='w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 text-sm'
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-1'>
                Main Keyword (SEO)
              </label>
              <input
                type='text'
                value={keyword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setKeyword(e.target.value)
                }
                placeholder='e.g. how to invest, best laptops…'
                className='w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 text-sm'
              />
            </div>
          </div>

          {/* Category */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Video Category
            </label>
            <div className='flex flex-wrap gap-2'>
              {VIDEO_CATEGORIES.map(({ value, label, icon }) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border-2 transition-all ${
                    category === value
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 text-gray-600 hover:border-red-200"
                  }`}
                >
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Title generator */}
            <div>
              <h3 className='font-bold text-gray-900 mb-3'>
                Title Suggestions
              </h3>
              <div className='space-y-2 mb-4 max-h-80 overflow-y-auto pr-1'>
                {TITLE_TEMPLATES.map((tpl) => {
                  const generated = tpl.template(topic, niche, keyword);
                  return (
                    <div
                      key={`${tpl.style}-${tpl.label}`}
                      className='bg-gray-50 border border-gray-200 rounded-xl p-3 hover:border-red-300 transition-all'
                    >
                      <div className='flex items-center justify-between mb-1'>
                        <div className='flex items-center gap-1.5'>
                          <span>{tpl.icon}</span>
                          <span className='text-xs font-bold text-gray-700'>
                            {tpl.label}
                          </span>
                        </div>
                        <button
                          onClick={() => setCustomTitle(generated)}
                          className='text-xs px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-colors'
                        >
                          Use
                        </button>
                      </div>
                      <p className='text-sm text-gray-900 font-medium leading-snug mb-1'>
                        {generated}
                      </p>
                      <p className='text-xs text-gray-400'>{tpl.why}</p>
                    </div>
                  );
                })}
              </div>

              {/* Custom title editor */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label className='text-sm font-semibold text-gray-700'>
                    Your Title
                  </label>
                  <span
                    className={`text-xs font-semibold ${titleOver ? "text-red-500" : "text-gray-400"}`}
                  >
                    {titleLen}/{TITLE_CHAR_LIMIT}
                  </span>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={customTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCustomTitle(e.target.value)
                    }
                    placeholder='Edit or write your title here…'
                    className={`flex-1 px-3 py-2.5 border-2 rounded-xl focus:outline-none text-sm font-medium ${
                      titleOver
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-red-400"
                    }`}
                  />
                  <button
                    onClick={copyTitle}
                    disabled={!customTitle}
                    className='flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl text-sm font-semibold transition-colors'
                  >
                    {copiedTitle ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      <Copy className='w-4 h-4' />
                    )}
                  </button>
                </div>

                {/* Thumbnail text preview */}
                {customTitle && (
                  <div className='mt-3 bg-gray-900 rounded-xl overflow-hidden'>
                    <div className='bg-gray-700 aspect-video flex items-end p-3'>
                      <div className='bg-black/80 text-white text-sm font-bold px-2 py-1 rounded leading-tight max-w-full'>
                        {customTitle.slice(0, 60)}
                        {customTitle.length > 60 ? "…" : ""}
                      </div>
                    </div>
                    <div className='px-3 py-2'>
                      <div className='text-white text-xs font-semibold leading-snug'>
                        {customTitle}
                      </div>
                      <div className='text-gray-400 text-xs mt-0.5'>
                        Your Channel · 1.2K views · 2 hours ago
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description builder */}
            <div>
              <div className='flex items-center justify-between mb-3'>
                <h3 className='font-bold text-gray-900'>Description Builder</h3>
                <button
                  onClick={copyDesc}
                  disabled={!fullDescription}
                  className='flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg text-sm font-semibold transition-colors'
                >
                  {copiedDesc ? (
                    <>
                      <Check className='w-3.5 h-3.5' /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className='w-3.5 h-3.5' /> Copy All
                    </>
                  )}
                </button>
              </div>

              <div className='space-y-3'>
                {DESC_SECTIONS.map((sec) => (
                  <div key={sec.label}>
                    <label className='block text-xs font-bold text-gray-600 mb-1'>
                      {sec.label}
                    </label>
                    <textarea
                      value={sections[sec.label] ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        updateSection(sec.label, e.target.value)
                      }
                      placeholder={sec.placeholder}
                      rows={
                        sec.label.includes("Timestamps") ||
                        sec.label.includes("What")
                          ? 4
                          : 2
                      }
                      className='w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 text-xs resize-none font-mono placeholder-gray-300 leading-relaxed'
                    />
                  </div>
                ))}
              </div>

              <div className='mt-3 text-xs text-gray-400'>
                Total: {fullDescription.length.toLocaleString()} / 5,000 chars
              </div>
            </div>
          </div>

          <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-900'>
            <p className='font-bold mb-2'>🎯 YouTube SEO Tips</p>
            <ul className='space-y-1 list-disc list-inside text-xs'>
              <li>
                Put your main keyword in the first 60 characters of the title
              </li>
              <li>
                First 150 characters of description appear in search results —
                make them count
              </li>
              <li>
                Add timestamps (chapters) — YouTube surfaces them in search
                snippets
              </li>
              <li>
                Use the keyword naturally 2–3 times in the description, not more
              </li>
              <li>
                Last 3 hashtags in the description appear above the title in the
                feed
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}