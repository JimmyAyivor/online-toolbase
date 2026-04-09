"use client";
import React, { useState, useMemo } from "react";
import { Copy, Check, Trash2, AlertCircle, CheckCircle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Platform {
  key: string;
  name: string;
  icon: string;
  limit: number;
  color: string;
  bgColor: string;
  ringColor: string;
  barColor: string;
  notes: string[];
}

interface Stat {
  label: string;
  value: string | number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PLATFORMS: Platform[] = [
  {
    key: "twitter",
    name: "X / Twitter",
    icon: "𝕏",
    limit: 280,
    color: "text-black",
    bgColor: "bg-gray-900",
    ringColor: "ring-gray-900",
    barColor: "bg-gray-900",
    notes: [
      "URLs count as 23 chars regardless of length",
      "Images don't use character count",
    ],
  },
  {
    key: "instagram",
    name: "Instagram",
    icon: "📸",
    limit: 2200,
    color: "text-pink-600",
    bgColor: "bg-gradient-to-br from-purple-600 to-pink-500",
    ringColor: "ring-pink-500",
    barColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    notes: [
      "Only first 125 chars show before 'more'",
      "Up to 30 hashtags allowed",
    ],
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    limit: 3000,
    color: "text-blue-700",
    bgColor: "bg-blue-700",
    ringColor: "ring-blue-700",
    barColor: "bg-blue-700",
    notes: [
      "First 210 chars visible before 'see more'",
      "Articles have a 110,000 char limit",
    ],
  },
  {
    key: "facebook",
    name: "Facebook",
    icon: "📘",
    limit: 63206,
    color: "text-blue-600",
    bgColor: "bg-blue-600",
    ringColor: "ring-blue-600",
    barColor: "bg-blue-600",
    notes: [
      "Posts over ~480 chars get truncated in feed",
      "Optimal length is 40–80 chars",
    ],
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: "🎵",
    limit: 2200,
    color: "text-rose-500",
    bgColor: "bg-black",
    ringColor: "ring-rose-500",
    barColor: "bg-rose-500",
    notes: [
      "First 100 chars shown before 'more'",
      "Hashtags count toward the limit",
    ],
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: "▶",
    limit: 5000,
    color: "text-red-600",
    bgColor: "bg-red-600",
    ringColor: "ring-red-600",
    barColor: "bg-red-600",
    notes: [
      "Description first 100 chars shown in search",
      "Title limited to 100 chars",
    ],
  },
  {
    key: "pinterest",
    name: "Pinterest",
    icon: "📌",
    limit: 500,
    color: "text-red-700",
    bgColor: "bg-red-700",
    ringColor: "ring-red-700",
    barColor: "bg-red-700",
    notes: [
      "First 50 chars most visible in feed",
      "Keywords matter for discovery",
    ],
  },
  {
    key: "threads",
    name: "Threads",
    icon: "🧵",
    limit: 500,
    color: "text-gray-900",
    bgColor: "bg-gray-900",
    ringColor: "ring-gray-900",
    barColor: "bg-gray-800",
    notes: [
      "Up to 10 images or 5-min video per post",
      "No hashtag indexing currently",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

function countHashtags(text: string): number {
  return (text.match(/#\w+/g) ?? []).length;
}

function countMentions(text: string): number {
  return (text.match(/@\w+/g) ?? []).length;
}

function countUrls(text: string): number {
  return (text.match(/https?:\/\/\S+/g) ?? []).length;
}

function getBarPct(used: number, limit: number): number {
  return Math.min((used / limit) * 100, 100);
}

function getStatusColor(pct: number): string {
  if (pct >= 100) return "text-red-600";
  if (pct >= 85) return "text-orange-500";
  return "text-green-600";
}

function getStatusIcon(pct: number) {
  if (pct >= 100) return <AlertCircle className="w-4 h-4 text-red-500" />;
  if (pct >= 85) return <AlertCircle className="w-4 h-4 text-orange-400" />;
  return <CheckCircle className="w-4 h-4 text-green-500" />;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SocialMediaCharacterCounterClient() {
  const [text, setText] = useState<string>("");
  const [active, setActive] = useState<string>("twitter");
  const [copied, setCopied] = useState<boolean>(false);

  const platform = PLATFORMS.find((p) => p.key === active) ?? PLATFORMS[0]!;

  const stats = useMemo(
    (): Stat[] => [
      { label: "Characters", value: text.length },
      { label: "Words", value: countWords(text) },
      { label: "Hashtags", value: countHashtags(text) },
      { label: "Mentions", value: countMentions(text) },
      { label: "URLs", value: countUrls(text) },
      { label: "Lines", value: text.split("\n").length },
    ],
    [text],
  );

  const used = text.length;
  const remaining = platform.limit - used;
  const pct = getBarPct(used, platform.limit);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Social Media Character Counter
            </h2>
            <p className="text-gray-500">
              Write and check character limits for every major platform
            </p>
          </div>

          {/* Platform selector */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
            {PLATFORMS.map((p) => (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl text-xs font-semibold transition-all ${
                  active === p.key
                    ? "ring-2 ring-offset-1 " +
                      p.ringColor +
                      " bg-gray-50 scale-105 shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">{p.icon}</span>
                <span className="leading-tight text-center hidden md:block">
                  {p.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active platform banner */}
          <div
            className={`${platform.bgColor} text-white rounded-xl p-4 mb-6 flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{platform.icon}</span>
              <div>
                <div className="font-bold text-lg">{platform.name}</div>
                <div className="text-sm opacity-80">
                  {platform.limit.toLocaleString()} character limit
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-4xl font-bold ${remaining < 0 ? "text-red-300" : "text-white"}`}
              >
                {remaining < 0 ? remaining : remaining}
              </div>
              <div className="text-sm opacity-80">remaining</div>
            </div>
          </div>

          {/* Main layout */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Textarea */}
            <div className="md:col-span-2 space-y-3">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setText(e.target.value)
                  }
                  placeholder={`Write your ${platform.name} post here…`}
                  className="w-full h-56 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-sky-400 resize-none text-gray-900 leading-relaxed text-sm font-medium"
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={!text}
                    aria-label="Copy text"
                    className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={() => setText("")}
                    disabled={!text}
                    aria-label="Clear text"
                    className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-red-50 disabled:opacity-40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={`font-semibold ${getStatusColor(pct)}`}>
                    {used.toLocaleString()} / {platform.limit.toLocaleString()}{" "}
                    characters
                  </span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(pct)}
                    <span className={`font-medium ${getStatusColor(pct)}`}>
                      {pct >= 100
                        ? `${Math.abs(remaining)} over limit`
                        : `${pct.toFixed(0)}% used`}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      pct >= 100
                        ? "bg-red-500"
                        : pct >= 85
                          ? "bg-orange-400"
                          : platform.barColor
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Platform notes */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                <div className="text-xs font-semibold text-sky-700 mb-1">
                  💡 {platform.name} Tips
                </div>
                {platform.notes.map((note) => (
                  <div
                    key={note}
                    className="text-xs text-sky-800 flex items-start gap-1 mt-1"
                  >
                    <span className="text-sky-400 mt-0.5">•</span>
                    {note}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats panel */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
                Text Analysis
              </h3>
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
                >
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="font-bold text-gray-900">{value}</span>
                </div>
              ))}

              {/* All-platform overview */}
              <div className="mt-4">
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">
                  All Platforms
                </h3>
                <div className="space-y-2">
                  {PLATFORMS.map((p) => {
                    const pUsed = text.length;
                    const pPct = getBarPct(pUsed, p.limit);
                    const over = pUsed > p.limit;
                    return (
                      <button
                        key={p.key}
                        onClick={() => setActive(p.key)}
                        className={`w-full text-left rounded-lg px-3 py-2 border transition-all ${
                          active === p.key
                            ? "border-sky-400 bg-sky-50"
                            : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-medium text-gray-700">
                            {p.icon} {p.name}
                          </span>
                          <span
                            className={
                              over ? "text-red-500 font-bold" : "text-gray-500"
                            }
                          >
                            {over
                              ? `+${pUsed - p.limit} over`
                              : `${p.limit - pUsed} left`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${over ? "bg-red-500" : p.barColor}`}
                            style={{ width: `${pPct}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
