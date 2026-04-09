"use client";
import React, { useState } from "react";
import { Zap, Copy, Check, RotateCcw } from "lucide-react";

type Style = "fun" | "professional" | "bold" | "inspirational" | "minimal";

const TEMPLATES: Record<Style, (brand: string, keyword: string) => string[]> = {
  fun: (b, k) => [
    `${b} — where ${k} gets exciting`,
    `Making ${k} awesome since day one — ${b}`,
    `${b}: seriously good ${k}`,
    `Life's too short for bad ${k} — choose ${b}`,
    `${b}: the ${k} you didn't know you needed`,
    `Go ahead, ${k}. ${b} has you covered.`,
  ],
  professional: (b, k) => [
    `${b} — redefining ${k} for today's world`,
    `Trusted ${k} solutions from ${b}`,
    `${b}: precision, performance, ${k}`,
    `The benchmark for excellence in ${k} — ${b}`,
    `${b}: delivering ${k} with integrity`,
    `Your partner in ${k} — ${b}`,
  ],
  bold: (b, k) => [
    `${b} doesn't just do ${k}. We own it.`,
    `No compromise. No excuses. ${b}.`,
    `${k}? ${b} does it better.`,
    `Others promise ${k}. ${b} delivers.`,
    `Born to lead in ${k} — ${b}`,
    `${b}: where ${k} meets obsession.`,
  ],
  inspirational: (b, k) => [
    `Dare to achieve more with ${b}`,
    `${b}: empowering ${k} one step at a time`,
    `Your ${k} journey starts with ${b}`,
    `Because great ${k} changes everything — ${b}`,
    `${b}: unlocking potential in every ${k}`,
    `Chase your ${k} dreams with ${b}`,
  ],
  minimal: (b, k) => [
    `${b}. Simply ${k}.`,
    `${k}, perfected. ${b}.`,
    `${b}: ${k} made simple`,
    `Less noise. More ${k}. ${b}.`,
    `${b} — pure ${k}`,
    `Just ${k}. Just ${b}.`,
  ],
};

const STYLE_META: Record<
  Style,
  { label: string; emoji: string; desc: string; color: string }
> = {
  fun: {
    label: "Fun & Playful",
    emoji: "🎉",
    desc: "Lighthearted, approachable",
    color: "border-yellow-300 bg-yellow-50 text-yellow-800",
  },
  professional: {
    label: "Professional",
    emoji: "💼",
    desc: "Trusted, authoritative",
    color: "border-blue-300 bg-blue-50 text-blue-800",
  },
  bold: {
    label: "Bold & Direct",
    emoji: "⚡",
    desc: "Confident, challenger brand",
    color: "border-red-300 bg-red-50 text-red-800",
  },
  inspirational: {
    label: "Inspirational",
    emoji: "🌟",
    desc: "Motivational, purpose-driven",
    color: "border-purple-300 bg-purple-50 text-purple-800",
  },
  minimal: {
    label: "Minimal & Clean",
    emoji: "✦",
    desc: "Simple, premium aesthetic",
    color: "border-gray-300 bg-gray-50 text-gray-700",
  },
};

export default function SloganGeneratorClient() {
  const [brand, setBrand] = useState("");
  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState<Style>("bold");
  const [copied, setCopied] = useState<string | null>(null);

  const results =
    brand.trim() && keyword.trim()
      ? TEMPLATES[style](brand.trim(), keyword.trim())
      : [];

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Slogan Generator
            </h2>
            <p className="text-gray-500">
              Generate memorable brand slogans and taglines in seconds
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand or product name
                </label>
                <input
                  value={brand}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBrand(e.target.value)
                  }
                  placeholder="e.g. NovaBrew, SwiftDesk, Lumina"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Core product, service, or value
                </label>
                <input
                  value={keyword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setKeyword(e.target.value)
                  }
                  placeholder="e.g. coffee, productivity, security"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tone & style
                </label>
                <div className="space-y-2">
                  {(
                    Object.entries(STYLE_META) as [
                      Style,
                      (typeof STYLE_META)[Style],
                    ][]
                  ).map(([s, { label, emoji, desc, color }]) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 flex items-center gap-3 transition-all ${style === s ? "bg-rose-600 text-white border-rose-600 shadow-md" : `bg-white border-gray-200 hover:border-rose-200`}`}
                    >
                      <span
                        className={`text-base px-2 py-0.5 rounded-lg border text-sm ${style === s ? "bg-rose-500 border-rose-400 text-white" : color}`}
                      >
                        {emoji}
                      </span>
                      <div>
                        <p className="font-semibold text-sm">{label}</p>
                        <p
                          className={`text-xs ${style === s ? "text-rose-200" : "text-gray-400"}`}
                        >
                          {desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {results.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Generated slogans
                  </p>
                  {results.map((line, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl px-5 py-4 flex items-start justify-between gap-3 border ${i === 0 ? "bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200" : "bg-gray-50 border-gray-100"}`}
                    >
                      <div className="flex gap-3 items-center">
                        <span
                          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"}`}
                        >
                          {i + 1}
                        </span>
                        <p className="text-gray-800 text-sm font-medium italic leading-relaxed">
                          &ldquo;{line}&rdquo;
                        </p>
                      </div>
                      <button
                        onClick={() => copy(line)}
                        className="shrink-0 text-gray-300 hover:text-rose-600 transition-colors"
                      >
                        {copied === line ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                  <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 text-sm text-amber-800 mt-2">
                    <strong>Tip:</strong> Great slogans are short (3–8 words),
                    easy to say aloud, and reflect your brand's tone. Combine
                    elements from multiple results to find your perfect tagline.
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200">
                  <div className="text-center text-rose-400">
                    <Zap className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium">
                      Enter brand name and keyword to generate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setBrand("");
              setKeyword("");
              setStyle("bold");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 Slogan writing tips:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Aim for 3–8 words — shorter slogans are more memorable and
                versatile
              </li>
              <li>
                Say it aloud — it should sound natural and be easy to repeat
              </li>
              <li>Avoid jargon — use language your customers actually use</li>
              <li>
                Test multiple styles — bold works for challenger brands; minimal
                suits premium brands
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
