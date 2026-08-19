// src/app/tools/calorie-macro-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const CalorieMacroCalculatorClient = dynamic(
  () => import("./CalorieMacroCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import AdSlot from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import ToolEngagement from "@/components/ToolEngagement";

const tool = tools.find((t) => t.slug === "calorie-macro-calculator");
const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL =
  process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL ?? "0000000000";
const SLOT_LEADERBOARD =
  process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD ?? "0000000000";

export const metadata: Metadata = {
  title: "Free Calorie & Macro Calculator — TDEE + Macros",
  description:
    "Calculate your daily calorie needs and macronutrient targets for any goal. Free, instant, no signup required.",
  keywords:
    "calorie & macro calculator, free calorie & macro calculator, online calorie & macro calculator, calorie & macro calculator free, calorie & macro calculator online, health tool, free online calorie & macro calculator, best calorie & macro calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/calorie-macro-calculator` },
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
    url: `${SITE_URL}/tools/calorie-macro-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Calorie & Macro Calculator — TDEE + Macros",
    description:
      "Calculate your daily calorie needs and macronutrient targets for any goal. Free, instant, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Calorie & Macro Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Calorie & Macro Calculator — TDEE + Macros",
    description:
      "Calculate your daily calorie needs and macronutrient targets for any goal.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Calorie & Macro Calculator",
  description:
    "Calculate your daily calorie needs and macronutrient targets for any goal.",
  url: `${SITE_URL}/tools/calorie-macro-calculator`,
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
      name: "Calorie & Macro Calculator",
      item: `${SITE_URL}/tools/calorie-macro-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Calorie & Macro Calculator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the Calorie & Macro Calculator is completely free. No signup, no download, and no payment is required. It runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Calorie & Macro Calculator work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Calorie & Macro Calculator is fully responsive and works on smartphones, tablets, and desktop computers without any app installation.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data private when using the Calorie & Macro Calculator?",
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
  name: "How to Use the Calorie & Macro Calculator",
  description:
    "Step-by-step guide to using the free Calorie & Macro Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Calorie & Macro Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Calorie & Macro Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function CalorieMacroCalculatorPage() {
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
              href="/tools/category/health-fitness-calculators"
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
              Calorie & Macro Calculator
            </span>
          </li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Health Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Calorie & Macro Calculator — Free Online Calorie & Macro Calculator
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Calculate your daily calorie needs and macronutrient targets for any
          goal. Free, instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout tool={tool}>
        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="Calorie & Macro Calculator tool">
          <CalorieMacroCalculatorClient />
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
        <section
          aria-labelledby="how-to-use-calorie-macro"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <h2
            id="how-to-use-calorie-macro"
            className="text-4xl font-bold text-gray-900 mb-4 text-center"
          >
            How to Use the Calorie &amp; Macro Calculator
          </h2>
          <p className="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
            Enter your stats and goal, and get a personalised daily calorie
            target plus protein, carb, and fat targets — all calculated from
            your actual body data, not a generic table.
          </p>

          {/* ── Steps ── */}
          <div className="space-y-6 mb-14">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-black text-lg flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Enter your personal details
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Fill in your <strong>age</strong>, <strong>gender</strong>,{" "}
                  <strong>height</strong>, and <strong>weight</strong>. These
                  four inputs feed the Mifflin–St Jeor equation — the most
                  widely validated formula for estimating Basal Metabolic Rate
                  (BMR), used by dietitians and researchers.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Age",
                      note: "Metabolic rate slows slightly with age. The formula adjusts your BMR downward by a small factor as age increases.",
                    },
                    {
                      label: "Gender",
                      note: "Men and women have different BMR coefficients in the Mifflin–St Jeor formula, reflecting average differences in lean mass distribution.",
                    },
                    {
                      label: "Height",
                      note: "Taller people have more surface area and typically more lean tissue, so height adds to your BMR. Enter in cm or inches depending on your unit preference.",
                    },
                    {
                      label: "Weight",
                      note: "Use your current body weight, not your goal weight. The calculator uses your actual weight to estimate your current maintenance calories.",
                    },
                  ].map(({ label, note }) => (
                    <div
                      key={label}
                      className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3"
                    >
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        {label}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-black text-lg flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Set your activity level
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Your BMR is multiplied by an{" "}
                  <strong>Activity Multiplier</strong> (also called a PAL —
                  Physical Activity Level) to get your Total Daily Energy
                  Expenditure (TDEE). Choose the level that most accurately
                  reflects your typical week — not your best week or your ideal
                  week.
                </p>
                <div className="space-y-2">
                  {[
                    {
                      level: "Sedentary",
                      multiplier: "× 1.2",
                      desc: "Desk job, no intentional exercise. Typical for most office workers who don't train.",
                    },
                    {
                      level: "Lightly active",
                      multiplier: "× 1.375",
                      desc: "Light exercise 1–3 days per week. Casual walks, occasional gym sessions.",
                    },
                    {
                      level: "Moderately active",
                      multiplier: "× 1.55",
                      desc: "Moderate exercise 3–5 days per week. Consistent training, physically active job.",
                    },
                    {
                      level: "Very active",
                      multiplier: "× 1.725",
                      desc: "Hard exercise 6–7 days per week, or a physically demanding job plus regular training.",
                    },
                    {
                      level: "Extra active",
                      multiplier: "× 1.9",
                      desc: "Twice-a-day training, elite athletes, or very heavy manual labour every day.",
                    },
                  ].map(({ level, multiplier, desc }) => (
                    <div
                      key={level}
                      className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <code className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded flex-shrink-0 mt-0.5">
                        {multiplier}
                      </code>
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">
                          {level}
                        </p>
                        <p className="text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-orange-50 rounded-xl px-5 py-4 text-sm text-orange-800 leading-relaxed">
                  <strong>
                    Most people underestimate their activity level
                  </strong>{" "}
                  — and overestimate it equally often. If your weight has been
                  stable, your TDEE is close to your current average intake. Use
                  that as a cross-check: if the calculator says 2,400 kcal but
                  you've been stable eating 2,000, choose a lower activity
                  multiplier.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-black text-lg flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Choose your goal
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Select what you're trying to achieve. The calculator applies a
                  calorie adjustment to your TDEE and shifts the macro ratios to
                  suit each goal:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      goal: "Lose weight",
                      adjustment: "−500 kcal deficit",
                      badge: "bg-blue-100 text-blue-700",
                      detail:
                        "A 500 kcal daily deficit produces approximately 0.5 kg (1 lb) of fat loss per week — a safe, sustainable rate. Protein targets are kept high to protect muscle while in a deficit.",
                    },
                    {
                      goal: "Maintain weight",
                      adjustment: "At TDEE",
                      badge: "bg-green-100 text-green-700",
                      detail:
                        "Calories are set at your calculated TDEE with balanced macros. Use this as your baseline before experimenting, or if body recomposition (losing fat while maintaining muscle) is your goal.",
                    },
                    {
                      goal: "Gain muscle",
                      adjustment: "+300–500 kcal surplus",
                      badge: "bg-orange-100 text-orange-700",
                      detail:
                        "A modest calorie surplus supports muscle growth without excessive fat gain. Protein targets increase to support muscle protein synthesis, and carbohydrates are prioritised to fuel training.",
                    },
                  ].map(({ goal, adjustment, badge, detail }) => (
                    <div
                      key={goal}
                      className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-4"
                    >
                      <div className="flex-shrink-0 pt-0.5">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${badge}`}
                        >
                          {goal}
                        </span>
                        <p className="text-xs text-gray-400 mt-1.5 pl-0.5">
                          {adjustment}
                        </p>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-black text-lg flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Read your calorie and macro targets
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The results show your daily calorie target plus individual
                  gram targets for all three macronutrients. Here's what each
                  number means and why it's set where it is:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      macro: "Protein",
                      color: "bg-red-100 text-red-700",
                      why: "Set at 1.6–2.2 g per kg of body weight — the range supported by sports nutrition research for muscle preservation and growth. Protein is the most satiating macronutrient and has the highest thermic effect (digesting it burns more calories than carbs or fat).",
                    },
                    {
                      macro: "Carbohydrates",
                      color: "bg-yellow-100 text-yellow-800",
                      why: "The remaining calories after protein and fat are allocated are assigned to carbohydrates. Carbs are your body's preferred fuel for moderate-to-high intensity exercise — cutting them too low when training hard impairs performance.",
                    },
                    {
                      macro: "Fat",
                      color: "bg-orange-100 text-orange-700",
                      why: "Set at approximately 0.8–1 g per kg of body weight — the minimum needed for hormone production, fat-soluble vitamin absorption (A, D, E, K), and general health. Fat is not reduced below this floor regardless of calorie target.",
                    },
                  ].map(({ macro, color, why }) => (
                    <div
                      key={macro}
                      className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3"
                    >
                      <span
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-full flex-shrink-0 ${color}`}
                      >
                        {macro}
                      </span>
                      <p className="text-gray-600 leading-relaxed">{why}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                  The calorie totals are presented as a daily figure. To get a
                  weekly picture — useful for flexible dieting — multiply by 7.
                  What matters for body composition is the weekly average, not
                  hitting the exact number every single day.
                </p>
              </div>
            </div>
          </div>

          {/* ── Understanding the output ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Understanding your results
            </h3>

            <h4 className="font-bold text-gray-800 mb-2">BMR vs TDEE</h4>
            <p className="text-gray-600 leading-relaxed mb-5 text-sm">
              Your <strong>Basal Metabolic Rate (BMR)</strong> is the number of
              calories your body burns at complete rest — to keep your organs
              running, maintain body temperature, and sustain basic function.
              It's the floor, not your target. Your{" "}
              <strong>Total Daily Energy Expenditure (TDEE)</strong> is your BMR
              multiplied by your activity level — the actual number of calories
              you burn in a typical day. Your calorie target is derived from
              TDEE, not BMR.
            </p>

            <h4 className="font-bold text-gray-800 mb-2">
              Why macros matter beyond calories
            </h4>
            <p className="text-gray-600 leading-relaxed mb-5 text-sm">
              Two people eating the same number of calories can have very
              different body composition outcomes depending on their macro
              split. A 2,000 kcal diet of 200 g protein, 180 g carbs, 55 g fat
              produces very different results from 2,000 kcal of 80 g protein,
              250 g carbs, 75 g fat — even though the calorie total is
              identical. The first preserves more muscle in a deficit and builds
              more muscle in a surplus. This is why the calculator provides
              macro targets, not just a calorie number.
            </p>

            <h4 className="font-bold text-gray-800 mb-3">
              Calorie content of each macro
            </h4>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                {
                  macro: "Protein",
                  kcal: "4 kcal/g",
                  color: "bg-red-50 border-red-100 text-red-700",
                },
                {
                  macro: "Carbohydrates",
                  kcal: "4 kcal/g",
                  color: "bg-yellow-50 border-yellow-100 text-yellow-800",
                },
                {
                  macro: "Fat",
                  kcal: "9 kcal/g",
                  color: "bg-orange-50 border-orange-100 text-orange-700",
                },
              ].map(({ macro, kcal, color }) => (
                <div
                  key={macro}
                  className={`rounded-xl border px-4 py-3 text-center ${color}`}
                >
                  <p className="text-xs font-bold mb-1">{macro}</p>
                  <p className="text-lg font-black">{kcal}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Fat contains more than twice the calories per gram of protein or
              carbohydrate. This is why high-fat foods are calorie-dense — not
              because fat is inherently bad, but because the maths stack up
              quickly. You can verify your macro targets by multiplying grams by
              their kcal value and confirming they sum to your daily calorie
              target.
            </p>
          </div>

          {/* ── Limitations ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Limitations to be aware of
            </h3>
            <div className="space-y-3 text-sm">
              {[
                {
                  title: "TDEE calculators give estimates, not measurements",
                  body: "The Mifflin–St Jeor formula is accurate to within ±10% for most people, but individuals vary. Genetics, hormones, gut microbiome, and lean mass all affect actual calorie burn. Treat the output as a starting point and adjust based on real-world results over 2–3 weeks.",
                },
                {
                  title: "Activity multipliers are imprecise",
                  body: "The PAL categories are broad. 'Moderately active' covers a wide range of people. If your weight isn't responding as expected after 3 weeks, try adjusting the multiplier one step up or down before changing your food intake.",
                },
                {
                  title: "The formula doesn't account for medical conditions",
                  body: "Thyroid disorders, insulin resistance, PCOS, and some medications directly affect calorie metabolism and cannot be captured in a formula based on height, weight, age, and activity alone. If you have a diagnosed metabolic condition, work with a dietitian.",
                },
                {
                  title: "This is not medical or dietary advice",
                  body: "The calculator provides general nutritional reference values based on widely used population formulas. It is not a substitute for a registered dietitian or nutritionist who can assess your individual circumstances, health history, and goals.",
                },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-4"
                >
                  <span className="text-amber-500 flex-shrink-0 mt-0.5 font-bold">
                    ⚠
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-0.5">
                      {title}
                    </p>
                    <p className="text-gray-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Practical starting points ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              How to actually use your numbers day-to-day
            </h3>
            <div className="space-y-4 text-sm">
              {[
                {
                  n: "1",
                  title: "Prioritise protein above everything else",
                  body: "For most people, hitting the protein target within the calorie budget is the single highest-leverage dietary move. Everything else — carb/fat split, meal timing, food selection — matters far less. Get the protein right and the rest is optimisation.",
                },
                {
                  n: "2",
                  title: "Track for 2–3 weeks before judging",
                  body: "Body weight fluctuates by 1–3 kg day to day due to water, food volume, and glycogen. Don't assess whether your calorie target is working until you have a weekly average over at least 2–3 weeks. A single day's reading means nothing.",
                },
                {
                  n: "3",
                  title: "Adjust in 100–200 kcal increments",
                  body: "If your weight isn't moving in the expected direction after 3 weeks, adjust calories by 100–200 kcal per day rather than making large swings. Small adjustments let you identify the minimal effective dose and avoid overshooting.",
                },
                {
                  n: "4",
                  title: "Log food by weight, not volume",
                  body: "A 'cup' of oats or a 'tablespoon' of peanut butter can vary by 50–100% in calorie content depending on how packed or heaped the measure is. Weighing food on a kitchen scale is the only way to get accurate numbers if precise tracking matters for your goal.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {n}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-0.5">
                      {title}
                    </p>
                    <p className="text-gray-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Privacy note ── */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-8 text-white text-center mb-14">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-bold mb-3">
              Your data never leaves your device
            </h3>
            <p className="text-orange-100 leading-relaxed max-w-xl mx-auto text-sm">
              All calculations run entirely in your browser. Your age, weight,
              height, and goal are never sent to a server or stored anywhere.
              This tool is part of our{" "}
              <a href="/" className="underline text-white font-medium">
                Calculators, Pdf Tools & More directory
              </a>{" "}
              — 80+ tools covering calculators, converters, generators, and
              more.
            </p>
          </div>

          {/* ── Related tools ── */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Related Free Health Tools
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  href: "/tools/bmi-calculator",
                  label: "BMI Calculator",
                  desc: "Calculate your Body Mass Index and healthy weight range for your height.",
                },
                {
                  href: "/tools/age-calculator",
                  label: "Age Calculator",
                  desc: "Calculate your exact age in years, months, days, hours, and minutes.",
                },
                {
                  href: "/tools/unit-converter",
                  label: "Unit Converter",
                  desc: "Convert between weight, length, temperature, volume, and speed units.",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 p-5"
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
        <ToolEngagement
          toolSlug="calorie-macro-calculator"
          toolName="Calorie & Macro Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
