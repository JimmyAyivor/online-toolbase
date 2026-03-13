"use client";
import React, { useState, useMemo } from "react";
import { Repeat, Copy, Check, RotateCcw } from "lucide-react";

export default function TextRepeaterClient() {
  const [text, setText] = useState<string>("");
  const [times, setTimes] = useState<number>(3);
  const [separator, setSeparator] = useState<string>("newline");
  const [customSep, setCustomSep] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const sepChar = useMemo((): string => {
    if (separator === "newline") return "\n";
    if (separator === "space") return " ";
    if (separator === "comma") return ", ";
    if (separator === "pipe") return " | ";
    return customSep;
  }, [separator, customSep]);

  const result = useMemo((): string => {
    if (!text.trim() || times < 1) return "";
    return Array(times).fill(text).join(sepChar);
  }, [text, times, sepChar]);

  const handleCopy = async (): Promise<void> => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = (): void => {
    setText("");
    setTimes(3);
    setSeparator("newline");
    setCustomSep("");
  };

  const charCount = result.length;
  const wordCount = result.trim() ? result.trim().split(/\s+/).length : 0;

  const SEPARATORS = [
    { id: "newline", label: "↵ New line" },
    { id: "space", label: "· Space" },
    { id: "comma", label: ", Comma" },
    { id: "pipe", label: "| Pipe" },
    { id: "custom", label: "✎ Custom" },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Repeat className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Text Repeater
            </h2>
            <p className='text-gray-600'>
              Repeat any text multiple times with a custom separator
            </p>
          </div>

          <div className='max-w-xl mx-auto'>
            {/* Text input */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Text to repeat
              </label>
              <textarea
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                placeholder='Enter text here…'
                rows={3}
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none'
              />
            </div>

            {/* Repeat count */}
            <div className='flex items-center gap-4 mb-4'>
              <div className='flex-1'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Repeat{" "}
                  <span className='text-indigo-600 font-bold'>{times}</span>{" "}
                  times
                </label>
                <input
                  type='range'
                  min='1'
                  max='100'
                  value={times}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTimes(Number(e.target.value))
                  }
                  className='w-full accent-indigo-600'
                />
                <div className='flex justify-between text-xs text-gray-400 mt-0.5'>
                  <span>1</span>
                  <span>100</span>
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Exact count
                </label>
                <input
                  type='number'
                  min='1'
                  max='1000'
                  value={times}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTimes(
                      Math.min(1000, Math.max(1, Number(e.target.value))),
                    )
                  }
                  className='w-24 border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center'
                />
              </div>
            </div>

            {/* Separator */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Separator
              </label>
              <div className='flex flex-wrap gap-2'>
                {SEPARATORS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSeparator(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-colors ${
                      separator === s.id
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {separator === "custom" && (
                <input
                  value={customSep}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCustomSep(e.target.value)
                  }
                  placeholder='Enter custom separator…'
                  className='mt-2 w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                />
              )}
            </div>

            {/* Result */}
            {result && (
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='text-sm text-gray-500'>
                    {charCount.toLocaleString()} chars ·{" "}
                    {wordCount.toLocaleString()} words
                  </div>
                  <button
                    onClick={handleCopy}
                    className='flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 transition-colors'
                  >
                    {copied ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      <Copy className='w-4 h-4' />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className='bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm whitespace-pre-wrap max-h-48 overflow-y-auto font-mono'>
                  {result.length > 2000
                    ? result.slice(0, 2000) + "\n…(truncated for display)"
                    : result}
                </div>
              </div>
            )}

            {/* Reset */}
            <button
              onClick={handleReset}
              className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8'
            >
              <RotateCcw className='w-4 h-4' />
              Reset
            </button>

            {/* Tips */}
            <div className='mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600'>
              <p className='font-semibold mb-2'>
                Tips for using Text Repeater:
              </p>
              <ul className='list-disc list-inside space-y-1'>
                <li>
                  Use New line separator to stack each repetition on its own
                  line
                </li>
                <li>
                  The Pipe separator is handy for creating table-style data
                  structures
                </li>
                <li>
                  Use Custom separator for any character, emoji, or string
                  between repeats
                </li>
                <li>
                  You can repeat up to 1000 times — the copy button always grabs
                  the full output
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
