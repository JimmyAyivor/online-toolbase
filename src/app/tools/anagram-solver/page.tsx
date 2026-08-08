"use client";

import { useMemo, useState } from "react";
import WordToolShell from "../../../components/WordToolShell";
import { useDictionary } from "../../../lib/useDictionary";
import { findExactAnagrams, scrabbleScore } from "../../../lib/dictionary";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedFunTools from "@/components/RelatedFunTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "anagram-solver");

export default function AnagramSolverPage() {
  const { dict, loading, error } = useDictionary();
  const [letters, setLetters] = useState("");

  const results = useMemo(() => {
    if (!dict || letters.trim().length === 0) return [];
    const found = findExactAnagrams(dict, letters);
    return Array.from(new Set(found)).sort((a, b) => a.localeCompare(b));
  }, [dict, letters]);

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <WordToolShell
          title="Anagram Solver"
          description="Find every word that's a true anagram of your letters — using each one exactly once."
          useCases={[
            "Solve an anagram puzzle or cryptic crossword clue",
            "Find a hidden word spelled from a name or phrase's letters",
            "Check whether two words are anagrams of each other",
          ]}
          faq={[
            {
              q: "How is this different from Word Unscrambler?",
              a: "Anagram Solver only returns words that use every single letter you entered, exactly once — nothing left over. Word Unscrambler finds words using any subset of your letters, which is what you usually want for Scrabble-style tile racks.",
            },
            {
              q: "Does letter order matter?",
              a: "No — an anagram can rearrange the letters in any order, as long as every letter from the original is used exactly once.",
            },
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Letters to anagram
              </label>
              <input
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
                placeholder="e.g. listen"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-lg tracking-wide"
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
                  {results.length} anagram{results.length === 1 ? "" : "s"}{" "}
                  found
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {results.map((w) => (
                    <span
                      key={w}
                      className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-sm"
                    >
                      {w}{" "}
                      <span className="text-slate-400">{scrabbleScore(w)}</span>
                    </span>
                  ))}
                </div>
              </>
            )}

            {!loading && letters.trim().length > 0 && results.length === 0 && (
              <p className="text-sm text-slate-500">
                No exact anagrams found for those letters.
              </p>
            )}
          </div>
        </WordToolShell>
        <RelatedFunTools currentSlug="anagram-solver" />
      </SidebarAdLayout>
    </>
  );
}
