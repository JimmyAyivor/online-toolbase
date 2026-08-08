"use client";

import { useState } from "react";
import WordToolShell from "../../../components/WordToolShell";
import { useDictionary } from "../../../lib/useDictionary";
import { randomWord } from "../../../lib/dictionary";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedFunTools from "@/components/RelatedFunTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "random-word-generator");

export default function RandomWordGeneratorPage() {
  const { dict, loading, error } = useDictionary();
  const [minLength, setMinLength] = useState(4);
  const [maxLength, setMaxLength] = useState(9);
  const [count, setCount] = useState(5);
  const [words, setWords] = useState<string[]>([]);

  const generate = () => {
    if (!dict) return;
    const next = Array.from({ length: count }, () =>
      randomWord(dict, minLength, maxLength),
    );
    setWords(next);
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <WordToolShell
          title="Random Word Generator"
          description="Generate one or more random English words — for games, writing prompts, name inspiration, or icebreakers."
          useCases={[
            "Get a random word for Pictionary, Codenames, or a party game",
            "Kickstart a writing prompt or brainstorm session",
            "Generate a batch of test words for a Word Unscrambler or Scramble Maker puzzle",
          ]}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Min length
                </label>
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={minLength}
                  onChange={(e) => setMinLength(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Max length
                </label>
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={maxLength}
                  onChange={(e) => setMaxLength(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  How many
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            {loading && (
              <p className="text-sm text-slate-500">Loading dictionary…</p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              onClick={generate}
              disabled={!dict}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Generate {count > 1 ? `${count} Words` : "a Word"}
            </button>

            {words.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {words.map((w, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-lg font-medium"
                  >
                    {w}
                  </span>
                ))}
              </div>
            )}
          </div>
        </WordToolShell>
        <RelatedFunTools currentSlug="random-word-generator" />
      </SidebarAdLayout>
    </>
  );
}
