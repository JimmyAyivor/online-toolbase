"use client";
import React, { useState } from "react";
import { User, Copy, Check, RefreshCw, Sparkles } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Platform = "instagram" | "tiktok" | "twitter" | "linkedin" | "youtube";
type Tone = "professional" | "casual" | "funny" | "inspirational";

interface PlatformConfig {
  icon: string;
  label: string;
  limit: number;
  color: string;
  bgColor: string;
  fields: string[]; // which optional fields matter most
  tip: string;
}

interface BioTemplate {
  tone: Tone;
  template: (f: BioFields) => string;
}

interface BioFields {
  name: string;
  title: string;
  niche: string;
  value: string; // what you offer / your unique value
  cta: string; // call to action
  emoji: string; // favourite emoji
  location: string;
  achievement: string;
  link: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PLATFORMS: Record<Platform, PlatformConfig> = {
  instagram: {
    icon: "📸",
    label: "Instagram",
    limit: 150,
    color: "text-pink-600",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    fields: ["title", "value", "cta", "emoji", "link"],
    tip: "Lead with who you help and what you do. End with a clear CTA + link.",
  },
  tiktok: {
    icon: "🎵",
    label: "TikTok",
    limit: 80,
    color: "text-rose-500",
    bgColor: "bg-black",
    fields: ["niche", "value", "emoji", "cta"],
    tip: "Keep it short and punchy. Personality wins on TikTok.",
  },
  twitter: {
    icon: "𝕏",
    label: "X / Twitter",
    limit: 160,
    color: "text-gray-900",
    bgColor: "bg-gray-900",
    fields: ["title", "achievement", "niche", "emoji"],
    tip: "Keywords first. Humor and personality stand out in the feed.",
  },
  linkedin: {
    icon: "💼",
    label: "LinkedIn",
    limit: 220,
    color: "text-blue-700",
    bgColor: "bg-blue-700",
    fields: ["title", "value", "achievement", "cta"],
    tip: "Focus on business outcomes and credibility. First 40 chars are critical.",
  },
  youtube: {
    icon: "▶",
    label: "YouTube",
    limit: 1000,
    color: "text-red-600",
    bgColor: "bg-red-600",
    fields: ["niche", "value", "cta", "location"],
    tip: "Describe your channel content clearly. Keywords help searchability.",
  },
};

const PLATFORM_KEYS = Object.keys(PLATFORMS) as Platform[];

const TONES: { value: Tone; label: string; desc: string }[] = [
  {
    value: "professional",
    label: "Professional",
    desc: "Authoritative & polished",
  },
  { value: "casual", label: "Casual", desc: "Friendly & approachable" },
  { value: "funny", label: "Funny", desc: "Witty & memorable" },
  {
    value: "inspirational",
    label: "Inspirational",
    desc: "Motivating & aspirational",
  },
];

const TEMPLATES: Record<Platform, BioTemplate[]> = {
  instagram: [
    {
      tone: "professional",
      template: (f) =>
        [
          f.title && `${f.emoji || "✨"} ${f.title}`,
          f.niche && `Helping ${f.niche}`,
          f.value && `${f.value}`,
          f.achievement && `🏆 ${f.achievement}`,
          f.cta && `👇 ${f.cta}`,
          f.link && f.link,
        ]
          .filter(Boolean)
          .join("\n"),
    },
    {
      tone: "casual",
      template: (f) =>
        [
          f.name && `Hey, I'm ${f.name}! ${f.emoji || "👋"}`,
          f.niche && `Making content about ${f.niche}`,
          f.value && `${f.value}`,
          f.cta && `⬇️ ${f.cta}`,
        ]
          .filter(Boolean)
          .join("\n"),
    },
    {
      tone: "funny",
      template: (f) =>
        [
          f.title && `${f.emoji || "🙃"} Official ${f.title} (self-appointed)`,
          f.niche && `Turning ${f.niche} chaos into content`,
          f.value && `${f.value}`,
          f.cta && `👇 ${f.cta}`,
        ]
          .filter(Boolean)
          .join("\n"),
    },
    {
      tone: "inspirational",
      template: (f) =>
        [
          f.title && `${f.emoji || "🌟"} ${f.title}`,
          f.value && `On a mission to ${f.value}`,
          f.niche && `Empowering ${f.niche} to reach their potential`,
          f.cta && `✨ ${f.cta}`,
        ]
          .filter(Boolean)
          .join("\n"),
    },
  ],
  tiktok: [
    {
      tone: "professional",
      template: (f) =>
        [
          f.title && `${f.emoji || "⚡"} ${f.title}`,
          f.value && `${f.value}`,
          f.cta && `👇 ${f.cta}`,
        ]
          .filter(Boolean)
          .join(" | "),
    },
    {
      tone: "casual",
      template: (f) =>
        [
          f.name && `${f.name} ${f.emoji || "🙌"}`,
          f.niche && `posting about ${f.niche}`,
          f.cta && f.cta,
        ]
          .filter(Boolean)
          .join(" · "),
    },
    {
      tone: "funny",
      template: (f) =>
        [
          f.emoji && f.emoji,
          f.niche && `${f.niche} but make it entertaining`,
          f.value && f.value,
        ]
          .filter(Boolean)
          .join(" | "),
    },
    {
      tone: "inspirational",
      template: (f) =>
        [
          f.value && `${f.emoji || "🔥"} ${f.value}`,
          f.niche && `Inspiring ${f.niche}`,
          f.cta && f.cta,
        ]
          .filter(Boolean)
          .join("\n"),
    },
  ],
  twitter: [
    {
      tone: "professional",
      template: (f) =>
        [
          f.title && `${f.title}`,
          f.achievement && `| ${f.achievement}`,
          f.niche && `Writing about ${f.niche}`,
          f.emoji && f.emoji,
        ]
          .filter(Boolean)
          .join(" "),
    },
    {
      tone: "casual",
      template: (f) =>
        [
          f.niche && `Tweeting about ${f.niche} ${f.emoji || "👀"}`,
          f.value && `| ${f.value}`,
          f.name && `— ${f.name}`,
        ]
          .filter(Boolean)
          .join(" "),
    },
    {
      tone: "funny",
      template: (f) =>
        [
          f.title && `Probably a ${f.title}`,
          f.achievement && `| Once ${f.achievement.toLowerCase()}`,
          f.niche && `| Hot takes on ${f.niche} ${f.emoji || "🌶️"}`,
        ]
          .filter(Boolean)
          .join(" "),
    },
    {
      tone: "inspirational",
      template: (f) =>
        [
          f.value && `${f.emoji || "💡"} ${f.value}`,
          f.niche && `| Sharing ideas on ${f.niche}`,
          f.cta && `| ${f.cta}`,
        ]
          .filter(Boolean)
          .join(" "),
    },
  ],
  linkedin: [
    {
      tone: "professional",
      template: (f) =>
        [
          f.title && `${f.title}`,
          f.value && `I help ${f.value}`,
          f.achievement && `📌 ${f.achievement}`,
          f.niche && `Passionate about ${f.niche}`,
          f.cta && `💬 ${f.cta}`,
        ]
          .filter(Boolean)
          .join(" | "),
    },
    {
      tone: "casual",
      template: (f) =>
        [
          f.name && `Hi, I'm ${f.name}!`,
          f.title && `I work as a ${f.title}`,
          f.value && `and I love helping ${f.value}.`,
          f.cta && `Feel free to connect — ${f.cta}`,
        ]
          .filter(Boolean)
          .join(" "),
    },
    {
      tone: "funny",
      template: (f) =>
        [
          f.title && `${f.title} by day`,
          f.niche && `${f.niche} enthusiast by night`,
          f.achievement && `Notable achievement: ${f.achievement}`,
          f.cta && `DM me if you want to talk ${f.niche || "shop"}`,
        ]
          .filter(Boolean)
          .join(" | "),
    },
    {
      tone: "inspirational",
      template: (f) =>
        [
          f.value && `On a mission to ${f.value}`,
          f.title && `${f.title} | ${f.niche || "change-maker"}`,
          f.achievement && `🏆 ${f.achievement}`,
          f.cta && `📩 ${f.cta}`,
        ]
          .filter(Boolean)
          .join("\n"),
    },
  ],
  youtube: [
    {
      tone: "professional",
      template: (f) =>
        [
          f.niche && `Welcome! This channel is all about ${f.niche}.`,
          f.value && `My goal: ${f.value}.`,
          f.cta && `${f.cta} — new videos every week!`,
          f.location && `📍 Based in ${f.location}`,
        ]
          .filter(Boolean)
          .join(" "),
    },
    {
      tone: "casual",
      template: (f) =>
        [
          f.name && `Hey! I'm ${f.name} ${f.emoji || "👋"}`,
          f.niche && `I make videos about ${f.niche}.`,
          f.value && `${f.value}`,
          f.cta && `${f.cta}`,
        ]
          .filter(Boolean)
          .join(" "),
    },
    {
      tone: "funny",
      template: (f) =>
        [
          f.niche && `Your new favourite ${f.niche} channel ${f.emoji || "😅"}`,
          f.value && `(or at least that's the plan — ${f.value})`,
          f.cta && `Subscribe so I can tell my mum. ${f.cta}`,
        ]
          .filter(Boolean)
          .join(" "),
    },
    {
      tone: "inspirational",
      template: (f) =>
        [
          f.value && `This channel exists to ${f.value}.`,
          f.niche && `Documenting the journey through ${f.niche}.`,
          f.cta && `Join the community — ${f.cta}`,
        ]
          .filter(Boolean)
          .join(" "),
    },
  ],
};

const DEFAULT_FIELDS: BioFields = {
  name: "",
  title: "",
  niche: "",
  value: "",
  cta: "",
  emoji: "",
  location: "",
  achievement: "",
  link: "",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generate(platform: Platform, tone: Tone, fields: BioFields): string {
  const tpl = TEMPLATES[platform].find((t) => t.tone === tone);
  return tpl ? tpl.template(fields).trim() : "";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SocialMediaBioGeneratorClient() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [tone, setTone] = useState<Tone>("professional");
  const [fields, setFields] = useState<BioFields>(DEFAULT_FIELDS);
  const [bio, setBio] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const cfg = PLATFORMS[platform];
  const limit = cfg.limit;
  const over = bio.length > limit;

  const setField = (key: keyof BioFields, val: string): void =>
    setFields((prev) => ({ ...prev, [key]: val }));

  const handleGenerate = (): void => setBio(generate(platform, tone, fields));

  const handleCopy = (): void => {
    navigator.clipboard.writeText(bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const FIELD_DEFS: {
    key: keyof BioFields;
    label: string;
    placeholder: string;
  }[] = [
    { key: "name", label: "Your Name", placeholder: "Jane Smith" },
    {
      key: "title",
      label: "Title / Role",
      placeholder: "Content Creator, Founder, Coach…",
    },
    {
      key: "niche",
      label: "Niche / Audience",
      placeholder: "entrepreneurs, dog lovers, gamers…",
    },
    {
      key: "value",
      label: "Your Value / Mission",
      placeholder: "help people build passive income",
    },
    {
      key: "achievement",
      label: "Key Achievement",
      placeholder: "Featured in Forbes, 10k sales…",
    },
    {
      key: "cta",
      label: "Call to Action",
      placeholder: "Book a free call, Grab the freebie…",
    },
    { key: "emoji", label: "Favourite Emoji", placeholder: "🚀" },
    { key: "location", label: "Location", placeholder: "London, UK" },
    {
      key: "link",
      label: "Link (Instagram)",
      placeholder: "linktree.com/yourname",
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4 shadow-lg'>
              <User className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Social Media Bio Generator
            </h2>
            <p className='text-gray-600'>
              Craft the perfect bio for every platform in seconds
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Left: inputs */}
            <div className='space-y-5'>
              {/* Platform */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Platform
                </label>
                <div className='grid grid-cols-5 gap-2'>
                  {PLATFORM_KEYS.map((pk) => (
                    <button
                      key={pk}
                      onClick={() => {
                        setPlatform(pk);
                        setBio("");
                      }}
                      className={`flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all border-2 ${
                        platform === pk
                          ? "border-amber-400 bg-amber-50 shadow scale-105"
                          : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <span className='text-lg'>{PLATFORMS[pk].icon}</span>
                      <span>{PLATFORMS[pk].label.split("/")[0]!.trim()}</span>
                    </button>
                  ))}
                </div>
                <div
                  className={`${cfg.bgColor} text-white text-xs rounded-lg p-2 mt-2 text-center`}
                >
                  💡 {cfg.tip}
                </div>
              </div>

              {/* Tone */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Tone
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  {TONES.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      onClick={() => setTone(value)}
                      className={`text-left px-3 py-2 rounded-xl border-2 transition-all ${
                        tone === value
                          ? "border-amber-400 bg-amber-50 shadow"
                          : "border-gray-100 bg-gray-50 hover:border-amber-200"
                      }`}
                    >
                      <div className='text-sm font-semibold text-gray-900'>
                        {label}
                      </div>
                      <div className='text-xs text-gray-500'>{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Your Details
                </label>
                <div className='space-y-2'>
                  {FIELD_DEFS.filter(
                    ({ key }) =>
                      // Always show name, title, niche, value, cta — hide link unless Instagram
                      key !== "link" || platform === "instagram",
                  ).map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className='block text-xs font-medium text-gray-600 mb-0.5'>
                        {label}
                      </label>
                      <input
                        type='text'
                        value={fields[key]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setField(key, e.target.value)
                        }
                        placeholder={placeholder}
                        className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 text-sm'
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className='w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg'
              >
                <Sparkles className='w-5 h-5' />
                Generate Bio
              </button>
            </div>

            {/* Right: output */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='font-bold text-gray-900'>Generated Bio</h3>
                {bio && (
                  <span
                    className={`text-xs font-semibold ${over ? "text-red-500" : "text-gray-500"}`}
                  >
                    {bio.length} / {limit} chars
                  </span>
                )}
              </div>

              {bio ? (
                <>
                  {/* Character bar */}
                  <div className='w-full bg-gray-100 rounded-full h-2'>
                    <div
                      className={`h-2 rounded-full transition-all ${over ? "bg-red-500" : "bg-amber-400"}`}
                      style={{
                        width: `${Math.min((bio.length / limit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  {over && (
                    <p className='text-xs text-red-500 font-semibold'>
                      ⚠️ {bio.length - limit} characters over the {cfg.label}{" "}
                      limit
                    </p>
                  )}

                  {/* Bio preview */}
                  <div className='bg-gray-50 border-2 border-gray-200 rounded-xl p-5 min-h-[140px] text-gray-900 text-sm whitespace-pre-wrap leading-relaxed font-medium'>
                    {bio}
                  </div>

                  <div className='flex gap-2'>
                    <button
                      onClick={handleCopy}
                      className='flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors'
                    >
                      {copied ? (
                        <>
                          <Check className='w-4 h-4' /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className='w-4 h-4' /> Copy Bio
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleGenerate}
                      aria-label='Regenerate'
                      className='px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors'
                    >
                      <RefreshCw className='w-4 h-4 text-gray-600' />
                    </button>
                  </div>

                  {/* Editable textarea */}
                  <div>
                    <label className='block text-xs font-semibold text-gray-600 mb-1'>
                      Edit directly ✏️
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setBio(e.target.value)
                      }
                      rows={5}
                      className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm resize-none leading-relaxed'
                    />
                  </div>
                </>
              ) : (
                <div className='bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 min-h-[200px] flex flex-col items-center justify-center'>
                  <Sparkles className='w-10 h-10 mb-3 opacity-30' />
                  <p className='font-medium'>
                    Fill in your details and click Generate
                  </p>
                  <p className='text-xs mt-1'>Your bio will appear here</p>
                </div>
              )}

              {/* Tips */}
              <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
                <p className='text-xs font-bold text-amber-800 mb-2'>
                  ✨ Platform Tips
                </p>
                <ul className='space-y-1 text-xs text-amber-900'>
                  <li>
                    • Use line breaks on Instagram and LinkedIn for readability
                  </li>
                  <li>• Keywords help you appear in platform search results</li>
                  <li>
                    • Update your bio regularly to reflect current offerings
                  </li>
                  <li>• Always include a CTA — tell people what to do next</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
