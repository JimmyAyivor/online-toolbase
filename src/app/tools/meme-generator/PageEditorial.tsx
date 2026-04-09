"use client";
// src/app/tools/meme-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/meme-generator";
const TOOL_NAME = "Meme Generator";

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
        <div className="inline-block rounded-2xl overflow-hidden border-4 border-yellow-100 shadow-inner mb-5">
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
    "Free meme generator — upload any image, add top and bottom text, download. Classic templates included. No signup.",
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
                <span className="text-yellow-600">✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all"
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
    q: "Does this tool upload my images to a server?",
    a: "No — all meme creation happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device: they are not uploaded to any server, stored in a database, or transmitted over the internet. The tool reads your image locally, draws it onto a canvas element, overlays the text, and generates a downloadable PNG — entirely within your browser tab. This means the tool is completely private, works offline once loaded, and there are no file size limits beyond your device's available memory.",
  },
  {
    q: "What is the classic 'Impact font with white text and black outline' meme style?",
    a: "The iconic meme text style originated in the early internet era (2000s–2010s) and became the defining visual language of image macros. It uses Impact, a heavy condensed sans-serif typeface designed specifically to take up a lot of visual space while remaining legible. The text is set in white with a thick black stroke outline, which makes it readable over any background — light or dark. This style is associated with classic memes like Lolcat ('I can has cheezburger'), Advice Animals, and the Rage Comics era. The style became so ubiquitous that 'meme font' is a widely understood colloquial term for Impact. Modern memes often use different styles — bold white text with a softer drop shadow — but Impact remains instantly recognisable as the classic format.",
  },
  {
    q: "What makes a good meme text?",
    a: "Effective meme text is short, punchy, and immediately understandable — the joke or observation should land in under two seconds. Most successful meme captions are 1–8 words per line at most. The classic structure is a setup on top and a punchline on the bottom, though many modern memes use only bottom text or break from this format entirely. Good meme text relates directly to the image in an unexpected, subverted, or relatable way. Avoid overly wordy explanations: if you have to explain the joke, it usually doesn't work as a meme. Capitalisation choices (ALL CAPS vs mixed case) carry tonal meaning — ALL CAPS implies shouting or emphasis, which suits high-energy or absurd humour; sentence case feels more conversational and suits dry or understated humour.",
  },
  {
    q: "What image formats work best for memes?",
    a: "For creating memes, the input image format matters less than the output. JPG and PNG are both fine inputs. The meme generator outputs PNG, which is generally preferable for sharing text-heavy images because PNG uses lossless compression that preserves sharp edges on text without the blurry artefacts that JPEG compression can introduce around high-contrast areas. When sharing memes, most social platforms will re-compress the image anyway — but starting with a high-quality input and PNG output gives the best result. For GIF memes (animated), a separate tool capable of writing animated GIF or WebP files would be needed, as this tool produces still images only.",
  },
  {
    q: "What are the most popular classic meme templates?",
    a: "Classic meme templates that remain widely recognised include: Drake Hotline Bling (disapproving vs approving two-panel), Distracted Boyfriend (looking away from girlfriend), Two Buttons (person sweating over a choice), This Is Fine (dog in burning room), Expanding Brain (increasingly absurd tiers of intelligence), Change My Mind (Steven Crowder at a table), Surprised Pikachu (wide-eyed shock reaction), Epic Handshake (two hands clasping over a shared trait), and Woman Yelling at Cat. These templates work because the image itself communicates a clear emotional state or relationship that the text can repurpose for any subject. The humour comes from the unexpected application of a familiar visual format to a new context.",
  },
  {
    q: "Can I use memes I create here commercially?",
    a: "The meme text you write and overlay is your own creation. However, the underlying image may be subject to copyright. If you upload your own original photo, you can use the resulting meme however you like. If you use a template image you found online, the underlying photo or artwork may be owned by someone else — using it commercially (for advertising, products, or monetised content) could infringe copyright. Most internet meme templates are widely shared with an implicit permissive culture for non-commercial personal sharing, but this does not constitute a legal licence. For commercial use, use images you own, images in the public domain, or images licensed under Creative Commons (CC0 or similar) that explicitly permit commercial use. When in doubt, consult a legal professional.",
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
            >
              <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
              <span className="text-yellow-600 text-lg shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
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
          How to Use the Meme Generator
        </h2>
        <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Pick a classic template or upload your own image, type your top and
          bottom text, adjust the style, preview live on the canvas, and
          download your meme — all in your browser.
        </p>

        <div className="space-y-6 mb-14">
          {[
            {
              n: 1,
              title: "Choose a template or upload your own image",
              body: "The tool offers a selection of classic meme templates you can click to load instantly — including popular formats with recognisable layouts that work well with the classic two-line caption structure. Alternatively, click 'Upload Your Own Image' to use any photo or graphic from your device. The image is loaded locally in your browser and never uploaded to any server. Supported formats include JPG, PNG, and WebP. Once an image is selected, it appears on the meme canvas ready for text.",
              enrich: (
                <div className="bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed">
                  <strong>Template tip:</strong> The most versatile meme
                  templates are those where the subject's expression or body
                  language clearly communicates an emotion — approval,
                  disapproval, shock, determination, distress. The stronger the
                  emotional signal in the image, the wider the range of captions
                  you can apply. Templates with ambiguous expressions tend to be
                  less flexible for universal repurposing.
                </div>
              ),
            },
            {
              n: 2,
              title: "Add your top and bottom text",
              body: "Type your top line text and bottom line text in the input fields. Both fields are optional — you can use just a bottom caption, just a top caption, or both. The classic meme format uses ALL CAPS for both lines: a setup or context on top, and a punchline or subversion on the bottom. The text updates live on the canvas as you type so you can see exactly how it looks. Keep text short — 1–8 words per line is the sweet spot for readability and comedic timing.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Caption structure examples:</strong> Top: 'WHEN YOU
                  FINALLY FIX THE BUG' / Bottom: 'BY DELETING ALL THE TESTS'. Or
                  just bottom text for reaction-style memes: 'nobody asked'. Or
                  a single top line for quote-style formats. The tool supports
                  all configurations — experiment with the placement that works
                  best for your image and joke.
                </div>
              ),
            },
            {
              n: 3,
              title: "Customise font size, colour, and style",
              body: "Adjust the font size slider to make text larger or smaller relative to the image — larger text is bolder and more impactful; smaller text is subtler. Change the text colour from white (classic) to any colour that works with your image background. The stroke (outline) width slider controls the thickness of the black border around the text — a thicker stroke improves readability on busy or light backgrounds. All changes update the canvas preview in real time.",
              enrich: (
                <div className="bg-yellow-50 rounded-xl px-5 py-4 text-sm text-yellow-800 leading-relaxed">
                  <strong>Readability tip:</strong> White text with a thick
                  black stroke (classic Impact style) is readable over any
                  background colour — this is why it became the standard. If you
                  switch to a darker text colour, the black stroke may not
                  provide enough contrast on dark backgrounds; in that case, use
                  a white or yellow stroke instead, or pick a text colour with
                  high contrast against your image's dominant background.
                </div>
              ),
            },
            {
              n: 4,
              title: "Preview and download",
              body: "The canvas shows a live preview of your meme as you make changes. When you're happy with the result, click the download button to save the meme as a PNG file. PNG is used because it preserves the sharp edges of text without the blurring artefacts that JPEG compression can cause around high-contrast text on images. The downloaded file is ready to share on social media, messaging apps, or anywhere else.",
              enrich: (
                <div className="bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>Sharing tip:</strong> Most social media platforms
                  re-compress images on upload, so starting with a high-quality
                  PNG gives the best final result after platform compression.
                  For WhatsApp, send as a 'Document' rather than a photo to
                  prevent quality reduction. For Twitter/X, PNG files under 5 MB
                  are displayed without visible compression for most users.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 text-white font-black text-lg flex items-center justify-center">
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
              emoji: "😂",
              title: "Social media posts",
              desc: "Create shareable memes for Twitter/X, Facebook, Instagram, and Reddit — instant engagement bait for your followers.",
            },
            {
              emoji: "💬",
              title: "Group chats",
              desc: "Make personalised memes for your friend group, referencing inside jokes or shared experiences that land harder than generic templates.",
            },
            {
              emoji: "🏢",
              title: "Office humour",
              desc: "Generate workplace-appropriate memes for team Slack channels, internal newsletters, or company all-hands presentations.",
            },
            {
              emoji: "🎓",
              title: "Educational content",
              desc: "Use memes to explain concepts in a more engaging and memorable way — students respond well to information delivered via humour.",
            },
            {
              emoji: "📣",
              title: "Marketing and community",
              desc: "Brands and community managers use relatable meme content to drive engagement — high virality potential with minimal production cost.",
            },
            {
              emoji: "🎁",
              title: "Personalised gifts and cards",
              desc: "Create a custom meme using a photo of the recipient for a birthday card, congratulations message, or personalised joke gift.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-yellow-200 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 text-white text-center mb-14">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-xl font-bold mb-3">
            Your images never leave your device — memes are created entirely in
            your browser
          </h3>
          <p className="text-yellow-100 leading-relaxed max-w-xl mx-auto text-sm">
            Unlike many online meme generators that upload your photos to a
            remote server for processing (and potentially store them), this tool
            uses the HTML5 Canvas API to compose your meme entirely locally. No
            files are transmitted or logged. This means you can safely use
            personal photos, private jokes, or confidential content without
            worrying about where your images end up. The tool also works offline
            once loaded and has no file size limits beyond your browser's
            available memory.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Related Free Fun Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                href: "/tools/random-name-generator",
                label: "Random Name Generator",
                desc: "Generate random names for characters, businesses, babies, or usernames.",
              },
              {
                href: "/tools/dice-roller",
                label: "Dice Roller",
                desc: "Roll virtual dice for board games, RPGs, and tabletop games — multiple dice types supported.",
              },
              {
                href: "/tools/lorem-ipsum-generator",
                label: "Lorem Ipsum Generator",
                desc: "Generate placeholder lorem ipsum text in paragraphs, sentences, or words for design mockups.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-yellow-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
