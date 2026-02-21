// generate-tool-pages.mjs
// Run from your project root:  node generate-tool-pages.mjs
//
// What it does:
// - Creates src/app/tools/<slug>/page.tsx for all 47 remaining tools
// - Renames your existing component file to <ComponentName>Client.tsx
// - Skips age-calculator (already done)
// - Skips any tool that already has a page.tsx with "export const metadata"

import fs from "fs";
import path from "path";

// ─── CONFIG — update these two lines ───────────────────────────────────────
const SITE_URL = "https://yourdomain.com";
const SITE_NAME = "Free Online Tools";
const TWITTER = "@yourtwitterhandle";
// ───────────────────────────────────────────────────────────────────────────

const tools = [
  { slug: "plagiarism-checker", name: "Plagiarism Checker", description: "Detect duplicate content and plagiarism in your text.", category: "Writing", related: ["grammar-spell-checker", "paraphrasing-tool", "text-difference-checker"] },
  { slug: "grammar-spell-checker", name: "Grammar & Spell Checker", description: "Automatically correct grammar and spelling errors in your writing.", category: "Writing", related: ["plagiarism-checker", "paraphrasing-tool", "word-character-counter"] },
  { slug: "text-difference-checker", name: "Text Difference Checker", description: "Compare two pieces of text and highlight the differences instantly.", category: "Writing", related: ["plagiarism-checker", "word-frequency-counter", "word-character-counter"] },
  { slug: "word-frequency-counter", name: "Word Frequency Counter", description: "Count the frequency of every word in your text.", category: "Writing", related: ["word-character-counter", "reading-time-estimator", "text-difference-checker"] },
  { slug: "reading-time-estimator", name: "Reading Time Estimator", description: "Estimate how long it will take to read any piece of text.", category: "Writing", related: ["word-character-counter", "word-frequency-counter", "paraphrasing-tool"] },
  { slug: "json-formatter-validator", name: "JSON Formatter & Validator", description: "Format, beautify and validate JSON data easily online.", category: "Developer", related: ["base64-encoder-decoder", "url-encoder-decoder", "hash-generator"] },
  { slug: "base64-encoder-decoder", name: "Base64 Encoder/Decoder", description: "Encode or decode Base64 strings instantly in your browser.", category: "Developer", related: ["url-encoder-decoder", "hash-generator", "json-formatter-validator"] },
  { slug: "url-encoder-decoder", name: "URL Encoder/Decoder", description: "Encode or decode URLs for safe web transmission.", category: "Developer", related: ["base64-encoder-decoder", "hash-generator", "json-formatter-validator"] },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA1, SHA256, and other cryptographic hashes online.", category: "Developer", related: ["password-generator", "base64-encoder-decoder", "uuid-guid-generator"] },
  { slug: "regex-tester", name: "Regex Tester", description: "Test and debug regular expressions against sample text in real time.", category: "Developer", related: ["json-formatter-validator", "url-encoder-decoder", "hash-generator"] },
  { slug: "image-cropper-resizer", name: "Image Cropper & Resizer", description: "Crop and resize images quickly online without any software.", category: "Image", related: ["image-compressor", "image-format-converter", "background-remover"] },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Create favicons for your website from any image, instantly.", category: "Image", related: ["image-cropper-resizer", "image-format-converter", "hex-color-code-generator"] },
  { slug: "color-palette-generator", name: "Color Palette Generator", description: "Generate harmonious color palettes for your design projects.", category: "Image", related: ["hex-color-code-generator", "favicon-generator", "image-format-converter"] },
  { slug: "image-format-converter", name: "Image Format Converter", description: "Convert images between PNG, JPG, WebP, and other formats online.", category: "Image", related: ["image-compressor", "image-cropper-resizer", "background-remover"] },
  { slug: "tip-calculator", name: "Tip Calculator", description: "Calculate tips and split bills quickly for any restaurant or service.", category: "Calculator", related: ["percentage-calculator", "sales-tax-calculator", "discount-calculator"] },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages, percentage changes, and percentage differences.", category: "Calculator", related: ["tip-calculator", "discount-calculator", "sales-tax-calculator"] },
  { slug: "compound-interest-calculator", name: "Compound Interest Calculator", description: "Calculate compound interest and see your investment grow over time.", category: "Calculator", related: ["loan-mortgage-calculator", "percentage-calculator", "discount-calculator"] },
  { slug: "sales-tax-calculator", name: "Sales Tax Calculator", description: "Calculate sales tax and final price for any purchase instantly.", category: "Calculator", related: ["tip-calculator", "percentage-calculator", "discount-calculator"] },
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate discounted prices and savings for any sale or promotion.", category: "Calculator", related: ["percentage-calculator", "sales-tax-calculator", "tip-calculator"] },
  { slug: "email-validator", name: "Email Validator", description: "Check if an email address is valid and properly formatted.", category: "Developer", related: ["regex-tester", "url-encoder-decoder", "hash-generator"] },
  { slug: "ip-address-lookup", name: "IP Address Lookup", description: "Look up geolocation and network information for any IP address.", category: "Developer", related: ["email-validator", "url-encoder-decoder", "regex-tester"] },
  { slug: "pomodoro-timer", name: "Pomodoro Timer", description: "Boost your focus and productivity with the Pomodoro time management technique.", category: "Productivity", related: ["time-zone-converter", "uuid-guid-generator", "lorem-ipsum-generator"] },
  { slug: "dice-roller", name: "Dice Roller", description: "Roll virtual dice online for board games, RPGs, and tabletop games.", category: "Fun", related: ["random-name-generator", "meme-generator", "lorem-ipsum-generator"] },
  { slug: "uuid-guid-generator", name: "UUID/GUID Generator", description: "Generate unique identifiers (UUID/GUID) instantly for your applications.", category: "Developer", related: ["hash-generator", "random-name-generator", "base64-encoder-decoder"] },
  { slug: "unit-converter", name: "Unit Converter", description: "Convert between length, weight, temperature, volume, speed, and time units.", category: "Calculator", related: ["currency-converter", "percentage-calculator", "tip-calculator"] },
  { slug: "word-character-counter", name: "Word & Character Counter", description: "Count words, characters, sentences, and paragraphs with reading time estimates.", category: "Writing", related: ["reading-time-estimator", "word-frequency-counter", "paraphrasing-tool"] },
  { slug: "image-compressor", name: "Image Compressor", description: "Compress JPG, PNG, and WebP images to reduce file size without losing quality.", category: "Image", related: ["image-cropper-resizer", "image-format-converter", "background-remover"] },
  { slug: "password-generator", name: "Password Generator", description: "Generate strong, secure, random passwords with customizable options.", category: "Security", related: ["hash-generator", "uuid-guid-generator", "base64-encoder-decoder"] },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Generate QR codes for URLs, text, WiFi, email, and phone numbers.", category: "Developer", related: ["uuid-guid-generator", "hash-generator", "meta-tag-generator"] },
  { slug: "loan-mortgage-calculator", name: "Loan & Mortgage Calculator", description: "Calculate monthly loan payments, total interest, and amortization schedules.", category: "Calculator", related: ["compound-interest-calculator", "percentage-calculator", "unit-converter"] },
  { slug: "pdf-merger-splitter", name: "PDF Merger & Splitter", description: "Merge multiple PDF files into one or split a PDF into separate pages.", category: "Document", related: ["invoice-generator", "resume-builder", "signature-generator"] },
  { slug: "text-case-converter", name: "Text Case Converter", description: "Convert text to uppercase, lowercase, title case, camelCase, and snake_case.", category: "Writing", related: ["word-character-counter", "paraphrasing-tool", "lorem-ipsum-generator"] },
  { slug: "background-remover", name: "Background Remover", description: "Remove image backgrounds automatically with AI-powered precision.", category: "Image", related: ["image-compressor", "image-cropper-resizer", "image-format-converter"] },
  { slug: "invoice-generator", name: "Invoice Generator", description: "Create professional invoices with itemized billing and automatic totals.", category: "Business", related: ["resume-builder", "pdf-merger-splitter", "signature-generator"] },
  { slug: "calorie-macro-calculator", name: "Calorie & Macro Calculator", description: "Calculate your daily calorie needs and macronutrient targets for any goal.", category: "Health", related: ["bmi-calculator", "age-calculator", "unit-converter"] },
  { slug: "resume-builder", name: "Resume Builder", description: "Build a professional resume with customizable templates, downloadable as PDF.", category: "Business", related: ["invoice-generator", "signature-generator", "pdf-merger-splitter"] },
  { slug: "meme-generator", name: "Meme Generator", description: "Create custom memes with top and bottom text overlay on any image.", category: "Fun", related: ["random-name-generator", "dice-roller", "lorem-ipsum-generator"] },
  { slug: "gpa-calculator", name: "GPA Calculator", description: "Calculate your semester and cumulative GPA with multiple grading scale support.", category: "Education", related: ["age-calculator", "percentage-calculator", "reading-time-estimator"] },
  { slug: "time-zone-converter", name: "Time Zone Converter", description: "Convert time between any two time zones worldwide with daylight saving support.", category: "Productivity", related: ["pomodoro-timer", "age-calculator", "unit-converter"] },
  { slug: "paraphrasing-tool", name: "Paraphrasing Tool", description: "Rewrite any text in different words while preserving the original meaning.", category: "Writing", related: ["grammar-spell-checker", "plagiarism-checker", "text-case-converter"] },
  { slug: "signature-generator", name: "Signature Generator", description: "Create a custom digital signature with stylish fonts for documents and emails.", category: "Business", related: ["invoice-generator", "resume-builder", "pdf-merger-splitter"] },
  { slug: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder lorem ipsum text in paragraphs, sentences, or words.", category: "Writing", related: ["word-character-counter", "text-case-converter", "random-name-generator"] },
  { slug: "meta-tag-generator", name: "Meta Tag Generator", description: "Generate SEO meta tags including Open Graph and Twitter Card tags for any page.", category: "Developer", related: ["qr-code-generator", "url-encoder-decoder", "json-formatter-validator"] },
  { slug: "random-name-generator", name: "Random Name Generator", description: "Generate random names for characters, businesses, babies, or usernames.", category: "Fun", related: ["lorem-ipsum-generator", "uuid-guid-generator", "dice-roller"] },
  { slug: "hex-color-code-generator", name: "Hex Color Code Generator", description: "Generate hex color codes with a color picker, HEX, RGB, and HSL values.", category: "Design", related: ["color-palette-generator", "favicon-generator", "image-format-converter"] },
  { slug: "markdown-to-html-converter", name: "Markdown to HTML Converter", description: "Convert Markdown text to clean HTML with live preview and syntax highlighting.", category: "Developer", related: ["json-formatter-validator", "meta-tag-generator", "url-encoder-decoder"] },
  { slug: "currency-converter", name: "Currency Converter", description: "Convert between 30+ world currencies with live exchange rates.", category: "Finance", related: ["unit-converter", "percentage-calculator", "tip-calculator"] },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate your Body Mass Index and discover your healthy weight range.", category: "Health", related: ["calorie-macro-calculator", "age-calculator", "unit-converter"] },
  {
    slug: "instagram-post-planner",
    name: "Instagram Post Planner",
    description: "Plan and organize Instagram posts with captions and scheduling ideas.",
    category: "Social Media",
    related: ["social-media-bio-generator", "hashtag-generator", "engagement-rate-calculator"]
  },
  {
    slug: "tiktok-hook-generator",
    name: "TikTok Hook Generator",
    description: "Generate engaging TikTok hooks that capture attention instantly.",
    category: "Social Media",
    related: ["instagram-post-planner", "hashtag-generator", "social-media-character-counter"]
  },
  {
    slug: "twitter-thread-builder",
    name: "Twitter Thread Builder",
    description: "Create structured and engaging Twitter threads for better storytelling.",
    category: "Social Media",
    related: ["linkedin-post-formatter", "social-media-character-counter", "hashtag-generator"]
  },
  {
    slug: "linkedin-post-formatter",
    name: "LinkedIn Post Formatter",
    description: "Format LinkedIn posts for better readability and professional engagement.",
    category: "Social Media",
    related: ["twitter-thread-builder", "social-media-bio-generator", "engagement-rate-calculator"]
  },
  {
    slug: "youtube-title-description-generator",
    name: "YouTube Title & Description Generator",
    description: "Generate optimized YouTube titles and descriptions for better visibility.",
    category: "Social Media",
    related: ["hashtag-generator", "instagram-post-planner", "social-media-character-counter"]
  },
  {
    slug: "facebook-ad-copy-generator",
    name: "Facebook Ad Copy Generator",
    description: "Create high-converting Facebook ad copy for marketing campaigns.",
    category: "Marketing",
    related: ["instagram-post-planner", "engagement-rate-calculator", "hashtag-generator"]
  },
  {
    slug: "engagement-rate-calculator",
    name: "Engagement Rate Calculator",
    description: "Calculate social media engagement rate using likes, comments, and followers.",
    category: "Analytics",
    related: ["instagram-post-planner", "social-media-character-counter", "facebook-ad-copy-generator"]
  },
  {
    slug: "social-media-bio-generator",
    name: "Social Media Bio Generator",
    description: "Generate optimized and creative bios for social media profiles.",
    category: "Social Media",
    related: ["instagram-post-planner", "hashtag-generator", "social-media-character-counter"]
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    description: "Generate relevant hashtags to increase reach and discoverability.",
    category: "Social Media",
    related: ["instagram-post-planner", "tiktok-hook-generator", "social-media-bio-generator"]
  },
  {
    slug: "social-media-character-counter",
    name: "Social Media Character Counter",
    description: "Count characters and optimize posts for platform limits.",
    category: "Utilities",
    related: ["twitter-thread-builder", "hashtag-generator", "engagement-rate-calculator"]
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description:
      "Calculate your exact age in years, months, days, hours, and minutes from any birth date instantly.",
    category: "Calculator",
    related: [
      "bmi-calculator",
      "calorie-macro-calculator",
      "unit-converter"
    ]
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function toComponentName(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")
    .replace(/\//g, "");
}

function toKeywords(tool) {
  const n = tool.name.toLowerCase();
  const c = tool.category.toLowerCase();
  return [
    n,
    `free ${n}`,
    `online ${n}`,
    `${n} free`,
    `${n} online`,
    `${c} tool`,
    `free online ${n}`,
    `best ${n}`,
  ].join(", ");
}

function relatedBlock(related) {
  return related
    .map((slug) => {
      const t = tools.find((x) => x.slug === slug);
      if (!t) return "";
      return `            { href: "/tools/${t.slug}", label: "${t.name}", desc: "${t.description.replace(/"/g, "'")}" },`;
    })
    .join("\n");
}

// function generatePageTsx(tool) {
//   const component = toComponentName(tool.slug);
//   const keywords = toKeywords(tool);
//   const related = relatedBlock(tool.related);
//   const catLower = tool.category.toLowerCase();

//   return `// src/app/tools/${tool.slug}/page.tsx
// import type { Metadata } from "next";
// import ${component}Client from "./${component}Client";

// const SITE_URL  = "${SITE_URL}";
// const SITE_NAME = "${SITE_NAME}";

// export const metadata: Metadata = {
//   title: "${tool.name} — Free Online ${tool.name} | ${SITE_NAME}",
//   description: "${tool.description.replace(/"/g, "'")} Free, instant, no signup required.",
//   keywords: "${keywords}",
//   authors: [{ name: SITE_NAME, url: SITE_URL }],
//   creator:   SITE_NAME,
//   publisher: SITE_NAME,
//   alternates: {
//     canonical: \`\${SITE_URL}/tools/${tool.slug}\`,
//   },
//   robots: {
//     index:     true,
//     follow:    true,
//     googleBot: {
//       index:               true,
//       follow:              true,
//       "max-image-preview": "large",
//       "max-snippet":       -1,
//     },
//   },
//   openGraph: {
//     type:        "website",
//     url:         \`\${SITE_URL}/tools/${tool.slug}\`,
//     siteName:    SITE_NAME,
//     locale:      "en_US",
//     title:       "${tool.name} — Free Online ${tool.name}",
//     description: "${tool.description.replace(/"/g, "'")} Free, instant, no signup.",
//     images: [{
//       url:    \`\${SITE_URL}/og/${tool.slug}.png\`,
//       width:  1200,
//       height: 630,
//       alt:    "Free Online ${tool.name}",
//     }],
//   },
//   twitter: {
//     card:        "summary_large_image",
//     site:        "${TWITTER}",
//     creator:     "${TWITTER}",
//     title:       "${tool.name} — Free Online ${tool.name}",
//     description: "${tool.description.replace(/"/g, "'")}",
//     images:      [\`\${SITE_URL}/og/${tool.slug}.png\`],
//   },
// };

// const toolJsonLd = {
//   "@context": "https://schema.org",
//   "@type":    "SoftwareApplication",
//   name:        "${tool.name}",
//   description: "${tool.description.replace(/"/g, "'")}",
//   url:         \`\${SITE_URL}/tools/${tool.slug}\`,
//   applicationCategory: "WebApplication",
//   operatingSystem:     "Any",
//   browserRequirements: "Requires JavaScript. Works in all modern browsers.",
//   offers: {
//     "@type":       "Offer",
//     price:         "0",
//     priceCurrency: "USD",
//     availability:  "https://schema.org/InStock",
//   },
//   provider: {
//     "@type": "Organization",
//     name:     SITE_NAME,
//     url:      SITE_URL,
//   },
// };

// const breadcrumbJsonLd = {
//   "@context": "https://schema.org",
//   "@type":    "BreadcrumbList",
//   itemListElement: [
//     { "@type": "ListItem", position: 1, name: "Home",                       item: SITE_URL },
//     { "@type": "ListItem", position: 2, name: "${tool.category} Tools",     item: \`\${SITE_URL}/?category=${catLower}\` },
//     { "@type": "ListItem", position: 3, name: "${tool.name}",               item: \`\${SITE_URL}/tools/${tool.slug}\` },
//   ],
// };

// export default function ${component}Page() {
//   return (
//     <>
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

//       <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
//         <ol className="flex items-center gap-2 text-sm text-gray-500">
//           <li><a href="/" className="hover:text-indigo-600 transition-colors">Home</a></li>
//           <li aria-hidden="true" className="text-gray-300">/</li>
//           <li><a href="/?category=${catLower}" className="hover:text-indigo-600 transition-colors">${tool.category} Tools</a></li>
//           <li aria-hidden="true" className="text-gray-300">/</li>
//           <li><span aria-current="page" className="text-gray-900 font-medium">${tool.name}</span></li>
//         </ol>
//       </nav>

//       <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
//         <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
//           Free ${tool.category} Tool · No Signup · Works Instantly
//         </p>
//         <h1 className="sr-only">
//           ${tool.name} — Free Online ${tool.name}
//         </h1>
//         <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
//           ${tool.description} Free, instant, no account needed.
//         </p>
//       </header>

//       <main id="main-content" aria-label="${tool.name} tool">
//         <${component}Client />
//       </main>

//       <section aria-labelledby="about-${tool.slug}" className="max-w-6xl mx-auto px-4 py-12">
//         <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
//           <h2 id="about-${tool.slug}" className="text-2xl font-bold text-gray-900 mb-4">
//             How to Use This Free ${tool.name}
//           </h2>
//           <p className="text-gray-600 leading-relaxed mb-4">
//             Our free online <strong>${tool.name.toLowerCase()}</strong> is designed for speed and
//             simplicity. ${tool.description} No software installation or account is required —
//             just use the tool above and get results instantly.
//           </p>
//           <p className="text-gray-600 leading-relaxed">
//             All processing runs entirely in your browser. Your data is never sent to or stored on
//             our servers. This tool is part of our{" "}
//             <a href="/" className="text-indigo-600 hover:underline font-medium">
//               free online tools directory
//             </a>{" "}
//             — 48+ tools covering calculators, converters, generators, and more.
//           </p>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-lg font-bold text-gray-900 mb-4">
//             Related Free ${tool.category} Tools
//           </h3>
//           <div className="grid sm:grid-cols-3 gap-4">
//             {[
// ${related}
//             ].map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 className="block bg-white rounded-xl shadow p-5 border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
//                 aria-label={\`\${link.label} — \${link.desc}\`}
//               >
//                 <div className="font-bold text-gray-900 text-sm mb-1">{link.label}</div>
//                 <div className="text-xs text-gray-500">{link.desc}</div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
// `;
// }

// ─── Main ───────────────────────────────────────────────────────────────────

function generatePageTsx(tool) {
  const component = toComponentName(tool.slug);
  const keywords = toKeywords(tool);
  const related = relatedBlock(tool.related);
  const catLower = tool.category.toLowerCase();

  return `// src/app/tools/${tool.slug}/page.tsx
import type { Metadata } from "next";
import ${component}Client from "./${component}Client";
import AdSlot         from "@/components/AdSlot";
import SidebarAdLayout from "@/components/SidebarAdLayout";

const SITE_URL  = "${SITE_URL}";
const SITE_NAME = "${SITE_NAME}";

// ─── Slot IDs from env ────────────────────────────────────────────────────────
const SLOT_BELOW_TOOL   = process.env.NEXT_PUBLIC_AD_SLOT_BELOW_TOOL   ?? "0000000000";
const SLOT_LEADERBOARD  = process.env.NEXT_PUBLIC_AD_SLOT_LEADERBOARD  ?? "0000000000";

export const metadata: Metadata = {
  title: "${tool.name} — Free Online ${tool.name} | ${SITE_NAME}",
  description: "${tool.description.replace(/"/g, "'")} Free, instant, no signup required.",
  keywords: "${keywords}",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: \`\${SITE_URL}/tools/${tool.slug}\` },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type:        "website",
    url:         \`\${SITE_URL}/tools/${tool.slug}\`,
    siteName:    SITE_NAME,
    locale:      "en_US",
    title:       "${tool.name} — Free Online ${tool.name}",
    description: "${tool.description.replace(/"/g, "'")} Free, instant, no signup.",
    images: [{ url: \`\${SITE_URL}/og/${tool.slug}.png\`, width: 1200, height: 630, alt: "Free Online ${tool.name}" }],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "${TWITTER}",
    creator:     "${TWITTER}",
    title:       "${tool.name} — Free Online ${tool.name}",
    description: "${tool.description.replace(/"/g, "'")}",
    images:      [\`\${SITE_URL}/og/${tool.slug}.png\`],
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type":    "SoftwareApplication",
  name:        "${tool.name}",
  description: "${tool.description.replace(/"/g, "'")}",
  url:         \`\${SITE_URL}/tools/${tool.slug}\`,
  applicationCategory: "WebApplication",
  operatingSystem:     "Any",
  browserRequirements: "Requires JavaScript. Works in all modern browsers.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type":    "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                   item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "${tool.category} Tools", item: \`\${SITE_URL}/?category=${catLower}\` },
    { "@type": "ListItem", position: 3, name: "${tool.name}",           item: \`\${SITE_URL}/tools/${tool.slug}\` },
  ],
};

export default function ${component}Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-indigo-600 transition-colors">Home</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><a href="/?category=${catLower}" className="hover:text-indigo-600 transition-colors">${tool.category} Tools</a></li>
          <li aria-hidden="true" className="text-gray-300">/</li>
          <li><span aria-current="page" className="text-gray-900 font-medium">${tool.name}</span></li>
        </ol>
      </nav>

      {/* Category badge + SR H1 */}
      <header className="max-w-6xl mx-auto px-4 pt-2 pb-0">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">
          Free ${tool.category} Tool · No Signup · Works Instantly
        </p>
        <h1 className="sr-only">${tool.name} — Free Online ${tool.name}</h1>
        <p className="hidden md:block text-sm text-gray-500 max-w-2xl mb-2">
          ${tool.description} Free, instant, no account needed.
        </p>
      </header>

      {/* ── Zone F: sticky sidebar wraps the entire main + editorial area ── */}
      <SidebarAdLayout>

        {/* ── Tool component (main interactive area) ──────────────────── */}
        <main id="main-content" aria-label="${tool.name} tool">
          <${component}Client />
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
          <AdSlot variant="leaderboard" slotId={SLOT_LEADERBOARD} className="hidden sm:flex" />
          <AdSlot variant="mediumrectangle" slotId={SLOT_LEADERBOARD} className="flex sm:hidden" />
        </div>

        {/* ── Editorial: How To + Related Tools ────────────────────────── */}
        <section aria-labelledby="about-${tool.slug}" className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 id="about-${tool.slug}" className="text-2xl font-bold text-gray-900 mb-4">
              How to Use This Free ${tool.name}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our free online <strong>${tool.name.toLowerCase()}</strong> is designed for speed and
              simplicity. ${tool.description} No software installation or account is required —
              just use the tool above and get results instantly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              All processing runs entirely in your browser. Your data is never sent to or stored on
              our servers. This tool is part of our{" "}
              <a href="/" className="text-indigo-600 hover:underline font-medium">
                free online tools directory
              </a>{" "}
              — 60+ tools covering calculators, converters, generators, and social media utilities.
            </p>
          </div>

          {/* ── Zone I: related tools grid with native ad slot ──────────── */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Related Free ${tool.category} Tools
            </h3>
            {/* 3-slot grid; the 4th card position (index 3) is reserved for */}
            {/* a native sponsored card — set data-ad-format="fluid" in AdSense */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
${related}
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block bg-white rounded-xl shadow p-5 border-2 border-transparent hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200"
                  aria-label={\`\${link.label} — \${link.desc}\`}
                >
                  <div className="font-bold text-gray-900 text-sm mb-1">{link.label}</div>
                  <div className="text-xs text-gray-500">{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </SidebarAdLayout>
    </>
  );
}
`;
}

let created = 0;
let skipped = 0;

for (const tool of tools) {
  // Skip age-calculator — already done manually
  // if (tool.slug === "age-calculator") {
  //    // Write the new SEO page.tsx
  // fs.writeFileSync(pagePath, generatePageTsx(tool), "utf8");
  // console.log(`✅ Generated page.tsx for ${tool.slug}`);
  // created++;
  //   continue;
  // }

  const dir = path.join("src", "app", "tools", tool.slug);
  const pagePath = path.join(dir, "page.tsx");
  const component = toComponentName(tool.slug);
  const clientPath = path.join(dir, `${component}Client.tsx`);

  // Skip if page.tsx already has metadata
  // if (fs.existsSync(pagePath)) {
  //   const existing = fs.readFileSync(pagePath, "utf8");
  //   if (existing.includes("export const metadata")) {
  //     console.log(`⏭  Skipping ${tool.slug} — metadata already present`);
  //     skipped++;
  //     continue;
  //   }

  // Rename existing page.tsx → <Component>Client.tsx
  if (!fs.existsSync(clientPath)) {
    let content = fs.readFileSync(pagePath, "utf8");

    // Ensure "use client" is at the top
    if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
      content = `"use client";\n${content}`;
    }

    // Rename the export to match the new Client filename
    const oldExportDefault = new RegExp(
      `export default function ${component}\\b`,
      "g"
    );
    content = content.replace(oldExportDefault, `export default function ${component}Client`);

    // Also handle: export default ComponentName (if using arrow or const)
    content = content.replace(
      /export default ([A-Z][A-Za-z]+);/,
      `export default ${component}Client;`
    );

    fs.writeFileSync(clientPath, content, "utf8");
    console.log(`📝 Renamed page.tsx → ${component}Client.tsx for ${tool.slug}`);
  }
  // } else {
  //   // No existing file — create a placeholder client component
  //   fs.mkdirSync(dir, { recursive: true });
  //   fs.writeFileSync(
  //     clientPath,
  //     `"use client";\n\nexport default function ${component}Client() {\n  return <div className="p-8 text-center text-gray-500">${tool.name} — coming soon.</div>;\n}\n`,
  //     "utf8"
  //   );
  //   console.log(`🆕 Created placeholder ${component}Client.tsx for ${tool.slug}`);
  // }

  // Write the new SEO page.tsx
  fs.writeFileSync(pagePath, generatePageTsx(tool), "utf8");
  console.log(`✅ Generated page.tsx for ${tool.slug}`);
  created++;
}

console.log(`\n✨ Done — ${created} pages generated, ${skipped} skipped.`);
