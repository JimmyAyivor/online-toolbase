// src/app/tools/background-remover/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const BackgroundRemoverClient = dynamic(
  () => import("./BackgroundRemoverClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "background-remover");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Background Remover — Free Online Background Remover",
  description:
    "Remove image backgrounds automatically with AI-powered precision. Free, instant, no signup required.",
  keywords:
    "background remover, free background remover, online background remover, background remover free, background remover online, image tool, free online background remover, best background remover",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/background-remover` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/background-remover`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Background Remover — Free Online Background Remover",
    description:
      "Remove image backgrounds automatically with AI-powered precision. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Background Remover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Background Remover — Free Online Background Remover",
    description:
      "Remove image backgrounds automatically with AI-powered precision.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Background Remover",
  description:
    "Remove image backgrounds automatically with AI-powered precision.",
  url: `${SITE_URL}/tools/background-remover`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Image Tools",
      item: `${SITE_URL}/tools/category/image`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Background Remover",
      item: `${SITE_URL}/tools/background-remover`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Background Remover free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Background Remover is completely free. No signup, no download, and no payment is required. It runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Background Remover work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Background Remover is fully responsive and works on smartphones, tablets, and desktop computers without any app installation.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private when using the Background Remover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All calculations are performed locally in your browser. No data is sent to any server or stored anywhere.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Background Remover",
  description:
    "Step-by-step guide to using the free Background Remover on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Background Remover on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Background Remover provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function BackgroundRemoverPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <a
              href="/tools/category/image-design-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Image Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Background Remover
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Image Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Background Remover — Free Online Background Remover
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Remove image backgrounds automatically with AI-powered precision.
          Free, instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout tool={tool}>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="Background Remover tool">
          <BackgroundRemoverClient />
        </main>

        {/* ── Zone G: below tool result — highest value placement ──────── */}
        {/* Sits immediately after the tool, before any editorial content   */}
        <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-center">
          {/* desktop: rectangle 336×280; mobile: medium rectangle 300×250 */}
          <div className="hidden sm:block">
            <AdSlot variant="rectangle" slotId={SLOT_BELOW_TOOL} />
          </div>
          <div className="block sm:hidden">
            <AdSlot variant="mediumrectangle" slotId={SLOT_BELOW_TOOL} />
          </div>
        </div>

        {/* ── Zone H: between tool + How To editorial ──────────────────── */}
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

        {/* ── Editorial: How To + Related Tools ────────────────────────── */}
        {/* ── HOW TO USE ─────────────────────────────────────────────────────────── */}
        <section
          id="how-to-use"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          aria-labelledby="how-to-use-heading"
        >
          <h2
            id="how-to-use-heading"
            className="text-4xl font-bold text-gray-900 mb-4 text-center"
          >
            How to Use the Background Remover
          </h2>
          <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Upload an image, get a clean cut-out in seconds, then choose a
            transparent background or swap in a solid colour — all without
            leaving your browser.
          </p>

          {/* ── Steps ── */}
          <div className="space-y-6 mb-14">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-600 text-white font-black text-lg flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Upload your image
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Click anywhere in the upload zone or drag and drop a file
                  directly onto it. The tool accepts{" "}
                  <strong>JPG, PNG, and WebP</strong> files up to 10 MB. As soon
                  as a valid image is selected, processing starts automatically
                  — there's no separate button to press.
                </p>
                <div className="bg-fuchsia-50 rounded-xl px-5 py-4 text-sm text-fuchsia-900 leading-relaxed">
                  <strong>For best results, choose images where:</strong>
                  <ul className="mt-2 space-y-1 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500 mt-0.5">✓</span>
                      The subject is clearly separate from the background — a
                      person against a plain wall, a product on a white surface,
                      a logo on a solid colour.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-fuchsia-500 mt-0.5">✓</span>
                      The background is relatively uniform — white, light grey,
                      or a single solid colour removes most cleanly.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">✗</span>
                      Avoid images where the subject colour is very similar to
                      the background (e.g. a white shirt against a white wall) —
                      the detection algorithm may over-remove in these cases.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-600 text-white font-black text-lg flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Review the processed result
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Once processing completes, your image appears on a{" "}
                  <strong>checkerboard background</strong> — the grey-and-white
                  pattern is a standard indicator for transparency. Transparent
                  areas show the pattern; solid areas show your subject.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Use the <strong>Show Original / Show Result</strong> toggle in
                  the toolbar to switch between the unprocessed upload and the
                  cut-out. This lets you compare the two and check whether any
                  parts of the subject were incorrectly removed.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>If the result looks wrong</strong> — too much removed,
                  or background left in — click <em>New Image</em> to start over
                  with a different version of the photo. Cropping or adjusting
                  the contrast of the original image before uploading often
                  improves detection accuracy significantly.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-600 text-white font-black text-lg flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Choose a background
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The <strong>Background</strong> panel on the right side of the
                  result view gives you two options:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{
                          backgroundImage:
                            "repeating-conic-gradient(#d1d5db 0% 25%, white 0% 50%)",
                          backgroundSize: "8px 8px",
                        }}
                      />
                      <p className="text-sm font-bold text-gray-900">
                        Transparent
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Keeps the background fully transparent. Download as PNG
                      and the transparency is preserved — ready to place over
                      any background in design tools, presentations, or
                      websites.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded border border-gray-300 bg-white" />
                      <p className="text-sm font-bold text-gray-900">
                        Solid Colour
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Fills the removed background with a flat colour. Use the
                      colour picker or type a hex code directly. The preview
                      updates immediately — no apply button needed. Use this
                      when you need a specific brand colour, white for
                      e-commerce, or black for a dramatic effect.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  The <strong>Quick Colours</strong> grid below the radio
                  buttons gives one-click access to eight common colours —
                  white, black, and six accent colours. Clicking any swatch
                  automatically switches to Solid Colour mode and applies it
                  instantly.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-600 text-white font-black text-lg flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Download your image
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Click <strong>Download</strong> to save your processed image.
                  The file is always saved as a <strong>PNG</strong> — the only
                  common web format that supports full transparency. The
                  filename is prefixed with{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-fuchsia-700">
                    no-bg-
                  </code>{" "}
                  followed by your original filename so you can identify it
                  easily.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      format: "PNG with transparent background",
                      use: "Design tools (Figma, Photoshop, Canva), website assets, presentations. The transparency carries over wherever you paste or import it.",
                    },
                    {
                      format: "PNG with solid colour background",
                      use: "E-commerce listings (white background required by Amazon, Etsy, etc.), social media posts, printed materials where transparency isn't supported.",
                    },
                  ].map(({ format, use }) => (
                    <div
                      key={format}
                      className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <span className="text-fuchsia-500 mt-0.5 flex-shrink-0">
                        ↓
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">
                          {format}
                        </p>
                        <p className="text-gray-500 leading-relaxed">{use}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-600 text-white font-black text-lg flex items-center justify-center">
                5
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Start over with a new image
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Click <strong>New Image</strong> (the red button) to clear
                  everything and return to the upload screen. This resets the
                  canvas, clears the processed result, and empties the file
                  input — ready for the next image. There's no limit on how many
                  images you can process in a session.
                </p>
              </div>
            </div>
          </div>

          {/* ── Use cases ── */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What people use it for
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[
              {
                emoji: "🛍️",
                title: "E-commerce product photos",
                desc: "Most marketplaces (Amazon, eBay, Etsy, Shopify) require product images on a white background. Upload your photo, remove the background, set the colour to white, download. Done in under a minute.",
              },
              {
                emoji: "🪪",
                title: "Profile pictures and headshots",
                desc: "Remove a distracting or unprofessional background from a headshot and replace it with a solid colour or keep it transparent for use in design tools.",
              },
              {
                emoji: "🎨",
                title: "Design assets and mockups",
                desc: "Isolate a product, object, or logo from a photo and drop it into a Figma or Canva layout. The transparent PNG slots straight into any composition.",
              },
              {
                emoji: "📢",
                title: "Marketing and ads",
                desc: "Cut out products or people from photos and place them on branded backgrounds for social media ads, banners, and email headers.",
              },
              {
                emoji: "🖨️",
                title: "Print and stickers",
                desc: "Create die-cut sticker artwork, print-on-demand designs, or printed materials by removing the background before sending to a print supplier.",
              },
              {
                emoji: "📊",
                title: "Presentations and documents",
                desc: "Drop a clean cut-out into PowerPoint, Google Slides, or Word without an ugly white box around it. Transparent PNGs float cleanly over any slide background.",
              },
            ].map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="text-2xl mb-3">{emoji}</div>
                <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── How it works ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              How the background detection works
            </h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              The tool analyses each pixel in your image and classifies it as
              either background or subject based on two checks:
            </p>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Brightness threshold
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    Pixels where red, green, and blue values are all above 200
                    (out of 255) are classified as near-white background and
                    made transparent. This handles white and off-white
                    backgrounds effectively.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Colour uniformity check
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    Pixels where the red, green, and blue channels are all
                    within 30 points of each other — meaning a neutral grey
                    shade — are also classified as background. This catches
                    plain grey and similar neutral studio backgrounds.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Alpha channel removal
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    Pixels that pass either check have their alpha (opacity)
                    value set to zero — making them fully transparent.
                    Everything else is left untouched.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
              <strong>Important:</strong> This is a pixel-level algorithm, not
              an AI model. It works well on images with clean, light, or uniform
              backgrounds. For complex backgrounds — outdoor scenes, patterned
              surfaces, or coloured backdrops — results may vary. For
              professional-grade AI removal with edge refinement, tools like
              remove.bg or Adobe Express use dedicated machine learning models
              trained on millions of images.
            </div>
          </div>

          {/* ── Privacy note ── */}
          <div className="bg-gradient-to-br from-fuchsia-600 to-purple-700 rounded-2xl p-8 text-white text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-bold mb-3">
              Your images never leave your device
            </h3>
            <p className="text-fuchsia-100 leading-relaxed max-w-xl mx-auto text-sm">
              All processing happens on the HTML5 Canvas API inside your
              browser. Your image is never uploaded to a server, never stored,
              and never transmitted anywhere. Close the tab and the image is
              gone entirely. This makes the tool safe to use with private,
              confidential, or commercially sensitive images.
            </p>
          </div>
        </section>
        <ToolEngagement
          toolSlug="background-remover"
          toolName="Background Remover"
        />
      </SidebarAdLayout>
    </>
  );
}
