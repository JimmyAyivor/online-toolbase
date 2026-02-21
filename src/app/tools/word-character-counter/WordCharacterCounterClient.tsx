"use client";
import React, { useState, useMemo } from "react";
import {
  FileText,
  Hash,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Copy,
  Trash2,
  Download,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
}

interface StatCard {
  icon: React.ElementType;
  label: string;
  value: string;
  gradient: string;
}

interface Feature {
  color: string;
  text: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  { color: "bg-indigo-600", text: "Real-time word and character counting" },
  { color: "bg-blue-600", text: "Reading and speaking time estimates" },
  { color: "bg-teal-600", text: "Sentence and paragraph analysis" },
  { color: "bg-green-600", text: "Copy and download functionality" },
  { color: "bg-orange-600", text: "Average metrics calculation" },
  { color: "bg-pink-600", text: "Clean, distraction-free interface" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeStats(content: string): TextStats {
  const characters = content.length;
  const charactersNoSpaces = content.replace(/\s/g, "").length;
  const trimmed = content.trim();
  const words =
    trimmed === ""
      ? 0
      : trimmed.split(/\s+/).filter((w) => w.length > 0).length;
  const sentences =
    trimmed === ""
      ? 0
      : content.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs =
    trimmed === ""
      ? 0
      : content.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 150);
  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTime,
    speakingTime,
  };
}

function buildStatCards(s: TextStats): StatCard[] {
  return [
    {
      icon: Hash,
      label: "Words",
      value: s.words.toLocaleString(),
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: FileText,
      label: "Characters",
      value: s.characters.toLocaleString(),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      label: "Characters (no spaces)",
      value: s.charactersNoSpaces.toLocaleString(),
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: BookOpen,
      label: "Sentences",
      value: s.sentences.toLocaleString(),
      gradient: "from-green-500 to-lime-500",
    },
    {
      icon: TrendingUp,
      label: "Paragraphs",
      value: s.paragraphs.toLocaleString(),
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: Clock,
      label: "Reading Time",
      value: `${s.readingTime} min`,
      gradient: "from-pink-500 to-rose-500",
    },
  ];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function WordCharacterCounterClient() {
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => computeStats(text), [text]);
  const statCards = useMemo(() => buildStatCards(stats), [stats]);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (): void => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text-document.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const wordsPerSentence =
    stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : "0";
  const charsPerWord =
    stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : "0";

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg'>
            <FileText className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Word &amp; Character Counter
          </h2>
          <p className='text-gray-600'>
            Instantly count words, characters, sentences and more
          </p>
        </div>

        {/* Stat cards */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6'>
          {statCards.map(({ icon: Icon, label, value, gradient }) => (
            <div
              key={label}
              className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 hover:scale-105'
            >
              <div
                className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${gradient} mb-3`}
              >
                <Icon className='w-5 h-5 text-white' />
              </div>
              <div className='text-2xl font-bold text-gray-900 mb-1'>
                {value}
              </div>
              <div className='text-xs text-gray-600 font-medium'>{label}</div>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6'>
          <div className='flex flex-wrap gap-3 mb-4'>
            {[
              {
                label: copied ? "Copied!" : "Copy Text",
                icon: Copy,
                disabled: !text,
                onClick: handleCopy,
                bg: "bg-indigo-600 hover:bg-indigo-700",
              },
              {
                label: "Download",
                icon: Download,
                disabled: !text,
                onClick: handleDownload,
                bg: "bg-blue-600 hover:bg-blue-700",
              },
              {
                label: "Clear",
                icon: Trash2,
                disabled: !text,
                onClick: () => setText(""),
                bg: "bg-red-600 hover:bg-red-700",
              },
            ].map(({ label, icon: Icon, disabled, onClick, bg }) => (
              <button
                key={label}
                onClick={onClick}
                disabled={disabled}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  disabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : `${bg} text-white shadow-md hover:shadow-lg`
                }`}
              >
                <Icon className='w-4 h-4' />
                {label}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            placeholder='Start typing or paste your text here...'
            className='w-full h-96 px-6 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none text-gray-800 leading-relaxed transition-colors text-base'
          />
        </div>

        {/* Metrics */}
        <div className='grid md:grid-cols-2 gap-6 mb-6'>
          <div className='bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-6'>
            <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
              <Clock className='w-5 h-5 text-indigo-600' />
              Time Estimates
            </h3>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-700'>Reading Time:</span>
                <span className='font-bold text-indigo-600'>
                  {stats.readingTime} minute{stats.readingTime !== 1 ? "s" : ""}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-700'>Speaking Time:</span>
                <span className='font-bold text-purple-600'>
                  {stats.speakingTime} minute
                  {stats.speakingTime !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-md p-6'>
            <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
              <Target className='w-5 h-5 text-blue-600' />
              Average Metrics
            </h3>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-700'>Words per Sentence:</span>
                <span className='font-bold text-blue-600'>
                  {wordsPerSentence}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-700'>Characters per Word:</span>
                <span className='font-bold text-cyan-600'>{charsPerWord}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className='bg-white rounded-xl shadow-md p-6'>
          <h3 className='font-bold text-gray-900 mb-3'>✨ Features</h3>
          <div className='grid md:grid-cols-3 gap-4 text-sm text-gray-700'>
            {FEATURES.map(({ color, text: feat }) => (
              <div key={feat} className='flex items-start gap-2'>
                <div
                  className={`w-2 h-2 ${color} rounded-full mt-2 flex-shrink-0`}
                />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
