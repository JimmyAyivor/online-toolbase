// src/app/blog/blog-posts.ts

export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    category: string;
    readingTime: string;
    publishedAt: string;
    updatedAt?: string;
    coverEmoji: string;
    tags: string[];
    relatedTools: { label: string; href: string }[];
  };
  
  export const blogPosts: BlogPost[] = [
    {
      slug: "how-to-create-a-strong-password",
      title: "How to Create a Strong Password That's Actually Hard to Crack",
      description:
        "Most people think they have a strong password. Most of them are wrong. Here's what actually makes a password secure in 2025 — and why 'P@ssw0rd' stopped working years ago.",
      category: "Security",
      readingTime: "8 min read",
      publishedAt: "2025-01-06",
      coverEmoji: "🔐",
      tags: ["password security", "online safety", "cybersecurity"],
      relatedTools: [
        { label: "Password Generator", href: "/tools/password-generator" },
        { label: "Hash Generator", href: "/tools/hash-generator" },
      ],
    },
    {
      slug: "free-developer-tools-bookmarks",
      title: "15 Free Browser Tools Every Developer Should Have Open",
      description:
        "Not every dev task needs an IDE plugin or paid subscription. Here are 15 free browser-based tools for the daily stuff — JSON formatting, regex testing, JWT decoding — with zero setup friction.",
      category: "Developer",
      readingTime: "9 min read",
      publishedAt: "2025-01-10",
      coverEmoji: "🛠️",
      tags: ["developer tools", "productivity", "web development", "free tools"],
      relatedTools: [
        { label: "JSON Formatter & Validator", href: "/tools/json-formatter-validator" },
        { label: "Regex Tester", href: "/tools/regex-tester" },
        { label: "JWT Decoder", href: "/tools/jwt-decoder" },
      ],
    },
    {
      slug: "plagiarism-check-before-publishing",
      title: "How to Check Your Content for Plagiarism Before You Hit Publish",
      description:
        "Accidental plagiarism is more common than most writers think. Here's a practical step-by-step process for checking your work — whether you're a blogger, student, or freelancer writing for clients.",
      category: "Writing",
      readingTime: "7 min read",
      publishedAt: "2025-01-14",
      coverEmoji: "📝",
      tags: ["plagiarism", "content writing", "blogging", "SEO content"],
      relatedTools: [
        { label: "Plagiarism Checker", href: "/tools/plagiarism-checker" },
        { label: "Paraphrasing Tool", href: "/tools/paraphrasing-tool" },
        { label: "Grammar & Spell Checker", href: "/tools/grammar-spell-checker" },
      ],
    },
    {
      slug: "social-media-engagement-rate-2025",
      title: "Social Media Engagement Rates in 2025: Platform-by-Platform Benchmarks",
      description:
        "Engagement benchmarks have shifted significantly this year. TikTok is declining, LinkedIn is outperforming expectations, and Instagram static posts are beating Reels. Here's the full data breakdown.",
      category: "Social Media",
      readingTime: "9 min read",
      publishedAt: "2025-01-18",
      coverEmoji: "📊",
      tags: ["engagement rate", "social media", "instagram", "tiktok", "linkedin", "benchmarks"],
      relatedTools: [
        { label: "Engagement Rate Calculator", href: "/tools/engagement-rate-calculator" },
        { label: "Hashtag Generator", href: "/tools/hashtag-generator" },
      ],
    },
    {
      slug: "compound-interest-explained",
      title: "Compound Interest: Why Your Money Grows Faster Than You Expect",
      description:
        "Starting to save at 25 beats saving three times as much from 35. Compound interest is also why minimum credit card payments barely dent your balance. Here's exactly how the maths works.",
      category: "Finance",
      readingTime: "8 min read",
      publishedAt: "2025-01-22",
      coverEmoji: "💰",
      tags: ["compound interest", "personal finance", "savings", "investing"],
      relatedTools: [
        { label: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
        { label: "Loan & Mortgage Calculator", href: "/tools/loan-mortgage-calculator" },
      ],
    },
    {
      slug: "image-formats-webp-avif-jpeg",
      title: "AVIF vs WebP vs JPEG in 2025: Which Format Should You Actually Use?",
      description:
        "AVIF has become the web performance winner — up to 50% smaller than JPEG at the same quality. But switching isn't always straightforward. Here's the practical guide with real numbers.",
      category: "Web Performance",
      readingTime: "8 min read",
      publishedAt: "2025-01-26",
      coverEmoji: "🖼️",
      tags: ["image compression", "webp", "avif", "core web vitals", "website speed", "SEO"],
      relatedTools: [
        { label: "Image Compressor", href: "/tools/image-compressor" },
        { label: "Image Format Converter", href: "/tools/image-format-converter" },
      ],
    },
    {
      slug: "bmi-limitations-and-what-to-use-instead",
      title: "BMI: What It Measures, What It Misses, and Better Alternatives",
      description:
        "BMI was invented in the 1830s as a population statistic — not a personal health assessment. Here's what your number actually means, its four well-documented blind spots, and what to track instead.",
      category: "Health",
      readingTime: "7 min read",
      publishedAt: "2025-01-30",
      coverEmoji: "⚕️",
      tags: ["BMI", "health metrics", "body composition", "fitness"],
      relatedTools: [
        { label: "BMI Calculator", href: "/tools/bmi-calculator" },
        { label: "Body Fat Calculator", href: "/tools/body-fat-calculator" },
      ],
    },
    {
      slug: "qr-codes-small-business-uses",
      title: "10 Practical QR Code Uses for Small Businesses (With Setup Instructions)",
      description:
        "QR codes came back during the pandemic and never left — because they actually solve real problems. Here are 10 applications that work for small businesses, from review funnels to contactless menus.",
      category: "Business",
      readingTime: "8 min read",
      publishedAt: "2025-02-03",
      coverEmoji: "📱",
      tags: ["QR codes", "small business", "marketing", "contactless"],
      relatedTools: [
        { label: "QR Code Generator", href: "/tools/qr-code-generator" },
        { label: "Invoice Generator", href: "/tools/invoice-generator" },
      ],
    },
    {
      slug: "pomodoro-technique-guide",
      title: "The Pomodoro Technique: The Science Behind It and How to Adapt It to Real Work",
      description:
        "A kitchen timer and 25 minutes changed how millions of people work. Here's the cognitive science behind why it works, common mistakes that kill its effectiveness, and how to adjust it to your workflow.",
      category: "Productivity",
      readingTime: "8 min read",
      publishedAt: "2025-02-07",
      coverEmoji: "🍅",
      tags: ["pomodoro", "productivity", "time management", "focus", "deep work"],
      relatedTools: [
        { label: "Pomodoro Timer", href: "/tools/pomodoro-timer" },
      ],
    },
    {
      slug: "content-creator-free-tools",
      title: "The Content Creator's Free Toolkit: What's Actually Worth Using in 2025",
      description:
        "You don't need $200/month in subscriptions to produce professional content. Here are the genuinely useful free tools for writing, design, social media, and planning — and why each one earns its bookmark.",
      category: "Content Creation",
      readingTime: "10 min read",
      publishedAt: "2025-02-11",
      coverEmoji: "✨",
      tags: ["content creation", "free tools", "social media", "writing tools", "creators"],
      relatedTools: [
        { label: "Caption Generator", href: "/tools/caption-generator" },
        { label: "Hashtag Generator", href: "/tools/hashtag-generator" },
        { label: "Paraphrasing Tool", href: "/tools/paraphrasing-tool" },
      ],
    },
    {
      slug: "json-explained-for-developers",
      title: "JSON Explained: What It Is, How It Works, and Why It's Everywhere",
      description:
        "JSON powers almost every API, config file, and data exchange on the modern web. Here's a clear explanation of the format, common syntax errors that break parsers, and when to use something else.",
      category: "Developer",
      readingTime: "7 min read",
      publishedAt: "2025-02-15",
      coverEmoji: "{ }",
      tags: ["JSON", "API", "web development", "data formats", "developer tools"],
      relatedTools: [
        { label: "JSON Formatter & Validator", href: "/tools/json-formatter-validator" },
        { label: "Base64 Encoder/Decoder", href: "/tools/base64-encoder-decoder" },
      ],
    },
    {
      slug: "freelancer-invoicing-guide",
      title: "How to Invoice Clients as a Freelancer: What to Include and What to Avoid",
      description:
        "A professional invoice protects you legally, speeds up payment, and signals you're serious about your work. Here's exactly what every freelance invoice needs — and the common mistakes that delay payment.",
      category: "Business",
      readingTime: "8 min read",
      publishedAt: "2025-02-19",
      coverEmoji: "🧾",
      tags: ["freelancing", "invoicing", "small business", "getting paid"],
      relatedTools: [
        { label: "Invoice Generator", href: "/tools/invoice-generator" },
        { label: "VAT Calculator", href: "/tools/vat-calculator" },
      ],
    },
    {
      slug: "hashtags-how-they-work-2025",
      title: "How Hashtags Actually Work in 2025 (The Algorithm Has Moved On)",
      description:
        "Stuffing 30 hashtags into your caption stopped being a strategy years ago. Here's how hashtag algorithms actually work right now on Instagram, TikTok, and LinkedIn — and what approach genuinely drives reach.",
      category: "Social Media",
      readingTime: "8 min read",
      publishedAt: "2025-02-23",
      coverEmoji: "#️⃣",
      tags: ["hashtags", "social media algorithm", "instagram", "tiktok", "reach"],
      relatedTools: [
        { label: "Hashtag Generator", href: "/tools/hashtag-generator" },
        { label: "Social Media Character Counter", href: "/tools/social-media-character-counter" },
      ],
    },
    {
      slug: "regex-beginners-guide",
      title: "Regular Expressions for People Who Keep Avoiding Them",
      description:
        "Regex looks like line noise until you understand the dozen or so patterns that cover 90% of real-world use cases. This guide takes you from zero to confident with examples you'll actually use.",
      category: "Developer",
      readingTime: "9 min read",
      publishedAt: "2025-02-27",
      coverEmoji: "🔍",
      tags: ["regex", "regular expressions", "web development", "developer tools"],
      relatedTools: [
        { label: "Regex Tester", href: "/tools/regex-tester" },
        { label: "JSON Formatter & Validator", href: "/tools/json-formatter-validator" },
      ],
    },
    {
      slug: "calories-macros-what-to-track",
      title: "Calories vs Macros: What You Actually Need to Track (And When)",
      description:
        "Everyone has an opinion on whether you should count calories or track macros. The honest answer depends on your goal. Here's a clear breakdown of what each approach does, when it works, and how to calculate yours.",
      category: "Health",
      readingTime: "8 min read",
      publishedAt: "2025-03-01",
      coverEmoji: "🥗",
      tags: ["calories", "macros", "nutrition", "fitness", "weight loss"],
      relatedTools: [
        { label: "Calorie & Macro Calculator", href: "/tools/calorie-macro-calculator" },
        { label: "BMI Calculator", href: "/tools/bmi-calculator" },
      ],
    },
    {
      slug: "mortgage-calculator-complete-guide",
      title: "Using a Mortgage Calculator: What the Numbers Mean and What They Don't Show You",
      description:
        "Mortgage calculators are useful — if you know what to put in and what the output actually means. This guide explains every field, what moves your monthly payment, and the costs calculators typically hide.",
      category: "Finance",
      readingTime: "8 min read",
      publishedAt: "2025-03-05",
      coverEmoji: "🏠",
      tags: ["mortgage", "home buying", "personal finance", "loan"],
      relatedTools: [
        { label: "Loan & Mortgage Calculator", href: "/tools/loan-mortgage-calculator" },
        { label: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      ],
    },
    {
      slug: "linkedin-posts-that-get-engagement",
      title: "Why Your LinkedIn Posts Get No Engagement — And What to Do About It",
      description:
        "Most LinkedIn posts fail in the first two lines. The algorithm, audience, and content format are all different from every other platform. Here's what actually drives organic reach on LinkedIn right now.",
      category: "Social Media",
      readingTime: "8 min read",
      publishedAt: "2025-03-09",
      coverEmoji: "💼",
      tags: ["linkedin", "social media", "content strategy", "B2B marketing"],
      relatedTools: [
        { label: "LinkedIn Post Formatter", href: "/tools/linkedin-post-formatter" },
        { label: "Social Media Character Counter", href: "/tools/social-media-character-counter" },
      ],
    },
    {
      slug: "base64-encoding-explained",
      title: "What Is Base64 Encoding? A Clear Explanation with Real Examples",
      description:
        "Base64 shows up in auth headers, email attachments, data URIs, and JWT tokens — but most developers use it without really knowing what it does. Here's a clear, honest explanation of how it works and when to use it.",
      category: "Developer",
      readingTime: "6 min read",
      publishedAt: "2025-03-13",
      coverEmoji: "🔡",
      tags: ["base64", "encoding", "API", "developer tools", "web development"],
      relatedTools: [
        { label: "Base64 Encoder/Decoder", href: "/tools/base64-encoder-decoder" },
        { label: "JWT Decoder", href: "/tools/jwt-decoder" },
      ],
    },
    {
      slug: "unit-conversions-people-always-google",
      title: "The Unit Conversions People Search for Most — Memorised in 10 Minutes",
      description:
        "Km to miles, kg to lbs, Celsius to Fahrenheit — some conversions come up constantly and nobody seems to remember the factors. Here are the most-searched conversions with simple mental shortcuts that actually stick.",
      category: "Everyday",
      readingTime: "6 min read",
      publishedAt: "2025-03-17",
      coverEmoji: "📏",
      tags: ["unit conversion", "measurement", "metric", "imperial"],
      relatedTools: [
        { label: "Unit Converter", href: "/tools/unit-converter" },
        { label: "Currency Converter", href: "/tools/currency-converter" },
      ],
    },
    {
      slug: "how-to-calculate-roi-correctly",
      title: "How to Calculate ROI — And Why Most People Get the Formula Wrong",
      description:
        "ROI is one of the most cited metrics in business and one of the most misused. Here's the right formula, the mistakes that produce misleading results, and how to calculate it properly for marketing, projects, and investments.",
      category: "Business",
      readingTime: "7 min read",
      publishedAt: "2025-03-21",
      coverEmoji: "📈",
      tags: ["ROI", "business metrics", "marketing analytics", "investment"],
      relatedTools: [
        { label: "ROI Calculator", href: "/tools/roi-calculator" },
        { label: "Percentage Calculator", href: "/tools/percentage-calculator" },
      ],
    },
  ];
  
  export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find((p) => p.slug === slug);
  }
  
  export function getBlogPostsByCategory(category: string): BlogPost[] {
    return blogPosts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }