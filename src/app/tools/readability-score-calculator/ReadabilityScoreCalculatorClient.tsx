"use client";
import React, { useMemo, useState } from "react";
import { BookOpen, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ReadabilityStats {
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  charCount: number;
  avgSyllablesPerWord: number;
  avgWordsPerSentence: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  gunningFog: number;
  automatedReadabilityIndex: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyse(text: string): ReadabilityStats | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = trimmed
    .split(/\s+/)
    .filter((w) => w.replace(/[^a-zA-Z]/g, "").length > 0);
  const sentenceCount = Math.max(sentences.length, 1);
  const wordCount = Math.max(words.length, 1);
  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const charCount = words.join("").replace(/[^a-zA-Z0-9]/g, "").length;
  const complexWords = words.filter((w) => countSyllables(w) >= 3).length;

  const avgSyllablesPerWord = syllableCount / wordCount;
  const avgWordsPerSentence = wordCount / sentenceCount;

  const fleschReadingEase = Math.max(
    0,
    Math.min(
      100,
      206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord,
    ),
  );
  const fleschKincaidGrade = Math.max(
    0,
    0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59,
  );
  const gunningFog =
    0.4 * (avgWordsPerSentence + 100 * (complexWords / wordCount));
  const automatedReadabilityIndex = Math.max(
    0,
    4.71 * (charCount / wordCount) + 0.5 * avgWordsPerSentence - 21.43,
  );

  return {
    wordCount,
    sentenceCount,
    syllableCount,
    charCount,
    avgSyllablesPerWord,
    avgWordsPerSentence,
    fleschReadingEase,
    fleschKincaidGrade,
    gunningFog,
    automatedReadabilityIndex,
  };
}

function fleschLabel(score: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (score >= 90) {
    return {
      label: "Very Easy",
      color: "text-green-700",
      bg: "bg-green-50 border-green-200",
    };
  }
  if (score >= 70) {
    return {
      label: "Easy",
      color: "text-green-600",
      bg: "bg-green-50 border-green-200",
    };
  }
  if (score >= 60) {
    return {
      label: "Standard",
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-200",
    };
  }
  if (score >= 50) {
    return {
      label: "Fairly Difficult",
      color: "text-yellow-700",
      bg: "bg-yellow-50 border-yellow-200",
    };
  }
  if (score >= 30) {
    return {
      label: "Difficult",
      color: "text-orange-600",
      bg: "bg-orange-50 border-orange-200",
    };
  }
  return {
    label: "Very Difficult",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
  };
}

const SAMPLE =
  "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood?";

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReadabilityScoreCalculatorClient() {
  const [text, setText] = useState<string>("");

  const stats = useMemo(() => analyse(text), [text]);

  const handleReset = (): void => setText("");

  const { label, color, bg } = stats
    ? fleschLabel(stats.fleschReadingEase)
    : { label: "", color: "", bg: "" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Readability Score Calculator
            </h2>
            <p className="text-gray-600">
              Paste your text to get Flesch, Kincaid, Gunning Fog, and ARI
              scores instantly
            </p>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your text
            </label>
            <textarea
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setText(e.target.value)
              }
              placeholder="Paste or type your text here…"
              rows={7}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setText(SAMPLE)}
              className="text-sm text-orange-600 hover:underline"
            >
              Load sample text
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {stats && (
            <>
              <div
                className={`${bg} border-2 rounded-xl p-6 mb-6 flex items-center justify-between`}
              >
                <div>
                  <div className="text-sm text-gray-500 mb-0.5">
                    Flesch Reading Ease
                  </div>
                  <div className={`text-4xl font-extrabold ${color}`}>
                    {stats.fleschReadingEase.toFixed(1)}
                  </div>
                  <div className={`text-sm font-semibold mt-1 ${color}`}>
                    {label}
                  </div>
                </div>
                <div className="w-36">
                  <div className="text-xs text-gray-400 mb-1 text-right">
                    0 → 100
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all"
                      style={{ width: `${stats.fleschReadingEase}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    label: "Flesch-Kincaid Grade",
                    value: `Grade ${stats.fleschKincaidGrade.toFixed(1)}`,
                    desc: "US school grade level",
                  },
                  {
                    label: "Gunning Fog Index",
                    value: stats.gunningFog.toFixed(1),
                    desc: "Years of education needed",
                  },
                  {
                    label: "Auto. Readability Index",
                    value: stats.automatedReadabilityIndex.toFixed(1),
                    desc: "Character-based grade level",
                  },
                  {
                    label: "Avg. words / sentence",
                    value: stats.avgWordsPerSentence.toFixed(1),
                    desc: "Ideal: 15–20 words",
                  },
                ].map(({ label: metricLabel, value, desc }) => (
                  <div
                    key={metricLabel}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div className="text-xs text-gray-500">{metricLabel}</div>
                    <div className="text-xl font-bold text-orange-700 mt-1">
                      {value}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Words", value: stats.wordCount },
                  { label: "Sentences", value: stats.sentenceCount },
                  { label: "Syllables", value: stats.syllableCount },
                  { label: "Characters", value: stats.charCount },
                ].map(({ label: metricLabel, value }) => (
                  <div
                    key={metricLabel}
                    className="text-center bg-white border border-gray-200 rounded-xl p-3"
                  >
                    <div className="text-lg font-bold text-gray-800">
                      {value.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">{metricLabel}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 Improving your readability score:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>A Flesch score of 60–70 is ideal for general audiences</li>
              <li>
                Keep sentences under 20 words to improve readability scores
              </li>
              <li>
                Avoid complex, multi-syllable words where simpler alternatives
                exist
              </li>
              <li>A Gunning Fog score below 12 is readable by most adults</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
