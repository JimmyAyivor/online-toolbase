"use client";
// src/app/tools/readability-score-calculator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL =
  "https://onlinetoolbase.com/tools/readability-score-calculator";
const TOOL_NAME = "Readability Score Calculator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#7c2d12", light: "#fff7ed" },
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-orange-100 shadow-inner mb-5'>
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
    "Free readability score calculator — get Flesch, Kincaid, Gunning Fog, and ARI scores for any text instantly",
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
                <span className='text-orange-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What is the Flesch Reading Ease score?",
    a: "The Flesch Reading Ease score is a numerical measure of how easy a piece of English text is to read, calculated from sentence length and syllable count per word. The formula is: 206.835 − (1.015 × average words per sentence) − (84.6 × average syllables per word). Scores range from 0 to 100. Scores of 90–100 indicate very easy reading (simple enough for an average 11-year-old), 60–70 indicates standard difficulty (suitable for most adults), and scores below 30 indicate very difficult text (university level and above). The US Navy developed the score in the 1970s to assess the readability of technical manuals, and it remains the most widely cited readability measure in plain language research.",
  },
  {
    q: "What is the Flesch-Kincaid Grade Level?",
    a: "The Flesch-Kincaid Grade Level converts the same underlying sentence and syllable measurements into a US school grade level — Grade 5 means the text is readable by an average fifth-grader, Grade 12 means high school senior level, and scores above 12 indicate college-level text. The formula is: (0.39 × average words per sentence) + (11.8 × average syllables per word) − 15.59. For general public communication, most style guides recommend aiming for Grade 6–8. The US Department of Defense uses Grade 8 as its target for technical instructions, and many plain-language initiatives target Grade 6–7 for public-facing content.",
  },
  {
    q: "What is the Gunning Fog Index?",
    a: "The Gunning Fog Index, developed by Robert Gunning in 1952, estimates the years of formal education a reader needs to understand a piece of text on first reading. The formula is: 0.4 × (average words per sentence + percentage of complex words), where complex words are defined as words with three or more syllables. A score of 12 corresponds to a high school senior; scores above 17 are considered impenetrable by most readers. Unlike Flesch, which focuses only on syllable count, Gunning Fog specifically targets the use of long, multi-syllabic words — making it particularly useful for identifying jargon and technical terminology that could be simplified.",
  },
  {
    q: "What is the Automated Readability Index (ARI)?",
    a: "The Automated Readability Index (ARI) was developed in 1967 for the US Air Force to assess the readability of technical manuals. Unlike the Flesch and Gunning Fog formulas, which count syllables, the ARI uses character count per word as its primary measure — making it faster to compute in contexts where syllable counting is impractical. The formula is: (4.71 × characters per word) + (0.5 × words per sentence) − 21.43. The result corresponds to a US grade level. The ARI tends to produce slightly different results than Flesch-Kincaid for the same text because character count and syllable count measure different aspects of word complexity.",
  },
  {
    q: "What readability score should I aim for?",
    a: "The right target depends on your audience. For general consumer content — blog posts, website copy, customer emails, marketing materials — aim for a Flesch Reading Ease of 60–70 and a Flesch-Kincaid Grade of 6–8. For internal business communications, Grade 8–10 is generally acceptable. For academic papers, legal documents, and technical writing aimed at professionals, Grade 12–14 is typical and appropriate — lower scores in these contexts might indicate oversimplification. For plain-language government documents and public health communications, the UK government's content guide targets Grade 6 or lower. The most important principle is matching your score to your actual audience's reading level, not optimising for the lowest possible score.",
  },
  {
    q: "Why do the four scores sometimes disagree significantly?",
    a: "The four readability formulas measure different aspects of text complexity using different inputs, so they will not always agree. Flesch Reading Ease and Flesch-Kincaid Grade use the same two inputs (sentence length and syllable count per word) but produce inversely-related scales, so they will always be consistent with each other. Gunning Fog weights the percentage of complex words (3+ syllables) more heavily than Flesch, so text with many long technical terms but short sentences will score harder on Fog than on Flesch. ARI uses character count rather than syllable count, which can produce different results for words that have many characters but few syllables (e.g., 'strength', 'through') versus words with many syllables but fewer characters. Looking at all four scores together gives a more complete picture than relying on any single formula.",
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
              <span className='text-orange-600 text-lg shrink-0'>
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
          How to Use the Readability Score Calculator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Paste any text to get four readability scores instantly — plus word,
          sentence, syllable, and character counts.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Paste or type your text",
              body: "Paste any English text into the textarea — an article, blog post, product description, legal document, academic paper, or any other content you want to evaluate. Results update live as you type. Click 'Load sample text' to see how the tool works with a short example before entering your own content.",
              enrich: (
                <div className='bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed'>
                  <strong>Minimum text for reliable results:</strong>{" "}
                  Readability formulas are statistical — they average sentence
                  length and syllable counts across the full text. For reliable
                  scores, use at least 100–150 words. Very short texts (under 50
                  words) will produce scores with high variance, because a
                  single unusually long sentence or word disproportionately
                  affects the averages.
                </div>
              ),
            },
            {
              n: 2,
              title: "Read the Flesch Reading Ease score first",
              body: "The large score at the top is the Flesch Reading Ease — the most widely used readability measure. It runs from 0 (extremely difficult) to 100 (very easy), with colour-coded labels: Very Easy (90+), Easy (70–89), Standard (60–69), Fairly Difficult (50–59), Difficult (30–49), Very Difficult (below 30). The progress bar shows your score position on the 0–100 scale at a glance.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Score range
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Label
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Typical audience
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "90–100",
                          "Very Easy",
                          "11-year-olds / children's content",
                        ],
                        ["70–89", "Easy", "Consumer content, social media"],
                        ["60–69", "Standard", "General public, news articles"],
                        [
                          "50–59",
                          "Fairly Difficult",
                          "Professional/business content",
                        ],
                        ["30–49", "Difficult", "Academic journals, legal text"],
                        [
                          "0–29",
                          "Very Difficult",
                          "Technical/scientific specialist text",
                        ],
                      ].map(([r, l, a]) => (
                        <tr key={r} className='hover:bg-orange-50'>
                          <td className='px-4 py-2 font-bold text-orange-700 text-xs'>
                            {r}
                          </td>
                          <td className='px-4 py-2 text-gray-600 text-xs'>
                            {l}
                          </td>
                          <td className='px-4 py-2 text-gray-500 text-xs'>
                            {a}
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
              title: "Check the four metric cards",
              body: "Below the Flesch score, four cards show Flesch-Kincaid Grade Level (US school grade), Gunning Fog Index (years of education needed), Automated Readability Index (character-based grade), and average words per sentence. The target for average sentence length is 15–20 words for general audiences — sentences over 25 words are a common cause of high readability scores.",
              enrich: (
                <div className='bg-amber-50 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed'>
                  <strong>Quick improvement check:</strong> If your Gunning Fog
                  score is significantly higher than your Flesch-Kincaid Grade,
                  your text contains many long, complex words (3+ syllables). If
                  both scores are high but your sentences are short, the problem
                  is vocabulary. If your average words per sentence is above 20
                  but your vocabulary is simple, the problem is sentence
                  structure. Each metric points to a different type of revision.
                </div>
              ),
            },
            {
              n: 4,
              title: "Review text statistics and revise",
              body: "The bottom row shows raw counts: words, sentences, syllables, and characters. Compare these to the scores to identify what's driving high complexity. Then revise — break long sentences, replace multi-syllable words with shorter synonyms, and re-check. Paste the revised text to see the updated scores immediately. Use Reset to clear the textarea and start with a new piece of content.",
              enrich: (
                <div className='bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed'>
                  <strong>Practical revision rule of thumb:</strong> Cutting
                  average sentence length from 25 to 15 words improves Flesch
                  Reading Ease by roughly 10 points. Replacing two-syllable
                  words with one-syllable equivalents ('use' instead of
                  'utilise', 'help' instead of 'assist', 'show' instead of
                  'demonstrate') has a similar effect. Both changes together can
                  shift content from 'Difficult' to 'Standard' or better for
                  most audiences.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "✍️",
              title: "Content writing",
              desc: "Check blog posts, landing pages, and marketing copy before publishing — ensure your content is readable for your target audience.",
            },
            {
              emoji: "📋",
              title: "Plain language compliance",
              desc: "Government agencies, healthcare providers, and financial services must often meet plain language standards — readability scores provide objective benchmarks.",
            },
            {
              emoji: "🎓",
              title: "Academic writing",
              desc: "Confirm that academic papers and theses match the expected reading level for their discipline and publication target.",
            },
            {
              emoji: "⚖️",
              title: "Legal documents",
              desc: "Test contracts, terms of service, and policy documents — readability scores help identify sections that may confuse non-specialist readers.",
            },
            {
              emoji: "📚",
              title: "Educational content",
              desc: "Teachers and instructional designers use readability scores to match classroom materials to the intended grade level.",
            },
            {
              emoji: "🤖",
              title: "AI-generated content",
              desc: "Review AI-generated text before publishing — AI output often scores higher than necessary for the intended audience.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-orange-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>📖</div>
          <h3 className='text-xl font-bold mb-3'>
            A Flesch score of 60–70 is the sweet spot for most audiences
          </h3>
          <p className='text-orange-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Research consistently shows that readers prefer and better retain
            content written at a slightly lower level than their actual reading
            ability. The US government plain language standard targets Grade 8
            or below for public-facing documents. Most major newspapers target
            Grade 6–8. Optimising for this range doesn't mean dumbing down — it
            means communicating with precision and clarity.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Text Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/word-counter-live",
                label: "Word Counter Live",
                desc: "Real-time word, character, sentence, and paragraph count with reading time estimates.",
              },
              {
                href: "/tools/grammar-spell-checker",
                label: "Grammar & Spell Checker",
                desc: "Detect and correct grammar and spelling errors in your writing before publishing.",
              },
              {
                href: "/tools/text-summarizer",
                label: "Text Summarizer",
                desc: "Summarise long text into concise bullet points or a paragraph — reduce word count while keeping meaning.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-orange-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
