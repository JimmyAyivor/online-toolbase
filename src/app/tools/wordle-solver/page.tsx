"use client";

import { useMemo, useState } from "react";
import WordToolShell from "../../../components/WordToolShell";
import { useDictionary } from "../../../lib/useDictionary";
import { findWordleCandidates, WordleGuess } from "../../../lib/dictionary";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedFunTools from "@/components/RelatedFunTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "wordle-solver");

type LetterState = "correct" | "present" | "absent";
const WORD_LENGTH = 5;
const CYCLE: LetterState[] = ["absent", "present", "correct"];

function emptyRow(): WordleGuess[] {
  return Array.from({ length: WORD_LENGTH }, () => ({
    letter: "",
    state: "absent" as LetterState,
  }));
}

export default function WordleSolverPage() {
  const { dict, loading, error } = useDictionary();
  const [rows, setRows] = useState<WordleGuess[][]>([emptyRow()]);

  const setLetter = (rowIdx: number, colIdx: number, letter: string) => {
    setRows((prev) =>
      prev.map((row, r) =>
        r === rowIdx
          ? row.map((cell, c) =>
              c === colIdx
                ? { ...cell, letter: letter.slice(-1).toLowerCase() }
                : cell,
            )
          : row,
      ),
    );
  };

  const cycleState = (rowIdx: number, colIdx: number) => {
    setRows((prev) =>
      prev.map((row, r) =>
        r === rowIdx
          ? row.map((cell, c) =>
              c === colIdx
                ? {
                    ...cell,
                    state:
                      CYCLE[(CYCLE.indexOf(cell.state) + 1) % CYCLE.length],
                  }
                : cell,
            )
          : row,
      ),
    );
  };

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const removeRow = (idx: number) =>
    setRows((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev,
    );

  const completeGuesses = rows.filter((row) =>
    row.every((c) => c.letter.length === 1),
  );

  const results = useMemo(() => {
    if (!dict || completeGuesses.length === 0) return [];
    return findWordleCandidates(dict, completeGuesses, WORD_LENGTH).sort();
  }, [dict, completeGuesses]);

  const stateColor: Record<LetterState, string> = {
    correct: "bg-green-500 text-white border-green-500",
    present: "bg-amber-400 text-white border-amber-400",
    absent: "bg-slate-200 text-slate-500 border-slate-200",
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <WordToolShell
          title="Wordle Solver"
          description="Enter your guesses and their colors to narrow down every word that still fits."
          useCases={[
            "Get unstuck on today's Wordle after a few guesses",
            "Check which words are still possible given your green/yellow/gray results",
            "Find a strong next guess that fits all the constraints so far",
          ]}
          faq={[
            {
              q: "How do I mark a letter's color?",
              a: "Type the letter, then click its tile to cycle through gray (not in the word) → yellow (in the word, wrong spot) → green (correct spot) — matching Wordle's own color scheme.",
            },
            {
              q: "Does this only work for today's Wordle?",
              a: "No — it works for any 5-letter word-guessing game with the same green/yellow/gray feedback, including Wordle clones and archives.",
            },
          ]}
        >
          <div className="space-y-4">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  {row.map((cell, colIdx) => (
                    <input
                      key={colIdx}
                      value={cell.letter}
                      onChange={(e) =>
                        setLetter(
                          rowIdx,
                          colIdx,
                          e.target.value.replace(/[^a-zA-Z]/g, ""),
                        )
                      }
                      onClick={() => cell.letter && cycleState(rowIdx, colIdx)}
                      maxLength={1}
                      className={`h-12 w-12 rounded border-2 text-center text-xl font-bold uppercase transition-colors ${stateColor[cell.state]}`}
                    />
                  ))}
                </div>
                {rows.length > 1 && (
                  <button
                    onClick={() => removeRow(rowIdx)}
                    className="text-slate-400 hover:text-red-500"
                    aria-label="Remove row"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addRow}
              className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              + Add another guess
            </button>

            {loading && (
              <p className="text-sm text-slate-500">Loading dictionary…</p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {completeGuesses.length > 0 && (
              <>
                <p className="text-sm text-slate-600">
                  {results.length} possible word
                  {results.length === 1 ? "" : "s"} remaining
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {results.slice(0, 200).map((w) => (
                    <span
                      key={w}
                      className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-sm uppercase"
                    >
                      {w}
                    </span>
                  ))}
                </div>
                {results.length > 200 && (
                  <p className="text-xs text-slate-400">
                    Showing first 200 of {results.length}.
                  </p>
                )}
              </>
            )}
          </div>
        </WordToolShell>
        <RelatedFunTools currentSlug="wordle-solver" />
      </SidebarAdLayout>
    </>
  );
}
