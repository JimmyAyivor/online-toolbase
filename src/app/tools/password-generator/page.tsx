// src/app/tools/password-generator/page.tsx
import type { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Free Online Tools";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Password Generator — Free Online Password Generator",
  description:
    "Generate strong, secure, random passwords with customizable options. Free, instant, no signup required.",
  keywords:
    "password generator, free password generator, online password generator, password generator free, password generator online, security tool, free online password generator, best password generator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/password-generator` },
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
    url: `${SITE_URL}/tools/password-generator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Password Generator — Free Online Password Generator",
    description:
      "Generate strong, secure, random passwords with customizable options. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Password Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Password Generator — Free Online Password Generator",
    description:
      "Generate strong, secure, random passwords with customizable options.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Password Generator",
  description:
    "Generate strong, secure, random passwords with customizable options.",
  url: `${SITE_URL}/tools/password-generator`,
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
      name: "Security Tools",
      item: `${SITE_URL}/tools/category/security`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Password Generator",
      item: `${SITE_URL}/tools/password-generator`,
    },
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label='Breadcrumb' className='max-w-6xl mx-auto px-4 pt-4 pb-2'>
        <ol className='flex items-center gap-2 text-sm text-gray-500'>
          <li>
            <a href='/' className='hover:text-indigo-600 transition-colors'>
              Home
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <a
              href='/tools/category/security'
              className='hover:text-indigo-600 transition-colors'
            >
              Security Tools
            </a>
          </li>
          <li aria-hidden='true' className='text-gray-300'>
            /
          </li>
          <li>
            <span aria-current='page' className='text-gray-900 font-medium'>
              Password Generator
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className='max-w-6xl mx-auto px-4 pt-2 pb-0'>
        <p className='text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1'>
          Free Security Tool · No Signup · Works Instantly
        </p>
        <h1 className='sr-only'>
          Password Generator — Free Online Password Generator
        </h1>
        <p className='hidden md:block text-sm text-gray-500 max-w-2xl mb-2'>
          Generate strong, secure, random passwords with customizable options.
          Free, instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id='main-content' aria-label='Password Generator tool'>
          <PasswordGeneratorClient />
        </main>

        {/* ── Zone G: below tool result — highest value placement ──────── */}
        {/* Sits immediately after the tool, before any editorial content   */}
        <div className='max-w-6xl mx-auto px-4 mt-6 flex justify-center'>
          {/* desktop: rectangle 336×280; mobile: medium rectangle 300×250 */}
          <div className='hidden sm:block'>
            <AdSlot variant='rectangle' slotId={SLOT_BELOW_TOOL} />
          </div>
          <div className='block sm:hidden'>
            <AdSlot variant='mediumrectangle' slotId={SLOT_BELOW_TOOL} />
          </div>
        </div>

        {/* ── Zone H: between tool + How To editorial ──────────────────── */}
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

        {/* ── Editorial: How To + Related Tools ────────────────────────── */}
        {/* ── HOW TO USE ─────────────────────────────────────────────────────────── */}
        <section
          id='how-to-use'
          className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'
          aria-labelledby='how-to-use-heading'
        >
          <h2
            id='how-to-use-heading'
            className='text-4xl font-bold text-gray-900 mb-4 text-center'
          >
            How to Use the Password Generator
          </h2>
          <p className='text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed'>
            A strong password is generated the moment you arrive — no
            configuration required. Here's how to get exactly what you need from
            each setting.
          </p>

          {/* ── Step-by-step ── */}
          <div className='space-y-6 mb-14'>
            {/* Step 1 */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
                1
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  Set your password length
                </h3>
                <p className='text-gray-600 leading-relaxed mb-3'>
                  Drag the <strong>Password Length</strong> slider to choose how
                  many characters you need. The counter updates in real time,
                  and a label tells you how the length rates: <em>Too short</em>{" "}
                  (under 8), <em>Good</em> (8–11), <em>Better</em> (12–15), or{" "}
                  <em>Excellent</em> (16+).
                </p>
                <div className='bg-blue-50 rounded-xl px-5 py-4 text-sm text-blue-800 leading-relaxed'>
                  <strong>How long should your password be?</strong> Use at
                  least 16 characters for any account that matters — email,
                  banking, cloud storage. Use 12 characters for lower-stakes
                  accounts. Go up to 32 if a site allows it and you're storing
                  the password in a manager (since you'll never have to type
                  it).
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
                  Choose your character types
                </h3>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  Tick or untick the four character-set options to match
                  whatever the site or app requires:
                </p>
                <div className='grid sm:grid-cols-2 gap-3 mb-4'>
                  {[
                    {
                      label: "Uppercase (A–Z)",
                      desc: "Capital letters. Included by default and always recommended — they increase the number of possible combinations significantly.",
                    },
                    {
                      label: "Lowercase (a–z)",
                      desc: "Small letters. Leave this on unless a system specifically prohibits lowercase (unusual). It's the largest character set of the four.",
                    },
                    {
                      label: "Numbers (0–9)",
                      desc: "Digits 0 through 9. Almost universally accepted. Adds meaningful entropy without making the password harder to type when needed.",
                    },
                    {
                      label: "Symbols (!@#$…)",
                      desc: "Special characters like !, @, #, $, %, ^, &. Some systems restrict which symbols are allowed — if a password gets rejected, try turning this off and regenerating.",
                    },
                  ].map(({ label, desc }) => (
                    <div
                      key={label}
                      className='bg-gray-50 rounded-xl px-4 py-3 border border-gray-100'
                    >
                      <p className='text-sm font-bold text-gray-900 mb-1'>
                        {label}
                      </p>
                      <p className='text-sm text-gray-600 leading-relaxed'>
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
                <p className='text-sm text-gray-500'>
                  At least one character type must remain selected. If you
                  untick all four, the generator defaults to lowercase letters
                  so it always produces a valid result.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5'>
              <div className='flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center'>
                3
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  Read the strength indicator
                </h3>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  The coloured progress bar below the password display updates
                  immediately as you change settings. Strength is calculated
                  across six criteria:
                </p>
                <div className='space-y-2 mb-4'>
                  {[
                    { criteria: "Length ≥ 8 characters", points: "+1" },
                    { criteria: "Length ≥ 12 characters", points: "+1" },
                    { criteria: "Length ≥ 16 characters", points: "+1" },
                    {
                      criteria: "Contains both uppercase and lowercase",
                      points: "+1",
                    },
                    { criteria: "Contains at least one number", points: "+1" },
                    { criteria: "Contains at least one symbol", points: "+1" },
                  ].map(({ criteria, points }) => (
                    <div
                      key={criteria}
                      className='flex items-center justify-between text-sm px-4 py-2 bg-gray-50 rounded-lg'
                    >
                      <span className='text-gray-700'>{criteria}</span>
                      <span className='font-bold text-blue-600 ml-4'>
                        {points}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center font-semibold'>
                  <div className='bg-red-100 text-red-700 rounded-lg py-2'>
                    Weak
                    <br />
                    <span className='font-normal'>0–2 points</span>
                  </div>
                  <div className='bg-orange-100 text-orange-700 rounded-lg py-2'>
                    Medium
                    <br />
                    <span className='font-normal'>3–4 points</span>
                  </div>
                  <div className='bg-green-100 text-green-700 rounded-lg py-2'>
                    Strong
                    <br />
                    <span className='font-normal'>5 points</span>
                  </div>
                  <div className='bg-emerald-100 text-emerald-700 rounded-lg py-2'>
                    Very Strong
                    <br />
                    <span className='font-normal'>6 points</span>
                  </div>
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
                  Preview, regenerate, or copy
                </h3>
                <p className='text-gray-600 leading-relaxed mb-4'>
                  Once you're happy with the settings, you have three options:
                </p>
                <div className='space-y-3'>
                  <div className='flex items-start gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500 text-sm font-bold'>
                      👁
                    </div>
                    <div>
                      <p className='text-sm font-bold text-gray-900'>
                        Show / Hide
                      </p>
                      <p className='text-sm text-gray-600'>
                        Toggle the eye icon to reveal or mask the password. Use
                        hide mode if you're on a shared screen or in a public
                        space.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-gray-700 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold'>
                      ↺
                    </div>
                    <div>
                      <p className='text-sm font-bold text-gray-900'>
                        Regenerate
                      </p>
                      <p className='text-sm text-gray-600'>
                        Generates a brand new random password using your current
                        settings. Every click produces a completely different
                        result — useful if you want to pick from a few options
                        or simply don't like the look of the current one.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold'>
                      ⧉
                    </div>
                    <div>
                      <p className='text-sm font-bold text-gray-900'>
                        Copy Password
                      </p>
                      <p className='text-sm text-gray-600'>
                        Copies the password to your clipboard instantly. The
                        button confirms with a "Copied!" checkmark for 2
                        seconds. Paste it directly into the site's password
                        field or into your password manager.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Common scenarios ── */}
          <h3 className='text-2xl font-bold text-gray-900 mb-6'>
            Settings for common situations
          </h3>
          <div className='grid sm:grid-cols-2 gap-4 mb-14'>
            {[
              {
                scenario: "Password manager (most accounts)",
                length: "20–32",
                upper: true,
                lower: true,
                numbers: true,
                symbols: true,
                note: "You'll never type it manually, so go long and include everything.",
              },
              {
                scenario: "Typing manually (Wi-Fi, TV, device)",
                length: "12–16",
                upper: true,
                lower: true,
                numbers: true,
                symbols: false,
                note: "Skip symbols — they're tedious to type on remote controls and mobile keyboards.",
              },
              {
                scenario: "Site that bans symbols",
                length: "16–20",
                upper: true,
                lower: true,
                numbers: true,
                symbols: false,
                note: "Compensate for no symbols by going longer. 20 alphanumeric chars is very strong.",
              },
              {
                scenario: "PIN or numeric-only code",
                length: "8–12",
                upper: false,
                lower: false,
                numbers: true,
                symbols: false,
                note: "Untick uppercase, lowercase, and symbols. Use as long a PIN as the system allows.",
              },
              {
                scenario: "Staging / test environment",
                length: "12",
                upper: true,
                lower: true,
                numbers: true,
                symbols: false,
                note: "Don't reuse production passwords here. A fresh random 12-character password takes seconds.",
              },
              {
                scenario: "Shared team account",
                length: "16",
                upper: true,
                lower: true,
                numbers: true,
                symbols: true,
                note: "Store in a shared vault (1Password Teams, Bitwarden Org) — never distribute by email.",
              },
            ].map(
              ({ scenario, length, upper, lower, numbers, symbols, note }) => (
                <div
                  key={scenario}
                  className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'
                >
                  <p className='font-bold text-gray-900 text-sm mb-3'>
                    {scenario}
                  </p>
                  <div className='flex flex-wrap gap-1.5 mb-3'>
                    <span className='text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full'>
                      {length} chars
                    </span>
                    {upper && (
                      <span className='text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'>
                        A–Z
                      </span>
                    )}
                    {lower && (
                      <span className='text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'>
                        a–z
                      </span>
                    )}
                    {numbers && (
                      <span className='text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'>
                        0–9
                      </span>
                    )}
                    {symbols && (
                      <span className='text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'>
                        !@#
                      </span>
                    )}
                    {!symbols && (
                      <span className='text-xs bg-red-50 text-red-500 px-2.5 py-1 rounded-full line-through'>
                        !@#
                      </span>
                    )}
                  </div>
                  <p className='text-xs text-gray-500 leading-relaxed'>
                    {note}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* ── Privacy note ── */}
          <div className='bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center'>
            <div className='text-3xl mb-3'>🔒</div>
            <h3 className='text-xl font-bold mb-3'>
              Your passwords never leave your device
            </h3>
            <p className='text-indigo-100 leading-relaxed max-w-xl mx-auto text-sm'>
              This generator runs entirely in your browser using JavaScript's{" "}
              <code className='bg-white/20 px-1.5 py-0.5 rounded text-white font-mono text-xs'>
                Math.random()
              </code>
              . No password is sent to a server, logged, or stored anywhere. You
              can disconnect from the internet and the tool will continue to
              work — because everything happens on your device.
            </p>
          </div>
        </section>
              <ToolEngagement toolSlug="password-generator" toolName="Password Generator" />
      </SidebarAdLayout>
    </>
  );
}
