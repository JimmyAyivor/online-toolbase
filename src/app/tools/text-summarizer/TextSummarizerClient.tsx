"use client";
import React, { useState } from "react";
import { FileText, Copy, RotateCcw } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
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
  "shall",
  "can",
  "to",
  "of",
  "in",
  "on",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "from",
  "up",
  "down",
  "into",
  "out",
  "off",
  "over",
  "under",
  "again",
  "then",
  "once",
  "and",
  "but",
  "or",
  "nor",
  "so",
  "yet",
  "both",
  "either",
  "neither",
  "not",
  "only",
  "own",
  "same",
  "than",
  "too",
  "very",
  "just",
  "because",
  "as",
  "until",
  "while",
  "if",
  "although",
  "though",
  "since",
  "unless",
  "however",
  "therefore",
  "thus",
  "hence",
  "i",
  "we",
  "you",
  "he",
  "she",
  "it",
  "they",
  "this",
  "that",
  "these",
  "those",
  "what",
  "which",
  "who",
  "whom",
  "whose",
]);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function summarize(text: string, ratio: number): string {
  const sentences = (text.match(/[^.!?]+[.!?]+/g) ?? []) as string[];
  if (sentences.length <= 3) return text.trim();

  const keep = Math.max(2, Math.ceil(sentences.length * ratio));
  const words = text.toLowerCase().match(/\b\w+\b/g) ?? [];
  const freq: Record<string, number> = {};
  for (const w of words) {
    if (!STOP_WORDS.has(w) && w.length > 2) {
      freq[w] = (freq[w] ?? 0) + 1;
    }
  }

  const scored = sentences.map((s) => {
    const ws = s.toLowerCase().match(/\b\w+\b/g) ?? [];
    const score =
      ws.reduce((sum, w) => sum + (freq[w] ?? 0), 0) / (ws.length || 1);
    return { s, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, keep)
    .sort((a, b) => sentences.indexOf(a.s) - sentences.indexOf(b.s))
    .map((x) => x.s.trim())
    .join(" ");
}

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TextSummarizerClient() {
  const [text, setText] = useState<string>("");
  const [ratio, setRatio] = useState<number>(30);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const run = (): void => {
    setOutput(summarize(text, ratio / 100));
    setCopied(false);
  };

  const reset = (): void => {
    setText("");
    setRatio(30);
    setOutput("");
    setCopied(false);
  };

  const copyOutput = (): void => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputWords = wordCount(text);
  const outputWords = wordCount(output);
  const compression =
    inputWords > 0 ? Math.round((outputWords / inputWords) * 100) : 0;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Text Summarizer
            </h2>
            <p className="text-gray-500">
              Summarize long text into concise key points instantly
            </p>
          </div>

          <div className="space-y-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste Your Text
              </label>
              <textarea
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                placeholder="Paste a long article, essay, or document here..."
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{inputWords} words</span>
                <span>{text.length} characters</span>
              </div>
            </div>

            {/* Options */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Summary Length: {ratio}%
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={70}
                    step={5}
                    value={ratio}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRatio(Number(e.target.value))
                    }
                    aria-label="Summary length percentage"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Shorter</span>
                    <span>Longer</span>
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset All
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={run}
              disabled={!text.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors"
            >
              Summarize Text
            </button>

            {/* Results */}
            {output && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Summary</h3>
                    <button
                      onClick={copyOutput}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {[
                      { label: "Summary Words", value: outputWords },
                      { label: "Original Words", value: inputWords },
                      { label: "Compression", value: `${compression}%` },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-indigo-600">
                          {value}
                        </div>
                        <div className="text-sm text-gray-600">{label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{output}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Works best with well-structured text that uses complete
                sentences
              </li>
              <li>
                Set a lower percentage for a more condensed summary; higher for
                more detail
              </li>
              <li>
                The summarizer picks sentences based on word importance — it
                does not paraphrase
              </li>
              <li>
                For best results, paste text of at least 150 words with clear
                paragraph structure
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
