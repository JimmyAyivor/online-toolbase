"use client";
import React, { useState, useMemo } from "react";
import { FileText, ArrowLeftRight, RotateCcw } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
  return {
    diff,
    stats: {
      total,
      unchanged,
      modified: diff.filter((d) => d.type === "modified").length,
      added: diff.filter((d) => d.type === "added").length,
      removed: diff.filter((d) => d.type === "removed").length,
      similarity: total > 0 ? Math.round((unchanged / total) * 100) : 100,
    },
  };
}

function lineRowClass(type: DiffType, side: "original" | "modified"): string {
  if (type === "unchanged") return "bg-white";
  if (type === "modified") return "bg-yellow-50";
  if (type === "removed")
    return side === "original" ? "bg-red-50" : "bg-gray-50";
  /* added */ return side === "original" ? "bg-gray-50" : "bg-emerald-50";
}

function lineTextClass(type: DiffType, side: "original" | "modified"): string {
  if (type === "modified")
    return side === "original" ? "text-red-700" : "text-emerald-700";
  if (type === "removed")
    return side === "original" ? "text-red-700" : "text-gray-400";
  if (type === "added")
    return side === "modified" ? "text-emerald-700" : "text-gray-400";
  return "text-gray-700";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TextDifferenceCheckerClient() {
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("sideBySide");

  const result = useMemo(() => computeDiff(text1, text2), [text1, text2]);

  const swap = () => {
    setText1(text2);
    setText2(text1);
  };
  const reset = () => {
    setText1("");
    setText2("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Text Difference Checker
            </h2>
            <p className="text-gray-500">
              Paste two text blocks to highlight every addition, removal, and
              modification
            </p>
          </div>

          {/* View mode + action controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
              {(["sideBySide", "unified"] as ViewMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === m ? "bg-teal-600 text-white shadow" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {m === "sideBySide" ? "Side by Side" : "Unified"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={swap}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-bold transition-all"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Swap
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors px-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Text inputs */}
          <div
            className={`grid gap-5 mb-6 ${viewMode === "sideBySide" ? "md:grid-cols-2" : "grid-cols-1"}`}
          >
            {(
              [
                {
                  label: "Original text",
                  value: text1,
                  set: setText1,
                  placeholder: "Paste your original text here…",
                },
                {
                  label: "Modified text",
                  value: text2,
                  set: setText2,
                  placeholder: "Paste your modified text here…",
                },
              ] as const
            ).map(({ label, value, set, placeholder }) => (
              <div key={label}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {label}
                </label>
                <textarea
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    set(e.target.value)
                  }
                  placeholder={placeholder}
                  rows={10}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none font-mono text-sm"
                />
                <p className="mt-1.5 text-xs text-gray-400">
                  {value.split("\n").length} lines · {value.length} characters
                </p>
              </div>
            ))}
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-100 rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Comparison Summary
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    {
                      label: "Similarity",
                      value: `${result.stats.similarity}%`,
                      color: "text-teal-700",
                      bg: "bg-teal-50 border-teal-100",
                    },
                    {
                      label: "Unchanged",
                      value: result.stats.unchanged,
                      color: "text-gray-700",
                      bg: "bg-gray-50 border-gray-100",
                    },
                    {
                      label: "Modified",
                      value: result.stats.modified,
                      color: "text-amber-700",
                      bg: "bg-amber-50 border-amber-100",
                    },
                    {
                      label: "Added",
                      value: result.stats.added,
                      color: "text-emerald-700",
                      bg: "bg-emerald-50 border-emerald-100",
                    },
                    {
                      label: "Removed",
                      value: result.stats.removed,
                      color: "text-red-700",
                      bg: "bg-red-50 border-red-100",
                    },
                  ].map(({ label, value, color, bg }) => (
                    <div
                      key={label}
                      className={`rounded-xl border p-3 text-center ${bg}`}
                    >
                      <p className={`text-2xl font-black ${color}`}>{value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diff view */}
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Line-by-line comparison
                </p>

                {viewMode === "sideBySide" ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {(["original", "modified"] as const).map((side) => (
                      <div
                        key={side}
                        className="rounded-2xl border border-gray-200 overflow-hidden"
                      >
                        <div className="bg-gray-100 px-4 py-2.5 font-bold text-gray-700 text-sm capitalize">
                          {side}
                        </div>
                        <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                          {result.diff.map((item, idx) => (
                            <div
                              key={idx}
                              className={`flex gap-3 px-4 py-1.5 font-mono text-sm ${lineRowClass(item.type, side)}`}
                            >
                              <span className="text-gray-300 w-7 shrink-0 text-right select-none">
                                {item.lineNum}
                              </span>
                              <span className={lineTextClass(item.type, side)}>
                                {(side === "original"
                                  ? item.line1
                                  : item.line2) || "\u00a0"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="max-h-[32rem] overflow-y-auto divide-y divide-gray-50">
                      {result.diff.map((item, idx) => (
                        <div key={idx}>
                          {item.type === "unchanged" && (
                            <div className="flex gap-3 px-4 py-1.5 font-mono text-sm bg-white">
                              <span className="text-gray-300 w-7 shrink-0 text-right select-none">
                                {item.lineNum}
                              </span>
                              <span className="text-gray-700">
                                {item.line1 || "\u00a0"}
                              </span>
                            </div>
                          )}
                          {(item.type === "removed" ||
                            item.type === "modified") && (
                            <div className="flex gap-3 px-4 py-1.5 font-mono text-sm bg-red-50">
                              <span className="text-red-300 w-7 shrink-0 text-right select-none font-bold">
                                −
                              </span>
                              <span className="text-red-700">
                                {item.line1 || "\u00a0"}
                              </span>
                            </div>
                          )}
                          {(item.type === "added" ||
                            item.type === "modified") && (
                            <div className="flex gap-3 px-4 py-1.5 font-mono text-sm bg-emerald-50">
                              <span className="text-emerald-400 w-7 shrink-0 text-right select-none font-bold">
                                +
                              </span>
                              <span className="text-emerald-700">
                                {item.line2 || "\u00a0"}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 px-1">
                {[
                  { bg: "bg-white border border-gray-200", label: "Unchanged" },
                  {
                    bg: "bg-yellow-50 border border-yellow-200",
                    label: "Modified",
                  },
                  {
                    bg: "bg-emerald-50 border border-emerald-200",
                    label: "Added",
                  },
                  { bg: "bg-red-50 border border-red-200", label: "Removed" },
                ].map(({ bg, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <div className={`w-4 h-4 rounded ${bg}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">💡 How to use:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Paste the original version in the left box and the revised
                version in the right
              </li>
              <li>
                Side-by-side view shows both texts in parallel — ideal for
                documents and code
              </li>
              <li>
                Unified view shows a single diff stream with − / + markers —
                ideal for patches
              </li>
              <li>
                Use Swap to reverse the comparison direction without retyping
              </li>
              <li>
                Comparison runs live — results update as you type in either box
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
