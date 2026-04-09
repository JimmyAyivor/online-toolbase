"use client";
import React, { useState, useMemo } from "react";
import { Search, RotateCcw } from "lucide-react";

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "is",
  "was",
  "are",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "shall",
  "can",
  "this",
  "that",
  "these",
  "those",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "her",
  "us",
  "them",
  "my",
  "your",
  "his",
  "its",
  "our",
  "their",
  "as",
  "if",
  "than",
  "so",
  "not",
  "no",
  "up",
  "out",
  "about",
  "into",
  "over",
  "after",
  "under",
  "while",
  "where",
  "when",
  "what",
  "which",
  "who",
  "how",
  "all",
  "any",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "only",
  "also",
  "just",
  "now",
  "then",
  "here",
  "there",
]);

function getTopWords(
  text: string,
  ignoreStop: boolean,
  minLen: number,
): { word: string; count: number; density: number }[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= minLen);
  const totalWords = words.length;
  if (totalWords === 0) return [];
  const freq: Record<string, number> = {};
  words.forEach((w) => {
    if (ignoreStop && STOP_WORDS.has(w)) return;
    freq[w] = (freq[w] || 0) + 1;
  });
  return Object.entries(freq)
    .map(([word, count]) => ({
      word,
      count,
      density: parseFloat(((count / totalWords) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);
}

function getDensityColor(density: number) {
  if (density > 5)
    return {
      bar: "bg-red-500",
      badge: "bg-red-100 text-red-700",
      label: "High",
    };
  if (density >= 2)
    return {
      bar: "bg-emerald-500",
      badge: "bg-emerald-100 text-emerald-700",
      label: "Good",
    };
  if (density >= 1)
    return {
      bar: "bg-blue-400",
      badge: "bg-blue-100 text-blue-700",
      label: "Low",
    };
  return {
    bar: "bg-gray-300",
    badge: "bg-gray-100 text-gray-500",
    label: "Rare",
  };
}

export default function KeywordDensityCheckerClient() {
  const [text, setText] = useState("");
  const [ignoreStop, setIgnoreStop] = useState(true);
  const [minLen, setMinLen] = useState(3);
  const [focusKeyword, setFocusKeyword] = useState("");

  const words = useMemo(
    () => getTopWords(text, ignoreStop, minLen),
    [text, ignoreStop, minLen],
  );
  const totalWords = text.trim() ? text.trim().split(/\s+/).length : 0;
  const uniqueWords = words.length;
  const maxCount = words[0]?.count || 1;

  const focusResult = useMemo(() => {
    if (!focusKeyword.trim() || !text.trim()) return null;
    const kw = focusKeyword.trim().toLowerCase();
    const textLower = text.toLowerCase();
    const count = (
      textLower.match(
        new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"),
      ) || []
    ).length;
    const density =
      totalWords > 0 ? parseFloat(((count / totalWords) * 100).toFixed(2)) : 0;
    return { count, density };
  }, [focusKeyword, text, totalWords]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full mb-4 shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Keyword Density Checker
            </h2>
            <p className="text-gray-500">
              Analyse keyword frequency and density in any text for SEO
              optimisation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Paste your text
                </label>
                <textarea
                  value={text}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setText(e.target.value)
                  }
                  placeholder="Paste your blog post, page content, or any text here to analyse keyword density..."
                  rows={10}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Focus keyword{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  value={focusKeyword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFocusKeyword(e.target.value)
                  }
                  placeholder="e.g. keyword density"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ignoreStop}
                    onChange={(e) => setIgnoreStop(e.target.checked)}
                    className="w-4 h-4 accent-teal-600"
                  />
                  <span className="text-sm text-gray-700">
                    Ignore stop words
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Min length:</span>
                  {[2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setMinLen(n)}
                      className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${minLen === n ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-teal-50"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              {totalWords > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Total words",
                      value: totalWords.toLocaleString(),
                      color: "bg-teal-50 border-teal-100 text-teal-700",
                    },
                    {
                      label: "Unique keywords",
                      value: uniqueWords,
                      color:
                        "bg-emerald-50 border-emerald-100 text-emerald-700",
                    },
                    {
                      label: "Characters",
                      value: text.length.toLocaleString(),
                      color: "bg-cyan-50 border-cyan-100 text-cyan-700",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className={`${color} border rounded-xl p-3 text-center`}
                    >
                      <p className="text-xl font-black">{value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Focus keyword result */}
              {focusResult && focusKeyword.trim() && (
                <div
                  className={`rounded-2xl p-5 border-2 ${focusResult.density >= 2 && focusResult.density <= 4 ? "bg-emerald-50 border-emerald-200" : focusResult.density > 4 ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                    Focus keyword: "{focusKeyword}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-black text-gray-800">
                        {focusResult.count}x
                      </p>
                      <p className="text-xs text-gray-500">occurrences</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-gray-800">
                        {focusResult.density}%
                      </p>
                      <p className="text-xs text-gray-500">density</p>
                    </div>
                    <p className="text-sm text-gray-600 flex-1">
                      {focusResult.density === 0
                        ? "Keyword not found in text."
                        : focusResult.density < 1
                          ? "Density is low — consider using the keyword more."
                          : focusResult.density <= 4
                            ? "Density is in the healthy range (1–4%)."
                            : "Density is high — may appear as keyword stuffing."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Results table */}
            <div>
              {words.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Top keywords by frequency
                  </p>
                  <div className="max-h-[520px] overflow-y-auto space-y-2 pr-1">
                    {words.map(({ word, count, density }, i) => {
                      const { bar, badge, label } = getDensityColor(density);
                      return (
                        <div
                          key={word}
                          className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 w-5 text-right">
                                {i + 1}.
                              </span>
                              <span className="font-semibold text-gray-800 text-sm">
                                {word}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-bold ${badge}`}
                              >
                                {label}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-right">
                              <span className="text-sm font-bold text-gray-700">
                                {count}x
                              </span>
                              <span className="text-sm text-gray-500 w-12">
                                {density}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`${bar} h-1.5 rounded-full`}
                              style={{
                                width: `${Math.min((count / maxCount) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-teal-50 rounded-2xl border-2 border-dashed border-teal-200">
                  <div className="text-center text-teal-400">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium">
                      Paste text to see keyword analysis
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setText("");
              setFocusKeyword("");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 SEO density guidelines:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Healthy keyword density for a focus keyword is 1–3% of total
                word count
              </li>
              <li>
                Above 4–5% risks being flagged as keyword stuffing by search
                engines
              </li>
              <li>
                Use semantically related terms (LSI keywords) to add context
                without stuffing
              </li>
              <li>
                Modern SEO prioritises natural language over precise density
                targets
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
