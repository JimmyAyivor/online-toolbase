"use client";
import React, { useState, useMemo } from "react";
import { FileText, ArrowLeftRight, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewMode = "sideBySide" | "unified";
type DiffType = "unchanged" | "modified" | "added" | "removed";

interface DiffLine {
  type: DiffType;
  line1: string;
  line2: string;
  lineNum: number;
}

interface DiffStats {
  total: number;
  unchanged: number;
  modified: number;
  added: number;
  removed: number;
  similarity: number;
}

interface DiffResult {
  diff: DiffLine[];
  stats: DiffStats;
}

interface StatCard {
  label: string;
  value: number | string;
  color: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeDiff(text1: string, text2: string): DiffResult | null {
  if (!text1 && !text2) return null;

  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  const max = Math.max(lines1.length, lines2.length);
  const diff: DiffLine[] = [];

  for (let i = 0; i < max; i++) {
    const line1 = lines1[i] ?? "";
    const line2 = lines2[i] ?? "";
    let type: DiffType;

    if (line1 === line2) type = "unchanged";
    else if (!line1) type = "added";
    else if (!line2) type = "removed";
    else type = "modified";

    diff.push({ type, line1, line2, lineNum: i + 1 });
  }

  const unchanged = diff.filter((d) => d.type === "unchanged").length;
  const total = diff.length;
  const similarity = total > 0 ? Math.round((unchanged / total) * 100) : 100;

  return {
    diff,
    stats: {
      total,
      unchanged,
      modified: diff.filter((d) => d.type === "modified").length,
      added: diff.filter((d) => d.type === "added").length,
      removed: diff.filter((d) => d.type === "removed").length,
      similarity,
    },
  };
}

function lineClass(type: DiffType, side: "original" | "modified"): string {
  if (type === "unchanged") return "bg-white";
  if (type === "modified") return "bg-yellow-100";
  if (type === "removed")
    return side === "original" ? "bg-red-100" : "bg-gray-100";
  /* added */ return side === "original" ? "bg-gray-100" : "bg-green-100";
}

function lineTextClass(type: DiffType, side: "original" | "modified"): string {
  if (type === "modified")
    return side === "original" ? "text-red-700" : "text-green-700";
  if (type === "removed") return side === "original" ? "text-red-700" : "";
  if (type === "added") return side === "modified" ? "text-green-700" : "";
  return "";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TextDiffCheckerClient() {
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("sideBySide");

  const result = useMemo(() => computeDiff(text1, text2), [text1, text2]);

  const swap = (): void => {
    setText1(text2);
    setText2(text1);
  };
  const reset = (): void => {
    setText1("");
    setText2("");
  };

  const statCards: StatCard[] = result
    ? [
        {
          label: "Similarity",
          value: `${result.stats.similarity}%`,
          color: "text-purple-600",
        },
        {
          label: "Unchanged",
          value: result.stats.unchanged,
          color: "text-gray-600",
        },
        {
          label: "Modified",
          value: result.stats.modified,
          color: "text-blue-600",
        },
        { label: "Added", value: result.stats.added, color: "text-green-600" },
        {
          label: "Removed",
          value: result.stats.removed,
          color: "text-red-600",
        },
      ]
    : [];

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4'>
              <FileText className='w-8 h-8 text-purple-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Text Difference Checker
            </h2>
            <p className='text-gray-600'>
              Compare two text blocks and highlight differences
            </p>
          </div>

          {/* Controls */}
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex gap-2'>
              {(["sideBySide", "unified"] as ViewMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === m
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {m === "sideBySide" ? "Side by Side" : "Unified"}
                </button>
              ))}
            </div>
            <div className='flex gap-2'>
              <button
                onClick={swap}
                className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2'
              >
                <ArrowLeftRight className='w-4 h-4' />
                Swap
              </button>
              <button
                onClick={reset}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
              >
                <RotateCcw className='w-4 h-4' />
                Reset
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div
            className={`grid gap-6 mb-6 ${viewMode === "sideBySide" ? "md:grid-cols-2" : "grid-cols-1"}`}
          >
            {(
              [
                {
                  label: "Original Text",
                  value: text1,
                  set: setText1,
                  placeholder: "Enter original text...",
                },
                {
                  label: "Modified Text",
                  value: text2,
                  set: setText2,
                  placeholder: "Enter modified text...",
                },
              ] as const
            ).map(({ label, value, set, placeholder }) => (
              <div key={label}>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  {label}
                </label>
                <textarea
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    set(e.target.value)
                  }
                  placeholder={placeholder}
                  className='w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm'
                />
                <div className='mt-2 text-sm text-gray-500'>
                  {value.split("\n").length} lines, {value.length} characters
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          {result && (
            <div className='space-y-6'>
              {/* Stats */}
              <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200'>
                <h2 className='text-xl font-bold text-gray-800 mb-4'>
                  Comparison Results
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
                  {statCards.map(({ label, value, color }) => (
                    <div
                      key={label}
                      className='bg-white rounded-lg p-4 text-center'
                    >
                      <div className={`text-2xl font-bold ${color}`}>
                        {value}
                      </div>
                      <div className='text-sm text-gray-600'>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diff view */}
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                  Line-by-Line Comparison
                </h3>

                {viewMode === "sideBySide" ? (
                  <div className='grid md:grid-cols-2 gap-4'>
                    {(["original", "modified"] as const).map((side) => (
                      <div
                        key={side}
                        className='bg-gray-50 rounded-lg border border-gray-200 overflow-hidden'
                      >
                        <div className='bg-gray-200 px-4 py-2 font-semibold text-gray-700 capitalize'>
                          {side}
                        </div>
                        <div className='p-2 space-y-1 max-h-96 overflow-y-auto'>
                          {result.diff.map((item, idx) => (
                            <div
                              key={idx}
                              className={`flex gap-2 p-2 rounded font-mono text-sm ${lineClass(item.type, side)}`}
                            >
                              <span className='text-gray-400 w-8 flex-shrink-0'>
                                {item.lineNum}
                              </span>
                              <span className={lineTextClass(item.type, side)}>
                                {(side === "original"
                                  ? item.line1
                                  : item.line2) || " "}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='bg-gray-50 rounded-lg border border-gray-200 overflow-hidden'>
                    <div className='p-2 space-y-1 max-h-96 overflow-y-auto'>
                      {result.diff.map((item, idx) => (
                        <div key={idx}>
                          {item.type === "unchanged" && (
                            <div className='flex gap-2 p-2 font-mono text-sm bg-white rounded'>
                              <span className='text-gray-400 w-8 flex-shrink-0'>
                                {item.lineNum}
                              </span>
                              <span>{item.line1}</span>
                            </div>
                          )}
                          {(item.type === "removed" ||
                            item.type === "modified") && (
                            <div className='flex gap-2 p-2 font-mono text-sm bg-red-100 rounded'>
                              <span className='text-gray-400 w-8 flex-shrink-0'>
                                -
                              </span>
                              <span className='text-red-700'>{item.line1}</span>
                            </div>
                          )}
                          {(item.type === "added" ||
                            item.type === "modified") && (
                            <div className='flex gap-2 p-2 font-mono text-sm bg-green-100 rounded'>
                              <span className='text-gray-400 w-8 flex-shrink-0'>
                                +
                              </span>
                              <span className='text-green-700'>
                                {item.line2}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
            <div className='font-semibold text-gray-700 mb-2 text-sm'>
              Legend:
            </div>
            <div className='space-y-1'>
              {[
                {
                  bg: "bg-white border border-gray-300",
                  label: "Unchanged lines",
                },
                {
                  bg: "bg-yellow-100 border border-yellow-300",
                  label: "Modified lines",
                },
                {
                  bg: "bg-green-100 border border-green-300",
                  label: "Added lines",
                },
                {
                  bg: "bg-red-100 border border-red-300",
                  label: "Removed lines",
                },
              ].map(({ bg, label }) => (
                <div key={label} className='flex items-center gap-2 text-sm'>
                  <div className={`w-4 h-4 ${bg} rounded`} />
                  <span className='text-gray-600'>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
