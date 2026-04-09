"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ─── Hooks ──────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ─── Fade-in section wrapper ────────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left" | "right";
}) {
  const { ref, visible } = useInView(0.1);
  const transforms: Record<string, string> = {
    bottom: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[from],
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated stat card ─────────────────────────────────────────────────── */

function StatCard({
  value,
  suffix = "",
  label,
  description,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  delay: number;
}) {
  const { ref, visible } = useInView(0.3);
  const count = useCountUp(value, 1600, visible);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
        {/* accent corner */}
        <div
          className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-3xl"
          aria-hidden="true"
        />
        <div className="text-6xl font-black text-gray-900 tabular-nums mb-1">
          {count}
          {suffix}
        </div>
        <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
          {label}
        </div>
        <div className="text-sm text-gray-500 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const PRINCIPLES = [
  {
    number: "01",
    title: "Your data never leaves your device.",
    body: "Every tool runs entirely in your browser using JavaScript. Nothing you type, paste, calculate, or upload is ever transmitted to our servers. We engineered it this way deliberately — not as a feature, but as a constraint we hold ourselves to.",
    accent: "from-indigo-500 to-blue-600",
  },
  {
    number: "02",
    title: "Free means free. Not free-then-paid.",
    body: "We've seen the playbook: offer something free, wait for dependency, introduce a paywall. We're not doing that. Every feature of every tool is and will remain completely free. We're sustained by non-intrusive ads — and that's enough.",
    accent: "from-violet-500 to-purple-600",
  },
  {
    number: "03",
    title: "No accounts. No friction. No nonsense.",
    body: "You shouldn't need to verify your email to calculate your BMI or generate a QR code. Click a tool, use it, leave. That's the entire experience. We removed every unnecessary step between you and the result you need.",
    accent: "from-pink-500 to-rose-600",
  },
  {
    number: "04",
    title: "Craft over quantity.",
    body: "We don't ship tools that half-work. Every calculator has been tested against real-world inputs. Every converter handles edge cases. Every generator produces output you can actually use. Quality takes longer — it's worth it.",
    accent: "from-emerald-500 to-teal-600",
  },
];

const CATEGORIES = [
  { emoji: "✍️", name: "Writing & Text", count: 20 },
  { emoji: "💻", name: "Developer", count: 20 },
  { emoji: "🔢", name: "Calculators", count: 17 },
  { emoji: "💰", name: "Finance", count: 11 },
  { emoji: "❤️", name: "Health", count: 12 },
  { emoji: "📱", name: "Social Media", count: 12 },
  { emoji: "🎨", name: "Design & Image", count: 12 },
  { emoji: "⏱️", name: "Productivity", count: 5 },
  { emoji: "🔒", name: "Security", count: 2 },
  { emoji: "🎲", name: "Fun & Utilities", count: 5 },
  { emoji: "📣", name: "Marketing", count: 4 },
  { emoji: "💼", name: "Business", count: 4 },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function AboutClient() {
  /* Ticker for the hero number */
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCount = useCountUp(130, 2000, heroVisible);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeroVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-white">
      {/* ════════════════════════════════════════════════════════════════════
          HERO — dark, full-bleed, typographically driven
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-950 overflow-hidden min-h-[92vh] flex flex-col justify-center">
        {/* Mesh background */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.25),transparent)]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_70%)]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-semibold mb-10 opacity-0"
            style={{ animation: "fadeUp 0.6s ease 0.1s forwards" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            About Free Online Tools
          </div>

          {/* Main heading */}
          <div className="overflow-hidden mb-6">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter opacity-0"
              style={{
                animation:
                  "fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.2s forwards",
              }}
            >
              Built for
            </h1>
          </div>
          <div className="overflow-hidden mb-10">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter opacity-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{
                animation:
                  "fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.35s forwards",
              }}
            >
              people,
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter opacity-0"
              style={{
                animation:
                  "fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.5s forwards",
              }}
            >
              not paywalls.
            </h1>
          </div>

          {/* Sub-copy + CTA row */}
          <div
            className="mt-14 flex flex-col lg:flex-row lg:items-end justify-between gap-10 opacity-0"
            style={{ animation: "fadeUp 0.7s ease 0.7s forwards" }}
          >
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
              We believe every person deserves professional-grade tools —
              without signing up, paying up, or giving up their data. So we
              built{" "}
              <span className="text-white font-semibold">130+ of them</span> and
              made them free. Forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Browse All Tools
                <svg
                  className="w-4 h-4"
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
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/15 transition-all duration-200 hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
          aria-hidden="true"
        />

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ANIMATED STATS — white bg, large counters
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            value={130}
            suffix="+"
            label="Free Tools"
            description="Across writing, finance, health, developer, design, social media, and more."
            delay={0}
          />
          <StatCard
            value={15}
            suffix=""
            label="Categories"
            description="Something useful for developers, students, marketers, and everyday people alike."
            delay={80}
          />
          <StatCard
            value={100}
            suffix="%"
            label="Browser-Based"
            description="Every tool processes locally. Zero server involvement. Zero data exposure."
            delay={160}
          />
          <StatCard
            value={0}
            suffix=""
            label="Data Collected"
            description="We don't log inputs, store sessions, or track what you do with our tools."
            delay={240}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ORIGIN STORY — editorial two-column
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-950 py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-center">
            {/* Left: big typographic statement */}
            <Reveal from="left">
              <div>
                <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-6">
                  Our Origin
                </p>
                <div className="text-5xl sm:text-6xl font-black text-white leading-tight mb-8">
                  We were tired of{" "}
                  <span className="text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
                    bad tools
                  </span>{" "}
                  and worse paywalls.
                </div>
                {/* Decorative line */}
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
              </div>
            </Reveal>

            {/* Right: story paragraphs */}
            <Reveal from="right" delay={150}>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Every time we needed a quick unit converter, a BMI calculator,
                  a QR code — we&apos;d land on a bloated site asking us to
                  create an account, verify an email, or unlock the feature we
                  actually needed. It was absurd. These are simple tools. They
                  should just work.
                </p>
                <p>
                  So we built them ourselves. The first version was twenty
                  tools, a clean design, and a single rule:{" "}
                  <span className="text-white font-semibold">
                    everything runs in the browser, everything is free, no
                    exceptions.
                  </span>
                </p>
                <p>
                  Users found us, requested more tools, and we kept building.
                  130+ tools later, the rule hasn&apos;t changed. The commitment
                  is the same. And we&apos;re nowhere close to done.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BIG NUMBER MOMENT — the 130 ticker
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Counter */}
            <div ref={heroRef} className="text-center lg:text-left">
              <div className="text-[clamp(6rem,18vw,14rem)] font-black leading-none text-gray-900 tabular-nums">
                {heroCount}
                <span className="text-indigo-600">+</span>
              </div>
              <div className="text-2xl font-bold text-gray-500 mt-2 tracking-wide">
                free tools, and counting.
              </div>
            </div>

            {/* Category grid */}
            <div>
              <Reveal>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-6">
                  What&apos;s inside
                </p>
              </Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.map((cat, i) => (
                  <Reveal key={cat.name} delay={i * 40}>
                    <Link
                      href={`/?category=${encodeURIComponent(cat.name)}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition-all duration-200 group"
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <div>
                        <div className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors leading-tight">
                          {cat.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {cat.count} tools
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRINCIPLES — numbered editorial layout
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-20">
              <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-4">
                What we believe
              </p>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight max-w-2xl">
                Four principles we don&apos;t compromise on.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.number} delay={i * 80}>
                <div className="group grid md:grid-cols-[80px_1fr_1.8fr] gap-6 md:gap-10 items-start border border-gray-100 rounded-3xl p-8 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 bg-white">
                  {/* Number */}
                  <div
                    className={`text-4xl font-black bg-gradient-to-br ${p.accent} bg-clip-text text-transparent leading-none`}
                  >
                    {p.number}
                  </div>
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-snug pt-0.5">
                    {p.title}
                  </h3>
                  {/* Body */}
                  <p className="text-gray-500 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRIVACY BREAKDOWN — dark card with checklist
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-950 py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal from="left">
              <div>
                <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-6">
                  Privacy Architecture
                </p>
                <h2 className="text-5xl font-black text-white leading-tight mb-8">
                  Nothing leaves your browser. That&apos;s not a promise —
                  it&apos;s how the code works.
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  We didn&apos;t add privacy as a feature after the fact. We
                  built tools that run client-side from the start, which means
                  there&apos;s no server-side component to even send your data
                  to. Architecture as accountability.
                </p>
              </div>
            </Reveal>

            <Reveal from="right" delay={150}>
              <div className="bg-gray-900 rounded-3xl border border-gray-800 p-8">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">
                  How each tool works
                </div>
                <div className="space-y-4">
                  {[
                    {
                      label: "You open the tool",
                      note: "Page loads static assets only",
                      ok: true,
                    },
                    {
                      label: "You enter your data",
                      note: "Stays in browser memory",
                      ok: true,
                    },
                    {
                      label: "JavaScript processes it locally",
                      note: "Your device does the computation",
                      ok: true,
                    },
                    {
                      label: "You see the result",
                      note: "Instant, no network request",
                      ok: true,
                    },
                    {
                      label: "Data sent to our servers",
                      note: "Never happens",
                      ok: false,
                    },
                    {
                      label: "Data stored or logged anywhere",
                      note: "Never happens",
                      ok: false,
                    },
                  ].map(({ label, note, ok }) => (
                    <div
                      key={label}
                      className="flex items-start gap-4 py-3 border-b border-gray-800 last:border-0"
                    >
                      <div
                        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${ok ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}
                      >
                        {ok ? (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-200">
                          {label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HOW WE'RE SUSTAINED
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-6">
                Sustainability
              </p>
              <h2 className="text-5xl font-black text-gray-900 leading-tight mb-8">
                Free tools cost money to run. Here&apos;s how we do it honestly.
              </h2>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  We display non-intrusive display advertising. Ads appear on
                  our pages but never as pop-ups, overlays, auto-playing video,
                  or anything that gets in the way of using the tools. The tools
                  are always the focus.
                </p>
                <p>
                  That&apos;s the whole model. We don&apos;t sell data, run a
                  freemium tier, take VC funding, or plan an exit. We built
                  something useful, we run it sustainably, and we intend to keep
                  it that way.
                </p>
                <p className="font-semibold text-gray-900">
                  If you use an ad blocker, the tools work perfectly. No
                  degraded experience, no guilt-trip banners. Use it however you
                  like.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CONTACT CTA CARDS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
              Talk to us.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🐛",
                label: "Bug Reports",
                title: "Found something broken?",
                body: "Tell us which tool, what you expected, and what actually happened. We read every report and fix things fast.",
                cta: "Report a bug",
              },
              {
                emoji: "💡",
                label: "Feature Requests",
                title: "Need a tool we don't have?",
                body: "Most of our best tools started as user requests. If you need it, there&apos;s a good chance others do too.",
                cta: "Request a tool",
              },
              {
                emoji: "🤝",
                label: "Partnerships",
                title: "Want to work together?",
                body: "For advertising, sponsorship, or collaboration enquiries — we're a small team and we actually reply.",
                cta: "Get in touch",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <div className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  <div
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-[4rem]"
                    aria-hidden="true"
                  />
                  <div className="text-4xl mb-4">{card.emoji}</div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                    {card.label}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed flex-1 text-sm">
                    {card.body}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-indigo-600 font-bold text-sm group-hover:text-purple-600 transition-colors"
                  >
                    {card.cta}
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA — full-bleed gradient
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 py-28">
        {/* Background orbs */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold mb-10">
              Our commitment
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
              Free today.
              <br />
              Free tomorrow.
              <br />
              <span className="text-indigo-200">Free forever.</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              No paywall is coming. No &ldquo;Pro tier&rdquo; is being planned.
              No acquisition will change what we do. This is a promise — not a
              policy subject to revision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                Start Using the Tools
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
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/25 text-white font-bold rounded-2xl hover:bg-white/20 hover:scale-105 transition-all duration-200"
              >
                Suggest a Tool
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
