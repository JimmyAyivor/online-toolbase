"use client";
import React, { useMemo } from "react";
import { AlignLeft } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TextStats {
  sentences: number;
  words: number;
  characters: number;
  paragraphs: number;
  syllables: number;
  avgWordLength: string;
  avgSentenceLength: string;
  fkGrade: string;
  readingLevel: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GRADE_LEVELS: [number, string][] = [
  [6, "Very Easy (Grade 6)"],
  [7, "Easy (Grade 7)"],
  [9, "Standard (Grade 9)"],
  [12, "Fairly Difficult (Grade 12)"],
  [16, "Difficult (College level)"],
  [Infinity, "Very Difficult (Academic)"],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function analyzeText(text: string): TextStats | null {
  if (!text.trim()) return null;

  const sentences = (text.match(/[^.!?]+[.!?]+/g) ?? []).length || 1;
  const words = (text.match(/\b\w+\b/g) ?? []).length;
  const characters = text.replace(/\s/g, "").length;
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;
  const syllables = (text.match(/[aeiouAEIOU]/g) ?? []).length;

  const fk =
    words > 0
      ? 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
      : 0;

  const readingLevel =
    GRADE_LEVELS.find(([g]) => fk <= g)?.[1] ??
    GRADE_LEVELS[GRADE_LEVELS.length - 1][1];

  return {
    sentences,
    words,
    characters,
    paragraphs,
    syllables,
    avgWordLength: words > 0 ? (characters / words).toFixed(1) : "0",
    avgSentenceLength: sentences > 0 ? (words / sentences).toFixed(1) : "0",
    fkGrade: Math.max(0, fk).toFixed(1),
    readingLevel,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SentenceCounterClient() {
  const [text, setText] = React.useState<string>("");

  const stats = useMemo(() => analyzeText(text), [text]);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <AlignLeft className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sentence Counter
            </h2>
            <p className="text-gray-500">
              Count sentences, paragraphs, and reading level — stats update live
            </p>
          </div>

          <div className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Text
              </label>
              <textarea
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                placeholder="Start typing or paste your text here — all statistics update live..."
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{stats?.words ?? 0} words</span>
                <span>{text.length} characters</span>
              </div>
            </div>

            {/* Stats */}
            {stats && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Sentences", value: stats.sentences },
                      { label: "Words", value: stats.words },
                      { label: "Characters", value: stats.characters },
                      { label: "Paragraphs", value: stats.paragraphs },
                      { label: "Syllables", value: stats.syllables },
                      { label: "Avg Word Length", value: stats.avgWordLength },
                      {
                        label: "Avg Sentence Length",
                        value: `${stats.avgSentenceLength} words`,
                      },
                      { label: "FK Grade", value: stats.fkGrade },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-indigo-600">
                          {value}
                        </div>
                        <div className="text-sm text-gray-600">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reading level */}
                <div className="bg-white border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-700">
                      Flesch–Kincaid Reading Level
                    </h3>
                    <span className="text-sm font-semibold text-indigo-600">
                      {stats.readingLevel}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (Number(stats.fkGrade) / 20) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Grade 1 (simplest)</span>
                    <span>Grade 20+ (academic)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                All statistics update in real time as you type — no button to
                press
              </li>
              <li>
                The Flesch–Kincaid grade approximates the US school grade needed
                to read the text comfortably
              </li>
              <li>
                Aim for grade 8–10 for general-purpose web content; lower for
                wider audiences
              </li>
              <li>
                Paragraphs are counted by blank lines — add a blank line between
                blocks of text
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
