"use client";
import React, { useState, useMemo } from "react";
import { ClipboardCheck, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CheckItem {
  id: string;
  category: string;
  label: string;
  detail: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CHECKLIST: CheckItem[] = [
  // Profile Basics
  {
    id: "pb1",
    category: "Profile Basics",
    label: "Profile photo is high quality",
    detail: "Clear, well-lit headshot or brand logo at correct dimensions.",
  },
  {
    id: "pb2",
    category: "Profile Basics",
    label: "Username is consistent across platforms",
    detail: "Same or very similar handle everywhere for brand recognition.",
  },
  {
    id: "pb3",
    category: "Profile Basics",
    label: "Bio clearly explains who you are",
    detail: "Within the first two lines a visitor should know what you do.",
  },
  {
    id: "pb4",
    category: "Profile Basics",
    label: "Bio includes a call to action",
    detail: "e.g. link to website, free resource, or contact method.",
  },
  {
    id: "pb5",
    category: "Profile Basics",
    label: "Link in bio is working and up to date",
    detail: "Check it is not broken and leads to the right destination.",
  },
  {
    id: "pb6",
    category: "Profile Basics",
    label: "Contact information is accessible",
    detail: "Email, phone, or booking link is easy to find.",
  },
  // Content Quality
  {
    id: "cq1",
    category: "Content Quality",
    label: "Posts use consistent visual style",
    detail: "Colours, fonts, and filters match your brand palette.",
  },
  {
    id: "cq2",
    category: "Content Quality",
    label: "Captions are engaging, not just descriptive",
    detail: "Ask questions, use hooks, or tell a story.",
  },
  {
    id: "cq3",
    category: "Content Quality",
    label: "Content provides value to the audience",
    detail:
      "Educational, entertaining, or inspirational — not just promotional.",
  },
  {
    id: "cq4",
    category: "Content Quality",
    label: "You post at least 3 times per week",
    detail: "Consistency signals activity and keeps the algorithm happy.",
  },
  {
    id: "cq5",
    category: "Content Quality",
    label: "Videos include captions or subtitles",
    detail: "80%+ of video is watched on mute — captions increase reach.",
  },
  {
    id: "cq6",
    category: "Content Quality",
    label: "Images are original or properly licensed",
    detail: "Avoid stock photos that look generic or unrelated to your brand.",
  },
  // Engagement
  {
    id: "en1",
    category: "Engagement",
    label: "You reply to comments within 24 hours",
    detail: "Replies increase post visibility in the algorithm.",
  },
  {
    id: "en2",
    category: "Engagement",
    label: "You engage with others in your niche",
    detail: "Leave meaningful comments on relevant accounts daily.",
  },
  {
    id: "en3",
    category: "Engagement",
    label: "Stories are posted regularly",
    detail: "Daily stories keep followers seeing you at the top of their feed.",
  },
  {
    id: "en4",
    category: "Engagement",
    label: "You use polls, questions, or CTAs",
    detail: "Interactive elements increase engagement rate.",
  },
  {
    id: "en5",
    category: "Engagement",
    label: "DMs are responded to promptly",
    detail: "Response rate affects your profile's messaging label.",
  },
  // Strategy
  {
    id: "st1",
    category: "Strategy",
    label: "You use relevant hashtags",
    detail: "Research niche hashtags rather than only using the most popular.",
  },
  {
    id: "st2",
    category: "Strategy",
    label: "You have a content pillar plan",
    detail:
      "e.g. 3 content types you rotate: educational, promotional, personal.",
  },
  {
    id: "st3",
    category: "Strategy",
    label: "Analytics are checked monthly",
    detail: "Track reach, saves, and profile visits — not just likes.",
  },
  {
    id: "st4",
    category: "Strategy",
    label: "You cross-promote on other platforms",
    detail: "Repurpose content and direct followers between channels.",
  },
  {
    id: "st5",
    category: "Strategy",
    label: "You have a pinned post or highlight strategy",
    detail: "Pinned posts and highlights are the first thing new visitors see.",
  },
  {
    id: "st6",
    category: "Strategy",
    label: "You collaborate with other creators",
    detail: "Collabs and shoutouts expand reach to new audiences.",
  },
];

const CATEGORIES = [...new Set(CHECKLIST.map((c) => c.category))];

const SCORE_LABELS: [number, string, string][] = [
  [0, "Getting Started", "text-red-600"],
  [40, "Needs Work", "text-orange-500"],
  [60, "On the Right Track", "text-yellow-600"],
  [80, "Looking Good", "text-green-600"],
  [95, "Social Media Pro", "text-indigo-600"],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getScoreLabel(pct: number): [string, string] {
  const match = [...SCORE_LABELS].reverse().find(([min]) => pct >= min);
  return match
    ? [match[1], match[2]]
    : [SCORE_LABELS[0][1], SCORE_LABELS[0][2]];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SocialMediaAuditClient() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string): void => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const reset = (): void => setChecked(new Set());

  const score = useMemo(
    () => Math.round((checked.size / CHECKLIST.length) * 100),
    [checked],
  );
  const [label, color] = getScoreLabel(score);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <ClipboardCheck className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Social Media Audit Tool
            </h2>
            <p className='text-gray-600'>
              Work through the checklist and get an instant score for your
              social media presence
            </p>
          </div>

          <div className='space-y-6'>
            {/* Score */}
            <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>Your Score</h3>
                <button
                  onClick={reset}
                  className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
                >
                  <RotateCcw className='w-4 h-4' />
                  Reset All
                </button>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                <div className='bg-white rounded-lg p-4'>
                  <div className={`text-4xl font-bold ${color}`}>{score}%</div>
                  <div className='text-sm text-gray-600'>Overall Score</div>
                </div>
                <div className='bg-white rounded-lg p-4'>
                  <div className='text-2xl font-bold text-indigo-600'>
                    {checked.size}
                  </div>
                  <div className='text-sm text-gray-600'>Completed</div>
                </div>
                <div className='bg-white rounded-lg p-4'>
                  <div className='text-2xl font-bold text-gray-400'>
                    {CHECKLIST.length - checked.size}
                  </div>
                  <div className='text-sm text-gray-600'>Remaining</div>
                </div>
                <div className='bg-white rounded-lg p-4'>
                  <div className={`text-sm font-bold ${color}`}>{label}</div>
                  <div className='text-xs text-gray-500 mt-1'>Status</div>
                </div>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-3'>
                <div
                  className='bg-indigo-600 h-3 rounded-full transition-all duration-300'
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            {/* Checklist by category */}
            {CATEGORIES.map((category) => {
              const items = CHECKLIST.filter((c) => c.category === category);
              const catChecked = items.filter((c) => checked.has(c.id)).length;
              return (
                <div key={category}>
                  <div className='flex items-center justify-between mb-3'>
                    <h3 className='text-lg font-semibold text-gray-800'>
                      {category}
                    </h3>
                    <span className='text-sm text-gray-500'>
                      {catChecked}/{items.length}
                    </span>
                  </div>
                  <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                    <div className='divide-y divide-gray-200'>
                      {items.map((item) => (
                        <label
                          key={item.id}
                          className='flex items-start gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer'
                        >
                          <input
                            type='checkbox'
                            checked={checked.has(item.id)}
                            onChange={() => toggle(item.id)}
                            className='w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 mt-0.5 flex-shrink-0'
                          />
                          <div>
                            <div
                              className={`text-sm font-medium ${
                                checked.has(item.id)
                                  ? "text-gray-400 line-through"
                                  : "text-gray-800"
                              }`}
                            >
                              {item.label}
                            </div>
                            <div className='text-xs text-gray-500 mt-0.5'>
                              {item.detail}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Work through the audit one category at a time — Profile Basics
                first, then Content Quality
              </li>
              <li>
                Items left unchecked are your prioritised action list — tackle
                the easiest wins first
              </li>
              <li>
                Re-run this audit monthly to track your improvement over time
              </li>
              <li>
                A score above 80% puts you in a strong position for organic
                growth
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
