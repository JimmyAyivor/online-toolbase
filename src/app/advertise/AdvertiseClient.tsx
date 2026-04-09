"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Animated counter hook ─────────────────────────────────────────────── */

function useCountUp(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ─── Fade-in on scroll ─────────────────────────────────────────────────── */

function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, vis } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Stats counter component ───────────────────────────────────────────── */

function StatCard({
  value,
  suffix,
  label,
  sublabel,
  color,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
}) {
  const { ref, vis } = useFadeIn();
  const count = useCountUp(value, 1800, vis);
  return (
    <div
      ref={ref}
      className="group bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`text-5xl font-black tracking-tight ${color} mb-1`}>
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-base font-bold text-gray-800 mb-0.5">{label}</div>
      <div className="text-sm text-gray-400">{sublabel}</div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */

const AD_FORMATS = [
  {
    icon: "📐",
    name: "Banner Ads",
    placements: [
      "Leaderboard (728×90)",
      "Rectangle (300×250)",
      "Half Page (300×600)",
    ],
    description:
      "Premium display placements on every tool page — shown to users actively solving a problem. High viewability, high intent.",
    badge: "Most Popular",
    badgeColor: "bg-indigo-100 text-indigo-700",
    goal: ["Brand Awareness", "Direct Traffic"],
  },
  {
    icon: "📌",
    name: "Sponsored Tool Placement",
    placements: [
      "Homepage featured slot",
      "Category page top position",
      "'Recommended Tool' badge",
    ],
    description:
      "Your product or tool featured alongside our organic tools — introduced to users at the exact moment they need a solution.",
    badge: "High Intent",
    badgeColor: "bg-purple-100 text-purple-700",
    goal: ["Lead Generation", "Conversions"],
  },
  {
    icon: "✍️",
    name: "Sponsored Content",
    placements: [
      "Long-form sponsored article",
      "Tutorial or how-to guide",
      "Tool comparison post",
    ],
    description:
      "In-depth editorial content that educates your audience while showcasing your product. Stays on-site permanently for SEO benefit.",
    badge: "Thought Leadership",
    badgeColor: "bg-emerald-100 text-emerald-700",
    goal: ["Authority", "Long-Term Traffic"],
  },
  {
    icon: "📧",
    name: "Newsletter Feature",
    placements: [
      "Dedicated send to full list",
      "Featured placement in digest",
      "Sponsored tip or resource",
    ],
    description:
      "Direct access to our subscriber inbox. Our readers are active, engaged, and have opted in — no cold audience here.",
    badge: "Direct Access",
    badgeColor: "bg-amber-100 text-amber-700",
    goal: ["Awareness", "List Building"],
  },
  {
    icon: "🔝",
    name: "Site Takeover",
    placements: [
      "Sitewide header banner",
      "Exit-intent overlay",
      "Full homepage sponsorship",
    ],
    description:
      "Maximum visibility across the entire site. Ideal for product launches, time-sensitive campaigns, or major brand moments.",
    badge: "Premium",
    badgeColor: "bg-rose-100 text-rose-700",
    goal: ["Maximum Reach", "Launch Campaigns"],
  },
  {
    icon: "🗂️",
    name: "Category Sponsorship",
    placements: [
      "Own an entire category",
      "Branded category header",
      "All tools in category",
    ],
    description:
      "Sponsor a full category — Finance, Health, Developer, Social Media and more. Own the space most relevant to your audience.",
    badge: "Exclusive",
    badgeColor: "bg-sky-100 text-sky-700",
    goal: ["Vertical Ownership", "Relevance"],
  },
];

const AUDIENCE_SEGMENTS = [
  {
    emoji: "💻",
    label: "Developers & Engineers",
    pct: 28,
    desc: "Using code, JSON, regex, hash, and JWT tools daily",
  },
  {
    emoji: "📊",
    label: "Marketers & Growth Teams",
    pct: 24,
    desc: "Social media, SEO, content, and campaign tools",
  },
  {
    emoji: "💰",
    label: "Finance & Business Pros",
    pct: 18,
    desc: "Calculators for loans, ROI, budgets, retirement",
  },
  {
    emoji: "🎨",
    label: "Designers & Creatives",
    pct: 14,
    desc: "Color tools, image tools, gradient generators",
  },
  {
    emoji: "❤️",
    label: "Health & Wellness Seekers",
    pct: 10,
    desc: "BMI, sleep, calorie, fitness calculators",
  },
  {
    emoji: "🎓",
    label: "Students & Educators",
    pct: 6,
    desc: "GPA, writing, math, and conversion tools",
  },
];

const CATEGORIES_COVERED = [
  { name: "Developer & Code", count: 21, icon: "💻" },
  { name: "Writing & Text", count: 20, icon: "✍️" },
  { name: "Calculators", count: 19, icon: "🔢" },
  { name: "Health & Fitness", count: 12, icon: "❤️" },
  { name: "Social Media", count: 12, icon: "📱" },
  { name: "Finance", count: 11, icon: "💰" },
  { name: "Image & Design", count: 12, icon: "🎨" },
  { name: "Productivity", count: 5, icon: "⏱️" },
];

const TESTIMONIALS = [
  {
    quote:
      "We ran a banner campaign for two weeks. The traffic quality was exceptional — users came in already knowing what they needed. Our conversion rate was 3× our usual display average.",
    author: "Head of Growth",
    company: "B2B SaaS Platform",
    logo: "🏢",
  },
  {
    quote:
      "Sponsoring the Finance category put our app in front of exactly the right people. These weren't random clicks — they were people in the middle of a financial decision.",
    author: "Marketing Director",
    company: "Fintech Startup",
    logo: "💳",
  },
  {
    quote:
      "The sponsored article still drives traffic six months later. It's not just an ad — it's a permanent piece of content that helps people and sends them our way.",
    author: "Content Lead",
    company: "Productivity Tools Co.",
    logo: "📋",
  },
];

const BENEFITS = [
  {
    icon: "🎯",
    title: "High-Intent Traffic",
    body: "Users arrive to solve a specific problem — they're not browsing, they're doing. Your ad reaches them at the highest possible intent moment.",
  },
  {
    icon: "📈",
    title: "Measurable Results",
    body: "Every placement comes with full reporting: impressions, clicks, CTR, and where possible, conversion tracking. No black boxes.",
  },
  {
    icon: "🤝",
    title: "Dedicated Support",
    body: "You work directly with our team, not a self-serve platform. We help craft the right message for the right placement.",
  },
  {
    icon: "🔒",
    title: "Brand-Safe Environment",
    body: "All content is original, human-written, and moderated. Your ad will never appear next to harmful or controversial content.",
  },
  {
    icon: "⚡",
    title: "Fast Go-Live",
    body: "Most campaigns go live within 48 hours of creative approval. We move fast and don't bury you in bureaucracy.",
  },
  {
    icon: "♻️",
    title: "Retargeting Pixels Welcome",
    body: "We allow advertiser tracking pixels on paid placements so you can retarget our high-value audience in your own campaigns.",
  },
];

/* ─── Contact form ──────────────────────────────────────────────────────── */

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    goals: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set =
    (k: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">
          Message Received!
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          We&apos;ll review your enquiry and get back to you within one business
          day with our media kit and availability.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors text-sm";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your Name *
          </label>
          <input
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Smith"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Work Email *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="jane@company.com"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Company / Brand *
        </label>
        <input
          required
          value={form.company}
          onChange={set("company")}
          placeholder="Acme Corp"
          className={inputCls}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Monthly Budget
          </label>
          <select
            value={form.budget}
            onChange={set("budget")}
            className={inputCls}
          >
            <option value="">Select a range</option>
            <option>Under $500</option>
            <option>$500 – $1,500</option>
            <option>$1,500 – $5,000</option>
            <option>$5,000 – $15,000</option>
            <option>$15,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Primary Goal
          </label>
          <select
            value={form.goals}
            onChange={set("goals")}
            className={inputCls}
          >
            <option value="">What do you want to achieve?</option>
            <option>Brand Awareness</option>
            <option>Lead Generation</option>
            <option>Direct Traffic / Conversions</option>
            <option>Thought Leadership</option>
            <option>Product Launch</option>
            <option>Retargeting Audience</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Tell us about your campaign
        </label>
        <textarea
          value={form.message}
          onChange={set("message")}
          rows={4}
          placeholder="Which ad formats interest you? Which tool categories are most relevant to your audience? Any timing requirements?"
          className={`${inputCls} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-200 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 text-base"
      >
        {loading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          <>
            <span>Request Media Kit & Availability</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </>
        )}
      </button>
      <p className="text-xs text-center text-gray-400">
        We respond within one business day. No spam, no hard sell.
      </p>
    </form>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */

export default function AdvertiseClient() {
  const [activeGoal, setActiveGoal] = useState<string>("All");
  const goals = [
    "All",
    "Brand Awareness",
    "Lead Generation",
    "Direct Traffic",
    "Thought Leadership",
  ];

  const filtered =
    activeGoal === "All"
      ? AD_FORMATS
      : AD_FORMATS.filter((f) =>
          f.goal.some((g) =>
            g.toLowerCase().includes(activeGoal.toLowerCase()),
          ),
        );

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Now Accepting Advertisers — Limited Slots Available
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              Reach Millions of{" "}
              <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                High-Intent
              </span>{" "}
              Users
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              Free Online Tools serves a massive, actively engaged audience of
              professionals, developers, and creators — people using tools to
              get things done right now. Put your brand in front of them.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold rounded-2xl shadow-xl hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200 text-base"
              >
                Request Media Kit
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#formats"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 hover:scale-105 transition-all duration-200 backdrop-blur-sm text-base"
              >
                See Ad Formats
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-4">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              value={130}
              suffix="+"
              label="Free Tools Live"
              sublabel="Across 16 categories"
              color="text-indigo-600"
            />
            <StatCard
              value={2}
              suffix="M+"
              label="Monthly Page Views"
              sublabel="And growing fast"
              color="text-purple-600"
            />
            <StatCard
              value={1200}
              suffix="+"
              label="Daily Active Users"
              sublabel="Per individual popular tool"
              color="text-pink-600"
            />
            <StatCard
              value={100}
              suffix="%"
              label="Brand-Safe Environment"
              sublabel="Human-written, moderated"
              color="text-emerald-600"
            />
          </div>
        </Reveal>
      </section>

      {/* ── Why advertise ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-5">
                Why Advertise Here
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Users come here{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  to do things.
                </span>
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Most ad inventory reaches passive scrollers. Our audience is
                  fundamentally different — every single user arrives with a
                  specific task to complete. They&apos;re not browsing feeds.
                  They&apos;re solving a real problem.
                </p>
                <p>
                  That intent translates directly into campaign performance.
                  When a user is on our Retirement Calculator, they&apos;re
                  actively thinking about their financial future. When
                  they&apos;re using the Resume Builder, they&apos;re job
                  hunting right now.
                </p>
                <p>
                  Contextual advertising at the exact moment of need —
                  that&apos;s the proposition.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="space-y-3">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.title}
                  className="flex gap-4 p-5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-indigo-100 rounded-2xl hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">
                    {b.icon}
                  </span>
                  <div>
                    <div className="font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">
                      {b.title}
                    </div>
                    <div className="text-sm text-gray-500 leading-relaxed">
                      {b.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Audience breakdown ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-50 to-indigo-50/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-4">
                Audience Intelligence
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Who you&apos;re reaching
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Our audience spans professionals at every level — from solo
                developers to marketing teams at large companies.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Audience segments */}
            <Reveal>
              <div className="space-y-4">
                {AUDIENCE_SEGMENTS.map((seg, i) => (
                  <div
                    key={seg.label}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{seg.emoji}</span>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">
                            {seg.label}
                          </div>
                          <div className="text-xs text-gray-400">
                            {seg.desc}
                          </div>
                        </div>
                      </div>
                      <span className="text-2xl font-black text-indigo-600">
                        {seg.pct}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                        style={{ width: `${seg.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Categories covered */}
            <Reveal delay={150}>
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                  Tool categories covered
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {CATEGORIES_COVERED.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-gray-800">
                          {cat.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {cat.count} tools
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key facts */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
                  <h4 className="font-black text-lg mb-4">
                    Key audience facts
                  </h4>
                  <ul className="space-y-3 text-sm text-indigo-100">
                    {[
                      "Users arrive via Google search — highest possible intent",
                      "Average session: 4+ minutes of active tool use",
                      "60% desktop, 40% mobile — skews professional",
                      "Primary markets: US, UK, Canada, Australia, India",
                      "Repeat visitors: over 40% return within 30 days",
                      "Predominantly 25–44 age bracket",
                    ].map((fact) => (
                      <li key={fact} className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 mt-0.5 text-indigo-300 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Ad formats ────────────────────────────────────────────────────── */}
      <section
        id="formats"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <Reveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide mb-4">
              Advertising Solutions
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Choose your format
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              From display banners to full category sponsorships — we have a
              placement for every goal and every budget.
            </p>
          </div>
        </Reveal>

        {/* Goal filter */}
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {goals.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGoal(g)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeGoal === g
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fmt, i) => (
            <Reveal key={fmt.name} delay={i * 60}>
              <div className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{fmt.icon}</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${fmt.badgeColor}`}
                  >
                    {fmt.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                  {fmt.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
                  {fmt.description}
                </p>
                <div className="space-y-1.5 mb-5">
                  {fmt.placements.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-2 text-xs text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
                  {fmt.goal.map((g) => (
                    <span
                      key={g}
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Don&apos;t see what you need?{" "}
              <a
                href="#contact"
                className="text-indigo-600 font-semibold hover:text-purple-600 transition-colors"
              >
                Get in touch
              </a>{" "}
              — we build custom packages too.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Social proof / Testimonials ───────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-50 to-purple-50/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Advertisers see results
              </h2>
              <p className="text-xl text-gray-500">
                What our advertising partners say about their campaigns.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  {/* Quote marks */}
                  <div className="text-6xl font-black text-indigo-100 leading-none mb-4 select-none">
                    "
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1 italic mb-6 -mt-4">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {t.logo}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {t.author}
                      </div>
                      <div className="text-xs text-gray-400">{t.company}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal>
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 md:p-14 overflow-hidden text-center">
            <div
              className="absolute inset-0 opacity-10"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 50%, white 0%, transparent 50%), radial-gradient(circle at 75% 50%, white 0%, transparent 50%)",
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to reach your audience?
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
                Request our media kit — includes full audience demographics,
                placement specs, rate card, and campaign case studies.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 text-base"
              >
                Get the Media Kit
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Contact form ──────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: info */}
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-5">
                Get in Touch
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
                Let&apos;s build your campaign
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Fill in the form and we&apos;ll respond within one business day
                with our media kit, available placements, and a suggested
                campaign plan based on your goals.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: "📬",
                    title: "Email us directly",
                    detail: "business@onlinetoolbase.com",
                  },
                  {
                    icon: "⚡",
                    title: "Response time",
                    detail: "Within 1 business day",
                  },
                  {
                    icon: "📦",
                    title: "Media kit includes",
                    detail: "Audience data, specs, rates, case studies",
                  },
                  {
                    icon: "🗓️",
                    title: "Campaign go-live",
                    detail: "As fast as 48 hours after approval",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={150} className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 md:p-10">
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Request Media Kit
              </h3>
              <p className="text-gray-400 text-sm mb-8">
                Tell us about your brand and goals. We&apos;ll take it from
                there.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
