"use client";
import React, { useState, useMemo } from "react";
import { Clock, BookOpen, Copy, CheckCircle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ReadingLevel {
  label: string;
  color: string;
}

interface ReadingTimes {
  slow: number;
  average: number;
  fast: number;
  speed: number;
}

interface TextAnalysis {
  wordCount: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  totalMinutes: number;
  readingTimes: ReadingTimes;
  avgWordsPerSentence: string;
  imageTimeMinutes: number;
}

interface SpeedRow {
  wpm: number;
  label: string;
  color: string;
  key: keyof ReadingTimes;
}

interface StatRow {
  label: string;
  value: string | number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const READING_LEVELS: Record<string, number> = {
  slow: 150,
  average: 200,
  fast: 250,
  speed: 350,
};

const SPEED_ROWS: SpeedRow[] = [
  { wpm: 150, label: "Slow (150 wpm)", color: "text-blue-600", key: "slow" },
  {
    wpm: 200,
    label: "Average (200 wpm)",
    color: "text-green-600",
    key: "average",
  },
  { wpm: 250, label: "Fast (250 wpm)", color: "text-orange-600", key: "fast" },
  { wpm: 350, label: "Speed (350 wpm)", color: "text-red-600", key: "speed" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);
  const s = Math.round((minutes % 1) * 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  return `${s}s`;
}

function getReadingLevel(wpm: number): ReadingLevel {
  if (wpm <= 175) return { label: "Slow Reader", color: "text-blue-600" };
  if (wpm <= 225) return { label: "Average Reader", color: "text-green-600" };
  if (wpm <= 300) return { label: "Fast Reader", color: "text-orange-600" };
  return { label: "Speed Reader", color: "text-red-600" };
}

function analyzeText(
  text: string,
  wpm: number,
  includeImages: boolean,
  imageCount: number,
): TextAnalysis | null {
  if (!text.trim()) return null;

  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = words.length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
  const paragraphs = text
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0).length;

  const baseMinutes = wordCount / wpm;
  const imageTimeMinutes = includeImages ? (imageCount * 12) / 60 : 0;
  const totalMinutes = baseMinutes + imageTimeMinutes;

  const readingTimes: ReadingTimes = {
    slow: wordCount / READING_LEVELS.slow!,
    average: wordCount / READING_LEVELS.average!,
    fast: wordCount / READING_LEVELS.fast!,
    speed: wordCount / READING_LEVELS.speed!,
  };

  const avgWordsPerSentence =
    sentences > 0 ? (wordCount / sentences).toFixed(1) : "0";

  return {
    wordCount,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    totalMinutes,
    readingTimes,
    avgWordsPerSentence,
    imageTimeMinutes,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReadingTimeEstimatorClient() {
  const [text, setText] = useState<string>("");
  const [wpm, setWpm] = useState<number>(200);
  const [includeImages, setIncludeImages] = useState<boolean>(true);
  const [imageCount, setImageCount] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const analysis = useMemo(
    () => analyzeText(text, wpm, includeImages, imageCount),
    [text, wpm, includeImages, imageCount],
  );

  const copyReadingTime = (): void => {
    if (!analysis) return;
    navigator.clipboard.writeText(formatTime(analysis.totalMinutes));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const level = getReadingLevel(wpm);
  const wordCount = text.trim()
    ? text.trim().split(/\s+/).filter(Boolean).length
    : 0;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Reading Time Estimator
            </h2>
            <p className="text-gray-500">
              Calculate how long it takes to read an article or document
            </p>
          </div>

          <div className="space-y-6">
            {/* Text input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Text or Article
              </label>
              <textarea
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                placeholder="Paste your article, blog post, or any text here..."
                className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{wordCount} words</span>
                <span>{text.length} characters</span>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">
                Reading Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Reading Speed: {wpm} words/min
                    </label>
                    <span className={`text-sm font-semibold ${level.color}`}>
                      {level.label}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={400}
                    step={10}
                    value={wpm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWpm(Number(e.target.value))
                    }
                    className="w-full"
                    aria-label="Reading speed"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Slow (150)</span>
                    <span>Average (200)</span>
                    <span>Fast (250)</span>
                    <span>Speed (350+)</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="includeImages"
                      checked={includeImages}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setIncludeImages(e.target.checked)
                      }
                      className="w-4 h-4 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
                    />
                    <label
                      htmlFor="includeImages"
                      className="text-sm text-gray-700"
                    >
                      Include time for images
                    </label>
                  </div>

                  {includeImages && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Number of images: {imageCount}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={imageCount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setImageCount(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results */}
            {analysis && (
              <div className="space-y-6">
                {/* Primary result */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Estimated Reading Time
                    </h3>
                    <button
                      onClick={copyReadingTime}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy Time
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <Clock className="w-12 h-12 text-amber-600" />
                    <div>
                      <div className="text-4xl font-bold text-gray-800">
                        {formatTime(analysis.totalMinutes)}
                      </div>
                      <div className="text-sm text-gray-600">
                        at {wpm} words per minute
                      </div>
                    </div>
                  </div>

                  {analysis.imageTimeMinutes > 0 && (
                    <div className="text-sm text-gray-600 bg-white rounded-lg p-3">
                      Includes ~{formatTime(analysis.imageTimeMinutes)} for{" "}
                      {imageCount} image{imageCount !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                {/* Stats grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Text statistics */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Text Statistics
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {(
                        [
                          { label: "Words", value: analysis.wordCount },
                          { label: "Characters", value: analysis.characters },
                          {
                            label: "Characters (no spaces)",
                            value: analysis.charactersNoSpaces,
                          },
                          { label: "Sentences", value: analysis.sentences },
                          { label: "Paragraphs", value: analysis.paragraphs },
                          {
                            label: "Avg. words/sentence",
                            value: analysis.avgWordsPerSentence,
                          },
                        ] as StatRow[]
                      ).map(({ label, value }) => (
                        <div key={label} className="flex justify-between p-3">
                          <span className="text-gray-600">{label}</span>
                          <span className="font-semibold text-gray-800">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Speed comparison */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Reading Time by Speed
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {SPEED_ROWS.map(({ label, color, key }) => (
                        <div key={key} className="flex justify-between p-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className={`w-4 h-4 ${color}`} />
                            <span className="text-gray-600">{label}</span>
                          </div>
                          <span className="font-semibold text-gray-800">
                            {formatTime(analysis.readingTimes[key])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 Reading Speed Guide:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Slow (100–175 wpm):</strong> Careful reading with high
                comprehension
              </li>
              <li>
                <strong>Average (175–225 wpm):</strong> Normal reading pace for
                most adults
              </li>
              <li>
                <strong>Fast (225–300 wpm):</strong> Experienced readers and
                speed readers
              </li>
              <li>
                <strong>Speed (300+ wpm):</strong> Advanced speed reading with
                practice
              </li>
              <li>
                Images add approximately 12 seconds each to account for viewing
                time
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
