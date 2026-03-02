"use client";
import React, { useState } from "react";
import { Zap, Copy, RotateCcw, RefreshCw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type HookType =
  | "curiosity"
  | "controversy"
  | "story"
  | "value"
  | "fear"
  | "challenge";

interface HookTypeConfig {
  key: HookType;
  label: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const HOOK_TYPES: HookTypeConfig[] = [
  { key: "curiosity", label: "Curiosity", desc: "Make them want to know more" },
  {
    key: "controversy",
    label: "Controversy",
    desc: "Challenge the status quo",
  },
  { key: "story", label: "Story", desc: "Personal journey & transformation" },
  { key: "value", label: "Value", desc: "Promise immediate usefulness" },
  { key: "fear", label: "Fear / Warning", desc: "Alert to a common mistake" },
  { key: "challenge", label: "Challenge", desc: "Invite action or comparison" },
];

const HOOKS: Record<HookType, string[]> = {
  curiosity: [
    "Nobody is talking about this, but {topic} is about to change everything.",
    "I spent {n} years figuring out {topic}. Here is what they do not tell you.",
    "The real reason {topic} works is something most people completely miss.",
    "What if everything you knew about {topic} was wrong?",
    "I tested {topic} for 30 days. The results surprised even me.",
    "This one thing about {topic} changed how I think about everything.",
    "Before you try {topic}, there is something you need to know.",
    "The {topic} secret nobody talks about — until now.",
  ],
  controversy: [
    "Hot take: {topic} is overrated. Here is why.",
    "I am going to say what everyone thinks about {topic} but will not admit.",
    "The {topic} advice you have been given is wrong. Here is the truth.",
    "Everyone gets {topic} backwards. I will explain.",
    "Stop following the {topic} advice from experts. Do this instead.",
    "Controversial opinion: {topic} is holding most people back.",
    "This is the unpopular truth about {topic} that nobody wants to hear.",
  ],
  story: [
    "I almost gave up on {topic}. Then one thing changed everything.",
    "{n} years ago, I knew nothing about {topic}. Here is what happened next.",
    "The moment {topic} clicked for me — and what I wish I had known sooner.",
    "I failed at {topic} {n} times before I figured this out.",
    "How I went from hating {topic} to building my life around it.",
    "A year ago, {topic} felt impossible. Today, it is second nature.",
    "I made every mistake possible with {topic}. Let me save you the time.",
  ],
  value: [
    "{n} things about {topic} that took me years to learn — in 60 seconds.",
    "The complete beginner guide to {topic} — no fluff, just results.",
    "Save this. Everything you need to know about {topic} in one post.",
    "The exact {topic} framework that changed my results.",
    "Stop guessing with {topic}. Here is the step-by-step that actually works.",
    "{n} {topic} tips that sound obvious but most people ignore.",
    "If I had to start {topic} from scratch today, I would do exactly this.",
  ],
  fear: [
    "You are wasting time on {topic} if you are not doing this first.",
    "Most people fail at {topic} because of this one avoidable mistake.",
    "The {topic} mistake that is silently holding you back right now.",
    "Stop before you try {topic}. You need to see this first.",
    "If you are doing {topic} this way, you are doing it wrong.",
    "The {topic} trap that catches 90% of beginners — and how to avoid it.",
    "This is why most people quit {topic} before they see results.",
  ],
  challenge: [
    "I challenged myself to do {topic} every day for 30 days. Here is what happened.",
    "Can you do {topic} for just 7 days? I bet you will be surprised.",
    "What happens when you commit to {topic} for 90 days straight?",
    "Try this {topic} experiment for 24 hours. Your perspective will shift.",
    "{topic} every single day for a week. Here is what I learned.",
    "I dared myself to try {topic} publicly. Here is the honest outcome.",
  ],
};

const NUMS = ["3", "5", "7", "10", "15", "30"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateHooks(topic: string, hookType: HookType): string[] {
  const kw = topic.trim() || "your topic";
  const n = NUMS[Math.floor(Math.random() * NUMS.length)];
  const pool = HOOKS[hookType];

  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map((h) => h.replace("{topic}", kw).replace("{n}", n));
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ViralHookGeneratorClient() {
  const [topic, setTopic] = useState<string>("");
  const [hookType, setHookType] = useState<HookType>("curiosity");
  const [hooks, setHooks] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = (): void => {
    setHooks(generateHooks(topic, hookType));
    setCopied(null);
  };

  const reset = (): void => {
    setTopic("");
    setHookType("curiosity");
    setHooks([]);
    setCopied(null);
  };

  const copyHook = (i: number): void => {
    navigator.clipboard.writeText(hooks[i]);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Zap className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Viral Hook Generator
            </h2>
            <p className='text-gray-600'>
              Create scroll-stopping hooks for any social media platform
            </p>
          </div>

          <div className='space-y-6'>
            {/* Topic */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Your Topic
              </label>
              <input
                type='text'
                value={topic}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTopic(e.target.value)
                }
                placeholder='e.g. productivity, investing, fitness, coding...'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            {/* Hook type */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <div className='flex items-center gap-2 mb-3'>
                <Zap className='w-5 h-5 text-gray-600' />
                <h3 className='font-semibold text-gray-700'>Hook Type</h3>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                {HOOK_TYPES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setHookType(t.key)}
                    title={t.desc}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors border text-left ${
                      hookType === t.key
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {t.label}
                    <div
                      className={`text-xs font-normal mt-0.5 ${
                        hookType === t.key ? "text-indigo-200" : "text-gray-400"
                      }`}
                    >
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={generate}
                className='flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors'
              >
                Generate Hooks
              </button>
              <button
                onClick={reset}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
              >
                <RotateCcw className='w-4 h-4' />
                Reset
              </button>
            </div>

            {/* Results */}
            {hooks.length > 0 && (
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    Generated Hooks
                  </h3>
                  <button
                    onClick={generate}
                    className='flex items-center gap-2 text-sm text-indigo-600 hover:underline'
                  >
                    <RefreshCw className='w-3 h-3' />
                    Regenerate
                  </button>
                </div>
                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                  <table className='w-full'>
                    <thead className='bg-gray-100'>
                      <tr>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700 w-8'>
                          #
                        </th>
                        <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                          Hook
                        </th>
                        <th className='px-4 py-3 text-right text-sm font-semibold text-gray-700'>
                          Copy
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                      {hooks.map((hook, i) => (
                        <tr key={i} className='hover:bg-gray-50'>
                          <td className='px-4 py-3 text-sm text-gray-400'>
                            {i + 1}
                          </td>
                          <td className='px-4 py-3 text-sm font-medium text-gray-800'>
                            {hook}
                          </td>
                          <td className='px-4 py-3 text-right'>
                            <button
                              onClick={() => copyHook(i)}
                              className='flex items-center gap-1 text-sm text-indigo-600 hover:underline ml-auto'
                            >
                              <Copy className='w-3 h-3' />
                              {copied === i ? "Copied!" : "Copy"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Specific topics produce better hooks — &ldquo;intermittent
                fasting for beginners&rdquo; beats just &ldquo;diet&rdquo;
              </li>
              <li>
                Curiosity and Fear hooks tend to perform best for cold audiences
                who do not know you yet
              </li>
              <li>
                Story hooks work especially well on LinkedIn and long-form
                platforms
              </li>
              <li>
                Use the hook as your first sentence — everything else should
                follow from it
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
