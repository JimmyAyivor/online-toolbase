export interface PlacedWord {
  word: string;
  row: number;
  col: number;
  dRow: number;
  dCol: number;
}

export interface WordSearchGrid {
  size: number;
  cells: string[][];
  placed: PlacedWord[];
  notPlaced: string[];
}

const DIRECTIONS: [number, number][] = [
  [0, 1], // right
  [1, 0], // down
  [1, 1], // down-right
  [-1, 1], // up-right
  [0, -1], // left
  [-1, 0], // up
  [-1, -1], // up-left
  [1, -1], // down-left
];

export function generateWordSearch(
  words: string[],
  opts: {
    size?: number;
    allowBackwards?: boolean;
    allowDiagonals?: boolean;
  } = {},
): WordSearchGrid {
  const cleanWords = Array.from(
    new Set(
      words.map((w) => w.toUpperCase().replace(/[^A-Z]/g, "")).filter(Boolean),
    ),
  ).sort((a, b) => b.length - a.length); // place longest first — easiest to fit

  const longest = Math.max(...cleanWords.map((w) => w.length), 0);
  const size =
    opts.size ??
    Math.max(
      10,
      longest + 2,
      Math.ceil(Math.sqrt(cleanWords.join("").length * 2.2)),
    );

  let directions = DIRECTIONS.slice(0, opts.allowDiagonals === false ? 2 : 8);
  if (opts.allowBackwards === false) {
    directions = directions.filter(
      ([dr, dc]) => !(dr < 0 || (dr === 0 && dc < 0)),
    );
  }

  const grid: (string | null)[][] = Array.from({ length: size }, () =>
    Array(size).fill(null),
  );
  const placed: PlacedWord[] = [];
  const notPlaced: string[] = [];

  const fits = (
    word: string,
    row: number,
    col: number,
    dRow: number,
    dCol: number,
  ): boolean => {
    for (let i = 0; i < word.length; i++) {
      const r = row + dRow * i;
      const c = col + dCol * i;
      if (r < 0 || r >= size || c < 0 || c >= size) return false;
      const existing = grid[r][c];
      if (existing !== null && existing !== word[i]) return false;
    }
    return true;
  };

  const place = (
    word: string,
    row: number,
    col: number,
    dRow: number,
    dCol: number,
  ) => {
    for (let i = 0; i < word.length; i++) {
      grid[row + dRow * i][col + dCol * i] = word[i];
    }
    placed.push({ word, row, col, dRow, dCol });
  };

  for (const word of cleanWords) {
    if (word.length > size) {
      notPlaced.push(word);
      continue;
    }
    const attempts = shuffle(
      Array.from(
        { length: size * size },
        (_, idx) => [Math.floor(idx / size), idx % size] as [number, number],
      ),
    );
    const shuffledDirs = shuffle(directions);

    let didPlace = false;
    outer: for (const [row, col] of attempts) {
      for (const [dRow, dCol] of shuffledDirs) {
        if (fits(word, row, col, dRow, dCol)) {
          place(word, row, col, dRow, dCol);
          didPlace = true;
          break outer;
        }
      }
    }
    if (!didPlace) notPlaced.push(word);
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cells: string[][] = grid.map((row) =>
    row.map(
      (cell) => cell ?? alphabet[Math.floor(Math.random() * alphabet.length)],
    ),
  );

  return { size, cells, placed, notPlaced };
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
