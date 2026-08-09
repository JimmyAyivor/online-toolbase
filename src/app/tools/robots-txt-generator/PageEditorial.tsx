"use client";
// src/app/tools/robots-txt-generator/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

const TOOL_URL = "https://www.onlinetoolbase.com/tools/robots-txt-generator";
const TOOL_NAME = "Robots.txt Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#f0f7ff" },
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
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          aria-label="Close QR code modal"
        >
          ✕
        </button>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-white"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" rx="0.5" />
            <rect x="18" y="14" width="3" height="3" rx="0.5" />
            <rect x="14" y="18" width="3" height="3" rx="0.5" />
            <rect x="18" y="18" width="3" height="3" rx="0.5" />
          </svg>
        </div>
        <h3 className="text-lg font-black text-gray-900 mb-1">
          Take it with you
        </h3>
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">
          Scan with your phone camera to open the {TOOL_NAME} on mobile
        </p>
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5">
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
    "Free robots.txt generator — build a valid robots.txt file to control search engine crawlers in seconds",
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
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
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
              Share the tool or scan to open it on your phone
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SHARES.map(({ label, href, bg, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${label}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                {icon}
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all"
            >
              {copied ? (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy link
                </>
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              aria-label="Open QR code"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                  clipRule="evenodd"
                />
                <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
              </svg>
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
    q: "What is a robots.txt file and why do I need one?",
    a: "A robots.txt file is a plain text file placed at the root of your domain that tells search engine crawlers and other bots which pages or sections of your site they are allowed or not allowed to access. While it's not mandatory, having a correctly configured robots.txt file is considered a basic SEO best practice. It prevents crawlers from indexing staging pages, admin areas, or duplicate content that could harm your search rankings.",
  },
  {
    q: "Does robots.txt actually stop bots from accessing my pages?",
    a: "It stops well-behaved bots — Googlebot, Bingbot, and most legitimate crawlers follow the Robots Exclusion Protocol by convention. However, malicious bots, scrapers, and some AI training crawlers may ignore your robots.txt entirely. If you need to genuinely prevent access to sensitive pages, use server-side authentication or firewall rules rather than relying on robots.txt alone.",
  },
  {
    q: "If I disallow a page in robots.txt, will it be removed from Google's index?",
    a: "Not automatically. Blocking a page in robots.txt prevents Google from crawling it, but if the page already has inbound links from other sites, Google may still show it in search results with a 'no information' snippet. To fully de-index a page, use a noindex meta tag (on pages Google can still crawl) or the URL Removal Tool in Google Search Console. Disallowing in robots.txt is not a substitute for the noindex directive.",
  },
  {
    q: "What does the * wildcard mean in User-agent?",
    a: "User-agent: * means the rule applies to all crawlers that don't have a more specific rule in the file. It acts as a default. You can then add separate blocks for specific bots — for example, blocking all crawlers from /admin with a * rule while allowing Googlebot with a separate Googlebot-specific Allow rule. More specific User-agent blocks always take precedence over the wildcard block.",
  },
  {
    q: "Should I block AI crawlers like GPTBot and Claude-Web?",
    a: "This is a growing debate among website owners. Blocking AI training crawlers prevents your content from being used in training datasets for large language models. OpenAI's GPTBot, Anthropic's Claude-Web, and Common Crawl's CCBot all respect robots.txt. If protecting your content from AI training is important to you — particularly for creative work, journalism, or proprietary research — the 'Block AI crawlers' preset in the tool sets up the relevant disallow rules in one click.",
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
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-900 text-sm">
                {faq.q}
              </span>
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
              {faq.a}
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
        aria-labelledby="how-to-use-heading"
      >
        <h2
          id="how-to-use-heading"
          className="text-4xl font-bold text-gray-900 mb-4 text-center"
        >
          How to Use the Robots.txt Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Choose a preset for common scenarios or build a custom robots.txt from
          scratch — add rules for individual crawlers, block specific paths, and
          download the file ready to deploy to your server root.
        </p>

        <div className="space-y-6 mb-14">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Start with a preset or a blank rule
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The three quick-preset buttons cover the most common scenarios.
                Choose one to populate the builder instantly, or start from the
                default rule and customise it.
              </p>
              <div className="space-y-2">
                {[
                  {
                    label: "✅ Allow all",
                    desc: "Sets User-agent: * with Allow: / — gives all crawlers full access to every page. The correct choice for most public-facing websites with nothing to hide from search engines.",
                  },
                  {
                    label: "🚫 Block all",
                    desc: "Sets Disallow: / for all crawlers — completely prevents any bot from crawling your site. Use this for staging sites, development environments, or sites not ready for public indexing.",
                  },
                  {
                    label: "🤖 Block AI crawlers",
                    desc: "Allows general search engines while specifically blocking GPTBot, Claude-Web, anthropic-ai, and CCBot — the most common AI training crawlers that respect robots.txt.",
                  },
                ].map(({ label, desc }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <span className="font-bold text-gray-900 flex-shrink-0 w-36 text-xs">
                      {label}
                    </span>
                    <p className="text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Configure your User-agent and paths
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Choose the <strong>User-agent</strong> from the dropdown —
                select{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">
                  *
                </code>{" "}
                for all crawlers, or a specific bot for a targeted rule. Then
                enter paths in the <strong>Allow</strong> and{" "}
                <strong>Disallow</strong> fields, one per line. Use the path
                shortcut buttons to quickly add common admin or private paths.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">
                        Directive
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">
                        Example
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">
                        Effect
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        d: "Allow: /",
                        ex: "Allow: /blog",
                        effect:
                          "Explicitly permits crawling of this path (useful to override a broad Disallow)",
                      },
                      {
                        d: "Disallow: /path",
                        ex: "Disallow: /admin",
                        effect:
                          "Blocks crawling of this path and all sub-paths",
                      },
                      {
                        d: "Disallow: /",
                        ex: "Disallow: /",
                        effect:
                          "Blocks access to the entire site for this User-agent",
                      },
                      {
                        d: "Disallow:",
                        ex: "Disallow:",
                        effect:
                          "An empty Disallow means allow everything — equivalent to no restriction",
                      },
                    ].map(({ d, ex, effect }) => (
                      <tr
                        key={d}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-4 py-2.5 font-mono text-blue-600 text-xs">
                          {d}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 text-xs">
                          {ex}
                        </td>
                        <td className="px-4 py-2.5 text-gray-400 text-xs">
                          {effect}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Add multiple rule blocks for different crawlers
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Click <strong>Add another rule block</strong> to create a second
                User-agent section. This lets you give different crawlers
                different permissions. A common pattern is to allow Googlebot
                access to everything while blocking a specific bot from your API
                endpoints, or while blocking all AI training crawlers from every
                path.
              </p>
              <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                <strong>Rule priority:</strong> When a bot matches multiple
                User-agent blocks, only the most specific matching block applies
                — the bot does not combine rules from multiple blocks. Order
                within a block matters: Allow rules are checked before Disallow
                rules, and the most specific path takes precedence.
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Add your sitemap URL and download
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Optionally enter your sitemap URL in the field at the bottom of
                the builder. The sitemap line is appended at the end of the file
                and helps search engines discover all your pages. Then click{" "}
                <strong>Download</strong> to save the file as{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">
                  robots.txt
                </code>
                , or <strong>Copy</strong> to paste it directly into your
                project.
              </p>
              <div className="bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed">
                <strong>Deploy correctly:</strong> Upload robots.txt to your
                server's document root so it's accessible at{" "}
                <code className="font-mono bg-blue-100 px-1 py-0.5 rounded text-xs">
                  https://yourdomain.com/robots.txt
                </code>{" "}
                — this is the only location crawlers check. A robots.txt at a
                subdirectory path is not recognised.
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How robots.txt syntax works
          </h3>
          <p className="text-gray-600 leading-relaxed mb-5 text-sm">
            The robots.txt file follows the Robots Exclusion Protocol, a simple
            line-based format. Each rule block targets one or more user agents
            and specifies path-level permissions.
          </p>
          <div className="space-y-4">
            {[
              {
                label: "Basic syntax",
                formula: "User-agent: [bot]\nAllow: [path]\nDisallow: [path]",
                vars: "One blank line separates each rule block — missing blank lines cause parsers to merge blocks incorrectly",
              },
              {
                label: "Wildcard matching",
                formula:
                  "Disallow: /admin*   matches /admin, /admin-panel, /administrators",
                vars: "The * wildcard matches any sequence of characters in a path",
              },
              {
                label: "End-of-string anchor",
                formula:
                  "Disallow: /*.pdf$   matches /file.pdf but not /file.pdf.html",
                vars: "The $ anchor matches the end of the URL path exactly",
              },
            ].map(({ label, formula, vars }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4"
              >
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {label}
                </p>
                <code className="text-sm font-mono font-bold text-blue-700 block mb-1 whitespace-pre">
                  {formula}
                </code>
                <p className="text-xs text-gray-400">{vars}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Common robots.txt configurations
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {[
            {
              emoji: "🚀",
              title: "New website launch",
              desc: "Block all crawlers during development with Disallow: / for the * agent, then switch to Allow: / when you're ready to go live. This prevents Google from indexing incomplete pages.",
            },
            {
              emoji: "🔒",
              title: "Protecting admin sections",
              desc: "Block /admin, /wp-admin, /dashboard, and other CMS backend paths from all crawlers. These pages have no SEO value and should never appear in search results.",
            },
            {
              emoji: "🧪",
              title: "Staging environment isolation",
              desc: "Set your staging subdomain's robots.txt to Disallow: / to prevent staging content from being indexed and creating duplicate content issues with your production site.",
            },
            {
              emoji: "🤖",
              title: "Blocking AI training crawlers",
              desc: "Use the preset to block GPTBot (OpenAI), Claude-Web (Anthropic), and CCBot (Common Crawl) while keeping your site fully accessible to Google, Bing, and other search engines.",
            },
            {
              emoji: "⚡",
              title: "Crawl budget optimisation",
              desc: "Block low-value pages like /tag, /search, /sort, and paginated archive pages from crawling to preserve your crawl budget for important content pages that actually need to rank.",
            },
            {
              emoji: "📄",
              title: "Blocking file types",
              desc: "Use Disallow: /*.pdf$ or Disallow: /*.zip$ to stop crawlers from spending crawl budget on downloadable files, keeping indexing focused on your HTML pages.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold mb-3">
            robots.txt is a guideline, not a security measure
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-xl mx-auto text-sm">
            Well-behaved crawlers respect robots.txt, but malicious bots and
            scrapers do not. Never use robots.txt as the only protection for
            sensitive data. Combine it with proper authentication, server-level
            access controls, and the noindex meta tag for comprehensive
            protection. All file generation happens in your browser — nothing is
            sent to any server.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Developer Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/open-graph-preview",
                label: "Open Graph Preview",
                desc: "Preview how your page looks when shared on Twitter, Facebook, and LinkedIn.",
              },
              {
                href: "/tools/html-minifier",
                label: "HTML Minifier",
                desc: "Minify HTML to reduce file size and improve page load performance.",
              },
              {
                href: "/tools/json-to-csv-converter",
                label: "JSON to CSV Converter",
                desc: "Convert JSON arrays to CSV format for spreadsheets and data import workflows.",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5"
                aria-label={`${link.label} — ${link.desc}`}
              >
                <div className="font-bold text-gray-900 text-sm mb-1">
                  {link.label}
                </div>
                <div className="text-xs text-gray-500">{link.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
