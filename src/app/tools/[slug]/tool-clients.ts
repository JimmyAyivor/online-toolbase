// Explicit map of slug -> dynamically imported Client component.
// Turbopack/webpack cannot resolve fully dynamic import paths at build time,
// so we must list each possible module explicitly.

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const toolClientComponents: Record<string, ComponentType<any>> = {
  "age-calculator": dynamic(() =>
    import("@/app/tools/age-calculator/AgeCalculatorClient"),
  ),
  "aspect-ratio-calculator": dynamic(() =>
    import("@/app/tools/aspect-ratio-calculator/ColorPaletteGeneratorClient"),
  ),
  "base64-encoder-decoder": dynamic(() =>
    import("@/app/tools/base64-encoder-decoder/Base64EncoderDecoderClient"),
  ),
  "bmi-calculator": dynamic(() =>
    import("@/app/tools/bmi-calculator/BmiCalculatorClient"),
  ),
  "body-fat-calculator": dynamic(() =>
    import("@/app/tools/body-fat-calculator/BodyFatCalculatorClient"),
  ),
  "background-remover": dynamic(() =>
    import("@/app/tools/background-remover/BackgroundRemoverClient"),
  ),
  "binary-hex-converter": dynamic(() =>
    import("@/app/tools/binary-hex-converter/BinaryHexConverterClient"),
  ),
  "calorie-macro-calculator": dynamic(() =>
    import("@/app/tools/calorie-macro-calculator/CalorieMacroCalculatorClient"),
  ),
  "caption-generator": dynamic(() =>
    import("@/app/tools/caption-generator/CaptionGeneratorClient"),
  ),
  "color-palette-generator": dynamic(() =>
    import("@/app/tools/color-palette-generator/ColorPaletteGeneratorClient"),
  ),
  "compound-interest-calculator": dynamic(() =>
    import(
      "@/app/tools/compound-interest-calculator/CompoundInterestCalculatorClient"
    ),
  ),
  "content-calendar-planner": dynamic(() =>
    import("@/app/tools/content-calendar-planner/ContentCalendarPlannerClient"),
  ),
  "cron-expression-builder": dynamic(() =>
    import("@/app/tools/cron-expression-builder/CronExpressionBuilderClient"),
  ),
  "currency-converter": dynamic(() =>
    import("@/app/tools/currency-converter/CurrencyConverterClient"),
  ),
  "date-difference-calculator": dynamic(() =>
    import("@/app/tools/date-difference-calculator/DateDifferenceCalculatorClient"),
  ),
  "dice-roller": dynamic(() => import("@/app/tools/dice-roller/DiceRollerClient")),
  "discount-calculator": dynamic(() =>
    import("@/app/tools/discount-calculator/DiscountCalculatorClient"),
  ),
  "email-validator": dynamic(() =>
    import("@/app/tools/email-validator/EmailValidatorClient"),
  ),
  "engagement-rate-calculator": dynamic(() =>
    import("@/app/tools/engagement-rate-calculator/EngagementRateCalculatorClient"),
  ),
  "essay-title-generator": dynamic(() =>
    import("@/app/tools/essay-title-generator/EssayTitleGeneratorClient"),
  ),
  "facebook-ad-copy-generator": dynamic(() =>
    import("@/app/tools/facebook-ad-copy-generator/FacebookAdCopyGeneratorClient"),
  ),
  "favicon-generator": dynamic(() =>
    import("@/app/tools/favicon-generator/FaviconGeneratorClient"),
  ),
  "fraction-calculator": dynamic(() =>
    import("@/app/tools/fraction-calculator/FractionCalculatorClient"),
  ),
  "grammar-spell-checker": dynamic(() =>
    import("@/app/tools/grammar-spell-checker/GrammarSpellCheckerClient"),
  ),
  "gpa-calculator": dynamic(() => import("@/app/tools/gpa-calculator/GpaCalculatorClient")),
  "hash-generator": dynamic(() => import("@/app/tools/hash-generator/HashGeneratorClient")),
  "hashtag-generator": dynamic(() =>
    import("@/app/tools/hashtag-generator/HashtagGeneratorClient"),
  ),
  "hex-color-code-generator": dynamic(() =>
    import("@/app/tools/hex-color-code-generator/HexColorCodeGeneratorClient"),
  ),
  "html-entity-encoder": dynamic(() =>
    import("@/app/tools/html-entity-encoder/HtmlEntityEncoderClient"),
  ),
  "image-compressor": dynamic(() =>
    import("@/app/tools/image-compressor/ImageCompressorClient"),
  ),
  "image-cropper-resizer": dynamic(() =>
    import("@/app/tools/image-cropper-resizer/ImageCropperResizerClient"),
  ),
  "image-format-converter": dynamic(() =>
    import("@/app/tools/image-format-converter/ImageFormatConverterClient"),
  ),
  "instagram-post-planner": dynamic(() =>
    import("@/app/tools/instagram-post-planner/InstagramPostPlannerClient"),
  ),
  "invoice-generator": dynamic(() =>
    import("@/app/tools/invoice-generator/InvoiceGeneratorClient"),
  ),
  "ip-address-lookup": dynamic(() =>
    import("@/app/tools/ip-address-lookup/IpAddressLookupClient"),
  ),
  "json-formatter-validator": dynamic(() =>
    import("@/app/tools/json-formatter-validator/JsonFormatterValidatorClient"),
  ),
  "jwt-decoder": dynamic(() => import("@/app/tools/jwt-decoder/JwtDecoderClient")),
  "linkedin-post-formatter": dynamic(() =>
    import("@/app/tools/linkedin-post-formatter/LinkedInPostFormatterClient"),
  ),
  "loan-mortgage-calculator": dynamic(() =>
    import("@/app/tools/loan-mortgage-calculator/LoanMortgageCalculatorClient"),
  ),
  "lorem-ipsum-generator": dynamic(() =>
    import("@/app/tools/lorem-ipsum-generator/LoremIpsumGeneratorClient"),
  ),
  "markdown-to-html-converter": dynamic(() =>
    import("@/app/tools/markdown-to-html-converter/MarkdownToHtmlConverterClient"),
  ),
  "meme-generator": dynamic(() => import("@/app/tools/meme-generator/MemeGeneratorClient")),
  "meta-tag-generator": dynamic(() =>
    import("@/app/tools/meta-tag-generator/MetaTagGeneratorClient"),
  ),
  "mortgage-calculator": dynamic(() =>
    import("@/app/tools/mortgage-calculator/ColorPaletteGeneratorClient"),
  ),
  "paraphrasing-tool": dynamic(() =>
    import("@/app/tools/paraphrasing-tool/ParaphrasingToolClient"),
  ),
  "password-generator": dynamic(() =>
    import("@/app/tools/password-generator/PasswordGeneratorClient"),
  ),
  "percentage-calculator": dynamic(() =>
    import("@/app/tools/percentage-calculator/PercentageCalculatorClient"),
  ),
  "pdf-merger-splitter": dynamic(() =>
    import("@/app/tools/pdf-merger-splitter/PdfMergerSplitterClient"),
  ),
  "plagiarism-checker": dynamic(() =>
    import("@/app/tools/plagiarism-checker/PlagiarismCheckerClient"),
  ),
  "pomodoro-timer": dynamic(() => import("@/app/tools/pomodoro-timer/PomodoroTimerClient")),
  "profile-picture-resizer": dynamic(() =>
    import("@/app/tools/profile-picture-resizer/ProfilePictureResizerClient"),
  ),
  "qr-code-generator": dynamic(() =>
    import("@/app/tools/qr-code-generator/QrCodeGeneratorClient"),
  ),
  "random-name-generator": dynamic(() =>
    import("@/app/tools/random-name-generator/RandomNameGeneratorClient"),
  ),
  "random-number-generator": dynamic(() =>
    import("@/app/tools/random-number-generator/RandomNumberGeneratorClient"),
  ),
  "reading-time-estimator": dynamic(() =>
    import("@/app/tools/reading-time-estimator/ReadingTimeEstimatorClient"),
  ),
  "regex-tester": dynamic(() => import("@/app/tools/regex-tester/RegexTesterClient")),
  "resume-builder": dynamic(() => import("@/app/tools/resume-builder/ResumeBuilderClient")),
  "rhyme-finder": dynamic(() => import("@/app/tools/rhyme-finder/RhymeFinderClient")),
  "roi-calculator": dynamic(() => import("@/app/tools/roi-calculator/RoiCalculatorClient")),
  "sales-tax-calculator": dynamic(() =>
    import("@/app/tools/sales-tax-calculator/SalesTaxCalculatorClient"),
  ),
  "scientific-calculator": dynamic(() =>
    import("@/app/tools/scientific-calculator/ScientificCalculatorClient"),
  ),
  "sentence-counter": dynamic(() =>
    import("@/app/tools/sentence-counter/SentenceCounterClient"),
  ),
  "signature-generator": dynamic(() =>
    import("@/app/tools/signature-generator/SignatureGeneratorClient"),
  ),
  "social-media-audit": dynamic(() =>
    import("@/app/tools/social-media-audit/SocialMediaAuditClient"),
  ),
  "social-media-bio-generator": dynamic(() =>
    import("@/app/tools/social-media-bio-generator/SocialMediaBioGeneratorClient"),
  ),
  "social-media-character-counter": dynamic(() =>
    import("@/app/tools/social-media-character-counter/SocialMediaCharacterCounterClient"),
  ),
  "text-case-converter": dynamic(() =>
    import("@/app/tools/text-case-converter/TextCaseConverterClient"),
  ),
  "text-difference-checker": dynamic(() =>
    import("@/app/tools/text-difference-checker/TextDifferenceCheckerClient"),
  ),
  "text-summarizer": dynamic(() =>
    import("@/app/tools/text-summarizer/TextSummarizerClient"),
  ),
  "text-to-bullet-points": dynamic(() =>
    import("@/app/tools/text-to-bullet-points/TextToBulletPointsClient"),
  ),
  "tiktok-hook-generator": dynamic(() =>
    import("@/app/tools/tiktok-hook-generator/TikTokHookGeneratorClient"),
  ),
  "time-zone-converter": dynamic(() =>
    import("@/app/tools/time-zone-converter/TimeZoneConverterClient"),
  ),
  "tip-calculator": dynamic(() => import("@/app/tools/tip-calculator/TipCalculatorClient")),
  "unit-converter": dynamic(() => import("@/app/tools/unit-converter/UnitConverterClient")),
  "url-encoder-decoder": dynamic(() =>
    import("@/app/tools/url-encoder-decoder/UrlEncoderDecoderClient"),
  ),
  "uuid-guid-generator": dynamic(() =>
    import("@/app/tools/uuid-guid-generator/UuidGuidGeneratorClient"),
  ),
  "vat-calculator": dynamic(() => import("@/app/tools/vat-calculator/VatCalculatorClient")),
  "viral-hook-generator": dynamic(() =>
    import("@/app/tools/viral-hook-generator/ViralHookGeneratorClient"),
  ),
  "word-character-counter": dynamic(() =>
    import("@/app/tools/word-character-counter/WordCharacterCounterClient"),
  ),
  "word-frequency-counter": dynamic(() =>
    import("@/app/tools/word-frequency-counter/WordFrequencyCounterClient"),
  ),
  "writing-prompt-generator": dynamic(() =>
    import("@/app/tools/writing-prompt-generator/WritingPromptGeneratorClient"),
  ),
  "youtube-title-description-generator": dynamic(() =>
    import("@/app/tools/youtube-title-description-generator/YouTubeTitleDescriptionGeneratorClient"),
  ),
};
