"use client";
import React, { useState } from "react";
import { Briefcase, Copy, Check, RotateCcw } from "lucide-react";

type Style = "compound" | "descriptive" | "abstract" | "action" | "premium";

const PREFIXES = {
  tech: ["Nova", "Apex", "Flux", "Prism", "Velo", "Nexus", "Orbit", "Cipher"],
  health: ["Vitale", "Numi", "Zest", "Lumix", "Reva", "Bloom", "Kova", "Pura"],
  finance: [
    "Agio",
    "Crest",
    "Forge",
    "Pinnacle",
    "Vault",
    "Summit",
    "Atlas",
    "Mercer",
  ],
  creative: [
    "Spark",
    "Hive",
    "Bloom",
    "Craft",
    "Wave",
    "Prism",
    "Fable",
    "Loom",
  ],
  general: ["Arc", "Nova", "Velo", "Zest", "Kova", "Forge", "Apex", "Lume"],
};
const SUFFIXES = [
  "ly",
  "ify",
  "hub",
  "io",
  "labs",
  "works",
  "co",
  "studio",
  "hq",
  "app",
  "base",
  "core",
  "ware",
  "edge",
  "go",
];
const ACTIONS = [
  "Launch",
  "Build",
  "Grow",
  "Lead",
  "Forge",
  "Rise",
  "Craft",
  "Spark",
  "Drive",
  "Scale",
];
const LATIN = [
  "Vero",
  "Altus",
  "Opus",
  "Via",
  "Aura",
  "Cura",
  "Lux",
  "Rex",
  "Amo",
  "Forte",
];

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generate(keyword: string, industry: string, style: Style): string[] {
  const kw = keyword.toLowerCase().replace(/\s+/g, "");
  const kwCap = capitalise(kw);
  const pfx =
    (PREFIXES as Record<string, string[]>)[industry] ?? PREFIXES.general;
  const results: string[] = [];

  if (style === "compound") {
    pfx.forEach((p) => results.push(`${p}${kwCap}`));
    pfx.slice(0, 4).forEach((p) => results.push(`${kwCap}${p}`));
  } else if (style === "descriptive") {
    SUFFIXES.forEach((s) => results.push(`${kwCap}${capitalise(s)}`));
    SUFFIXES.slice(0, 4).forEach((s) => results.push(`${kw}${s}`));
  } else if (style === "abstract") {
    LATIN.forEach((l) => results.push(l));
    pfx.forEach((p) => results.push(p));
  } else if (style === "action") {
    ACTIONS.forEach((a) => results.push(`${a}${kwCap}`));
    ACTIONS.slice(0, 4).forEach((a) => results.push(`${kwCap}${a}`));
  } else {
    pfx.forEach((p) => results.push(`${p} ${kwCap}`));
    LATIN.slice(0, 4).forEach((l) => results.push(`${l} ${kwCap}`));
    ["Group", "Partners", "Studio", "Labs", "Co."].forEach((s) =>
      results.push(`${kwCap} ${s}`),
    );
  }

  return [...new Set(results)].slice(0, 15);
}

const STYLE_META: Record<
  Style,
  { label: string; emoji: string; desc: string }
> = {
  compound: {
    label: "Compound",
    emoji: "🔗",
    desc: "Merge two meaningful words",
  },
  descriptive: {
    label: "Descriptive + suffix",
    emoji: "✏️",
    desc: "Keyword with trendy suffix",
  },
  abstract: {
    label: "Abstract / coined",
    emoji: "✨",
    desc: "Made-up or Latin-inspired",
  },
  action: {
    label: "Action-first",
    emoji: "⚡",
    desc: "Verb + keyword combination",
  },
  premium: {
    label: "Premium / formal",
    emoji: "💎",
    desc: "Keyword + prestige word",
  },
};

const INDUSTRIES = ["general", "tech", "health", "finance", "creative"];

export default function BusinessNameGeneratorClient() {
  const [keyword, setKeyword] = useState("");
  const [industry, setIndustry] = useState("general");
  const [style, setStyle] = useState<Style>("compound");
  const [copied, setCopied] = useState<string | null>(null);

  const results = keyword.trim()
    ? generate(keyword.trim(), industry, style)
    : [];
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full mb-4 shadow-lg'>
              <Briefcase className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Business Name Generator
            </h2>
            <p className='text-gray-500'>
              Generate creative business and brand name ideas for any industry
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Core keyword or concept
                </label>
                <input
                  value={keyword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setKeyword(e.target.value)
                  }
                  placeholder='e.g. coffee, design, finance, cloud'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Industry
                </label>
                <div className='grid grid-cols-3 gap-2'>
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`py-2 rounded-xl text-sm font-semibold capitalize border-2 transition-all ${industry === ind ? "bg-violet-600 text-white border-violet-600" : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"}`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Naming style
                </label>
                <div className='space-y-2'>
                  {(
                    Object.entries(STYLE_META) as [
                      Style,
                      (typeof STYLE_META)[Style],
                    ][]
                  ).map(([s, { label, emoji, desc }]) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 flex items-center gap-3 transition-all ${style === s ? "bg-violet-600 text-white border-violet-600 shadow-md" : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"}`}
                    >
                      <span
                        className={`text-base ${style === s ? "opacity-90" : ""}`}
                      >
                        {emoji}
                      </span>
                      <div>
                        <p className='font-semibold text-sm'>{label}</p>
                        <p
                          className={`text-xs ${style === s ? "text-violet-200" : "text-gray-400"}`}
                        >
                          {desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {results.length > 0 ? (
                <div className='space-y-2'>
                  <p className='text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3'>
                    Generated name ideas
                  </p>
                  <div className='grid grid-cols-1 gap-2 max-h-[520px] overflow-y-auto pr-1'>
                    {results.map((name, i) => (
                      <div
                        key={name}
                        className={`rounded-2xl px-5 py-3.5 flex items-center justify-between border ${i < 3 ? "bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-200" : "bg-gray-50 border-gray-100"}`}
                      >
                        <div className='flex items-center gap-3'>
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${i < 3 ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-500"}`}
                          >
                            {i + 1}
                          </span>
                          <span className='font-bold text-gray-800 text-base'>
                            {name}
                          </span>
                        </div>
                        <button
                          onClick={() => copy(name)}
                          className='text-gray-300 hover:text-violet-600 transition-colors'
                        >
                          {copied === name ? (
                            <Check className='w-4 h-4 text-green-500' />
                          ) : (
                            <Copy className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className='bg-amber-50 border border-amber-100 rounded-xl px-5 py-3 text-sm text-amber-800 mt-3'>
                    <strong>Next step:</strong> Check domain availability
                    (Namecheap, GoDaddy) and trademark databases (USPTO, EUIPO)
                    before committing to any name.
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-center h-64 bg-violet-50 rounded-2xl border-2 border-dashed border-violet-200'>
                  <div className='text-center text-violet-400'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 opacity-40' />
                    <p className='text-sm font-medium'>
                      Enter a keyword to generate names
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setKeyword("");
              setIndustry("general");
              setStyle("compound");
            }}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 transition-colors mt-6 mb-4'
          >
            <RotateCcw className='w-4 h-4' />
            Reset
          </button>
          <div className='p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>
              💡 Business naming tips:
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Keep it short: 1–2 syllables is ideal; under 12 characters is
                practical for domains
              </li>
              <li>
                Easy to spell when heard aloud — avoid unusual spellings that
                require explanation
              </li>
              <li>
                Check .com domain availability before falling in love with a
                name
              </li>
              <li>
                Search the USPTO trademark database to avoid infringing existing
                brands
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
