// src/app/tools/bmi-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import ToolEngagement from "@/components/ToolEngagement";
import PostToolOffer from "@/components/monetization/PostToolOffer";
import ToolShareBar from "@/components/monetization/ToolShareBar";
import { tools } from "@/lib/tools";
const BmiCalculatorClient = dynamic(
  () => import("./BmiCalculatorClient"),
  {
    
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  }
); 

const tool = tools.find((t) => t.slug === "bmi-calculator");
const SITE_URL = "https://onlinetoolbase.com";
const SITE_NAME = "Calculators, Pdf Tools & More";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "BMI Calculator — Free Online BMI Calculator",
  description:
    "Calculate your Body Mass Index and discover your healthy weight range. Free, instant, no signup required.",
  keywords:
    "bmi calculator, free bmi calculator, online bmi calculator, bmi calculator free, bmi calculator online, health tool, free online bmi calculator, best bmi calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/bmi-calculator` },
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
    url: `${SITE_URL}/tools/bmi-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "BMI Calculator — Free Online BMI Calculator",
    description:
      "Calculate your Body Mass Index and discover your healthy weight range. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online BMI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@onlinetoolbase",
    creator: "@onlinetoolbase",
    title: "BMI Calculator — Free Online BMI Calculator",
    description:
      "Calculate your Body Mass Index and discover your healthy weight range.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BMI Calculator",
  description:
    "Calculate your Body Mass Index and discover your healthy weight range.",
  url: `${SITE_URL}/tools/bmi-calculator`,
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
      name: "Health Tools",
      item: `${SITE_URL}/tools/category/health`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "BMI Calculator",
      item: `${SITE_URL}/tools/bmi-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the BMI Calculator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the BMI Calculator is completely free. No signup, no download, and no payment is required. It runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the BMI Calculator work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the BMI Calculator is fully responsive and works on smartphones, tablets, and desktop computers without any app installation.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private when using the BMI Calculator?",
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
  name: "How to Use the BMI Calculator",
  description: "Step-by-step guide to using the free BMI Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your height and weight",
      text: "Input your height and weight in either metric (cm, kg) or imperial (feet, inches, lbs) units.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "View your BMI result",
      text: "Your BMI score is calculated instantly alongside your weight category — underweight, normal, overweight, or obese.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Understand your result",
      text: "Read the context provided about what your BMI score means and the limitations of BMI as a health indicator.",
    }
  ],
};

export default function BmiCalculatorPage() {
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
              href="/tools/category/health"
              className="hover:text-indigo-600 transition-colors"
            >
              Health Tools
            </a>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li>
            <span aria-current="page" className="text-gray-900 font-medium">
              BMI Calculator
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">BMI Calculator — Free Online BMI Calculator</h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate your Body Mass Index and discover your healthy weight range.
          Free, instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout tool={tool}>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="BMI Calculator tool">
          <BmiCalculatorClient />
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      {tool && <PostToolOffer toolSlug={tool.slug} toolCategory={tool.category} />}
      {tool && <ToolShareBar toolSlug={tool.slug} toolName={tool.name} />}
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
            How to Use the BMI Calculator
          </h2>
          <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Adjust three sliders and get your BMI, category, healthy weight
            range, and a personalised insight — all updating in real time as you
            move them.
          </p>

          {/* ── Steps ── */}
          <div className="space-y-6 mb-14">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white font-black text-lg flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Choose your unit system
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Select <strong>Metric (kg, cm)</strong> or{" "}
                  <strong>Imperial (lbs, in)</strong> using the toggle at the
                  top of the input panel. The weight and height slider ranges
                  update automatically to match your choice — you don't need to
                  convert anything manually.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Metric",
                      detail: "kg and cm",
                      range: "Weight: 30–200 kg · Height: 130–230 cm",
                      bg: "bg-green-50 border-green-100",
                    },
                    {
                      label: "Imperial",
                      detail: "lbs and inches",
                      range: "Weight: 66–440 lbs · Height: 51–91 in",
                      bg: "bg-emerald-50 border-emerald-100",
                    },
                  ].map(({ label, detail, range, bg }) => (
                    <div
                      key={label}
                      className={`rounded-xl border px-4 py-3 ${bg}`}
                    >
                      <p className="text-sm font-bold text-gray-900 mb-0.5">
                        {label}{" "}
                        <span className="font-normal text-gray-500">
                          — {detail}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">{range}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white font-black text-lg flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Set your age, weight, and height with the sliders
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Drag the three sliders to your values. The label above each
                  slider shows the current value updating live as you drag. All
                  results on the right update instantly with every slider
                  movement — no button to press.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      color: "bg-green-200",
                      label: "Age",
                      range: "15–100 years",
                      note: "Age is collected for context and to support future features. The standard BMI formula does not adjust for age — the calculation uses weight and height only.",
                    },
                    {
                      color: "bg-blue-200",
                      label: "Weight",
                      range: "30–200 kg / 66–440 lbs",
                      note: "Set to your current body weight. If you're between whole numbers, round to the nearest integer — BMI at this level of precision isn't meaningfully affected by sub-kilogram differences.",
                    },
                    {
                      color: "bg-purple-200",
                      label: "Height",
                      range: "130–230 cm / 51–91 in",
                      note: "Set to your height without shoes. Height has a squared effect in the BMI formula, so even a 2–3 cm difference changes the result noticeably — enter it as accurately as possible.",
                    },
                  ].map(({ color, label, range, note }) => (
                    <div
                      key={label}
                      className="flex items-start gap-4 text-sm bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${color}`}
                      />
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">
                          {label}{" "}
                          <span className="font-normal text-gray-400 text-xs">
                            ({range})
                          </span>
                        </p>
                        <p className="text-gray-500 leading-relaxed">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white font-black text-lg flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Read your BMI result and category
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Once weight and height are set, a colour-coded result card
                  appears showing your <strong>BMI value</strong>, your{" "}
                  <strong>WHO category</strong>, a{" "}
                  <strong>position indicator on the BMI scale</strong>, and a
                  short piece of advice specific to your category.
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    {
                      name: "Underweight",
                      range: "Below 18.5",
                      color: "bg-blue-100 text-blue-700",
                    },
                    {
                      name: "Normal weight",
                      range: "18.5 – 24.9",
                      color: "bg-green-100 text-green-700",
                    },
                    {
                      name: "Overweight",
                      range: "25.0 – 29.9",
                      color: "bg-yellow-100 text-yellow-700",
                    },
                    {
                      name: "Obese Class I",
                      range: "30.0 – 34.9",
                      color: "bg-orange-100 text-orange-700",
                    },
                    {
                      name: "Obese Class II",
                      range: "35.0 – 39.9",
                      color: "bg-red-100 text-red-700",
                    },
                    {
                      name: "Obese Class III",
                      range: "40.0 and above",
                      color: "bg-red-200 text-red-800",
                    },
                  ].map(({ name, range, color }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between text-sm px-4 py-2 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}
                        >
                          {name}
                        </span>
                      </div>
                      <span className="text-gray-500 font-mono text-xs">
                        {range}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  The category table below the result card highlights your
                  current category in colour so you can see exactly where you
                  sit relative to the others at a glance.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white font-black text-lg flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Check your healthy weight range and gap
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The <strong>Health Insights</strong> sidebar shows two key
                  numbers calculated from your height:
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3 text-sm bg-green-50 rounded-xl border border-green-100 px-4 py-3">
                    <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">
                      ↔
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-0.5">
                        Healthy Weight Range
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        The weight range that corresponds to BMI 18.5–24.9 at
                        your exact height. This is the WHO-defined normal range
                        and is shown in whatever unit system you've selected.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm bg-blue-50 rounded-xl border border-blue-100 px-4 py-3">
                    <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">
                      ↕
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-0.5">
                        Weight to gain / lose
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        If your BMI is below 18.5, the tool shows how much
                        weight you'd need to gain to reach the bottom of the
                        healthy range. If your BMI is 25 or above, it shows how
                        much you'd need to lose to reach the top of the healthy
                        range. The number updates live as you adjust the
                        sliders.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 leading-relaxed">
                  <strong>Important:</strong> The healthy weight range shown is
                  derived from the standard BMI formula. It does not account for
                  muscle mass, bone density, age, or ethnicity. Use it as a
                  general reference, not a target — a healthcare provider can
                  give you a personalised goal that accounts for your full
                  picture.
                </div>
              </div>
            </div>
          </div>

          {/* ── What BMI does and doesn't tell you ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              What BMI tells you — and what it doesn't
            </h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              BMI is a useful screening tool, but understanding its limitations
              helps you interpret your result correctly.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {[
                {
                  heading: "✅ Where BMI is useful",
                  bg: "bg-green-50 border-green-100",
                  headingColor: "text-green-700",
                  icon: "✓",
                  iconColor: "text-green-500",
                  items: [
                    "Population-level screening for weight-related health risk.",
                    "Quick, non-invasive initial assessment requiring only height and weight.",
                    "Tracking changes in your own body composition over time.",
                    "Widely understood benchmark used across clinical and research settings.",
                  ],
                },
                {
                  heading: "❌ Where BMI falls short",
                  bg: "bg-red-50 border-red-100",
                  headingColor: "text-red-700",
                  icon: "✗",
                  iconColor: "text-red-400",
                  items: [
                    "Cannot distinguish muscle from fat — athletes often score 'overweight' or 'obese'.",
                    "Ignores fat distribution — visceral fat around organs is more dangerous than subcutaneous fat.",
                    "Uses the same thresholds for all ages despite changing body composition over a lifetime.",
                    "WHO thresholds were developed on European populations; South and East Asian individuals face higher health risk at lower BMI values.",
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
                  <ul className="text-sm text-gray-600 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className={`flex-shrink-0 font-bold mt-0.5 ${iconColor}`}
                        >
                          {icon}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl px-5 py-4 text-sm text-gray-700 leading-relaxed">
              <strong>Better metrics to use alongside BMI:</strong> Waist
              circumference (above 94 cm for men, 80 cm for women indicates
              elevated risk), waist-to-height ratio (above 0.5 is a useful rule
              of thumb), and body fat percentage (measured via DEXA scan,
              bioelectrical impedance, or skinfold calipers) all provide
              information that BMI cannot. For a full health assessment, blood
              pressure, fasting glucose, and cholesterol are more predictive of
              cardiovascular risk than BMI alone.
            </div>
          </div>

          {/* ── How BMI is calculated ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              How BMI is calculated
            </h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              The BMI formula is the same worldwide — only the units change:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Metric
                </p>
                <p className="font-mono text-lg font-bold text-green-700 mb-2">
                  BMI = weight (kg) ÷ height² (m)
                </p>
                <p className="text-xs text-gray-500">
                  Height must be in metres, not centimetres
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-100 px-5 py-4 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Imperial
                </p>
                <p className="font-mono text-lg font-bold text-green-700 mb-2">
                  BMI = 703 × weight (lbs) ÷ height² (in)
                </p>
                <p className="text-xs text-gray-500">
                  The 703 factor converts the result to kg/m²
                </p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl px-5 py-4 text-sm text-green-800 leading-relaxed">
              <strong>Worked example (metric):</strong> A person who weighs 70
              kg and is 175 cm (1.75 m) tall has a BMI of{" "}
              <strong>70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = 22.9</strong> — placing
              them in the Normal weight category.
            </div>
          </div>

          {/* ── Disclaimer ── */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
            <div className="text-3xl mb-3">🏥</div>
            <h3 className="text-xl font-bold mb-3">
              BMI is a screening tool, not a diagnosis
            </h3>
            <p className="text-green-100 leading-relaxed max-w-xl mx-auto text-sm">
              This calculator provides a BMI figure and general category
              information for educational purposes. It does not constitute
              medical advice. If you have concerns about your weight or health,
              speak with a qualified healthcare provider who can assess your
              individual circumstances properly. All calculations run entirely
              in your browser — no data is sent to a server.
            </p>
          </div>

          {/* ── Zone I: related tools grid with native ad slot ──────────── */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Related Free Health Tools
            </h3>
            {/* 3-slot grid; the 4th card position (index 3) is reserved for */}
            {/* a native sponsored card — set data-ad-format="fluid" in AdSense */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  href: "/tools/calorie-macro-calculator",
                  label: "Calorie & Macro Calculator",
                  desc: "Calculate your daily calorie needs and macronutrient targets for any goal.",
                },
                {
                  href: "/tools/age-calculator",
                  label: "Age Calculator",
                  desc: "Calculate your exact age in years, months, days, hours, and minutes from any birth date instantly.",
                },
                {
                  href: "/tools/unit-converter",
                  label: "Unit Converter",
                  desc: "Convert between length, weight, temperature, volume, speed, and time units.",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block bg-white rounded-xl shadow p-5 border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
                  aria-label={`${link.label} — ${link.desc}`}
                >
                  <div className="font-bold text-gray-900 text-sm mb-1">
                    {link.label}
                  </div>
                  <div className="text-xs text-gray-500">{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <ToolEngagement toolSlug="bmi-calculator" toolName="BMI Calculator" />
      </SidebarAdLayout>
    </>
  );
}
