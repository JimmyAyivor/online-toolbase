"use client";
// src/app/tools/text-to-bullet-points/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/text-to-bullet-points";
const TOOL_NAME = "Text to Bullet Points";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#134e4a", light: "#f0fdfa" },
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
    "Free text to bullet points converter — convert any paragraph into bullets, dashes, or a numbered list instantly",
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
                <span className="text-teal-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "How does the sentence-based splitting work?",
    a: "The converter splits text at two types of boundaries: sentence-terminal punctuation (full stops, exclamation marks, and question marks followed by whitespace) and line breaks (single or multiple newline characters). After splitting, each segment is trimmed of leading whitespace and any existing bullet markers (•, -, *, or existing numbers like '1.') so that re-running the tool on already-bulleted text doesn't double-up the markers. Segments shorter than 3 characters are filtered out to remove stray fragments. The result is one bullet point per original sentence or line.",
  },
  {
    q: "When should I use Bullet (•), Dash (–), or Number?",
    a: "The choice of bullet style should match the context where you'll paste the output. Bullet points (•) are the most visually distinctive and work well for general lists, presentations, and web content where you want clear visual separation between items. Dash lists (–) are the standard Markdown format used in tools like Notion, GitHub, and many note-taking apps — paste dashes directly into these tools and they render as proper bullet points. Numbered lists are best for sequential content where order matters: step-by-step instructions, ranked items, procedural guides, and anything where item 3 depends on item 2. For unordered content where all items are equally weighted, bullet or dash is more appropriate than numbered.",
  },
  {
    q: "Can I convert text that already has bullet points?",
    a: "Yes — the converter strips existing bullet markers before applying the new style. It removes leading •, -, and * characters as well as existing numbered-list prefixes (1., 2), 3. etc.) from each segment before reformatting. This means you can paste an existing bullet list and switch it from bullet style to numbered style, or from dashes to bullets, without getting double markers. It also means you can clean up inconsistently formatted lists — mixing different bullet styles — by converting them to a single consistent format.",
  },
  {
    q: "Why does my text produce fewer bullet points than expected?",
    a: "The converter splits on sentence-terminal punctuation followed by whitespace, and on line breaks. If your text uses minimal punctuation — for example, long run-on sentences without full stops — the entire block may be treated as a single sentence and produce only one bullet. Similarly, text formatted as a single unbroken paragraph with no line breaks will produce one bullet per sentence only if each sentence ends with a full stop, question mark, or exclamation mark. If your source text lacks sentence-ending punctuation, manually add line breaks between the ideas you want as separate bullets before converting. The tool splits on line breaks as well as sentence punctuation.",
  },
  {
    q: "Can I paste the output directly into Notion, Google Docs, or Word?",
    a: "Yes — the output uses plain text bullet markers that paste correctly into all major writing and productivity tools. In Notion: paste dash (-) formatted output and Notion will automatically convert dashes to its native bullet format. In Google Docs and Microsoft Word: paste any style and the plain text markers appear as text — to apply native list formatting, paste unformatted then apply the list style in the editor. In Markdown editors (GitHub README, Obsidian, Bear): use dash style output, which renders as a native unordered list. In email clients: paste bullet (•) style for visual lists that work in all email rendering environments. In presentation tools (Google Slides, PowerPoint): paste bullets directly into a text box.",
  },
  {
    q: "Is there a limit to how much text I can convert?",
    a: "There is no explicit character or word limit enforced by the tool — it will process however much text you paste. Performance is browser-based JavaScript, so extremely long documents (tens of thousands of words) may take a moment to process on slower devices, but for typical use cases (articles, reports, meeting notes up to a few thousand words) conversion is instant. The output panel shows the total bullet count so you can verify how many points were extracted from the input.",
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
          How to Use the Text to Bullet Points Converter
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Paste your text, choose a bullet style, and convert — one bullet per
          sentence, with copy built in.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Paste your text",
              body: "Copy and paste the paragraph, article, meeting notes, or any prose you want to convert into the input area. The word and character counts update live below the textarea. The converter will split on sentence-terminal punctuation (. ! ?) and line breaks — so both well-punctuated prose and text formatted with explicit line breaks between items work as input.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Best inputs:</strong> Article paragraphs, research
                  notes, email body text, and meeting summaries all convert
                  well. Text without sentence-ending punctuation — like social
                  media posts or fragmented notes — will produce fewer bullet
                  points; add manual line breaks between ideas before converting
                  to control the split points.
                </div>
              ),
            },
            {
              n: 2,
              title: "Choose a bullet style",
              body: "Select from three styles using the style buttons: Bullet (•) for standard visual bullet points; Dash (–) for Markdown-compatible lists that render natively in Notion, GitHub, Obsidian, and other Markdown editors; Number (1.) for sequential or ranked lists where order matters. The style can be changed and the text reconverted in seconds.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Style
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Best for
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        [
                          "• Bullet",
                          "Presentations, web copy, general-purpose lists",
                        ],
                        [
                          "– Dash",
                          "Notion, GitHub, Markdown editors, Obsidian",
                        ],
                        [
                          "1. Number",
                          "Step-by-step instructions, ranked lists, procedures",
                        ],
                      ].map(([s, b]) => (
                        <tr key={s} className="hover:bg-teal-50">
                          <td className="px-4 py-2 font-bold text-teal-700 text-xs">
                            {s}
                          </td>
                          <td className="px-4 py-2 text-gray-600 text-xs">
                            {b}
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
              title: "Click Convert to Bullet Points",
              body: "Press the Convert button to run the conversion. The result appears in the output panel showing the total bullet count and the formatted list. Each sentence or line from the input becomes exactly one bullet point. Existing bullet markers in the source text are automatically stripped before the new style is applied — so you can re-convert or change style without double markers.",
              enrich: (
                <div className="bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed">
                  <strong>Too many or too few bullets?</strong> If the output
                  has too many short bullets (common with heavily punctuated
                  text like legal prose), edit the input to merge short adjacent
                  sentences before converting. If too few bullets (common with
                  run-on text), manually add line breaks between ideas in the
                  input, then reconvert — the tool splits on line breaks as well
                  as sentence punctuation.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy and paste into your tool",
              body: "Use the Copy button to send the full bullet list to your clipboard. Paste directly into Notion, Google Docs, Word, PowerPoint, email, or any text editor. Use Reset to clear both input and output and start fresh with new text. For Markdown editors, use Dash style output — the dashes render as native unordered list bullets when the Markdown is processed.",
              enrich: (
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Google Docs & Word tip:</strong> After pasting, select
                  all the pasted text and apply the native 'Bulleted list' or
                  'Numbered list' formatting from the toolbar to replace the
                  plain text markers with the editor's native list style. This
                  gives properly indented, consistently styled lists.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📋",
              title: "Meeting notes",
              desc: "Convert prose meeting summaries into structured bullet lists for action items, decisions, and next steps.",
            },
            {
              emoji: "📊",
              title: "Presentation slides",
              desc: "Break up dense paragraphs into slide-ready bullet points — convert the body of a report section into a slide layout.",
            },
            {
              emoji: "📝",
              title: "Notion and Obsidian",
              desc: "Use Dash style to generate Markdown-ready lists that render natively in Notion, Obsidian, Bear, and GitHub.",
            },
            {
              emoji: "📚",
              title: "Research notes",
              desc: "Convert extracted passages from papers and articles into scannable bullet lists for faster review and synthesis.",
            },
            {
              emoji: "✉️",
              title: "Email formatting",
              desc: "Restructure long email paragraphs into clear bullet lists to improve scanability and ensure all points are read.",
            },
            {
              emoji: "🎓",
              title: "Study revision",
              desc: "Break textbook paragraphs into bullet summaries for revision cards, flashcards, or outline notes.",
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

        <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">📋</div>
          <h3 className="text-xl font-bold mb-3">
            Use Dash style for Markdown editors
          </h3>
          <p className="text-teal-100 leading-relaxed max-w-xl mx-auto text-sm">
            If you use Notion, Obsidian, GitHub, or any other Markdown-based
            tool, select Dash (–) style. Dash-prefixed lines are the standard
            Markdown unordered list syntax — when pasted into a Markdown editor
            they render as properly formatted bullet points with no manual
            reformatting needed.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Writing Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/text-summarizer",
                label: "Text Summarizer",
                desc: "Condense any article or document into key extracted sentences with an adjustable length ratio.",
              },
              {
                href: "/tools/word-character-counter",
                label: "Word & Character Counter",
                desc: "Count words, characters, sentences, and paragraphs with reading time estimates.",
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
