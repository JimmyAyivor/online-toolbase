// src/app/tools/unit-converter/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "unit-converter");
const UnitConverterClient = dynamic(() => import("./UnitConverterClient"), {
  loading: () => (
    <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Unit Converter — Length, Weight, Temp & More",
  description:
    "Convert between length, weight, temperature, volume, speed, and time units. 6 categories, 40+ units — metres to feet, kg to lbs, Celsius to Fahrenheit, litres to gallons, and more. Free, instant, no signup.",
  keywords:
    "unit converter, length converter, weight converter, temperature converter, volume converter, speed converter, time converter, metres to feet, kg to lbs, celsius to fahrenheit, free unit converter",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/unit-converter` },
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
    url: `${SITE_URL}/tools/unit-converter`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Unit Converter — Length, Weight, Temp & More",
    description:
      "Convert between 40+ units across 6 categories. metres, kg, Celsius, litres, km/h, seconds and more. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Unit Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Unit Converter — Length, Weight, Temp & More",
    description:
      "Convert 40+ units across 6 categories — length, weight, temperature, volume, speed, and time. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Unit Converter",
  description:
    "Convert between units across six categories: length (metres, feet, miles, inches, km), weight (kg, lbs, grams, ounces), temperature (Celsius, Fahrenheit, Kelvin), volume (litres, gallons, cups, fluid ounces), speed (km/h, mph, knots, m/s), and time (seconds, minutes, hours, days, weeks, years).",
  url: `${SITE_URL}/tools/unit-converter`,
  applicationCategory: "WebApplication",
  operatingSystem: "Any",
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
      name: "Unit Converter",
      item: `${SITE_URL}/tools/unit-converter`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert Celsius to Fahrenheit (and back)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To convert Celsius to Fahrenheit, use the formula: °F = (°C × 9/5) + 32. For example, 20°C = (20 × 1.8) + 32 = 36 + 32 = 68°F. To convert Fahrenheit to Celsius, use: °C = (°F − 32) × 5/9. For example, 98.6°F = (98.6 − 32) × 5/9 = 66.6 × 0.5556 = 37°C. A useful approximation for quick mental maths: double the Celsius, subtract 10%, and add 32. For 20°C: 20 × 2 = 40, minus 4 = 36, plus 32 = 68°F. Key reference points: 0°C = 32°F (water freezes); 100°C = 212°F (water boils); 37°C = 98.6°F (body temperature); −40°C = −40°F (the only temperature where both scales meet).",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert miles to kilometres?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1 mile = 1.60934 kilometres. To convert miles to kilometres, multiply by 1.60934. For quick mental maths, multiply by 1.6 (or 8/5). For example, 50 miles ≈ 50 × 1.6 = 80 km. To convert km to miles, divide by 1.60934 (or multiply by 0.621371). For quick maths, multiply by 0.6 or divide by 1.6. Example: 100 km ÷ 1.6 = 62.5 miles. The Fibonacci sequence provides a surprisingly useful approximation: successive Fibonacci numbers (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...) approximate mile-km conversions: 5 miles ≈ 8 km, 8 miles ≈ 13 km, 13 miles ≈ 21 km, 21 miles ≈ 34 km.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert kilograms to pounds and stones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1 kilogram = 2.20462 pounds. To convert kg to lbs, multiply by 2.20462. For quick maths, multiply by 2.2. For example, 70 kg ≈ 70 × 2.2 = 154 lbs. To convert lbs to kg, divide by 2.20462. For quick maths, divide by 2.2. To convert kg to stones (used in the UK for body weight): 1 stone = 6.35029 kg, so divide the kg value by 6.35. For example, 70 kg ÷ 6.35 ≈ 11 stone. For the stones-and-pounds format: 70 kg ÷ 6.35 = 11.02 stone = 11 stone and 0.02 × 14 = 0.28 pounds ≈ 11 stone 0 pounds. This tool converts between kg, grams, pounds, ounces, and metric tons.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between US and Imperial measurements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The United States customary system and the British Imperial system share many unit names but differ in some volume measurements. For length and weight, they are identical: both use inches, feet, yards, miles, ounces, and pounds with the same values. For liquid volume, they diverge: a US fluid ounce = 29.5735 mL, while an Imperial fluid ounce = 28.4131 mL. A US gallon = 3.78541 litres; an Imperial gallon = 4.54609 litres — about 20% larger. A US pint = 473 mL; an Imperial pint = 568 mL. This difference is particularly important when following recipes from different countries...",
      },
    },
    {
      "@type": "Question",
      name: "How are speed units related — mph, km/h, m/s, and knots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Speed units all measure distance per unit of time. 1 mile per hour (mph) = 1.60934 km/h = 0.44704 m/s = 0.86898 knots. 1 kilometre per hour (km/h) = 0.62137 mph = 0.27778 m/s = 0.53996 knots. 1 metre per second (m/s) = 3.6 km/h = 2.23694 mph = 1.94384 knots. 1 knot = 1 nautical mile per hour = 1.852 km/h = 1.15078 mph = 0.51444 m/s. Knots are used in aviation and marine navigation because they relate directly to latitude — 1 nautical mile = 1 arcminute of latitude, so navigation calculations are simpler...",
      },
    },
    {
      "@type": "Question",
      name: "Why does the metric system use base-10 while imperial uses mixed bases?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The metric system was designed in France in the 1790s with a deliberate base-10 structure: each unit is a power of 10 times the base unit (milli = ÷1000, centi = ÷100, kilo = ×1000, mega = ×1,000,000). This makes conversions trivially easy — just move the decimal point. The imperial system evolved organically over centuries from traditional measures: 12 inches in a foot (because 12 is divisible by 2, 3, 4, 6), 3 feet in a yard, 1,760 yards in a mile (derived from 1,000 Roman paces of 5 feet)...",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Unit Converter",
  description:
    "Step-by-step guide to using the free Unit Converter on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Unit Converter on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Unit Converter provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function UnitConverterPage() {
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
              href="/tools/category/calculators"
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
              Unit Converter
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Unit Converter — Length, Weight, Temperature, Volume, Speed &amp;
          Time, Free Online
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Convert between 40+ units across 6 categories — length, weight,
          temperature, volume, speed, and time. Instant results.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Unit Converter tool">
          <UnitConverterClient />
        </main>
        <PageEditorial />
        <ToolEngagement toolSlug="unit-converter" toolName="Unit Converter" />
      </SidebarAdLayout>
    </>
  );
}
