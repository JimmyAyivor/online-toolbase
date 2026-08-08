// src/app/tools/binary-hex-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const BinaryHexConverterClient = dynamic(
  () => import("./BinaryHexConverterClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "binary-hex-converter");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Binary & Hex Converter — Free Online Binary & Hex Converter",
  description:
    "Convert between binary, hexadecimal, decimal and octal — instantly in your browser.",
  keywords:
    "binary hex converter, binary to hex, hex to decimal, number base converter, developer tool, free binary converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/binary-hex-converter` },
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
    url: `${SITE_URL}/tools/binary-hex-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Binary & Hex Converter — Free Online Binary & Hex Converter",
    description:
      "Convert between binary, hexadecimal, decimal and octal — instantly in your browser.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Binary & Hex Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Binary & Hex Converter — Free Online Binary & Hex Converter",
    description: "Convert between binary, hexadecimal, decimal and octal.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Binary & Hex Converter",
  description: "Convert between binary, hexadecimal, decimal and octal.",
  url: `${SITE_URL}/tools/binary-hex-converter`,
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
      name: "Binary & Hex Converter",
      item: `${SITE_URL}/tools/binary-hex-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Binary & Hex Converter free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Binary & Hex Converter is completely free. No signup, no download, and no payment is required. It runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Binary & Hex Converter work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Binary & Hex Converter is fully responsive and works on smartphones, tablets, and desktop computers without any app installation.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private when using the Binary & Hex Converter?",
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
  name: "How to Use the Binary & Hex Converter",
  description:
    "Step-by-step guide to using the free Binary & Hex Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Binary & Hex Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Binary & Hex Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function BinaryHexConverterPage() {
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
              Binary & Hex Converter
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
          Binary & Hex Converter — Free Online Binary & Hex Converter
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert between binary, hexadecimal, decimal and octal.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout tool={tool}>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="Binary & Hex Converter tool">
          <BinaryHexConverterClient />
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
            How to Use the Binary &amp; Hex Converter
          </h2>
          <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Type a number in any base and all four fields update instantly. No
            buttons, no submit — just live conversion between binary, octal,
            decimal, and hexadecimal.
          </p>

          {/* ── Steps ── */}
          <div className="space-y-6 mb-14">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Type into any of the four fields
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Each field accepts a number in its own base. Start typing and
                  all other fields update in real time — there's nothing to
                  submit.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Binary",
                      prefix: "0b",
                      color: "text-red-600 bg-red-50 border-red-100",
                      badge: "bg-red-100 text-red-700",
                      chars: "digits 0 and 1 only",
                      example: "10101111",
                    },
                    {
                      label: "Octal",
                      prefix: "0o",
                      color: "text-amber-600 bg-amber-50 border-amber-100",
                      badge: "bg-amber-100 text-amber-700",
                      chars: "digits 0–7",
                      example: "257",
                    },
                    {
                      label: "Decimal",
                      prefix: "",
                      color:
                        "text-emerald-600 bg-emerald-50 border-emerald-100",
                      badge: "bg-emerald-100 text-emerald-700",
                      chars: "digits 0–9",
                      example: "175",
                    },
                    {
                      label: "Hexadecimal",
                      prefix: "0x",
                      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
                      badge: "bg-indigo-100 text-indigo-700",
                      chars: "digits 0–9 and letters A–F",
                      example: "AF",
                    },
                  ].map(({ label, prefix, color, badge, chars, example }) => (
                    <div
                      key={label}
                      className={`rounded-xl border px-4 py-3 ${color.split(" ").slice(1).join(" ")}`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge}`}
                        >
                          {label}
                        </span>
                        {prefix && (
                          <code className="text-xs text-gray-400 font-mono">
                            prefix: {prefix}
                          </code>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        Valid characters: <strong>{chars}</strong>
                      </p>
                      <p className="text-xs text-gray-400">
                        Example:{" "}
                        <code
                          className={`font-mono font-bold ${color.split(" ")[0]}`}
                        >
                          {example}
                        </code>
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  If you type an invalid character for the selected field — for
                  example a letter in the binary field — a red error message
                  appears below the inputs and the other fields clear until the
                  input is valid.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Read all four conversions at once
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Once you have a valid number in any field, the other three
                  fill in automatically. Each base has its own colour so you can
                  scan quickly: red for binary, amber for octal, green for
                  decimal, indigo for hex.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Below the four input fields, a <strong>summary card</strong>{" "}
                  appears showing all four representations of the current value
                  together with their standard prefixes —{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                    0b
                  </code>{" "}
                  for binary,{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                    0o
                  </code>{" "}
                  for octal, and{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">
                    0x
                  </code>{" "}
                  for hex. These are the prefixes used in most programming
                  languages (Python, JavaScript, C, Rust) so you can paste them
                  straight into code.
                </p>
                <div className="bg-indigo-50 rounded-xl px-5 py-4 text-sm text-indigo-800 leading-relaxed">
                  <strong>Binary input tip:</strong> Spaces in binary input are
                  ignored, so you can paste a value formatted as nibbles or
                  bytes — for example{" "}
                  <code className="font-mono bg-white px-1 rounded">
                    1010 1111
                  </code>{" "}
                  or{" "}
                  <code className="font-mono bg-white px-1 rounded">
                    1010&nbsp;1111
                  </code>{" "}
                  — and it will convert correctly. This is useful when reading
                  binary values from datasheets or protocol documentation that
                  group bits for readability.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Copy any result with one click
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  A small <strong>Copy</strong> link appears to the right of
                  each field label as soon as the field has a value. Clicking it
                  copies that field's value to your clipboard and briefly shows
                  "Copied!" to confirm. Use this to grab the exact
                  representation you need — binary for documentation, hex for
                  code, decimal for a spreadsheet — without selecting text
                  manually.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Click <strong>Reset All</strong> to clear every field and
                  start fresh. This also clears any error messages.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Click any row in the reference table to load it
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Below the converter sits a{" "}
                  <strong>Common Values Reference</strong> table with 12
                  frequently used values shown across all four bases
                  simultaneously. Clicking any row instantly loads that value
                  into all four input fields — the same as typing it yourself.
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-100 mb-4">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-red-600">
                          Binary
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-amber-600">
                          Octal
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-emerald-600">
                          Decimal
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-indigo-600">
                          Hex
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-500 text-xs">
                          Why it matters
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ["0", "0", "0", "0", "Zero / null / off"],
                        [
                          "1111",
                          "17",
                          "15",
                          "F",
                          "Single hex digit max / 4-bit nibble max",
                        ],
                        ["10000", "20", "16", "10", "Base of hexadecimal"],
                        [
                          "10000000",
                          "200",
                          "128",
                          "80",
                          "Highest bit in a signed byte",
                        ],
                        [
                          "11111111",
                          "377",
                          "255",
                          "FF",
                          "Maximum value of one byte",
                        ],
                      ].map(([bin, oct, dec, hex, note]) => (
                        <tr
                          key={dec}
                          className="hover:bg-indigo-50 transition-colors"
                        >
                          <td className="px-4 py-2.5 font-mono text-red-600 text-xs">
                            {bin}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-amber-600 text-xs">
                            {oct}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-emerald-600 text-xs">
                            {dec}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-indigo-600 text-xs">
                            {hex}
                          </td>
                          <td className="px-4 py-2.5 text-gray-400 text-xs">
                            {note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500">
                  The full table in the tool includes 12 values from 0 to 255.
                  All rows are clickable.
                </p>
              </div>
            </div>
          </div>

          {/* ── When you'll need this ── */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            When you'll actually need this
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[
              {
                emoji: "🎨",
                title: "CSS colour values",
                desc: "CSS hex colours like #FF5733 are two hex digits per channel — R, G, B. Convert each pair to decimal to understand or adjust the exact RGB value. FF = 255, 80 = 128, 00 = 0.",
              },
              {
                emoji: "🔌",
                title: "Hardware registers and datasheets",
                desc: "Microcontroller datasheets describe register bit fields in binary and hex. Convert between them to understand which bits control which features, or to compose a byte value to write to a register.",
              },
              {
                emoji: "🛡️",
                title: "Permissions and bitmasks",
                desc: "Unix file permissions (chmod 755) are octal. Network subnet masks, bitfield flags in C/Rust, and Linux capability flags all use hex or binary. Convert them to see which bits are set.",
              },
              {
                emoji: "🔍",
                title: "Debugging memory and network dumps",
                desc: "Hex dumps from debuggers, Wireshark, or xxd show raw byte values in hex. Convert to decimal or binary to match against expected values, protocol constants, or error codes.",
              },
              {
                emoji: "📡",
                title: "Network addressing",
                desc: "IPv4 addresses, subnet masks, VLAN IDs, and MAC address bytes are all expressed in hex or decimal depending on the tool. Convert between them to cross-reference documentation and packet captures.",
              },
              {
                emoji: "💻",
                title: "Learning computer science",
                desc: "Understanding how binary maps to hex (each hex digit = exactly 4 bits) is a foundational CS concept. Use the reference table to see the pattern — 0–F in hex maps cleanly to 0000–1111 in binary.",
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

          {/* ── How the bases work ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              How the four bases relate to each other
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              All four representations describe the same underlying integer —
              they're just different ways of writing it. The base determines how
              many unique digit symbols are used and therefore how many digits
              are needed to represent a given value.
            </p>
            <div className="space-y-5">
              {[
                {
                  base: "Binary (base 2)",
                  color: "border-red-200 bg-red-50",
                  badge: "bg-red-100 text-red-700",
                  body: "Uses only 0 and 1. Every digit represents one bit. A byte is 8 binary digits. This is the native language of computer hardware — every value in memory is ultimately stored as binary. Long strings of 0s and 1s make it impractical for humans to read, which is why hex was invented as a shorthand.",
                },
                {
                  base: "Octal (base 8)",
                  color: "border-amber-200 bg-amber-50",
                  badge: "bg-amber-100 text-amber-700",
                  body: "Uses digits 0–7. Each octal digit represents exactly 3 bits. Historically used in Unix file permissions (chmod 755 means rwxr-xr-x) and older computing systems. Less common today but still appears in Unix/Linux contexts regularly.",
                },
                {
                  base: "Decimal (base 10)",
                  color: "border-emerald-200 bg-emerald-50",
                  badge: "bg-emerald-100 text-emerald-700",
                  body: "The number system we use daily. Uses digits 0–9. Computers don't work in decimal internally — what you see in most user interfaces is decimal converted from binary for human readability. Useful as the reference point when checking whether a binary or hex value is what you expect.",
                },
                {
                  base: "Hexadecimal (base 16)",
                  color: "border-indigo-200 bg-indigo-50",
                  badge: "bg-indigo-100 text-indigo-700",
                  body: "Uses digits 0–9 and letters A–F (case-insensitive). Each hex digit represents exactly 4 bits — one nibble. This means one byte (8 bits) is always exactly two hex digits, making hex the most compact human-readable representation of binary data. Used everywhere in programming: memory addresses, colour codes, byte masks, protocol values.",
                },
              ].map(({ base, color, badge, body }) => (
                <div
                  key={base}
                  className={`rounded-xl border px-5 py-4 ${color}`}
                >
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${badge}`}
                  >
                    {base}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl px-5 py-4 text-sm text-gray-700">
              <p className="font-semibold text-gray-900 mb-2">
                The key relationship to remember:
              </p>
              <p className="leading-relaxed mb-2">
                1 hex digit = 4 binary digits (bits) = 1 nibble
                <br />2 hex digits = 8 binary digits (bits) = 1 byte
              </p>
              <p className="leading-relaxed">
                So{" "}
                <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded font-mono text-indigo-700">
                  0xFF
                </code>{" "}
                in hex is always{" "}
                <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded font-mono text-red-600">
                  11111111
                </code>{" "}
                in binary and{" "}
                <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded font-mono text-emerald-600">
                  255
                </code>{" "}
                in decimal — the maximum value of one unsigned byte.
              </p>
            </div>
          </div>

          {/* ── Privacy note ── */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-3">
              Instant, offline, private
            </h3>
            <p className="text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm">
              All conversions run entirely in JavaScript in your browser using
              JavaScript's native{" "}
              <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-white text-xs">
                parseInt()
              </code>{" "}
              and{" "}
              <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono text-white text-xs">
                .toString(radix)
              </code>{" "}
              functions. No data is sent to a server. The tool works with no
              internet connection once the page is loaded, making it safe to use
              with proprietary register values, internal addresses, or sensitive
              byte data.
            </p>
          </div>
        </section>
        <ToolEngagement
          toolSlug="binary-hex-converter"
          toolName="Binary & Hex Converter"
        />
      </SidebarAdLayout>
    </>
  );
}
