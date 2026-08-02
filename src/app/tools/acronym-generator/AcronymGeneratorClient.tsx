"use client";
import React, { useState } from "react";
import { Zap, Copy, Check, RotateCcw } from "lucide-react";
import { trackToolUse } from "@/components/monetization/UsageStreakPrompt";

export default function AcronymGeneratorClient() {
  const [phrase, setPhrase] = useState<string>("");
  const [style, setStyle] = useState<"upper" | "lower" | "dot">("upper");
  const [copied, setCopied] = useState<boolean>(false);

  const generateAcronym = (text: string): string => {
    if (!text.trim()) return "";
    const words = text.trim().split(/\s+/);
    const letters = words.map((w) => w[0]).filter(Boolean);
    if (style === "upper") return letters.join("").toUpperCase();
    if (style === "lower") return letters.join("").toLowerCase();
    trackToolUse("acronym-generator");
    return letters.join(".").toUpperCase() + ".";
  };

  const acronym = generateAcronym(phrase);
  const wordList = phrase.trim()
    ? phrase.trim().split(/\s+/).filter(Boolean)
    : [];

  const handleCopy = async (): Promise<void> => {
    if (!acronym) return;
    await navigator.clipboard.writeText(acronym);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = (): void => {
    setPhrase("");
    setStyle("upper");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Acronym Generator
            </h2>
            <p className="text-gray-500">
              Turn any phrase into a crisp acronym instantly
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {/* Phrase input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter a phrase
              </label>
              <textarea
                value={phrase}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setPhrase(e.target.value)
                }
                placeholder="e.g. As Soon As Possible"
                rows={3}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Style selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format style
              </label>
              <div className="flex gap-3">
                {(["upper", "lower", "dot"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                      style === s
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-sky-400"
                    }`}
                  >
                    {s === "upper"
                      ? "UPPERCASE"
                      : s === "lower"
                        ? "lowercase"
                        : "D.O.T."}
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            {acronym && (
              <div className="bg-sky-50 border-2 border-sky-100 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-sky-600">
                    Your Acronym
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="text-5xl font-extrabold text-sky-700 tracking-widest mb-4">
                  {acronym}
                </div>
                {/* Letter breakdown */}
                <div className="flex flex-wrap gap-2">
                  {wordList.map((word, i) => (
                    <div key={i} className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-sky-600">
                        {word[0]}
                      </span>
                      <span className="text-sm text-gray-500">
                        {word.slice(1)}
                      </span>
                      {i < wordList.length - 1 && (
                        <span className="text-gray-300 mx-1">·</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            {phrase.trim() && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Words", value: wordList.length },
                  {
                    label: "Letters in acronym",
                    value: acronym.replace(/\./g, "").length,
                  },
                  {
                    label: "Characters in phrase",
                    value: phrase.trim().length,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200"
                  >
                    <div className="text-2xl font-bold text-sky-600">
                      {value}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Reset */}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-sky-600 transition-colors mb-8"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>

            {/* Tips */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
              <p className="font-semibold mb-2 text-gray-800">
                💡 Tips for great acronyms:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use UPPERCASE for standard acronyms like NASA or NATO</li>
                <li>
                  The D.O.T. style adds periods between letters for formal
                  documents
                </li>
                <li>
                  Skip articles like "a", "an", "the" for cleaner, punchier
                  results
                </li>
                <li>
                  Try multiple phrase variations to find the most memorable
                  acronym
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
