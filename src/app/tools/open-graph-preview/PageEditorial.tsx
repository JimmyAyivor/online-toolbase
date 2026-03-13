"use client";
// src/app/tools/open-graph-preview/PageEditorial.tsx

import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

const TOOL_URL = "https://onlinetoolbase.com/tools/open-graph-preview";
const TOOL_NAME = "Open Graph Preview";

function QRModal({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) => {
      if (cancelled || !canvasRef.current) return;
      QRCode.toCanvas(canvasRef.current, TOOL_URL, {
        width: 220,
        margin: 2,
        color: { dark: "#1e3a5f", light: "#f0f7ff" },
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
          className='absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors'
          aria-label='Close QR code modal'
        >
          ✕
        </button>
        <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            className='w-6 h-6 text-white'
            stroke='currentColor'
            strokeWidth={2}
          >
            <rect x='3' y='3' width='7' height='7' rx='1' />
            <rect x='14' y='3' width='7' height='7' rx='1' />
            <rect x='3' y='14' width='7' height='7' rx='1' />
            <rect x='14' y='14' width='3' height='3' rx='0.5' />
            <rect x='18' y='14' width='3' height='3' rx='0.5' />
            <rect x='14' y='18' width='3' height='3' rx='0.5' />
            <rect x='18' y='18' width='3' height='3' rx='0.5' />
          </svg>
        </div>
        <h3 className='text-lg font-black text-gray-900 mb-1'>
          Take it with you
        </h3>
        <p className='text-sm text-gray-400 mb-5 leading-relaxed'>
          Scan with your phone camera to open the {TOOL_NAME} on mobile
        </p>
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-blue-100 shadow-inner mb-5'>
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
    "Free open graph preview tool — see exactly how your page looks when shared on Twitter, Facebook, and LinkedIn",
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
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#004182]",
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      bg: "bg-[#1877F2] hover:bg-[#0c5ab9]",
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
      icon: (
        <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
        </svg>
      ),
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
              Share the tool or scan to open it on your phone
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {SHARES.map(({ label, href, bg, icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Share on ${label}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${bg}`}
              >
                {icon}
                {label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className='inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-all'
            >
              {copied ? (
                <>
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-3.5 h-3.5 text-green-600'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-green-600'>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-3.5 h-3.5'
                  >
                    <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
                    <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z' />
                  </svg>
                  Copy link
                </>
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5'
              aria-label='Open QR code'
            >
              <svg
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-3.5 h-3.5'
              >
                <path
                  fillRule='evenodd'
                  d='M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z'
                  clipRule='evenodd'
                />
                <path d='M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z' />
              </svg>
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
    q: "What are Open Graph meta tags?",
    a: "Open Graph (OG) tags are HTML meta elements that control how your webpage appears when shared on social platforms. Defined by Facebook in 2010 and since adopted by Twitter, LinkedIn, Slack, iMessage, and most messaging apps, they specify which title, description, and image the platform should display in a link preview card. Without them, platforms make their best guess from your page content — often with poor results.",
  },
  {
    q: "Why does my image not show in the preview?",
    a: "The image must be publicly accessible via a full HTTPS URL — it cannot be a local file path or a localhost URL. Social crawlers fetch the image from their servers, so it must be reachable on the public internet. Additionally, ensure your server doesn't block bots with robots.txt or rate limiting. If your image URL is correct and accessible but still not showing, try a CDN-hosted or direct image URL.",
  },
  {
    q: "What image size should I use for Open Graph?",
    a: "The widely recommended size is 1200 × 630 pixels at a 1.91:1 aspect ratio. This displays correctly on Facebook, LinkedIn, and as a large Twitter card. For the Twitter 'summary' card type, the image is shown as a square thumbnail, cropped from the centre. Always use a high-resolution image and avoid putting critical text near the edges, as some platforms crop differently.",
  },
  {
    q: "What is the difference between summary and summary_large_image on Twitter?",
    a: "The summary card shows a small square thumbnail alongside the title and description, suitable for pages without a strong hero image. The summary_large_image card displays a large banner image above the title and description, which is much more eye-catching in a tweet feed. Use summary_large_image for articles, product pages, or any page with a high-quality 1200×630 image.",
  },
  {
    q: "After adding OG tags, why does the old preview still show on social platforms?",
    a: "Social platforms cache link previews aggressively, sometimes for days. After updating your OG tags and deploying, you need to clear the cache using each platform's debug tool: Facebook's Sharing Debugger, Twitter's Card Validator, or LinkedIn's Post Inspector. Paste your URL into the tool and click the option to scrape/re-fetch — the platform will pull the latest version of your page and update the cached preview.",
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
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className='border border-gray-100 rounded-xl overflow-hidden'
          >
            <button
              className='w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors'
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className='font-semibold text-gray-900 text-sm'>
                {faq.q}
              </span>
              <span className='text-indigo-600 text-lg shrink-0'>
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className='px-5 pb-5 text-sm text-gray-600 leading-relaxed'>
                {faq.a}
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
        aria-labelledby='how-to-use-heading'
      >
        <h2
          id='how-to-use-heading'
          className='text-4xl font-bold text-gray-900 mb-4 text-center'
        >
          How to Use the Open Graph Preview Tool
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Fill in your page details, preview the share card across Twitter,
          Facebook, and LinkedIn, then copy the generated meta tags straight
          into your HTML head — no guesswork required.
        </p>

        <div className='space-y-6 mb-14'>
          {/* Step 1 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              1
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Enter your page title and description
              </h3>
              <p className='text-gray-600 leading-relaxed mb-3'>
                Type your page title and description into the fields on the
                left. The title counter turns amber when you exceed 70
                characters — Twitter truncates titles beyond that length in link
                cards. Descriptions are less strictly limited but keeping them
                under 200 characters ensures they're never cut off.
              </p>
              <div className='space-y-2'>
                {[
                  {
                    label: "Title limit",
                    value: "70 chars",
                    note: "Twitter's recommended maximum — longer titles are truncated in feed cards",
                  },
                  {
                    label: "Description limit",
                    value: "200 chars",
                    note: "Facebook and LinkedIn show up to 200 characters; Twitter shows around 120",
                  },
                  {
                    label: "Image size",
                    value: "1200×630 px",
                    note: "The universal recommended OG image size across all major platforms",
                  },
                ].map(({ label, value, note }) => (
                  <div
                    key={label}
                    className='flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3'
                  >
                    <code className='bg-white border border-gray-200 rounded px-2 py-0.5 font-mono text-blue-600 text-xs flex-shrink-0'>
                      {value}
                    </code>
                    <div>
                      <p className='font-semibold text-gray-900 mb-0.5'>
                        {label}
                      </p>
                      <p className='text-gray-500 leading-relaxed'>{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              2
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Add your image URL and site details
              </h3>
              <p className='text-gray-600 leading-relaxed mb-3'>
                Enter the full HTTPS URL of your OG image — it must be publicly
                accessible, not a local file. Add your page URL and site name to
                complete the card. The image preview renders live inside the
                tool using the URL you provide, so you can immediately see how
                it looks at the correct aspect ratio.
              </p>
              <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                <strong>No image yet?</strong> You can still preview the text
                layout. Social platforms will fall back to a text-only card or
                use a small thumbnail from your page if no og:image is set. For
                the best click-through rates, always include a compelling
                1200×630 image.
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              3
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Switch between platform previews
              </h3>
              <p className='text-gray-600 leading-relaxed mb-4'>
                Click the <strong>X / Twitter</strong>,{" "}
                <strong>Facebook</strong>, or <strong>LinkedIn</strong> tabs to
                see how your card will look on each platform. Each renders
                slightly differently — Facebook uses a muted grey strip below
                the image, LinkedIn shows the site name in small caps, and
                Twitter's card layout varies based on the card type you choose.
              </p>
              <div className='overflow-x-auto rounded-xl border border-gray-100'>
                <table className='w-full text-sm'>
                  <thead className='bg-gray-50 border-b border-gray-100'>
                    <tr>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>
                        Platform
                      </th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>
                        Image aspect ratio
                      </th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>
                        Title max
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-50'>
                    {[
                      {
                        p: "Twitter (large)",
                        ratio: "1200×630  (1.91:1)",
                        max: "~70 chars",
                      },
                      {
                        p: "Twitter (summary)",
                        ratio: "Square crop of og:image",
                        max: "~70 chars",
                      },
                      {
                        p: "Facebook",
                        ratio: "1200×630  (1.91:1)",
                        max: "~80 chars",
                      },
                      {
                        p: "LinkedIn",
                        ratio: "1200×627  (≈1.91:1)",
                        max: "~70 chars",
                      },
                    ].map(({ p, ratio, max }) => (
                      <tr
                        key={p}
                        className='hover:bg-blue-50 transition-colors'
                      >
                        <td className='px-4 py-2.5 font-medium text-gray-900 text-xs'>
                          {p}
                        </td>
                        <td className='px-4 py-2.5 font-mono text-blue-600 text-xs'>
                          {ratio}
                        </td>
                        <td className='px-4 py-2.5 text-gray-400 text-xs'>
                          {max}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
            <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
              4
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                Copy the meta tags and add them to your page
              </h3>
              <p className='text-gray-600 leading-relaxed mb-3'>
                The generated meta tag block appears in a dark code panel at the
                bottom. Click <strong>Copy all</strong> and paste the block
                inside the{" "}
                <code className='bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs'>
                  &lt;head&gt;
                </code>{" "}
                of your HTML. The tags cover both Open Graph (og:) and Twitter
                (twitter:) namespaces, so a single paste covers both platforms.
              </p>
              <div className='bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed'>
                <strong>After deploying:</strong> Visit Facebook's Sharing
                Debugger, Twitter's Card Validator, or LinkedIn's Post
                Inspector, paste your URL, and click "Scrape Again" or
                "Re-inspect" to force each platform to re-fetch your page and
                clear its cached preview.
              </div>
            </div>
          </div>
        </div>

        <FAQSection />

        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6'>
          <h3 className='text-xl font-bold text-gray-900 mb-4'>
            How Open Graph tags work
          </h3>
          <p className='text-gray-600 leading-relaxed mb-5 text-sm'>
            When someone pastes a URL into a social platform, the platform's
            crawler fetches the page and reads its &lt;meta&gt; tags. The og:
            namespace tags take priority. Here are the four essential tags every
            page should have:
          </p>
          <div className='space-y-4'>
            {[
              {
                label: "og:title",
                formula:
                  '<meta property="og:title" content="Your Title Here" />',
                vars: "Controls the bold headline shown in every link card",
              },
              {
                label: "og:description",
                formula:
                  '<meta property="og:description" content="Your description…" />',
                vars: "The supporting text below the title — keep it compelling and under 200 chars",
              },
              {
                label: "og:image",
                formula:
                  '<meta property="og:image" content="https://…/og.jpg" />',
                vars: "The preview image — must be a public HTTPS URL, 1200×630 px recommended",
              },
              {
                label: "og:url",
                formula:
                  '<meta property="og:url" content="https://example.com/page" />',
                vars: "The canonical URL — prevents issues when the page is shared from different paths",
              },
            ].map(({ label, formula, vars }) => (
              <div
                key={label}
                className='bg-gray-50 rounded-xl border border-gray-100 px-5 py-4'
              >
                <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>
                  {label}
                </p>
                <code className='text-sm font-mono font-bold text-blue-700 block mb-1'>
                  {formula}
                </code>
                <p className='text-xs text-gray-400'>{vars}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className='text-2xl font-bold text-gray-900 mb-6'>
          When OG tags make the biggest difference
        </h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14'>
          {[
            {
              emoji: "📰",
              title: "Blog articles and news posts",
              desc: "A well-crafted OG image with the article title overlaid on a strong visual can double click-through rates compared to a plain text link preview.",
            },
            {
              emoji: "🛍️",
              title: "Product and landing pages",
              desc: "Sharing a product page on social media without OG tags often shows a random image from the page. Setting og:image ensures the hero product photo is always shown.",
            },
            {
              emoji: "🎙️",
              title: "Podcast and video episodes",
              desc: "Episode pages shared on Twitter and LinkedIn benefit enormously from eye-catching episode artwork as the og:image, which makes the card stand out in a scrolling feed.",
            },
            {
              emoji: "📊",
              title: "Report and research pages",
              desc: "Data reports shared in professional communities on LinkedIn get far more engagement when the card shows a clean, branded cover image rather than a generic website screenshot.",
            },
            {
              emoji: "📅",
              title: "Event pages",
              desc: "Event pages shared on WhatsApp and Facebook need a clear image showing the event name, date, and branding so recipients immediately understand what the link is about without clicking.",
            },
            {
              emoji: "🔗",
              title: "Link-in-bio and profile pages",
              desc: "Creators sharing portfolio or profile pages benefit from OG images that act as a visual business card — showing a headshot, name, and tagline that make the link instantly recognisable.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>🔒</div>
          <h3 className='text-xl font-bold mb-3'>
            All data stays in your browser
          </h3>
          <p className='text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Your page title, description, image URLs, and generated tags are
            never sent to any server. Everything is processed locally in your
            browser. Safe to use for internal tools, pre-launch pages, and
            confidential campaigns.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Developer Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/robots-txt-generator",
                label: "Robots.txt Generator",
                desc: "Generate a valid robots.txt file to control how search engine crawlers access your site.",
              },
              {
                href: "/tools/html-minifier",
                label: "HTML Minifier",
                desc: "Minify HTML to reduce file size and improve page load performance.",
              },
              {
                href: "/tools/json-to-csv-converter",
                label: "JSON to CSV Converter",
                desc: "Convert JSON arrays to CSV for spreadsheets and data import workflows.",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-5'
                aria-label={`${link.label} — ${link.desc}`}
              >
                <div className='font-bold text-gray-900 text-sm mb-1'>
                  {link.label}
                </div>
                <div className='text-xs text-gray-500'>{link.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
