"use client";
import React, { useState } from "react";
import { Copy, Check, ArrowLeftRight, RotateCcw } from "lucide-react";

const MORSE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  "'": ".----.",
};
const RMORSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k]),
);

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((c) => (c === " " ? "/" : (MORSE[c] ?? "?")))
    .join(" ");
}
function morseToText(morse: string): string {
  return morse
    .trim()
    .split(" / ")
    .map((word) =>
      word
        .split(" ")
        .map((sym) => RMORSE[sym] ?? "?")
        .join(""),
    )
    .join(" ");
}

export default function MorseCodeTranslatorClient() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = mode === "encode" ? textToMorse(input) : morseToText(input);
  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const dotCount = output.split("").filter((c) => c === ".").length;
  const dashCount = output.split("").filter((c) => c === "-").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mb-4 shadow-lg">
              <span className="text-xl font-black text-white">· −</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Morse Code Translator
            </h2>
            <p className="text-gray-500">
              Convert between text and Morse code instantly
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-6 bg-gray-100 rounded-2xl p-1.5 max-w-xs mx-auto">
            <button
              onClick={() => {
                setMode("encode");
                setInput("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "encode" ? "bg-amber-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              Text → Morse
            </button>
            <button
              onClick={() => {
                setMode("decode");
                setInput("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === "decode" ? "bg-amber-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              Morse → Text
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {mode === "encode" ? "Text input" : "Morse code input"}
              </label>
              <textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
                placeholder={
                  mode === "encode"
                    ? "Type text to encode…"
                    : "Enter Morse code (use spaces between letters, / between words)…"
                }
                rows={7}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
              />
              {mode === "decode" && (
                <p className="text-xs text-gray-400 mt-1">
                  Use spaces between letters, / between words. Example:{" "}
                  <code>... --- ...</code>
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  {mode === "encode" ? "Morse code output" : "Decoded text"}
                </label>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-amber-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="min-h-[168px] bg-gray-900 rounded-xl px-4 py-4 font-mono text-sm text-yellow-300 leading-relaxed break-all overflow-y-auto">
                {output || (
                  <span className="text-gray-600">Output appears here…</span>
                )}
              </div>
              {output && mode === "encode" && (
                <div className="flex gap-3 mt-3">
                  <div className="flex-1 bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-center">
                    <p className="text-xl font-black text-yellow-700">
                      {dotCount}
                    </p>
                    <p className="text-xs text-gray-500">Dots (·)</p>
                  </div>
                  <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                    <p className="text-xl font-black text-amber-700">
                      {dashCount}
                    </p>
                    <p className="text-xs text-gray-500">Dashes (−)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setInput("")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors mt-6 mb-4"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>

          {/* Reference */}
          <details className="mt-2">
            <summary className="text-sm font-semibold text-gray-500 cursor-pointer hover:text-amber-600 transition-colors">
              Show Morse code reference chart
            </summary>
            <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-1.5">
              {Object.entries(MORSE)
                .slice(0, 36)
                .map(([char, code]) => (
                  <div
                    key={char}
                    className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-1.5 text-center"
                  >
                    <p className="font-black text-gray-800 text-sm">{char}</p>
                    <p className="font-mono text-xs text-amber-600">{code}</p>
                  </div>
                ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
