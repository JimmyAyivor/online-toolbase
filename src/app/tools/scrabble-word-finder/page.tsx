"use client";

import { useMemo, useState } from "react";
import WordToolShell from "../../../components/WordToolShell";
import { useDictionary } from "../../../lib/useDictionary";
import { findWordsFromRack, scrabbleScore } from "../../../lib/dictionary";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedFunTools from "@/components/RelatedFunTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "scrabble-word-finder");

export default function ScrabbleWordFinderPage() {
  const { dict, loading, error } = useDictionary();
  const [letters, setLetters] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [mustContain, setMustContain] = useState("");

  const results = useMemo(() => {
    if (!dict || letters.trim().length === 0) return [];
    const found = findWordsFromRack(dict, letters, {
      minLength: 2,
      startsWith: startsWith.trim() || undefined,
      endsWith: endsWith.trim() || undefined,
      mustContain: mustContain.trim() || undefined,
    });
    return Array.from(new Set(found)).sort(
      (a, b) => scrabbleScore(b) - scrabbleScore(a) || b.length - a.length,
    );
  }, [dict, letters, startsWith, endsWith, mustContain]);

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <WordToolShell
          title="Scrabble & Words With Friends Word Finder"
          description="Enter your tile rack and get every playable word, ranked by score — with support for blank tiles and board filters."
          useCases={[
            "Find your highest-scoring play from a Scrabble or Words With Friends rack",
            "Filter results to words that fit an open spot on the board",
            "Check every word a blank tile could complete",
          ]}
          faq={[
            {
              q: "How do blank tiles work?",
              a: "Enter ? or * in place of each blank tile — it'll be treated as a wildcard that can become any letter needed to form a word.",
            },
            {
              q: "What do the numbers next to each word mean?",
              a: "Standard Scrabble letter point values, summed for the whole word (not counting any board bonus squares) — results are sorted highest-scoring first.",
            },
            {
              q: "Does this account for board bonus squares (double/triple word score)?",
              a: "No — this scores tiles only. You'll still need to check the board for bonus squares before deciding your final play.",
            },
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Your rack
              </label>
              <input
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
                placeholder="e.g. justice? (? = blank tile)"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-lg tracking-wide"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Starts with
                </label>
                <input
                  value={startsWith}
                  onChange={(e) => setStartsWith(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Ends with
                </label>
                <input
                  value={endsWith}
                  onChange={(e) => setEndsWith(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Must contain
                </label>
                <input
                  value={mustContain}
                  onChange={(e) => setMustContain(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
                />
              </div>
            </div>

            {loading && (
              <p className="text-sm text-slate-500">Loading dictionary…</p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {results.length > 0 && (
              <>
                <p className="text-sm text-slate-600">
                  {results.length} word{results.length === 1 ? "" : "s"} found,
                  best score first
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {results.slice(0, 300).map((w) => (
                    <span
                      key={w}
                      className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-sm"
                    >
                      {w}{" "}
                      <span className="font-medium text-blue-600">
                        {scrabbleScore(w)}
                      </span>
                    </span>
                  ))}
                </div>
                {results.length > 300 && (
                  <p className="text-xs text-slate-400">
                    Showing top 300 of {results.length} results.
                  </p>
                )}
              </>
            )}
          </div>
        </WordToolShell>
        <RelatedFunTools currentSlug="scrabble-word-finder" />
      </SidebarAdLayout>
    </>
  );
}
