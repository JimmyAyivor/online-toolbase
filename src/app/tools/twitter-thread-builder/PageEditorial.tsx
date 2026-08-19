"use client";
// src/app/tools/twitter-thread-builder/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL ="https://www.utilvia.com/tools/twitter-thread-builder";
const TOOL_NAME = "Twitter Thread Builder";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#0c4a6e", light: "#f0f9ff" },
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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-sky-100 shadow-inner mb-5">
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
    "Free Twitter/X thread builder — write, reorder, and export threads with live character counts and numbered formatting. No signup.",
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
                <span className="text-sky-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              Scan QR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const THREAD_TEMPLATES = [
  [
    "Hook thread",
    "Opens with a bold claim or counterintuitive insight, then delivers evidence and explanation across 5–10 tweets, ending with a takeaway or CTA.",
  ],
  [
    "Listicle thread",
    "Numbered tips or items (e.g. '10 things I learned about X'). Hook tweet announces the count; each subsequent tweet covers one item.",
  ],
  [
    "Story thread",
    "A personal narrative told chronologically: context → conflict → turning point → resolution → lesson. Highly shareable due to emotional arc.",
  ],
  [
    "How-to thread",
    "Step-by-step walkthrough of a process. Each tweet = one step with a brief explanation. Ends with a summary or link to more detail.",
  ],
  [
    "Breakdown thread",
    "Deep-dive analysis of a single topic, person, product, or event. Often starts 'Let me break down [X]…' and dissects key components one per tweet.",
  ],
  [
    "Opinion thread",
    "Argues a position across multiple tweets, acknowledging counterarguments and restating the thesis in the final tweet.",
  ],
];

const FAQS = [
  {
    q: "What is a Twitter/X thread and why do creators use them?",
    a: "A Twitter / X thread is a series of connected tweets published in sequence from the same account, linked together so they read as a continuous piece of content. Threads allow creators to share long-form ideas, stories, analyses, or guides within a platform that limits individual posts to 280 characters. They became popular because they combine the conversational feel and algorithmic distribution of Twitter with the substance and depth of long-form writing. Threads tend to perform well because X's algorithm rewards engagement: replies, retweets, and quote tweets on the first tweet boost distribution of the entire thread. Well-crafted threads can accumulate thousands of impressions over days or weeks as they get reshared, making them one of the highest-reach content formats on X for thought leaders, educators, and writers.",
  },
  {
    q: "How long should a Twitter thread be?",
    a: "The optimal thread length depends on the content type and audience, but research into top-performing threads suggests 5–15 tweets is the sweet spot for most use cases. Threads shorter than 5 tweets often don't provide enough value to justify the format over a single tweet or short thread. Threads longer than 20 tweets risk losing readers due to length fatigue, though data-heavy breakdowns and in-depth analyses can sustain longer threads when every tweet adds genuine value. The key test: does each tweet standalone as a worthwhile insight, or is it padding? Cut aggressively. A 7-tweet thread where every tweet is sharp outperforms a 20-tweet thread with filler. Many of the highest-performing threads on X are 7–10 tweets covering a single focused topic with a strong hook, substantive middle tweets, and a clear ending CTA.",
  },
  {
    q: "What makes a good thread hook (the first tweet)?",
    a: "The first tweet is the most important element of a thread — it determines whether anyone reads past it. A strong first tweet needs to do one of three things: make a bold claim ('Most advice about [X] is wrong'), promise specific value ('I spent 100 hours researching [X]. Here's what I found:'), or create a curiosity gap ('The [counterintuitive thing about X] nobody talks about. A thread:'). The first tweet should stand alone as interesting even without the thread — it's what gets retweeted and reshared independently. Avoid starting with 'A thread:' as the only content; make the hook deliver a compelling standalone statement. The numbered format '1/' or 'Thread 🧵' at the end of the first tweet signals to readers there's more to come and increases the likelihood they click through.",
  },
  {
    q: "What is the 280-character limit and does it apply to threads?",
    a: "Standard X / Twitter accounts have a 280-character limit per tweet, which applies to every tweet in a thread. X Premium (paid subscription) subscribers have an extended character limit of up to 25,000 characters per post, enabling long-form articles within X itself. For standard accounts, each tweet in a thread must fit within 280 characters. This constraint is actually a feature for thread-writers: it forces concision and makes each tweet punchy and scannable. Count URLs as 23 characters regardless of actual length (X auto-shortens all URLs). Emojis count as 2 characters each. The live character counter in this tool accounts for these rules.",
  },
  {
    q: "Should I number my tweets (1/, 2/, etc.)?",
    a: "Numbering is optional but recommended for most thread types. Numbers serve several purposes: they signal to the reader how long the thread is and where they are within it, they give each tweet a visual anchor that makes the thread easier to navigate, and they look professional and intentional. The most common format is '1/' at the start of each tweet followed by the content, or the number at the end '— (1/7)'. For very short threads (3–4 tweets), numbering can feel mechanical and unnecessary; for threads of 5+ tweets, it helps readers track their progress and encourages them to read to the end. This builder includes auto-numbering to handle this automatically — toggle it on or off depending on your style preference.",
  },
  {
    q: "How do I actually post a thread on X / Twitter?",
    a: "To post a thread on X: tap the compose button to start a new tweet, write your first tweet, then click the '+' icon (Add tweet) below the tweet to add a second tweet. Continue adding tweets until your thread is complete — each tweet stays connected in the compose interface. Review all tweets for character limits and typos, then click 'Post all' to publish the entire thread simultaneously. All tweets are posted at the same time and appear linked in sequence. Alternatively, you can post tweets individually in reply to your own previous tweet, but this is less reliable as users may miss earlier tweets. This thread builder lets you draft and reorder all tweets offline before you copy-paste them into X's compose interface for posting.",
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
              <span className="text-gray-900 text-lg shrink-0">
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
          How to Use the Twitter Thread Builder
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Choose a template or start from scratch, write each tweet with a live
          character counter, reorder as needed, and export the full thread as
          formatted text ready to post.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Start from a template or blank",
              body: "Select one of the pre-built thread templates — Hook Thread, Listicle, Story, How-To, Breakdown, or Opinion — to get a pre-structured set of tweet starters that guide the format. Each template includes placeholder text showing the recommended structure for that thread type. Alternatively, start with a blank thread and add tweets manually. Templates are a useful starting point when you know the type of content you want to write but need help with the structural scaffolding.",
              enrich: (
                <div className="overflow-x-auto rounded-xl border border-gray-100 text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Template
                        </th>
                        <th className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                          Structure
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {THREAD_TEMPLATES.map(([name, desc]) => (
                        <tr key={name} className="hover:bg-sky-50">
                          <td className="px-4 py-2 font-bold text-gray-900 text-xs whitespace-nowrap">
                            {name}
                          </td>
                          <td className="px-4 py-2 text-xs text-gray-500">
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
              title: "Write each tweet with the live character counter",
              body: "Each tweet panel shows a live character count as you type. The counter turns orange as you approach 280 characters and red when you exceed the limit. Exceeding 280 characters on a tweet flags it as too long — you'll need to split the content or edit it down before posting. URLs count as 23 characters each (X auto-shortens all links), and emojis count as 2 characters. Use the 'Add Tweet' button to append new tweets below the current last tweet.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Character counting tips:</strong> Each line break
                  counts as 1 character. A single emoji counts as 2 characters.
                  A URL (any length) counts as 23 characters because X wraps all
                  URLs in its own t.co shortener. A mention (@username) counts
                  normally as the full character length of the handle. Keep
                  these in mind when your tweet is close to the limit.
                </div>
              ),
            },
            {
              n: 3,
              title: "Reorder tweets with the arrow buttons",
              body: "Use the up and down arrow buttons on each tweet panel to move it earlier or later in the thread. Reordering is essential for thread quality — the natural order in which you write ideas is rarely the optimal reading order. Common reordering strategies: move the most compelling insight to position 2 or 3 (the second or third tweet often determines whether readers continue past the hook), move context-setting tweets later (readers don't need background before they're hooked), and group related points together.",
              enrich: (
                <div className="bg-gray-50 rounded-xl px-5 py-4 text-sm text-gray-700 leading-relaxed">
                  <strong>Structural review tip:</strong> After writing your
                  full thread, read it in one sitting as if you're a new reader
                  encountering it for the first time. Ask: does each tweet earn
                  the next click? Is there any tweet that could be cut without
                  losing meaning? The best threads are tight — no padding, every
                  tweet adds value. Delete ruthlessly before exporting.
                </div>
              ),
            },
            {
              n: 4,
              title: "Export and post",
              body: "Click 'Export Thread' to download a formatted text file of the complete thread, with each tweet numbered and separated. Copy individual tweets from the export file and paste them into X's compose interface in sequence. Use X's built-in multi-tweet compose feature (the '+' button in the composer) to chain all tweets before posting simultaneously — this ensures the thread is posted as a single linked unit rather than as disconnected replies.",
              enrich: (
                <div className="bg-sky-50 rounded-xl px-5 py-4 text-sm text-sky-800 leading-relaxed">
                  <strong>Posting tip:</strong> In X's compose interface, tap
                  the '+' button after writing each tweet to add the next one to
                  the thread — all tweets in the composer are posted together as
                  a linked thread when you tap 'Post all'. Avoid posting tweets
                  one at a time as manual replies to yourself, as this can break
                  the threading display on some clients and makes it harder for
                  readers to navigate.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "📚",
              title: "Thought leadership",
              desc: "Share expertise, frameworks, and original insights as structured threads that build credibility and attract followers in your field.",
            },
            {
              emoji: "📖",
              title: "Storytelling",
              desc: "Tell personal or professional stories in a series of punchy, connected tweets — narrative threads consistently drive high engagement and shares.",
            },
            {
              emoji: "🧠",
              title: "Educational breakdowns",
              desc: "Explain complex topics, processes, or ideas step-by-step — threads are ideal for 'how this works' content that delivers genuine learning value.",
            },
            {
              emoji: "📣",
              title: "Product and launch announcements",
              desc: "Structure product launch announcements as threads — hook tweet for attention, feature tweets for depth, and a CTA tweet to drive action.",
            },
            {
              emoji: "🔍",
              title: "Research and analysis",
              desc: "Share research findings, competitive analysis, or industry breakdowns — the thread format suits data-heavy content that benefits from one point per tweet.",
            },
            {
              emoji: "✍️",
              title: "Writing practice",
              desc: "Use threads as a writing discipline — the 280-character constraint forces clarity and concision, making thread writing a useful exercise for any writer.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-gray-300 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">𝕏</div>
          <h3 className="text-xl font-bold mb-3">
            Threads outperform single tweets for reach, saves, and follower
            growth — plan yours before you post
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-xl mx-auto text-sm">
            Data from X / Twitter consistently shows that well-structured
            threads outperform single tweets on nearly every engagement metric
            for educational and informational content. The thread format gives
            the algorithm more engagement surface area — each tweet can be
            liked, replied to, and retweeted independently, compounding the
            total reach. Off-the-cuff threads drafted directly in the X compose
            interface tend to be loose and uneven; threads planned in a
            dedicated tool like this one, where you can see the full structure
            at once and reorder freely, produce noticeably tighter and more
            effective content. Write first, post second.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Social Media Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/linkedin-post-formatter",
                label: "LinkedIn Post Formatter",
                desc: "Format LinkedIn posts with line breaks, spacing, and visual structure for better readability and engagement.",
              },
              {
                href: "/tools/social-media-character-counter",
                label: "Social Media Character Counter",
                desc: "Count characters for Twitter/X, Instagram, LinkedIn, and other platforms — see limits per platform at a glance.",
              },
              {
                href: "/tools/hashtag-generator",
                label: "Hashtag Generator",
                desc: "Generate relevant hashtags for Twitter/X, Instagram, and TikTok — increase reach and discoverability for any topic.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-gray-300 hover:-translate-y-1 transition-all duration-200 p-5"
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
