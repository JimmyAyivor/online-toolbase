"use client";

import { useRef, useState } from "react";
import WordToolShell from "../../../components/WordToolShell";
import {
  generateWordSearch,
  WordSearchGrid,
} from "../../../lib/word-search-grid";
import { downloadBytes } from "../../../lib/download";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import RelatedFunTools from "@/components/RelatedFunTools";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "word-search-maker");

export default function WordSearchMakerPage() {
  const [wordListText, setWordListText] = useState("");
  const [allowDiagonals, setAllowDiagonals] = useState(true);
  const [allowBackwards, setAllowBackwards] = useState(true);
  const [grid, setGrid] = useState<WordSearchGrid | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    const words = wordListText
      .split(/[\n,]/)
      .map((w) => w.trim())
      .filter(Boolean);
    if (words.length === 0) return;
    const result = generateWordSearch(words, {
      allowDiagonals,
      allowBackwards,
    });
    setGrid(result);
    setShowAnswers(false);
  };

  const printPuzzle = () => window.print();

  const downloadPng = async () => {
    if (!grid) return;
    const cellSize = 32;
    const padding = 20;
    const canvas = document.createElement("canvas");
    canvas.width = grid.size * cellSize + padding * 2;
    canvas.height = grid.size * cellSize + padding * 2;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 18px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#1e293b";

    grid.cells.forEach((row, r) => {
      row.forEach((letter, c) => {
        ctx.fillText(
          letter,
          padding + c * cellSize + cellSize / 2,
          padding + r * cellSize + cellSize / 2,
        );
      });
    });

    if (showAnswers) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      grid.placed.forEach(({ word, row, col, dRow, dCol }) => {
        const startX = padding + col * cellSize + cellSize / 2;
        const startY = padding + row * cellSize + cellSize / 2;
        const endX =
          padding + (col + dCol * (word.length - 1)) * cellSize + cellSize / 2;
        const endY =
          padding + (row + dRow * (word.length - 1)) * cellSize + cellSize / 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });
    }

    const blob: Blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/png"),
    );
    downloadBytes(blob, "word-search.png", "image/png");
  };

  return (
    <>
      <SidebarAdLayout tool={tool}>
        <WordToolShell
          title="Word Search Puzzle Maker"
          description="Turn any word list into a custom word search grid — print it or download it as an image."
          useCases={[
            "Make a themed word search for a classroom or homeschool lesson",
            "Create a puzzle for a birthday party or event activity book",
            "Build a company or team-building word search with inside jokes",
          ]}
          faq={[
            {
              q: "How big is the grid?",
              a: "It's sized automatically based on how many words and letters you enter, with a bit of extra room for hidden filler letters. Longer word lists produce larger grids.",
            },
            {
              q: "Can words overlap?",
              a: "Yes — the generator tries to overlap words on shared letters where possible, which is standard for word search puzzles and helps fit more words into a smaller grid.",
            },
          ]}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Word list (one per line)
              </label>
              <textarea
                value={wordListText}
                onChange={(e) => setWordListText(e.target.value)}
                rows={6}
                placeholder={"OCEAN\nGALAXY\nCOMET\nPLANET"}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase"
              />
            </div>

            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allowDiagonals}
                  onChange={(e) => setAllowDiagonals(e.target.checked)}
                />{" "}
                Allow diagonal words
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allowBackwards}
                  onChange={(e) => setAllowBackwards(e.target.checked)}
                />{" "}
                Allow backwards words
              </label>
            </div>

            <button
              onClick={generate}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              Generate Word Search
            </button>

            {grid && (
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 print:hidden">
                  <button
                    onClick={() => setShowAnswers((s) => !s)}
                    className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                  >
                    {showAnswers ? "Hide" : "Show"} answers
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={printPuzzle}
                      className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                    >
                      Print
                    </button>
                    <button
                      onClick={downloadPng}
                      className="rounded border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
                    >
                      Download PNG
                    </button>
                  </div>
                </div>

                {grid.notPlaced.length > 0 && (
                  <p className="mb-3 text-xs text-amber-600">
                    Couldn&apos;t fit: {grid.notPlaced.join(", ")} — try a
                    larger word list gap or fewer/shorter words.
                  </p>
                )}

                <div ref={gridRef} className="mx-auto w-fit">
                  <div
                    className="grid gap-0 border border-slate-300 font-mono"
                    style={{
                      gridTemplateColumns: `repeat(${grid.size}, 1.75rem)`,
                    }}
                  >
                    {grid.cells.map((row, r) =>
                      row.map((letter, c) => (
                        <div
                          key={`${r}-${c}`}
                          className="flex h-7 w-7 items-center justify-center border border-slate-100 text-sm font-semibold text-slate-800"
                        >
                          {letter}
                        </div>
                      )),
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-1 text-sm font-medium text-slate-700">
                    Find these words:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {grid.placed.map(({ word }) => (
                      <span
                        key={word}
                        className="rounded bg-slate-100 px-2 py-1 text-sm"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </WordToolShell>
        <RelatedFunTools currentSlug="word-search-maker" />
      </SidebarAdLayout>
    </>
  );
}
