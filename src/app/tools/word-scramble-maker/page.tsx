"use client";

import { useState } from "react";
import WordToolShell from "../../../components/WordToolShell";
import { scrambleWord } from "../../../lib/dictionary";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedFunTools from "@/components/RelatedFunTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "word-scramble-maker");

interface Item {
  word: string;
  scrambled: string;
  hint: string;
}

export default function WordScrambleMakerPage() {
  const [wordListText, setWordListText] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const generate = () => {
    const words = wordListText
      .split(/[\n,]/)
      .map((w) => w.trim())
      .filter(Boolean);

    const next: Item[] = words.map((raw) => {
      const [wordPart, hintPart] = raw.split("|").map((s) => s.trim());
      return {
        word: wordPart,
        scrambled: scrambleWord(wordPart),
        hint: hintPart ?? "",
      };
    });
    setItems(next);
    setShowAnswers(false);
  };

  const reshuffle = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, scrambled: scrambleWord(item.word) } : item,
      ),
    );
  };

  const printWorksheet = () => window.print();

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <WordToolShell
          title="Word Scramble Maker"
          description="Turn any list of words into a printable scramble puzzle, with an optional hint per word and an answer key."
          useCases={[
            "Create a classroom vocabulary worksheet",
            "Make a party game or icebreaker activity",
            "Build a themed puzzle for a birthday or holiday event",
          ]}
          faq={[
            {
              q: "Can I add hints for each word?",
              a: 'Yes — type a word followed by "| your hint" on its own line, e.g. "elephant | Largest land animal", and the hint will show under the scrambled letters.',
            },
            {
              q: "How do I print it?",
              a: "Use the Print Worksheet button — it opens your browser's print dialog with just the puzzle (answers hidden unless you've revealed them).",
            },
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Word list (one per line, optional hint after |)
              </label>
              <textarea
                value={wordListText}
                onChange={(e) => setWordListText(e.target.value)}
                rows={6}
                placeholder={
                  "elephant | Largest land animal\ngiraffe | Tallest animal\npenguin"
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={generate}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              Generate Scramble Puzzle
            </button>

            {items.length > 0 && (
              <div className="print-area">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Unscramble these words
                  </h2>
                  <div className="flex gap-2 print:hidden">
                    <button
                      onClick={() => setShowAnswers((s) => !s)}
                      className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                    >
                      {showAnswers ? "Hide" : "Show"} answers
                    </button>
                    <button
                      onClick={printWorksheet}
                      className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                    >
                      Print Worksheet
                    </button>
                  </div>
                </div>

                <ol className="space-y-3">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3"
                    >
                      <div>
                        <p className="text-xl font-semibold uppercase tracking-widest text-slate-800">
                          {item.scrambled}
                        </p>
                        {item.hint && (
                          <p className="mt-1 text-xs text-slate-500">
                            Hint: {item.hint}
                          </p>
                        )}
                        {showAnswers && (
                          <p className="mt-1 text-sm text-green-700">
                            Answer: {item.word}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => reshuffle(i)}
                        className="shrink-0 rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50 print:hidden"
                      >
                        Reshuffle
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </WordToolShell>
        <RelatedFunTools currentSlug="word-scramble-maker" />
      </SidebarAdLayout>
    </>
  );
}
