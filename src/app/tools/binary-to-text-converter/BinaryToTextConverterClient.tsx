"use client";
import React, { useState } from "react";
import { Binary, ArrowLeftRight, Copy, Check, RotateCcw } from "lucide-react";

type Mode = "binaryToText" | "textToBinary";

function textToBinary(text: string): string {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(binary: string): { result: string; error: string } {
  const cleaned = binary.trim().replace(/[^01\s]/g, "");
  const groups = cleaned.split(/\s+/).filter(Boolean);

  if (groups.some((g) => g.length !== 8)) {
    return {
      result: "",
      error:
        "Each binary group must be exactly 8 bits (e.g. 01001000). Check your input.",
    };
  }

  try {
    const result = groups
      .map((g) => String.fromCharCode(parseInt(g, 2)))
      .join("");
    return { result, error: "" };
  } catch {
    return { result: "", error: "Could not decode — check your binary input." };
  }
}

export default function BinaryToTextConverterClient() {
  const [mode, setMode] = useState<Mode>("binaryToText");
  const [input, setInput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleReset = (): void => {
    setInput("");
  };

  const output: string = (() => {
    if (!input.trim()) return "";
    if (mode === "binaryToText") return binaryToText(input).result;
    return textToBinary(input);
  })();

  const error: string = (() => {
    if (!input.trim() || mode === "textToBinary") return "";
    return binaryToText(input).error;
  })();

  const handleCopy = async (): Promise<void> => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = (): void => {
    setMode((m) => (m === "binaryToText" ? "textToBinary" : "binaryToText"));
    setInput(output);
  };

  const charCount = output.length;
  const bitCount =
    mode === "textToBinary"
      ? input.replace(/\s/g, "").length * 8
      : output.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Binary className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Binary to Text Converter
            </h2>
            <p className="text-gray-600">
              Convert binary code to text and text to binary instantly
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={() => {
                setMode("binaryToText");
                setInput("");
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${
                mode === "binaryToText"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
              }`}
            >
              Binary → Text
            </button>
            <button
              onClick={handleSwap}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-600 transition-colors"
              title="Swap direction and use output as input"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMode("textToBinary");
                setInput("");
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${
                mode === "textToBinary"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
              }`}
            >
              Text → Binary
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {mode === "binaryToText" ? "Binary input" : "Text input"}
              </label>
              <textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
                placeholder={
                  mode === "binaryToText"
                    ? "e.g. 01001000 01100101 01101100 01101100 01101111"
                    : "e.g. Hello, World!"
                }
                rows={8}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
              />
            </div>

            {/* Output */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {mode === "binaryToText" ? "Text output" : "Binary output"}
                </label>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
              <div
                className={`w-full min-h-[196px] border-2 rounded-lg px-4 py-3 font-mono text-sm whitespace-pre-wrap break-all ${
                  error
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}
              >
                {error || output || (
                  <span className="text-gray-400">
                    Output will appear here…
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          {output && !error && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                {
                  label: "Input characters",
                  value: input.trim().length.toLocaleString(),
                },
                {
                  label: "Output characters",
                  value: charCount.toLocaleString(),
                },
                {
                  label:
                    mode === "textToBinary" ? "Total bits" : "Decoded chars",
                  value:
                    mode === "textToBinary"
                      ? (input.trim().length * 8).toLocaleString()
                      : output.length.toLocaleString(),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center"
                >
                  <div className="text-2xl font-bold text-indigo-700">
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Quick example */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-500">Try an example:</span>
            <button
              onClick={() => {
                setMode("binaryToText");
                setInput("01001000 01100101 01101100 01101100 01101111");
              }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-lg text-sm transition-colors border border-gray-200"
            >
              "Hello" in binary
            </button>
            <button
              onClick={() => {
                setMode("textToBinary");
                setInput("Hello");
              }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-lg text-sm transition-colors border border-gray-200"
            >
              "Hello" to binary
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          {/* Tips */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">
              Understanding binary conversion:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Binary groups must be exactly 8 bits each, separated by spaces
              </li>
              <li>Each 8-bit group represents one ASCII character (0–255)</li>
              <li>
                Use the swap button to instantly convert output back to input
              </li>
              <li>
                Special characters and punctuation are fully supported in both
                directions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
