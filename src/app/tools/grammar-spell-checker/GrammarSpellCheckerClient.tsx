"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  RotateCcw,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type IssueType = "grammar" | "spelling" | "punctuation" | "style";

interface GrammarIssue {
  type: IssueType;
  original: string;
  correction: string;
  explanation: string;
}

interface GrammarResults {
  correctedText: string;
  issues: GrammarIssue[];
  score: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<IssueType, string> = {
  grammar: "bg-red-100 text-red-700",
  spelling: "bg-orange-100 text-orange-700",
  punctuation: "bg-blue-100 text-blue-700",
  style: "bg-purple-100 text-purple-700",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
}

function getTypeColor(type: string): string {
  return TYPE_COLORS[type as IssueType] ?? "bg-gray-100 text-gray-700";
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function GrammarSpellCheckerClient() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<GrammarResults | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const checkGrammar = async (): Promise<void> => {
    if (!text.trim()) {
      setError("Please enter some text to check");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Analyze this text for grammar, spelling, and style issues. Return ONLY a JSON object with this exact format:
{
  "correctedText": "the fully corrected version",
  "issues": [
    {
      "type": "grammar|spelling|punctuation|style",
      "original": "the incorrect text",
      "correction": "the corrected text",
      "explanation": "brief explanation"
    }
  ],
  "score": 0-100
}

Text to check: "${text}"

Return only the JSON, no other text or markdown.`,
            },
          ],
        }),
      });

      const data = await response.json();

      const textContent = (
        data.content as Array<{ type: string; text?: string }>
      )
        .filter((item) => item.type === "text")
        .map((item) => item.text ?? "")
        .join("\n");

      const cleanJson = textContent.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson) as GrammarResults;

      setResults(parsed);
    } catch (err) {
      setError("An error occurred while checking. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (): void => {
    if (results?.correctedText) {
      navigator.clipboard.writeText(results.correctedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const reset = (): void => {
    setText("");
    setResults(null);
    setError("");
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Grammar &amp; Spell Checker
            </h2>
            <p className='text-gray-600'>
              Get real-time writing assistance and corrections
            </p>
          </div>

          <div className='space-y-6'>
            {/* Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Enter Your Text
              </label>
              <textarea
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setText(e.target.value);
                  setError("");
                }}
                placeholder='Type or paste your text here...'
                className='w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none'
              />
              <div className='flex justify-between mt-2 text-sm text-gray-500'>
                <span>{wordCount(text)} words</span>
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

            {/* Actions */}
            <div className='flex gap-3'>
              <button
                onClick={checkGrammar}
                disabled={loading}
                className='flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
              >
                {loading ? (
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Checking…
                  </>
                ) : (
                  <>
                    <CheckCircle className='w-5 h-5' />
                    Check Grammar
                  </>
                )}
              </button>

              {results && (
                <button
                  onClick={reset}
                  className='px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors flex items-center gap-2'
                >
                  <RotateCcw className='w-5 h-5' />
                  Reset
                </button>
              )}
            </div>

            {/* Results */}
            {results && (
              <div className='mt-8 space-y-6'>
                {/* Score card */}
                <div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-xl font-bold text-gray-800'>
                      Writing Score
                    </h3>
                    <div
                      className={`text-3xl font-bold ${getScoreColor(results.score)}`}
                    >
                      {results.score}%
                    </div>
                  </div>

                  {results.score >= 90 && (
                    <div className='flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700'>
                      <CheckCircle className='w-5 h-5 flex-shrink-0 mt-0.5' />
                      <div className='text-sm'>
                        <div className='font-semibold'>Excellent writing!</div>
                        <div>Your text has minimal issues.</div>
                      </div>
                    </div>
                  )}

                  {results.score < 90 && results.score >= 70 && (
                    <div className='flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700'>
                      <AlertCircle className='w-5 h-5 flex-shrink-0 mt-0.5' />
                      <div className='text-sm'>
                        <div className='font-semibold'>
                          Good, with room for improvement
                        </div>
                        <div>
                          A few issues were found that can be corrected.
                        </div>
                      </div>
                    </div>
                  )}

                  {results.score < 70 && (
                    <div className='flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700'>
                      <AlertCircle className='w-5 h-5 flex-shrink-0 mt-0.5' />
                      <div className='text-sm'>
                        <div className='font-semibold'>
                          Several issues found
                        </div>
                        <div>
                          Review the corrections below to improve your text.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Issues list */}
                {results.issues.length > 0 && (
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                      Issues Found ({results.issues.length})
                    </h3>
                    <div className='space-y-3'>
                      {results.issues.map((issue, idx) => (
                        <div
                          key={idx}
                          className='bg-white border border-gray-200 rounded-lg p-4'
                        >
                          <div className='flex items-start gap-3'>
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold uppercase ${getTypeColor(issue.type)}`}
                            >
                              {issue.type}
                            </span>
                            <div className='flex-1'>
                              <div className='mb-2'>
                                <span className='text-red-600 line-through'>
                                  {issue.original}
                                </span>
                                <span className='mx-2'>→</span>
                                <span className='text-green-600 font-semibold'>
                                  {issue.correction}
                                </span>
                              </div>
                              <p className='text-sm text-gray-600'>
                                {issue.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Corrected text */}
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-lg font-semibold text-gray-800'>
                      Corrected Text
                    </h3>
                    <button
                      onClick={copyToClipboard}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors'
                    >
                      {copied ? (
                        <>
                          <CheckCircle className='w-4 h-4' />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className='w-4 h-4' />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
                    <p className='text-gray-800 whitespace-pre-wrap'>
                      {results.correctedText}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips for better writing:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Use active voice instead of passive voice when possible</li>
              <li>Keep sentences concise and clear</li>
              <li>Avoid repetitive words and phrases</li>
              <li>Ensure subject-verb agreement</li>
              <li>Use proper punctuation and capitalization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
