"use client";
import React, { useState } from "react";
import {
  Search,
  AlertCircle,
  CheckCircle,
  Loader2,
  ExternalLink,
  RotateCcw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MatchItem {
  url: string;
  title: string;
  snippet?: string;
  query: string;
}

interface PlagiarismResults {
  totalChecked: number;
  matchesFound: number;
  matches: MatchItem[];
  originalityScore: number;
}

interface ApiContentItem {
  type: string;
  text?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

function getScoreBg(score: number): string {
  if (score >= 80) return "from-emerald-50 to-teal-50 border-emerald-200";
  if (score >= 50) return "from-amber-50 to-yellow-50 border-amber-200";
  return "from-red-50 to-rose-50 border-red-200";
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlagiarismCheckerClient() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<PlagiarismResults | null>(null);
  const [error, setError] = useState<string>("");

  const checkPlagiarism = async (): Promise<void> => {
    if (!text.trim()) {
      setError("Please enter some text to check");
      return;
    }
    if (wordCount(text) < 10) {
      setError("Please enter at least 10 words for meaningful results");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
      const searchQueries = sentences
        .filter((s) => s.trim().split(/\s+/).length >= 5)
        .slice(0, 3)
        .map((s) =>
          s
            .trim()
            .replace(/[^\w\s]/g, "")
            .slice(0, 100),
        );

      const matches: MatchItem[] = [];

      for (const query of searchQueries) {
        try {
          const response = await fetch(
            "https://api.anthropic.com/v1/messages",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                messages: [
                  {
                    role: "user",
                    content: `Search the web for this exact phrase: "${query}". Find any web pages that contain this or very similar text. Return results as JSON array with format: [{"url": "...", "title": "...", "snippet": "..."}]. Return only the JSON, no other text.`,
                  },
                ],
                tools: [{ type: "web_search_20250305", name: "web_search" }],
              }),
            },
          );

          const data = (await response.json()) as { content: ApiContentItem[] };
          const textContent = data.content
            .filter((i) => i.type === "text")
            .map((i) => i.text ?? "")
            .join("\n");

          try {
            const cleanJson = textContent.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(cleanJson) as unknown;
            if (Array.isArray(parsed) && parsed.length > 0) {
              matches.push(
                ...(parsed as Array<Omit<MatchItem, "query">>).map((m) => ({
                  ...m,
                  query,
                })),
              );
            }
          } catch {
            /* continue */
          }
        } catch (e) {
          console.error("Search error:", e);
        }
      }

      const uniqueMatches = Array.from(
        new Map(matches.map((m) => [m.url, m])).values(),
      );
      setResults({
        totalChecked: searchQueries.length,
        matchesFound: uniqueMatches.length,
        matches: uniqueMatches,
        originalityScore: Math.max(0, 100 - uniqueMatches.length * 20),
      });
    } catch (err) {
      setError("An error occurred while checking. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const words = wordCount(text);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Plagiarism Checker
            </h2>
            <p className="text-gray-500">
              Check your text against live web sources for originality
            </p>
          </div>

          {/* Input */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter text to check
            </label>
            <textarea
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setText(e.target.value);
                setError("");
              }}
              placeholder="Paste your text here (minimum 10 words)…"
              rows={8}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-between mt-1.5 text-xs text-gray-400">
              <span>{words} words</span>
              <span>{text.length} characters</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={checkPlagiarism}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Checking for plagiarism…
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Check Plagiarism
              </>
            )}
          </button>

          {/* Results */}
          {results && (
            <div className="mt-8 space-y-5">
              {/* Score summary */}
              <div
                className={`bg-gradient-to-r ${getScoreBg(results.originalityScore)} border-2 rounded-2xl p-6`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Analysis Results
                </p>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    {
                      label: "Phrases checked",
                      value: String(results.totalChecked),
                      color: "text-gray-800",
                    },
                    {
                      label: "Matches found",
                      value: String(results.matchesFound),
                      color: "text-gray-800",
                    },
                    {
                      label: "Originality score",
                      value: `${results.originalityScore}%`,
                      color: getScoreColor(results.originalityScore),
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="bg-white rounded-xl p-4 text-center shadow-sm"
                    >
                      <p className={`text-3xl font-black ${color}`}>{value}</p>
                      <p className="text-xs text-gray-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {results.originalityScore >= 80 && (
                  <div className="flex items-start gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Good originality!</p>
                      <p>
                        Your text appears to be mostly original based on our web
                        search.
                      </p>
                    </div>
                  </div>
                )}
                {results.originalityScore >= 50 &&
                  results.originalityScore < 80 && (
                    <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">
                          Moderate similarity detected
                        </p>
                        <p>
                          Some parts of your text may match existing web
                          content. Review the matches below.
                        </p>
                      </div>
                    </div>
                  )}
                {results.originalityScore < 50 && (
                  <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">High similarity detected</p>
                      <p>
                        Significant portions of your text may match existing web
                        content. Review and cite sources as needed.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Matches */}
              {results.matches.length > 0 ? (
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Potential matches
                  </p>
                  <div className="space-y-3">
                    {results.matches.map((match, idx) => (
                      <div
                        key={`${match.url}-${idx}`}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
                      >
                        <p className="font-bold text-gray-800 text-sm mb-1">
                          {match.title}
                        </p>
                        {match.snippet && (
                          <p className="text-sm text-gray-500 mb-2 leading-relaxed">
                            {match.snippet}
                          </p>
                        )}
                        <a
                          href={match.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          {match.url.length > 70
                            ? `${match.url.slice(0, 70)}…`
                            : match.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="font-bold text-gray-800">No matches found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Your text appears to be original based on our web search.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Reset */}
          <button
            onClick={() => {
              setText("");
              setResults(null);
              setError("");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Clear and start over
          </button>

          {/* Tips */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 How this tool works:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Extracts key phrases from your text and searches them against
                live web sources
              </li>
              <li>
                Common factual phrases and widely-used expressions may show as
                matches — this is normal
              </li>
              <li>
                Results are estimates; always use professional tools for
                academic submissions
              </li>
              <li>
                Always cite your sources appropriately in academic and
                professional work
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
