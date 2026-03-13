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
    // ── Writing ───────────────────────────────────────────────────────────────
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
      slug: "text-case-converter",
      name: "Text Case Converter",
      description: "Convert text between uppercase, lowercase, and more.",
      category: "Text",
    },
    {
      slug: "word-character-counter",
      name: "Word & Character Counter",
      description: "Count words and characters in text.",
      category: "Writing",
    },
    {
      slug: "lorem-ipsum-generator",
      name: "Lorem Ipsum Generator",
      description: "Generate placeholder text for design or content.",
      category: "Writing",
    },
    {
      slug: "paraphrasing-tool",
      name: "Paraphrasing Tool",
      description: "Rewrite your text with different words while keeping the meaning.",
      category: "Writing",
    },
    {
      slug: "text-summarizer",
      name: "Text Summarizer",
      description: "Summarize long text into concise key points instantly.",
      category: "Writing",
    },
    {
      slug: "sentence-counter",
      name: "Sentence Counter",
      description: "Count sentences, paragraphs and reading level of your text.",
      category: "Writing",
    },
    {
      slug: "text-to-bullet-points",
      name: "Text to Bullet Points",
      description: "Convert any paragraph into clean bullet point lists.",
      category: "Writing",
    },
    {
      slug: "essay-title-generator",
      name: "Essay Title Generator",
      description: "Generate compelling titles for essays, articles and blog posts.",
      category: "Writing",
    },
    {
      slug: "rhyme-finder",
      name: "Rhyme Finder",
      description: "Find rhyming words for poetry, lyrics and creative writing.",
      category: "Writing",
    },
    {
      slug: "writing-prompt-generator",
      name: "Writing Prompt Generator",
      description: "Generate creative writing prompts to beat writer's block instantly.",
      category: "Writing",
    },
    {
      slug: "acronym-generator",
      name: "Acronym Generator",
      description: "Generate acronyms from any phrase or set of words.",
      category: "Writing",
    },
    {
      slug: "number-to-words-converter",
      name: "Number to Words Converter",
      description: "Convert numbers to written words in English.",
      category: "Writing",
    },
    {
      slug: "readability-score-calculator",
      name: "Readability Score Calculator",
      description: "Measure text readability with Flesch-Kincaid and other standard formulas.",
      category: "Writing",
    },
    {
      slug: "text-repeater",
      name: "Text Repeater",
      description: "Repeat any text or character any number of times with a custom separator.",
      category: "Text",
    },
    {
      slug: "word-counter-live",
      name: "Word Counter",
      description: "Count words, characters, and sentences — updates live as you type.",
      category: "Writing",
    },
  
    // ── Developer ─────────────────────────────────────────────────────────────
    {
      slug: "json-formatter-validator",
      name: "JSON Formatter & Validator",
      description: "Format and validate JSON data easily.",
      category: "Developer",
    },
    {
      slug: "base64-encoder-decoder",
      name: "Base64 Encoder / Decoder",
      description: "Encode text to Base64 or decode Base64 back to plain text.",
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
      slug: "uuid-guid-generator",
      name: "UUID/GUID Generator",
      description: "Generate unique identifiers (UUID/GUID).",
      category: "Developer",
    },
    {
      slug: "qr-code-generator",
      name: "QR Code Generator",
      description: "Generate QR codes for URLs, text, Wi-Fi, email and more.",
      category: "Developer",
    },
    {
      slug: "meta-tag-generator",
      name: "Meta Tag Generator",
      description: "Generate SEO meta tags for your website.",
      category: "Developer",
    },
    {
      slug: "markdown-to-html-converter",
      name: "Markdown to HTML Converter",
      description: "Convert markdown text into HTML.",
      category: "Developer",
    },
    {
      slug: "jwt-decoder",
      name: "JWT Decoder",
      description: "Decode and inspect JWT tokens instantly in your browser.",
      category: "Developer",
    },
    {
      slug: "binary-hex-converter",
      name: "Binary & Hex Converter",
      description: "Convert between binary, hexadecimal, decimal and octal.",
      category: "Developer",
    },
    {
      slug: "cron-expression-builder",
      name: "Cron Expression Builder",
      description: "Build and validate cron job expressions with a visual editor.",
      category: "Developer",
    },
    {
      slug: "html-entity-encoder",
      name: "HTML Entity Encoder",
      description: "Encode and decode HTML entities to prevent XSS vulnerabilities.",
      category: "Developer",
    },
    {
      slug: "binary-to-text-converter",
      name: "Binary to Text Converter",
      description: "Convert binary code to readable text and vice versa.",
      category: "Developer",
    },
    {
      slug: "html-minifier",
      name: "HTML Minifier",
      description: "Minify HTML to reduce file size and improve page load speed.",
      category: "Developer",
    },
    {
      slug: "json-to-csv-converter",
      name: "JSON to CSV Converter",
      description: "Convert JSON arrays to CSV spreadsheets and back instantly.",
      category: "Developer",
    },
    {
      slug: "open-graph-preview",
      name: "Open Graph Preview",
      description: "Preview how your page looks when shared on social-media.",
      category: "Developer",
    },
    {
      slug: "robots-txt-generator",
      name: "Robots.txt Generator",
      description: "Generate a robots.txt file for your website.",
      category: "Developer",
    },
    {
      slug: "timestamp-converter",
      name: "Timestamp Converter",
      description: "Convert Unix timestamps to human-readable dates and vice versa.",
      category: "Developer",
    },
  
    // ── Calculator ────────────────────────────────────────────────────────────
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
      slug: "unit-converter",
      name: "Unit Converter",
      description: "Convert between units of measurement.",
      category: "Calculator",
    },
    {
      slug: "loan-mortgage-calculator",
      name: "Loan & Mortgage Calculator",
      description: "Calculate loan payments and mortgage schedules.",
      category: "Calculator",
    },
    {
      slug: "roi-calculator",
      name: "ROI Calculator",
      description: "Calculate return on investment for any project or campaign.",
      category: "Calculator",
    },
    {
      slug: "vat-calculator",
      name: "VAT Calculator",
      description: "Add or remove VAT from prices instantly.",
      category: "Calculator",
    },
    {
      slug: "body-fat-calculator",
      name: "Body Fat Calculator",
      description: "Estimate body fat percentage from your measurements.",
      category: "Calculator",
    },
    {
      slug: "date-difference-calculator",
      name: "Date Difference Calculator",
      description: "Calculate the exact number of days between two dates.",
      category: "Calculator",
    },
    {
      slug: "random-number-generator",
      name: "Random Number Generator",
      description: "Generate random numbers within any custom range instantly.",
      category: "Calculator",
    },
    {
      slug: "scientific-calculator",
      name: "Scientific Calculator",
      description: "Full-featured scientific calculator with trigonometry and logs.",
      category: "Calculator",
    },
    {
      slug: "fraction-calculator",
      name: "Fraction Calculator",
      description: "Add, subtract, multiply and divide fractions with steps shown.",
      category: "Calculator",
    },
    {
      slug: "age-calculator",
      name: "Age Calculator",
      description: "Calculate exact age in years, months and days from a birthdate.",
      category: "Calculator",
    },
    {
      slug: "aspect-ratio-calculator",
      name: "Aspect Ratio Calculator",
      description: "Calculate and convert aspect ratios for images and screens.",
      category: "Calculator",
    },
    {
      slug: "hourly-to-salary-calculator",
      name: "Hourly to Salary Calculator",
      description: "Convert an hourly wage to annual salary and vice versa.",
      category: "Calculator",
    },
    {
      slug: "pay-raise-calculator",
      name: "Pay Raise Calculator",
      description: "Calculate the impact of a pay raise on your salary and take-home pay.",
      category: "Calculator",
    },
    {
      slug: "speed-distance-time-calculator",
      name: "Speed Distance Time Calculator",
      description: "Calculate speed, distance, or time using the physics formula.",
      category: "Calculator",
    },
  
    // ── Finance ───────────────────────────────────────────────────────────────
    {
      slug: "currency-converter",
      name: "Currency Converter",
      description: "Convert between different currencies.",
      category: "Finance",
    },
    {
      slug: "budget-planner",
      name: "Budget Planner",
      description: "Track monthly income and expenses with a full budget breakdown.",
      category: "Finance",
    },
    {
      slug: "credit-card-payoff-calculator",
      name: "Credit Card Payoff Calculator",
      description: "See exactly how long it takes to pay off your credit card debt.",
      category: "Finance",
    },
    {
      slug: "crypto-profit-calculator",
      name: "Crypto Profit Calculator",
      description: "Calculate profit and loss on cryptocurrency trades.",
      category: "Finance",
    },
    {
      slug: "freelance-rate-calculator",
      name: "Freelance Rate Calculator",
      description: "Calculate your ideal hourly freelance rate based on income goals.",
      category: "Finance",
    },
    {
      slug: "investment-return-calculator",
      name: "Investment Return Calculator",
      description: "Calculate total return and CAGR on any investment.",
      category: "Finance",
    },
    {
      slug: "mortgage-affordability-calculator",
      name: "Mortgage Affordability Calculator",
      description: "Find out how much mortgage you can afford based on your income.",
      category: "Finance",
    },
    {
      slug: "net-worth-calculator",
      name: "Net Worth Calculator",
      description: "Add assets and liabilities to calculate your total net worth.",
      category: "Finance",
    },
    {
      slug: "rent-affordability-calculator",
      name: "Rent Affordability Calculator",
      description: "Find out how much rent you can afford based on your income.",
      category: "Finance",
    },
    {
      slug: "retirement-calculator",
      name: "Retirement Calculator",
      description: "Plan your retirement savings and see if you are on track.",
      category: "Finance",
    },
    {
      slug: "savings-goal-calculator",
      name: "Savings Goal Calculator",
      description: "Calculate how long it takes to reach a savings target.",
      category: "Finance",
    },
  
    // ── Health ────────────────────────────────────────────────────────────────
    {
      slug: "bmi-calculator",
      name: "BMI Calculator",
      description: "Calculate Body Mass Index from height and weight.",
      category: "Health",
    },
    {
      slug: "calorie-calculator",
      name: "Calorie Calculator",
      description: "Calculate daily calorie needs based on your goals and activity level.",
      category: "Health",
    },
    {
      slug: "calorie-deficit-calculator",
      name: "Calorie Deficit Calculator",
      description: "Calculate your TDEE and ideal calorie deficit to reach your weight goal.",
      category: "Health",
    },
    {
      slug: "calorie-macro-calculator",
      name: "Calorie & Macro Calculator",
      description: "Calculate calories and macronutrients for meals.",
      category: "Health",
    },
    {
      slug: "ideal-weight-calculator",
      name: "Ideal Weight Calculator",
      description: "Calculate ideal body weight using multiple standard formulas.",
      category: "Health",
    },
    {
      slug: "macro-calculator",
      name: "Macro Calculator",
      description: "Calculate your ideal daily macronutrient targets.",
      category: "Health",
    },
    {
      slug: "ovulation-calculator",
      name: "Ovulation Calculator",
      description: "Predict your fertile window and ovulation date based on your cycle.",
      category: "Health",
    },
    {
      slug: "pregnancy-due-date-calculator",
      name: "Pregnancy Due Date Calculator",
      description: "Calculate your due date and track pregnancy week by week.",
      category: "Health",
    },
    {
      slug: "protein-intake-calculator",
      name: "Protein Intake Calculator",
      description: "Find your ideal daily protein target based on weight and fitness goal.",
      category: "Health",
    },
    {
      slug: "running-pace-calculator",
      name: "Running Pace Calculator",
      description: "Calculate pace, finish time, or distance for any run or race.",
      category: "Health",
    },
    {
      slug: "sleep-calculator",
      name: "Sleep Calculator",
      description: "Find the best bedtime or wake-up time based on 90-minute sleep cycles.",
      category: "Health",
    },
    {
      slug: "water-intake-calculator",
      name: "Water Intake Calculator",
      description: "Calculate your recommended daily water intake based on weight and activity.",
      category: "Health",
    },
  
    // ── Image ─────────────────────────────────────────────────────────────────
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
      slug: "image-compressor",
      name: "Image Compressor",
      description: "Compress images to reduce file size.",
      category: "Image",
    },
    {
      slug: "background-remover",
      name: "Background Remover",
      description: "Remove backgrounds from images automatically.",
      category: "Image",
    },
    {
      slug: "meme-generator",
      name: "Meme Generator",
      description: "Create memes easily with text and images.",
      category: "Image",
    },
    {
      slug: "profile-picture-resizer",
      name: "Profile Picture Resizer",
      description: "Resize and crop profile pictures for every social platform.",
      category: "Image",
    },
  
    // ── Design ────────────────────────────────────────────────────────────────
    {
      slug: "color-code-converter",
      name: "Color Code Converter",
      description: "Convert colors between HEX, RGB, HSL, CMYK, and HSV formats.",
      category: "Design",
    },
    {
      slug: "color-contrast-checker",
      name: "Color Contrast Checker",
      description: "Check WCAG accessibility contrast ratios for text and background colors.",
      category: "Design",
    },
    {
      slug: "gradient-generator",
      name: "CSS Gradient Generator",
      description: "Create beautiful CSS gradients with live preview and copy-ready code.",
      category: "Design",
    },
    {
      slug: "hex-color-code-generator",
      name: "Hex Color Code Generator",
      description: "Generate hex color codes for design projects.",
      category: "Design",
    },
  
    // ── social-media ──────────────────────────────────────────────────────────
    {
      slug: "instagram-post-planner",
      name: "Instagram Post Planner",
      description: "Plan and organize Instagram posts with captions and scheduling ideas.",
      category: "social-media",
    },
    {
      slug: "tiktok-hook-generator",
      name: "TikTok Hook Generator",
      description: "Generate engaging TikTok hooks that capture attention instantly.",
      category: "social-media",
    },
    {
      slug: "twitter-thread-builder",
      name: "Twitter Thread Builder",
      description: "Create structured and engaging Twitter threads for better storytelling.",
      category: "social-media",
    },
    {
      slug: "linkedin-post-formatter",
      name: "LinkedIn Post Formatter",
      description: "Format LinkedIn posts for better readability and professional engagement.",
      category: "social-media",
    },
    {
      slug: "youtube-title-description-generator",
      name: "YouTube Title & Description Generator",
      description: "Generate optimized YouTube titles and descriptions for better visibility.",
      category: "social-media",
    },
    {
      slug: "social-media-bio-generator",
      name: "social-media Bio Generator",
      description: "Generate optimized and creative bios for social-media profiles.",
      category: "social-media",
    },
    {
      slug: "hashtag-generator",
      name: "Hashtag Generator",
      description: "Generate relevant hashtags to increase reach and discoverability.",
      category: "social-media",
    },
    {
      slug: "social-media-character-counter",
      name: "social-media Character Counter",
      description: "Count characters and optimize posts for platform limits.",
      category: "social-media",
    },
    {
      slug: "caption-generator",
      name: "Caption Generator",
      description: "Generate engaging captions for photos and social-media posts.",
      category: "social-media",
    },
    {
      slug: "viral-hook-generator",
      name: "Viral Hook Generator",
      description: "Create scroll-stopping hooks for any social-media platform.",
      category: "social-media",
    },
    {
      slug: "content-calendar-planner",
      name: "Content Calendar Planner",
      description: "Plan and organise your social-media content calendar for free.",
      category: "social-media",
    },
    {
      slug: "social-media-audit",
      name: "social-media Audit Tool",
      description: "Audit your social-media profiles with a guided checklist.",
      category: "social-media",
    },
  
    // ── Marketing ─────────────────────────────────────────────────────────────
    {
      slug: "facebook-ad-copy-generator",
      name: "Facebook Ad Copy Generator",
      description: "Create high-converting Facebook ad copy for marketing campaigns.",
      category: "Marketing",
    },
    {
      slug: "email-subject-line-generator",
      name: "Email Subject Line Generator",
      description: "Generate high-converting email subject lines for every campaign type.",
      category: "Marketing",
    },
    {
      slug: "slogan-generator",
      name: "Slogan Generator",
      description: "Generate catchy slogans and taglines for your brand.",
      category: "Marketing",
    },
    {
      slug: "keyword-density-checker",
      name: "Keyword Density Checker",
      description: "Analyse keyword frequency and density in any text for SEO.",
      category: "Marketing",
    },
  
    // ── Business ──────────────────────────────────────────────────────────────
    {
      slug: "invoice-generator",
      name: "Invoice Generator",
      description: "Generate professional invoices easily.",
      category: "Business",
    },
    {
      slug: "resume-builder",
      name: "Resume Builder",
      description: "Create professional resumes quickly.",
      category: "Business",
    },
    {
      slug: "signature-generator",
      name: "Signature Generator",
      description: "Create digital signatures easily.",
      category: "Business",
    },
    {
      slug: "business-name-generator",
      name: "Business Name Generator",
      description: "Generate creative business name ideas for your brand.",
      category: "Business",
    },
  
    // ── Productivity ──────────────────────────────────────────────────────────
    {
      slug: "pomodoro-timer",
      name: "Pomodoro Timer",
      description: "Focus timer using the Pomodoro technique.",
      category: "Productivity",
    },
    {
      slug: "time-zone-converter",
      name: "Time Zone Converter",
      description: "Convert time between different time zones.",
      category: "Productivity",
    },
    {
      slug: "countdown-timer",
      name: "Countdown Timer",
      description: "Count down to any event — birthdays, launches, holidays and more.",
      category: "Productivity",
    },
    {
      slug: "meeting-cost-calculator",
      name: "Meeting Cost Calculator",
      description: "Calculate the real cost of meetings based on attendees and time.",
      category: "Productivity",
    },
    {
      slug: "online-stopwatch",
      name: "Online Stopwatch",
      description: "Precise stopwatch with lap tracking — runs entirely in your browser.",
      category: "Productivity",
    },
  
    // ── Security ──────────────────────────────────────────────────────────────
    {
      slug: "password-generator",
      name: "Password Generator",
      description: "Generate secure passwords easily.",
      category: "Security",
    },
    {
      slug: "password-strength-checker",
      name: "Password Strength Checker",
      description: "Check the strength of any password and get improvement tips.",
      category: "Security",
    },
  
    // ── Document ──────────────────────────────────────────────────────────────
    {
      slug: "pdf-merger-splitter",
      name: "PDF Merger & Splitter",
      description: "Merge or split PDF files quickly.",
      category: "Document",
    },
  
    // ── Education ─────────────────────────────────────────────────────────────
    {
      slug: "gpa-calculator",
      name: "GPA Calculator",
      description: "Calculate your GPA for school or college.",
      category: "Education",
    },
  
    // ── Analytics ─────────────────────────────────────────────────────────────
    {
      slug: "engagement-rate-calculator",
      name: "Engagement Rate Calculator",
      description: "Calculate social-media engagement rate using likes, comments, and followers.",
      category: "Analytics",
    },
  
    // ── Fun ───────────────────────────────────────────────────────────────────
    {
      slug: "dice-roller",
      name: "Dice Roller",
      description: "Roll virtual dice for games.",
      category: "Fun",
    },
    {
      slug: "random-name-generator",
      name: "Random Name Generator",
      description: "Generate random names for characters or users.",
      category: "Fun",
    },
    {
      slug: "flip-text-generator",
      name: "Flip Text Generator",
      description: "Generate upside-down, mirrored, and reversed text for social-media.",
      category: "Fun",
    },
    {
      slug: "morse-code-translator",
      name: "Morse Code Translator",
      description: "Translate text to Morse code and Morse code back to text.",
      category: "Fun",
    },
    {
      slug: "roman-numeral-converter",
      name: "Roman Numeral Converter",
      description: "Convert numbers to Roman numerals and back.",
      category: "Fun",
    },
  ];