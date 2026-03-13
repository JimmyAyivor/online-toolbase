"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  RotateCcw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_STYLES: Record<IssueType, { pill: string; dot: string }> = {
  grammar: {
    pill: "bg-red-100 text-red-700 border border-red-200",
    dot: "bg-red-500",
  },
  spelling: {
    pill: "bg-orange-100 text-orange-700 border border-orange-200",
    dot: "bg-orange-500",
  },
  punctuation: {
    pill: "bg-blue-100 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
  style: {
    pill: "bg-purple-100 text-purple-700 border border-purple-200",
    dot: "bg-purple-500",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreConfig(score: number) {
  if (score >= 90)
    return {
      color: "text-emerald-600",
      bg: "from-emerald-50 to-teal-50 border-emerald-200",
      label: "Excellent writing!",
      desc: "Your text has minimal issues.",
    };
  if (score >= 70)
    return {
      color: "text-amber-600",
      bg: "from-amber-50 to-yellow-50 border-amber-200",
      label: "Good, with room for improvement",
      desc: "A few issues found — review the corrections below.",
    };
  return {
    color: "text-red-600",
    bg: "from-red-50 to-rose-50 border-red-200",
    label: "Several issues found",
    desc: "Review all corrections below to improve your text.",
  };
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Component ────────────────────────────────────────────────────────────────

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
              content: `Analyze this text for grammar, spelling, punctuation, and style issues. Return ONLY a JSON object with this exact format:
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
      setResults(JSON.parse(cleanJson) as GrammarResults);
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

  const scoreConfig = results ? getScoreConfig(results.score) : null;

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-4 shadow-lg'>
              <CheckCircle className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Grammar &amp; Spell Checker
            </h2>
            <p className='text-gray-500'>
              AI-powered writing analysis — grammar, spelling, punctuation, and
              style
            </p>
          </div>

          {/* Input */}
          <div className='mb-5'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Enter your text
            </label>
            <textarea
              value={text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setText(e.target.value);
                setError("");
              }}
              placeholder='Type or paste your text here…'
              rows={8}
              className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none'
            />
            <div className='flex justify-between mt-1.5 text-xs text-gray-400'>
              <span>{wordCount(text)} words</span>
              <span>{text.length} characters</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className='flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-5'>
              <AlertCircle className='w-4 h-4 shrink-0' />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={checkGrammar}
            disabled={loading}
            className='w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2'
          >
            {loading ? (
              <>
                <Loader2 className='w-5 h-5 animate-spin' />
                Analysing your text…
              </>
            ) : (
              <>
                <CheckCircle className='w-5 h-5' />
                Check Grammar &amp; Spelling
              </>
            )}
          </button>

          {/* Results */}
          {results && scoreConfig && (
            <div className='mt-8 space-y-6'>
              {/* Score card */}
              <div
                className={`bg-gradient-to-r ${scoreConfig.bg} border-2 rounded-2xl p-6`}
              >
                <div className='flex items-center justify-between mb-4'>
                  <p className='text-xs font-bold uppercase tracking-widest text-gray-400'>
                    Writing Score
                  </p>
                  <p className={`text-5xl font-black ${scoreConfig.color}`}>
                    {results.score}
                    <span className='text-2xl'>%</span>
                  </p>
                </div>
                <div
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm ${results.score >= 90 ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : results.score >= 70 ? "bg-amber-50 border border-amber-200 text-amber-700" : "bg-red-50 border border-red-200 text-red-700"}`}
                >
                  {results.score >= 90 ? (
                    <CheckCircle className='w-5 h-5 shrink-0 mt-0.5' />
                  ) : (
                    <AlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
                  )}
                  <div>
                    <p className='font-bold'>{scoreConfig.label}</p>
                    <p>{scoreConfig.desc}</p>
                  </div>
                </div>

                {/* Type summary pills */}
                {results.issues.length > 0 && (
                  <div className='flex flex-wrap gap-2 mt-4'>
                    {(
                      [
                        "grammar",
                        "spelling",
                        "punctuation",
                        "style",
                      ] as IssueType[]
                    ).map((type) => {
                      const count = results.issues.filter(
                        (i) => i.type === type,
                      ).length;
                      if (!count) return null;
                      return (
                        <span
                          key={type}
                          className={`px-3 py-1 rounded-full text-xs font-bold ${TYPE_STYLES[type].pill}`}
                        >
                          {count} {type}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Issues list */}
              {results.issues.length > 0 && (
                <div>
                  <p className='text-sm font-bold text-gray-500 uppercase tracking-widest mb-3'>
                    Issues found ({results.issues.length})
                  </p>
                  <div className='space-y-3'>
                    {results.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className='bg-gray-50 border border-gray-100 rounded-2xl p-5'
                      >
                        <div className='flex items-start gap-3'>
                          <span
                            className={`mt-0.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase shrink-0 ${TYPE_STYLES[issue.type]?.pill ?? "bg-gray-100 text-gray-600"}`}
                          >
                            {issue.type}
                          </span>
                          <div className='flex-1 min-w-0'>
                            <div className='flex flex-wrap items-center gap-2 mb-2'>
                              <span className='text-red-600 line-through text-sm font-medium'>
                                {issue.original}
                              </span>
                              <span className='text-gray-400'>→</span>
                              <span className='text-emerald-700 font-bold text-sm'>
                                {issue.correction}
                              </span>
                            </div>
                            <p className='text-xs text-gray-500 leading-relaxed'>
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
                <div className='flex items-center justify-between mb-3'>
                  <p className='text-sm font-bold text-gray-500 uppercase tracking-widest'>
                    Corrected text
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className='flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors'
                  >
                    {copied ? (
                      <>
                        <CheckCircle className='w-4 h-4' />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className='w-4 h-4' />
                        Copy text
                      </>
                    )}
                  </button>
                </div>
                <div className='bg-emerald-50 border-2 border-emerald-100 rounded-2xl p-5'>
                  <p className='text-gray-800 leading-relaxed whitespace-pre-wrap'>
                    {results.correctedText}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reset */}
          <button
            onClick={() => {
              setText("");
              setResults(null);
              setError("");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Clear and start over
          </button>

          {/* Tips */}
          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>💡 Writing tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Use active voice instead of passive voice for more direct,
                engaging writing
              </li>
              <li>Keep sentences concise — aim for 15–20 words on average</li>
              <li>
                Ensure subject-verb agreement throughout, especially with
                compound subjects
              </li>
              <li>
                Use consistent tense — avoid switching between past and present
                mid-paragraph
              </li>
              <li>
                Vary sentence length to maintain reader engagement and natural
                rhythm
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
