"use client";
// src/app/tools/writing-prompt-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/writing-prompt-generator";
const TOOL_NAME = "Writing Prompt Generator";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#14532d", light: "#f0fdf4" },
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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-inner mb-5'>
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
    "Free writing prompt generator — 80+ creative writing prompts across 8 genres, beat writer's block instantly",
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
                <span className='text-emerald-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "How does the writing prompt generator work?",
    a: "The generator maintains a library of 80 hand-written prompts across 8 genres — 10 prompts per genre. When you click Generate Prompt, the tool randomly selects a prompt from the current genre's pool that hasn't appeared in your last 10 generations. This prevents repeats within a session. Once all prompts in a genre have been shown, the cycle resets and the full pool becomes available again. Switching genres resets both the prompt display and the history for that session. The prompts are written to be specific enough to spark a story, but open enough that there's no single correct interpretation — each one can go in many different directions depending on the writer.",
  },
  {
    q: "How do I use a writing prompt effectively?",
    a: "The most effective approach is to set a timer — usually between 10 and 25 minutes — and write without stopping. This is sometimes called freewriting or timed writing. The key rules are: don't edit as you go, don't delete what you've written, and don't worry about whether it's good. The goal of a prompt session is not to produce a finished piece but to generate raw material and break through mental blocks. Start the story in the middle of the action rather than at the beginning of the backstory — 'She found the letter' is a stronger opening than 'Maria was born in 1984 and had always been curious'. If you get stuck mid-session, change one word in the prompt and see where that takes you. After the timer ends, read what you've written and highlight any sentences or images that feel interesting — these are often the seeds of a longer work.",
  },
  {
    q: "What is the difference between the 8 genre modes?",
    a: "Each genre mode draws from a different prompt pool, each with its own conventions and atmosphere. Fiction prompts are literary and character-driven, focusing on moments of discovery or change. Sci-Fi prompts involve speculative concepts — AI consciousness, colonisation, memory transfer, simulation theory — told through individual human stories rather than as world-building exercises. Horror prompts rely on the uncanny: something is wrong but not immediately explicable. Romance prompts are built around circumstance and timing — two people in the right situation. Mystery prompts start from an unsolved problem or contradiction. Fantasy prompts involve magical systems, prophecies, and archetypes. Non-Fiction prompts are personal essay prompts — memoir-style questions about belief, memory, and change. Poetry prompts often use unusual perspectives or constraints to force a fresh angle on familiar subjects.",
  },
  {
    q: "Can I use these prompts for commercial writing or publishing?",
    a: "Yes — the prompts are provided without restriction for any use, including commercial writing, publication, workshop distribution, and classroom use. A prompt is simply a starting point; the story you write from it is your own work. There is no attribution required. Many published novels, short stories, and poems began as timed writing from a prompt — the prompt itself contributes nothing to the finished work beyond the initial spark.",
  },
  {
    q: "How do I use writing prompts for writer's block?",
    a: "Writer's block usually has one of three causes: perfectionism (fear that what you write won't be good enough), decision paralysis (too many options, unclear where to start), or creative depletion (you've been consuming but not producing). Writing prompts address all three. They reduce decision paralysis by giving you a specific starting point. They reduce perfectionism by framing the writing as a response to a prompt rather than as your own work — it's easier to write something imperfect when you're 'just following a prompt'. For creative depletion, prompts in an unfamiliar genre can help — if you write fiction, try the poetry or non-fiction prompts, which require a completely different mode of attention. The key is not to evaluate the output during the session: write first, judge later.",
  },
  {
    q: "What is the best way to use prompts in a writing workshop?",
    a: "In a workshop setting, prompts work best as low-stakes warm-up exercises at the start of a session. A 10-minute timed write from a shared prompt gives every participant something to work from and normalises the act of writing quickly without editing. After the timer, participants can choose to share what they've written or simply use it as a warm-up. For more structured workshop use, the genre-specific modes are useful: a horror workshop can use the Horror prompts exclusively, while a personal essay workshop can work through the Non-Fiction prompts. You can also use a single prompt as the basis for comparing different approaches — asking participants to each write from the same prompt produces very different pieces and is useful for demonstrating how the same starting point can generate many stories.",
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
              <span className='text-emerald-600 text-lg shrink-0'>
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
          How to Use the Writing Prompt Generator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Choose a genre, generate a prompt, and start writing — prompts don't
          repeat until you've seen them all.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Choose a genre",
              body: "Select from 8 genre modes: Fiction, Sci-Fi, Horror, Romance, Mystery, Fantasy, Non-Fiction, and Poetry. Each mode draws from its own pool of 10 purpose-written prompts. Switching genre resets the prompt display so you start fresh in the new genre. You can also switch genre mid-session if a prompt in one genre isn't sparking anything — sometimes a horror or poetry prompt can unblock a fiction writer by forcing a completely different mode of attention.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Genre
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Focus
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Good for
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "📖 Fiction",
                          "Character & discovery",
                          "Short stories, literary fiction",
                        ],
                        [
                          "🚀 Sci-Fi",
                          "Speculative concepts",
                          "Near-future, technology stories",
                        ],
                        [
                          "👻 Horror",
                          "The uncanny & dread",
                          "Atmospheric, psychological horror",
                        ],
                        [
                          "💕 Romance",
                          "Circumstance & timing",
                          "Love stories, relationships",
                        ],
                        [
                          "🔍 Mystery",
                          "Contradiction & secrets",
                          "Crime, thriller, whodunits",
                        ],
                        [
                          "🧙 Fantasy",
                          "Magic & archetypes",
                          "Secondary world, mythic fiction",
                        ],
                        [
                          "✍️ Non-Fiction",
                          "Memory & belief",
                          "Personal essays, memoir",
                        ],
                        [
                          "🎭 Poetry",
                          "Perspective & constraint",
                          "Lyric poems, prose poetry",
                        ],
                      ].map(([g, f, u]) => (
                        <tr key={g} className='hover:bg-emerald-50'>
                          <td className='px-4 py-2 font-bold text-emerald-700 text-xs whitespace-nowrap'>
                            {g}
                          </td>
                          <td className='px-4 py-2 text-gray-600 text-xs'>
                            {f}
                          </td>
                          <td className='px-4 py-2 text-gray-500 text-xs'>
                            {u}
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
              title: "Click Generate Prompt",
              body: "Press Generate Prompt to receive a random prompt from your chosen genre. The generator tracks which prompts you've already seen in the current session and avoids repeating them — it cycles through all 10 prompts in the genre before any repeats appear. Click New Prompt inside the result card to generate another without returning to the top of the page. Copy Prompt copies the full prompt text to your clipboard.",
              enrich: (
                <div className='bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed'>
                  <strong>No-repeat cycling:</strong> The generator keeps a
                  history of your last 10 prompts in the current genre and
                  excludes them from the next draw. This means in a 10-prompt
                  genre, you'll see all 10 before any repeat. Once you've
                  exhausted the pool, it resets automatically — so you can keep
                  generating without manually tracking what you've seen.
                </div>
              ),
            },
            {
              n: 3,
              title: "Set a timer and write without stopping",
              body: "The most effective way to use a writing prompt is with a timed write: set a timer for 10–25 minutes and write without stopping, without editing, and without deleting. Don't evaluate what you're writing during the session — write through the hesitation. The goal is raw material, not a finished piece. Starting in the middle of the action rather than at the beginning of the backstory is the single most useful technique: if the prompt involves someone finding a letter, start with 'She opened it' rather than explaining who she is.",
              enrich: (
                <div className='bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed'>
                  <strong>Timer recommendation by experience:</strong>{" "}
                  Beginners: 10 minutes — enough to get a scene started without
                  feeling overwhelming. Intermediate: 15–20 minutes — enough to
                  reach a turn or reveal. Experienced: 25–30 minutes — enough to
                  write a complete short-short story from scratch. If you stop
                  before the timer ends, re-read your last sentence and continue
                  from there rather than from the prompt.
                </div>
              ),
            },
            {
              n: 4,
              title: "Review and highlight what works",
              body: "After the timer ends, read what you've written without immediately judging the whole piece. Highlight or underline any sentences, images, or moments that feel interesting, surprising, or true — even if the surrounding paragraphs are rough. These highlights are often the seeds of a longer piece. A prompt session rarely produces finished work, but it frequently produces the raw material that eventually becomes it. Use Reset to clear the prompt and start again with a new genre or a new topic.",
              enrich: (
                <div className='bg-emerald-50 rounded-xl px-5 py-4 text-sm text-emerald-800 leading-relaxed'>
                  <strong>What to do with your prompts:</strong> Keep a
                  dedicated notebook or file for prompt writing. Date each entry
                  and note the genre. After a month of regular prompt sessions,
                  you'll have a substantial archive of raw material —
                  characters, images, scenes, and voices — that you can return
                  to when starting a longer project. Many writers find that
                  their strongest work originated in a prompt session they
                  dismissed as 'just practice'.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center'>
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
              title: "Breaking writer's block",
              desc: "Use any genre prompt as a 10-minute freewrite to break through paralysis and get words on the page — the quality doesn't matter, the momentum does.",
            },
            {
              emoji: "📚",
              title: "Daily writing practice",
              desc: "Use one prompt per day as a consistent writing warm-up. A month of daily 15-minute sessions produces roughly 15,000 words of raw material.",
            },
            {
              emoji: "🎓",
              title: "Creative writing classes",
              desc: "Teachers and tutors can use genre-specific prompts as in-class exercises — the 8 genre modes cover the main creative writing forms taught at secondary and university level.",
            },
            {
              emoji: "🏆",
              title: "Writing competitions",
              desc: "Short story and flash fiction competitions often require original work written to a theme. Prompt sessions help you develop speed and flexibility under time pressure.",
            },
            {
              emoji: "📓",
              title: "Journalling & memoir",
              desc: "The Non-Fiction prompts are memoir-style essay starters — useful for journalling, personal history projects, and reflective writing practice.",
            },
            {
              emoji: "🎮",
              title: "World-building & RPGs",
              desc: "Fantasy and Sci-Fi prompts can seed character backstories, encounter ideas, and world-building details for tabletop roleplaying campaigns and game writing.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>📝</div>
          <h3 className='text-xl font-bold mb-3'>
            Start in the middle — not at the beginning
          </h3>
          <p className='text-green-100 leading-relaxed max-w-xl mx-auto text-sm'>
            The single most effective technique for prompt writing is to skip
            the backstory and begin with the action already in progress. If the
            prompt says someone finds a letter, open with them reading it. If it
            involves a stranger, open with the conversation already underway.
            Starting in medias res creates immediate tension and forces you to
            reveal character through action rather than explanation — which is
            how the best fiction works regardless of length.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Writing Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/essay-title-generator",
                label: "Essay Title Generator",
                desc: "Generate 10 compelling title ideas for essays, research papers, blog posts, or reports.",
              },
              {
                href: "/tools/rhyme-finder",
                label: "Rhyme Finder",
                desc: "Find perfect rhyming words for poetry and song lyrics — built-in phonetic dictionary.",
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
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-emerald-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
