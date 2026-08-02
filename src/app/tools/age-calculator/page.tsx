// src/app/tools/age-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const AgeCalculatorClient = dynamic(
  () => import("./AgeCalculatorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import ToolEngagement from "@/components/ToolEngagement";
const tool = tools.find((t) => t.slug === "age-calculator");

const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Age Calculator — Free Online Age Calculator",
  description:
    "Calculate your exact age in years, months, days, hours, and minutes from any birth date instantly. Free, instant, no signup required.",
  keywords:
    "age calculator, free age calculator, online age calculator, age calculator free, age calculator online, calculator tool, free online age calculator, best age calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/age-calculator` },
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
    url: `${SITE_URL}/tools/age-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Age Calculator — Free Online Age Calculator",
    description:
      "Calculate your exact age in years, months, days, hours, and minutes from any birth date instantly. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Age Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "Age Calculator — Free Online Age Calculator",
    description:
      "Calculate your exact age in years, months, days, hours, and minutes from any birth date instantly.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Age Calculator",
  description:
    "Calculate your exact age in years, months, days, hours, and minutes from any birth date instantly.",
  url: `${SITE_URL}/tools/age-calculator`,
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
      name: "Calculator Tools",
      item: `${SITE_URL}/tools/category/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Age Calculator",
      item: `${SITE_URL}/tools/age-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Age Calculator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Age Calculator is completely free. No signup, no download, and no payment is required. It runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Age Calculator work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Age Calculator is fully responsive and works on smartphones, tablets, and desktop computers without any app installation.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private when using the Age Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All calculations are performed locally in your browser. No data is sent to any server or stored anywhere.",
      },
    }
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Age Calculator",
  description: "Step-by-step guide to using the free Age Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Age Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Age Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    }
  ],
};

export default function AgeCalculatorPage() {
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
              href="/tools/category/calculator"
              className="hover:text-indigo-600 transition-colors"
            >
              Calculator Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              Age Calculator
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Age Calculator — Free Online Age Calculator</h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate your exact age in years, months, days, hours, and minutes
          from any birth date instantly. Free, instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout tool={tool}>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="Age Calculator tool">
          <AgeCalculatorClient />
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
            How to Use the Age Calculator
          </h2>
          <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Enter a date of birth and get your exact age broken down every way
            that matters — plus your next birthday, zodiac sign, and a few
            numbers that might surprise you.
          </p>

          {/* ── Steps ── */}
          <div className="space-y-6 mb-14">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Enter a date of birth
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Click the <strong>date field</strong> and type or use the date
                  picker to select a birth date. The calculator accepts any date
                  from the distant past up to today — results appear
                  automatically the moment a valid date is entered, with no
                  button to press.
                </p>
                <div className="bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800 leading-relaxed">
                  <strong>Whose age are you calculating?</strong> The tool works
                  for anyone — yourself, a child, a parent, a pet, or even a
                  company or project. Whatever the birth or founding date, enter
                  it the same way. Dates must not be in the future (the
                  calculator will clear the result if the birth date is later
                  than the target date).
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Optionally calculate age on a specific date
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  By default the calculator measures age from the birth date up
                  to <strong>today</strong>. Tick the{" "}
                  <em>"Calculate age on a specific date"</em> checkbox to unlock
                  a second date field, then enter any past or future date as the
                  target.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      title: "Leave unchecked",
                      desc: "Calculates current age as of today. Results update live — if you leave this page open, the age is always accurate to the current date.",
                    },
                    {
                      title: "Use a specific target date",
                      desc: "Useful for working out someone's age on a particular day — a past event, an upcoming birthday, a retirement date, a school enrollment cutoff, or any other milestone.",
                    },
                  ].map(({ title, desc }) => (
                    <div
                      key={title}
                      className="bg-gray-50 rounded-xl px-4 py-4 border border-gray-100"
                    >
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        {title}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Read your exact age breakdown
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The main result card shows your age in{" "}
                  <strong>years, months, and days</strong> — not a rounded
                  figure, but the precise remainder at each unit. Below that,
                  the <em>Total Time Lived</em> panel converts your age into
                  every other unit:
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    {
                      label: "Total months",
                      desc: "Years × 12, plus the remaining whole months.",
                    },
                    {
                      label: "Total weeks",
                      desc: "Total days lived divided by 7, rounded down.",
                    },
                    {
                      label: "Total days",
                      desc: "The exact number of days from birth date to target date.",
                    },
                    {
                      label: "Total hours",
                      desc: "Total days × 24. Useful for trivia and milestone calculations.",
                    },
                    {
                      label: "Total minutes",
                      desc: "Total hours × 60. Large numbers — formatted with commas for readability.",
                    },
                  ].map(({ label, desc }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 text-sm px-4 py-3 bg-gray-50 rounded-xl"
                    >
                      <span className="font-bold text-pink-600 w-32 flex-shrink-0">
                        {label}
                      </span>
                      <span className="text-gray-600 leading-relaxed">
                        {desc}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  All figures are calculated from midnight on the birth date to
                  midnight on the target date, so results are consistent
                  regardless of time of day.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Check your birthday information
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The <strong>Birthday Information</strong> card on the right
                  shows four additional facts derived from the birth date:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      emoji: "📅",
                      label: "Next Birthday",
                      desc: "The full date of your next birthday. If today is your birthday, it shows next year's date.",
                    },
                    {
                      emoji: "⏳",
                      label: "Days Until Birthday",
                      desc: "Exact days remaining until the next birthday. Rounds up so even 'today' shows as a positive number.",
                    },
                    {
                      emoji: "📆",
                      label: "Day of Week Born",
                      desc: "The day of the week you were born — Monday, Tuesday, etc. Calculated from the Gregorian calendar.",
                    },
                    {
                      emoji: "✨",
                      label: "Zodiac Sign",
                      desc: "Your Western astrological sign based on birth month and day, shown with its traditional symbol.",
                    },
                  ].map(({ emoji, label, desc }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-4 border border-gray-100"
                    >
                      <span className="text-xl flex-shrink-0">{emoji}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900 mb-1">
                          {label}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-600 text-white font-black text-lg flex items-center justify-center">
                5
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Explore the fun facts panel
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The <strong>Fun Facts</strong> sidebar turns your age into
                  four biological and astronomical numbers. Here's how each is
                  calculated:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      emoji: "🎂",
                      label: "Heartbeats",
                      formula: "Total minutes × 70",
                      desc: "Based on an average resting heart rate of 70 beats per minute across a lifetime.",
                    },
                    {
                      emoji: "😴",
                      label: "Sleep Time",
                      formula: "Total days ÷ 3",
                      desc: "Assumes 8 hours of sleep per day, which is one third of every 24-hour period.",
                    },
                    {
                      emoji: "🌍",
                      label: "Earth Orbits",
                      formula: "= your age in years",
                      desc: "One orbit equals one year, so this is simply your age — framed differently.",
                    },
                    {
                      emoji: "💪",
                      label: "Breaths Taken",
                      formula: "Total minutes × 16",
                      desc: "Based on an average breathing rate of 16 breaths per minute at rest.",
                    },
                  ].map(({ emoji, label, formula, desc }) => (
                    <div key={label} className="flex items-start gap-4 text-sm">
                      <span className="text-xl flex-shrink-0 mt-0.5">
                        {emoji}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-gray-900">
                            {label}
                          </span>
                          <code className="text-xs bg-pink-50 text-pink-700 px-2 py-0.5 rounded font-mono">
                            {formula}
                          </code>
                        </div>
                        <p className="text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Common uses ── */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Common uses</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {[
              {
                emoji: "🏫",
                title: "School enrollment",
                desc: "Check whether a child meets an age cutoff for school entry, a sports league, or a competition. Set the target date to the enrollment deadline and enter the child's birth date.",
              },
              {
                emoji: "🎂",
                title: "Birthday countdown",
                desc: "Find out exactly how many days until your next birthday, a friend's milestone, or a family member's anniversary.",
              },
              {
                emoji: "🪪",
                title: "Age verification",
                desc: "Confirm whether someone meets a minimum age requirement — for a contract, a driving test, voting eligibility, or alcohol purchase — on a specific date.",
              },
              {
                emoji: "💼",
                title: "Employment and retirement",
                desc: "Calculate how old someone will be on a specific future date — useful for retirement planning, pension eligibility, or contract end dates.",
              },
              {
                emoji: "🐾",
                title: "Pet age",
                desc: "Enter your pet's birth date to see their exact age in years, months, and days — or to calculate how old they'll be at a vet appointment.",
              },
              {
                emoji: "📊",
                title: "Historical research",
                desc: "Find out how old a person was at a specific point in history — how old a figure was when they achieved something, or how old a building or organisation is today.",
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

          {/* ── How age is calculated ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              How the age calculation works
            </h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              The calculator uses calendar arithmetic, not a simple day-count
              division. This is why it gives a different (more accurate) answer
              than just dividing total days by 365.25.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Years are counted by calendar year difference
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    Start with the target year minus the birth year. Then check
                    whether the birthday has occurred yet in the target year —
                    if not, subtract one year.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Remaining months are counted next
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    After subtracting the full years, count how many complete
                    months remain. If the day of the target month is before the
                    birth day, that month isn't complete yet, so subtract one
                    month and carry the remaining days forward.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    Remaining days fill the last unit
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    Whatever is left after subtracting full years and months
                    becomes the day count. This accounts for months of different
                    lengths (28, 29, 30, or 31 days) and leap years correctly.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 bg-pink-50 rounded-xl px-5 py-4 text-sm text-pink-800">
              <strong>Example:</strong> Born 15 March 1990, target date 10
              February 2025. The year difference is 34, but February 10 is
              before March 15, so the age is{" "}
              <strong>34 years, 10 months, 26 days</strong> — not 35 years.
            </div>
          </div>

          {/* ── Footer note ── */}
          <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl p-8 text-white text-center">
            <div className="text-3xl mb-3">🎂</div>
            <h3 className="text-xl font-bold mb-3">
              All calculations happen in your browser
            </h3>
            <p className="text-pink-100 leading-relaxed max-w-xl mx-auto text-sm">
              No date of birth is sent to a server or stored anywhere. Every
              calculation runs locally in JavaScript on your device. Close the
              tab and nothing is retained — your data stays entirely private.
            </p>
          </div>
        </section>
        <ToolEngagement toolSlug="age-calculator" toolName="Age Calculator" />
      </SidebarAdLayout>
    </>
  );
}
