"use client";
import React, { useState } from "react";
import { List, Copy, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type BulletStyle = "bullet" | "dash" | "number";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function convertToBullets(text: string, style: BulletStyle): string {
  const sentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) =>
      s
        .trim()
        .replace(/^[-•*]\s*/, "")
        .replace(/^\d+[.)]\s*/, ""),
    )
    .filter((s) => s.length > 2);

  return sentences
    .map((s, i) => {
      if (style === "number") return `${i + 1}. ${s}`;
      if (style === "dash") return `- ${s}`;
      return `• ${s}`;
    })
    .join("\n");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TextToBulletPointsClient() {
  const [text, setText] = useState<string>("");
  const [style, setStyle] = useState<BulletStyle>("bullet");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const convert = (): void => {
    setOutput(convertToBullets(text, style));
    setCopied(false);
  };

  const reset = (): void => {
    setText("");
    setOutput("");
    setCopied(false);
  };

  const copyOutput = (): void => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bulletCount = output ? output.split("\n").filter(Boolean).length : 0;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full mb-4 shadow-lg">
              <List className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Text to Bullet Points
            </h2>
            <p className="text-gray-500">
              Convert any paragraph into clean bullet point lists instantly
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
                placeholder="Paste a paragraph, article, or notes here..."
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>
                  {text.trim().split(/\s+/).filter(Boolean).length} words
                </span>
                <span>{text.length} characters</span>
              </div>
            </div>

            {/* Options */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <List className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-700">Bullet Style</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { key: "bullet", label: "• Bullet" },
                    { key: "dash", label: "– Dash" },
                    { key: "number", label: "1. Number" },
                  ] as { key: BulletStyle; label: string }[]
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setStyle(key)}
                    className={`py-2 rounded-lg font-semibold text-sm transition-colors border ${
                      style === key
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={convert}
                disabled={!text.trim()}
                className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors"
              >
                Convert to Bullet Points
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
            {output && (
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Bullet Points
                    </h3>
                    <p className="text-sm text-gray-600">
                      {bulletCount} points
                    </p>
                  </div>
                  <button
                    onClick={copyOutput}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-sans bg-white rounded-lg p-4 border border-gray-200">
                  {output}
                </pre>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Each sentence becomes its own bullet point — punctuation is used
                as the split point
              </li>
              <li>
                Numbered lists work well for step-by-step instructions or ranked
                items
              </li>
              <li>
                Paste text with line breaks and the converter will split on
                those too
              </li>
              <li>
                Copy the result and paste directly into Notion, Google Docs, or
                any editor
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
