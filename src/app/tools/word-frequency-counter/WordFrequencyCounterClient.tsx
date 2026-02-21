"use client";
import React, { useState, useMemo } from "react";
import { BarChart3, Filter, Download, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortBy = "frequency" | "alphabetical";

interface WordEntry {
  word: string;
  count: number;
  percentage: string;
}

interface TextStats {
  totalWords: number;
  uniqueWords: number;
  totalCharacters: number;
  averageWordLength: string;
  longestWord: string;
  shortestWord: string;
}

interface AnalysisResult {
  topWords: WordEntry[];
  allWords: WordEntry[];
  stats: TextStats;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const COMMON_WORDS = new Set([
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
  "is",
  "was",
  "are",
  "been",
  "has",
  "had",
  "were",
  "am",
]);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function analyze(
  text: string,
  minLength: number,
  caseSensitive: boolean,
  ignoreCommon: boolean,
  sortBy: SortBy,
  limit: number,
): AnalysisResult | null {
  if (!text.trim()) return null;

  const rawWords = text
    .toLowerCase()
    .replace(/[^\w\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= minLength);

  const freqMap: Record<string, number> = {};
  for (const word of rawWords) {
    const key = caseSensitive ? word : word.toLowerCase();
    if (ignoreCommon && COMMON_WORDS.has(key.toLowerCase())) continue;
    freqMap[key] = (freqMap[key] ?? 0) + 1;
  }

  const total = Object.values(freqMap).reduce((s, c) => s + c, 0);

  let allWords: WordEntry[] = Object.entries(freqMap).map(([word, count]) => ({
    word,
    count,
    percentage: ((count / total) * 100).toFixed(2),
  }));

  if (sortBy === "frequency") {
    allWords.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
  } else {
    allWords.sort((a, b) => a.word.localeCompare(b.word));
  }

  const topWords = allWords.slice(0, limit);

  const totalWords = rawWords.length;
  const longestWord = rawWords.reduce(
    (a, b) => (a.length > b.length ? a : b),
    "",
  );
  const shortestWord = rawWords.reduce(
    (a, b) => (a.length < b.length ? a : b),
    rawWords[0] ?? "",
  );
  const avgLen =
    totalWords > 0
      ? (rawWords.reduce((s, w) => s + w.length, 0) / totalWords).toFixed(2)
      : "0";

  return {
    topWords,
    allWords,
    stats: {
      totalWords,
      uniqueWords: allWords.length,
      totalCharacters: text.length,
      averageWordLength: avgLen,
      longestWord,
      shortestWord,
    },
  };
}

function getBarWidth(count: number, maxCount: number): number {
  return maxCount > 0 ? (count / maxCount) * 100 : 0;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function WordFrequencyCounterClient() {
  const [text, setText] = useState<string>("");
  const [minLength, setMinLength] = useState<number>(1);
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [ignoreCommon, setIgnoreCommon] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortBy>("frequency");
  const [limit, setLimit] = useState<number>(50);

  const analysis = useMemo(
    () => analyze(text, minLength, caseSensitive, ignoreCommon, sortBy, limit),
    [text, minLength, caseSensitive, ignoreCommon, sortBy, limit],
  );

  const reset = (): void => {
    setText("");
    setMinLength(1);
    setCaseSensitive(false);
    setIgnoreCommon(false);
    setSortBy("frequency");
    setLimit(50);
  };

  const downloadCSV = (): void => {
    if (!analysis) return;
    const rows = [
      ["Word", "Count", "Percentage"],
      ...analysis.allWords.map(({ word, count, percentage }) => [
        word,
        count,
        `${percentage}%`,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-frequency.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const maxCount = analysis?.topWords[0]?.count ?? 1;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <BarChart3 className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Word Frequency Counter
            </h2>
            <p className='text-gray-600'>
              Analyze text to show most common words and phrases
            </p>
          </div>

          <div className='space-y-6'>
            {/* Text input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Enter Your Text
              </label>
              <textarea
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                placeholder='Paste your text here to analyze word frequency...'
                className='w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none'
              />
              <div className='flex justify-between mt-2 text-sm text-gray-500'>
                <span>{wordCount} words</span>
                <span>{text.length} characters</span>
              </div>
            </div>

            {/* Filters */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <div className='flex items-center gap-2 mb-3'>
                <Filter className='w-5 h-5 text-gray-600' />
                <h3 className='font-semibold text-gray-700'>
                  Filters &amp; Options
                </h3>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Minimum Word Length: {minLength}
                  </label>
                  <input
                    type='range'
                    min={1}
                    max={10}
                    value={minLength}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMinLength(Number(e.target.value))
                    }
                    aria-label='Minimum word length'
                    className='w-full'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Show Top: {limit}
                  </label>
                  <input
                    type='range'
                    min={10}
                    max={100}
                    step={10}
                    value={limit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLimit(Number(e.target.value))
                    }
                    aria-label='Top N words'
                    className='w-full'
                  />
                </div>

                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='caseSensitive'
                    checked={caseSensitive}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCaseSensitive(e.target.checked)
                    }
                    className='w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500'
                  />
                  <label
                    htmlFor='caseSensitive'
                    className='text-sm text-gray-700'
                  >
                    Case sensitive
                  </label>
                </div>

                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='ignoreCommon'
                    checked={ignoreCommon}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setIgnoreCommon(e.target.checked)
                    }
                    className='w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500'
                  />
                  <label
                    htmlFor='ignoreCommon'
                    className='text-sm text-gray-700'
                  >
                    Ignore common words
                  </label>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSortBy(e.target.value as SortBy)
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  >
                    <option value='frequency'>Frequency (High to Low)</option>
                    <option value='alphabetical'>Alphabetical (A to Z)</option>
                  </select>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={reset}
                    className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
                  >
                    <RotateCcw className='w-4 h-4' />
                    Reset All
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {analysis && (
              <div className='space-y-6'>
                {/* Stats */}
                <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
                  <h2 className='text-xl font-bold text-gray-800 mb-4'>
                    Statistics
                  </h2>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {[
                      {
                        label: "Total Words",
                        value: analysis.stats.totalWords,
                        bold: true,
                      },
                      {
                        label: "Unique Words",
                        value: analysis.stats.uniqueWords,
                        bold: true,
                      },
                      {
                        label: "Avg. Word Length",
                        value: analysis.stats.averageWordLength,
                        bold: true,
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className='bg-white rounded-lg p-4'>
                        <div className='text-2xl font-bold text-indigo-600'>
                          {value}
                        </div>
                        <div className='text-sm text-gray-600'>{label}</div>
                      </div>
                    ))}
                    {[
                      {
                        label: "Longest Word",
                        value: analysis.stats.longestWord,
                      },
                      {
                        label: "Shortest Word",
                        value: analysis.stats.shortestWord,
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className='bg-white rounded-lg p-4'>
                        <div className='text-sm text-gray-600 mb-1'>
                          {label}
                        </div>
                        <div className='font-semibold text-gray-800 truncate'>
                          {value}
                        </div>
                      </div>
                    ))}
                    <div className='bg-white rounded-lg p-4 flex items-center justify-center'>
                      <button
                        onClick={downloadCSV}
                        className='flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors'
                      >
                        <Download className='w-4 h-4' />
                        Export CSV
                      </button>
                    </div>
                  </div>
                </div>

                {/* Frequency table */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                    Word Frequency (Top {analysis.topWords.length})
                  </h3>
                  <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                    <div className='max-h-96 overflow-y-auto'>
                      <table className='w-full'>
                        <thead className='bg-gray-100 sticky top-0'>
                          <tr>
                            {["#", "Word", "Count", "Frequency", "Visual"].map(
                              (h) => (
                                <th
                                  key={h}
                                  className='px-4 py-3 text-left text-sm font-semibold text-gray-700'
                                >
                                  {h}
                                </th>
                              ),
                            )}
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                          {analysis.topWords.map((item, idx) => (
                            <tr key={item.word} className='hover:bg-gray-50'>
                              <td className='px-4 py-3 text-sm text-gray-500'>
                                {idx + 1}
                              </td>
                              <td className='px-4 py-3 text-sm font-medium text-gray-800'>
                                {item.word}
                              </td>
                              <td className='px-4 py-3 text-sm text-gray-600'>
                                {item.count}
                              </td>
                              <td className='px-4 py-3 text-sm text-gray-600'>
                                {item.percentage}%
                              </td>
                              <td className='px-4 py-3'>
                                <div className='w-full bg-gray-200 rounded-full h-2'>
                                  <div
                                    className='bg-indigo-600 h-2 rounded-full transition-all'
                                    style={{
                                      width: `${getBarWidth(item.count, maxCount)}%`,
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Enable &ldquo;Ignore common words&rdquo; to filter out articles,
                prepositions, and other frequent words
              </li>
              <li>
                Adjust minimum word length to focus on longer, more meaningful
                words
              </li>
              <li>
                Use case sensitive mode to distinguish between capitalized and
                lowercase versions
              </li>
              <li>
                Export results to CSV for further analysis in spreadsheet
                software
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
