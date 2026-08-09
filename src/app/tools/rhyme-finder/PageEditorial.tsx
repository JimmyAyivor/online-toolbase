"use client";
// src/app/tools/rhyme-finder/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://www.onlinetoolbase.com/tools/rhyme-finder";
const TOOL_NAME = "Rhyme Finder";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#831843", light: "#fdf2f8" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-pink-100 shadow-inner mb-5">
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
    "Free rhyme finder — find perfect rhyming words for poetry and lyrics instantly, no signup needed",
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
                <span className="text-pink-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How does the rhyme finder work?",
    a: "The tool uses a built-in dictionary of phonetic ending groups — 25 groups covering common English sound patterns like 'ay' (day, say, play), 'ight' (night, light, bright), 'ound' (sound, found, ground), and so on. When you enter a word, the tool checks whether the word belongs to one of these groups (either because it's listed in the group or because it ends with the group's suffix). If a match is found, the tool returns all other words in that group as rhymes, filtering out the input word itself and any words that contain the input word as a substring. If no direct group match is found, the tool falls back to a suffix-matching search across all groups, looking for any words ending in the last 3 or 2 characters of your input.",
  },
  {
    q: "What is the difference between a perfect rhyme and a near-rhyme?",
    a: "A perfect rhyme (also called a true rhyme) occurs when two words share the same vowel sound and all subsequent sounds from the last stressed syllable onward — for example, 'cat' and 'hat', 'night' and 'bright', 'love' and 'above'. This tool returns perfect rhymes based on phonetic ending groups. A near-rhyme (also called a slant rhyme, half rhyme, or imperfect rhyme) occurs when words share some but not all of the matching sounds — for example, 'time' and 'dime' are a perfect rhyme, but 'time' and 'fine' are a near-rhyme. Near-rhymes are widely used in contemporary poetry and song lyrics, especially in hip-hop, folk, and indie music, where strict perfect rhyming can feel forced or limiting. This tool focuses on perfect rhymes, but many of the returned words can also serve as near-rhymes for adjacent searches.",
  },
  {
    q: "Why does the tool return no results for some words?",
    a: "The tool's rhyme dictionary covers 25 common English phonetic ending groups with approximately 400 words total. Words that belong to smaller or less common phonetic groups — proper nouns, technical terms, loanwords from other languages, and highly specific vocabulary — may not be included. The fallback suffix search broadens the search to 2–3 letter endings, but this can still return no results for unusual words. If you get no results, try entering a simpler or more common English word, or try the last syllable of a multi-syllable word as a separate search. For example, if 'inspire' returns few results, searching 'fire' will return more options that rhyme with the '-ire' ending.",
  },
  {
    q: "What are the most useful rhyme groups for songwriting?",
    a: "The most productive rhyme groups for songwriting tend to be the ones with large, varied word sets that include both simple and emotionally resonant words. The '-ay' group (day, say, way, play, stay, away, betray, display) is among the most useful because it includes action words, time words, and emotionally charged vocabulary. The '-ight' group (night, light, bright, fight, right, sight, delight, ignite) is another favourite in pop and country music. The '-ine' group (line, mine, shine, divine, define, sunshine) offers strong lyrical potential. The '-air/-are' group (there, care, share, rare, aware, prepare, despair, nightmare) provides excellent contrast between positive and negative emotions. The '-ire' group (fire, desire, inspire, admire, aspire, empire, vampire) is particularly useful for anthemic and dramatic content.",
  },
  {
    q: "Can I use this for rap and hip-hop lyrics?",
    a: "Yes — this tool returns perfect rhymes, which form the foundation of all rhyme schemes including rap. However, rap and hip-hop lyrics make especially heavy use of multisyllabic rhymes, near-rhymes, and internal rhymes (rhymes within a line rather than at the end), which this tool does not directly support. For multi-syllable rhyming, try searching the stressed syllable of a word independently — for example, for 'beautiful', search 'full' or 'ful'. For near-rhymes, search adjacent endings (words ending in '-ine' can often near-rhyme with '-ight' or '-ire' endings, for example). Many acclaimed hip-hop writers use both perfect and near-rhymes in the same verse to maintain natural speech rhythm while keeping the rhyme pattern dense.",
  },
  {
    q: "What are common rhyme schemes in poetry?",
    a: "A rhyme scheme is the pattern of end rhymes in a poem, typically denoted by assigning a letter to each new rhyme sound. ABAB is the most common — alternating rhymes across four lines, used in ballads, sonnets, and countless folk songs. AABB (couplets) rhymes successive pairs of lines and feels more immediate and conversational — used in heroic couplets, nursery rhymes, and rap punchlines. ABCB only rhymes the second and fourth lines, leaving the first and third free, which creates a more natural speech-like flow — very common in folk music and hymns. AAAA (monorhyme) rhymes all lines on the same sound, which can feel incantatory or humorous. The Shakespearean sonnet uses ABAB CDCD EFEF GG — three alternating-rhyme quatrains plus a closing couplet. Knowing which scheme you're targeting helps you use the rhyme finder more efficiently: for ABAB, find two strong rhyme pairs; for AABB, find pairs that can close each couplet.",
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
              <span className="text-pink-600 text-lg shrink-0">
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
          How to Use the Rhyme Finder
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Enter any word and instantly find all its perfect rhymes — click any
          result to copy it to your clipboard.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Type a word and press Enter or Find Rhymes",
              body: "Type any English word into the input field and press Enter or click the Find Rhymes button. The tool searches its built-in phonetic ending dictionary and returns all perfect rhymes in the same ending group. Press Enter directly in the input field to avoid clicking — useful when you're iterating quickly through multiple words.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Popular words shortcut:</strong> The Popular Words
                  panel below the input shows 20 common words from the most
                  productive rhyme groups — love, night, fire, day, time, heart,
                  dream, light, rain, and more. Click any of them for an instant
                  rhyme list without typing. These are pre-selected because they
                  cover the most useful groups for poetry and songwriting.
                </div>
              ),
            },
            {
              n: 2,
              title: "Browse the rhyme results",
              body: "Matching rhymes appear as clickable chips in the results panel. The count shows how many rhymes were found. The words are drawn from the phonetic ending group that contains your input — or from a suffix fallback search if no direct group match is found. All results are perfect rhymes that share the same vowel sound and ending sounds as your input word.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Input word
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Ending group
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Sample rhymes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "night",
                          "–ight",
                          "light, bright, right, fight, delight, ignite",
                        ],
                        ["love", "–ove", "above, dove, glove, shove"],
                        ["day", "–ay", "say, way, play, stay, away, betray"],
                        [
                          "fire",
                          "–ire",
                          "desire, inspire, admire, empire, aspire",
                        ],
                        [
                          "sound",
                          "–ound",
                          "found, ground, around, profound, astound",
                        ],
                      ].map(([w, g, r]) => (
                        <tr key={w} className="hover:bg-pink-50">
                          <td className="px-4 py-2 font-bold text-pink-700 text-xs">
                            {w}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {g}
                          </td>
                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {r}
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
              title: "Click any rhyme word to copy it",
              body: "Click any rhyme chip to instantly copy that word to your clipboard — the chip briefly shows a checkmark confirmation. Paste directly into your lyrics editor, poem draft, or notes app. There's no separate copy button to hunt for — clicking the word itself is the copy action.",
              enrich: (
                <div className="bg-rose-50 rounded-xl px-5 py-4 text-sm text-rose-800 leading-relaxed">
                  <strong>No results?</strong> If the tool returns zero rhymes,
                  the word may not be in any of the 25 phonetic ending groups.
                  Try the last syllable of a multi-syllable word as a standalone
                  search — for example, search 'inspire' as 'ire', or
                  'beautiful' as 'full'. Alternatively, try a synonym of your
                  word that shares the same ending sound.
                </div>
              ),
            },
            {
              n: 4,
              title: "Iterate quickly across multiple words",
              body: "Use Reset to clear the input and start a new search, or simply type a new word over the existing one and press Enter — the results update immediately. This makes the tool fast to use during a writing session where you're evaluating multiple rhyme options in sequence. The Popular Words panel stays visible at all times for quick one-click access to the most productive rhyme groups.",
              enrich: (
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Workflow tip for songwriters:</strong> Choose your
                  rhyme scheme first (ABAB, AABB, etc.), then use the finder to
                  identify two or three rhyme groups that contain emotionally
                  resonant words for your theme. For a love song using ABAB, you
                  might pair the '-ire' group (fire, desire, inspire) with the
                  '-ove' group (love, above, dove) for alternating end rhymes
                  across the verse.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "🎵",
              title: "Songwriting",
              desc: "Find rhymes for verse and chorus end words — use the Popular Words panel to quickly explore the most productive groups for emotional content.",
            },
            {
              emoji: "📜",
              title: "Poetry",
              desc: "Identify rhyme options when composing formal poetry with fixed schemes like sonnets, ballads, villanelles, and terza rima.",
            },
            {
              emoji: "🎤",
              title: "Rap lyrics",
              desc: "Use the tool to find perfect rhymes as a foundation, then extend to near-rhymes by searching adjacent ending sounds for multisyllabic options.",
            },
            {
              emoji: "📚",
              title: "Children's writing",
              desc: "Create rhyming picture books, nursery rhymes, and classroom poems — the simple chip interface makes it easy to explore and pick words.",
            },
            {
              emoji: "🎭",
              title: "Greeting cards",
              desc: "Find rhymes for personalised messages, birthday verses, wedding toasts, and spoken word pieces for special occasions.",
            },
            {
              emoji: "🎓",
              title: "Teaching poetry",
              desc: "Use as a classroom resource for poetry units — students can explore rhyme families and experiment with different ending sounds.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-pink-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🎵</div>
          <h3 className="text-xl font-bold mb-3">
            The most powerful rhyme groups for songwriting
          </h3>
          <p className="text-pink-100 leading-relaxed max-w-xl mx-auto text-sm">
            The –ight group (night, light, bright, fight, delight) and –ire
            group (fire, desire, inspire, admire) are among the most used in
            popular music because they combine simple, vivid imagery with strong
            emotional resonance. The –ay group (day, say, way, play, away,
            betray) is the single largest group and appears in more hit songs
            than any other rhyme ending.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Writing Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/essay-title-generator",
                label: "Essay Title Generator",
                desc: "Generate 10 compelling title ideas for essays, research papers, blog posts, or reports.",
              },
              {
                href: "/tools/lorem-ipsum-generator",
                label: "Lorem Ipsum Generator",
                desc: "Generate placeholder text in paragraphs, sentences, words, or lists.",
              },
              {
                href: "/tools/paraphrasing-tool",
                label: "Paraphrasing Tool",
                desc: "Rewrite any text in 6 styles — Standard, Fluent, Formal, Simple, Creative, Expand.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-pink-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
