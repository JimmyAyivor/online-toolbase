"use client";

import { useMemo, useState } from "react";
import WordToolShell from "../../../components/WordToolShell";
import { useDictionary } from "../../../lib/useDictionary";
import { findWordsFromRack, scrabbleScore } from "../../../lib/dictionary";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedFunTools from "@/components/RelatedFunTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "word-unscrambler");

export default function WordUnscramblerPage() {
  const { dict, loading, error } = useDictionary();
  const [letters, setLetters] = useState("");
  const [sortBy, setSortBy] = useState<"length" | "alpha">("length");

  const results = useMemo(() => {
    if (!dict || letters.trim().length === 0) return [];
    const found = findWordsFromRack(dict, letters, { minLength: 2 });
    const unique = Array.from(new Set(found));
    return unique.sort((a, b) =>
      sortBy === "length"
        ? b.length - a.length || a.localeCompare(b)
        : a.localeCompare(b),
    );
  }, [dict, letters, sortBy]);

  const grouped = useMemo(() => {
    const map = new Map<number, string[]>();
    results.forEach((w) => {
      const arr = map.get(w.length);
      if (arr) arr.push(w);
      else map.set(w.length, [w]);
    });
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [results]);

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <WordToolShell
          title="Word Unscrambler"
          description="Enter a jumble of letters and find every real word hidden inside — for Scrabble, Words With Friends, Wordscapes, and any letter-scramble puzzle."
          useCases={[
            "Unscramble a rack of Scrabble or Words With Friends tiles",
            "Solve a newspaper jumble puzzle",
            "Find words hidden in a Wordscapes or Word Cookies level",
          ]}
          faq={[
            {
              q: "Do I have to use every letter?",
              a: "No — this finds words using any subset of your letters, not just full-length anagrams. If you want only words that use every letter exactly once, try the Anagram Solver instead.",
            },
            {
              q: "Can I include blank tiles?",
              a: "Yes — enter ? or * for each blank tile and it'll be treated as a wildcard that can stand in for any letter.",
            },
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Your letters
              </label>
              <input
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
                placeholder="e.g. listenq or use ? for a blank tile"
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
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>
                    {results.length} word{results.length === 1 ? "" : "s"} found
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy("length")}
                      className={`rounded px-2 py-1 ${sortBy === "length" ? "bg-blue-100 text-blue-700" : "hover:bg-slate-100"}`}
                    >
                      By length
                    </button>
                    <button
                      onClick={() => setSortBy("alpha")}
                      className={`rounded px-2 py-1 ${sortBy === "alpha" ? "bg-blue-100 text-blue-700" : "hover:bg-slate-100"}`}
                    >
                      A–Z
                    </button>
                  </div>
                </div>

                {sortBy === "length" ? (
                  <div className="space-y-3">
                    {grouped.map(([len, words]) => (
                      <div key={len}>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {len} letter{len === 1 ? "" : "s"} ({words.length})
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {words.map((w) => (
                            <span
                              key={w}
                              className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-sm"
                            >
                              {w}{" "}
                              <span className="text-slate-400">
                                {scrabbleScore(w)}
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {results.map((w) => (
                      <span
                        key={w}
                        className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-sm"
                      >
                        {w}{" "}
                        <span className="text-slate-400">
                          {scrabbleScore(w)}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}

            {!loading && letters.trim().length > 0 && results.length === 0 && (
              <p className="text-sm text-slate-500">
                No words found — try different or fewer letters.
              </p>
            )}
          </div>
        </WordToolShell>
        <RelatedFunTools currentSlug="word-unscrambler" />
      </SidebarAdLayout>
    </>
  );
}
