"use client";
import React, { useState } from "react";
import { MessageSquare, Copy, RotateCcw, RefreshCw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tone = "fun" | "professional" | "inspirational" | "casual";
type Platform = "instagram" | "linkedin" | "tiktok" | "twitter" | "facebook";

// ─── Constants ───────────────────────────────────────────────────────────────

const TONES: { key: Tone; label: string }[] = [
  { key: "fun", label: "Fun 😄" },
  { key: "professional", label: "Professional 💼" },
  { key: "inspirational", label: "Inspirational 🌟" },
  { key: "casual", label: "Casual ☕" },
];

const PLATFORMS: { key: Platform; label: string }[] = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "tiktok", label: "TikTok" },
  { key: "twitter", label: "X / Twitter" },
  { key: "facebook", label: "Facebook" },
];

const TEMPLATES: Record<Tone, string[]> = {
  fun: [
    "Living my best life ✨ {topic} never felt this good.",
    "Not me absolutely obsessing over {topic} again 😅",
    "Plot twist: {topic} was the answer all along 🙌",
    "Me, {topic}, and zero regrets. That is the whole story.",
    "POV: you discover {topic} and your life changes forever 🔥",
    "The {topic} era has officially begun. And I am not sorry.",
    "{topic} hits different when you stop overthinking it 🤌",
  ],
  professional: [
    "Excited to share our latest work on {topic}. Here is what we learned.",
    "Proud moment: {topic} is now live. A big thank you to our team.",
    "Reflecting on {topic} and the impact it has had on our approach.",
    "We are constantly learning from {topic}. Here is our key takeaway.",
    "Our work on {topic} reinforced something important about how we operate.",
    "Here is what {topic} taught us — and why it matters.",
  ],
  inspirational: [
    "Every great journey starts with one step. Today, that step is {topic}.",
    "{topic} is not just a moment. It is a mindset.",
    "Progress looks like {topic}. Keep going.",
    "Small things, done consistently. That is what {topic} is all about.",
    "Growth requires discomfort. {topic} is how it happens.",
    "Today's effort is tomorrow's result. {topic} is worth it.",
  ],
  casual: [
    "Just your regular reminder that {topic} is worth your time.",
    "{topic} and good vibes only today.",
    "Grateful for {topic} and everything it has brought.",
    "Another day, another reason to appreciate {topic}.",
    "Not overthinking it. Just enjoying {topic}.",
    "Here for the {topic}, staying for everything else.",
  ],
};

const HASHTAGS: Record<Platform, string> = {
  instagram: "#instagood #photooftheday #content #lifestyle #explore #trending",
  linkedin: "#professional #leadership #growth #innovation #business",
  tiktok: "#fyp #foryou #trending #viral #foryoupage",
  twitter: "#trending",
  facebook: "#community #share",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateCaptions(
  topic: string,
  tone: Tone,
  platform: Platform,
): string[] {
  const kw = topic.trim() || "this moment";
  const tags = HASHTAGS[platform];
  const pool = TEMPLATES[tone];

  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map((t) => {
      const caption = t.replace("{topic}", kw);
      return platform !== "twitter" ? `${caption}\n\n${tags}` : caption;
    });
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CaptionGeneratorClient() {
  const [topic, setTopic] = useState<string>("");
  const [tone, setTone] = useState<Tone>("fun");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [captions, setCaptions] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = (): void => {
    setCaptions(generateCaptions(topic, tone, platform));
    setCopied(null);
  };

  const reset = (): void => {
    setTopic("");
    setTone("fun");
    setPlatform("instagram");
    setCaptions([]);
    setCopied(null);
  };

  const copyCaption = (i: number): void => {
    navigator.clipboard.writeText(captions[i]);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <MessageSquare className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Caption Generator
            </h2>
            <p className="text-gray-600">
              Generate engaging captions for photos and social media posts
            </p>
          </div>

          <div className="space-y-6">
            {/* Topic input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What Is Your Post About?
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTopic(e.target.value)
                }
                placeholder="e.g. a product launch, a trip, a personal milestone..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Options */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setTone(t.key)}
                        className={`py-2 rounded-lg font-semibold text-sm transition-colors border ${
                          tone === t.key
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p.key}
                        onClick={() => setPlatform(p.key)}
                        className={`py-1.5 px-3 rounded-lg font-semibold text-sm transition-colors border ${
                          platform === p.key
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generate}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Generate Captions
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Results */}
            {captions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Generated Captions
                  </h3>
                  <button
                    onClick={generate}
                    className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Regenerate
                  </button>
                </div>
                {captions.map((caption, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-3">
                      {caption}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {caption.length} characters
                      </span>
                      <button
                        onClick={() => copyCaption(i)}
                        className="flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                      >
                        <Copy className="w-3 h-3" />
                        {copied === i ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Be specific with your topic — &ldquo;product launch for my
                skincare brand&rdquo; beats just &ldquo;product&rdquo;
              </li>
              <li>
                Platform hashtags are automatically tailored — Twitter gets
                fewer tags than Instagram
              </li>
              <li>
                Hit Regenerate to get a fresh set of captions from the same
                settings
              </li>
              <li>
                Mix tones — try the same topic as Professional and Fun to see
                which fits better
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
