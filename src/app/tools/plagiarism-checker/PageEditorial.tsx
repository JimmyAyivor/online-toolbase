"use client";
// src/app/tools/plagiarism-checker/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/plagiarism-checker";
const TOOL_NAME = "Plagiarism Checker";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#312e81", light: "#eef2ff" },
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-indigo-100 shadow-inner mb-5'>
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
    "Free plagiarism checker — check your text against live web sources instantly",
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
                <span className='text-green-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "How does this plagiarism checker work?",
    a: "The tool extracts key phrases and sentences from your submitted text, then searches those phrases against live web sources using real-time web search. Any pages whose content closely matches your phrases are returned as potential matches, and an originality score is calculated based on how many unique matches were found. Because it uses live web search, results reflect the current state of indexed content on the internet — not a fixed database.",
  },
  {
    q: "Is this tool accurate enough for academic submissions?",
    a: "This tool is designed for quick checks and content review, not academic submission verification. Academic plagiarism detection tools (Turnitin, iThenticate) check against much larger databases including academic journals, institutional repositories, and student paper archives that are not publicly indexed on the web. Use this tool to catch obvious web-sourced plagiarism and as a preliminary check — always use your institution's official tool before submitting academic work.",
  },
  {
    q: "Why does legitimate original text sometimes show matches?",
    a: "Several factors can trigger matches in genuinely original text: common factual phrases that appear widely online (e.g. 'The mitochondria is the powerhouse of the cell'), technical terminology that appears in many documents, proper nouns and place names, standard legal or regulatory language, widely-used idioms and expressions, and quotations you have included and cited. A match does not mean plagiarism — it means similar text was found online. Context, intent, and citation practice determine whether text is plagiarised.",
  },
  {
    q: "What is a good originality score?",
    a: "An originality score of 80% or higher indicates the text is mostly original based on the web sources checked. 50–79% suggests some phrases have matches and warrants review of the matched content. Below 50% indicates significant similarity with web sources and should be carefully reviewed. These thresholds are guidelines — the nature of the matches matters as much as the score. A 60% score from matching properly cited quotations is very different from a 60% score from uncited copied passages.",
  },
  {
    q: "Does using this tool keep my text private?",
    a: "Your text is processed by sending key phrases (not your entire text) to the web search API for matching. The tool does not store your text on any server — processing happens transiently during the check. However, the phrases used as search queries pass through the API's infrastructure during the check. If your text contains sensitive, confidential, or unpublished material, consider using an offline plagiarism tool or your institution's dedicated system, which may offer stronger data privacy guarantees.",
  },
  {
    q: "Can this tool detect AI-generated content?",
    a: "No — this tool is a plagiarism checker that looks for matching text across web sources. It does not detect AI-generated content. AI text detection is a separate, distinct problem that requires different tools (GPTZero, Copyleaks AI detector, Originality.ai). AI-generated text is typically not plagiarised from the web — it is synthesised — so web-search-based plagiarism checking will generally score AI text as 'highly original', which may be misleading in academic contexts where AI use is restricted.",
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
              <span className='text-indigo-600 text-lg shrink-0'>
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
          How to Use the Plagiarism Checker
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Check any text against live web sources in seconds — no account, no
          software, no word limits.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Paste your text into the input",
              body: "Copy and paste the text you want to check into the large text area. This can be an essay, article, blog post, product description, or any written content. The tool requires a minimum of 10 words — anything shorter doesn't give the search algorithm enough context for meaningful phrase matching.",
              enrich: (
                <div className='bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed'>
                  <strong>What works best:</strong> Full paragraphs produce
                  better results than isolated sentences. Longer text gives the
                  tool more phrases to check, improving both coverage and
                  accuracy of the originality score.
                </div>
              ),
            },
            {
              n: 2,
              title: "Click 'Check Plagiarism'",
              body: "Hit the button and the tool immediately extracts up to 3 key phrases from your text, then searches each phrase against live web sources. The search runs in real time — results reflect what is currently indexed on the internet, not a static database.",
              enrich: (
                <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                  <strong>Processing time:</strong> Each phrase search takes a
                  few seconds. For 3 phrases, expect a total check time of 10–20
                  seconds. Keep the tab active during the check for reliable
                  results.
                </div>
              ),
            },
            {
              n: 3,
              title: "Review your originality score",
              body: "The results panel shows three metrics: phrases checked (how many key phrases were searched), matches found (unique web pages with similar content), and an originality score as a percentage. The score gives a quick at-a-glance read — 80%+ is good, 50–79% warrants review, below 50% indicates significant web matches.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Score
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Interpretation
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "80–100%",
                          "Mostly original",
                          "Review any matches to confirm they are incidental",
                        ],
                        [
                          "50–79%",
                          "Moderate similarity",
                          "Read matched content — rephrase or cite as needed",
                        ],
                        [
                          "0–49%",
                          "High similarity",
                          "Significant review needed; check all matched URLs",
                        ],
                      ].map(([s, i, a]) => (
                        <tr key={s} className='hover:bg-indigo-50'>
                          <td className='px-4 py-2 font-bold text-indigo-700'>
                            {s}
                          </td>
                          <td className='px-4 py-2 text-gray-700'>{i}</td>
                          <td className='px-4 py-2 text-gray-500'>{a}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              n: 4,
              title: "Investigate potential matches",
              body: "Each match card shows the title of the source, a snippet of the matching content, and a link to the original URL. Click through to read the source and determine whether the match is a coincidental phrase overlap, a properly cited quotation, or genuinely copied text that needs to be rewritten or attributed.",
              enrich: (
                <div className='bg-purple-50 rounded-xl px-5 py-4 text-sm text-purple-800 leading-relaxed'>
                  <strong>Common false positives:</strong> Standard factual
                  phrases, technical terminology, legal boilerplate, widely-used
                  idioms, and properly cited block quotes will all show as
                  matches. Always read the matched source to understand the
                  context before taking action.
                </div>
              ),
            },
            {
              n: 5,
              title: "Revise, cite, and re-check",
              body: "After reviewing matches, rewrite any unintentionally copied passages in your own words, or add proper citations for any content you've deliberately quoted or paraphrased. Then clear the text, paste the revised version, and run the check again to confirm your originality score has improved.",
              enrich: (
                <div className='bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed'>
                  <strong>Citation formats:</strong> APA, MLA, Chicago, and
                  Harvard all have different citation formats. Use a citation
                  generator (Citation Machine, EasyBib, ZoteroBib) to produce
                  correctly formatted references quickly.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "🎓",
              title: "Student essay review",
              desc: "Run a quick check before submitting assignments to catch any unintentional overlap with web sources.",
            },
            {
              emoji: "✍️",
              title: "Blog and article writing",
              desc: "Verify that freelance-written or AI-assisted content is original before publishing on your site.",
            },
            {
              emoji: "📋",
              title: "Product descriptions",
              desc: "Check that ecommerce copy isn't inadvertently duplicating manufacturer or competitor descriptions.",
            },
            {
              emoji: "📰",
              title: "Press release drafting",
              desc: "Ensure press releases contain fresh, original copy that won't be flagged as duplicate content by search engines.",
            },
            {
              emoji: "🔍",
              title: "SEO content audit",
              desc: "Check existing pages for duplicate content that may be hurting search rankings — then rewrite or consolidate.",
            },
            {
              emoji: "📚",
              title: "Research note review",
              desc: "Check research notes compiled from multiple sources to catch phrases accidentally retained verbatim.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>⚠️</div>
          <h3 className='text-xl font-bold mb-3'>
            For academic submissions, use your institution's official tool
          </h3>
          <p className='text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm'>
            This tool checks against publicly indexed web content. Academic
            tools (Turnitin, iThenticate) check against academic databases,
            journal archives, and student paper repositories not available via
            web search. Use this as a preliminary check — not a substitute for
            your institution's official plagiarism detection system.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Writing Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Count words, characters, sentences, and reading time as you type.",
              },
              {
                href: "/tools/readability-score-calculator",
                label: "Readability Score",
                desc: "Measure how easy your text is to read with Flesch-Kincaid and other scores.",
              },
              {
                href: "/tools/text-repeater",
                label: "Text Repeater",
                desc: "Repeat any text or character pattern a set number of times.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
