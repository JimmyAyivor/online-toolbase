"use client";

import { useMemo, useState } from "react";
import WordToolShell from "../../../components/WordToolShell";
import { useDictionary } from "../../../lib/useDictionary";
import { findWordsByPattern, scrabbleScore } from "../../../lib/dictionary";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedFunTools from "@/components/RelatedFunTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "crossword-clue-finder");

export default function CrosswordClueFinderPage() {
  const { dict, loading, error } = useDictionary();
  const [pattern, setPattern] = useState("");

  const results = useMemo(() => {
    if (!dict || pattern.trim().length === 0) return [];
    return findWordsByPattern(dict, pattern).sort((a, b) => a.localeCompare(b));
  }, [dict, pattern]);

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <WordToolShell
          title="Crossword Clue Finder"
          description="Know some of the letters but not all? Enter a pattern with underscores for the blanks and find every matching word."
          useCases={[
            "Solve a crossword clue when you only know some of the letters",
            "Find words matching a pattern from a word puzzle or cipher",
            "Check possible words for a partially-filled Wordle-style grid",
          ]}
          faq={[
            {
              q: "How do I enter a pattern?",
              a: 'Type the letters you know and use "_" or "?" for each unknown letter, keeping the total length correct — e.g. "c_t" matches any 3-letter word starting with C and ending in T, like CAT, COT, and CUT.',
            },
            {
              q: "Does this include the exact word length?",
              a: "Yes — the pattern's length determines the word length searched, so make sure to include one placeholder per unknown letter, not just for the letters you know.",
            },
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Pattern
              </label>
              <input
                value={pattern}
                onChange={(e) =>
                  setPattern(e.target.value.replace(/[^a-zA-Z_?]/g, ""))
                }
                placeholder="e.g. c_t or _a__le"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-lg font-mono tracking-widest"
                autoFocus
              />
            </div>

            {loading && (
              <p className="text-sm text-slate-500">Loading dictionary…</p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {results.length > 0 && (
              <>
                <p className="text-sm text-slate-600">
                  {results.length} match{results.length === 1 ? "" : "es"} found
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {results.slice(0, 300).map((w) => (
                    <span
                      key={w}
                      className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-sm"
                    >
                      {w}{" "}
                      <span className="text-slate-400">{scrabbleScore(w)}</span>
                    </span>
                  ))}
                </div>
                {results.length > 300 && (
                  <p className="text-xs text-slate-400">
                    Showing first 300 of {results.length}.
                  </p>
                )}
              </>
            )}

            {!loading && pattern.trim().length > 0 && results.length === 0 && (
              <p className="text-sm text-slate-500">
                No matches — double-check the pattern length and known letters.
              </p>
            )}
          </div>
        </WordToolShell>
        <RelatedFunTools currentSlug="crossword-clue-finder" />
      </SidebarAdLayout>
    </>
  );
}
