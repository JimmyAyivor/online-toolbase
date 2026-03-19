"use client";
import React, { useState, useMemo } from "react";
import { TrendingUp, Plus, Trash2, Info } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Platform =
  | "instagram"
  | "tiktok"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "facebook";
type Method = "followers" | "reach" | "impressions";

interface Post {
  id: number;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
  impressions: string;
  reach: string;
}

interface Benchmark {
  poor: number;
  avg: number;
  good: number;
  great: number;
}

interface PlatformConfig {
  icon: string;
  label: string;
  benchmarks: Record<Method, Benchmark>;
  color: string;
  bar: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PLATFORMS: Record<Platform, PlatformConfig> = {
  instagram: {
    icon: "📸",
    label: "Instagram",
    color: "text-pink-600",
    bar: "bg-gradient-to-r from-purple-500 to-pink-500",
    benchmarks: {
      followers: { poor: 1, avg: 3, good: 6, great: 10 },
      reach: { poor: 2, avg: 5, good: 10, great: 20 },
      impressions: { poor: 1, avg: 3, good: 6, great: 12 },
    },
  },
  tiktok: {
    icon: "🎵",
    label: "TikTok",
    color: "text-rose-500",
    bar: "bg-rose-500",
    benchmarks: {
      followers: { poor: 3, avg: 8, good: 15, great: 25 },
      reach: { poor: 5, avg: 12, good: 20, great: 35 },
      impressions: { poor: 2, avg: 6, good: 12, great: 20 },
    },
  },
  twitter: {
    icon: "𝕏",
    label: "X / Twitter",
    color: "text-gray-900",
    bar: "bg-gray-800",
    benchmarks: {
      followers: { poor: 0.5, avg: 1, good: 2, great: 4 },
      reach: { poor: 1, avg: 2, good: 4, great: 8 },
      impressions: { poor: 0.5, avg: 1, good: 2, great: 4 },
    },
  },
  linkedin: {
    icon: "💼",
    label: "LinkedIn",
    color: "text-blue-700",
    bar: "bg-blue-700",
    benchmarks: {
      followers: { poor: 1, avg: 2, good: 4, great: 7 },
      reach: { poor: 2, avg: 4, good: 8, great: 14 },
      impressions: { poor: 1, avg: 2, good: 4, great: 7 },
    },
  },
  youtube: {
    icon: "▶",
    label: "YouTube",
    color: "text-red-600",
    bar: "bg-red-600",
    benchmarks: {
      followers: { poor: 1, avg: 3, good: 6, great: 10 },
      reach: { poor: 2, avg: 5, good: 10, great: 18 },
      impressions: { poor: 1, avg: 3, good: 6, great: 10 },
    },
  },
  facebook: {
    icon: "📘",
    label: "Facebook",
    color: "text-blue-600",
    bar: "bg-blue-600",
    benchmarks: {
      followers: { poor: 0.5, avg: 1, good: 2, great: 4 },
      reach: { poor: 1, avg: 2, good: 5, great: 10 },
      impressions: { poor: 0.5, avg: 1, good: 2, great: 4 },
    },
  },
};

const PLATFORM_KEYS = Object.keys(PLATFORMS) as Platform[];

const EMPTY_POST = (): Post => ({
  id: Date.now(),
  likes: "",
  comments: "",
  shares: "",
  saves: "",
  impressions: "",
  reach: "",
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function n(v: string): number {
  return parseFloat(v) || 0;
}

function calcER(post: Post, followers: string, method: Method): number {
  const interactions =
    n(post.likes) + n(post.comments) + n(post.shares) + n(post.saves);
  const denom =
    method === "followers"
      ? n(followers)
      : method === "reach"
        ? n(post.reach)
        : /* impressions */ n(post.impressions);
  if (!denom) return 0;
  return (interactions / denom) * 100;
}

function getRating(
  er: number,
  bm: Benchmark,
): { label: string; color: string; bg: string } {
  if (er >= bm.great)
    return {
      label: "Excellent 🔥",
      color: "text-green-700",
      bg: "bg-green-100",
    };
  if (er >= bm.good)
    return { label: "Good 👍", color: "text-blue-700", bg: "bg-blue-100" };
  if (er >= bm.avg)
    return {
      label: "Average 😐",
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    };
  return { label: "Below avg 📉", color: "text-red-700", bg: "bg-red-100" };
}

function barWidth(er: number, bm: Benchmark): number {
  return Math.min((er / bm.great) * 100, 100);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function EngagementRateCalculatorClient() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [method, setMethod] = useState<Method>("followers");
  const [followers, setFollowers] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([EMPTY_POST()]);

  const cfg = PLATFORMS[platform];
  const bm = cfg.benchmarks[method];

  const addPost = () => setPosts((p) => [...p, EMPTY_POST()]);
  const removePost = (id: number) =>
    setPosts((p) => p.filter((x) => x.id !== id));

  const updatePost = (id: number, field: keyof Post, value: string): void =>
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );

  const results = useMemo(
    () =>
      posts.map((post) => {
        const er = calcER(post, followers, method);
        return { id: post.id, er, rating: getRating(er, bm) };
      }),
    [posts, followers, method, bm],
  );

  const avgER = results.length
    ? results.reduce((s, r) => s + r.er, 0) / results.length
    : 0;

  const avgRating = getRating(avgER, bm);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg'>
              <TrendingUp className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Engagement Rate Calculator
            </h2>
            <p className='text-gray-600'>
              Measure and benchmark your social media performance
            </p>
          </div>

          {/* Platform */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Platform
            </label>
            <div className='grid grid-cols-3 md:grid-cols-6 gap-2'>
              {PLATFORM_KEYS.map((pk) => (
                <button
                  key={pk}
                  onClick={() => setPlatform(pk)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-semibold transition-all border-2 ${
                    platform === pk
                      ? "border-emerald-400 bg-emerald-50 shadow-md scale-105"
                      : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span className='text-xl'>{PLATFORMS[pk].icon}</span>
                  <span>{PLATFORMS[pk].label.split("/")[0]!.trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Method + followers */}
          <div className='grid md:grid-cols-2 gap-4 mb-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Calculation Method
              </label>
              <div className='space-y-2'>
                {(
                  [
                    {
                      value: "followers",
                      label: "By Followers",
                      desc: "Most common — total interactions ÷ followers",
                    },
                    {
                      value: "reach",
                      label: "By Reach",
                      desc: "Interactions ÷ unique accounts reached",
                    },
                    {
                      value: "impressions",
                      label: "By Impressions",
                      desc: "Interactions ÷ total impressions (inc. repeats)",
                    },
                  ] as { value: Method; label: string; desc: string }[]
                ).map(({ value, label, desc }) => (
                  <label
                    key={value}
                    className='flex items-start gap-3 cursor-pointer p-3 rounded-lg border-2 border-gray-100 hover:border-emerald-200 transition-colors'
                  >
                    <input
                      type='radio'
                      name='method'
                      checked={method === value}
                      onChange={() => setMethod(value)}
                      className='mt-0.5 text-emerald-600'
                    />
                    <div>
                      <div className='font-semibold text-sm text-gray-900'>
                        {label}
                      </div>
                      <div className='text-xs text-gray-500'>{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              {method === "followers" && (
                <div className='mb-4'>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Follower Count
                  </label>
                  <input
                    type='number'
                    value={followers}
                    min={0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFollowers(e.target.value)
                    }
                    placeholder='e.g. 10000'
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 text-lg font-semibold'
                  />
                </div>
              )}

              {/* Benchmarks */}
              <div className='bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200'>
                <div className='flex items-center gap-2 mb-3'>
                  <Info className='w-4 h-4 text-emerald-600' />
                  <span className='text-sm font-bold text-gray-700'>
                    {cfg.label} Benchmarks ({method})
                  </span>
                </div>
                <div className='space-y-2'>
                  {[
                    {
                      label: "🔥 Excellent",
                      value: `≥ ${bm.great}%`,
                      color: "text-green-700",
                    },
                    {
                      label: "👍 Good",
                      value: `≥ ${bm.good}%`,
                      color: "text-blue-700",
                    },
                    {
                      label: "😐 Average",
                      value: `≥ ${bm.avg}%`,
                      color: "text-yellow-700",
                    },
                    {
                      label: "📉 Below avg",
                      value: `< ${bm.avg}%`,
                      color: "text-red-700",
                    },
                  ].map(({ label, value, color }) => (
                    <div key={label} className='flex justify-between text-sm'>
                      <span className='text-gray-600'>{label}</span>
                      <span className={`font-bold ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className='mb-6'>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='font-bold text-gray-900'>Posts</h3>
              <button
                onClick={addPost}
                className='flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors'
              >
                <Plus className='w-4 h-4' /> Add Post
              </button>
            </div>

            <div className='space-y-4'>
              {posts.map((post, idx) => {
                const res = results[idx];
                return (
                  <div
                    key={post.id}
                    className='bg-gray-50 rounded-xl p-5 border border-gray-100'
                  >
                    <div className='flex items-center justify-between mb-4'>
                      <span className='font-semibold text-gray-700'>
                        Post {idx + 1}
                      </span>
                      {posts.length > 1 && (
                        <button
                          onClick={() => removePost(post.id)}
                          aria-label='Remove post'
                          className='p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-4'>
                      {(
                        [
                          { field: "likes", label: "Likes / Reactions" },
                          { field: "comments", label: "Comments" },
                          { field: "shares", label: "Shares / Reposts" },
                          { field: "saves", label: "Saves / Bookmarks" },
                          ...(method === "reach"
                            ? [{ field: "reach", label: "Reach" }]
                            : []),
                          ...(method === "impressions"
                            ? [{ field: "impressions", label: "Impressions" }]
                            : []),
                        ] as { field: keyof Post; label: string }[]
                      ).map(({ field, label }) => (
                        <div key={field}>
                          <label className='block text-xs font-medium text-gray-600 mb-1'>
                            {label}
                          </label>
                          <input
                            type='number'
                            min={0}
                            value={post[field]}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => updatePost(post.id, field, e.target.value)}
                            placeholder='0'
                            className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-400 text-sm'
                          />
                        </div>
                      ))}
                    </div>

                    {/* Result */}
                    {res && res.er > 0 && (
                      <div className='mt-2'>
                        <div className='flex items-center justify-between mb-1'>
                          <span className='text-sm font-semibold text-gray-700'>
                            ER:{" "}
                            <span className={cfg.color}>
                              {res.er.toFixed(2)}%
                            </span>
                          </span>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${res.rating.color} ${res.rating.bg}`}
                          >
                            {res.rating.label}
                          </span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2'>
                          <div
                            className={`h-2 rounded-full transition-all ${cfg.bar}`}
                            style={{ width: `${barWidth(res.er, bm)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Average summary */}
          {avgER > 0 && (
            <div
              className={`rounded-2xl p-6 border-2 ${avgRating.bg} border-opacity-50 mb-6`}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm font-semibold text-gray-600 mb-1'>
                    Average Engagement Rate across {posts.length} post
                    {posts.length !== 1 ? "s" : ""}
                  </div>
                  <div className={`text-5xl font-bold ${cfg.color}`}>
                    {avgER.toFixed(2)}%
                  </div>
                </div>
                <div className={`text-right`}>
                  <div className={`text-2xl font-bold ${avgRating.color}`}>
                    {avgRating.label}
                  </div>
                  <div className='text-sm text-gray-500 mt-1'>
                    {cfg.label} benchmark
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>
              How Engagement Rate is Calculated:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                <strong>By Followers:</strong> (Likes + Comments + Shares +
                Saves) ÷ Followers × 100
              </li>
              <li>
                <strong>By Reach:</strong> Total interactions ÷ Unique accounts
                reached × 100
              </li>
              <li>
                <strong>By Impressions:</strong> Total interactions ÷ Total
                impressions × 100
              </li>
              <li>
                Benchmarks vary widely by niche, audience size, and content type
              </li>
              <li>
                Smaller accounts typically have higher ER% than larger ones
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
