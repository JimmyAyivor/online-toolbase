"use client";
import React, { useState, useMemo } from "react";
import { Copy, Check, Plus, Trash2, Grid, List } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ContentType = "photo" | "carousel" | "reel" | "story";
type GridView = "grid" | "list";

interface Post {
  id: number;
  type: ContentType;
  caption: string;
  hashtags: string;
  emoji: string;
  cta: string;
  scheduled: string; // date string
  color: string; // grid tile color
}

interface ContentTypeConfig {
  label: string;
  icon: string;
  tip: string;
  color: string;
}

interface CTAOption {
  label: string;
  value: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CONTENT_TYPES: Record<ContentType, ContentTypeConfig> = {
  photo: {
    label: "Photo",
    icon: "🖼️",
    tip: "Best for lifestyle, products, portraits",
    color: "bg-pink-100 border-pink-300",
  },
  carousel: {
    label: "Carousel",
    icon: "🎠",
    tip: "10x engagement — tutorials, tips, stories",
    color: "bg-purple-100 border-purple-300",
  },
  reel: {
    label: "Reel",
    icon: "🎬",
    tip: "Highest reach — entertain in first 3s",
    color: "bg-orange-100 border-orange-300",
  },
  story: {
    label: "Story",
    icon: "⏰",
    tip: "24h — polls, questions, behind-the-scenes",
    color: "bg-blue-100 border-blue-300",
  },
};

const TILE_COLORS = [
  "bg-pink-200",
  "bg-purple-200",
  "bg-orange-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-red-200",
  "bg-indigo-200",
  "bg-teal-200",
];

const CTA_OPTIONS: CTAOption[] = [
  { label: "Link in bio", value: "Link in bio 🔗" },
  { label: "Save this post", value: "Save this for later 📌" },
  { label: "Tag a friend", value: "Tag someone who needs this 👇" },
  { label: "Comment your thoughts", value: "Comment below 💬" },
  { label: "Follow for more", value: "Follow for more content ✨" },
  { label: "Shop now", value: "Shop the link in bio 🛍️" },
  { label: "DM me", value: "DM me to learn more 📩" },
  { label: "Share this", value: "Share with your friends 🔄" },
];

const CAPTION_STRUCTURES = [
  {
    label: "Hook → Value → CTA",
    desc: "Start with attention, deliver value, close with action",
    template: (type: ContentType) =>
      `[Attention-grabbing first line — ask a question or make a bold statement]\n\n[Main value: share a tip, story, or insight that's relevant to your audience]\n\n${type === "carousel" ? "[Swipe to see all tips →]\n\n" : ""}[Your CTA here]`,
  },
  {
    label: "Story → Lesson → CTA",
    desc: "Personal story that leads to a relatable takeaway",
    template: () =>
      `[Start with a personal moment or experience]\n\n[What happened next...]\n\n[The lesson or insight you gained]\n\n[CTA: how your audience can apply this]`,
  },
  {
    label: "Problem → Solution → CTA",
    desc: "Address a pain point then offer the fix",
    template: () =>
      `[Name a common problem your audience faces]\n\n❌ What most people do wrong:\n[List the mistake]\n\n✅ What actually works:\n[List the solution]\n\n[CTA]`,
  },
  {
    label: "List post",
    desc: "Numbered tips — works great for carousels",
    template: () =>
      `[Hook: "X things you didn't know about..."]\n\n1️⃣ [Tip one]\n2️⃣ [Tip two]\n3️⃣ [Tip three]\n4️⃣ [Tip four]\n5️⃣ [Tip five]\n\n[CTA]`,
  },
];

const HASHTAG_SUGGESTIONS: Record<string, string[]> = {
  lifestyle: [
    "#lifestyle",
    "#dailylife",
    "#instagood",
    "#photooftheday",
    "#authentic",
    "#mindfulness",
    "#intentionalliving",
  ],
  business: [
    "#entrepreneur",
    "#smallbusiness",
    "#businesstips",
    "#growthmindset",
    "#marketing",
    "#contentcreator",
    "#digitalmarketing",
  ],
  fitness: [
    "#fitness",
    "#workout",
    "#gym",
    "#fitfam",
    "#healthylifestyle",
    "#motivation",
    "#personaltrainer",
  ],
  travel: [
    "#travel",
    "#wanderlust",
    "#adventure",
    "#explore",
    "#travelgram",
    "#instatravel",
    "#travelblogger",
  ],
  food: [
    "#foodie",
    "#instafood",
    "#foodphotography",
    "#homemade",
    "#recipe",
    "#foodlover",
    "#healthyfood",
  ],
  fashion: [
    "#fashion",
    "#ootd",
    "#style",
    "#outfitoftheday",
    "#fashionista",
    "#streetstyle",
    "#fashionblogger",
  ],
};

function buildPost(idx: number): Post {
  return {
    id: Date.now() + idx,
    type: "photo",
    caption: "",
    hashtags: "",
    emoji: "✨",
    cta: CTA_OPTIONS[0]!.value,
    scheduled: "",
    color: TILE_COLORS[idx % TILE_COLORS.length]!,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function InstagramPostPlannerClient() {
  const [posts, setPosts] = useState<Post[]>([buildPost(0)]);
  const [active, setActive] = useState<number>(0);
  const [view, setView] = useState<GridView>("grid");
  const [niche, setNiche] = useState<string>("lifestyle");
  const [copied, setCopied] = useState<string>("");

  const post = posts[active] ?? posts[0]!;

  const updatePost = (id: number, patch: Partial<Post>): void =>
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const addPost = (): void => {
    const np = buildPost(posts.length);
    setPosts((prev) => [...prev, np]);
    setActive(posts.length);
  };

  const removePost = (idx: number): void => {
    setPosts((prev) => prev.filter((_, i) => i !== idx));
    setActive(Math.max(0, idx - 1));
  };

  const copyCaption = (p: Post): void => {
    const full = [p.caption, p.cta, "\n.\n.\n.", p.hashtags]
      .filter(Boolean)
      .join("\n\n");
    navigator.clipboard.writeText(full);
    setCopied(String(p.id));
    setTimeout(() => setCopied(""), 2000);
  };

  const charCount = post.caption.length + post.cta.length;
  const hashCount = post.hashtags.trim()
    ? post.hashtags
        .trim()
        .split(/\s+/)
        .filter((s) => s.startsWith("#")).length
    : 0;
  const suggestedTags = HASHTAG_SUGGESTIONS[niche] ?? [];

  const addSuggestedTag = (tag: string): void => {
    const current = post.hashtags.trim();
    if (current.includes(tag)) return;
    updatePost(post.id, { hashtags: current ? `${current} ${tag}` : tag });
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-2xl mb-4 shadow-lg'>
              <span className='text-2xl'>📸</span>
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Instagram Post Planner
            </h2>
            <p className='text-gray-600'>
              Plan captions, hashtags, and your content grid
            </p>
          </div>

          <div className='grid lg:grid-cols-3 gap-6'>
            {/* ── Left: Grid / List view ── */}
            <div>
              <div className='flex items-center justify-between mb-3'>
                <h3 className='font-bold text-gray-800'>Content Grid</h3>
                <div className='flex gap-1'>
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 rounded ${view === "grid" ? "bg-pink-100 text-pink-600" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <Grid className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 rounded ${view === "list" ? "bg-pink-100 text-pink-600" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <List className='w-4 h-4' />
                  </button>
                </div>
              </div>

              {view === "grid" ? (
                <div className='grid grid-cols-3 gap-1.5 mb-3'>
                  {posts.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActive(i)}
                      className={`aspect-square ${p.color} rounded-xl flex flex-col items-center justify-center text-center p-2 transition-all border-2 ${
                        active === i
                          ? "border-pink-500 scale-95 shadow-lg"
                          : "border-transparent hover:scale-95"
                      }`}
                    >
                      <span className='text-2xl'>
                        {CONTENT_TYPES[p.type].icon}
                      </span>
                      <span className='text-xs font-semibold text-gray-700 mt-1 leading-tight truncate w-full text-center'>
                        {p.scheduled || `Post ${i + 1}`}
                      </span>
                    </button>
                  ))}
                  {posts.length < 9 && (
                    <button
                      onClick={addPost}
                      className='aspect-square bg-gray-100 hover:bg-pink-50 border-2 border-dashed border-gray-300 hover:border-pink-300 rounded-xl flex items-center justify-center transition-all'
                    >
                      <Plus className='w-6 h-6 text-gray-400' />
                    </button>
                  )}
                </div>
              ) : (
                <div className='space-y-2 mb-3'>
                  {posts.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActive(i)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                        active === i
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-100 bg-gray-50 hover:border-pink-200"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 ${p.color} rounded-lg flex items-center justify-center text-lg flex-shrink-0`}
                      >
                        {CONTENT_TYPES[p.type].icon}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='text-sm font-semibold text-gray-800 truncate'>
                          {p.caption || `Post ${i + 1}`}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {CONTENT_TYPES[p.type].label} ·{" "}
                          {p.scheduled || "Unscheduled"}
                        </div>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={addPost}
                    className='w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all'
                  >
                    <Plus className='w-4 h-4 text-gray-400' />
                    <span className='text-sm text-gray-500'>Add post</span>
                  </button>
                </div>
              )}

              {/* Instagram profile preview */}
              <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                <div className='text-xs font-bold text-gray-600 mb-2'>
                  Grid Preview
                </div>
                <div className='grid grid-cols-3 gap-0.5'>
                  {(
                    [
                      ...posts,
                      ...Array<Post | null>(Math.max(0, 9 - posts.length)).fill(
                        null,
                      ),
                    ] as (Post | null)[]
                  )
                    .slice(0, 9)
                    .map((p, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm ${p ? p.color : "bg-gray-200"} flex items-center justify-center text-sm`}
                      >
                        {p !== null && CONTENT_TYPES[p.type].icon}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* ── Right: Post editor ── */}
            <div className='lg:col-span-2 space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='font-bold text-gray-800'>
                  Editing Post {active + 1}
                </h3>
                {posts.length > 1 && (
                  <button
                    onClick={() => removePost(active)}
                    className='p-1.5 text-red-400 hover:bg-red-50 rounded-lg'
                    aria-label='Delete post'
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                )}
              </div>

              {/* Content type */}
              <div className='grid grid-cols-4 gap-2'>
                {(Object.keys(CONTENT_TYPES) as ContentType[]).map((ct) => (
                  <button
                    key={ct}
                    onClick={() => updatePost(post.id, { type: ct })}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${
                      post.type === ct
                        ? CONTENT_TYPES[ct].color + " scale-105"
                        : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <span className='text-xl'>{CONTENT_TYPES[ct].icon}</span>
                    <span>{CONTENT_TYPES[ct].label}</span>
                  </button>
                ))}
              </div>

              {/* Type tip */}
              <div className='text-xs text-pink-700 bg-pink-50 border border-pink-200 rounded-lg px-3 py-2'>
                💡 {CONTENT_TYPES[post.type].tip}
              </div>

              {/* Caption structure picker */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-1'>
                  Caption Structure
                </label>
                <div className='grid grid-cols-2 gap-2 mb-2'>
                  {CAPTION_STRUCTURES.map((s) => (
                    <button
                      key={s.label}
                      onClick={() =>
                        updatePost(post.id, { caption: s.template(post.type) })
                      }
                      className='text-left px-3 py-2 bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-lg transition-all'
                    >
                      <div className='text-xs font-bold text-gray-800'>
                        {s.label}
                      </div>
                      <div className='text-xs text-gray-500'>{s.desc}</div>
                    </button>
                  ))}
                </div>
                <textarea
                  value={post.caption}
                  onChange={(e) =>
                    updatePost(post.id, { caption: e.target.value })
                  }
                  placeholder='Write your caption here… or pick a structure above'
                  rows={5}
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 text-sm resize-none leading-relaxed'
                />
                <div className='text-xs text-gray-400 text-right mt-0.5'>
                  {charCount} / 2,200 chars
                </div>
              </div>

              {/* CTA */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-1'>
                  Call to Action
                </label>
                <div className='flex flex-wrap gap-1.5 mb-2'>
                  {CTA_OPTIONS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => updatePost(post.id, { cta: c.value })}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                        post.cta === c.value
                          ? "bg-pink-500 text-white border-pink-500"
                          : "border-gray-200 text-gray-600 hover:border-pink-300"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <div className='flex items-center justify-between mb-1'>
                  <label className='text-sm font-semibold text-gray-700'>
                    Hashtags
                  </label>
                  <span
                    className={`text-xs font-semibold ${hashCount > 30 ? "text-red-500" : "text-gray-400"}`}
                  >
                    {hashCount} / 30
                  </span>
                </div>
                <div className='flex flex-wrap gap-1.5 mb-2'>
                  <span className='text-xs text-gray-500 mr-1'>Niche:</span>
                  {Object.keys(HASHTAG_SUGGESTIONS).map((n) => (
                    <button
                      key={n}
                      onClick={() => setNiche(n)}
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize border transition-all ${
                        niche === n
                          ? "bg-purple-500 text-white border-purple-500"
                          : "border-gray-200 text-gray-600 hover:border-purple-300"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className='flex flex-wrap gap-1.5 mb-2'>
                  {suggestedTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => addSuggestedTag(t)}
                      className={`px-2 py-0.5 rounded-full text-xs border transition-all ${
                        post.hashtags.includes(t)
                          ? "bg-purple-100 text-purple-700 border-purple-300"
                          : "border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <textarea
                  value={post.hashtags}
                  onChange={(e) =>
                    updatePost(post.id, { hashtags: e.target.value })
                  }
                  placeholder='#yourtag #anothertag'
                  rows={2}
                  className='w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 text-sm resize-none font-mono'
                />
              </div>

              {/* Schedule */}
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    Schedule Date
                  </label>
                  <input
                    type='date'
                    value={post.scheduled}
                    onChange={(e) =>
                      updatePost(post.id, { scheduled: e.target.value })
                    }
                    className='w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 text-sm'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1'>
                    Tile Color
                  </label>
                  <div className='flex gap-1.5 flex-wrap'>
                    {TILE_COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => updatePost(post.id, { color: c })}
                        className={`w-6 h-6 rounded-full ${c} border-2 transition-all ${post.color === c ? "border-gray-700 scale-110" : "border-transparent hover:border-gray-400"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Copy button */}
              <button
                onClick={() => copyCaption(post)}
                className='w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-bold transition-all shadow-md'
              >
                {copied === String(post.id) ? (
                  <>
                    <Check className='w-5 h-5' /> Copied to clipboard!
                  </>
                ) : (
                  <>
                    <Copy className='w-5 h-5' /> Copy Full Caption + Hashtags
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
