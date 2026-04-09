"use client";
import React, { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

const FLIP_MAP: Record<string, string> = {
  a: "ɐ",
  b: "q",
  c: "ɔ",
  d: "p",
  e: "ǝ",
  f: "ɟ",
  g: "ƃ",
  h: "ɥ",
  i: "ᴉ",
  j: "ɾ",
  k: "ʞ",
  l: "l",
  m: "ɯ",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "ɹ",
  s: "s",
  t: "ʇ",
  u: "n",
  v: "ʌ",
  w: "ʍ",
  x: "x",
  y: "ʎ",
  z: "z",
  A: "∀",
  B: "𐐒",
  C: "Ɔ",
  D: "ᗡ",
  E: "Ǝ",
  F: "Ⅎ",
  G: "פ",
  H: "H",
  I: "I",
  J: "ſ",
  K: "ʞ",
  L: "˥",
  M: "W",
  N: "N",
  O: "O",
  P: "Ԁ",
  Q: "Q",
  R: "ᴚ",
  S: "S",
  T: "┴",
  U: "∩",
  V: "Λ",
  W: "M",
  X: "X",
  Y: "⅄",
  Z: "Z",
  "0": "0",
  "1": "Ɩ",
  "2": "ᄅ",
  "3": "Ɛ",
  "4": "ㄣ",
  "5": "ϛ",
  "6": "9",
  "7": "ㄥ",
  "8": "8",
  "9": "6",
  "!": "¡",
  "?": "¿",
  ",": "'",
  "'": ",",
  " ": " ",
  ".": "˙",
};

function flipText(text: string): string {
  return text
    .split("")
    .map((c) => FLIP_MAP[c] ?? c)
    .reverse()
    .join("");
}
function reverseText(text: string): string {
  return text.split("").reverse().join("");
}
function mirrorText(text: string): string {
  return text + " " + text.split("").reverse().join("");
}
function strikethrough(text: string): string {
  return text.split("").join("\u0336") + "\u0336";
}
function bold(text: string): string {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90)
      return String.fromCodePoint(0x1d400 + code - 65);
    return String.fromCodePoint(0x1d41a + code - 97);
  });
}

const TRANSFORMS = [
  { id: "flip", label: "🙃 Upside down", fn: flipText },
  { id: "reverse", label: "⬅️ Reversed", fn: reverseText },
  { id: "mirror", label: "🪞 Mirror", fn: mirrorText },
  { id: "strike", label: "~~Strikethrough~~", fn: strikethrough },
  { id: "bold", label: "𝐁𝐨𝐥𝐝", fn: bold },
];

export default function FlipTextGeneratorClient() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl rotate-180 inline-block">A</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Flip Text Generator
            </h2>
            <p className="text-gray-500">
              Flip, reverse, mirror, and stylise any text instantly
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter your text
            </label>
            <textarea
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
              placeholder="Type or paste text here…"
              rows={4}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {input ? (
            <div className="space-y-3">
              {TRANSFORMS.map(({ id, label, fn }) => {
                const result = fn(input);
                return (
                  <div
                    key={id}
                    className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {label}
                      </p>
                      <p className="text-gray-800 font-medium text-base leading-relaxed break-all">
                        {result}
                      </p>
                    </div>
                    <button
                      onClick={() => copy(result, id)}
                      className="shrink-0 text-gray-300 hover:text-purple-600 transition-colors mt-1"
                    >
                      {copied === id ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-purple-50 rounded-2xl border-2 border-dashed border-purple-200">
              <p className="text-purple-400 text-sm font-medium">
                ¡Type something to see it flipped!
              </p>
            </div>
          )}

          <button
            onClick={() => setInput("")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              💡 Uses for flipped text:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Social media bios and posts for a unique visual style</li>
              <li>
                Creative messages, puzzles, and Easter eggs in digital content
              </li>
              <li>Instagram, Twitter, Discord, and WhatsApp profile names</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
