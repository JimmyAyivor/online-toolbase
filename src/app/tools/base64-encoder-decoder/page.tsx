// src/app/tools/base64-encoder-decoder/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const Base64EncoderDecoderClient = dynamic(
  () => import("./Base64EncoderDecoderClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "base64-encoder-decoder");
const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder — Free Online Base64 Encoder/Decoder",
  description:
    "Encode or decode Base64 strings instantly in your browser. Free, instant, no signup required.",
  keywords:
    "base64 encoder/decoder, free base64 encoder/decoder, online base64 encoder/decoder, base64 encoder/decoder free, base64 encoder/decoder online, developer tool, free online base64 encoder/decoder, best base64 encoder/decoder",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/base64-encoder-decoder` },
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
    url: `${SITE_URL}/tools/base64-encoder-decoder`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Base64 Encoder/Decoder — Free Online Base64 Encoder/Decoder",
    description:
      "Encode or decode Base64 strings instantly in your browser. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Base64 Encoder/Decoder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Base64 Encoder/Decoder — Free Online Base64 Encoder/Decoder",
    description: "Encode or decode Base64 strings instantly in your browser.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Base64 Encoder/Decoder",
  description: "Encode or decode Base64 strings instantly in your browser.",
  url: `${SITE_URL}/tools/base64-encoder-decoder`,
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
      name: "Developer Tools",
      item: `${SITE_URL}/tools/category/developer`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Base64 Encoder/Decoder",
      item: `${SITE_URL}/tools/base64-encoder-decoder`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Base64 Encoder/Decoder free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Base64 Encoder/Decoder is completely free. No signup, no download, and no payment is required. It runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Base64 Encoder/Decoder work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Base64 Encoder/Decoder is fully responsive and works on smartphones, tablets, and desktop computers without any app installation.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private when using the Base64 Encoder/Decoder?",
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
  name: "How to Use the Base64 Encoder/Decoder",
  description:
    "Step-by-step guide to using the free Base64 Encoder/Decoder on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Base64 Encoder/Decoder on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Base64 Encoder/Decoder provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function Base64EncoderDecoderPage() {
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
              href="/tools/category/developer-tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Developer Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Base64 Encoder/Decoder
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Developer Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Base64 Encoder/Decoder — Free Online Base64 Encoder/Decoder
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Encode or decode Base64 strings instantly in your browser. Free,
          instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout tool={tool}>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="Base64 Encoder/Decoder tool">
          <Base64EncoderDecoderClient />
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
            How to Use the Base64 Encoder / Decoder
          </h2>
          <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Encode plain text or images to Base64, decode Base64 strings back to
            readable text or viewable images, and swap between modes instantly —
            all in your browser with no upload limit.
          </p>

          {/* ── Steps ── */}
          <div className="space-y-6 mb-14">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Choose Encode or Decode mode
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The two buttons at the top left — <strong>Encode</strong> and{" "}
                  <strong>Decode</strong> — switch the direction of the
                  conversion. The active mode is highlighted in green. Switching
                  modes clears the output but keeps the input text so you can
                  re-run in the other direction without retyping.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: "🔒",
                      label: "Encode",
                      bg: "bg-emerald-50 border-emerald-100",
                      desc: "Takes plain text (or a file) as input and produces a Base64 string as output. Use this when you need to embed data in HTML, JSON, a URL, or an HTTP header.",
                    },
                    {
                      icon: "🔓",
                      label: "Decode",
                      bg: "bg-teal-50 border-teal-100",
                      desc: "Takes a Base64 string as input and produces the original plain text (or image) as output. Use this when you receive encoded data and need to read or use what's inside.",
                    },
                  ].map(({ icon, label, bg, desc }) => (
                    <div
                      key={label}
                      className={`rounded-xl border px-5 py-4 ${bg}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base">{icon}</span>
                        <p className="text-sm font-bold text-gray-900">
                          {label}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Enter text directly or upload a file
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can get data into the tool in three ways:
                </p>
                <div className="space-y-3 mb-4">
                  {[
                    {
                      label: "Type or paste",
                      badge: "bg-gray-100 text-gray-700",
                      desc: "The fastest method for short strings. Paste a Base64 string to decode it, or type plain text to encode it. The output updates live — no button to press.",
                    },
                    {
                      label: "Upload Text",
                      badge: "bg-blue-100 text-blue-700",
                      desc: "Accepts .txt, .json, .xml, and .csv files. The file content is loaded into the input and mode switches to Encode automatically. Useful for encoding structured data files without copy-pasting.",
                    },
                    {
                      label: "Upload Image",
                      badge: "bg-purple-100 text-purple-700",
                      desc: "Accepts JPG, PNG, WebP, GIF, and other image formats. The image is read as a full data URI and a preview appears below the output. The encoded result includes the data URI prefix (e.g. data:image/png;base64,...) ready to paste directly into HTML or CSS.",
                    },
                  ].map(({ label, badge, desc }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <span
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-full flex-shrink-0 whitespace-nowrap ${badge}`}
                      >
                        {label}
                      </span>
                      <p className="text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  After uploading a file, the filename, size, and MIME type
                  appear in the blue info bar above the input so you can confirm
                  the right file was loaded.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Copy or download the output
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The right panel shows the result as you type. Two buttons
                  appear above the output field once a result is ready:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {[
                    {
                      icon: "⧉",
                      iconBg: "bg-green-600",
                      label: "Copy",
                      desc: "Copies the entire output to the clipboard instantly. The button changes to a green 'Copied' confirmation for 2 seconds. Use this to paste Base64 directly into code, a terminal, or another tool.",
                    },
                    {
                      icon: "↓",
                      iconBg: "bg-emerald-600",
                      label: "Download",
                      desc: "Saves the output as a .txt file named encoded.txt or decoded.txt. Useful when the output is too long to comfortably copy from a text area.",
                    },
                  ].map(({ icon, iconBg, label, desc }) => (
                    <div
                      key={label}
                      className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-4"
                    >
                      <p className="text-sm font-bold text-gray-900 mb-1.5 flex items-center gap-2">
                        <span
                          className={`w-5 h-5 ${iconBg} text-white rounded text-xs flex items-center justify-center`}
                        >
                          {icon}
                        </span>
                        {label}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  The character count below each text area updates live. In
                  Encode mode, expect the output to be roughly 33% longer than
                  the input — that's normal and expected for Base64.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Decode an image and preview it
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When the input contains Base64-encoded image data, the tool
                  automatically detects it and renders a preview below the
                  output area. This works two ways:
                </p>
                <div className="space-y-3 mb-4">
                  {[
                    {
                      label: "Full data URI",
                      desc: "If the input starts with data:image/, the tool uses it directly as the image source. Paste the full data URI string in Decode mode to preview and download it.",
                    },
                    {
                      label: "Raw Base64 string",
                      desc: "If the input looks like a valid Base64 string without a prefix, the tool attempts to render it as a PNG. If it's actually text data, the image silently fails and only the decoded text is shown.",
                    },
                  ].map(({ label, desc }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <span className="text-emerald-600 font-bold flex-shrink-0 mt-0.5">
                        →
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">
                          {label}
                        </p>
                        <p className="text-gray-600 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Use the <strong>Download Image</strong> button in the preview
                  panel to save the decoded image as a PNG — no need to copy the
                  data URI and paste it elsewhere.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
                5
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Use Swap to chain encode → decode in one click
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  The teal{" "}
                  <strong>Swap &amp; Decode / Swap &amp; Encode</strong> button
                  at the bottom copies the current output into the input field
                  and flips the mode — so you can immediately reverse what you
                  just did without any manual copy-pasting.
                </p>
                <div className="bg-teal-50 rounded-xl px-5 py-4 text-sm text-teal-800 leading-relaxed">
                  <strong>Practical example:</strong> You encode a JSON string
                  to verify it's valid Base64. Click Swap — the encoded output
                  becomes the new input, mode switches to Decode, and you
                  immediately see the original JSON to confirm the round-trip is
                  clean. No copy-paste required.
                </div>
              </div>
            </div>
          </div>

          {/* ── Real-world use cases ── */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Where you'll actually use this
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[
              {
                emoji: "🔑",
                title: "Inspecting JWT tokens",
                desc: "A JWT has three Base64URL-encoded sections separated by dots. Paste the middle section (the payload) into Decode mode to read the claims — expiry, user ID, roles — without a dedicated JWT tool.",
              },
              {
                emoji: "🖼️",
                title: "Embedding images in HTML/CSS",
                desc: "Upload a small icon using Upload Image, then copy the encoded output and paste it into an img src or CSS background-image url(). Eliminates an HTTP request for tiny assets.",
              },
              {
                emoji: "🔐",
                title: "Reading HTTP Basic Auth headers",
                desc: "HTTP Basic Auth encodes credentials as Base64(username:password). Paste the value after 'Authorization: Basic' into Decode mode to see the plaintext credentials.",
              },
              {
                emoji: "📧",
                title: "Extracting email attachments",
                desc: "SMTP encodes attachments as Base64 in raw email source. Paste the encoded block into Decode mode and download the result to extract the attachment.",
              },
              {
                emoji: "📦",
                title: "Encoding Kubernetes secrets",
                desc: "Kubernetes secrets require values stored as Base64 strings. Encode a password, certificate, or JSON config and paste the result into your manifest.",
              },
              {
                emoji: "🔍",
                title: "Debugging API responses",
                desc: "Some APIs return Base64-encoded fields for binary data — PDFs, certificates, or serialised objects. Paste the field value into Decode mode to inspect the raw content.",
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

          {/* ── Encoding vs encryption ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Base64 is encoding — not encryption
            </h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              This is the most important thing to understand before using Base64
              in any system:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {[
                {
                  heading: "❌ What Base64 is NOT",
                  bg: "bg-red-50 border-red-100",
                  headingColor: "text-red-700",
                  icon: "✗",
                  iconColor: "text-red-400",
                  items: [
                    "It is not encryption. Anyone can decode it instantly.",
                    "It provides no security or confidentiality.",
                    "It is not compression — output is ~33% larger.",
                    "Encoding a password does not protect it.",
                  ],
                },
                {
                  heading: "✅ What Base64 IS",
                  bg: "bg-emerald-50 border-emerald-100",
                  headingColor: "text-emerald-700",
                  icon: "✓",
                  iconColor: "text-emerald-500",
                  items: [
                    "A way to represent binary data using only safe ASCII characters.",
                    "Standard for embedding images in HTML, CSS, and email.",
                    "Required by many protocols — SMTP, HTTP Basic Auth, JWT.",
                    "Universally reversible — any tool can decode it.",
                  ],
                },
              ].map(({ heading, bg, headingColor, icon, iconColor, items }) => (
                <div
                  key={heading}
                  className={`rounded-xl border px-5 py-4 ${bg}`}
                >
                  <p className={`text-sm font-bold mb-3 ${headingColor}`}>
                    {heading}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className={`flex-shrink-0 font-bold ${iconColor}`}
                        >
                          {icon}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
              <strong>Why does Base64 exist?</strong> Early text-based protocols
              like SMTP and HTTP were designed for 7-bit ASCII only. Binary data
              would get corrupted in transit because systems stripped bytes
              above 127. Base64 converts every byte into a safe printable
              character, making any binary data transmittable as plain text
              across any system.
            </div>
          </div>

          {/* ── Standard vs Base64URL ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Standard Base64 vs Base64URL
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              This tool uses <strong>standard Base64</strong>, which uses the
              characters A–Z, a–z, 0–9,{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                +
              </code>
              ,{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                /
              </code>
              , and{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                =
              </code>{" "}
              for padding. This is the format used in email, data URIs, and most
              file encoding.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Base64URL</strong> — used in URLs and JWT tokens —
              replaces{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                +
              </code>{" "}
              with{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                -
              </code>{" "}
              and{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                /
              </code>{" "}
              with{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                _
              </code>
              , and drops the{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                =
              </code>{" "}
              padding — avoiding characters that have special meaning in URLs.
            </p>
            <div className="bg-gray-50 rounded-xl px-5 py-4 text-sm text-gray-700">
              <strong>Decoding a JWT section and getting an error?</strong>{" "}
              Replace any{" "}
              <code className="bg-white border border-gray-200 px-1 rounded font-mono">
                -
              </code>{" "}
              with{" "}
              <code className="bg-white border border-gray-200 px-1 rounded font-mono">
                +
              </code>{" "}
              and{" "}
              <code className="bg-white border border-gray-200 px-1 rounded font-mono">
                _
              </code>{" "}
              with{" "}
              <code className="bg-white border border-gray-200 px-1 rounded font-mono">
                /
              </code>{" "}
              first, or use our dedicated{" "}
              <a
                href="/tools/jwt-decoder"
                className="text-emerald-600 font-medium hover:underline"
              >
                JWT Decoder
              </a>{" "}
              which handles Base64URL automatically.
            </div>
          </div>

          {/* ── Privacy note ── */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-bold mb-3">
              All processing happens in your browser
            </h3>
            <p className="text-emerald-100 leading-relaxed max-w-xl mx-auto text-sm">
              Encoding and decoding runs entirely in JavaScript using the
              browser's built-in{" "}
              <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-white text-xs">
                btoa()
              </code>{" "}
              and{" "}
              <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-white text-xs">
                atob()
              </code>{" "}
              functions. No text, file, or image is ever sent to a server. Safe
              to use with API keys, tokens, certificates, or any sensitive data
              you need to encode or inspect.
            </p>
          </div>
        </section>
        <ToolEngagement
          toolSlug="base64-encoder-decoder"
          toolName="Base64 Encoder / Decoder"
        />
      </SidebarAdLayout>
    </>
  );
}
