// src/app/tools/scientific-calculator/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "scientific-calculator");
const ScientificCalculatorClient = dynamic(
  () => import("./ScientificCalculatorClient"),
  {
    loading: () => (
      <div className="min-h-[420px] bg-gray-50 rounded-2xl animate-pulse" />
    ),
  },
);
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "./PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";

const SITE_URL = "https://www.utilvia.com";
const SITE_NAME = "Utilvia";


export const metadata: Metadata = {
  title: "Free Scientific Calculator — Trig, Log & More Online",
  description:
    "Full-featured scientific calculator with sin, cos, tan, sqrt, log, ln, powers, constants π and e, and DEG/RAD angle modes. Calculation history saved. Free, no signup.",
  keywords:
    "scientific calculator, online scientific calculator, trig calculator, sin cos tan calculator, logarithm calculator, scientific calculator free, math calculator, DEG RAD calculator",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/tools/scientific-calculator` },
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
    url: `${SITE_URL}/tools/scientific-calculator`,
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Free Scientific Calculator — Trig, Log & More Online",
    description:
      "Scientific calculator with sin, cos, tan, log, ln, sqrt, powers, π, e, DEG/RAD modes, and calculation history. Free, no signup.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Free Online Scientific Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utilvia",
    creator: "@utilvia",
    title: "Free Scientific Calculator — Trig, Log & More Online",
    description:
      "Scientific calculator with trig, log, sqrt, powers, π, e, DEG/RAD. Free.",
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Scientific Calculator",
  description:
    "Full-featured browser-based scientific calculator supporting arithmetic operations, trigonometric functions (sin, cos, tan) with selectable degree/radian mode, logarithmic functions (log base-10, natural log), square root, exponentiation (^), mathematical constants π and e, parenthetical expressions, and a scrollable calculation history of the last 10 results. Runs entirely in the browser.",
  url: `${SITE_URL}/tools/scientific-calculator`,
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
      name: "Scientific Calculator",
      item: `${SITE_URL}/tools/scientific-calculator`,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When should I use DEG mode vs RAD mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DEG (degrees) and RAD (radians) are two ways of measuring angles. DEG mode is used in everyday contexts and most school maths: a right angle is 90°, a full rotation is 360°. Use DEG mode when working with practical angles, surveying, navigation, or any context where angles are expressed in degrees. RAD (radians) is the standard unit in advanced mathematics, calculus, physics, and engineering. In radians, a right angle is π/2 (approximately 1.5708) and a full rotation is 2π (approximately 6.2832)...",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between log and ln?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "log(x) in this calculator computes the base-10 logarithm (also written log₁₀(x)) — the power to which 10 must be raised to equal x. For example, log(100) = 2 because 10² = 100; log(1000) = 3 because 10³ = 1000. Base-10 logarithms are used in scientific notation, pH calculations, decibel (dB) sound levels, and the Richter scale for earthquakes. ln(x) computes the natural logarithm (base e, where e ≈ 2.71828) — the power to which Euler's number e must be raised to equal x. For example, ln(e) = 1; ln(e²) ≈ 2...",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate powers and exponents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the ^ button (or type ^) for exponentiation. The expression a^b computes a raised to the power b. Examples: 2^10 = 1024 (2 to the power 10); 3^3 = 27 (3 cubed); 10^-2 = 0.01 (10 to the power negative 2); 4^0.5 = 2 (4 to the power 0.5 is the square root of 4, same as sqrt(4)). For square roots specifically, you can use either sqrt(x) or x^0.5 — both give the same result. For cube roots, use x^(1/3). For the nth root of x, use x^(1/n). Note that the ^ operator follows standard mathematical precedence — 2^3^2 evaluates as 2^(3^2) = 2^9 = 512 in right-to-left order...",
      },
    },
    {
      "@type": "Question",
      name: "How do I use π and e in expressions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click the π button to insert the value of pi (3.14159265358979…) into your expression. Click the e button to insert Euler's number (2.71828182845904…). Both can be used in any arithmetic or function expression: sin(pi/6) calculates sin(π/6) = 0.5 in RAD mode; e^1 = e ≈ 2.718; 2*pi*r calculates the circumference of a circle. Note that pi and e in this calculator are entered as the letters 'pi' and 'e' — the calculator recognises these as their full decimal values when computing. Expressions like pi/2, e^2, and 2*pi are all valid...",
      },
    },
    {
      "@type": "Question",
      name: "How do I use parentheses correctly in expressions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Parentheses control the order of operations. Without parentheses, the calculator follows standard mathematical precedence: powers first (^), then multiplication and division (× ÷), then addition and subtraction (+ −). Use parentheses when you want to override this order or make complex expressions unambiguous. Examples: 2+3*4 = 14 (multiplication before addition), but (2+3)*4 = 20 (parentheses force addition first); sin(pi/4)*2 = √2 ≈ 1.4142 (calculates sin of π/4 then multiplies by 2); sqrt(9+16) = sqrt(25) = 5 (evaluates 9+16 inside parentheses before taking the square root)...",
      },
    },
    {
      "@type": "Question",
      name: "What are the most common scientific calculator mistakes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common errors when using a scientific calculator are: wrong angle mode — using DEG when a problem requires RAD (or vice versa) is the most frequent cause of wrong trig results; forgetting to close parentheses in function arguments — sin(30 produces an error where sin(30) is correct; multiplying by a constant but forgetting the × sign — 2pi should be 2*pi; computing square roots using √x when you mean the square root of an entire expression (use sqrt(x+y) not sqrt(x+y) with x and y entered separately); and operator precedence errors — 1+2^3 = 9 (not 27) because 2^3=8 is calculated f..",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Scientific Calculator",
  description:
    "Step-by-step guide to using the free Scientific Calculator on Calculators, Pdf Tools & More.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool",
      text: "Navigate to the free Scientific Calculator on Calculators, Pdf Tools & More. No signup or download is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter your data",
      text: "Fill in the required fields. The Scientific Calculator provides instant results as you type or click calculate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use your results",
      text: "Review your results and copy them to your clipboard with one click. Results are ready to use immediately.",
    },
  ],
};

export default function ScientificCalculatorPage() {
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
              Scientific Calculator
            </span>
          </li>
        </ol>
      </nav>
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free Calculator Tool · No Signup · Works Instantly
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Scientific Calculator — Free Online Scientific Calculator with Trig
          &amp; Log Functions
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mb-2">
          Full-featured scientific calculator with trigonometric, logarithmic,
          and power functions — DEG/RAD modes, π and e constants, and
          calculation history.
        </p>
      </header>
      <SidebarAdLayout tool={tool}>
        <main id="main-content" aria-label="Scientific Calculator tool">
          <ScientificCalculatorClient />
        </main>
        <PageEditorial />
        <ToolEngagement
          toolSlug="scientific-calculator"
          toolName="Scientific Calculator"
        />
      </SidebarAdLayout>
    </>
  );
}
