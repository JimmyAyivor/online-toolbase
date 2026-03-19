"use client";
import React, { useState } from "react";
import { Copy, Check, Zap } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FunnelStage = "awareness" | "consideration" | "conversion" | "retargeting";
type AdObjective =
  | "traffic"
  | "leads"
  | "sales"
  | "engagement"
  | "appinstall"
  | "video";
type CopyLength = "short" | "medium" | "long";

interface StageConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  desc: string;
}

interface AdCopyVariant {
  label: string;
  headline: string;
  body: string;
  cta: string;
}

interface ProductInfo {
  name: string;
  benefit: string;
  audience: string;
  painPoint: string;
  offer: string;
  socialProof: string;
  urgency: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STAGES: Record<FunnelStage, StageConfig> = {
  awareness: {
    label: "Awareness (TOF)",
    icon: "📢",
    color: "text-blue-700",
    bgColor: "bg-blue-700",
    desc: "Cold audience — build brand recognition, educate, no hard sell",
  },
  consideration: {
    label: "Consideration (MOF)",
    icon: "🤔",
    color: "text-purple-700",
    bgColor: "bg-purple-600",
    desc: "Warm audience — build desire, compare solutions, address objections",
  },
  conversion: {
    label: "Conversion (BOF)",
    icon: "💰",
    color: "text-green-700",
    bgColor: "bg-green-600",
    desc: "Hot audience — drive purchase, use urgency and strong CTAs",
  },
  retargeting: {
    label: "Retargeting",
    icon: "🎯",
    color: "text-orange-700",
    bgColor: "bg-orange-500",
    desc: "People who engaged or visited — recover lost interest, add incentive",
  },
};

const OBJECTIVES: { value: AdObjective; label: string }[] = [
  { value: "traffic", label: "Traffic" },
  { value: "leads", label: "Lead Gen" },
  { value: "sales", label: "Sales" },
  { value: "engagement", label: "Engagement" },
  { value: "appinstall", label: "App Install" },
  { value: "video", label: "Video Views" },
];

const CTA_OPTIONS: Record<FunnelStage, string[]> = {
  awareness: ["Learn More", "Watch Video", "See More", "Follow Page"],
  consideration: ["Learn More", "Sign Up", "Get Quote", "Download"],
  conversion: ["Shop Now", "Buy Now", "Get Offer", "Claim Deal", "Book Now"],
  retargeting: [
    "Come Back",
    "Complete Purchase",
    "Get Your Discount",
    "Shop Now",
  ],
};

function generateVariants(
  info: ProductInfo,
  stage: FunnelStage,
  length: CopyLength,
): AdCopyVariant[] {
  const { name, benefit, audience, painPoint, offer, socialProof, urgency } =
    info;
  const prod = name || "our product";
  const ben = benefit || "transform your results";
  const aud = audience || "people like you";
  const pain = painPoint || "this common struggle";
  const ofr = offer || "a special offer";
  const sp = socialProof || "thousands of happy customers";
  const urg = urgency || "limited time";

  const short = length === "short";
  const long = length === "long";

  if (stage === "awareness") {
    return [
      {
        label: "Problem-focused",
        headline: `Are You Still Struggling With ${pain}?`,
        body: short
          ? `${aud} are finding a better way. Discover how ${prod} helps you ${ben}.`
          : `If you're tired of ${pain}, you're not alone.\n\n${aud} deal with this every day — and most don't realise there's a better way.\n\n${prod} was built to help you ${ben} without the frustration.\n\n${long ? `Here's what makes it different:\n→ [Differentiator 1]\n→ [Differentiator 2]\n→ [Differentiator 3]\n\n` : ""}Curious? Click to learn more.`,
        cta: "Learn More",
      },
      {
        label: "Education-first",
        headline: `The Surprising Truth About ${pain}`,
        body: short
          ? `Most ${aud} don't know this. ${prod} changes everything.`
          : `Did you know that ${pain} could be costing you more than you think?\n\nMost ${aud} accept it as normal — but it doesn't have to be.\n\n${prod} is helping ${sp} find a smarter path to ${ben}.\n\n${long ? "In this video/article, you'll discover:\n✅ Why [old solution] doesn't work\n✅ What actually does\n✅ How to get started today\n\n" : ""}Watch/Read to see for yourself.`,
        cta: "See More",
      },
      {
        label: "Social proof",
        headline: `Why ${sp} Choose ${prod}`,
        body: short
          ? `Join ${sp} already experiencing ${ben}. See what you've been missing.`
          : `${sp} have discovered a better way to ${ben}.\n\nThey used to deal with ${pain} just like you.\n\nNow? ${ben.charAt(0).toUpperCase() + ben.slice(1)}.\n\n"[Testimonial quote from a happy customer]"\n— [Customer name], ${audience || "happy customer"}\n\n${long ? "Sound like something you need? Click to find out how.\n\n" : ""}Learn more below 👇`,
        cta: "Learn More",
      },
    ];
  }

  if (stage === "consideration") {
    return [
      {
        label: "Comparison",
        headline: `${prod} vs [Competitor]: See the Difference`,
        body: short
          ? `Not all solutions are equal. See why ${aud} prefer ${prod} for ${ben}.`
          : `There are a lot of options out there for ${pain}.\n\nBut not all of them actually deliver ${ben}.\n\nHere's how ${prod} is different:\n\n✅ [Feature 1 that competitors lack]\n✅ [Feature 2 that competitors lack]\n✅ [Feature 3 that competitors lack]\n\n${long ? `"[Testimonial from someone who switched]"\n— [Name]\n\n` : ""}Ready to make the switch? ${ofr}.`,
        cta: "Get Quote",
      },
      {
        label: "Objection handler",
        headline: `"Is ${prod} Really Worth It?"`,
        body: short
          ? `Fair question. Here's what ${sp} say after using it. Spoiler: yes.`
          : `We get this question a lot.\n\nAnd it's a fair one — you've probably tried other solutions for ${pain} before.\n\nSo let's be direct:\n\n${prod} is for ${aud} who want to ${ben} without [common objection, e.g. wasting time/money/effort].\n\nIf that's not you, we're not the right fit.\n\nBut if it is? ${sp} are already seeing results like:\n→ "[Result 1]"\n→ "[Result 2]"\n\n${long ? `${ofr}. See if it's right for you.\n\n` : ""}Judge for yourself 👇`,
        cta: "Learn More",
      },
      {
        label: "Lead magnet",
        headline: `Free ${benefit.includes("guide") ? "Guide" : "Resource"}: How to ${ben}`,
        body: short
          ? `Download our free guide and learn how ${aud} are solving ${pain}.`
          : `We put together a free [guide/checklist/webinar] to help ${aud} finally solve ${pain}.\n\nInside you'll find:\n📌 [Key insight 1]\n📌 [Key insight 2]\n📌 [Key insight 3]\n\nNo fluff. No sales pitch. Just actionable advice.\n\n${long ? `We've helped ${sp} implement this already.\n\nYour turn?\n\n` : ""}Download it free 👇`,
        cta: "Download",
      },
    ];
  }

  if (stage === "conversion") {
    return [
      {
        label: "Urgency + Offer",
        headline: `⚠️ ${urg}: ${ofr} Ending Soon`,
        body: short
          ? `Don't miss out — ${ofr} for ${prod}. Get ${ben} before it's gone.`
          : `This is your last chance.\n\n${prod} is currently offering ${ofr} — but only for ${urg}.\n\nHere's what you get:\n✅ ${ben}\n✅ [Bonus 1]\n✅ [Bonus 2]\n✅ [Guarantee or risk-reversal]\n\n${sp} are already inside. Will you join them?\n\n${long ? `After ${urg}, the offer disappears.\n\nDon't let ${pain} hold you back any longer.\n\n` : ""}Grab it now 👇`,
        cta: "Shop Now",
      },
      {
        label: "Direct response",
        headline: `Get ${ben} — Starting Today`,
        body: short
          ? `${prod}: the fastest way for ${aud} to ${ben}. ${ofr}.`
          : `If you're ready to stop dealing with ${pain} and finally ${ben}, this is for you.\n\n${prod} makes it simple:\n\n→ Step 1: [Simple first step]\n→ Step 2: [Simple second step]\n→ Step 3: ${ben}\n\n${sp} are already using it. ${ofr}.\n\n${long ? `And if it doesn't work for you? [Your guarantee — e.g. money-back, free trial, etc.]\n\nZero risk. Real results.\n\n` : ""}Click below to get started 👇`,
        cta: "Get Offer",
      },
      {
        label: "Testimonial-driven",
        headline: `"${ben.charAt(0).toUpperCase() + ben.slice(1)} — finally" — [Customer Name]`,
        body: short
          ? `"[Short powerful testimonial]" — [Customer]. Join ${sp} and ${ben} with ${prod}.`
          : `Here's what ${aud} are saying about ${prod}:\n\n⭐⭐⭐⭐⭐\n"[Testimonial that addresses the main pain point and shows transformation]"\n— [Name, title or location]\n\n⭐⭐⭐⭐⭐\n"[Second testimonial focused on results]"\n— [Name]\n\nYou could be next.\n\n${ofr} — ${urg}.\n\n${long ? `P.S. [Your guarantee or risk-reversal statement].\n\n` : ""}Join ${sp} 👇`,
        cta: "Buy Now",
      },
    ];
  }

  // retargeting
  return [
    {
      label: "Cart abandonment",
      headline: `You Left Something Behind, ${audience ? audience.split(" ")[0] : "Friend"} 👀`,
      body: short
        ? `Your ${prod} is still waiting. Complete your order and ${ben}.`
        : `Hey — we noticed you were checking out ${prod} but didn't complete your purchase.\n\nNo worries. It happens.\n\nBut we didn't want you to miss out on ${ben}.\n\n${ofr} is still available for a limited time.\n\nStill have questions? [Link to FAQ or chat]\n\n${long ? `And remember: [Your guarantee].\n\nCome back and finish what you started.\n\n` : ""}Your cart is waiting 👇`,
      cta: "Complete Purchase",
    },
    {
      label: "Discount incentive",
      headline: `We Want You Back — Here's ${ofr}`,
      body: short
        ? `We saved ${ofr} just for you. Get ${ben} with ${prod} — this won't last.`
        : `It's been a while since you visited.\n\nWe've been working hard to help ${aud} ${ben} — and we want you to experience it too.\n\nSo here's something special: ${ofr}.\n\nUse it on ${prod} and finally solve ${pain}.\n\n${sp} are already getting results.\n\n${long ? `This offer expires ${urgency || "soon"} — don't miss it.\n\n` : ""}Come back and claim it 👇`,
      cta: "Get Your Discount",
    },
    {
      label: "New objection",
      headline: `Still on the Fence About ${prod}?`,
      body: short
        ? `We get it. Here's what ${sp} say — and our [guarantee]. No risk.`
        : `We know you've been thinking about it.\n\nMaybe you're wondering if ${prod} is really worth it for ${pain}.\n\nFair. So let's remove all the risk:\n\n[Your guarantee — e.g. 30-day money-back, free trial]\n\nIf you don't ${ben}, you pay nothing.\n\n${sp} have already made the leap. Your turn?\n\n${long ? `And we just added: ${ofr}.\n\nAll risk is on us.\n\n` : ""}See for yourself 👇`,
      cta: "Shop Now",
    },
  ];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FacebookAdCopyGeneratorClient() {
  const [stage, setStage] = useState<FunnelStage>("awareness");
  const [objective, setObjective] = useState<AdObjective>("traffic");
  const [length, setLength] = useState<CopyLength>("medium");
  const [info, setInfo] = useState<ProductInfo>({
    name: "",
    benefit: "",
    audience: "",
    painPoint: "",
    offer: "",
    socialProof: "",
    urgency: "",
  });
  const [variants, setVariants] = useState<AdCopyVariant[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const stageCfg = STAGES[stage];

  const setField = (key: keyof ProductInfo, value: string): void =>
    setInfo((prev) => ({ ...prev, [key]: value }));

  const generate = (): void => {
    setVariants(generateVariants(info, stage, length));
  };

  const copyVariant = (v: AdCopyVariant, idx: number): void => {
    const text = `HEADLINE:\n${v.headline}\n\nAD COPY:\n${v.body}\n\nCTA: ${v.cta}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const FIELD_DEFS: {
    key: keyof ProductInfo;
    label: string;
    placeholder: string;
    required?: boolean;
  }[] = [
    {
      key: "name",
      label: "Product / Service Name",
      placeholder: "e.g. FitCoach App, Smith's Bakery…",
      required: true,
    },
    {
      key: "benefit",
      label: "Main Benefit (outcome)",
      placeholder: "e.g. lose 10 lbs in 30 days, double your revenue…",
      required: true,
    },
    {
      key: "audience",
      label: "Target Audience",
      placeholder: "e.g. busy moms, small business owners over 40…",
      required: true,
    },
    {
      key: "painPoint",
      label: "Pain Point / Problem",
      placeholder: "e.g. struggling to find time to exercise…",
      required: true,
    },
    {
      key: "offer",
      label: "Offer / Hook",
      placeholder: "e.g. 50% off first month, free 7-day trial…",
      required: false,
    },
    {
      key: "socialProof",
      label: "Social Proof",
      placeholder: "e.g. 10,000+ customers, 4.9★ on App Store…",
      required: false,
    },
    {
      key: "urgency",
      label: "Urgency / Scarcity",
      placeholder: "e.g. this week only, only 20 spots left…",
      required: false,
    },
  ];

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-4 shadow-lg'>
              <span className='text-2xl'>📘</span>
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Facebook Ad Copy Generator
            </h2>
            <p className='text-gray-600'>
              Create converting ad copy for every stage of the funnel
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Left: Config */}
            <div className='space-y-5'>
              {/* Funnel stage */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Funnel Stage
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  {(Object.keys(STAGES) as FunnelStage[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStage(s);
                        setVariants([]);
                      }}
                      className={`text-left px-3 py-2.5 rounded-xl border-2 transition-all ${
                        stage === s
                          ? "border-blue-500 bg-blue-50 scale-[1.02] shadow"
                          : "border-gray-100 bg-gray-50 hover:border-blue-200"
                      }`}
                    >
                      <div className='text-sm font-bold text-gray-900'>
                        {STAGES[s].icon} {STAGES[s].label}
                      </div>
                      <div className='text-xs text-gray-500 leading-tight mt-0.5'>
                        {STAGES[s].desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Objective + Length */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Objective
                  </label>
                  <select
                    value={objective}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setObjective(e.target.value as AdObjective)
                    }
                    className='w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-sm'
                  >
                    {OBJECTIVES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Copy Length
                  </label>
                  <div className='flex border-2 border-gray-200 rounded-xl overflow-hidden'>
                    {(["short", "medium", "long"] as CopyLength[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors ${
                          length === l
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Product Details
                </label>
                <div className='space-y-2'>
                  {FIELD_DEFS.map(({ key, label, placeholder, required }) => (
                    <div key={key}>
                      <label className='block text-xs font-medium text-gray-600 mb-0.5'>
                        {label}{" "}
                        {required && <span className='text-red-400'>*</span>}
                      </label>
                      <input
                        type='text'
                        value={info[key]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setField(key, e.target.value)
                        }
                        placeholder={placeholder}
                        className='w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-sm'
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={generate}
                className='w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg'
              >
                <Zap className='w-5 h-5' />
                Generate Ad Copy Variants
              </button>
            </div>

            {/* Right: Variants */}
            <div>
              {variants.length > 0 ? (
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div
                      className={`w-2 h-2 rounded-full ${stageCfg.bgColor}`}
                    />
                    <span className='text-sm font-bold text-gray-700'>
                      {stageCfg.icon} {stageCfg.label} — {variants.length}{" "}
                      Variants
                    </span>
                  </div>

                  {variants.map((v, idx) => (
                    <div
                      key={v.label}
                      className='bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-blue-200 transition-all'
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full'>
                          {v.label}
                        </span>
                        <button
                          onClick={() => copyVariant(v, idx)}
                          aria-label='Copy ad copy'
                          className='flex items-center gap-1.5 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors'
                        >
                          {copiedIdx === idx ? (
                            <>
                              <Check className='w-3 h-3' /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className='w-3 h-3' /> Copy
                            </>
                          )}
                        </button>
                      </div>

                      <div className='space-y-2 text-sm'>
                        <div>
                          <div className='text-xs font-semibold text-gray-500 mb-0.5'>
                            HEADLINE
                          </div>
                          <div className='font-bold text-gray-900'>
                            {v.headline}
                          </div>
                        </div>
                        <div>
                          <div className='text-xs font-semibold text-gray-500 mb-0.5'>
                            AD COPY
                          </div>
                          <div className='text-gray-700 leading-relaxed whitespace-pre-wrap text-xs'>
                            {v.body}
                          </div>
                        </div>
                        <div className='flex items-center gap-2 pt-1'>
                          <div className='text-xs font-semibold text-gray-500'>
                            CTA BUTTON:
                          </div>
                          <span className='px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold'>
                            {v.cta}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className='p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800'>
                    💡 <strong>A/B test tip:</strong> Run all 3 variants against
                    each other with identical audiences and budgets. Let them
                    run for at least 3–5 days before optimising. The winner
                    usually surprises you.
                  </div>
                </div>
              ) : (
                <div className='h-full flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400'>
                  <span className='text-5xl mb-4'>📘</span>
                  <p className='font-semibold text-gray-600'>
                    Fill in your product details
                  </p>
                  <p className='text-sm mt-1'>
                    3 ad copy variants will appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className='mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600'>
            <p className='font-bold text-gray-900 mb-2'>
              📐 Facebook Ad Copy Best Practices
            </p>
            <div className='grid md:grid-cols-2 gap-x-6 gap-y-1 text-xs list-disc list-inside'>
              {[
                "Lead with the pain or benefit — don't bury the lede",
                "Use 'you' and 'your' — talk to one person, not many",
                "Short copy for cold traffic; long copy for retargeting",
                "One idea per ad — don't confuse with multiple messages",
                "Test emoji in headlines — they often lift CTR 10–20%",
                "Always include a clear, single CTA — one action only",
                "Mobile-first: first line must hook without 'see more' click",
                "Social proof near the CTA dramatically lifts conversions",
              ].map((tip) => (
                <div key={tip} className='flex items-start gap-1.5'>
                  <span className='text-gray-400 mt-0.5'>•</span> {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
