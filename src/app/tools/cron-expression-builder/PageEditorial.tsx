"use client";
// src/app/tools/cron-expression-builder/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/cron-expression-builder";
const TOOL_NAME = "Cron Expression Builder";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e1b4b", light: "#eef2ff" },
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-xs w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
        >
          ✕
        </button>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          Scan to open the {TOOL_NAME} on mobile
        </p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5">
          <canvas ref={canvasRef} />
        </div>
        <p className="text-xs text-gray-300 font-mono break-all">{TOOL_URL}</p>
      </div>
    </div>
  );
}

function ShareBar() {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Free cron expression builder — visual cron job editor with presets, plain-English descriptions, and a full syntax reference, no signup",
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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-0.5">
              Found this useful?
            </p>
            <p className="text-xs text-gray-400">
              Share the tool or scan to open on your phone
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5 ${bg}`}
              >
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
            >
              {copied ? (
                <span className="text-indigo-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const FAQS = [
  {
    q: "What is a cron expression and how does it work?",
    a: "A cron expression is a string of five (or six, with seconds) space-separated fields that defines a recurring schedule for a job or task. The standard five-field format is: minute hour day-of-month month day-of-week. Each field specifies when that component of the schedule is active — for example, 0 9 * * 1 means 'at minute 0 of hour 9, every day of the month, every month, on Monday (day 1)' — i.e., every Monday at 9:00 AM. The cron daemon (crond) on Unix/Linux systems reads a crontab file and executes commands at the times specified by their expressions. The name comes from Chronos, the Greek god of time. Modern schedulers like AWS EventBridge, GitHub Actions, Kubernetes CronJobs, and Heroku Scheduler all use cron expression syntax.",
  },
  {
    q: "What do the five cron fields mean?",
    a: "The five fields in a standard cron expression are, in order: Minute (0–59) — the minute within the hour when the job runs. Hour (0–23) — the hour of the day in 24-hour format. Day of Month (1–31) — the day of the month. Month (1–12, or JAN–DEC) — the month of the year. Day of Week (0–7, or SUN–SAT, where both 0 and 7 represent Sunday) — the day of the week. Each field can contain a specific value, a wildcard (*), a range (1-5), a list (1,3,5), a step value (*/15 or 1-30/5), or a combination. In most implementations, if both day-of-month and day-of-week are specified (not wildcards), the job runs when either condition is true, not only when both are true.",
  },
  {
    q: "What do *, /, -, and , mean in cron expressions?",
    a: "Cron expressions use four special characters for flexibility. The asterisk (*) means 'every valid value for this field' — * in the minute field means every minute, * in the hour field means every hour. The forward slash (/) defines step values — */15 in the minute field means every 15 minutes (0, 15, 30, 45), and 0-30/5 means every 5 minutes between 0 and 30. The hyphen (-) defines ranges — 1-5 in the day-of-week field means Monday through Friday. The comma (,) creates lists of specific values — 0,15,30,45 in the minute field means at minutes 0, 15, 30, and 45 of each hour. These can be combined: 0,30 */2 * * * means at minutes 0 and 30 of every other hour.",
  },
  {
    q: "How do I schedule a job to run every hour? Every day? Every weekday?",
    a: "Common schedule patterns and their cron expressions: Every minute: * * * * * — Every hour (at minute 0): 0 * * * * — Every day at midnight: 0 0 * * * — Every day at 9 AM: 0 9 * * * — Every weekday at 9 AM: 0 9 * * 1-5 — Every Monday: 0 0 * * 1 — Every 15 minutes: */15 * * * * — Every 30 minutes: */30 * * * * — First day of every month at midnight: 0 0 1 * * — Every Sunday at 3 AM: 0 3 * * 0 — Every hour during business hours (9–5 weekdays): 0 9-17 * * 1-5. The presets panel in this tool covers the most common patterns — click any preset to load it and then customise if needed.",
  },
  {
    q: "Why does cron use UTC and does timezone matter?",
    a: "Traditional Unix cron (crond) runs in the system's local timezone, which is typically set when the server is configured. However, most cloud platforms and modern schedulers run in UTC by default: AWS EventBridge, GitHub Actions, Google Cloud Scheduler, and Heroku Scheduler all use UTC unless you explicitly specify a timezone. If your server is in UTC and your audience is in New York (UTC-5), a cron job set to run at 0 9 * * * will fire at 9:00 AM UTC — which is 4:00 AM New York time. Always check what timezone your scheduler uses. AWS EventBridge and Google Cloud Scheduler support timezone-aware expressions; GitHub Actions cron runs in UTC only.",
  },
  {
    q: "What is the difference between crontab, cron daemon, and cloud schedulers?",
    a: "Crontab (cron table) is the configuration file that defines which commands to run on which schedule for a specific user — edited with the crontab -e command on Linux/macOS. The cron daemon (crond) is the background process that runs continuously on the server, reads all users' crontabs, and executes commands at the specified times. Cloud schedulers are managed services that replace the need to run crond on your own server: AWS EventBridge Scheduler, Google Cloud Scheduler, Azure Functions Timer Triggers, GitHub Actions scheduled workflows, Heroku Scheduler, and Kubernetes CronJobs all use cron expression syntax but run on the cloud provider's infrastructure, meaning you don't need to manage a server. The expression syntax is compatible across all of these, though some platforms (like AWS EventBridge) use a six-field format that adds a seconds field at the beginning.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-indigo-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            <div
              className="px-5 text-sm text-gray-600 leading-relaxed overflow-hidden transition-all duration-200"
              style={{
                maxHeight: open === i ? "1000px" : "0px",
                paddingBottom: open === i ? "20px" : "0px",
                visibility: open === i ? "visible" : "hidden",
              }}
              aria-hidden={open !== i}
            >
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageEditorial() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
        <div className="hidden sm:block">
          <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
        <div className="block sm:hidden">
          <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-4 flex justify-center">
        <AdSlot
          variant="leaderboard"
          slotId={SLOT_LEADERBOARD}
          className="hidden sm:flex"
        />
        <AdSlot
          variant="mediumrectangle"
          slotId={SLOT_LEADERBOARD}
          className="flex sm:hidden"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ShareBar />
      </div>

      <section
        id="how-to-use"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How to Use the Cron Expression Builder
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Set each field using the visual editor or type directly, pick a
          preset, and copy the finished expression to paste into your scheduler.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Start from a preset or build from scratch",
              body: "Click any of the Quick Presets to instantly load a common schedule — every minute, hourly, daily at midnight, weekdays only, and more. Each preset sets all five fields correctly and displays the generated expression immediately. If you need a schedule not covered by the presets, start from the closest one and modify the individual fields, or clear all fields back to wildcards (*) and build from scratch.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Expression
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Plain English
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["* * * * *", "Every minute"],
                        ["0 * * * *", "Every hour at minute 0"],
                        ["0 0 * * *", "Every day at midnight"],
                        ["0 9 * * 1-5", "Weekdays at 9:00 AM"],
                        ["*/15 * * * *", "Every 15 minutes"],
                        ["0 0 1 * *", "First day of every month at midnight"],
                        [
                          "0 9-17 * * 1-5",
                          "Hourly during business hours (Mon–Fri)",
                        ],
                        ["0 3 * * 0", "Every Sunday at 3:00 AM"],
                      ].map(([expr, desc]) => (
                        <tr key={expr} className="hover:bg-indigo-50">
                          <td className="px-4 py-2 font-mono text-xs text-indigo-700 font-bold">
                            {expr}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-600">
                            {desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 2,
              title: "Configure each field individually",
              body: "Each of the five field panels (Minute, Hour, Day of Month, Month, Day of Week) lets you choose a mode and enter a value. Use the wildcard (*) for 'every value', enter a specific number for an exact time, use step syntax (*/15) for intervals, use range syntax (1-5) for spans, or use list syntax (0,15,30,45) for multiple specific values. Quick-select chips appear below each field for common values — click any chip to insert it into the field directly.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Field ranges:</strong> Minute: 0–59 · Hour: 0–23
                  (24-hour clock) · Day of Month: 1–31 · Month: 1–12 (or
                  JAN–DEC) · Day of Week: 0–7 (0 and 7 are both Sunday; 1 =
                  Monday, 5 = Friday). Note that some platforms also accept
                  three-letter abbreviations for months (JAN, FEB, MAR…) and
                  days (MON, TUE, WED…) — use numbers for maximum compatibility.
                </div>
              ),
            },
            {
              n: 3,
              title: "Read the plain-English schedule description",
              body: "The Generated Expression panel at the bottom shows the finished cron expression in a large monospace display. Below it, a plain-English description of the schedule is generated automatically — for example, '0 9 * * 1-5' is described as 'At 09:00 on every day-of-week from Monday through Friday'. Use this description to verify the schedule is exactly what you intended before deploying the job.",
              enrich: (
                <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                  <strong>Validation tip:</strong> Always read the plain-English
                  description carefully and compare it against your intended
                  schedule. A common mistake is specifying both day-of-month and
                  day-of-week — for example,{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    0 9 1 * 1
                  </code>{" "}
                  does not mean 'the first Monday of the month'. In traditional
                  cron, if both dom and dow are non-wildcard, the job runs when
                  either condition is true (the 1st of the month OR any Monday),
                  not only when both are true.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and use in your scheduler",
              body: "Click the Copy button to copy the expression to your clipboard, then paste it into your scheduler: a crontab file (crontab -e on Linux/macOS), an AWS EventBridge rule, a GitHub Actions schedule trigger (on.schedule.cron), a Kubernetes CronJob spec (spec.schedule), Google Cloud Scheduler, Heroku Scheduler, or any other system that accepts standard cron syntax. Remember to check whether your platform uses UTC or local time.",
              enrich: (
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Platform notes:</strong> GitHub Actions: uses{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    on.schedule.cron
                  </code>
                  , always UTC. AWS EventBridge: uses a six-field format with
                  seconds as the first field — prepend{" "}
                  <code className="bg-white px-1 rounded font-mono">0</code> to
                  your five-field expression. Kubernetes CronJob:{" "}
                  <code className="bg-white px-1 rounded font-mono">
                    spec.schedule
                  </code>{" "}
                  accepts standard five-field cron in the cluster timezone.
                  crontab: runs in the system user's local timezone. Google
                  Cloud Scheduler: supports IANA timezone specification.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                {n}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">{body}</p>
                {enrich}
              </div>
            </div>
          ))}
        </div>

        <FAQSection />

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common use cases
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "🗄️",
              title: "Database backups",
              desc: "Schedule nightly database dumps — 0 2 * * * runs at 2:00 AM every day, safely outside peak traffic hours.",
            },
            {
              emoji: "📧",
              title: "Email digests and reports",
              desc: "Send weekly summary emails every Monday morning — 0 8 * * 1 triggers at 8:00 AM every Monday.",
            },
            {
              emoji: "🔄",
              title: "Cache invalidation",
              desc: "Clear or warm application caches on a schedule — */30 * * * * refreshes every 30 minutes.",
            },
            {
              emoji: "🧹",
              title: "Log and file cleanup",
              desc: "Delete old log files or temp directories on a schedule — 0 0 * * 0 runs every Sunday at midnight.",
            },
            {
              emoji: "🌐",
              title: "API polling and scraping",
              desc: "Poll an external API or scrape data on a schedule — */5 * * * * checks every 5 minutes.",
            },
            {
              emoji: "📊",
              title: "Report generation",
              desc: "Generate analytics reports at the start of each month — 0 6 1 * * runs at 6:00 AM on the 1st.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⏰</div>
          <h3 className="text-xl font-bold mb-3">
            Always verify your cron expression against UTC before deploying
          </h3>
          <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
            The most common cron scheduling mistake is timezone confusion. Most
            cloud schedulers (GitHub Actions, AWS EventBridge, Google Cloud
            Scheduler) run in UTC by default. If you want a job to run at 9:00
            AM New York time (UTC-5), you need to set the hour field to 14 (UTC)
            in winter and 13 (UTC) in summer (due to daylight saving). Check
            your platform's timezone documentation carefully and, where
            available, use IANA timezone identifiers to define timezone-aware
            schedules rather than manually offsetting the hour field.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Developer Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/regex-tester",
                label: "Regex Tester",
                desc: "Test regular expressions against sample text — highlights matches and shows capture groups.",
              },
              {
                href: "/tools/timestamp-converter",
                label: "Timestamp Converter",
                desc: "Convert Unix timestamps to human-readable dates and times in any timezone.",
              },
              {
                href: "/tools/uuid-guid-generator",
                label: "UUID/GUID Generator",
                desc: "Generate Version 4 UUIDs instantly — useful for job IDs, idempotency keys, and task identifiers.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
              >
                <div className="font-bold text-gray-900 text-sm mb-1">
                  {label}
                </div>
                <div className="text-xs text-gray-500">{desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
