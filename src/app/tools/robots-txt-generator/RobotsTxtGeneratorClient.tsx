"use client";
import React, { useState } from "react";
import {
  Bot,
  Plus,
  Trash2,
  Download,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

interface Rule {
  id: string;
  userAgent: string;
  allow: string;
  disallow: string;
  crawlDelay: string;
}

const COMMON_BOTS = [
  "*",
  "Googlebot",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
  "GPTBot",
  "Claude-Web",
  "CCBot",
  "anthropic-ai",
];

const COMMON_PATHS = [
  "/admin",
  "/wp-admin",
  "/private",
  "/api",
  "/login",
  "/checkout",
  "/cart",
  "/search",
  "/staging",
  "/dev",
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function generateRobotsTxt(rules: Rule[], sitemapUrl: string): string {
  const blocks = rules.map((r) => {
    const lines: string[] = [];
    lines.push(`User-agent: ${r.userAgent || "*"}`);
    if (r.allow.trim()) {
      r.allow.split("\n").forEach((p) => {
        if (p.trim()) lines.push(`Allow: ${p.trim()}`);
      });
    }
    if (r.disallow.trim()) {
      r.disallow.split("\n").forEach((p) => {
        if (p.trim()) lines.push(`Disallow: ${p.trim()}`);
      });
    } else {
      lines.push("Disallow:");
    }
    if (r.crawlDelay.trim()) lines.push(`Crawl-delay: ${r.crawlDelay.trim()}`);
    return lines.join("\n");
  });

  let result = blocks.join("\n\n");
  if (sitemapUrl.trim()) result += `\n\nSitemap: ${sitemapUrl.trim()}`;
  return result;
}

export default function RobotsTxtGeneratorClient() {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: uid(),
      userAgent: "*",
      allow: "/",
      disallow: "/admin\n/private",
      crawlDelay: "",
    },
  ]);
  const [sitemapUrl, setSitemapUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const output = generateRobotsTxt(rules, sitemapUrl);

  const addRule = () =>
    setRules((r) => [
      ...r,
      { id: uid(), userAgent: "*", allow: "", disallow: "", crawlDelay: "" },
    ]);

  const removeRule = (id: string) =>
    setRules((r) => r.filter((rule) => rule.id !== id));

  const updateRule = (id: string, key: keyof Rule, value: string) =>
    setRules((r) =>
      r.map((rule) => (rule.id === id ? { ...rule, [key]: value } : rule)),
    );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setRules([
      {
        id: uid(),
        userAgent: "*",
        allow: "/",
        disallow: "/admin\n/private",
        crawlDelay: "",
      },
    ]);
    setSitemapUrl("");
  };

  const loadPreset = (preset: "allow-all" | "block-all" | "block-ai") => {
    if (preset === "allow-all") {
      setRules([
        { id: uid(), userAgent: "*", allow: "/", disallow: "", crawlDelay: "" },
      ]);
    } else if (preset === "block-all") {
      setRules([
        { id: uid(), userAgent: "*", allow: "", disallow: "/", crawlDelay: "" },
      ]);
    } else if (preset === "block-ai") {
      setRules([
        {
          id: uid(),
          userAgent: "*",
          allow: "/",
          disallow: "/admin",
          crawlDelay: "",
        },
        {
          id: uid(),
          userAgent: "GPTBot",
          allow: "",
          disallow: "/",
          crawlDelay: "",
        },
        {
          id: uid(),
          userAgent: "Claude-Web",
          allow: "",
          disallow: "/",
          crawlDelay: "",
        },
        {
          id: uid(),
          userAgent: "anthropic-ai",
          allow: "",
          disallow: "/",
          crawlDelay: "",
        },
        {
          id: uid(),
          userAgent: "CCBot",
          allow: "",
          disallow: "/",
          crawlDelay: "",
        },
      ]);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Bot className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Robots.txt Generator
            </h2>
            <p className='text-gray-600'>
              Build a valid robots.txt file — control crawler access with simple
              rules
            </p>
          </div>

          {/* Presets */}
          <div className='flex flex-wrap gap-2 mb-6'>
            <span className='text-sm text-gray-500 font-medium self-center'>
              Quick presets:
            </span>
            {[
              { id: "allow-all" as const, label: "✅ Allow all" },
              { id: "block-all" as const, label: "🚫 Block all" },
              { id: "block-ai" as const, label: "🤖 Block AI crawlers" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => loadPreset(id)}
                className='px-4 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-lg text-sm font-medium transition-colors border border-gray-200'
              >
                {label}
              </button>
            ))}
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {/* Left: Rule builder */}
            <div>
              <div className='space-y-5 mb-5'>
                {rules.map((rule, idx) => (
                  <div
                    key={rule.id}
                    className='border-2 border-gray-100 rounded-xl p-5'
                  >
                    <div className='flex items-center justify-between mb-4'>
                      <span className='text-sm font-bold text-gray-700'>
                        Rule {idx + 1}
                      </span>
                      {rules.length > 1 && (
                        <button
                          onClick={() => removeRule(rule.id)}
                          className='text-gray-300 hover:text-red-500 transition-colors'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>

                    <div className='space-y-3'>
                      <div>
                        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>
                          User-agent
                        </label>
                        <select
                          value={rule.userAgent}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            updateRule(rule.id, "userAgent", e.target.value)
                          }
                          className='w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white'
                        >
                          {COMMON_BOTS.map((b) => (
                            <option key={b} value={b}>
                              {b === "*" ? "* (all crawlers)" : b}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>
                          Allow paths{" "}
                          <span className='text-gray-400 font-normal normal-case'>
                            (one per line)
                          </span>
                        </label>
                        <textarea
                          value={rule.allow}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>,
                          ) => updateRule(rule.id, "allow", e.target.value)}
                          placeholder={"/\n/blog"}
                          rows={2}
                          className='w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono'
                        />
                      </div>

                      <div>
                        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>
                          Disallow paths{" "}
                          <span className='text-gray-400 font-normal normal-case'>
                            (one per line)
                          </span>
                        </label>
                        <textarea
                          value={rule.disallow}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>,
                          ) => updateRule(rule.id, "disallow", e.target.value)}
                          placeholder={"/admin\n/private"}
                          rows={3}
                          className='w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono'
                        />
                        <div className='flex flex-wrap gap-1.5 mt-1.5'>
                          {COMMON_PATHS.map((p) => (
                            <button
                              key={p}
                              onClick={() => {
                                const existing = rule.disallow.trim();
                                const lines = existing
                                  ? existing.split("\n")
                                  : [];
                                if (!lines.includes(p))
                                  updateRule(
                                    rule.id,
                                    "disallow",
                                    [...lines, p].join("\n"),
                                  );
                              }}
                              className='px-2 py-0.5 bg-gray-100 hover:bg-indigo-100 text-gray-500 hover:text-indigo-700 text-xs rounded font-mono transition-colors'
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>
                          Crawl-delay (seconds, optional)
                        </label>
                        <input
                          type='number'
                          min='0'
                          value={rule.crawlDelay}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateRule(rule.id, "crawlDelay", e.target.value)
                          }
                          placeholder='e.g. 10'
                          className='w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addRule}
                className='flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors mb-5'
              >
                <Plus className='w-4 h-4' />
                Add another rule block
              </button>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Sitemap URL (optional)
                </label>
                <input
                  type='url'
                  value={sitemapUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSitemapUrl(e.target.value)
                  }
                  placeholder='https://example.com/sitemap.xml'
                  className='w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
              </div>
            </div>

            {/* Right: Output */}
            <div>
              <div className='flex items-center justify-between mb-2'>
                <p className='text-sm font-semibold text-gray-700'>
                  Generated robots.txt
                </p>
                <div className='flex gap-2'>
                  <button
                    onClick={handleCopy}
                    className='flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 transition-colors'
                  >
                    {copied ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      <Copy className='w-4 h-4' />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className='flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors'
                  >
                    <Download className='w-4 h-4' />
                    Download
                  </button>
                </div>
              </div>
              <pre className='w-full min-h-80 bg-gray-900 text-green-400 rounded-xl p-5 text-sm font-mono whitespace-pre overflow-auto leading-relaxed'>
                {output}
              </pre>

              <div className='mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800'>
                <strong>Deploy tip:</strong> Upload{" "}
                <code className='font-mono bg-amber-100 px-1 rounded'>
                  robots.txt
                </code>{" "}
                to the root of your domain at{" "}
                <code className='font-mono bg-amber-100 px-1 rounded'>
                  https://yourdomain.com/robots.txt
                </code>{" "}
                — it must be at the root to be recognised by crawlers.
              </div>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className='flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8'
          >
            <RotateCcw className='w-4 h-4' />
            Reset to defaults
          </button>

          {/* Tips */}
          <div className='p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Understanding robots.txt:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                robots.txt is a suggestion, not enforcement — malicious bots may
                ignore it entirely
              </li>
              <li>
                Blocking a page in robots.txt does not remove it from Google's
                index if it has inbound links
              </li>
              <li>
                Use Allow before Disallow in each block — more specific rules
                take precedence over general ones
              </li>
              <li>
                Crawl-delay is respected by Bing and some crawlers but is
                ignored by Googlebot
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
