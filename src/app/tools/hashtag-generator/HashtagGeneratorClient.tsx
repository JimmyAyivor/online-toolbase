"use client";
import React, { useState } from "react";
import { Copy, Check, Trash2, RefreshCw, Hash } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PlatformConfig {
  key: string;
  name: string;
  icon: string;
  maxHashtags: number;
  recommended: number;
  color: string;
  bgColor: string;
  tip: string;
}

interface HashtagSet {
  label: string;
  tags: string[];
  sizeTip: string;
}

interface NicheMap {
  [niche: string]: HashtagSet[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PLATFORMS: PlatformConfig[] = [
  {
    key: "instagram",
    name: "Instagram",
    icon: "📸",
    maxHashtags: 30,
    recommended: 11,
    color: "text-pink-600",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    tip: "Sweet spot is 5–11 targeted tags",
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: "🎵",
    maxHashtags: 30,
    recommended: 5,
    color: "text-rose-500",
    bgColor: "bg-black",
    tip: "3–5 relevant tags perform best",
  },
  {
    key: "twitter",
    name: "X/Twitter",
    icon: "𝕏",
    maxHashtags: 2,
    recommended: 2,
    color: "text-gray-900",
    bgColor: "bg-gray-900",
    tip: "1–2 tags max; they eat character count",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    maxHashtags: 5,
    recommended: 3,
    color: "text-blue-700",
    bgColor: "bg-blue-700",
    tip: "3 relevant industry tags is optimal",
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: "▶",
    maxHashtags: 15,
    recommended: 8,
    color: "text-red-600",
    bgColor: "bg-red-600",
    tip: "First 3 tags appear above the title",
  },
  {
    key: "pinterest",
    name: "Pinterest",
    icon: "📌",
    maxHashtags: 20,
    recommended: 10,
    color: "text-red-700",
    bgColor: "bg-red-700",
    tip: "Mix broad and specific keywords",
  },
];

// Hashtag suggestions keyed by niche, each with 3 size tiers
const HASHTAG_LIBRARY: NicheMap = {
  fitness: [
    {
      label: "Mega (1M+)",
      sizeTip: "High reach, very competitive",
      tags: [
        "#fitness",
        "#workout",
        "#gym",
        "#fitnessmotivation",
        "#health",
        "#fit",
        "#exercise",
        "#bodybuilding",
        "#motivation",
        "#training",
      ],
    },
    {
      label: "Mid (100k–1M)",
      sizeTip: "Balanced reach and discovery",
      tags: [
        "#fitnesscommunity",
        "#workoutmotivation",
        "#gymlife",
        "#healthylifestyle",
        "#fitfam",
        "#strengthtraining",
        "#cardio",
        "#personaltrainer",
        "#weightloss",
        "#musclebuilding",
      ],
    },
    {
      label: "Niche (<100k)",
      sizeTip: "Targeted, easier to rank in",
      tags: [
        "#fitnesscoach",
        "#homeworkout",
        "#functionalfitness",
        "#gainz",
        "#legday",
        "#pullday",
        "#pushday",
        "#fitnessblogger",
        "#bodyweighttraining",
        "#musclegain",
      ],
    },
  ],
  food: [
    {
      label: "Mega (1M+)",
      sizeTip: "High reach, very competitive",
      tags: [
        "#food",
        "#foodie",
        "#instafood",
        "#foodphotography",
        "#yummy",
        "#delicious",
        "#foodlover",
        "#cooking",
        "#recipe",
        "#homemade",
      ],
    },
    {
      label: "Mid (100k–1M)",
      sizeTip: "Balanced reach and discovery",
      tags: [
        "#foodblogger",
        "#healthyfood",
        "#foodstagram",
        "#mealprep",
        "#cleaneating",
        "#plantbased",
        "#vegan",
        "#vegetarian",
        "#foodart",
        "#cheflife",
      ],
    },
    {
      label: "Niche (<100k)",
      sizeTip: "Targeted, easier to rank in",
      tags: [
        "#foodstyling",
        "#recipedeveloper",
        "#weeknightdinner",
        "#sourdough",
        "#fermentation",
        "#farmtotable",
        "#glutenfree",
        "#dairyfree",
        "#foodphotographer",
        "#homecook",
      ],
    },
  ],
  travel: [
    {
      label: "Mega (1M+)",
      sizeTip: "High reach, very competitive",
      tags: [
        "#travel",
        "#wanderlust",
        "#adventure",
        "#explore",
        "#travelgram",
        "#travelphotography",
        "#vacation",
        "#trip",
        "#nature",
        "#traveler",
      ],
    },
    {
      label: "Mid (100k–1M)",
      sizeTip: "Balanced reach and discovery",
      tags: [
        "#travelblogger",
        "#instatravel",
        "#travellife",
        "#solotravel",
        "#backpacking",
        "#roadtrip",
        "#luxurytravel",
        "#budgettravel",
        "#traveltips",
        "#travelcouple",
      ],
    },
    {
      label: "Niche (<100k)",
      sizeTip: "Targeted, easier to rank in",
      tags: [
        "#slowtravel",
        "#digitalnomad",
        "#travelcommunity",
        "#offthebeatenpath",
        "#hiddengems",
        "#sustainabletravel",
        "#ecotravel",
        "#travelwriter",
        "#weekendgetaway",
        "#travelinspiration",
      ],
    },
  ],
  fashion: [
    {
      label: "Mega (1M+)",
      sizeTip: "High reach, very competitive",
      tags: [
        "#fashion",
        "#style",
        "#ootd",
        "#outfit",
        "#fashionista",
        "#streetstyle",
        "#beauty",
        "#love",
        "#instagood",
        "#photooftheday",
      ],
    },
    {
      label: "Mid (100k–1M)",
      sizeTip: "Balanced reach and discovery",
      tags: [
        "#fashionblogger",
        "#fashionphotography",
        "#styleblogger",
        "#outfitoftheday",
        "#mensfashion",
        "#womensfashion",
        "#sustainable",
        "#vintage",
        "#streetwear",
        "#luxuryfashion",
      ],
    },
    {
      label: "Niche (<100k)",
      sizeTip: "Targeted, easier to rank in",
      tags: [
        "#outfitinspo",
        "#slowfashion",
        "#capsulewardrobe",
        "#thrifted",
        "#fashioncommunity",
        "#ethicalfashion",
        "#styleinspo",
        "#wiwt",
        "#fashionweek",
        "#stylingtips",
      ],
    },
  ],
  business: [
    {
      label: "Mega (1M+)",
      sizeTip: "High reach, very competitive",
      tags: [
        "#entrepreneur",
        "#business",
        "#success",
        "#motivation",
        "#mindset",
        "#marketing",
        "#leadership",
        "#startup",
        "#hustle",
        "#goals",
      ],
    },
    {
      label: "Mid (100k–1M)",
      sizeTip: "Balanced reach and discovery",
      tags: [
        "#smallbusiness",
        "#businessowner",
        "#entrepreneurship",
        "#digitalmarketing",
        "#socialmediamarketing",
        "#onlinebusiness",
        "#businesstips",
        "#contentmarketing",
        "#branding",
        "#ecommerce",
      ],
    },
    {
      label: "Niche (<100k)",
      sizeTip: "Targeted, easier to rank in",
      tags: [
        "#businesscoach",
        "#b2b",
        "#saas",
        "#startupfounder",
        "#bootstrapped",
        "#fempreneur",
        "#sidehustle",
        "#passiveincome",
        "#businessstrategy",
        "#growthhacking",
      ],
    },
  ],
  photography: [
    {
      label: "Mega (1M+)",
      sizeTip: "High reach, very competitive",
      tags: [
        "#photography",
        "#photo",
        "#photographer",
        "#photooftheday",
        "#portrait",
        "#landscape",
        "#nature",
        "#canon",
        "#nikon",
        "#sony",
      ],
    },
    {
      label: "Mid (100k–1M)",
      sizeTip: "Balanced reach and discovery",
      tags: [
        "#photographylovers",
        "#naturephotography",
        "#streetphotography",
        "#portraitphotography",
        "#travelphotography",
        "#landscapephotography",
        "#weddingphotography",
        "#photographylife",
        "#filmphotography",
        "#mobilephotography",
      ],
    },
    {
      label: "Niche (<100k)",
      sizeTip: "Targeted, easier to rank in",
      tags: [
        "#photographytips",
        "#lightroom",
        "#photographycommunity",
        "#fujifujifilm",
        "#analogphotography",
        "#blackandwhitephotography",
        "#goldenhour",
        "#photographyislife",
        "#freelancephotographer",
        "#shootingfilm",
      ],
    },
  ],
  beauty: [
    {
      label: "Mega (1M+)",
      sizeTip: "High reach, very competitive",
      tags: [
        "#beauty",
        "#makeup",
        "#skincare",
        "#beautytips",
        "#cosmetics",
        "#makeupblogger",
        "#beautyblogger",
        "#glam",
        "#makeuplover",
        "#makeuplife",
      ],
    },
    {
      label: "Mid (100k–1M)",
      sizeTip: "Balanced reach and discovery",
      tags: [
        "#skincareRoutine",
        "#naturalmakeup",
        "#makeuptutorial",
        "#getreadywithme",
        "#makeuplook",
        "#glowup",
        "#cleanbeauty",
        "#grwm",
        "#makeupinspo",
        "#selfcare",
      ],
    },
    {
      label: "Niche (<100k)",
      sizeTip: "Targeted, easier to rank in",
      tags: [
        "#skintok",
        "#acneskin",
        "#oilyskin",
        "#dryskin",
        "#hyperpigmentation",
        "#kbeauty",
        "#koreanskincare",
        "#spf",
        "#retinol",
        "#niacinamide",
      ],
    },
  ],
  tech: [
    {
      label: "Mega (1M+)",
      sizeTip: "High reach, very competitive",
      tags: [
        "#technology",
        "#tech",
        "#innovation",
        "#ai",
        "#coding",
        "#programming",
        "#software",
        "#developer",
        "#startup",
        "#digital",
      ],
    },
    {
      label: "Mid (100k–1M)",
      sizeTip: "Balanced reach and discovery",
      tags: [
        "#techblogger",
        "#artificialintelligence",
        "#machinelearning",
        "#webdevelopment",
        "#javascript",
        "#python",
        "#uidesign",
        "#uxdesign",
        "#openai",
        "#chatgpt",
      ],
    },
    {
      label: "Niche (<100k)",
      sizeTip: "Targeted, easier to rank in",
      tags: [
        "#buildinpublic",
        "#indiehacker",
        "#solopreneur",
        "#techtwitter",
        "#100daysofcode",
        "#learntocode",
        "#devlife",
        "#fullstackdeveloper",
        "#reactdeveloper",
        "#techcareer",
      ],
    },
  ],
};

const NICHES = Object.keys(HASHTAG_LIBRARY);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildCaption(tags: string[], separator: string): string {
  return tags.join(separator === "newline" ? "\n" : " ");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HashtagGeneratorClient() {
  const [niche, setNiche] = useState<string>("fitness");
  const [platform, setPlatform] = useState<string>("instagram");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [separator, setSeparator] = useState<"space" | "newline">("space");
  const [copied, setCopied] = useState<boolean>(false);
  const [customTag, setCustomTag] = useState<string>("");

  const platformCfg =
    PLATFORMS.find((p) => p.key === platform) ?? PLATFORMS[0]!;
  const hashtagSets = HASHTAG_LIBRARY[niche] ?? [];
  const selectedArr = Array.from(selected);
  const overLimit = selectedArr.length > platformCfg.maxHashtags;

  const toggleTag = (tag: string): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const addCustomTag = (): void => {
    const raw = customTag.trim();
    if (!raw) return;
    const tag = raw.startsWith("#") ? raw : `#${raw}`;
    setSelected((prev) => new Set([...prev, tag]));
    setCustomTag("");
  };

  const selectRecommended = (): void => {
    // pick top recommended count spread across tiers
    const allTags = hashtagSets.flatMap((s) => s.tags);
    const pick = allTags.slice(0, platformCfg.recommended);
    setSelected(new Set(pick));
  };

  const clearAll = (): void => setSelected(new Set());

  const copyCaption = (): void => {
    navigator.clipboard.writeText(buildCaption(selectedArr, separator));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl mb-4 shadow-lg'>
              <Hash className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Hashtag Generator
            </h2>
            <p className='text-gray-600'>
              Build the perfect hashtag set for every platform and niche
            </p>
          </div>

          {/* Platform selector */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Platform
            </label>
            <div className='grid grid-cols-3 md:grid-cols-6 gap-2'>
              {PLATFORMS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPlatform(p.key)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-semibold transition-all border-2 ${
                    platform === p.key
                      ? "border-violet-400 bg-violet-50 shadow-md scale-105"
                      : "border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span className='text-xl'>{p.icon}</span>
                  <span>{p.name.split("/")[0]}</span>
                </button>
              ))}
            </div>

            {/* Platform tip */}
            <div
              className={`${platformCfg.bgColor} text-white rounded-xl p-3 mt-3 flex items-center justify-between text-sm`}
            >
              <span>💡 {platformCfg.tip}</span>
              <span className='font-bold opacity-80'>
                Max {platformCfg.maxHashtags} tags · Recommended:{" "}
                {platformCfg.recommended}
              </span>
            </div>
          </div>

          {/* Niche selector */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Niche / Topic
            </label>
            <div className='flex flex-wrap gap-2'>
              {NICHES.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setNiche(n);
                    clearAll();
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                    niche === n
                      ? "bg-violet-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-700"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            {/* Tag browser */}
            <div className='md:col-span-2 space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='font-bold text-gray-800'>
                  Browse &amp; Select Tags
                </h3>
                <button
                  onClick={selectRecommended}
                  className='flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-colors'
                >
                  <RefreshCw className='w-3.5 h-3.5' />
                  Auto-select {platformCfg.recommended} tags
                </button>
              </div>

              {hashtagSets.map(({ label, sizeTip, tags }) => (
                <div
                  key={label}
                  className='bg-gray-50 rounded-xl p-4 border border-gray-100'
                >
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='text-sm font-bold text-gray-700'>
                      {label}
                    </span>
                    <span className='text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full'>
                      {sizeTip}
                    </span>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                          selected.has(tag)
                            ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:text-violet-700"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Custom tag input */}
              <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                <label className='block text-sm font-bold text-gray-700 mb-2'>
                  Add Custom Tag
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={customTag}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCustomTag(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addCustomTag();
                    }}
                    placeholder='#yourcustomtag'
                    className='flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 text-sm'
                  />
                  <button
                    onClick={addCustomTag}
                    disabled={!customTag.trim()}
                    className='px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg text-sm font-semibold transition-colors'
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Selected tags panel */}
            <div className='space-y-4'>
              {/* Count badge */}
              <div
                className={`rounded-xl p-4 border-2 ${
                  overLimit
                    ? "bg-red-50 border-red-300"
                    : "bg-violet-50 border-violet-200"
                }`}
              >
                <div className='flex items-center justify-between mb-1'>
                  <span className='font-bold text-gray-800'>Selected Tags</span>
                  <span
                    className={`text-2xl font-bold ${overLimit ? "text-red-600" : "text-violet-600"}`}
                  >
                    {selectedArr.length}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
                  <div
                    className={`h-2 rounded-full transition-all ${overLimit ? "bg-red-500" : "bg-violet-500"}`}
                    style={{
                      width: `${Math.min((selectedArr.length / platformCfg.maxHashtags) * 100, 100)}%`,
                    }}
                  />
                </div>
                <div
                  className={`text-xs ${overLimit ? "text-red-600 font-semibold" : "text-gray-500"}`}
                >
                  {overLimit
                    ? `${selectedArr.length - platformCfg.maxHashtags} over ${platformCfg.name} limit of ${platformCfg.maxHashtags}`
                    : `${platformCfg.maxHashtags - selectedArr.length} more allowed on ${platformCfg.name}`}
                </div>
              </div>

              {/* Output */}
              {selectedArr.length > 0 && (
                <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm font-bold text-gray-700'>
                      Your Caption Tags
                    </span>
                    <div className='flex gap-1'>
                      <button
                        onClick={() =>
                          setSeparator(
                            separator === "space" ? "newline" : "space",
                          )
                        }
                        className='px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded text-gray-600 transition-colors'
                        title='Toggle space/newline separator'
                      >
                        {separator === "space" ? "Inline" : "Lines"}
                      </button>
                    </div>
                  </div>

                  <div className='font-mono text-xs bg-white border border-gray-200 rounded-lg p-3 min-h-[80px] max-h-40 overflow-y-auto text-gray-700 whitespace-pre-wrap break-words mb-3'>
                    {buildCaption(selectedArr, separator)}
                  </div>

                  <div className='flex gap-2'>
                    <button
                      onClick={copyCaption}
                      className='flex-1 flex items-center justify-center gap-2 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-semibold transition-colors'
                    >
                      {copied ? (
                        <>
                          <Check className='w-4 h-4' /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className='w-4 h-4' /> Copy All
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearAll}
                      aria-label='Clear selected tags'
                      className='px-3 py-2 bg-gray-200 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              )}

              {/* Selected tag chips */}
              {selectedArr.length > 0 && (
                <div className='flex flex-wrap gap-1.5'>
                  {selectedArr.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className='px-2.5 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-semibold hover:bg-red-100 hover:text-red-600 transition-colors flex items-center gap-1'
                      title='Click to remove'
                    >
                      {tag}
                      <span className='text-violet-400 hover:text-red-400'>
                        ×
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Guide */}
          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Hashtag Strategy Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Mix large, medium, and niche-size hashtags for optimal reach
                across audiences
              </li>
              <li>
                Avoid banned or flagged hashtags — they can suppress your post
                visibility
              </li>
              <li>
                Rotate hashtag sets between posts to avoid being flagged as spam
              </li>
              <li>
                Research competitors to discover high-performing tags in your
                niche
              </li>
              <li>
                On Instagram, add hashtags in the first comment instead of the
                caption for a cleaner look
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
