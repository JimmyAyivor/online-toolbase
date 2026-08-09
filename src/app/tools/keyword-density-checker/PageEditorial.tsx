"use client";
// src/app/tools/keyword-density-checker/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/keyword-density-checker";
const TOOL_NAME = "Keyword Density Checker";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#134e4a", light: "#f0fdf4" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-teal-100 shadow-inner mb-5">
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
    "Free keyword density checker — analyse keyword frequency in any text for SEO",
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
                <span className="text-green-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What is keyword density and why does it matter for SEO?",
    a: "Keyword density is the percentage of times a specific word or phrase appears in a piece of text relative to the total word count. For example, if 'SEO' appears 10 times in a 500-word article, its density is 2%. It matters for SEO because search engines use keyword frequency as one signal of a page's relevance to a topic — but only as one of hundreds of factors. Unnaturally high density is a spam signal; unnaturally low density may indicate weak topical coverage.",
  },
  {
    q: "What is the ideal keyword density for SEO?",
    a: "There is no universally agreed ideal — Google does not publish a target. The practical consensus among SEO practitioners is that a focus keyword appearing at 1–3% density sits in a natural range for most content types. Above 4–5% starts to look unnatural and risks a manual or algorithmic spam penalty for 'keyword stuffing'. Modern search algorithms primarily evaluate semantic relevance and user intent satisfaction rather than counting keyword occurrences.",
  },
  {
    q: "What is keyword stuffing and why is it penalised?",
    a: "Keyword stuffing is the practice of deliberately repeating a keyword an unnatural number of times to manipulate search rankings — for example, repeating 'cheap flights' 40 times in a 300-word page. Google's Webmaster Guidelines explicitly prohibit keyword stuffing. It degrades the reading experience, was widely abused in early search optimization, and modern algorithms are effective at detecting it. Pages identified as keyword-stuffed can receive ranking penalties or be removed from the index.",
  },
  {
    q: "Should I check density for single words or multi-word phrases?",
    a: "Both. For SEO, your focus keyword is typically a multi-word phrase (e.g. 'running pace calculator'). Check its exact phrase density using the focus keyword field. Single-word analysis in the main table shows you the broader vocabulary distribution — useful for identifying whether you're relying too heavily on exact matches versus using semantically related variations (e.g. 'run', 'runner', 'running', 'pace', 'race') that signal natural, comprehensive coverage to search engines.",
  },
  {
    q: "How does stop word filtering affect the keyword analysis?",
    a: "Stop words are common function words (the, a, and, is, for) that carry little topical meaning. Filtering them out focuses the density analysis on meaningful content words — which is what matters for SEO. Keep stop words enabled if you need a full word frequency distribution for copywriting or readability work. For SEO density checking, filtering stop words is recommended to surface the keywords that actually influence ranking signals.",
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
              <span className="text-teal-600 text-lg shrink-0">
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
          How to Use the Keyword Density Checker
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste any text to instantly see keyword frequencies, density
          percentages, and a focus keyword breakdown for SEO.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste your content",
              body: "Copy text from a blog post, landing page, product description, or any piece of content and paste it into the input. The analysis runs in real time as you type or paste — no button press needed. The tool handles texts from a single paragraph to multi-thousand-word articles.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>What to check:</strong> Blog posts, landing pages,
                  product descriptions, meta descriptions, press releases — any
                  text where you want to verify keyword coverage or catch
                  accidental over-repetition.
                </div>
              ),
            },
            {
              n: 2,
              title: "Enter your focus keyword",
              body: "Type your target keyword or phrase in the focus keyword field (optional). The tool counts exact matches of that phrase anywhere in the text and shows the count and density separately from the word frequency table — giving you a precise SEO-focused view of your primary keyword.",
              enrich: (
                <div className="bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed">
                  <strong>Phrase vs single word:</strong> For a page targeting
                  'best running shoes', check the exact phrase density (should
                  be 1–3%) AND the single word 'running' in the table to see
                  overall topic coverage. Both matter for semantic relevance.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review the keyword frequency table",
              body: "The top 30 keywords are shown with frequency count, density percentage, and a colour-coded rating: Green (Good, 1–4%) means healthy density; Red (High, 5%+) means potential stuffing; Blue (Low) and Gray (Rare) may indicate underutilisation of relevant terms.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Density
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Label
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "< 1%",
                          "Rare",
                          "Consider using this keyword more if it's relevant",
                        ],
                        ["1–4%", "Good", "Healthy range — no action needed"],
                        [
                          "5%+",
                          "High",
                          "Reduce usage — may look like keyword stuffing",
                        ],
                      ].map(([d, l, a]) => (
                        <tr key={d} className="hover:bg-teal-50">
                          <td className="px-4 py-2 font-bold text-gray-800">
                            {d}
                          </td>
                          <td className="px-4 py-2 text-teal-700 font-semibold">
                            {l}
                          </td>
                          <td className="px-4 py-2 text-gray-500">{a}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Adjust filters to refine the analysis",
              body: "Toggle 'Ignore stop words' to filter out common words (the, a, and, etc.) and focus on meaningful terms. Adjust the minimum word length to filter out very short words. These settings help surface the keywords that actually matter for SEO rather than function words.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>For SEO:</strong> Use stop word filtering ON and
                  minimum length 3–4 for the clearest view of content keywords.
                  Turn filtering OFF if you need a complete word count
                  distribution for readability or copywriting analysis.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📝",
              title: "Blog post optimisation",
              desc: "Check that your focus keyword appears at the right density before publishing a new article or page.",
            },
            {
              emoji: "🔍",
              title: "Competitor content analysis",
              desc: "Copy a competitor's top-ranking page into the checker to see which keywords they emphasise most heavily.",
            },
            {
              emoji: "🛍️",
              title: "Product description review",
              desc: "Verify product copy uses relevant category keywords at healthy densities without feeling repetitive.",
            },
            {
              emoji: "📄",
              title: "Landing page audit",
              desc: "Audit landing pages that have slipped in rankings to check for keyword gaps or unintentional stuffing.",
            },
            {
              emoji: "🗂️",
              title: "Content brief creation",
              desc: "Use the analysis on existing top-ranking content to inform keyword targets when writing content briefs.",
            },
            {
              emoji: "✍️",
              title: "Copywriting quality check",
              desc: "Identify words you've overused in long-form copy — even outside of SEO contexts, repetition affects readability.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-teal-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            All analysis runs in your browser
          </h3>
          <p className="text-teal-100 leading-relaxed max-w-xl mx-auto text-sm">
            Your text is never sent to any server. All keyword counting and
            density calculation happens locally in JavaScript on your device.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/robots-txt-generator",
                label: "Robots.txt Generator",
                desc: "Control which pages search engines crawl alongside your on-page keyword optimisation.",
              },
              {
                href: "/tools/email-subject-line-generator",
                label: "Email Subject Line Generator",
                desc: "Apply keyword-rich language from your content to email subject lines.",
              },
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Count words and characters in any text in real time.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-teal-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
