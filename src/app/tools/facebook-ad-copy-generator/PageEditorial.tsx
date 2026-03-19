"use client";
// src/app/tools/facebook-ad-copy-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/facebook-ad-copy-generator";
const TOOL_NAME = "Facebook Ad Copy Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#eff6ff" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500'
        >
          ✕
        </button>
        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5'>
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5'>
          <canvas ref={canvasRef} />
        </div>
        <p className='text-xs text-gray-300 font-mono break-all'>{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free Facebook ad copy generator — generate multiple ad variations using AIDA, PAS, FAB, and other frameworks. No signup.",
  );
  const shareUrl = encodeURIComponent(TOOL_URL);
  const copyLink = () => {
    navigator.clipboard.writeText(TOOL_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const SHARES = [
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      bg: "bg-black hover:bg-gray-800",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
    },
  ];
  return (
    <>
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <p className='text-sm font-bold text-gray-900 mb-0.5'>
              Found this useful?
            </p>
            <p className='text-xs text-gray-400'>
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold'
            >
              {copied ? (
                <span className='text-blue-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FRAMEWORKS = [
  [
    "AIDA",
    "Attention → Interest → Desire → Action",
    "Drives a reader from awareness to purchase intent in a single read. Works well for cold audiences who don't know the product.",
  ],
  [
    "PAS",
    "Problem → Agitate → Solution",
    "Leads with the audience's pain point, intensifies it, then presents the product as the answer. Highly effective for retargeting.",
  ],
  [
    "FAB",
    "Features → Advantages → Benefits",
    "Translates product specifications into tangible customer outcomes. Works well for technical or feature-rich products.",
  ],
  [
    "Social Proof",
    "Evidence → Credibility → CTA",
    "Leads with customer results, reviews, or numbers. Effective for products with strong testimonials or case study data.",
  ],
  [
    "Before/After",
    "Before state → After state → Bridge",
    "Shows the transformation your product enables. Strong emotional pull — ideal for health, fitness, and lifestyle products.",
  ],
  [
    "Urgency/FOMO",
    "Limited time → Scarcity → Action",
    "Creates time or quantity pressure to trigger immediate action. Use for sales, launches, and limited availability offers.",
  ],
];

const FAQS = [
  {
    q: "What makes Facebook ad copy convert well?",
    a: "High-converting Facebook ad copy typically has four elements working together. A hook in the first line that stops the scroll — either by addressing the audience's specific pain point, making a bold claim, or opening a pattern interrupt. A clear, specific value proposition that communicates what the product does and for whom in plain language. Social proof or specificity that builds credibility — a customer result, a number, or a specific claim is always more persuasive than vague superlatives. And a clear, single call to action that tells the reader exactly what to do next. Facebook's feed is competitive; ads that attempt to do too many things or speak to everyone convert poorly. The most effective ads are laser-focused on a single audience segment, a single pain point, and a single desired action.",
  },
  {
    q: "How long should Facebook ad copy be?",
    a: "Facebook ad copy length depends on the campaign objective and audience temperature. For cold audiences seeing your brand for the first time, shorter copy (50–150 words in the body) tends to outperform long copy because the audience hasn't yet developed enough interest to read extensively. For warm audiences who've already visited your site or interacted with your brand, longer copy (200–400 words) can work well because they're willing to engage with more detail. Facebook's own data consistently shows that the first 125 characters of ad copy are most visible before a 'See more' truncation in the feed — this is your highest-value real estate. The headline (below the image) should be under 40 characters to avoid truncation on mobile. Test both short and long body copy versions of every ad set — the winning length varies by niche and audience.",
  },
  {
    q: "What is the AIDA formula for Facebook ads?",
    a: "AIDA stands for Attention, Interest, Desire, and Action — a four-stage copywriting framework that guides a reader from first awareness to purchase intent. In Facebook ads: Attention is captured in the first line (the hook) — it interrupts the scroll and makes the reader pause. Interest is built in the next 1–3 sentences by expanding on what the product is and why it's relevant to this specific audience. Desire is created by showcasing the transformation, outcome, or specific benefit the reader will experience — making them want what you're offering. Action is the call to action — a clear, specific instruction (Shop now, Learn more, Get 20% off today) that tells the reader the single next step. AIDA works well for cold audiences on Facebook because it's designed to take someone from no prior awareness to motivated consideration in a short piece of text.",
  },
  {
    q: "What is the PAS copywriting framework?",
    a: "PAS stands for Problem, Agitate, Solution — a three-part copywriting framework that identifies an audience's pain point, intensifies the emotional weight of that problem, then presents the product or service as the relief. In practice: the Problem statement names the specific frustration the audience is experiencing (e.g. 'Struggling to get consistent leads for your consulting business?'). The Agitate section deepens the pain — it expands on the consequences of the problem remaining unsolved, making the reader feel the cost of inaction more acutely. The Solution then introduces the product as the specific answer to the exactly-described problem. PAS is particularly effective for retargeting campaigns (where the audience has already shown interest) and for products that solve a clearly felt pain point, because it leads with empathy before introducing a solution.",
  },
  {
    q: "How many Facebook ad copy variations should I test?",
    a: "Meta (Facebook's parent company) recommends testing 3–5 creative variations per ad set for meaningful A/B test data. For ad copy specifically, testing at least 2–3 variations is the minimum for learning — one variation tells you nothing; two gives you a comparison; three or more gives you a pattern. The most efficient testing approach is to hold one variable constant and change one element at a time: test the same image with different headlines, or the same body copy with different CTAs. Testing too many variables simultaneously makes it impossible to isolate what drove a change in performance. For a new campaign, start with 3 body copy variations using different frameworks (AIDA vs PAS vs social proof), identify the highest performer after sufficient impressions (typically 1,000–3,000 per variation), then iterate from the winner.",
  },
  {
    q: "What are Facebook's ad copy character limits?",
    a: "Facebook's ad copy has several distinct character limit zones, each with different truncation behaviour. The primary text (body copy above the image) shows approximately 125 characters before a 'See more' link in the feed — everything after that is hidden until the user clicks to expand. The headline (bold text below the image or video) has a 40-character soft limit before it may be truncated on mobile placements. The description (grey text below the headline) shows 30 characters on most placements. Link descriptions for link ads are often not shown on mobile at all. For Stories and Reels placements, text overlay is severely limited and the visual creative carries most of the message. This tool generates ad copy components that respect these structural constraints.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-3'>
        {FAQS.map((f, i) => (
          <div
            key={i}
            className='border border-gray-100 rounded-xl overflow-hidden'
          >
            <button
              className='w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors'
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className='font-semibold text-gray-900 text-sm'>{f.q}</span>
              <span className='text-blue-600 text-lg shrink-0'>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className='px-5 pb-5 text-sm text-gray-600 leading-relaxed'>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageEditorial() {
  return (
    <>
      <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
        <div className='hidden sm:block'>
          <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className='block sm:hidden'>
          <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className='max-w-6xl mx-auto px-4 mt-4 flex justify-center'>
        <AdSlot
          variant='leaderboard'
          slotId={SLOT_LEADERBOARD}
          className='hidden sm:flex'
        />
        <AdSlot
          variant='mediumrectangle'
          slotId={SLOT_LEADERBOARD}
          className='flex sm:hidden'
        />
      </div>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <ShareBar />
      </div>

      <section
        id='how-to-use'
        className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'
      >
        <h2 className='text-4xl font-bold text-gray-900 mb-4 text-center'>
          How to Use the Facebook Ad Copy Generator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Enter your product, target audience, and campaign objective — generate
          multiple ad copy variations across proven copywriting frameworks, then
          copy and test the ones that best match your campaign.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Enter your product and target audience",
              body: "Describe your product or service in specific terms — 'project management software for remote teams' will generate more targeted ad copy than 'software'. Then describe your target audience: who they are, what they need, and what pain they're trying to solve. The more specific your audience description, the more relevant and targeted the generated copy will be. Generic inputs produce generic copy that speaks to no one.",
              enrich: (
                <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                  <strong>Specificity tip:</strong> Include your audience's
                  specific pain point or desired outcome in the description.
                  'Freelance designers who waste time chasing late client
                  payments' is more useful than 'freelancers'. The generator
                  uses your description to construct the Problem or Attention
                  component of each framework, which is the most critical line
                  in any Facebook ad.
                </div>
              ),
            },
            {
              n: 2,
              title: "Select your campaign objective",
              body: "Choose the goal of this ad — Awareness, Traffic, Leads, or Sales. The objective shapes the tone and call to action of the generated copy: awareness-focused copy is softer and informational; traffic copy leads with curiosity and a clear click incentive; lead generation copy emphasises what the reader gets for signing up; sales copy is direct and conversion-focused with urgency or social proof. Matching your copy's CTA to your actual campaign objective improves ad relevance scores.",
              enrich: (
                <div className='bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed'>
                  <strong>Objective alignment:</strong> A mismatch between ad
                  copy tone and campaign objective is a common mistake. Using
                  sales-pressure copy for an awareness campaign creates friction
                  with cold audiences; using soft awareness copy for a
                  conversion campaign leaves purchase intent on the table. Match
                  the CTA urgency and specificity to where the audience is in
                  their consideration journey.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review variations across copywriting frameworks",
              body: "The generator produces ad copy variations using multiple proven copywriting frameworks — AIDA, PAS, FAB, Social Proof, Before/After, and Urgency/FOMO. Each framework is structured differently and appeals to different psychological drivers. Review all variations before selecting — often the best-performing framework for a given product and audience is not the one you'd predict instinctively.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Framework
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Structure
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {FRAMEWORKS.map(([name, structure, use]) => (
                        <tr key={name} className='hover:bg-blue-50'>
                          <td className='px-4 py-2 font-bold text-blue-700 text-xs whitespace-nowrap'>
                            {name}
                          </td>
                          <td className='px-4 py-2 text-xs font-mono text-gray-600'>
                            {structure}
                          </td>
                          <td className='px-4 py-2 text-xs text-gray-500'>
                            {use}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy, customise, and A/B test",
              body: "Copy your preferred variations and paste them into Meta Ads Manager. Before publishing, personalise any placeholder text and ensure the copy sounds authentic to your brand voice. Set up at least 2–3 variations per ad set using different frameworks to run as an A/B test. After accumulating sufficient impressions (typically 1,000–3,000 per variation), pause underperformers and iterate from the winner. Track CTR and conversion rate — not just clicks — as the primary success metrics.",
              enrich: (
                <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                  <strong>Testing protocol:</strong> Change one element at a
                  time when A/B testing — if you change both the headline and
                  body copy simultaneously, you can't know which drove the
                  difference. Start by testing different copywriting frameworks
                  with the same visual creative, then test different headlines
                  within the winning framework, then test different CTAs. This
                  methodical approach builds a clear picture of what resonates
                  with your specific audience.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
                {n}
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {title}
                </h3>
                <p className='text-gray-600 leading-relaxed mb-3'>{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
          Common use cases
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            {
              emoji: "🛍️",
              title: "E-commerce product ads",
              desc: "Generate multiple ad copy variations for product launches and seasonal promotions — test AIDA vs social proof vs urgency to find your highest-converting format.",
            },
            {
              emoji: "🎓",
              title: "Lead generation campaigns",
              desc: "Write lead magnet and webinar registration ad copy that clearly communicates the value exchange and drives sign-ups.",
            },
            {
              emoji: "💼",
              title: "B2B service ads",
              desc: "Generate professional ad copy for SaaS, consulting, and B2B services — use FAB framework to translate features into tangible business outcomes.",
            },
            {
              emoji: "📣",
              title: "Retargeting campaigns",
              desc: "Create PAS-framework copy for warm audiences who've visited your site — lead with the problem they've already shown interest in solving.",
            },
            {
              emoji: "🏋️",
              title: "Health and fitness offers",
              desc: "Generate Before/After and transformation-focused copy for fitness, nutrition, and wellness products — outcome-focused messaging drives high intent.",
            },
            {
              emoji: "🚀",
              title: "App and SaaS launches",
              desc: "Write multiple copy variations for app installs and free trial sign-ups — test different benefit-focused headlines to maximise cost per install.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-blue-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>📣</div>
          <h3 className='text-xl font-bold mb-3'>
            The first 125 characters decide whether your ad gets read — the
            framework decides whether it converts
          </h3>
          <p className='text-blue-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Facebook truncates ad body copy after approximately 125 characters
            in the feed — everything after that requires a 'See more' click.
            This means the opening of your ad copy must do two jobs
            simultaneously: stop the scroll with a hook that's compelling enough
            to read, and give enough information that a disengaged user still
            understands the core offer. The copywriting framework you use shapes
            how you open — AIDA leads with an attention hook, PAS leads with the
            audience's problem, social proof leads with a credibility signal.
            Use this generator to produce multiple framework variations and test
            which opening style resonates most with your specific audience and
            product category.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Social Media Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/instagram-post-planner",
                label: "Instagram Post Planner",
                desc: "Plan Instagram posts with captions, hashtags, and scheduling — visual grid layout and CSV export.",
              },
              {
                href: "/tools/engagement-rate-calculator",
                label: "Engagement Rate Calculator",
                desc: "Calculate engagement rate by followers, reach, or impressions for any social media platform.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Instagram, TikTok, and LinkedIn — mixed by popularity tier, ready to copy.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5'
              >
                <div className='font-bold text-gray-900 text-sm mb-1'>
                  {label}
                </div>
                <div className='text-xs text-gray-500'>{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
