"use client";
import React, { useState, useMemo } from "react";
import { Type, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Stats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
  speakingTime: string;
  uniqueWords: number;
  avgWordLength: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeStats(text: string): Stats {
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    : [];
  const paragraphs = text.trim()
    ? text.split(/\n{2,}/).filter((p) => p.trim().length > 0)
    : [];
  const lines = text ? text.split("\n").filter((l) => l.trim().length > 0) : [];

  const wordCount = words.length;
  const readingSeconds = Math.ceil((wordCount / 238) * 60);
  const speakingSeconds = Math.ceil((wordCount / 130) * 60);

  const fmt = (s: number): string => {
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return rem ? `${m}m ${rem}s` : `${m}m`;
  };

  const uniqueWords = new Set(
    words.map((w) => w.toLowerCase().replace(/[^a-z]/g, "")),
  ).size;
  const totalLetters = words.join("").replace(/[^a-zA-Z]/g, "").length;
  const avgWordLength = wordCount > 0 ? totalLetters / wordCount : 0;

  return {
    words: wordCount,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    lines: lines.length,
    readingTime: wordCount === 0 ? "—" : fmt(readingSeconds),
    speakingTime: wordCount === 0 ? "—" : fmt(speakingSeconds),
    uniqueWords,
    avgWordLength: Math.round(avgWordLength * 10) / 10,
  };
}

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
  "is",
  "are",
  "was",
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
  "this",
  "that",
  "these",
  "those",
  "it",
  "its",
  "i",
  "you",
  "he",
  "she",
  "we",
  "they",
  "my",
  "your",
  "his",
  "her",
  "our",
  "their",
]);

function topWords(text: string, n = 5): { word: string; count: number }[] {
  if (!text.trim()) return [];
  const freq: Record<string, number> = {};
  text
    .toLowerCase()
    .split(/\s+/)
    .forEach((w) => {
      const clean = w.replace(/[^a-z]/g, "");
      if (clean.length > 2 && !STOP_WORDS.has(clean)) {
        freq[clean] = (freq[clean] || 0) + 1;
      }
    });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count }));
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function WordCounterLiveClient() {
  const [text, setText] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const stats = useMemo(() => computeStats(text), [text]);
  const top = useMemo(() => topWords(text), [text]);

  const targetNum = parseInt(target) || 0;
  const progress =
    targetNum > 0 ? Math.min(100, (stats.words / targetNum) * 100) : 0;

  const handleReset = (): void => {
    setText("");
    setTarget("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Type className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Word Counter Live
            </h2>
            <p className="text-gray-600">
              Real-time word count, reading time, and detailed text statistics
            </p>
          </div>

          {/* Target word count */}
          <div className="flex items-center gap-3 mb-3">
            <input
              type="number"
              value={target}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTarget(e.target.value)
              }
              placeholder="Set word target (optional)"
              className="w-56 border-2 border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {targetNum > 0 && (
              <span className="text-sm text-gray-500">
                {stats.words}/{targetNum} ({progress.toFixed(0)}%)
              </span>
            )}
          </div>

          {/* Progress bar */}
          {targetNum > 0 && (
            <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  progress >= 100 ? "bg-green-500" : "bg-indigo-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            placeholder="Start typing or paste your text here…"
            rows={9}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mb-6"
          />

          {/* Primary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {[
              { label: "Words", value: stats.words.toLocaleString() },
              { label: "Characters", value: stats.characters.toLocaleString() },
              { label: "Sentences", value: stats.sentences.toLocaleString() },
              { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center"
              >
                <div className="text-2xl font-bold text-indigo-700">
                  {value}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Secondary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Chars (no spaces)",
                value: stats.charactersNoSpaces.toLocaleString(),
              },
              {
                label: "Unique words",
                value: stats.uniqueWords.toLocaleString(),
              },
              { label: "Reading time", value: stats.readingTime },
              { label: "Speaking time", value: stats.speakingTime },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center"
              >
                <div className="text-lg font-bold text-gray-700">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Top words */}
          {top.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Most frequent words
              </h3>
              <div className="flex flex-wrap gap-2">
                {top.map(({ word, count }) => (
                  <span
                    key={word}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm"
                  >
                    <span className="font-medium">{word}</span>
                    <span className="text-indigo-400 text-xs">×{count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          {/* Tips */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">
              Understanding Word Counter Live:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Set a word target to track progress toward essays or articles
              </li>
              <li>
                Reading time is estimated at 238 words per minute (average
                adult)
              </li>
              <li>
                Speaking time uses 130 words per minute, ideal for presentations
              </li>
              <li>
                The word frequency list ignores common stop words for more
                meaningful insights
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
