/**
 * Shared client-side dictionary engine for the word-tools suite.
 *
 * Data source: public/data/words-en.txt — 274,136 English words (MIT-licensed,
 * sindresorhus/word-list, derived from SCOWL). Loaded once per session and cached
 * in module scope; every tool page reuses the same in-memory index.
 *
 * Everything here runs entirely in the browser — no server round trip, consistent
 * with the rest of the site.
 */

export const SCRABBLE_POINTS: Record<string, number> = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

export interface DictionaryIndex {
  words: string[];
  byLength: Map<number, string[]>;
  histogramOf(word: string): Int8Array;
}

let cached: Promise<DictionaryIndex> | null = null;

function letterCounts(word: string): Int8Array {
  const counts = new Int8Array(26);
  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i) - 97; // 'a' = 97
    if (code >= 0 && code < 26) counts[code]++;
  }
  return counts;
}

export async function loadDictionary(): Promise<DictionaryIndex> {
  if (cached) return cached;
  cached = (async () => {
    const res = await fetch("/data/words-en.txt");
    const text = await res.text();
    const words = text
      .split("\n")
      .map((w) => w.trim())
      .filter(Boolean);

    const byLength = new Map<number, string[]>();
    const histogramCache = new Map<string, Int8Array>();
    for (const word of words) {
      const arr = byLength.get(word.length);
      if (arr) arr.push(word);
      else byLength.set(word.length, [word]);
    }

    return {
      words,
      byLength,
      histogramOf(word: string): Int8Array {
        let h = histogramCache.get(word);
        if (!h) {
          h = letterCounts(word);
          histogramCache.set(word, h);
        }
        return h;
      },
    };
  })();
  return cached;
}

/** True if `word`'s letters are all present in `rackCounts`, respecting multiplicity. Wildcards count as any letter. */
function fitsInRack(
  wordCounts: Int8Array,
  rackCounts: Int8Array,
  wildcards: number,
): boolean {
  let needed = 0;
  for (let i = 0; i < 26; i++) {
    const shortfall = wordCounts[i] - rackCounts[i];
    if (shortfall > 0) needed += shortfall;
  }
  return needed <= wildcards;
}

export interface RackSearchOptions {
  minLength?: number;
  maxLength?: number;
  mustContain?: string; // letters that must all appear (e.g. locked scrabble board tiles)
  startsWith?: string;
  endsWith?: string;
}

/**
 * Finds every dictionary word that can be formed using some or all of `rackLetters`
 * (blank/wildcard tiles represented by "?" or "*"). Powers Word Unscrambler and
 * Scrabble/Words With Friends Word Finder.
 */
export function findWordsFromRack(
  dict: DictionaryIndex,
  rackLetters: string,
  opts: RackSearchOptions = {},
): string[] {
  const clean = rackLetters.toLowerCase().replace(/[^a-z?*]/g, "");
  const wildcards = (clean.match(/[?*]/g) || []).length;
  const rackCounts = letterCounts(clean.replace(/[?*]/g, ""));
  const minLen = opts.minLength ?? 2;
  const maxLen = opts.maxLength ?? clean.length;

  const results: string[] = [];
  for (let len = minLen; len <= Math.min(maxLen, clean.length); len++) {
    const bucket = dict.byLength.get(len);
    if (!bucket) continue;
    for (const word of bucket) {
      if (opts.startsWith && !word.startsWith(opts.startsWith.toLowerCase()))
        continue;
      if (opts.endsWith && !word.endsWith(opts.endsWith.toLowerCase()))
        continue;
      if (
        opts.mustContain &&
        !opts.mustContain.split("").every((c) => word.includes(c.toLowerCase()))
      )
        continue;
      if (fitsInRack(dict.histogramOf(word), rackCounts, wildcards))
        results.push(word);
    }
  }
  return results;
}

/** Exact-letter anagrams: words using ALL letters in `letters`, nothing more, nothing less. */
export function findExactAnagrams(
  dict: DictionaryIndex,
  letters: string,
): string[] {
  const clean = letters.toLowerCase().replace(/[^a-z]/g, "");
  const targetCounts = letterCounts(clean);
  const bucket = dict.byLength.get(clean.length);
  if (!bucket) return [];
  return bucket.filter((word) => {
    const wc = dict.histogramOf(word);
    for (let i = 0; i < 26; i++) if (wc[i] !== targetCounts[i]) return false;
    return true;
  });
}

/** Pattern match with `_` or `?` as unknown-letter placeholders, e.g. "c_t" -> cat, cot, cut. Powers Crossword Clue Finder. */
export function findWordsByPattern(
  dict: DictionaryIndex,
  pattern: string,
): string[] {
  const clean = pattern.toLowerCase().replace(/\s/g, "");
  const bucket = dict.byLength.get(clean.length);
  if (!bucket) return [];
  const regex = new RegExp("^" + clean.replace(/[_?]/g, ".") + "$");
  return bucket.filter((w) => regex.test(w));
}

export interface WordleGuess {
  letter: string;
  state: "correct" | "present" | "absent"; // green / yellow / gray
}

/** Filters the dictionary down to words consistent with a set of Wordle guesses. */
export function findWordleCandidates(
  dict: DictionaryIndex,
  guesses: WordleGuess[][],
  wordLength = 5,
): string[] {
  const bucket = dict.byLength.get(wordLength) ?? [];

  return bucket.filter((word) => {
    for (const guess of guesses) {
      const guessLetters = guess.map((g) => g.letter.toLowerCase());
      const wordArr = word.split("");

      // Track how many of each letter are "claimed" by green/yellow in this guess,
      // so a gray doesn't wrongly exclude a letter that also appears as green/yellow elsewhere.
      const minCountByLetter: Record<string, number> = {};
      const maxCountByLetter: Record<string, number> = {};

      for (let i = 0; i < guess.length; i++) {
        const { state } = guess[i];
        const letter = guessLetters[i];
        if (state === "correct") {
          if (wordArr[i] !== letter) return false;
          minCountByLetter[letter] = (minCountByLetter[letter] ?? 0) + 1;
        } else if (state === "present") {
          if (wordArr[i] === letter) return false; // present but not in this exact spot
          if (!wordArr.includes(letter)) return false;
          minCountByLetter[letter] = (minCountByLetter[letter] ?? 0) + 1;
        }
      }
      for (let i = 0; i < guess.length; i++) {
        const { state } = guess[i];
        const letter = guessLetters[i];
        if (state === "absent" && minCountByLetter[letter] === undefined) {
          maxCountByLetter[letter] = 0;
        }
      }

      const wordCounts = letterCounts(word);
      for (const [letter, min] of Object.entries(minCountByLetter)) {
        if (wordCounts[letter.charCodeAt(0) - 97] < min) return false;
      }
      for (const [letter, max] of Object.entries(maxCountByLetter)) {
        if (wordCounts[letter.charCodeAt(0) - 97] > max) return false;
      }
    }
    return true;
  });
}

export function scrabbleScore(word: string): number {
  return word
    .toLowerCase()
    .split("")
    .reduce((sum, ch) => sum + (SCRABBLE_POINTS[ch] ?? 0), 0);
}

/** Deterministic shuffle that's guaranteed different from the input when the word has 2+ distinct letters. */
export function scrambleWord(word: string): string {
  const letters = word.split("");
  let attempts = 0;
  let shuffled = letters.join("");
  do {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    shuffled = letters.join("");
    attempts++;
  } while (shuffled === word && attempts < 10 && new Set(word).size > 1);
  return shuffled;
}

export function randomWord(
  dict: DictionaryIndex,
  minLength = 4,
  maxLength = 9,
): string {
  const candidates = dict.words.filter(
    (w) => w.length >= minLength && w.length <= maxLength,
  );
  return candidates[Math.floor(Math.random() * candidates.length)];
}
