"use client";
// src/app/tools/reading-time-estimator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/reading-time-estimator";
const TOOL_NAME = "Reading Time Estimator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#78350f", light: "#fffbeb" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-amber-100 shadow-inner mb-5">
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
    "Free reading time estimator — estimate how long any text, article, or document takes to read at your chosen reading speed",
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
                <span className="text-amber-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "What reading speed should I use for my reading time estimate?",
    a: "The default of 200 words per minute is the most widely cited average for adult silent reading of general non-technical prose. Research on reading rates is consistent in this range: a 2019 meta-analysis of 190 studies found a mean of 238 wpm for adults reading in their native language, with large variation based on text complexity, vocabulary familiarity, and individual ability. For technical or academic content, use 150–175 wpm. For a novel or easy blog post, 220–250 wpm may be more accurate. For presentations and public speaking, use the speaking time estimate at 150 wpm rather than the reading time.",
  },
  {
    q: "How is image time calculated and why does it add 12 seconds per image?",
    a: "The 12-second-per-image estimate is based on the standard established by Medium, the publishing platform, which conducted internal research on how long readers spend on images in long-form articles. Medium's algorithm adds 12 seconds for the first image and smaller amounts for subsequent images, rounding to a reading time that matches observed user behaviour. This tool uses a flat 12 seconds per image as a reasonable approximation. The actual time varies: a simple chart might take 5 seconds to scan, while a detailed infographic might take 30+ seconds. You can disable image time entirely by unchecking the 'Include time for images' option.",
  },
  {
    q: "What is a good reading time for a blog post?",
    a: "The most-cited benchmark for blog reading time comes from research showing that content with a 7-minute read time — approximately 1,600–1,700 words — receives the most engagement. However, the optimal length depends heavily on topic and audience. For SEO-focused content targeting competitive keywords, 1,500–2,500 words is typical. For news articles and quick-answer posts, 300–700 words performs well. For in-depth guides and pillar content, 3,000–5,000+ words can outrank shorter competitors. Use reading time as a planning tool: if your intended audience has 5 minutes, aim for ~1,000 words; for a 10-minute deep dive, aim for ~2,000 words.",
  },
  {
    q: "How accurate is the reading time estimate for different types of content?",
    a: "Accuracy varies significantly by content type. For general prose — blog posts, news articles, fiction — the estimate at 200 wpm is typically within 20% of actual reading time. For technical documentation, code-heavy tutorials, or academic papers, actual reading time is often 40–60% longer than the estimate because readers slow down to process complex information and may reread passages. For simple, familiar content like social media posts or light entertainment, readers often go faster than 200 wpm. The four-speed comparison table (slow, average, fast, speed) shown in the results gives you a realistic range rather than a single misleading number.",
  },
  {
    q: "Can I use this tool to estimate speaking or presentation time?",
    a: "The tool calculates a speaking time estimate at 150 words per minute (shown in the Word & Character Counter tool, which links to this one). A standard presentation pace is 120–150 wpm — slow enough for clear comprehension but natural-sounding. TED Talks average around 130 wpm. Conversational speech is faster at 150–180 wpm. Fast or excited speech reaches 200+ wpm. If you're preparing a speech, write your script, paste it here to check the reading time, then adjust: a 5-minute presentation needs approximately 750 words at 150 wpm. Add 15–20% padding for pauses, emphasis, and natural variation.",
  },
  {
    q: "Why does my reading time show seconds instead of minutes?",
    a: "When the word count is low enough that the estimated reading time falls below one minute, the tool displays the result in seconds for more precision — for example, '45s' rather than '1m'. This occurs for short content like social media captions, product descriptions, or brief excerpts. For content under 100 words, the seconds display is more useful than rounding up to '1 minute'. As your word count increases past the one-minute threshold, the display automatically switches to the minutes-and-seconds format (e.g. '1m 23s') and then to hours and minutes (e.g. '1h 15m') for very long documents.",
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
              aria-expanded={open === i}            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-amber-600 text-lg shrink-0">
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
          How to Use the Reading Time Estimator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste your text, set your reading speed, and get an instant estimate —
          with multi-speed comparison and optional image time.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste your text or article",
              body: "Copy and paste the full text you want to estimate into the input area — an article draft, blog post, essay, speech, or any other content. The word count and character count update below the box in real time. All processing runs in your browser — your text is never sent to a server.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>What to paste:</strong> For blog posts and articles,
                  paste the full body text. For presentations, paste your
                  speaker notes or script. For books or reports, paste
                  individual chapters to estimate section reading times. For web
                  pages, copy the main article text and exclude navigation, ads,
                  and footer copy.
                </div>
              ),
            },
            {
              n: 2,
              title: "Set your reading speed with the WPM slider",
              body: "Drag the reading speed slider between 100 and 400 words per minute. The label below the slider shows your current reader type — Slow, Average, Fast, or Speed Reader. The default of 200 wpm is the standard average for adult reading of general content. Adjust lower for technical or academic text, higher for simple or familiar content.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Speed
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          WPM range
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Typical reader
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "Slow",
                          "100–175 wpm",
                          "Careful reading, dense technical content, second language",
                        ],
                        [
                          "Average",
                          "175–225 wpm",
                          "General adult reading, blog posts, news articles",
                        ],
                        [
                          "Fast",
                          "225–300 wpm",
                          "Experienced readers, familiar topics, light fiction",
                        ],
                        [
                          "Speed",
                          "300–400 wpm",
                          "Trained speed readers, skimming, very familiar material",
                        ],
                      ].map(([s, w, t]) => (
                        <tr key={s} className="hover:bg-amber-50">
                          <td className="px-4 py-2 font-bold text-amber-700 text-xs">
                            {s}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {w}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {t}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 3,
              title: "Add image time (optional)",
              body: "If your content contains images — diagrams, photographs, charts, infographics — check 'Include time for images' and enter the number of images. The tool adds 12 seconds per image based on the time-per-image standard used by Medium and other long-form publishing platforms. This accounts for the cognitive time readers spend processing visual content.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>When to include images:</strong> For web articles and
                  blog posts with inline images, always include image time to
                  get a more accurate reading estimate. For plain text
                  documents, reports, or speech scripts without images, leave
                  this unchecked. For infographic-heavy content where images
                  carry substantial information, you may want to manually add
                  extra time beyond the 12-second default.
                </div>
              ),
            },
            {
              n: 4,
              title: "Read your estimated time and the comparison table",
              body: "The result panel shows your primary estimated reading time at your chosen WPM, followed by a four-speed comparison (Slow 150 wpm, Average 200 wpm, Fast 250 wpm, Speed 350 wpm). The range between slow and speed gives you a realistic bracket rather than a single potentially misleading number. Below the comparison, text statistics show word count, character counts, sentence count, paragraphs, and average words per sentence.",
              enrich: (
                <div className="bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Copy the time:</strong> The Copy Time button copies
                  your estimated reading time string to the clipboard — useful
                  for adding a reading time label to your article, newsletter,
                  or content brief. For example: 'Estimated read: 7 minutes'.
                  Many publishers display reading time in article headers to set
                  expectations and reduce bounce rates.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "✍️",
              title: "Blog and content planning",
              desc: "Target a specific reading time — a 5-min read needs ~1,000 words — and use the estimator to calibrate your draft length before writing.",
            },
            {
              emoji: "🎤",
              title: "Speech and presentation prep",
              desc: "Check that your speaker script fits your time slot before the presentation. A 10-minute talk at 150 wpm needs ~1,500 words.",
            },
            {
              emoji: "📧",
              title: "Newsletter length optimisation",
              desc: "Keep newsletters within a target reading time to maintain engagement — most email newsletters perform best at 3–5 minutes.",
            },
            {
              emoji: "📚",
              title: "Academic and report writing",
              desc: "Estimate read time for research papers, theses, and executive summaries to match your audience's expected reading session length.",
            },
            {
              emoji: "🎧",
              title: "Podcast script timing",
              desc: "Convert your script word count to speaking time before recording — adjusting the WPM to your natural speaking pace for accurate episode length planning.",
            },
            {
              emoji: "📰",
              title: "Editorial and publishing",
              desc: "Add a 'Reading time: X min' label to articles before publishing — research shows this increases click-through rates and reduces bounce.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-amber-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📖</div>
          <h3 className="text-xl font-bold mb-3">
            The 7-minute read is the sweet spot
          </h3>
          <p className="text-amber-100 leading-relaxed max-w-xl mx-auto text-sm">
            Research consistently shows that articles with a 7-minute estimated
            reading time — approximately 1,600 words — receive the highest
            engagement. Content shorter than 3 minutes can feel shallow; longer
            than 15 minutes risks losing the reader. Use the estimator to plan
            content that fits your audience's reading habits.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Text Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/word-character-counter",
                label: "Word & Character Counter",
                desc: "Count words, characters, sentences, and paragraphs with reading and speaking time.",
              },
              {
                href: "/tools/word-frequency-counter",
                label: "Word Frequency Counter",
                desc: "See which words appear most often in your text with counts and percentages.",
              },
              {
                href: "/tools/readability-score-calculator",
                label: "Readability Score",
                desc: "Measure how easy your text is to read with Flesch-Kincaid and other scores.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-amber-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
