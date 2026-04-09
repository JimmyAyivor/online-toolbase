"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  RefreshCw,
  List,
  Hash,
  AlignLeft,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type GenerateType = "paragraphs" | "sentences" | "words" | "lists";

interface Preset {
  label: string;
  subtext: string;
  type: GenerateType;
  count: number;
}

interface StatCard {
  icon: React.ReactNode;
  value: number;
  label: string;
  bgColor: string;
  textColor: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const LOREM_WORDS: readonly string[] = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "suspendisse",
  "potenti",
  "viverra",
  "accumsan",
  "tincidunt",
  "integer",
  "vitae",
  "justo",
  "eget",
  "mauris",
  "pharetra",
  "sollicitudin",
  "aliquam",
  "faucibus",
  "purus",
  "massa",
  "nunc",
  "pulvinar",
  "sapien",
  "ligula",
  "ultrices",
  "malesuada",
  "proin",
  "libero",
  "interdum",
  "varius",
  "elementum",
] as const;

const TYPE_BUTTONS: Array<{ id: GenerateType; label: string }> = [
  { id: "paragraphs", label: "Paragraphs" },
  { id: "sentences", label: "Sentences" },
  { id: "words", label: "Words" },
  { id: "lists", label: "Lists" },
];

const PRESETS: Preset[] = [
  {
    label: "Short Article",
    subtext: "3 paragraphs",
    type: "paragraphs",
    count: 3,
  },
  {
    label: "Medium Article",
    subtext: "5 paragraphs",
    type: "paragraphs",
    count: 5,
  },
  {
    label: "Description",
    subtext: "10 sentences",
    type: "sentences",
    count: 10,
  },
  { label: "Brief Text", subtext: "50 words", type: "words", count: 50 },
];

function maxCount(type: GenerateType): number {
  if (type === "words") return 200;
  if (type === "sentences") return 20;
  return 10;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)] ?? "lorem";
}

function generateSentence(minWords = 8, maxWords = 15): string {
  const n = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words = Array.from({ length: n }, (_, i) => {
    const w = randomWord();
    return i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w;
  });
  return words.join(" ") + ".";
}

function generateParagraph(minSentences = 4, maxSentences = 7): string {
  const n =
    Math.floor(Math.random() * (maxSentences - minSentences + 1)) +
    minSentences;
  return Array.from({ length: n }, () => generateSentence()).join(" ");
}

function generateText(
  type: GenerateType,
  count: number,
  startWithLorem: boolean,
): string {
  let parts: string[];

  switch (type) {
    case "paragraphs":
      parts = Array.from({ length: count }, () => generateParagraph());
      break;
    case "sentences":
      parts = Array.from({ length: count }, () => generateSentence());
      break;
    case "words": {
      const words = Array.from({ length: count }, randomWord);
      parts = [words.join(" ") + "."];
      break;
    }
    case "lists":
      parts = Array.from({ length: count }, () => `• ${generateSentence()}`);
      break;
  }

  let output = parts.join("\n\n");

  if (startWithLorem && type !== "lists") {
    const spaceIdx = output.indexOf(" ");
    output =
      spaceIdx !== -1 ? "Lorem ipsum " + output.slice(spaceIdx + 1) : output;
  }

  return output;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function LoremIpsumGeneratorClient() {
  const [outputText, setOutputText] = useState<string>("");
  const [type, setType] = useState<GenerateType>("paragraphs");
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const regenerate = useCallback((): void => {
    setOutputText(generateText(type, count, startWithLorem));
  }, [type, count, startWithLorem]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (): void => {
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "lorem-ipsum.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const applyPreset = (preset: Preset): void => {
    setType(preset.type);
    setCount(preset.count);
  };

  const wordCount = outputText.trim()
    ? outputText.trim().split(/\s+/).length
    : 0;
  const charCount = outputText.length;
  const sentenceCount = outputText
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;

  const STAT_CARDS: StatCard[] = [
    {
      icon: <Hash className="w-5 h-5 text-amber-600" />,
      value: wordCount,
      label: "Words",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      icon: <FileText className="w-5 h-5 text-orange-600" />,
      value: charCount,
      label: "Characters",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: <List className="w-5 h-5 text-yellow-600" />,
      value: sentenceCount,
      label: "Sentences",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
  ];

  const rangeMax = maxCount(type);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Lorem Ipsum Generator
          </h2>
          <p className="text-gray-600">
            Generate placeholder text for your designs and mockups
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Output column ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-xl">
                  <AlignLeft className="w-6 h-6 text-amber-600" />
                  Generated Text
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={regenerate}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    aria-label="Download text"
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 min-h-[400px] border-2 border-gray-200">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                  {outputText}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {STAT_CARDS.map(
                  ({ icon, value, label, bgColor, textColor }) => (
                    <div
                      key={label}
                      className={`${bgColor} rounded-xl p-4 text-center`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {icon}
                        <div className={`text-2xl font-bold ${textColor}`}>
                          {value}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{label}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* ── Settings sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <List className="w-5 h-5 text-amber-600" />
                Settings
              </h3>

              <div className="space-y-6">
                {/* Type buttons */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Generate
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {TYPE_BUTTONS.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => {
                          setType(id);
                          setCount(Math.min(count, maxCount(id)));
                        }}
                        className={`p-3 rounded-xl font-semibold transition-all ${
                          type === id
                            ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Count slider */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Count: {count}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={rangeMax}
                    value={count}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCount(parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gradient-to-r from-amber-200 to-orange-300 rounded-lg appearance-none cursor-pointer"
                    aria-label="Count"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1</span>
                    <span>{rangeMax}</span>
                  </div>
                </div>

                {/* Start with Lorem */}
                <div>
                  <label className="flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl cursor-pointer hover:shadow-md transition-all">
                    <input
                      type="checkbox"
                      checked={startWithLorem}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setStartWithLorem(e.target.checked)
                      }
                      className="w-5 h-5 text-amber-600 rounded"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Start with &ldquo;Lorem ipsum&rdquo;
                      </div>
                      <div className="text-xs text-gray-600">
                        Classic placeholder text beginning
                      </div>
                    </div>
                  </label>
                </div>

                {/* Presets */}
                <div className="pt-4 border-t-2 border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">
                    Quick Presets
                  </h4>
                  <div className="space-y-2">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => applyPreset(preset)}
                        className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="font-semibold text-gray-900 text-sm">
                          {preset.label}
                        </div>
                        <div className="text-xs text-gray-600">
                          {preset.subtext}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
              <p className="font-semibold mb-2 text-gray-800">💡 Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Use Paragraphs mode for body text — each paragraph is 4–7
                  sentences
                </li>
                <li>
                  Use Sentences for individual UI copy placeholders like
                  descriptions and tooltips
                </li>
                <li>
                  Use Words to fill a specific character or word budget in a
                  design mockup
                </li>
                <li>
                  Use Lists to prototype bullet-point UI components and
                  navigation items
                </li>
                <li>
                  Enable "Start with Lorem ipsum" to match the traditional
                  placeholder format
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
