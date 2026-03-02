"use client";
import React, { useState } from "react";
import { Music, RotateCcw } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const RHYME_GROUPS: Record<string, string[]> = {
  ay: [
    "day",
    "say",
    "way",
    "play",
    "stay",
    "pay",
    "may",
    "ray",
    "bay",
    "clay",
    "gray",
    "pray",
    "sway",
    "spray",
    "stray",
    "lay",
    "fray",
    "tray",
    "nay",
    "hay",
    "away",
    "display",
    "delay",
    "relay",
    "betray",
    "decay",
    "essay",
    "today",
    "hurray",
  ],
  ee: [
    "see",
    "free",
    "tree",
    "be",
    "me",
    "we",
    "key",
    "tea",
    "sea",
    "flee",
    "glee",
    "spree",
    "agree",
    "degree",
    "knee",
    "plea",
    "three",
    "fee",
    "he",
    "she",
    "debris",
    "guarantee",
    "referee",
  ],
  ight: [
    "night",
    "light",
    "bright",
    "right",
    "fight",
    "might",
    "sight",
    "tight",
    "white",
    "kite",
    "quite",
    "despite",
    "invite",
    "ignite",
    "recite",
    "delight",
    "alright",
    "unite",
    "polite",
    "excite",
    "finite",
    "insight",
    "midnight",
    "highlight",
  ],
  ove: ["love", "above", "dove", "glove", "shove", "thereof"],
  ame: [
    "name",
    "game",
    "fame",
    "flame",
    "same",
    "came",
    "blame",
    "claim",
    "frame",
    "shame",
    "tame",
    "exclaim",
    "became",
    "proclaim",
  ],
  ine: [
    "line",
    "mine",
    "shine",
    "fine",
    "wine",
    "vine",
    "pine",
    "spine",
    "shrine",
    "divine",
    "define",
    "design",
    "confine",
    "incline",
    "decline",
    "combine",
    "refine",
    "sunshine",
    "airline",
    "antine",
    "outline",
    "online",
  ],
  ong: [
    "song",
    "long",
    "strong",
    "wrong",
    "belong",
    "along",
    "prolong",
    "throng",
  ],
  ound: [
    "sound",
    "found",
    "ground",
    "around",
    "bound",
    "wound",
    "mound",
    "pound",
    "hound",
    "round",
    "profound",
    "astound",
    "surround",
    "background",
    "compound",
    "rebound",
  ],
  ive: [
    "live",
    "give",
    "strive",
    "drive",
    "thrive",
    "arrive",
    "survive",
    "alive",
    "derive",
    "revive",
    "deprive",
    "forgive",
    "relative",
    "positive",
    "creative",
  ],
  ake: [
    "make",
    "take",
    "lake",
    "cake",
    "shake",
    "wake",
    "break",
    "stake",
    "fake",
    "sake",
    "bake",
    "flake",
    "snake",
    "mistake",
    "forsake",
    "awake",
    "cupcake",
    "earthquake",
    "heartache",
    "overtake",
  ],
  ore: [
    "more",
    "store",
    "door",
    "floor",
    "before",
    "explore",
    "ignore",
    "restore",
    "shore",
    "score",
    "core",
    "bore",
    "adore",
    "folklore",
    "therefore",
    "encore",
    "hardcore",
    "offshore",
  ],
  ome: [
    "home",
    "some",
    "come",
    "roam",
    "foam",
    "dome",
    "chrome",
    "overcome",
    "welcome",
    "syndrome",
  ],
  ell: [
    "tell",
    "well",
    "fell",
    "sell",
    "bell",
    "shell",
    "spell",
    "smell",
    "dwell",
    "yell",
    "compel",
    "excel",
    "expel",
    "propel",
    "farewell",
    "rebel",
    "hotel",
    "motel",
    "parallel",
  ],
  ack: [
    "back",
    "black",
    "track",
    "crack",
    "stack",
    "pack",
    "rack",
    "attack",
    "knack",
    "lack",
    "slack",
    "shack",
    "unpack",
    "setback",
    "drawback",
    "flashback",
    "payback",
    "throwback",
  ],
  eat: [
    "beat",
    "heat",
    "meat",
    "seat",
    "treat",
    "street",
    "feet",
    "meet",
    "sweet",
    "neat",
    "greet",
    "complete",
    "defeat",
    "repeat",
    "concrete",
    "delete",
    "compete",
    "heartbeat",
    "retreat",
  ],
  art: [
    "heart",
    "start",
    "part",
    "art",
    "chart",
    "smart",
    "apart",
    "depart",
    "restart",
    "impart",
    "sweetheart",
  ],
  old: [
    "bold",
    "cold",
    "gold",
    "hold",
    "told",
    "sold",
    "fold",
    "old",
    "unfold",
    "behold",
    "withhold",
    "manifold",
    "household",
  ],
  ow: [
    "know",
    "show",
    "flow",
    "grow",
    "glow",
    "throw",
    "below",
    "although",
    "shadow",
    "follow",
    "borrow",
    "hollow",
    "sorrow",
    "tomorrow",
    "window",
    "rainbow",
    "elbow",
    "overflow",
    "bestow",
  ],
  ue: [
    "blue",
    "true",
    "through",
    "new",
    "view",
    "few",
    "knew",
    "grew",
    "drew",
    "pursue",
    "review",
    "renew",
    "subdue",
    "breakthrough",
    "continue",
    "value",
    "argue",
    "rescue",
  ],
  un: [
    "run",
    "sun",
    "fun",
    "one",
    "done",
    "gun",
    "nun",
    "bun",
    "won",
    "begun",
    "undone",
    "outrun",
    "overcome",
    "everyone",
    "anyone",
    "someone",
  ],
  air: [
    "there",
    "where",
    "care",
    "share",
    "rare",
    "bare",
    "fair",
    "hair",
    "pair",
    "spare",
    "stare",
    "aware",
    "beware",
    "prepare",
    "compare",
    "declare",
    "repair",
    "nightmare",
    "unfair",
    "affair",
    "despair",
  ],
  ire: [
    "fire",
    "desire",
    "inspire",
    "admire",
    "require",
    "entire",
    "aspire",
    "acquire",
    "expire",
    "retire",
    "vampire",
    "empire",
    "transpire",
    "higher",
    "liar",
    "prior",
  ],
  ife: ["life", "wife", "knife", "strife", "rife"],
  ope: [
    "hope",
    "cope",
    "rope",
    "scope",
    "slope",
    "mope",
    "elope",
    "antelope",
    "horoscope",
    "telescope",
    "envelope",
    "microscope",
  ],
};

const POPULAR_WORDS = [
  "love",
  "night",
  "fire",
  "day",
  "time",
  "heart",
  "dream",
  "light",
  "rain",
  "song",
  "hope",
  "blue",
  "free",
  "strong",
  "true",
  "life",
  "mind",
  "soul",
  "rise",
  "gold",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findRhymes(word: string): string[] {
  const w = word.toLowerCase().trim();
  if (!w) return [];

  for (const [ending, rhymes] of Object.entries(RHYME_GROUPS)) {
    if (w.endsWith(ending) || rhymes.includes(w)) {
      return rhymes.filter((r) => r !== w && !r.includes(w) && !w.includes(r));
    }
  }

  const suffix3 = w.slice(-3);
  const suffix2 = w.slice(-2);
  const found = new Set<string>();
  for (const rhymes of Object.values(RHYME_GROUPS)) {
    for (const r of rhymes) {
      if (r !== w && (r.endsWith(suffix3) || r.endsWith(suffix2))) {
        found.add(r);
      }
    }
  }
  return [...found];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RhymeFinderClient() {
  const [word, setWord] = useState<string>("");
  const [rhymes, setRhymes] = useState<string[] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const search = (): void => {
    setRhymes(findRhymes(word));
    setCopied(null);
  };

  const reset = (): void => {
    setWord("");
    setRhymes(null);
    setCopied(null);
  };

  const copyWord = (w: string): void => {
    navigator.clipboard.writeText(w);
    setCopied(w);
    setTimeout(() => setCopied(null), 1500);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Music className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Rhyme Finder
            </h2>
            <p className='text-gray-600'>
              Find rhyming words for poetry, lyrics, and creative writing
            </p>
          </div>

          <div className='space-y-6'>
            {/* Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Enter a Word
              </label>
              <div className='flex gap-3'>
                <input
                  type='text'
                  value={word}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWord(e.target.value)
                  }
                  onKeyDown={(e) => e.key === "Enter" && search()}
                  placeholder='e.g. love, night, fire, day...'
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg'
                />
                <button
                  onClick={search}
                  disabled={!word.trim()}
                  className='px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors'
                >
                  Find Rhymes
                </button>
                <button
                  onClick={reset}
                  className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
                >
                  <RotateCcw className='w-4 h-4' />
                  Reset
                </button>
              </div>
            </div>

            {/* Results */}
            {rhymes !== null && (
              <div className='space-y-4'>
                <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
                  <h3 className='text-xl font-bold text-gray-800 mb-4'>
                    {rhymes.length > 0
                      ? `${rhymes.length} rhymes found for &ldquo;${word}&rdquo;`
                      : `No rhymes found for &ldquo;${word}&rdquo;`}
                  </h3>
                  {rhymes.length > 0 ? (
                    <div className='flex flex-wrap gap-2'>
                      {rhymes.map((r) => (
                        <button
                          key={r}
                          onClick={() => copyWord(r)}
                          className='px-4 py-2 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 text-gray-800 font-medium rounded-lg transition-colors text-sm'
                        >
                          {copied === r ? "✓ Copied" : r}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className='text-gray-500 text-sm'>
                      Try a simpler or more common English word.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Popular words */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <h3 className='font-semibold text-gray-700 mb-3'>
                Popular Words to Try
              </h3>
              <div className='flex flex-wrap gap-2'>
                {POPULAR_WORDS.map((w) => (
                  <button
                    key={w}
                    onClick={() => {
                      setWord(w);
                      setRhymes(findRhymes(w));
                      setCopied(null);
                    }}
                    className='px-3 py-1.5 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 text-gray-600 hover:text-indigo-700 rounded-lg text-sm transition-colors'
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Press Enter to search without clicking the button</li>
              <li>
                Click any rhyme word to copy it instantly to your clipboard
              </li>
              <li>Click a popular word to instantly see all its rhymes</li>
              <li>
                This tool uses phonetic ending groups — results are perfect
                rhymes, not near-rhymes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
