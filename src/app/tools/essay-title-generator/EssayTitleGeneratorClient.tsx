"use client";
import React, { useState } from "react";
import { Pencil, Copy, RotateCcw, RefreshCw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type WritingType = "essay" | "research" | "blog" | "report";

// ─── Constants ───────────────────────────────────────────────────────────────

const WRITING_TYPES: { key: WritingType; label: string }[] = [
  { key: "essay", label: "Essay" },
  { key: "research", label: "Research Paper" },
  { key: "blog", label: "Blog Post" },
  { key: "report", label: "Report" },
];

const TEMPLATES: ((kw: string) => string)[] = [
  (kw) => `The Complete Guide to ${kw}`,
  (kw) => `Understanding ${kw}: A Comprehensive Overview`,
  (kw) => `How ${kw} Is Changing the World`,
  (kw) => `${kw}: Causes, Effects, and Solutions`,
  (kw) => `The Impact of ${kw} on Modern Society`,
  (kw) => `Exploring the Complexities of ${kw}`,
  (kw) => `${kw}: A Critical Analysis`,
  (kw) => `Why ${kw} Matters More Than Ever`,
  (kw) => `The Truth About ${kw}`,
  (kw) => `${kw} in the 21st Century: Challenges and Opportunities`,
  (kw) => `Rethinking ${kw}: New Perspectives`,
  (kw) => `The Future of ${kw}: Trends and Predictions`,
  (kw) => `${kw}: Myths vs. Reality`,
  (kw) => `The Pros and Cons of ${kw}`,
  (kw) => `${kw}: An In-Depth Examination`,
  (kw) => `The Role of ${kw} in Shaping Our Future`,
  (kw) => `Beyond the Basics: A Deep Dive into ${kw}`,
  (kw) => `${kw}: Lessons Learned and the Road Ahead`,
  (kw) => `A Beginner&apos;s Guide to ${kw}`,
  (kw) => `Everything You Need to Know About ${kw}`,
];

const TYPE_PREFIX: Record<WritingType, string[]> = {
  essay: [],
  research: [
    "An Empirical Study of",
    "A Systematic Review of",
    "Investigating",
    "Examining the Evidence on",
  ],
  blog: [
    "Why",
    "How to Master",
    "The Ultimate Guide to",
    "Everything You Need to Know About",
  ],
  report: [
    "Executive Summary:",
    "Industry Analysis:",
    "Key Findings on",
    "A Comprehensive Report on",
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateTitles(topic: string, type: WritingType): string[] {
  const kw = topic.trim()
    ? topic.trim().charAt(0).toUpperCase() + topic.trim().slice(1)
    : "Your Topic";

  const prefixes = TYPE_PREFIX[type];
  const prefixed = prefixes.map((p) => `${p} ${kw}`);
  const templated = TEMPLATES.map((t) => t(kw));
  const all = [...prefixed, ...templated];

  return all.sort(() => Math.random() - 0.5).slice(0, 10);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function EssayTitleGeneratorClient() {
  const [topic, setTopic] = useState<string>("");
  const [type, setType] = useState<WritingType>("essay");
  const [titles, setTitles] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = (): void => {
    setTitles(generateTitles(topic, type));
    setCopied(null);
  };

  const reset = (): void => {
    setTopic("");
    setType("essay");
    setTitles([]);
    setCopied(null);
  };

  const copyTitle = (title: string): void => {
    navigator.clipboard.writeText(title);
    setCopied(title);
    setTimeout(() => setCopied(null), 2000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-violet-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Pencil className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Essay Title Generator
            </h2>
            <p className="text-gray-500">
              Generate compelling titles for essays, articles, and blog posts
            </p>
          </div>

          <div className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Topic or Keyword
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTopic(e.target.value)
                }
                onKeyDown={(e) => e.key === "Enter" && generate()}
                placeholder="e.g. climate change, artificial intelligence, mental health..."
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            {/* Options */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Pencil className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-700">Type of Writing</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {WRITING_TYPES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setType(t.key)}
                    className={`py-2 rounded-lg font-semibold text-sm transition-colors border ${
                      type === t.key
                        ? "bg-violet-600 text-white border-violet-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generate}
                className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors"
              >
                Generate Titles
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Results */}
            {titles.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Title Ideas
                  </h3>
                  <button
                    onClick={generate}
                    className="flex items-center gap-2 text-sm text-violet-600 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Regenerate
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-8">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Title
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                          Copy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {titles.map((title, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-400">
                            {i + 1}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            {title}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => copyTitle(title)}
                              className="flex items-center gap-1 text-sm text-violet-600 hover:underline ml-auto"
                            >
                              <Copy className="w-3 h-3" />
                              {copied === title ? "Copied!" : "Copy"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Press Enter in the topic field to generate without clicking the
                button
              </li>
              <li>
                Use a specific topic for better titles — &ldquo;climate change
                in coastal cities&rdquo; beats just &ldquo;climate change&rdquo;
              </li>
              <li>
                Hit Regenerate to get a fresh batch of titles from the same
                topic
              </li>
              <li>
                Combine two generated titles to create something entirely unique
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
