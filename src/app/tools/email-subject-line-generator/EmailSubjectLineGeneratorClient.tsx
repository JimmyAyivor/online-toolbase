"use client";
import React, { useState } from "react";
import { Mail, Copy, Check, RotateCcw } from "lucide-react";

type EmailType =
  | "promotional"
  | "newsletter"
  | "cold"
  | "reengagement"
  | "transactional";
type Tone = "urgency" | "curiosity" | "benefit" | "personal" | "question";

const TEMPLATES: Record<
  EmailType,
  Record<Tone, (topic: string, name: string) => string[]>
> = {
  promotional: {
    urgency: (t) => [
      `⏰ Last chance: ${t} ends tonight`,
      `Only 24 hours left on your ${t}`,
      `⚡ Flash sale: ${t} — expires in 3 hours`,
      `Don't miss out — ${t} closes today`,
    ],
    curiosity: (t) => [
      `You won't believe what's happening with ${t}`,
      `We need to tell you something about ${t}`,
      `The secret behind our best ${t} yet`,
      `What 10,000 customers say about ${t}`,
    ],
    benefit: (t) => [
      `Get ${t} and save 40% this week`,
      `Here's how ${t} changes everything`,
      `The fastest way to benefit from ${t}`,
      `${t} — because you deserve better`,
    ],
    personal: (t, n) => [
      `${n}, your exclusive ${t} is ready`,
      `We picked this ${t} just for you, ${n}`,
      `${n} — a special ${t} for our best customers`,
      `Your personalised ${t} is waiting`,
    ],
    question: (t) => [
      `Ready for the best ${t} deal of the year?`,
      `Have you tried our new ${t}?`,
      `What would you do with ${t} for free?`,
      `Is ${t} right for you?`,
    ],
  },
  newsletter: {
    urgency: (t) => [
      `This week's ${t} roundup — don't miss it`,
      `5 ${t} updates you need to know now`,
      `Your ${t} briefing for this week`,
      `What happened in ${t} this week`,
    ],
    curiosity: (t) => [
      `The ${t} trend nobody is talking about`,
      `We tried something new with ${t}`,
      `3 surprising facts about ${t} this month`,
      `Inside look: ${t} behind the scenes`,
    ],
    benefit: (t) => [
      `5 ways ${t} can improve your week`,
      `Your complete guide to ${t} this month`,
      `Everything you need to know about ${t}`,
      `Make the most of ${t} with these tips`,
    ],
    personal: (t, n) => [
      `${n}, your ${t} digest is ready`,
      `Just for you, ${n}: the ${t} edition`,
      `${n}'s weekly ${t} update is here`,
      `Hi ${n} — here's your ${t} breakdown`,
    ],
    question: (t) => [
      `Are you keeping up with ${t}?`,
      `Have you seen what's happening in ${t}?`,
      `Did you catch last week's ${t} news?`,
      `What's your take on ${t} this month?`,
    ],
  },
  cold: {
    urgency: (t) => [
      `Quick question about your ${t}`,
      `One thing I noticed about your ${t}`,
      `[Time-sensitive] ${t} opportunity`,
      `Following up on ${t}`,
    ],
    curiosity: (t) => [
      `Saw your team's work on ${t}`,
      `Something interesting about your ${t}`,
      `A different approach to ${t}`,
      `I had an idea about your ${t}`,
    ],
    benefit: (t) => [
      `How to improve your ${t} by 30%`,
      `A faster way to handle ${t}`,
      `Solve your ${t} problem in 10 minutes`,
      `The fix your ${t} actually needs`,
    ],
    personal: (t, n) => [
      `${n}, your ${t} caught my eye`,
      `${n} — quick thought on your ${t}`,
      `Hi ${n}, noticed your ${t}`,
      `${n}, I have something for your ${t}`,
    ],
    question: (t) => [
      `Is ${t} your biggest challenge right now?`,
      `What's your current approach to ${t}?`,
      `Open to a conversation about ${t}?`,
      `Are you happy with your ${t} results?`,
    ],
  },
  reengagement: {
    urgency: (t) => [
      `We miss you — your ${t} access expires soon`,
      `Last chance to reclaim your ${t}`,
      `Don't lose your ${t} progress`,
      `Your ${t} account needs attention`,
    ],
    curiosity: (t) => [
      `A lot has changed with ${t} since you left`,
      `You missed something big in ${t}`,
      `We rebuilt ${t} — want to see?`,
      `What's new in ${t}? (A lot)`,
    ],
    benefit: (t) => [
      `Come back and get ${t} free for 30 days`,
      `We improved ${t} just for users like you`,
      `Here's what's new and better in ${t}`,
      `Your ${t} experience just got an upgrade`,
    ],
    personal: (t, n) => [
      `${n}, we want you back`,
      `${n}, your ${t} is gathering dust`,
      `Hey ${n} — ${t} has changed`,
      `We've been thinking about you, ${n}`,
    ],
    question: (t) => [
      `Whatever happened with your ${t}?`,
      `Did we do something wrong, ${t}-wise?`,
      `Still interested in ${t}?`,
      `Ready to give ${t} another try?`,
    ],
  },
  transactional: {
    urgency: (t) => [
      `Action required: your ${t}`,
      `Important update about your ${t}`,
      `Your ${t} requires attention`,
      `Confirm your ${t} now`,
    ],
    curiosity: (t) => [
      `Your ${t} summary is ready`,
      `Here's what happened with your ${t}`,
      `New activity on your ${t}`,
      `Update on your ${t}`,
    ],
    benefit: (t) => [
      `Your ${t} is confirmed — here's what's next`,
      `${t} processed successfully ✓`,
      `Good news about your ${t}`,
      `Your ${t} details inside`,
    ],
    personal: (t, n) => [
      `${n}, your ${t} is confirmed`,
      `Hi ${n} — your ${t} details`,
      `${n}'s ${t} receipt`,
      `Your ${t} is all set, ${n}`,
    ],
    question: (t) => [
      `Did you receive your ${t}?`,
      `Everything OK with your ${t}?`,
      `Happy with your ${t}?`,
      `Questions about your ${t}?`,
    ],
  },
};

const TYPE_LABELS: Record<EmailType, string> = {
  promotional: "Promotional",
  newsletter: "Newsletter",
  cold: "Cold outreach",
  reengagement: "Re-engagement",
  transactional: "Transactional",
};

const TONE_LABELS: Record<
  Tone,
  { label: string; emoji: string; color: string }
> = {
  urgency: {
    label: "Urgency",
    emoji: "⏰",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  curiosity: {
    label: "Curiosity",
    emoji: "🤔",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  benefit: {
    label: "Benefit",
    emoji: "✨",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  personal: {
    label: "Personalised",
    emoji: "👤",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  question: {
    label: "Question",
    emoji: "❓",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

export default function EmailSubjectLineGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [emailType, setEmailType] = useState<EmailType>("promotional");
  const [tone, setTone] = useState<Tone>("benefit");
  const [copied, setCopied] = useState<string | null>(null);

  const results = topic.trim()
    ? TEMPLATES[emailType][tone](topic.trim(), name || "FirstName")
    : [];

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg'>
              <Mail className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Email Subject Line Generator
            </h2>
            <p className='text-gray-500'>
              Generate high open-rate subject lines across 5 psychological
              trigger styles
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Inputs */}
            <div className='space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Email topic or product
                </label>
                <input
                  type='text'
                  value={topic}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTopic(e.target.value)
                  }
                  placeholder='e.g. summer sale, new feature launch, annual report'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Recipient first name{" "}
                  <span className='text-gray-400 font-normal'>
                    (optional — for personalised variants)
                  </span>
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  placeholder='e.g. Sarah'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Email type
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  {(Object.keys(TYPE_LABELS) as EmailType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setEmailType(t)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${emailType === t ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                    >
                      {TYPE_LABELS[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Trigger style
                </label>
                <div className='space-y-2'>
                  {(Object.keys(TONE_LABELS) as Tone[]).map((t) => {
                    const { label, emoji, color } = TONE_LABELS[t];
                    return (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 flex items-center gap-3 transition-all ${tone === t ? "bg-blue-600 text-white border-blue-600 shadow-md" : `bg-white border-gray-200 hover:border-blue-200`}`}
                      >
                        <span
                          className={`text-base px-2 py-1 rounded-lg border ${tone === t ? "bg-blue-500 border-blue-400" : color}`}
                        >
                          {emoji}
                        </span>
                        <span className='font-semibold text-sm'>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              {results.length > 0 ? (
                <div className='space-y-3'>
                  <p className='text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3'>
                    Generated subject lines
                  </p>
                  {results.map((line, i) => (
                    <div
                      key={i}
                      className={`bg-gradient-to-r ${i === 0 ? "from-blue-50 to-indigo-50 border-blue-200" : "from-gray-50 to-gray-50 border-gray-100"} border rounded-2xl px-5 py-4 flex items-start justify-between gap-3 group`}
                    >
                      <div className='flex gap-3 items-start'>
                        <span
                          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                        >
                          {i + 1}
                        </span>
                        <p className='text-gray-800 text-sm font-medium leading-relaxed'>
                          {line}
                        </p>
                      </div>
                      <button
                        onClick={() => copy(line)}
                        className='shrink-0 text-gray-300 hover:text-blue-600 transition-colors mt-0.5'
                      >
                        {copied === line ? (
                          <Check className='w-4 h-4 text-green-500' />
                        ) : (
                          <Copy className='w-4 h-4' />
                        )}
                      </button>
                    </div>
                  ))}

                  {/* Character count guide */}
                  <div className='bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 text-sm text-amber-800 mt-4'>
                    <strong>Subject line length:</strong> 40–60 characters is
                    the sweet spot for most email clients. Desktop shows ~60
                    chars, mobile shows ~30–40. Check your top pick is under 60
                    characters.
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-center h-64 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200'>
                  <div className='text-center text-blue-400'>
                    <Mail className='w-12 h-12 mx-auto mb-3 opacity-40' />
                    <p className='text-sm font-medium'>
                      Enter a topic to generate subject lines
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setTopic("");
              setName("");
              setEmailType("promotional");
              setTone("benefit");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>

          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Open rate tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                A/B test two subject lines — even 10% lift in open rate
                compounds significantly over time
              </li>
              <li>
                Avoid spam trigger words: FREE, GUARANTEED, !!!, CLICK HERE, ACT
                NOW
              </li>
              <li>
                Emojis in subject lines can boost open rates but should match
                your brand voice
              </li>
              <li>
                Personalisation tokens (first name) increase open rates by an
                average of 26%
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
