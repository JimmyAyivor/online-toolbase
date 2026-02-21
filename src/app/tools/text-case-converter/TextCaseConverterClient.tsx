"use client";
import React, { useState } from "react";
import { Type, Copy, Check, Download, Trash2, ArrowRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CaseType {
  id: string;
  name: string;
  description: string;
  example: string;
  convert: (s: string) => string;
}

interface StatItem {
  label: string;
  value: number;
  color: string;
  bg: string;
}

interface UseCaseItem {
  dotColor: string;
  label: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MINOR_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "for",
  "nor",
  "on",
  "at",
  "to",
  "from",
  "by",
  "in",
  "of",
]);

const CASE_TYPES: CaseType[] = [
  {
    id: "sentence",
    name: "Sentence case",
    description: "First letter capitalized",
    example: "This is sentence case",
    convert: (s) =>
      s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
  },
  {
    id: "lower",
    name: "lower case",
    description: "All letters lowercase",
    example: "this is lower case",
    convert: (s) => s.toLowerCase(),
  },
  {
    id: "upper",
    name: "UPPER CASE",
    description: "All letters uppercase",
    example: "THIS IS UPPER CASE",
    convert: (s) => s.toUpperCase(),
  },
  {
    id: "capitalized",
    name: "Capitalized Case",
    description: "First letter of each word capitalized",
    example: "This Is Capitalized Case",
    convert: (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  {
    id: "alternating",
    name: "aLtErNaTiNg cAsE",
    description: "Alternating between lower and upper",
    example: "tHiS iS aLtErNaTiNg CaSe",
    convert: (s) =>
      s
        .split("")
        .map((ch, i) => (i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
        .join(""),
  },
  {
    id: "title",
    name: "Title Case",
    description: "Major words capitalized",
    example: "This Is Title Case",
    convert: (s) =>
      s
        .toLowerCase()
        .split(" ")
        .map((word, i) =>
          i === 0 || !MINOR_WORDS.has(word)
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word,
        )
        .join(" "),
  },
  {
    id: "inverse",
    name: "iNVERSE cASE",
    description: "Uppercase becomes lowercase and vice versa",
    example: "tHIS iS iNVERSE cASE",
    convert: (s) =>
      s
        .split("")
        .map((ch) =>
          ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase(),
        )
        .join(""),
  },
  {
    id: "camel",
    name: "camelCase",
    description: "First word lowercase, rest capitalized",
    example: "thisIsCamelCase",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
        .replace(/^[A-Z]/, (chr) => chr.toLowerCase()),
  },
  {
    id: "pascal",
    name: "PascalCase",
    description: "All words capitalized, no spaces",
    example: "ThisIsPascalCase",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
        .replace(/^[a-z]/, (chr) => chr.toUpperCase()),
  },
  {
    id: "snake",
    name: "snake_case",
    description: "Words separated by underscores",
    example: "this_is_snake_case",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, ""),
  },
  {
    id: "kebab",
    name: "kebab-case",
    description: "Words separated by hyphens",
    example: "this-is-kebab-case",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
  },
  {
    id: "dot",
    name: "dot.case",
    description: "Words separated by dots",
    example: "this.is.dot.case",
    convert: (s) =>
      s
        .toLowerCase()
        .replace(/\s+/g, ".")
        .replace(/[^a-z0-9.]/g, ""),
  },
];

const USE_CASES: UseCaseItem[] = [
  {
    dotColor: "bg-purple-600",
    label: "Programming",
    desc: "Convert variable names to camelCase, snake_case, or PascalCase",
  },
  {
    dotColor: "bg-pink-600",
    label: "Writing",
    desc: "Fix text formatting for titles, headlines, or sentences",
  },
  {
    dotColor: "bg-blue-600",
    label: "URLs",
    desc: "Convert text to kebab-case for SEO-friendly URLs",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeStats(text: string): StatItem[] {
  return [
    {
      label: "Characters",
      value: text.length,
      color: "text-purple-600",
      bg: "from-purple-50 to-pink-50",
    },
    {
      label: "Words",
      value: text.trim() ? text.trim().split(/\s+/).length : 0,
      color: "text-blue-600",
      bg: "from-blue-50 to-cyan-50",
    },
    {
      label: "Lines",
      value: text.split("\n").length,
      color: "text-green-600",
      bg: "from-green-50 to-emerald-50",
    },
  ];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TextCaseConverterClient() {
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState<string>("");

  const handleConvert = (converter: (s: string) => string): void => {
    if (text) setText(converter(text));
  };

  const handleCopy = (convertedText: string, id: string): void => {
    navigator.clipboard.writeText(convertedText);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleDownload = (): void => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = computeStats(text);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg'>
            <Type className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Text Case Converter
          </h2>
          <p className='text-gray-600'>
            Transform your text into any case style instantly
          </p>
        </div>

        {/* Top row */}
        <div className='grid lg:grid-cols-3 gap-6 mb-6'>
          {/* Textarea + stats */}
          <div className='lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 md:p-8'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-bold text-gray-900'>Input Text</h3>
              <div className='flex gap-2'>
                <button
                  onClick={handleDownload}
                  disabled={!text}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    text
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Download className='w-4 h-4' />
                  Download
                </button>
                <button
                  onClick={() => {
                    setText("");
                    setCopied("");
                  }}
                  disabled={!text}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    text
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Trash2 className='w-4 h-4' />
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setText(e.target.value)
              }
              placeholder='Type or paste your text here...'
              className='w-full h-64 px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none transition-colors text-base leading-relaxed'
            />

            <div className='grid grid-cols-3 gap-4 mt-4'>
              {stats.map(({ label, value, color, bg }) => (
                <div
                  key={label}
                  className={`bg-gradient-to-br ${bg} rounded-xl p-4 text-center`}
                >
                  <div className={`text-2xl font-bold ${color}`}>{value}</div>
                  <div className='text-sm text-gray-600'>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
            <h3 className='font-bold text-gray-900 mb-4'>Quick Actions</h3>
            <div className='space-y-3'>
              {CASE_TYPES.slice(0, 6).map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => handleConvert(ct.convert)}
                  disabled={!text}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    text
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-2 border-purple-200 hover:border-purple-300"
                      : "bg-gray-100 border-2 border-gray-200 cursor-not-allowed"
                  }`}
                >
                  <div className='font-semibold text-gray-900'>{ct.name}</div>
                  <div className='text-xs text-gray-600 mt-1'>
                    {ct.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* All conversions */}
        <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
          <h3 className='font-bold text-gray-900 mb-6'>
            All Conversion Options
          </h3>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {CASE_TYPES.map((ct) => {
              const converted = text ? ct.convert(text) : ct.example;
              const isCopied = copied === ct.id;

              return (
                <div
                  key={ct.id}
                  className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow'
                >
                  <div className='flex justify-between items-start mb-3'>
                    <div>
                      <h4 className='font-bold text-gray-900'>{ct.name}</h4>
                      <p className='text-xs text-gray-600 mt-1'>
                        {ct.description}
                      </p>
                    </div>
                    {text && (
                      <button
                        onClick={() => handleCopy(converted, ct.id)}
                        aria-label={`Copy ${ct.name}`}
                        className='p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors'
                      >
                        {isCopied ? (
                          <Check className='w-4 h-4 text-green-600' />
                        ) : (
                          <Copy className='w-4 h-4 text-purple-600' />
                        )}
                      </button>
                    )}
                  </div>

                  <div className='bg-white rounded-lg p-3 border-2 border-gray-200 min-h-[60px] flex items-center'>
                    <p className='text-sm text-gray-700 break-words line-clamp-2'>
                      {converted}
                    </p>
                  </div>

                  {text && (
                    <button
                      onClick={() => handleConvert(ct.convert)}
                      className='mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all'
                    >
                      Convert
                      <ArrowRight className='w-4 h-4' />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Use cases */}
        <div className='mt-6 bg-white rounded-xl shadow-md p-6'>
          <h3 className='font-bold text-gray-900 mb-4'>💡 Common Use Cases</h3>
          <div className='grid md:grid-cols-3 gap-4 text-sm text-gray-700'>
            {USE_CASES.map(({ dotColor, label, desc }) => (
              <div key={label} className='flex items-start gap-3'>
                <div
                  className={`w-2 h-2 ${dotColor} rounded-full mt-2 flex-shrink-0`}
                />
                <div>
                  <strong className='text-gray-900'>{label}:</strong> {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
