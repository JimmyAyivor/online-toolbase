"use client";
import React, { useState } from "react";
import {
  Copy,
  Check,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tweet {
  id: number;
  content: string;
}

interface ThreadTemplate {
  label: string;
  desc: string;
  tweets: string[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CHAR_LIMIT = 280;

const THREAD_TEMPLATES: ThreadTemplate[] = [
  {
    label: "Teaching Thread",
    desc: "Share knowledge, step by step",
    tweets: [
      "I spent [X hours] learning [topic]. Here's everything you need to know in [N] tweets:\n\n🧵 Thread 👇",
      "1/ [Start with the most important insight or counterintuitive point]\n\n[Expand with a sentence or two]",
      "2/ [Second key point]\n\n[Supporting detail or example]",
      "3/ [Third key point]\n\n[Supporting detail or example]",
      "4/ [Practical tip or actionable advice related to this topic]",
      "If this was useful, RT the first tweet to share it.\n\nFollow me @[handle] for more on [topic] 👇",
    ],
  },
  {
    label: "Story Thread",
    desc: "Personal narrative that builds to a lesson",
    tweets: [
      "[Dramatic opening — state what happened, result first]\n\nHere's the full story 🧵",
      "It started when [set the scene — time, place, situation]",
      "[Rising action — what went wrong or what challenge emerged]",
      "[The turning point — the key decision or discovery]",
      "[The outcome — what happened as a result]",
      "The lesson I took away:\n\n[3-5 bullet lessons]\n\nFollow for more stories like this 👇",
    ],
  },
  {
    label: "Hot Takes",
    desc: "Series of bold opinions in your niche",
    tweets: [
      "Controversial opinions about [topic] that will make some people angry:\n\n🧵 A thread",
      "Hot take #1: [Bold statement that challenges conventional wisdom]\n\n[1-2 sentences backing it up]",
      "Hot take #2: [Another opinion]\n\n[Brief reasoning]",
      "Hot take #3: [Another opinion]\n\n[Brief reasoning]",
      "Hot take #4: [Another opinion]\n\n[Brief reasoning]",
      "Agree or disagree? Reply below 👇\n\nIf these resonated, follow @[handle] — I post like this daily.",
    ],
  },
  {
    label: "Resource List",
    desc: "Curated links, tools, or recommendations",
    tweets: [
      "The [N] best [resources/tools/books] for [topic] (most people don't know #4):\n\n🧵",
      "1/ [Resource name]\n\n[What it is and why it's valuable]\n\n🔗 [link]",
      "2/ [Resource name]\n\n[What it is and why it's valuable]\n\n🔗 [link]",
      "3/ [Resource name]\n\n[What it is and why it's valuable]\n\n🔗 [link]",
      "4/ [Resource name — this is the one most people don't know]\n\n[What it is and why it's valuable]\n\n🔗 [link]",
      "Save this thread so you don't lose it 📌\n\nFollow @[handle] — I share resources like this every week.",
    ],
  },
];

const TWEET_TIPS = [
  "Start with a hook tweet that creates curiosity — it determines whether anyone reads on",
  "Each tweet should be able to stand alone AND flow from the previous one",
  "Use numbered tweets (1/, 2/) only if order matters — it's not required",
  "End with a CTA: follow, RT the first tweet, or reply with a question",
  "Best thread length: 5–12 tweets. Under 4 isn't a thread; over 15 loses people",
  "Add a period before your first tweet reply to see it as a thread in feeds",
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function TwitterThreadBuilderClient() {
  const [tweets, setTweets] = useState<Tweet[]>([{ id: 1, content: "" }]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const addTweet = (afterIdx?: number): void => {
    const newTweet: Tweet = { id: Date.now(), content: "" };
    setTweets((prev) => {
      if (afterIdx === undefined) return [...prev, newTweet];
      const next = [...prev];
      next.splice(afterIdx + 1, 0, newTweet);
      return next;
    });
  };

  const removeTweet = (id: number): void =>
    setTweets((prev) => prev.filter((t) => t.id !== id));

  const updateTweet = (id: number, content: string): void =>
    setTweets((prev) => prev.map((t) => (t.id === id ? { ...t, content } : t)));

  const moveTweet = (idx: number, dir: -1 | 1): void => {
    setTweets((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target]!, next[idx]!];
      return next;
    });
  };

  const loadTemplate = (tpl: ThreadTemplate): void => {
    setTweets(
      tpl.tweets.map((content, i) => ({ id: Date.now() + i, content })),
    );
  };

  const copyTweet = (tweet: Tweet, idx: number): void => {
    navigator.clipboard.writeText(tweet.content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = (): void => {
    const full = tweets
      .map((t, i) => `[${i + 1}/${tweets.length}]\n${t.content}`)
      .join("\n\n---\n\n");
    navigator.clipboard.writeText(full);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const downloadThread = (): void => {
    const full = tweets
      .map((t, i) => `Tweet ${i + 1}/${tweets.length}:\n${t.content}`)
      .join("\n\n---\n\n");
    const blob = new Blob([full], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thread.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalChars = tweets.reduce((s, t) => s + t.content.length, 0);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl text-white font-black">𝕏</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Thread Builder
            </h2>
            <p className="text-gray-500">
              Compose, reorder, and export Twitter / X threads
            </p>
          </div>

          {/* Templates */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start from a Template
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {THREAD_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.label}
                  onClick={() => loadTemplate(tpl)}
                  className="text-left px-3 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-xl transition-all"
                >
                  <div className="text-sm font-bold text-gray-900">
                    {tpl.label}
                  </div>
                  <div className="text-xs text-gray-500">{tpl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">{tweets.length}</span>{" "}
              tweets ·{" "}
              <span className="font-bold text-gray-900">
                {totalChars.toLocaleString()}
              </span>{" "}
              total chars
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadThread}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm text-gray-600 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button
                onClick={copyAll}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy All
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tweet composer */}
          <div className="space-y-3">
            {tweets.map((tweet, idx) => {
              const charCount = tweet.content.length;
              const over = charCount > CHAR_LIMIT;
              const warn = charCount > CHAR_LIMIT * 0.85 && !over;
              const isCopied = copiedIdx === idx;

              return (
                <div key={tweet.id} className="relative group">
                  {/* Thread line */}
                  {idx < tweets.length - 1 && (
                    <div className="absolute left-5 top-full w-0.5 h-3 bg-gray-200 z-10" />
                  )}

                  <div
                    className={`flex gap-3 p-4 border-2 rounded-2xl transition-all ${
                      over
                        ? "border-red-300 bg-red-50"
                        : "border-gray-100 bg-gray-50 focus-within:border-gray-300"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <textarea
                        value={tweet.content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          updateTweet(tweet.id, e.target.value)
                        }
                        placeholder={
                          idx === 0
                            ? "Start your thread with a compelling hook…"
                            : "Continue the thread…"
                        }
                        rows={3}
                        className="w-full bg-transparent resize-none focus:outline-none text-gray-900 placeholder-gray-400 text-sm leading-relaxed"
                      />

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-1">
                          <button
                            onClick={() => moveTweet(idx, -1)}
                            disabled={idx === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20 rounded transition-colors"
                            aria-label="Move up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveTweet(idx, 1)}
                            disabled={idx === tweets.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-20 rounded transition-colors"
                            aria-label="Move down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => addTweet(idx)}
                            className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                            aria-label="Insert tweet below"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          {tweets.length > 1 && (
                            <button
                              onClick={() => removeTweet(tweet.id)}
                              className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                              aria-label="Delete tweet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold ${over ? "text-red-600" : warn ? "text-orange-500" : "text-gray-400"}`}
                          >
                            {charCount}/{CHAR_LIMIT}
                          </span>
                          {/* Circular progress */}
                          <svg
                            className="w-5 h-5 -rotate-90"
                            viewBox="0 0 20 20"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="8"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="2.5"
                            />
                            <circle
                              cx="10"
                              cy="10"
                              r="8"
                              fill="none"
                              stroke={
                                over ? "#ef4444" : warn ? "#f97316" : "#1d4ed8"
                              }
                              strokeWidth="2.5"
                              strokeDasharray={`${Math.min((charCount / CHAR_LIMIT) * 50.27, 50.27)} 50.27`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <button
                            onClick={() => copyTweet(tweet, idx)}
                            aria-label="Copy tweet"
                            className="p-1.5 bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-green-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add tweet button */}
            <button
              onClick={() => addTweet()}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-2xl text-gray-500 hover:text-gray-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add tweet</span>
            </button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm font-bold text-gray-700 mb-2">
              💡 Thread Tips
            </p>
            <ul className="space-y-1">
              {TWEET_TIPS.map((tip) => (
                <li
                  key={tip}
                  className="text-xs text-gray-600 flex items-start gap-1.5"
                >
                  <span className="text-gray-400 mt-0.5">•</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
