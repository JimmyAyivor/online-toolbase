"use client";
// src/app/tools/meta-tag-generator/PageEditorial.tsx
import React, { useState, useEffect, useRef } from "react";
import AdSlot from "@/components/AdSlot";

const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";
const TOOL_URL = "https://onlinetoolbase.com/tools/meta-tag-generator";
const TOOL_NAME = "Meta Tag Generator";

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
        <div className='inline-block rounded-2xl overflow-hidden border-4 border-teal-100 shadow-inner mb-5'>
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
    "Free meta tag generator — create SEO meta tags, Open Graph tags, and Twitter Cards with a live social share preview, no signup",
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
                <span className='text-teal-600'>✓ Copied!</span>
              ) : (
                "Copy link"
              )}
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className='hidden sm:block px-3 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-semibold hover:-translate-y-0.5 transition-all'
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
    q: "What are meta tags and why do they matter for SEO?",
    a: "Meta tags are snippets of HTML code placed inside the <head> section of a web page. They provide structured information about the page to search engines and social media platforms. The most important meta tags for SEO are the title tag and meta description: the title tag is displayed as the clickable headline in search results and browser tabs, and the meta description is the short summary paragraph shown below the title in search results. While meta descriptions are not a direct ranking factor, they influence click-through rate — a well-written description that matches the user's search intent can significantly increase the percentage of people who click on your result. Title tags do influence rankings, particularly when they contain the primary keyword near the beginning. Getting both right is one of the most cost-effective on-page SEO improvements you can make.",
  },
  {
    q: "What is the difference between Open Graph tags and Twitter Card tags?",
    a: "Open Graph (OG) tags were created by Facebook and are now used by most social platforms — including LinkedIn, WhatsApp, Slack, Discord, and iMessage — to generate rich link previews when a URL is shared. Twitter Cards are Twitter's own format for rich link previews within tweets. The two systems overlap significantly: og:title, og:description, og:image, and og:url cover the core data needed by most platforms, while Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image) are specifically for Twitter. Twitter will fall back to Open Graph tags if Twitter Card tags are absent, but including both ensures optimal display on all platforms. This generator produces both sets of tags simultaneously so you don't need to manage them separately.",
  },
  {
    q: "What is the ideal length for a meta title and meta description?",
    a: "Google displays approximately 50–60 characters for a page title in search results before truncating with an ellipsis. Some titles up to 70 characters may display fully depending on the character widths used. Keep titles under 60 characters to avoid truncation. For meta descriptions, Google typically displays 155–160 characters in desktop search results and around 120 characters on mobile. Descriptions up to 160 characters are safe; anything longer is likely to be cut off at a word boundary. Note that Google may rewrite both the title and description in search results if it determines that your tags don't accurately represent the page content — this is most common when the title appears keyword-stuffed or the description is too vague.",
  },
  {
    q: "What size should the Open Graph image be?",
    a: "The recommended Open Graph image size is 1200 × 630 pixels with a 1.91:1 aspect ratio. This size is optimised for full-width display in Facebook, LinkedIn, Twitter, and Slack link previews. The image file should ideally be under 8MB for Facebook compatibility, though smaller files (under 1MB as a JPEG or WebP) load faster and are less likely to be cached poorly by social platforms. Twitter's large card format (summary_large_image) uses a 2:1 aspect ratio — a 1200 × 600 image works well across both formats. Always use an absolute URL (starting with https://) for the og:image value, not a relative path. After adding your meta tags, use Facebook's Sharing Debugger or Twitter's Card Validator to test how the preview actually appears and force a cache refresh if needed.",
  },
  {
    q: "What does the robots meta tag do?",
    a: "The robots meta tag tells search engine crawlers how to handle the page. The most common values are: index (allow the page to be included in search results — the default), noindex (exclude the page from search results), follow (allow crawlers to follow links on the page — the default), and nofollow (don't pass link equity through links on this page). You can combine these: index, follow is the default for all pages and doesn't need to be specified explicitly. noindex, follow tells Google not to show the page in results but still follow its links. noindex, nofollow is the strongest exclusion — used for pages like admin panels, checkout flows, or duplicate content that should be completely invisible to search engines.",
  },
  {
    q: "Should I add a canonical URL meta tag?",
    a: "The canonical tag (<link rel='canonical'>) is technically not a meta tag but a link element — it tells search engines which URL is the 'master' version of a page when duplicate or near-duplicate content exists at multiple URLs. Common situations that need a canonical: the same page accessible at both www and non-www versions, pages with and without trailing slashes, pages with URL parameters (like ?sort=price or ?utm_source=newsletter), and paginated content. If you have only one URL for each unique page and no URL parameter issues, canonicals are less critical — but it's still good practice to include a self-referential canonical on every page to prevent problems as your site grows.",
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
              <span className='text-teal-600 text-lg shrink-0'>
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
          How to Use the Meta Tag Generator
        </h2>
        <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
          Fill in your page details, select which tag groups to include, then
          copy the generated HTML into your page's &lt;head&gt; section.
        </p>

        <div className='space-y-6 mb-14'>
          {[
            {
              n: 1,
              title: "Fill in your basic page information",
              body: "Start with the Basic SEO section: enter your page title (under 60 characters for search results), meta description (under 160 characters), and the canonical URL. The title appears in browser tabs and as the clickable headline in search results — include your primary keyword near the beginning. The description is the short summary below your title in search results and influences click-through rate even though it's not a direct ranking signal.",
              enrich: (
                <div className='overflow-x-auto rounded-xl border border-gray-100 text-sm'>
                  <table className='w-full text-left'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Tag
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Recommended length
                        </th>
                        <th className='px-4 py-2 text-xs font-bold text-gray-500 uppercase'>
                          Purpose
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                      {[
                        [
                          "Title",
                          "50–60 characters",
                          "Browser tab, search result headline",
                        ],
                        [
                          "Description",
                          "120–160 characters",
                          "Search result summary, click-through",
                        ],
                        [
                          "Keywords",
                          "Optional",
                          "Largely ignored by Google, used by Bing",
                        ],
                        [
                          "Canonical URL",
                          "Full https:// URL",
                          "Prevents duplicate content issues",
                        ],
                        [
                          "Author",
                          "Name or organisation",
                          "Byline, used by some scrapers",
                        ],
                      ].map(([tag, len, p]) => (
                        <tr key={tag} className='hover:bg-teal-50'>
                          <td className='px-4 py-2 font-bold text-teal-700 text-xs'>
                            {tag}
                          </td>
                          <td className='px-4 py-2 text-gray-600 text-xs font-mono'>
                            {len}
                          </td>
                          <td className='px-4 py-2 text-gray-500 text-xs'>
                            {p}
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
              title: "Configure Open Graph and social sharing tags",
              body: "Open the Open Graph section to add social sharing metadata. These tags control how your page appears when shared on Facebook, LinkedIn, WhatsApp, Slack, and iMessage. Enter the OG title (can differ from the SEO title — social titles can be longer and more descriptive), OG description, and the full URL of your 1200 × 630 social sharing image. Include og:type (website for homepages, article for blog posts) and og:site_name for branded previews.",
              enrich: (
                <div className='bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed'>
                  <strong>Social image tip:</strong> Use a 1200 × 630px image
                  (1.91:1 ratio) with your page title overlaid as large,
                  readable text. Avoid placing important content in the outer 5%
                  of the image — some platforms crop the edges. Use a
                  high-contrast colour scheme so the preview thumbnail looks
                  good at small sizes. After deploying, use{" "}
                  <a
                    href='https://developers.facebook.com/tools/debug/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                  >
                    Facebook's Sharing Debugger
                  </a>{" "}
                  to force a cache refresh and verify the preview.
                </div>
              ),
            },
            {
              n: 3,
              title: "Add Twitter Card tags",
              body: "Open the Twitter Cards section to configure how your page appears in tweets and on Twitter's link preview. Choose summary_large_image for pages with a strong hero image (shows a large banner preview below the tweet) or summary for text-focused pages (shows a small thumbnail). Enter your Twitter @handle in the site and creator fields — these enable Twitter Analytics attribution and appear in the card.",
              enrich: (
                <div className='bg-cyan-50 rounded-xl px-5 py-4 text-sm text-cyan-800 leading-relaxed'>
                  <strong>Twitter card types:</strong>{" "}
                  <strong>summary_large_image</strong> — large banner image
                  below the tweet, best for articles and product pages with
                  strong visuals. <strong>summary</strong> — small square
                  thumbnail with title and description to the right, better for
                  podcasts, text content, or small logos. Twitter will fall back
                  to Open Graph tags if Twitter Card tags are missing, but
                  explicit Twitter tags give you more control over the exact
                  appearance.
                </div>
              ),
            },
            {
              n: 4,
              title: "Copy the generated HTML and add to your page",
              body: "Click the Copy HTML button in the Generated Code panel to copy the complete <head> meta tag block to your clipboard. Paste the tags inside the <head>...</head> section of your HTML — before the closing </head> tag. In Next.js, use the metadata export or Head component. In WordPress, use the Yoast SEO or Rank Math plugin, or a child theme functions.php file. In Webflow or Squarespace, use the Custom Code section in page settings.",
              enrich: (
                <div className='bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed'>
                  <strong>Framework placement guide:</strong> Next.js App
                  Router: export the{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    metadata
                  </code>{" "}
                  object from your page.tsx. Next.js Pages: use{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    next/head
                  </code>
                  . React (plain): use{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    react-helmet
                  </code>{" "}
                  or{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    react-helmet-async
                  </code>
                  . Vue/Nuxt: use{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    useHead()
                  </code>
                  . Gatsby: use{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    gatsby-plugin-react-helmet
                  </code>
                  . Static HTML: paste directly into{" "}
                  <code className='bg-white px-1 rounded font-mono'>
                    &lt;head&gt;
                  </code>
                  .
                </div>
              ),
            },
            {
              n: 5,
              title: "Preview and validate your tags",
              body: "Use the Preview section in the tool to see how your page title and description will appear in Google search results, and how the Open Graph image and title will look in a social share card. After deploying your page with the new tags, validate the actual output using Google Search Console's URL Inspection tool (for SEO tags), Facebook's Sharing Debugger (for Open Graph), and Twitter's Card Validator. These tools show what the crawlers actually see and let you force a cache refresh so previews update immediately.",
              enrich: (
                <div className='bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed'>
                  <strong>Validation tools:</strong>{" "}
                  <a
                    href='https://search.google.com/search-console/inspect'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline font-semibold'
                  >
                    Google Search Console
                  </a>{" "}
                  — URL inspection, index coverage, crawl errors.{" "}
                  <a
                    href='https://developers.facebook.com/tools/debug/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline font-semibold'
                  >
                    Facebook Debugger
                  </a>{" "}
                  — Open Graph preview, cache scrape.{" "}
                  <a
                    href='https://cards-dev.twitter.com/validator'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline font-semibold'
                  >
                    Twitter Card Validator
                  </a>{" "}
                  — Twitter Card preview.{" "}
                  <a
                    href='https://www.linkedin.com/post-inspector/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline font-semibold'
                  >
                    LinkedIn Post Inspector
                  </a>{" "}
                  — LinkedIn share preview.
                </div>
              ),
            },
          ].map(({ n, title, body, enrich }) => (
            <div
              key={n}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'
            >
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white font-black text-lg flex items-center justify-center'>
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
              emoji: "🔍",
              title: "Improving search CTR",
              desc: "Optimise title and description tags to improve click-through rate from search results — even without ranking higher.",
            },
            {
              emoji: "📘",
              title: "Facebook & LinkedIn previews",
              desc: "Generate Open Graph tags to control exactly how your page appears when shared on Facebook, LinkedIn, and WhatsApp.",
            },
            {
              emoji: "🐦",
              title: "Twitter rich cards",
              desc: "Add Twitter Card tags to show large image previews in tweets instead of plain link text.",
            },
            {
              emoji: "🏗️",
              title: "New website launches",
              desc: "Generate a complete meta tag template when launching a new site — covers all major platforms in one step.",
            },
            {
              emoji: "📰",
              title: "Blog and article pages",
              desc: "Create per-article Open Graph and Twitter tags that display the article's hero image and a compelling headline when shared.",
            },
            {
              emoji: "🛒",
              title: "E-commerce product pages",
              desc: "Generate product page meta tags with product images, descriptions, and prices for social sharing and search visibility.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-teal-200 hover:-translate-y-1 transition-all duration-200'
            >
              <div className='text-2xl mb-3'>{emoji}</div>
              <p className='font-bold text-gray-900 text-sm mb-2'>{title}</p>
              <p className='text-xs text-gray-500 leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        <div className='bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 text-white text-center mb-14'>
          <div className='text-3xl mb-3'>🏷️</div>
          <h3 className='text-xl font-bold mb-3'>
            Well-written meta tags can improve CTR by 5–10% without any ranking
            change
          </h3>
          <p className='text-teal-100 leading-relaxed max-w-xl mx-auto text-sm'>
            Many pages that rank on the first page of Google still have generic
            or auto-generated title tags and meta descriptions. A clear,
            keyword-relevant title and a compelling description that directly
            answers the searcher's intent can meaningfully increase clicks from
            the same position. Higher CTR also sends positive engagement signals
            back to Google, creating a compounding benefit over time. Meta tag
            optimisation is one of the lowest-effort, highest-leverage SEO
            improvements available.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Related Free Developer Tools
          </h3>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[
              {
                href: "/tools/open-graph-preview",
                label: "Open Graph Preview",
                desc: "Preview exactly how your page will look when shared on Facebook, Twitter, and LinkedIn.",
              },
              {
                href: "/tools/keyword-density-checker",
                label: "Keyword Density Checker",
                desc: "Analyse keyword frequency and density in any text — useful for on-page SEO optimisation.",
              },
              {
                href: "/tools/robots-txt-generator",
                label: "Robots.txt Generator",
                desc: "Generate a robots.txt file to control which pages search engines can crawl and index.",
              },
            ].map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className='block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-teal-200 hover:-translate-y-1 transition-all duration-200 p-5'
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
