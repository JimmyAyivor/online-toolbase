"use client";

import { useMemo } from "react";

interface FunTool {
  slug: string;
  href: string;
  label: string;
  desc: string;
}

const FUN_TOOLS: FunTool[] = [
  {
    slug: "word-unscrambler",
    href: "/tools/word-unscrambler",
    label: "Word Unscrambler",
    desc: "Unscramble letters to find possible words quickly.",
  },
  {
    slug: "anagram-solver",
    href: "/tools/anagram-solver",
    label: "Anagram Solver",
    desc: "Find words and phrases that can be formed from a set of letters.",
  },
  {
    slug: "word-scramble-maker",
    href: "/tools/word-scramble-maker",
    label: "Word Scramble Maker",
    desc: "Create scrambled word puzzles for games, classrooms, and activities.",
  },
  {
    slug: "scrabble-word-finder",
    href: "/tools/scrabble-word-finder",
    label: "Scrabble Word Finder",
    desc: "Find valid Scrabble words from your available letters and improve your word-game options.",
  },
  {
    slug: "word-search-maker",
    href: "/tools/word-search-maker",
    label: "Word Search Maker",
    desc: "Create custom word search puzzles using your own words.",
  },
  {
    slug: "wordle-solver",
    href: "/tools/wordle-solver",
    label: "Wordle Solver",
    desc: "Find possible Wordle answers using known, misplaced, and excluded letters.",
  },
  {
    slug: "crossword-clue-finder",
    href: "/tools/crossword-clue-finder",
    label: "Crossword Clue Finder",
    desc: "Find possible answers to crossword clues using clue patterns and known letters.",
  },
  {
    slug: "random-word-generator",
    href: "/tools/random-word-generator",
    label: "Random Word Generator",
    desc: "Generate random words for writing prompts, games, brainstorming, and creative activities.",
  },
];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

interface RelatedFunToolsProps {
  currentSlug: string;
  count?: number;
}

export default function RelatedFunTools({
  currentSlug,
  count = 3,
}: RelatedFunToolsProps) {
  const relatedTools = useMemo(() => {
    return shuffle(FUN_TOOLS.filter((tool) => tool.slug !== currentSlug)).slice(
      0,
      count,
    );
  }, [currentSlug, count]);

  return (
    <section className="mt-12" aria-labelledby="related-fun-tools-heading">
      <h2
        id="related-fun-tools-heading"
        className="text-lg font-bold text-gray-900 mb-4"
      >
        Related Fun &amp; Word Tools
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <a
            key={tool.slug}
            href={tool.href}
            className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-yellow-200 hover:-translate-y-1 transition-all duration-200 p-5"
            aria-label={`${tool.label} — ${tool.desc}`}
          >
            <div className="font-bold text-gray-900 text-sm mb-1">
              {tool.label}
            </div>

            <div className="text-xs text-gray-500">{tool.desc}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
