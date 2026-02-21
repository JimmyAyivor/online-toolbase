// src/app/tools/tools.ts
// Metadata-only registry — no component imports.
// Component imports live exclusively inside each tool's own page.tsx.
// This keeps tools.ts as a pure server-safe data file with no
// "use client" contamination, allowing export const metadata to
// work correctly in every tool's page.tsx.

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
};

export const tools: Tool[] = [
  {
    slug: "plagiarism-checker",
    name: "Plagiarism Checker",
    description: "Detect duplicate content and plagiarism in your text.",
    category: "Writing",
  },
  {
    slug: "grammar-spell-checker",
    name: "Grammar & Spell Checker",
    description: "Automatically correct grammar and spelling errors.",
    category: "Writing",
  },
  {
    slug: "text-difference-checker",
    name: "Text Difference Checker",
    description: "Compare two pieces of text and highlight differences.",
    category: "Writing",
  },
  {
    slug: "word-frequency-counter",
    name: "Word Frequency Counter",
    description: "Count the frequency of words in your text.",
    category: "Writing",
  },
  {
    slug: "reading-time-estimator",
    name: "Reading Time Estimator",
    description: "Estimate how long it will take to read a text.",
    category: "Writing",
  },
  {
    slug: "json-formatter-validator",
    name: "JSON Formatter & Validator",
    description: "Format and validate JSON data easily.",
    category: "Developer",
  },
  {
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode or decode Base64 strings.",
    category: "Developer",
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode URLs for safe transmission.",
    category: "Developer",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate hashes like MD5, SHA1, SHA256.",
    category: "Developer",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions against sample text.",
    category: "Developer",
  },
  {
    slug: "image-cropper-resizer",
    name: "Image Cropper & Resizer",
    description: "Crop and resize images quickly.",
    category: "Image",
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    description: "Create favicons for your website easily.",
    category: "Image",
  },
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate harmonious color palettes.",
    category: "Image",
  },
  {
    slug: "image-format-converter",
    name: "Image Format Converter",
    description: "Convert images between formats like PNG, JPG, and WebP.",
    category: "Image",
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description: "Quickly calculate tips and total bills.",
    category: "Calculator",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages and percentage changes.",
    category: "Calculator",
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest over time.",
    category: "Calculator",
  },
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    description: "Calculate sales tax for purchases.",
    category: "Calculator",
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate discounts on prices.",
    category: "Calculator",
  },
  {
    slug: "email-validator",
    name: "Email Validator",
    description: "Check if an email address is valid.",
    category: "Developer",
  },
  {
    slug: "ip-address-lookup",
    name: "IP Address Lookup",
    description: "Get geolocation and info about an IP address.",
    category: "Developer",
  },
  {
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    description: "Focus timer using the Pomodoro technique.",
    category: "Productivity",
  },
  {
    slug: "dice-roller",
    name: "Dice Roller",
    description: "Roll virtual dice for games.",
    category: "Fun",
  },
  {
    slug: "uuid-guid-generator",
    name: "UUID/GUID Generator",
    description: "Generate unique identifiers (UUID/GUID).",
    category: "Developer",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert between units of measurement.",
    category: "Calculator",
  },
  {
    slug: "word-character-counter",
    name: "Word & Character Counter",
    description: "Count words and characters in text.",
    category: "Writing",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress images to reduce file size.",
    category: "Image",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate secure passwords easily.",
    category: "Security",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs.",
    category: "Developer",
  },
  {
    slug: "loan-mortgage-calculator",
    name: "Loan & Mortgage Calculator",
    description: "Calculate loan payments and mortgage schedules.",
    category: "Calculator",
  },
  {
    slug: "pdf-merger-splitter",
    name: "PDF Merger & Splitter",
    description: "Merge or split PDF files quickly.",
    category: "Document",
  },
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text between uppercase, lowercase, and more.",
    category: "Writing",
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    description: "Remove backgrounds from images automatically.",
    category: "Image",
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    description: "Generate professional invoices easily.",
    category: "Business",
  },
  {
    slug: "calorie-macro-calculator",
    name: "Calorie & Macro Calculator",
    description: "Calculate calories and macronutrients for meals.",
    category: "Health",
  },
  {
    slug: "resume-builder",
    name: "Resume Builder",
    description: "Create professional resumes quickly.",
    category: "Business",
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    description: "Create memes easily with text and images.",
    category: "Fun",
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate your GPA for school or college.",
    category: "Education",
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    description: "Convert time between different time zones.",
    category: "Productivity",
  },
  {
    slug: "paraphrasing-tool",
    name: "Paraphrasing Tool",
    description: "Rewrite your text with different words while keeping the meaning.",
    category: "Writing",
  },
  {
    slug: "signature-generator",
    name: "Signature Generator",
    description: "Create digital signatures easily.",
    category: "Business",
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for design or content.",
    category: "Writing",
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Generate SEO meta tags for your website.",
    category: "Developer",
  },
  {
    slug: "random-name-generator",
    name: "Random Name Generator",
    description: "Generate random names for characters or users.",
    category: "Fun",
  },
  {
    slug: "hex-color-code-generator",
    name: "Hex Color Code Generator",
    description: "Generate hex color codes for design projects.",
    category: "Design",
  },
  {
    slug: "markdown-to-html-converter",
    name: "Markdown to HTML Converter",
    description: "Convert markdown text into HTML.",
    category: "Developer",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate age based on birthdate.",
    category: "Calculator",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies.",
    category: "Finance",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index from height and weight.",
    category: "Health",
  },
  {
    slug: "instagram-post-planner",
    name: "Instagram Post Planner",
    description: "Plan and organize Instagram posts with captions and scheduling ideas.",
    category: "Social Media",
  },
  {
    slug: "tiktok-hook-generator",
    name: "TikTok Hook Generator",
    description: "Generate engaging TikTok hooks that capture attention instantly.",
    category: "Social Media",
  },
  {
    slug: "twitter-thread-builder",
    name: "Twitter Thread Builder",
    description: "Create structured and engaging Twitter threads for better storytelling.",
    category: "Social Media",
  },
  {
    slug: "linkedin-post-formatter",
    name: "LinkedIn Post Formatter",
    description: "Format LinkedIn posts for better readability and professional engagement.",
    category: "Social Media",
  },
  {
    slug: "youtube-title-description-generator",
    name: "YouTube Title & Description Generator",
    description: "Generate optimized YouTube titles and descriptions for better visibility.",
    category: "Social Media",
  },
  {
    slug: "facebook-ad-copy-generator",
    name: "Facebook Ad Copy Generator",
    description: "Create high-converting Facebook ad copy for marketing campaigns.",
    category: "Marketing",
  },
  {
    slug: "engagement-rate-calculator",
    name: "Engagement Rate Calculator",
    description: "Calculate social media engagement rate using likes, comments, and followers.",
    category: "Analytics",
  },
  {
    slug: "social-media-bio-generator",
    name: "Social Media Bio Generator",
    description: "Generate optimized and creative bios for social media profiles.",
    category: "Social Media",
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    description: "Generate relevant hashtags to increase reach and discoverability.",
    category: "Social Media",
  },
  {
    slug: "social-media-character-counter",
    name: "Social Media Character Counter",
    description: "Count characters and optimize posts for platform limits.",
    category: "Utilities",
  },
];