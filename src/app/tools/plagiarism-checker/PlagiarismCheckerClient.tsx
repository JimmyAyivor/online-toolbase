"use client";
import React, { useState } from "react";
import {
  Search,
  AlertCircle,
  CheckCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Component ───────────────────────────────────────────────────────────────

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
            .filter((item) => item.type === "text")
            .map((item) => item.text ?? "")
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
            // continue with next query
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

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
              <Search className='w-8 h-8 text-blue-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Plagiarism Checker
            </h2>
            <p className='text-gray-600'>
              Check your text against web sources for originality
            </p>
          </div>

          <div className='space-y-6'>
            {/* Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Enter Text to Check
              </label>
              <textarea
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setText(e.target.value);
                  setError("");
                }}
                placeholder='Paste your text here (minimum 10 words)...'
                className='w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
              />
              <div className='flex justify-between mt-2 text-sm text-gray-500'>
                <span>{words} words</span>
                <span>{text.length} characters</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className='flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'>
                <AlertCircle className='w-5 h-5 flex-shrink-0' />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={checkPlagiarism}
              disabled={loading}
              className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' /> Checking for
                  plagiarism…
                </>
              ) : (
                <>
                  <Search className='w-5 h-5' /> Check Plagiarism
                </>
              )}
            </button>

            {/* Results */}
            {results && (
              <div className='mt-8 space-y-6'>
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
                  <h2 className='text-xl font-bold text-gray-800 mb-4'>
                    Results
                  </h2>

                  {/* Stats */}
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                    {[
                      {
                        label: "Phrases Checked",
                        value: results.totalChecked,
                        color: "text-gray-800",
                      },
                      {
                        label: "Matches Found",
                        value: results.matchesFound,
                        color: "text-gray-800",
                      },
                      {
                        label: "Originality Score",
                        value: `${results.originalityScore}%`,
                        color: getScoreColor(results.originalityScore),
                      },
                    ].map(({ label, value, color }) => (
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

                  {/* Score badge */}
                  {results.originalityScore >= 80 && (
                    <ScoreBanner
                      bg='bg-green-50'
                      border='border-green-200'
                      textColor='text-green-700'
                      icon={
                        <CheckCircle className='w-5 h-5 flex-shrink-0 mt-0.5' />
                      }
                      title='Good originality!'
                      desc='Your text appears to be mostly original.'
                    />
                  )}
                  {results.originalityScore < 80 &&
                    results.originalityScore >= 50 && (
                      <ScoreBanner
                        bg='bg-yellow-50'
                        border='border-yellow-200'
                        textColor='text-yellow-700'
                        icon={
                          <AlertCircle className='w-5 h-5 flex-shrink-0 mt-0.5' />
                        }
                        title='Moderate similarity detected'
                        desc='Some parts of your text may match existing content.'
                      />
                    )}
                  {results.originalityScore < 50 && (
                    <ScoreBanner
                      bg='bg-red-50'
                      border='border-red-200'
                      textColor='text-red-700'
                      icon={
                        <AlertCircle className='w-5 h-5 flex-shrink-0 mt-0.5' />
                      }
                      title='High similarity detected'
                      desc='Significant portions may match existing content.'
                    />
                  )}
                </div>

                {/* Match list */}
                {results.matches.length > 0 ? (
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                      Potential Matches
                    </h3>
                    <div className='space-y-3'>
                      {results.matches.map((match, idx) => (
                        <div
                          key={`${match.url}-${idx}`}
                          className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                        >
                          <h4 className='font-semibold text-gray-800 mb-1'>
                            {match.title}
                          </h4>
                          {match.snippet && (
                            <p className='text-sm text-gray-600 mb-2'>
                              {match.snippet}
                            </p>
                          )}
                          <a
                            href={match.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1'
                          >
                            {match.url.length > 60
                              ? `${match.url.slice(0, 60)}…`
                              : match.url}
                            <ExternalLink className='w-3 h-3' />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='text-center py-8 text-gray-600'>
                    <CheckCircle className='w-12 h-12 text-green-500 mx-auto mb-3' />
                    <p className='font-semibold'>No matches found!</p>
                    <p className='text-sm'>Your text appears to be original.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Note:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                This tool checks text against publicly available web content
              </li>
              <li>
                Results are estimates and should not be considered definitive
              </li>
              <li>Common phrases and factual information may show matches</li>
              <li>
                Always cite sources appropriately in academic and professional
                work
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ScoreBannerProps {
  bg: string;
  border: string;
  textColor: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function ScoreBanner({
  bg,
  border,
  textColor,
  icon,
  title,
  desc,
}: ScoreBannerProps) {
  return (
    <div
      className={`flex items-start gap-2 p-4 ${bg} ${border} border rounded-lg ${textColor}`}
    >
      {icon}
      <div>
        <div className='font-semibold'>{title}</div>
        <div className='text-sm'>{desc}</div>
      </div>
    </div>
  );
}
