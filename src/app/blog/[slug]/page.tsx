// src/app/blog/[slug]/page.tsx
// Semrush-inspired editorial layout:
//  • Dark gradient hero with category pill, title, description, meta bar
//  • Two-column body: wide article + sticky right sidebar
//  • Key Takeaways box (numbered, accent-bordered)
//  • Sticky Table of Contents in sidebar with scroll-spy via client component
//  • Clean prose with custom heading anchors
//  • Share bar (X, LinkedIn)
//  • Related Tools CTA (indigo gradient card)
//  • Sidebar: TOC + Tools widget + "Browse All Tools" promo card

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "../blog-posts";
import BlogPostClient from "./BlogPostClient";
import SidebarPromoWidgets from "@/components/SidebarPromoWidgets";
import { tools } from "@/lib/tools";
const tool = tools.find((t) => t.slug === "age-calculator");

// ─── Static import map ────────────────────────────────────────────────────────
// ── Existing posts ─────────────────────────────────────────────────────────
import Base64EncodingExplained from "../content/base64-encoding-explained";
import BmiLimitationsAndWhatToUseInstead from "../content/bmi-limitations-and-what-to-use-instead";
import CaloriesMacrosWhatToTrack from "../content/calories-macros-what-to-track";
import CompoundInterestExplainedOld from "../content/compound-interest-explained";
import ContentCreatorFreeTools from "../content/content-creator-free-tools";
import FreeDeveloperToolsBookmarks from "../content/free-developer-tools-bookmarks";
import FreelancerInvoicingGuide from "../content/freelancer-invoicing-guide";
import HashtagsHowTheyWork2025 from "../content/hashtags-how-they-work-2025";
import HowToCalculateRoiCorrectly from "../content/how-to-calculate-roi-correctly";
import HowToCreateAStrongPassword from "../content/how-to-create-a-strong-password";
import ImageFormatsWebpAvifJpeg from "../content/image-formats-webp-avif-jpeg";
import JsonExplainedForDevelopers from "../content/json-explained-for-developers";
import LinkedinPostsThatGetEngagement from "../content/linkedin-posts-that-get-engagement";
import MortgageCalculatorCompleteGuide from "../content/mortgage-calculator-complete-guide";
import PlagiarismCheckBeforePublishing from "../content/plagiarism-check-before-publishing";
import PomodoroTechniqueGuide from "../content/pomodoro-technique-guide";
import QrCodesSmallBusinessUses from "../content/qr-codes-small-business-uses";
import RegexBeginnersGuide from "../content/regex-beginners-guide";
import SocialMediaEngagementRate2025 from "../content/social-media-engagement-rate-2025";
import UnitConversionsPeopleAlwaysGoogle from "../content/unit-conversions-people-always-google";
import YoutubeTitlesAndDescriptionsSeoGuide from "../content/youtube-titles-and-descriptions-seo-guide";

// ── New posts ──────────────────────────────────────────────────────────────
import AspectRatiosExplainedForDesignersAndVideo from "../content/aspect-ratios-explained-for-designers-and-video";
import BinaryHexadecimalDecimalNumberSystemsExplained from "../content/binary-hexadecimal-decimal-number-systems-explained";
import BinaryToTextConversionExplained from "../content/binary-to-text-conversion-explained";
import CalorieDeficitHowToCreateOneSafely from "../content/calorie-deficit-how-to-create-one-safely";
import ColorContrastAccessibilityWcagGuide from "../content/color-contrast-accessibility-wcag-guide";
import ColorPaletteTheoryForNonDesigners from "../content/color-palette-theory-for-non-designers";
import CountdownTimersForProductivityAndEvents from "../content/countdown-timers-for-productivity-and-events";
import CreditCardDebtPayoffStrategies from "../content/credit-card-debt-payoff-strategies";
import CronJobsExplainedSchedulingGuide from "../content/cron-jobs-explained-scheduling-guide";
import CssGradientsCompleteGuide from "../content/css-gradients-complete-guide";
import DiceProbabilityForTabletopGamers from "../content/dice-probability-for-tabletop-gamers";
import EmailSignatureBestPractices from "../content/email-signature-best-practices";
import EmailSubjectLinesThatGetOpened from "../content/email-subject-lines-that-get-opened";
import EmailValidationHowItWorksAndWhyItFails from "../content/email-validation-how-it-works-and-why-it-fails";
import FacebookAdCopyThatConverts from "../content/facebook-ad-copy-that-converts";
import FaviconGuideAllSizesAndFormats from "../content/favicon-guide-all-sizes-and-formats";
import FleschKincaidAndReadabilityScoresExplained from "../content/flesch-kincaid-and-readability-scores-explained";
import FlipTextAndUnicodeTricksForSocialMedia from "../content/flip-text-and-unicode-tricks-for-social-media";
import FractionsHowToAddSubtractMultiplyDivide from "../content/fractions-how-to-add-subtract-multiply-divide";
import GrammarMistakesThatMakeYouLookUnprofessional from "../content/grammar-mistakes-that-make-you-look-unprofessional";
import HashtagStrategyThatActuallyGrowsReach from "../content/hashtag-strategy-that-actually-grows-reach";
import HexRgbHslColorFormatsExplained from "../content/hex-rgb-hsl-color-formats-explained";
import HourlyToSalaryConversionGuide from "../content/hourly-to-salary-conversion-guide";
import HowCurrencyExchangeRatesWork from "../content/how-currency-exchange-rates-work";
import HowGpaIsCalculated from "../content/how-gpa-is-calculated";
import HowLongShouldABlogPostBe from "../content/how-long-should-a-blog-post-be";
import HowMeetingsAreDrainingYourBudget from "../content/how-meetings-are-draining-your-budget";
import HowMortgagePaymentsAreCalculated from "../content/how-mortgage-payments-are-calculated";
import HowMuchMortgageCanIAfford from "../content/how-much-mortgage-can-i-afford";
import HowMuchProteinDoYouActuallyNeed from "../content/how-much-protein-do-you-actually-need";
import HowMuchRentCanIAfford from "../content/how-much-rent-can-i-afford";
import HowMuchWaterShouldYouDrinkPerDay from "../content/how-much-water-should-you-drink-per-day";
import HowQrCodesWorkAndBestPractices from "../content/how-qr-codes-work-and-best-practices";
import HowRhymeSchemesWorkInPoetryAndSongwriting from "../content/how-rhyme-schemes-work-in-poetry-and-songwriting";
import HowToBeatWritersBlockWithPromptsAndPractice from "../content/how-to-beat-writers-block-with-prompts-and-practice";
import HowToBuildAContentCalendar from "../content/how-to-build-a-content-calendar";
import HowToBuildAMonthlyBudgetThatWorks from "../content/how-to-build-a-monthly-budget-that-works";
import HowToCalculateATipTheRightWay from "../content/how-to-calculate-a-tip-the-right-way";
import HowToCalculateCryptoProfitAndLoss from "../content/how-to-calculate-crypto-profit-and-loss";
import HowToCalculateDaysBetweenDates from "../content/how-to-calculate-days-between-dates";
import HowToCalculateDiscountsAndOriginalPrices from "../content/how-to-calculate-discounts-and-original-prices";
import HowToCalculateExactAge from "../content/how-to-calculate-exact-age";
import HowToCalculateInvestmentReturns from "../content/how-to-calculate-investment-returns";
import HowToCalculateRoi from "../content/how-to-calculate-roi";
import HowToCalculateYourDailyCalorieNeeds from "../content/how-to-calculate-your-daily-calorie-needs";
import HowToCalculateYourFreelanceRate from "../content/how-to-calculate-your-freelance-rate";
import HowToCalculateYourNetWorth from "../content/how-to-calculate-your-net-worth";
import HowToCheckForPlagiarism from "../content/how-to-check-for-plagiarism";
import HowToChooseABusinessName from "../content/how-to-choose-a-business-name";
import HowToCompareTwoVersionsOfADocument from "../content/how-to-compare-two-versions-of-a-document";
import HowToCreateAMemorableAcronym from "../content/how-to-create-a-memorable-acronym";
import HowToCreateAProfessionalInvoice from "../content/how-to-create-a-professional-invoice";
import HowToCreateStrongPasswords from "../content/how-to-create-strong-passwords";
import HowToEvaluateAPayRaise from "../content/how-to-evaluate-a-pay-raise";
import HowToFormatAndValidateJson from "../content/how-to-format-and-validate-json";
import HowToMakeAMemeThatActuallySpreads from "../content/how-to-make-a-meme-that-actually-spreads";
import HowToMeasureBodyFatPercentageAccurately from "../content/how-to-measure-body-fat-percentage-accurately";
import HowToMergeAndSplitPdfFiles from "../content/how-to-merge-and-split-pdf-files";
import HowToParaphraseWithoutPlagiarising from "../content/how-to-paraphrase-without-plagiarising";
import HowToPickHexColorsForYourBrand from "../content/how-to-pick-hex-colors-for-your-brand";
import HowToReachASavingsGoalFaster from "../content/how-to-reach-a-savings-goal-faster";
import HowToRemoveImageBackgrounds from "../content/how-to-remove-image-backgrounds";
import HowToSummariseLongContentEffectively from "../content/how-to-summarise-long-content-effectively";
import HowToUseAStopwatchForProductivityAndSport from "../content/how-to-use-a-stopwatch-for-productivity-and-sport";
import HowToWriteAResumeThatGetsInterviews from "../content/how-to-write-a-resume-that-gets-interviews";
import HowToWriteASloganThatSticks from "../content/how-to-write-a-slogan-that-sticks";
import HowToWriteASocialMediaBioThatConverts from "../content/how-to-write-a-social-media-bio-that-converts";
import HowToWriteATitleThatGetsClicksAndReads from "../content/how-to-write-a-title-that-gets-clicks-and-reads";
import HowToWriteATwitterThreadThatGetsRead from "../content/how-to-write-a-twitter-thread-that-gets-read";
import HtmlEntitiesXssPreventionGuide from "../content/html-entities-xss-prevention-guide";
import IdealWeightFormulasWhatTheyMean from "../content/ideal-weight-formulas-what-they-mean";
import ImageCompressionGuideForFasterWebsites from "../content/image-compression-guide-for-faster-websites";
import ImageResizingGuideForWebAndSocial from "../content/image-resizing-guide-for-web-and-social";
import InstagramPostPlanningGuide from "../content/instagram-post-planning-guide";
import JsonToCsvWhenAndHowToConvert from "../content/json-to-csv-when-and-how-to-convert";
import JwtTokensExplained from "../content/jwt-tokens-explained";
import KeywordDensityWhatItIsAndWhyItMattersLessThanYouThink from "../content/keyword-density-what-it-is-and-why-it-matters-less-than-you-think";
import LinkedinPostFormattingForBetterReach from "../content/linkedin-post-formatting-for-better-reach";
import MacroCalculatorHowToSetYourTargets from "../content/macro-calculator-how-to-set-your-targets";
import MarkdownSyntaxCompleteReference from "../content/markdown-syntax-complete-reference";
import Md5Sha1Sha256WhichHashToUse from "../content/md5-sha1-sha256-which-hash-to-use";
import MetaTagsCompleteGuideForSeo from "../content/meta-tags-complete-guide-for-seo";
import MetricVsImperialUnitConversionGuide from "../content/metric-vs-imperial-unit-conversion-guide";
import MorseCodeHistoryAndHowItWorks from "../content/morse-code-history-and-how-it-works";
import OpenGraphImagesSocialSharingGuide from "../content/open-graph-images-social-sharing-guide";
import OvulationAndFertileWindowExplained from "../content/ovulation-and-fertile-window-explained";
import PercentageCalculationsExplained from "../content/percentage-calculations-explained";
import PngJpgWebpWhichImageFormatToUse from "../content/png-jpg-webp-which-image-format-to-use";
import PomodoroTechniqueHowItWorks from "../content/pomodoro-technique-how-it-works";
import PregnancyDueDateCalculationExplained from "../content/pregnancy-due-date-calculation-explained";
import ProfilePictureSizesForEveryPlatform from "../content/profile-picture-sizes-for-every-platform";
import RandomNameGeneratorUses from "../content/random-name-generator-uses";
import RandomNumberGenerationExplained from "../content/random-number-generation-explained";
import RegularExpressionsPracticalGuide from "../content/regular-expressions-practical-guide";
import RetirementPlanningHowMuchDoYouNeed from "../content/retirement-planning-how-much-do-you-need";
import RobotsTxtCompleteGuide from "../content/robots-txt-complete-guide";
import RomanNumeralsExplained from "../content/roman-numerals-explained";
import RunningPaceGuideForEveryRaceDistance from "../content/running-pace-guide-for-every-race-distance";
import ScientificCalculatorFunctionsExplained from "../content/scientific-calculator-functions-explained";
import SentenceLengthAndReadability from "../content/sentence-length-and-readability";
import SleepCyclesHowToWakeUpFeelingRested from "../content/sleep-cycles-how-to-wake-up-feeling-rested";
import SocialMediaAuditHowToDoOne from "../content/social-media-audit-how-to-do-one";
import SocialMediaCharacterLimitsByPlatform from "../content/social-media-character-limits-by-platform";
import SocialMediaEngagementRateExplained from "../content/social-media-engagement-rate-explained";
import SpeedDistanceTimeCalculations from "../content/speed-distance-time-calculations";
import TextCaseStylesExplained from "../content/text-case-styles-explained";
import TextRepeaterUseCasesAndApplications from "../content/text-repeater-use-cases-and-applications";
import TiktokHooksThatStopTheScroll from "../content/tiktok-hooks-that-stop-the-scroll";
import TimeZoneConversionGuideForRemoteTeams from "../content/time-zone-conversion-guide-for-remote-teams";
import UnixTimestampsExplained from "../content/unix-timestamps-explained";
import UrlEncodingExplained from "../content/url-encoding-explained";
import UsSalesTaxExplainedByState from "../content/us-sales-tax-explained-by-state";
import VatExplainedHowToAddAndRemoveIt from "../content/vat-explained-how-to-add-and-remove-it";
import ViralHooksForSocialMedia from "../content/viral-hooks-for-social-media";
import WhatIsAUuidAndWhenToUseOne from "../content/what-is-a-uuid-and-when-to-use-one";
import WhatIsLoremIpsumAndWhyDesignersUseIt from "../content/what-is-lorem-ipsum-and-why-designers-use-it";
import WhatYourIpAddressRevealsAboutYou from "../content/what-your-ip-address-reveals-about-you";
import WhenToSpellOutNumbersInWriting from "../content/when-to-spell-out-numbers-in-writing";
import WhenToUseBulletPointsAndWhenNotTo from "../content/when-to-use-bullet-points-and-when-not-to";
import WhyHtmlMinificationMattersForPageSpeed from "../content/why-html-minification-matters-for-page-speed";
import WhyLiveWordCountMakesYouAFasterWriter from "../content/why-live-word-count-makes-you-a-faster-writer";
import WordCountTargetsForEveryContentType from "../content/word-count-targets-for-every-content-type";
import WordFrequencyAnalysisForBetterWriting from "../content/word-frequency-analysis-for-better-writing";
import WritingCaptionsForSocialMedia from "../content/writing-captions-for-social-media";
// ── New posts (security tools) ─────────────────────────────────────────────
import WasMyPasswordInADataBreachHowToCheckSafely from "../content/was-my-password-in-a-data-breach-how-to-check-safely";
import HowToVerifyAFileChecksumAndWhyItMatters from "../content/how-to-verify-a-file-checksum-and-why-it-matters";
import DicewarePassphrasesVsRandomPasswordsWhichIsStronger from "../content/diceware-passphrases-vs-random-passwords-which-is-stronger";
import HowToEncryptTextWithAPassphraseAesExplained from "../content/how-to-encrypt-text-with-a-passphrase-aes-explained";
import HowTotpTwoFactorAuthenticationCodesActuallyWork from "../content/how-totp-two-factor-authentication-codes-actually-work";
// ── New posts (Document / PDF cluster) ─────────────────────────────────────
import HowToPasswordProtectAndRedactAPdfBeforeSharing from "../content/how-to-password-protect-and-redact-a-pdf-before-sharing";
import ReorganizingAPdfRotateReorderDeleteCropNumberPages from "../content/reorganizing-a-pdf-rotate-reorder-delete-crop-number-pages";
import ConvertingFilesToAndFromPdfAPracticalGuide from "../content/converting-files-to-and-from-pdf-a-practical-guide";
import FillingEditingAndExtractingDataFromPdfs from "../content/filling-editing-and-extracting-data-from-pdfs";
import CompressingComparingAndFlatteningPdfsWhenEachMatters from "../content/compressing-comparing-and-flattening-pdfs-when-each-matters";
// ── New posts (Fun / word games cluster) ────────────────────────────────────
import HowWordUnscramblersAndAnagramSolversActuallyWork from "../content/how-word-unscramblers-and-anagram-solvers-actually-work";
import HowToSolveWordleFasterAndCrackAnyCrosswordClue from "../content/how-to-solve-wordle-faster-and-crack-any-crossword-clue";
import MakingWordPuzzlesForClassroomsAndGameNights from "../content/making-word-puzzles-for-classrooms-and-game-nights";
import SubscribeForm from "@/components/SubscribeForm";
import Link from "next/link";

const CONTENT_MAP: Record<string, React.ComponentType> = {
  // ── Existing posts ──────────────────────────────────────────────────────
  "base64-encoding-explained": Base64EncodingExplained,
  "bmi-limitations-and-what-to-use-instead": BmiLimitationsAndWhatToUseInstead,
  "calories-macros-what-to-track": CaloriesMacrosWhatToTrack,
  "compound-interest-explained": CompoundInterestExplainedOld,
  "content-creator-free-tools": ContentCreatorFreeTools,
  "free-developer-tools-bookmarks": FreeDeveloperToolsBookmarks,
  "freelancer-invoicing-guide": FreelancerInvoicingGuide,
  "hashtags-how-they-work-2025": HashtagsHowTheyWork2025,
  "how-to-calculate-roi-correctly": HowToCalculateRoiCorrectly,
  "how-to-create-a-strong-password": HowToCreateAStrongPassword,
  "image-formats-webp-avif-jpeg": ImageFormatsWebpAvifJpeg,
  "json-explained-for-developers": JsonExplainedForDevelopers,
  "linkedin-posts-that-get-engagement": LinkedinPostsThatGetEngagement,
  "mortgage-calculator-complete-guide": MortgageCalculatorCompleteGuide,
  "plagiarism-check-before-publishing": PlagiarismCheckBeforePublishing,
  "pomodoro-technique-guide": PomodoroTechniqueGuide,
  "qr-codes-small-business-uses": QrCodesSmallBusinessUses,
  "regex-beginners-guide": RegexBeginnersGuide,
  "social-media-engagement-rate-2025": SocialMediaEngagementRate2025,
  "unit-conversions-people-always-google": UnitConversionsPeopleAlwaysGoogle,
  "youtube-titles-and-descriptions-seo-guide":
    YoutubeTitlesAndDescriptionsSeoGuide,
  // ── New posts ────────────────────────────────────────────────────────────
  "aspect-ratios-explained-for-designers-and-video":
    AspectRatiosExplainedForDesignersAndVideo,
  "binary-hexadecimal-decimal-number-systems-explained":
    BinaryHexadecimalDecimalNumberSystemsExplained,
  "binary-to-text-conversion-explained": BinaryToTextConversionExplained,
  "calorie-deficit-how-to-create-one-safely":
    CalorieDeficitHowToCreateOneSafely,
  "color-contrast-accessibility-wcag-guide":
    ColorContrastAccessibilityWcagGuide,
  "color-palette-theory-for-non-designers": ColorPaletteTheoryForNonDesigners,
  "countdown-timers-for-productivity-and-events":
    CountdownTimersForProductivityAndEvents,
  "credit-card-debt-payoff-strategies": CreditCardDebtPayoffStrategies,
  "cron-jobs-explained-scheduling-guide": CronJobsExplainedSchedulingGuide,
  "css-gradients-complete-guide": CssGradientsCompleteGuide,
  "dice-probability-for-tabletop-gamers": DiceProbabilityForTabletopGamers,
  "email-signature-best-practices": EmailSignatureBestPractices,
  "email-subject-lines-that-get-opened": EmailSubjectLinesThatGetOpened,
  "email-validation-how-it-works-and-why-it-fails":
    EmailValidationHowItWorksAndWhyItFails,
  "facebook-ad-copy-that-converts": FacebookAdCopyThatConverts,
  "favicon-guide-all-sizes-and-formats": FaviconGuideAllSizesAndFormats,
  "flesch-kincaid-and-readability-scores-explained":
    FleschKincaidAndReadabilityScoresExplained,
  "flip-text-and-unicode-tricks-for-social-media":
    FlipTextAndUnicodeTricksForSocialMedia,
  "fractions-how-to-add-subtract-multiply-divide":
    FractionsHowToAddSubtractMultiplyDivide,
  "grammar-mistakes-that-make-you-look-unprofessional":
    GrammarMistakesThatMakeYouLookUnprofessional,
  "hashtag-strategy-that-actually-grows-reach":
    HashtagStrategyThatActuallyGrowsReach,
  "hex-rgb-hsl-color-formats-explained": HexRgbHslColorFormatsExplained,
  "hourly-to-salary-conversion-guide": HourlyToSalaryConversionGuide,
  "how-currency-exchange-rates-work": HowCurrencyExchangeRatesWork,
  "how-gpa-is-calculated": HowGpaIsCalculated,
  "how-long-should-a-blog-post-be": HowLongShouldABlogPostBe,
  "how-meetings-are-draining-your-budget": HowMeetingsAreDrainingYourBudget,
  "how-mortgage-payments-are-calculated": HowMortgagePaymentsAreCalculated,
  "how-much-mortgage-can-i-afford": HowMuchMortgageCanIAfford,
  "how-much-protein-do-you-actually-need": HowMuchProteinDoYouActuallyNeed,
  "how-much-rent-can-i-afford": HowMuchRentCanIAfford,
  "how-much-water-should-you-drink-per-day": HowMuchWaterShouldYouDrinkPerDay,
  "how-qr-codes-work-and-best-practices": HowQrCodesWorkAndBestPractices,
  "how-rhyme-schemes-work-in-poetry-and-songwriting":
    HowRhymeSchemesWorkInPoetryAndSongwriting,
  "how-to-beat-writers-block-with-prompts-and-practice":
    HowToBeatWritersBlockWithPromptsAndPractice,
  "how-to-build-a-content-calendar": HowToBuildAContentCalendar,
  "how-to-build-a-monthly-budget-that-works": HowToBuildAMonthlyBudgetThatWorks,
  "how-to-calculate-a-tip-the-right-way": HowToCalculateATipTheRightWay,
  "how-to-calculate-crypto-profit-and-loss": HowToCalculateCryptoProfitAndLoss,
  "how-to-calculate-days-between-dates": HowToCalculateDaysBetweenDates,
  "how-to-calculate-discounts-and-original-prices":
    HowToCalculateDiscountsAndOriginalPrices,
  "how-to-calculate-exact-age": HowToCalculateExactAge,
  "how-to-calculate-investment-returns": HowToCalculateInvestmentReturns,
  "how-to-calculate-roi": HowToCalculateRoi,
  "how-to-calculate-your-daily-calorie-needs":
    HowToCalculateYourDailyCalorieNeeds,
  "how-to-calculate-your-freelance-rate": HowToCalculateYourFreelanceRate,
  "how-to-calculate-your-net-worth": HowToCalculateYourNetWorth,
  "how-to-check-for-plagiarism": HowToCheckForPlagiarism,
  "how-to-choose-a-business-name": HowToChooseABusinessName,
  "how-to-compare-two-versions-of-a-document":
    HowToCompareTwoVersionsOfADocument,
  "how-to-create-a-memorable-acronym": HowToCreateAMemorableAcronym,
  "how-to-create-a-professional-invoice": HowToCreateAProfessionalInvoice,
  "how-to-create-strong-passwords": HowToCreateStrongPasswords,
  "how-to-evaluate-a-pay-raise": HowToEvaluateAPayRaise,
  "how-to-format-and-validate-json": HowToFormatAndValidateJson,
  "how-to-make-a-meme-that-actually-spreads": HowToMakeAMemeThatActuallySpreads,
  "how-to-measure-body-fat-percentage-accurately":
    HowToMeasureBodyFatPercentageAccurately,
  "how-to-merge-and-split-pdf-files": HowToMergeAndSplitPdfFiles,
  "how-to-paraphrase-without-plagiarising": HowToParaphraseWithoutPlagiarising,
  "how-to-pick-hex-colors-for-your-brand": HowToPickHexColorsForYourBrand,
  "how-to-reach-a-savings-goal-faster": HowToReachASavingsGoalFaster,
  "how-to-remove-image-backgrounds": HowToRemoveImageBackgrounds,
  "how-to-summarise-long-content-effectively":
    HowToSummariseLongContentEffectively,
  "how-to-use-a-stopwatch-for-productivity-and-sport":
    HowToUseAStopwatchForProductivityAndSport,
  "how-to-write-a-resume-that-gets-interviews":
    HowToWriteAResumeThatGetsInterviews,
  "how-to-write-a-slogan-that-sticks": HowToWriteASloganThatSticks,
  "how-to-write-a-social-media-bio-that-converts":
    HowToWriteASocialMediaBioThatConverts,
  "how-to-write-a-title-that-gets-clicks-and-reads":
    HowToWriteATitleThatGetsClicksAndReads,
  "how-to-write-a-twitter-thread-that-gets-read":
    HowToWriteATwitterThreadThatGetsRead,
  "html-entities-xss-prevention-guide": HtmlEntitiesXssPreventionGuide,
  "ideal-weight-formulas-what-they-mean": IdealWeightFormulasWhatTheyMean,
  "image-compression-guide-for-faster-websites":
    ImageCompressionGuideForFasterWebsites,
  "image-resizing-guide-for-web-and-social": ImageResizingGuideForWebAndSocial,
  "instagram-post-planning-guide": InstagramPostPlanningGuide,
  "json-to-csv-when-and-how-to-convert": JsonToCsvWhenAndHowToConvert,
  "jwt-tokens-explained": JwtTokensExplained,
  "keyword-density-what-it-is-and-why-it-matters-less-than-you-think":
    KeywordDensityWhatItIsAndWhyItMattersLessThanYouThink,
  "linkedin-post-formatting-for-better-reach":
    LinkedinPostFormattingForBetterReach,
  "macro-calculator-how-to-set-your-targets":
    MacroCalculatorHowToSetYourTargets,
  "markdown-syntax-complete-reference": MarkdownSyntaxCompleteReference,
  "md5-sha1-sha256-which-hash-to-use": Md5Sha1Sha256WhichHashToUse,
  "meta-tags-complete-guide-for-seo": MetaTagsCompleteGuideForSeo,
  "metric-vs-imperial-unit-conversion-guide":
    MetricVsImperialUnitConversionGuide,
  "morse-code-history-and-how-it-works": MorseCodeHistoryAndHowItWorks,
  "open-graph-images-social-sharing-guide": OpenGraphImagesSocialSharingGuide,
  "ovulation-and-fertile-window-explained": OvulationAndFertileWindowExplained,
  "percentage-calculations-explained": PercentageCalculationsExplained,
  "png-jpg-webp-which-image-format-to-use": PngJpgWebpWhichImageFormatToUse,
  "pomodoro-technique-how-it-works": PomodoroTechniqueHowItWorks,
  "pregnancy-due-date-calculation-explained":
    PregnancyDueDateCalculationExplained,
  "profile-picture-sizes-for-every-platform":
    ProfilePictureSizesForEveryPlatform,
  "random-name-generator-uses": RandomNameGeneratorUses,
  "random-number-generation-explained": RandomNumberGenerationExplained,
  "regular-expressions-practical-guide": RegularExpressionsPracticalGuide,
  "retirement-planning-how-much-do-you-need":
    RetirementPlanningHowMuchDoYouNeed,
  "robots-txt-complete-guide": RobotsTxtCompleteGuide,
  "roman-numerals-explained": RomanNumeralsExplained,
  "running-pace-guide-for-every-race-distance":
    RunningPaceGuideForEveryRaceDistance,
  "scientific-calculator-functions-explained":
    ScientificCalculatorFunctionsExplained,
  "sentence-length-and-readability": SentenceLengthAndReadability,
  "sleep-cycles-how-to-wake-up-feeling-rested":
    SleepCyclesHowToWakeUpFeelingRested,
  "social-media-audit-how-to-do-one": SocialMediaAuditHowToDoOne,
  "social-media-character-limits-by-platform":
    SocialMediaCharacterLimitsByPlatform,
  "social-media-engagement-rate-explained": SocialMediaEngagementRateExplained,
  "speed-distance-time-calculations": SpeedDistanceTimeCalculations,
  "text-case-styles-explained": TextCaseStylesExplained,
  "text-repeater-use-cases-and-applications":
    TextRepeaterUseCasesAndApplications,
  "tiktok-hooks-that-stop-the-scroll": TiktokHooksThatStopTheScroll,
  "time-zone-conversion-guide-for-remote-teams":
    TimeZoneConversionGuideForRemoteTeams,
  "unix-timestamps-explained": UnixTimestampsExplained,
  "url-encoding-explained": UrlEncodingExplained,
  "us-sales-tax-explained-by-state": UsSalesTaxExplainedByState,
  "vat-explained-how-to-add-and-remove-it": VatExplainedHowToAddAndRemoveIt,
  "viral-hooks-for-social-media": ViralHooksForSocialMedia,
  "what-is-a-uuid-and-when-to-use-one": WhatIsAUuidAndWhenToUseOne,
  "what-is-lorem-ipsum-and-why-designers-use-it":
    WhatIsLoremIpsumAndWhyDesignersUseIt,
  "what-your-ip-address-reveals-about-you": WhatYourIpAddressRevealsAboutYou,
  "when-to-spell-out-numbers-in-writing": WhenToSpellOutNumbersInWriting,
  "when-to-use-bullet-points-and-when-not-to":
    WhenToUseBulletPointsAndWhenNotTo,
  "why-html-minification-matters-for-page-speed":
    WhyHtmlMinificationMattersForPageSpeed,
  "why-live-word-count-makes-you-a-faster-writer":
    WhyLiveWordCountMakesYouAFasterWriter,
  "word-count-targets-for-every-content-type":
    WordCountTargetsForEveryContentType,
  "word-frequency-analysis-for-better-writing":
    WordFrequencyAnalysisForBetterWriting,
  "writing-captions-for-social-media": WritingCaptionsForSocialMedia,
  // ── New posts (security tools) ──────────────────────────────────────────
  "was-my-password-in-a-data-breach-how-to-check-safely":
    WasMyPasswordInADataBreachHowToCheckSafely,
  "how-to-verify-a-file-checksum-and-why-it-matters":
    HowToVerifyAFileChecksumAndWhyItMatters,
  "diceware-passphrases-vs-random-passwords-which-is-stronger":
    DicewarePassphrasesVsRandomPasswordsWhichIsStronger,
  "how-to-encrypt-text-with-a-passphrase-aes-explained":
    HowToEncryptTextWithAPassphraseAesExplained,
  "how-totp-two-factor-authentication-codes-actually-work":
    HowTotpTwoFactorAuthenticationCodesActuallyWork,
  // ── New posts (Document / PDF cluster) ──────────────────────────────────
  "how-to-password-protect-and-redact-a-pdf-before-sharing":
    HowToPasswordProtectAndRedactAPdfBeforeSharing,
  "reorganizing-a-pdf-rotate-reorder-delete-crop-number-pages":
    ReorganizingAPdfRotateReorderDeleteCropNumberPages,
  "converting-files-to-and-from-pdf-a-practical-guide":
    ConvertingFilesToAndFromPdfAPracticalGuide,
  "filling-editing-and-extracting-data-from-pdfs":
    FillingEditingAndExtractingDataFromPdfs,
  "compressing-comparing-and-flattening-pdfs-when-each-matters":
    CompressingComparingAndFlatteningPdfsWhenEachMatters,
  // ── New posts (Fun / word games cluster) ────────────────────────────────
  "how-word-unscramblers-and-anagram-solvers-actually-work":
    HowWordUnscramblersAndAnagramSolversActuallyWork,
  "how-to-solve-wordle-faster-and-crack-any-crossword-clue":
    HowToSolveWordleFasterAndCrackAnyCrosswordClue,
  "making-word-puzzles-for-classrooms-and-game-nights":
    MakingWordPuzzlesForClassroomsAndGameNights,
};

// ─── Key Takeaways ────────────────────────────────────────────────────────────
const KEY_TAKEAWAYS: Record<string, string[]> = {
  // ── Existing posts ──────────────────────────────────────────────────────
  "how-to-create-a-strong-password": [
    "Length beats complexity — 16+ random characters is vastly stronger than clever letter-swaps.",
    "Modern cracking tools have every common substitution pattern (P@ssw0rd, etc.) built in.",
    "Use a random generator + password manager for accounts you don't type regularly.",
    "Use a passphrase of 4+ unrelated words for passwords you need to memorise.",
    "Two-factor authentication is a separate essential layer — even a strong password can be phished.",
  ],
  "social-media-engagement-rate-2025": [
    "Instagram static posts (6.2% avg) now outperform Reels (3.5%) for engagement.",
    "LinkedIn documents are averaging 37% engagement — highest of any format on any platform.",
    "TikTok engagement has been declining month-on-month since early 2024.",
    "Replying to comments in the first hour is the single highest-leverage action after publishing.",
    "Reach-based ER is more accurate for content performance; follower-based for brand comparisons.",
  ],
  "compound-interest-explained": [
    "Compound interest earns on interest already earned — simple interest never does.",
    "Time matters more than rate. Starting at 25 beats saving 3× as much from age 35.",
    "Rule of 72: divide 72 by your annual rate to find years to double.",
    "A credit card at 24% APR doubles what you owe in just 3 years if unpaid.",
    "Daily vs monthly compounding barely matters. Rate and time are what move the needle.",
  ],
  "image-formats-webp-avif-jpeg": [
    "AVIF is 40–50% smaller than JPEG at comparable quality — now supported by all modern browsers.",
    "Use the HTML <picture> element to serve AVIF with WebP and JPEG fallbacks automatically.",
    "Images are ~63% of average page weight and the top cause of poor LCP scores.",
    "Resizing to display dimensions matters as much as format choice.",
    "SVG is always the right choice for logos, icons, and vector graphics.",
  ],
  "bmi-limitations-and-what-to-use-instead": [
    "BMI was designed in the 1830s as a population statistic — not a personal health tool.",
    "It can't distinguish muscle from fat. Heavy athletes regularly score 'obese'.",
    "Where fat is stored (visceral vs subcutaneous) is as important as how much — BMI ignores this.",
    "South and East Asian populations face elevated health risk at lower BMI values than standard thresholds.",
    "Waist circumference, waist-to-height ratio, and body fat % give a more complete picture.",
  ],
  "freelancer-invoicing-guide": [
    "An invoice is a legal document — vague descriptions like 'services rendered' create disputes.",
    "Always confirm the accounts payable contact before invoicing, especially at larger companies.",
    "Include a specific due date, not just 'Net 30' — ambiguity delays payment.",
    "Ask for a PO number before invoicing large clients; without it invoices stall in their queue.",
    "Send the invoice the same day you deliver work — every day of delay adds to your wait.",
  ],
  "regex-beginners-guide": [
    "You only need ~12 core concepts to cover 90% of real-world regex use cases.",
    "Character classes [], shorthand \\d \\w \\s, and quantifiers * + ? cover most patterns.",
    "Anchors ^ and $ are critical for validating full strings vs finding matches within text.",
    "Lookahead and lookbehind let you match context without including it in the result.",
    "The fastest way to learn regex is a live tester — write patterns against real data.",
  ],
  "json-explained-for-developers": [
    "JSON is a text format — it's not a JavaScript object, even though the syntax looks similar.",
    "All keys must be double-quoted strings. Single quotes and unquoted keys are invalid.",
    "Trailing commas and comments are not valid JSON — use YAML or JSON5 if you need them.",
    "JSON won over XML for APIs because it's smaller, more readable, and natively parseable in JS.",
    "Always validate untrusted JSON before parsing — a malformed payload will throw at runtime.",
  ],
  "calories-macros-what-to-track": [
    "Energy balance (calories in vs out) is the fundamental driver of weight change.",
    "Protein intake is the most important macro for body composition and satiety.",
    "Tracking macros adds value when building muscle, hitting performance goals, or troubleshooting a plateau.",
    "For most people: hit a protein target within a calorie budget — that's the highest-leverage approach.",
    "Track long enough to build intuition, then decide whether to continue or rely on habits.",
  ],
  "mortgage-calculator-complete-guide": [
    "In the early years of a repayment mortgage, most of each payment goes to interest, not principal.",
    "A 2% rate difference on a £250k mortgage means ~£300/month and £90k+ in total interest.",
    "Overpaying even small amounts early has a disproportionate impact on total interest paid.",
    "Mortgage calculators show principal + interest only — stamp duty, fees, and insurance are extra.",
    "Always compare total cost over the fixed term, not just headline rate — arrangement fees matter.",
  ],
  "pomodoro-technique-guide": [
    "After an interruption it takes ~23 minutes to fully regain deep focus on a task.",
    "The technique works by making the cost of interruption explicit and time-boxing tasks.",
    "Breaks must involve genuine mental disengagement — scrolling social media doesn't count.",
    "The 50/10 ratio works better than 25/5 for work that requires long context-loading.",
    "Tracking Pomodoros per task builds self-knowledge that makes future planning more accurate.",
  ],
  "hashtags-how-they-work-2025": [
    "Instagram now recommends 3–5 relevant hashtags — not 30 generic ones.",
    "Hashtags function primarily as algorithm classification signals, not traffic drivers in 2025.",
    "Instagram's algorithm also reads caption copy for content classification — keywords matter.",
    "#fyp and #foryou have no special algorithmic power on TikTok despite appearing on viral posts.",
    "LinkedIn hashtags have more structural value because users actively follow them as content feeds.",
  ],
  "qr-codes-small-business-uses": [
    "Every modern smartphone camera scans QR codes natively — no app download required.",
    "Google Review QR codes are the highest-ROI application for most customer-facing businesses.",
    "Wi-Fi QR codes encode credentials directly — customers connect automatically on scan.",
    "Always download as SVG for print — it scales infinitely without pixelating.",
    "Test your code from the printed version before distributing — screen and print render differently.",
  ],
  "content-creator-free-tools": [
    "You don't need $200/month in subscriptions to produce professional content.",
    "Caption generators are starting points — always edit the output to match your voice.",
    "Compress every image before uploading — most are 3–5× larger than needed for web.",
    "Consistent posting frequency predicts account growth more reliably than posting volume.",
    "Start with the 2–3 tools that address your biggest friction points and ignore the rest.",
  ],
  "base64-encoding-explained": [
    "Base64 converts binary data to safe ASCII text — it's encoding, not encryption.",
    "Encoded output is always ~33% larger than the original input.",
    "JWT tokens use URL-safe Base64 (- and _ instead of + and /) in all three sections.",
    "Only the JWT signature provides security — the header and payload are just encoded, not encrypted.",
    "Avoid Base64 data URIs for images larger than ~2KB — size overhead plus no caching.",
  ],
  "linkedin-posts-that-get-engagement": [
    "LinkedIn truncates posts at ~210 characters — your hook must earn the 'see more' click.",
    "LinkedIn's algorithm weights comments far more heavily than likes for distribution.",
    "Native document posts (PDF carousels) average 37% engagement — highest of any format.",
    "Cross-posting content from Instagram or TikTok performs poorly — rewrite for LinkedIn's tone.",
    "Replying to every comment in the first 60 minutes significantly boosts algorithmic reach.",
  ],
  "unit-conversions-people-always-google": [
    "1 km = 0.621 miles. Divide by 1.6 for a quick mental estimate.",
    "1 kg = 2.205 lbs. Multiply by 2.2 for everyday use.",
    "°F = (°C × 1.8) + 32. Key references: 0°C=32°F, 20°C=68°F, 37°C=98.6°F.",
    "1 US gallon = 3.785 litres. Divide litres by 3.8 for a quick gallons figure.",
    "1 m² = 10.764 ft². Multiply by 10.75 (or just 10 for a fast estimate).",
  ],
  "how-to-calculate-roi-correctly": [
    "ROI = ((Gain − Cost) ÷ Cost) × 100. The denominator is always the cost, not the revenue.",
    "Using gross revenue instead of net profit massively overstates ROI in most business contexts.",
    "Basic ROI ignores time — a 100% return over 1 year and 10 years are completely different.",
    "For multi-year investments, use annualised ROI: ((1 + ROI)^(1/n) − 1) × 100.",
    "ROI works poorly for brand building, R&D, and investments with non-financial returns.",
  ],
  "plagiarism-check-before-publishing": [
    "Most plagiarism is accidental — heavy research exposure causes phrases to stick in memory.",
    "The similarity percentage matters less than what's actually flagged — read the full report.",
    "Superficial synonym-swapping while keeping sentence structure is still plagiarism.",
    "For academic work, free online checkers are a preview — universities use Turnitin and iThenticate.",
    "The real fix is research habits: write in your own words from the start, not from copy-pasted notes.",
  ],
  // ── New posts ────────────────────────────────────────────────────────────
  "aspect-ratios-explained-for-designers-and-video": [
    "16:9 is the universal standard for video and most screens — use it as the default unless a platform requires otherwise.",
    "9:16 (vertical) is essential for TikTok, Reels, and Stories — the most important ratio for short-form social video.",
    "1:1 (square) still performs well in Instagram feeds and displays larger in the grid than landscape formats.",
    "Wrong aspect ratio causes stretching, cropping, or pillarboxing — always crop before you resize.",
    "The Aspect Ratio Calculator finds the missing dimension when scaling content to exact platform specs.",
  ],
  "binary-hexadecimal-decimal-number-systems-explained": [
    "Each hex digit represents exactly 4 binary bits — making hex a compact shorthand for binary.",
    "CSS colour codes (#FF5733) are three hex pairs representing R, G, and B values 0–255.",
    "Octal (base-8) is primarily used for Unix file permissions — chmod 755 means rwxr-xr-x.",
    "A byte (8 bits) is always exactly 2 hex digits — the fundamental unit in low-level systems.",
    "You can convert binary to hex mentally by grouping bits in fours and mapping each group to a hex digit.",
  ],
  "binary-to-text-conversion-explained": [
    "Every ASCII character is stored as 8 binary bits (one byte) — 'A' is 01000001 (decimal 65).",
    "UTF-8 encodes non-ASCII characters as 2–4 bytes, while keeping ASCII characters as single bytes.",
    "The same byte sequence means different things in different encodings — context always matters.",
    "Hex is more practical than binary for byte-level work: two hex digits per byte vs eight binary digits.",
    "Binary-to-text conversion appears in CTF challenges, network debugging, and low-level programming.",
  ],
  "calorie-deficit-how-to-create-one-safely": [
    "A 500-calorie daily deficit produces approximately 0.45kg of fat loss per week — the standard sustainable rate.",
    "Women should generally stay above 1,400 calories and men above 1,800 to avoid hormonal and metabolic issues.",
    "High protein intake (1.6–2.4g/kg bodyweight) is the primary tool for preserving muscle in a deficit.",
    "Metabolic adaptation reduces TDEE over time — diet breaks every 8–12 weeks partially counteract this.",
    "A moderate deficit you sustain for months beats an aggressive deficit you abandon after three weeks.",
  ],
  "color-contrast-accessibility-wcag-guide": [
    "WCAG AA requires 4.5:1 contrast for normal text and 3:1 for large text (18pt+) and UI components.",
    "Light grey on white (#999 on #FFF) has only a 2.85:1 contrast ratio — fails AA for any text size.",
    "White text on medium brand colours often fails — always check before finalising button designs.",
    "Placeholder text is frequently inaccessible — it needs to meet the same contrast standards as regular text.",
    "Tools like the Contrast Checker give you the pass/fail verdict instantly so you can fix during design, not after build.",
  ],
  "color-palette-theory-for-non-designers": [
    "Complementary colours (opposite on the wheel) create maximum contrast — use the weaker colour as dominant.",
    "Analogous palettes (adjacent colours) look harmonious and natural — common in nature-inspired designs.",
    "The 60/30/10 rule: 60% dominant (usually neutral), 30% secondary, 10% accent.",
    "Full-saturation colours used together are usually jarring — vary saturation and lightness for sophistication.",
    "A practical brand palette has a primary, 2–3 tints/shades, a neutral scale, and semantic colours (success, error, warning).",
  ],
  "countdown-timers-for-productivity-and-events": [
    "Visible deadlines increase effort and focus — a countdown makes the abstract feel concrete and present.",
    "Countdown timers on sales pages increase conversion because they make scarcity real rather than stated.",
    "For personal goals, a visible countdown keeps the target in daily awareness without requiring active recall.",
    "Short countdowns (15–90 min) work as focus sessions when rigid Pomodoro intervals don't fit your work.",
    "Always specify the timezone when sharing a countdown with a distributed audience.",
  ],
  "credit-card-debt-payoff-strategies": [
    "Minimum payments are designed to maximise interest — a £3,000 balance at 24% APR on minimums takes 25+ years.",
    "Debt avalanche (highest rate first) minimises total interest — mathematically optimal.",
    "Debt snowball (smallest balance first) produces quicker wins — better for motivation and long-term adherence.",
    "Balance transfers to 0% cards can dramatically accelerate payoff if you clear the balance before the promotional period ends.",
    "Paying off 24% APR debt is a guaranteed 24% return — almost always better than investing the same money.",
  ],
  "cron-jobs-explained-scheduling-guide": [
    "The five cron fields are: minute, hour, day-of-month, month, day-of-week — in that order.",
    "Use absolute paths for all commands in crontabs — cron runs with a minimal PATH that differs from your shell.",
    "Cron uses the system timezone — on UTC servers, a 9am job runs at 9am UTC, not your local time.",
    "Redirect output to a log file with >> /path/to/logfile 2>&1 or you'll never see errors from failed jobs.",
    "@reboot, @daily, @hourly are convenient shorthand strings supported by most modern cron implementations.",
  ],
  "css-gradients-complete-guide": [
    "CSS gradients render via the GPU and have zero performance impact — always prefer them over gradient images.",
    "The muddy-middle problem (grey between saturated colours) is fixed with intermediate colour stops or HSL interpolation.",
    "background-clip: text with -webkit-text-fill-color: transparent creates gradient text without any images.",
    "CSS gradients can't be transitioned directly — animate background-position on an oversized gradient instead.",
    "Conic gradients are ideal for pie charts and radial progress indicators using nothing but CSS.",
  ],
  "dice-probability-for-tabletop-gamers": [
    "Rolling with advantage on a D20 is roughly equivalent to a +3 to +5 bonus at typical DC values.",
    "2d6 produces a bell curve peaking at 7 — a 7 is six times more likely than a 2 or 12.",
    "Multiple dice always produce a normal-ish distribution; single dice produce a flat uniform distribution.",
    "The average of any die with equal faces is (min + max) ÷ 2 — so a d20 averages 10.5.",
    "Digital dice use cryptographically secure random number generation — statistically as fair as physical dice.",
  ],
  "email-signature-best-practices": [
    "A signature longer than the email body undermines rather than enhances professional appearance.",
    "Inspirational quotes are universally unpopular with recipients and do nothing for credibility.",
    "Optimise for external first emails — use a shorter signature for replies and internal messages.",
    "A scheduling link (Calendly etc.) in your signature eliminates the back-and-forth of meeting booking.",
    "Logo images should be under 20KB — large embedded images trigger spam filters and slow email load.",
  ],
  "email-subject-lines-that-get-opened": [
    "On mobile, only the first 30 characters of a subject line display reliably — lead with the most compelling words.",
    "Preview text is the second line of your subject line — use it intentionally, not as a 'View in browser' placeholder.",
    "A/B test the subject line before a full send — even a 5% CTR improvement compounds significantly over time.",
    "Misleading subject lines spike open rate once and destroy list trust permanently.",
    "Sender reputation matters more than subject line for established lists — recipients open emails from trusted senders reflexively.",
  ],
  "email-validation-how-it-works-and-why-it-fails": [
    "Format validation catches obvious errors but passes many invalid addresses — DNS and deliverability checks are separate steps.",
    "Addresses with plus signs (user+tag@gmail.com) are valid — rejecting them is a bug, not a feature.",
    "Client-side validation gives users immediate feedback; server-side validation is non-negotiable regardless.",
    "DNS/MX record checks verify the domain can receive email — a fast, effective second layer before deliverability testing.",
    "Confirmation emails are the most reliable validation method — the address exists and the person can access it.",
  ],
  "facebook-ad-copy-that-converts": [
    "The first line determines whether anyone reads the rest — rewrite your hook before optimising anything else.",
    "Features don't sell; outcomes do. 'Unlimited storage' < 'Never delete a photo again'.",
    "Specific social proof ('4,200 customers, 4.9 stars') outperforms vague claims ('many people love it').",
    "Short copy works for retargeting warm audiences; longer AIDA-structured copy works for cold traffic.",
    "Test the hook first — two identical ads with different opening lines reveal what triggers your specific audience.",
  ],
  "favicon-guide-all-sizes-and-formats": [
    "The minimum viable favicon setup is three files: favicon.ico (legacy), favicon.svg (modern), and apple-touch-icon.png (180×180).",
    "SVG favicons scale perfectly to any size and support dark mode via CSS media queries — the best format for modern browsers.",
    "Favicons cache aggressively — add a version query string (?v=2) to force browsers to reload after an update.",
    "Design at 32×32 first — complex logos become unreadable at small sizes and require simplification.",
    "A broken or missing favicon signals an unfinished site and also affects how pages appear in bookmark bars and search results.",
  ],
  "flesch-kincaid-and-readability-scores-explained": [
    "Readability scores measure linguistic complexity, not writing quality — a simple but meaningless text scores well.",
    "Target Flesch-Kincaid Grade 6–8 for general web content; Grade 10–12 for specialist B2B audiences.",
    "Average sentence length drives most readability formulas — splitting long sentences is the fastest way to lower the score.",
    "Replacing technical vocabulary with simpler words can reduce accuracy — don't sacrifice precision to hit a score target.",
    "Use readability as a diagnostic after writing, not as a constraint during writing.",
  ],
  "flip-text-and-unicode-tricks-for-social-media": [
    "Flipped and mirrored text is Unicode — it copies and pastes as regular text into any platform that supports Unicode.",
    "No special software is needed to view it — Unicode is supported universally on modern devices.",
    "Screen readers may not handle flipped Unicode correctly — avoid it for accessibility-sensitive content.",
    "The technique works best for bios, usernames, and stylistic emphasis — not for body copy that needs to be easily read.",
    "Not every letter has a perfect flip equivalent — some characters may render as symbols depending on the font.",
  ],
  "fractions-how-to-add-subtract-multiply-divide": [
    "To add fractions: find a common denominator first — you can never add thirds and quarters directly.",
    "To multiply fractions: multiply numerators together, then denominators — no common denominator needed.",
    "To divide by a fraction: multiply by its reciprocal — 'keep, change, flip'.",
    "Cancel common factors before multiplying to simplify the arithmetic — the result is always the same but smaller numbers.",
    "Mixed numbers must be converted to improper fractions before any arithmetic operation.",
  ],
  "grammar-mistakes-that-make-you-look-unprofessional": [
    "Its vs it's is the most noticed apostrophe error — 'it's' always means 'it is', never possession.",
    "A comma splice joins two independent clauses with only a comma — use a period, semicolon, or conjunction instead.",
    "Subject-verb agreement breaks most often when a long phrase separates subject and verb — find the subject first.",
    "Dangling modifiers occur when the subject of the modifier doesn't match the sentence subject.",
    "Run your draft through a grammar checker as a separate pass after writing — not simultaneously.",
  ],
  "hashtag-strategy-that-actually-grows-reach": [
    "Instagram recommends 3–5 targeted hashtags — the 30-hashtag playbook was discredited years ago.",
    "Small and niche hashtags (10k–100k posts) keep your content visible longer than large tags where it disappears instantly.",
    "Hashtags on Twitter/X hurt engagement above 2 per tweet — they interrupt readability and look like spam.",
    "Banned or restricted hashtags suppress posts even when the hashtag looks innocent — always check before using.",
    "Platform search algorithms index caption text directly — relevant keywords in the caption matter as much as hashtags.",
  ],
  "hex-rgb-hsl-color-formats-explained": [
    "HEX is best for pasting exact brand colours from design tools — compact and universally understood.",
    "HSL is the most powerful format for building colour systems — lighten or darken just by adjusting the L value.",
    "RGB/RGBA is the practical choice when opacity control is needed alongside colour specification.",
    "OKLCH is the emerging standard for perceptually uniform colour scales — worth watching for design systems.",
    "CSS custom properties with HSL make theming trivial: change the hue variable and the whole palette shifts.",
  ],
  "hourly-to-salary-conversion-guide": [
    "The standard conversion uses 2,080 hours per year (40h × 52w) — but this overstates contractor hours significantly.",
    "A salaried employee's true hourly cost includes employer pension contributions, NI, holiday pay, and benefits — typically 25–40% more.",
    "Contractors must earn enough extra to self-fund all benefits the employer would otherwise provide.",
    "A rough freelance rule: charge 1.3–1.5× the equivalent employee hourly rate to achieve comparable net compensation.",
    "For part-time roles, calculate annual salary as: hourly × weekly hours × actual working weeks.",
  ],
  "how-currency-exchange-rates-work": [
    "The mid-market rate is what you see on Google — the retail rate you actually get is always worse by the provider's spread.",
    "Specialist transfer services (Wise, OFX) typically offer rates 1–3% better than high street banks for large transfers.",
    "DST changes on different dates in the US and Europe — the offset between them shifts for several weeks per year.",
    "Dynamic currency conversion (paying in your home currency abroad) is almost always worse — always decline it.",
    "Forward contracts lock in today's exchange rate for future delivery — useful for predictable large international payments.",
  ],
  "how-gpa-is-calculated": [
    "GPA is a weighted average — courses with more credit hours have proportionally more impact on the cumulative figure.",
    "Quality Points = Grade Points × Credit Hours; GPA = Total Quality Points ÷ Total Credit Hours.",
    "A poor grade in a 4-credit course damages GPA more than the same grade in a 1-credit course.",
    "Cumulative GPA recovers slowly when total credit hours are high — early semesters are mathematically more valuable.",
    "Many employers stop considering GPA after 2–3 years of work experience — it matters most for first jobs and graduate admissions.",
  ],
  "how-long-should-a-blog-post-be": [
    "The right length is whatever the topic needs — word count targets set in advance produce padding.",
    "Average first-page Google results are 1,447–1,890 words — but length correlates with thoroughness, not length itself.",
    "Reading time is the metric readers care about: 5–8 minutes hits the right balance for most informational content.",
    "For informational queries, longer comprehensive content consistently outranks shorter content on the same topic.",
    "Filler content doesn't just fail to help SEO — it dilutes the quality of what's actually useful.",
  ],
  "how-meetings-are-draining-your-budget": [
    "A one-hour meeting with 8 people at $75/hour fully-loaded costs $600 — multiply by recurring weekly frequency for annual impact.",
    "The true cost is higher than the arithmetic: context-switching adds 10–20 minutes of lost productivity per attendee.",
    "No agenda means no meeting — an agenda forces organisers to define purpose, which often reveals the meeting isn't necessary.",
    "Defaulting to 25- and 50-minute slots instead of 30 and 60 consistently produces shorter, more focused meetings.",
    "Standing meetings run ~33% shorter than seated meetings at no cost to decision quality.",
  ],
  "how-mortgage-payments-are-calculated": [
    "Amortisation is why early mortgage payments are mostly interest — the balance is high, so interest charges are high.",
    "On a £250k 4.5% 25-year mortgage, the first payment of ~£1,389 splits roughly £937 interest / £452 principal.",
    "A 10-year shorter term saves £72,000+ in interest on a typical mortgage at just £192 more per month.",
    "Extra overpayments of £100/month on a 25-year mortgage typically reduce the term by ~2.5 years.",
    "Most mortgage products allow up to 10% of outstanding balance overpaid per year without early repayment charges.",
  ],
  "how-much-mortgage-can-i-afford": [
    "Lenders tell you the maximum they'll lend — that's a ceiling, not a target you should aim for.",
    "Calculate affordability from your net income downward: subtract fixed costs, savings target, and property running costs first.",
    "Moving from 95% to 90% LTV typically unlocks meaningfully lower interest rates, saving thousands over the full term.",
    "Hidden costs — stamp duty, surveys, solicitors, furnishing — often total £10,000–20,000 beyond the deposit.",
    "Never deplete your emergency fund to maximise deposit — homeownership brings immediate unexpected costs.",
  ],
  "how-much-protein-do-you-actually-need": [
    "The RDA of 0.8g/kg is a deficiency-prevention minimum — not an optimal target for active people.",
    "Research consistently supports 1.6–2.2g/kg bodyweight for maximising muscle protein synthesis.",
    "Protein distribution matters: 25–40g per meal (3–5 meals) is more effective than the same total in 1–2 meals.",
    "During a calorie deficit, increase protein to 2–2.4g/kg to minimise muscle loss alongside fat loss.",
    "Leucine is the primary amino acid triggering muscle protein synthesis — animal proteins and soy are the richest sources.",
  ],
  "how-much-rent-can-i-afford": [
    "The 30% rule uses gross income — but 30% of gross is often 38–40% of net take-home pay.",
    "Build your housing budget from net income down: subtract all fixed costs, savings target, and variable expenses first.",
    "Total housing cost includes council tax, utilities, and service charges — not just the headline rent figure.",
    "Spending above 50% of net income on housing typically leaves insufficient room for savings and financial resilience.",
    "Most UK landlords require income of 2.5–3× annual rent — this is their threshold, not necessarily your affordability ceiling.",
  ],
  "how-much-water-should-you-drink-per-day": [
    "The 8-glasses rule has no rigorous scientific basis — it came from a 1945 guideline that included water from food.",
    "A practical target: 30–35ml per kg of bodyweight per day, adjusted upward for exercise and heat.",
    "Coffee and tea contribute meaningfully to hydration — the diuretic effect of caffeine doesn't negate the water content.",
    "Urine colour is the most reliable daily hydration indicator: pale straw yellow = well hydrated.",
    "Exercise adds 0.5–1 litre per hour of moderate effort — more in heat or at high intensity.",
  ],
  "how-qr-codes-work-and-best-practices": [
    "QR codes require sufficient size: minimum 1/10th of scanning distance — a poster scanned at 2m needs a 20cm code.",
    "Higher error correction levels (H = 30% damage tolerance) are needed for curved surfaces, rough materials, or logo overlays.",
    "Dynamic QR codes redirect through a third-party service — if that service goes down or the URL changes, the code breaks.",
    "Test from the printed output, not the screen — contrast and resolution behave differently in print.",
    "QR codes can encode URLs, Wi-Fi credentials, vCards, calendar events, and plain text — not just website links.",
  ],
  "how-rhyme-schemes-work-in-poetry-and-songwriting": [
    "Near rhyme (slant rhyme) avoids the forced quality of perfect rhyme — many major poets use it exclusively.",
    "ABCB (second and fourth lines rhyme) is the most natural-sounding scheme in folk ballads and songs.",
    "Internal rhyme adds musicality within lines without the end-of-line payoff — extensively used in hip-hop.",
    "The best rhyme word is one that both sounds right AND carries the meaning you want — sound never trumps meaning.",
    "If a rhyme scheme feels forced, free verse is a legitimate choice — constraint should serve the work, not constrain it.",
  ],
  "how-to-beat-writers-block-with-prompts-and-practice": [
    "Writer's block is almost always a starting problem, not an ideas problem — the blank page creates paralysis, not absence of content.",
    "Prompts work by removing the 'what do I write about' decision, which frees up cognitive resources for actual writing.",
    "Timed writing (10–15 minutes) with a constraint not to stop or delete is the most reliable block-breaking technique.",
    "The unexpected interpretation of a prompt is almost always more interesting than the obvious one.",
    "Daily short writing sessions build fluency faster than irregular long sessions — 15 minutes daily beats 2 hours weekly.",
  ],
  "how-to-build-a-content-calendar": [
    "Plan themes quarterly, content mix monthly, specific posts weekly — each level uses the right time horizon.",
    "Content pillars (3–5 recurring themes) prevent the reactive 'what do I post today?' panic.",
    "Batching creation — drafting a week's posts in one 2–4 hour session — is far more efficient than daily creation.",
    "Build in 1–2 flex slots per week for reactive or timely content without derailing the planned calendar.",
    "Track what you've posted to avoid repetition and to identify what actually drives engagement over time.",
  ],
  "how-to-build-a-monthly-budget-that-works": [
    "Work from net income — what you actually receive — not gross salary.",
    "Pay yourself first: treat savings as a fixed expense, not what's left after spending.",
    "The 50/30/20 split (needs/wants/savings) is a benchmark, not a rule — adjust based on your actual fixed costs.",
    "Zero-based budgeting (every pound assigned) produces more awareness than percentage-based approaches.",
    "For irregular income, build a baseline budget from your minimum reliable monthly income.",
  ],
  "how-to-calculate-a-tip-the-right-way": [
    "Mental shortcut: find 10% (move the decimal), then adjust — 15% = 10% + half of 10%; 20% = double 10%.",
    "When splitting a group bill, add the tip to the total first then divide — it's simpler and avoids calculation errors.",
    "US tipping norms are 18–20% at sit-down restaurants; UK is 10–15% (check if service charge is already included).",
    "Japan: tipping is not customary and can cause offence. Australia: appreciated but not expected.",
    "An automatic service charge is not the same as a tip — it usually goes to the restaurant, not directly to the server.",
  ],
  "how-to-calculate-crypto-profit-and-loss": [
    "Always include fees in P&L calculations — trading fees of 0.1–0.5% each way add up significantly over many trades.",
    "Swapping one cryptocurrency for another is a taxable disposal event in most jurisdictions — not just selling for fiat.",
    "UK HMRC uses Section 104 pooling (average cost) for crypto — not FIFO or LIFO.",
    "US crypto gains held under 1 year are taxed as ordinary income; over 1 year at preferential capital gains rates.",
    "Dedicated crypto tax software (Koinly, CoinTracker) is essential for anyone with multi-exchange trading history.",
  ],
  "how-to-calculate-days-between-dates": [
    "Inclusive counting (counting both start and end dates) vs exclusive counting produces different totals — always clarify which applies in legal and financial contexts.",
    "There's no fixed number of days in 'six months' — it depends entirely on which six months.",
    "Excel's NETWORKDAYS() function calculates business days between dates, excluding weekends and specified holidays.",
    "Leap years add one day to any date range spanning February 29 — relevant for interest calculations and contract deadlines.",
    "For contract review, diff tools surface exact day counts between signed and amended versions with no manual counting.",
  ],
  "how-to-calculate-discounts-and-original-prices": [
    "Working backwards from a sale price: divide by (1 − discount rate) — never add the percentage to the sale price.",
    "£60 after 25% off → original was £60 ÷ 0.75 = £80, not £60 + £15 = £75.",
    "Stacked discounts multiply their factors: 20% off then 10% off = paying 0.80 × 0.90 = 72% of original (28% off total, not 30%).",
    "Verify 'X% off' claims: ((original − sale) ÷ original) × 100 — advertised discounts are often overstated.",
    "A 50% discount on a high-margin product can still be profitable — the discount percentage tells you nothing about the seller's margin.",
  ],
  "how-to-calculate-exact-age": [
    "Age requires checking whether the birthday has passed this year — year subtraction alone is not sufficient.",
    "Leap year birthdays (February 29) typically default to February 28 or March 1 for legal purposes — jurisdiction varies.",
    "In Excel: =DATEDIF(birthdate, TODAY(), 'Y') returns complete years; 'YM' returns additional months.",
    "Legal age thresholds measure full completed years from the exact birthdate — the day before your birthday you're still the previous age.",
    "For eligibility calculations, the key question is whether today ≥ the birthdate in the threshold year.",
  ],
  "how-to-calculate-investment-returns": [
    "CAGR = (Final ÷ Initial)^(1/years) − 1 — converts any total return to an equivalent annualised rate.",
    "A 40% total return over 8 years is only 4.3% per year — time radically changes how impressive a return looks.",
    "Real return = nominal return − inflation — the only figure that measures actual purchasing power growth.",
    "Dividend-adjusted total return is always higher than price-only return for dividend-paying investments.",
    "For multiple cash flows, use IRR or XIRR (spreadsheet functions) — simple CAGR doesn't handle irregular contributions.",
  ],
  "how-to-calculate-roi": [
    "ROI formula: ((Net Return − Cost) ÷ Cost) × 100 — always use net profit, not gross revenue.",
    "Annualised ROI: (1 + ROI)^(1/years) − 1 — a 40% return over 3 years is 11.9% per year.",
    "Attribution is the hardest part of marketing ROI — last-click, first-click, and multi-touch models produce different numbers.",
    "Risk isn't captured by ROI — two investments with identical expected returns can have very different variance.",
    "Non-financial returns (brand equity, employee satisfaction, risk reduction) are real but excluded from simple ROI calculations.",
  ],
  "how-to-calculate-your-daily-calorie-needs": [
    "Mifflin-St Jeor is the most validated BMR equation for modern adults — most calculators use it by default.",
    "TDEE = BMR × activity multiplier — the multiplier is where most errors occur (people typically overestimate activity level).",
    "Treat your calculated TDEE as a hypothesis: if weight changes unexpectedly over 2–3 weeks, adjust the number.",
    "Calorie needs decrease as you lose weight — recalculate every 5–10kg of body weight change.",
    "Most web calculators over-count BMR because they use outdated equations — Mifflin-St Jeor is the current standard.",
  ],
  "how-to-calculate-your-freelance-rate": [
    "Start from required net income, not from what competitors charge — the floor must be what you actually need.",
    "Non-billable time typically takes 30–50% of total working hours — the billable hour is worth more than it looks.",
    "Minimum rate = Required annual income ÷ (Total hours × billable percentage × (1 − tax rate)).",
    "Freelancers need to earn 1.3–1.5× the equivalent employee rate to achieve comparable net compensation after benefits.",
    "The best time to raise rates is when acquiring a new client — avoid renegotiating existing client rates mid-engagement.",
  ],
  "how-to-calculate-your-net-worth": [
    "Net Worth = Total Assets − Total Liabilities — include pension funds at current value on the asset side.",
    "Use current market value for all assets, not purchase price or outstanding mortgage balance.",
    "Negative net worth is normal and expected in your twenties — the direction of change matters more than the absolute number.",
    "Don't include everyday household possessions — they have near-zero resale value and inflate the asset side meaninglessly.",
    "Track annually at the same date for a clean year-over-year comparison that reflects real change.",
  ],
  "how-to-check-for-plagiarism": [
    "Mosaic plagiarism (close paraphrasing that mirrors sentence structure) is flagged by checkers even if every word differs.",
    "A high similarity score requires manual review — some matches are properly cited quotes, which is expected.",
    "Self-plagiarism (reusing your own previously published work without disclosure) is a real category in academic and professional contexts.",
    "Ghostwritten content is your responsibility — always check outsourced writing before publishing under your name.",
    "The fix for flagged content is rewriting from memory after closing the source — not swapping synonyms in place.",
  ],
  "how-to-choose-a-business-name": [
    "Check the .com domain and social handles before falling in love with a name — inconsistency across platforms looks amateur.",
    "Fanciful names (invented words like 'Spotify' or 'Kodak') get the strongest trademark protection.",
    "Descriptive names are the weakest trademark candidates — 'Premium Coffee Co.' is hard to protect.",
    "Backronyms (decide the word first, then expand the letters) almost always produce better acronyms than retrofitting.",
    "Run a basic trademark search in your category before committing — similar names can coexist in different industries.",
  ],
  "how-to-compare-two-versions-of-a-document": [
    "In contracts, the most consequential edits are often single words — 'may' vs 'shall', 'or' vs 'and'.",
    "Text diff tools work on any two pieces of text regardless of how edits were made — unlike Track Changes, which requires editing within Word.",
    "A diff shows deletions and additions, not relocated content — moved sections appear as deletions in one place and additions in another.",
    "For plagiarism verification, a diff comparison against the original shows exactly how much the rewrite changed.",
    "Clean text of extra whitespace before comparing — formatting differences create false positive matches.",
  ],
  "how-to-create-a-memorable-acronym": [
    "Work forward from a word you want, then expand the letters — backronyms produce more natural results than retrofitting letters.",
    "Three to six letters is the practical range — longer acronyms are usually unpronounceable.",
    "The strongest acronyms work on two levels: the letters AND the word itself reinforce the concept (SMART, SWOT).",
    "Search any candidate acronym before committing — an existing medical condition or slang term is a show-stopper.",
    "Word-like acronyms (pronounced as words) become embedded in language faster than spelled-out initialisms.",
  ],
  "how-to-create-a-professional-invoice": [
    "Every invoice needs: invoice number, date, due date, both parties' details, itemised work, and payment instructions.",
    "Use sequential invoice numbers from day one — gaps or duplicates create audit problems and look unprofessional.",
    "Include a specific due date, not just 'Net 30' — ambiguity reliably delays payment.",
    "Send invoices the same day you deliver work — every day of delay extends the payment wait.",
    "VAT-registered businesses must include their VAT number on all invoices — missing it invalidates the client's VAT claim.",
  ],
  "how-to-create-strong-passwords": [
    "Length and randomness are the only two properties that actually determine password strength.",
    "Password managers eliminate the need to memorise unique passwords for every account — use one.",
    "Passphrases (4+ random words) are strong and memorable — ideal for passwords you must type manually.",
    "Enable MFA on email, financial accounts, and anywhere sensitive data is stored — it stops most account takeovers.",
    "Cryptographic randomness (crypto.getRandomValues, secrets module) is required for security tokens — Math.random() is not suitable.",
  ],
  "how-to-evaluate-a-pay-raise": [
    "Real raise = nominal raise % − inflation % — a 3% raise in a 4% inflation year is a real pay cut.",
    "After-tax impact: roughly 65–70p of every £1 gross increase at the basic rate (20% tax + NI).",
    "Benchmark against market rate before accepting — a raise that leaves you 20% below market solves one problem while leaving another.",
    "Salary compounding favours early negotiations — an underpaid starting salary compounds through every subsequent raise.",
    "If base salary is capped, negotiate bonus targets, equity, remote flexibility, and other total-compensation components.",
  ],
  "how-to-format-and-validate-json": [
    "Trailing commas and single-quoted strings are the two most common JSON syntax errors — both are valid JavaScript but invalid JSON.",
    "Formatted JSON is for humans; minified JSON is for machines — never manually minify JSON, only tooling should do it.",
    "The error message usually includes the character position — go directly to that position in the raw JSON, don't scan the whole file.",
    "JSON5 and JSONC allow comments and trailing commas — check whether your config file uses one of these extensions before debugging 'invalid JSON'.",
    "Google renders pages by crawling them — blocking CSS and JS in robots.txt prevents proper rendering even if HTML is indexed.",
  ],
  "how-to-make-a-meme-that-actually-spreads": [
    "Misusing a template is the most common meme failure — each format carries established meaning from its history of use.",
    "Memes work through curiosity, relatability, or surprise — they fail when they require explanation.",
    "A meme that would be funny without the brand name is a candidate for brand use — a forced product insertion isn't.",
    "Impact font, all caps, white text with black outline is the convention for good reason — readable on any background.",
    "Internal audience memes (authentic industry humour) outperform generic meme attempts for brand accounts.",
  ],
  "how-to-measure-body-fat-percentage-accurately": [
    "DEXA scan is the gold standard (±1–2% margin) — worth the cost for an accurate baseline, especially before a body composition goal.",
    "BIA scales vary by ±3–8% depending on hydration — measure consistently (same time, same hydration) to track trends.",
    "Normal weight obesity ('skinny fat') — healthy BMI but high body fat — carries significant metabolic risks that BMI alone misses.",
    "Body fat naturally increases with age — slightly higher percentages at the same health level are normal for older adults.",
    "Track monthly, not weekly — day-to-day fluctuations from water retention mask actual change at shorter intervals.",
  ],
  "how-to-merge-and-split-pdf-files": [
    "Merging doesn't re-encode content — image and text quality are fully preserved.",
    "Verify page order in the merge preview before finalising — a client proposal with wrong page order is worse than separate files.",
    "For confidential documents, use browser-based tools that process locally rather than uploading to external servers.",
    "Password-protected PDFs require the password before merging or splitting — the tool cannot bypass protection.",
    "PDF file size after merging equals the sum of component files — compress images beforehand if the result needs to be emailed.",
  ],
  "how-to-paraphrase-without-plagiarising": [
    "Close the source before writing your version — having it open guarantees you'll mirror its language.",
    "Synonym-swapping while keeping sentence structure is not paraphrasing — it's the form of plagiarism checkers specifically detect.",
    "Write from memory first, then compare with the original to check accuracy and that you haven't inadvertently mirrored phrasing.",
    "Attribution is still required even when every word is yours — paraphrasing changes the expression, not the ownership of the idea.",
    "AI paraphrasing tools are starting points, not finished products — always verify for accuracy and voice.",
  ],
  "how-to-pick-hex-colors-for-your-brand": [
    "Test brand colours on white, dark, and coloured backgrounds before committing — they behave differently in each context.",
    "White text on a medium brand colour often fails WCAG AA — check contrast before using it for buttons.",
    "Build a tint/shade scale alongside your primary colour — design systems need 5–9 lightness steps, not just one hex value.",
    "HSL is more practical than hex for generating systematic tints and shades — keep H and S constant, vary L.",
    "Pantone and hex are different colour spaces — a hex code and Pantone swatch for the same brand colour will look slightly different.",
  ],
  "how-to-reach-a-savings-goal-faster": [
    "A savings goal needs a specific amount, a target date, and a calculated monthly contribution — anything less is a wish.",
    "Automate the transfer on payday — savings that remain in the current account rarely survive the month.",
    "Interest rate improvement from 1% to 4.5% saves approximately £700 on a £10,000 goal over 2 years.",
    "Lump sums (tax refunds, bonuses) directed to the goal fund can reduce the timeline by months.",
    "Named separate accounts for each goal dramatically improve adherence — money labelled 'House Deposit' behaves differently than general savings.",
  ],
  "how-to-remove-image-backgrounds": [
    "AI background removal works best with high-contrast subjects on plain backgrounds — hair and fine detail still need manual cleanup.",
    "Export as PNG with alpha channel transparency to preserve flexibility for placement on any background.",
    "For e-commerce, white or transparent backgrounds are marketplace standards — consistent backgrounds make product galleries look professional.",
    "Glass, water, and transparent objects are the hardest cases for AI removal — the algorithm can't distinguish transparent subject from background.",
    "Starting resolution matters: 1000px+ on the shortest side gives the algorithm more detail for accurate edge detection.",
  ],
  "how-to-summarise-long-content-effectively": [
    "Good summaries have three qualities: accuracy (faithful to the source), completeness (all key points), and concision (substantially shorter).",
    "The reverse-outline method: write one sentence per section capturing the point, not the content — then assemble.",
    "Automated summarisers work well for reading triage and initial overview — poorly for nuanced argumentation or precise wording.",
    "Most content can be accurately summarised at 10–20% of its original length without losing what matters.",
    "Don't summarise content you don't understand — misrepresented summaries compound errors when others rely on them.",
  ],
  "how-to-use-a-stopwatch-for-productivity-and-sport": [
    "Timing actual tasks for several weeks reveals systematic underestimation — most people believe tasks take 30–50% less time than they do.",
    "Lap recording shows split times (individual segment durations) alongside cumulative time — both are needed for training analysis.",
    "For freelancers, a running stopwatch during active work hours produces honest billing records rather than estimated approximations.",
    "Browser-based stopwatches use JavaScript performance API — millisecond precision sufficient for all practical use cases.",
    "Start a stopwatch when beginning focused work — the act of starting creates a mild commitment effect that reduces early abandonment.",
  ],
  "how-to-write-a-resume-that-gets-interviews": [
    "Achievement formula: [Action verb] + [what you did] + [measurable result] — 'Redesigned onboarding, reducing churn by 40%'.",
    "ATS systems parse text — complex PDF formatting with columns, text boxes, or headers-in-images loses content during parsing.",
    "Keywords must match the job description exactly — 'React.js' and 'ReactJS' are treated differently by some ATS systems.",
    "One page for under 10 years' experience; two pages acceptable (not required) for senior roles.",
    "Generic resumes sent to 50 jobs underperform tailored resumes sent to 10 relevant jobs — customise at minimum the summary and top bullets.",
  ],
  "how-to-write-a-slogan-that-sticks": [
    "Good slogans sell aspirations or relationships — not descriptions of what the product does.",
    "Rhythm, brevity (under 7 words), and active verbs are the mechanics behind most memorable taglines.",
    "Backronyms work: decide the word you want first, then build the phrase around those letters.",
    "Test candidates by speaking them aloud — unnatural phrasing that reads fine often sounds awkward when said.",
    "Don't change a slogan that's working — brand equity in a slogan compounds over years of consistent use.",
  ],
  "how-to-write-a-social-media-bio-that-converts": [
    "Specific beats generic: 'Nutritionist for busy parents' converts better than 'health enthusiast'.",
    "The bio should answer: who you serve, what you offer, why you're credible, and what to do next.",
    "Instagram and LinkedIn search index bio text — include relevant keywords, not just your job title.",
    "A CTA in the bio (what to do next) is often the difference between a profile visit and a follow.",
    "Update your bio whenever your offer, audience, or positioning changes — stale bios with broken links actively reduce conversion.",
  ],
  "how-to-write-a-title-that-gets-clicks-and-reads": [
    "The title does two jobs: earn the click AND set accurate expectations — misleading titles spike CTR then destroy trust.",
    "Primary keyword near the start of the title gets more search engine weight and avoids truncation at 60 characters.",
    "Odd-numbered list titles ('7 ways') consistently outperform even-numbered ones — possibly because they feel less arbitrary.",
    "The contrarian title ('why X is wrong') creates cognitive dissonance that compels reading — but only if you can back up the claim.",
    "A/B test titles on high-traffic content — small phrasing differences produce significant CTR differences at scale.",
  ],
  "how-to-write-a-twitter-thread-that-gets-read": [
    "Tweet 1 is your entire pitch — state the most compelling version of the promise before the (1/n).",
    "One idea per tweet — a tweet trying to say two things usually succeeds at neither.",
    "End each tweet with enough value to satisfy but enough incompleteness to pull the reader to the next one.",
    "List threads (10 things about X) perform well because they're scannable and readers know the scope upfront.",
    "The last tweet should summarise the key takeaway and include a CTA — it's the one people share standalone.",
  ],
  "html-entities-xss-prevention-guide": [
    "Unescaped < and > in user-generated content allow injecting script tags — HTML encoding is the primary XSS defence.",
    "The five critical entities: &lt; &gt; &amp; &quot; &apos; — these must be encoded before inserting user content into HTML.",
    "Encoding is for text contexts between HTML tags; sanitisation (using a library like DOMPurify) is for contexts where HTML is intentionally allowed.",
    "Removing quotation marks doesn't make something a summary — close phrasing of the original is still reproduction.",
    "A different encoding is needed for each context: HTML encoding for HTML, URL encoding for URLs, parameterised queries for SQL.",
  ],
  "ideal-weight-formulas-what-they-mean": [
    "Ideal weight formulas were designed for clinical drug dosing — not as personal fitness or aesthetic targets.",
    "Different formulas (Devine, Robinson, Miller) give different results for the same person — the spread shows genuine uncertainty.",
    "A healthy weight range (BMI 18.5–24.9) spans 15–18kg for most heights — it's a range, not a single target.",
    "Muscular individuals may healthily exceed IBW formulas — body composition is more meaningful than the formula output.",
    "These formulas don't adjust for age, sex hormones, or ethnic risk variation — context matters far more than the number.",
  ],
  "image-compression-guide-for-faster-websites": [
    "Images account for 50–75% of page weight on most websites — compression is the highest-impact performance optimisation available.",
    "Target under 150KB for hero images; under 80KB for product images; under 30KB for thumbnails.",
    "Quality 75–85% for JPEG/WebP photographs is the sweet spot — below 70% is visibly degraded; above 85% adds size without quality.",
    "Compress after resizing to display dimensions — compressing a full-resolution image first wastes effort.",
    "Minification removes whitespace characters from HTML, CSS, and JS without affecting rendering — separate from image compression.",
  ],
  "image-resizing-guide-for-web-and-social": [
    "Always crop to the correct aspect ratio before resizing — setting dimensions without cropping stretches the image.",
    "Set the image to the actual display dimensions — uploading a 5000px image displayed at 800px wastes every visitor's bandwidth.",
    "Resize images in the file itself, not with HTML width/height attributes — the browser still downloads the full file.",
    "For product images, 800–1200px minimum is needed to enable zoom functionality on most e-commerce platforms.",
    "DPI (dots per inch) is meaningless for web images — pixel dimensions and file size are the only relevant metrics.",
  ],
  "instagram-post-planning-guide": [
    "Content pillars (3–5 recurring themes) prevent the 'what do I post today?' problem — define them before opening a calendar.",
    "The hook must land in the first 125 characters — everything after 'more' requires an active tap to read.",
    "Post when your audience is online — check Insights for your specific account's peak hours, not generic advice.",
    "Batching (creating a week's content in one session) cuts per-post creation time by 50–70%.",
    "3–5 targeted hashtags now outperform 30 generic ones — Instagram's own guidance since 2022.",
  ],
  "json-to-csv-when-and-how-to-convert": [
    "CSV is the expected export format for any data going into spreadsheets, analytics tools, or machine learning pipelines.",
    "Nested JSON objects and arrays require a decision: flatten into columns, join into delimited strings, or serialise as JSON within the CSV cell.",
    "All CSV values are strings — type information (numbers, booleans) is lost and must be re-inferred on import.",
    "Values containing commas must be quoted; values containing double quotes must escape them as double-double-quotes.",
    "Semicolons (not commas) are the standard delimiter in European locales where commas serve as decimal separators.",
  ],
  "jwt-tokens-explained": [
    "JWTs are Base64URL-encoded, not encrypted — anyone with the token can read the payload in seconds.",
    "The security comes entirely from the signature — verifying it before trusting any claims is mandatory.",
    "JWTs cannot be invalidated before expiry — short-lived access tokens (15 min–1 hr) plus revocable refresh tokens is the standard pattern.",
    "Store tokens in HTTP-only cookies to prevent JavaScript access — localStorage is vulnerable to any XSS on your page.",
    "HS256 uses a shared secret; RS256 uses a public/private key pair — RS256 is better for multi-service architectures.",
  ],
  "keyword-density-what-it-is-and-why-it-matters-less-than-you-think": [
    "No target density exists — 1–2% for primary keywords is a rough sanity check, not a target to optimise toward.",
    "Keyword stuffing (3%+) reads unnaturally and is the only density level that actively hurts rankings.",
    "Modern search algorithms assess topical completeness — semantic coverage of related terms matters more than keyword repetition.",
    "Density analysis is most useful for catching accidental repetition or confirming your primary keyword appears in expected locations.",
    "Analysing competitors' density reveals which terms they emphasise — useful for identifying topics you haven't covered.",
  ],
  "linkedin-post-formatting-for-better-reach": [
    "LinkedIn suppresses posts with external links in the body — put links in the first comment instead.",
    "Short paragraphs (1–3 sentences) with blank lines between are essential for mobile readability.",
    "The first 210 characters determine whether anyone reads beyond 'see more' — lead with the most compelling content.",
    "LinkedIn doesn't render markdown bullets — use numbers (1., 2.) or emoji as visual separators for list-style posts.",
    "2–3 posts per week is the recommended frequency — more than once per day reduces reach per post algorithmically.",
  ],
  "macro-calculator-how-to-set-your-targets": [
    "Set protein first (1.6–2.2g/kg bodyweight), fat second (minimum 0.7g/kg), then fill remaining calories with carbohydrates.",
    "Gram-based targets are more useful than percentage-based splits — percentages change as total calories change.",
    "Daily precision matters less than weekly consistency — being within 10g of targets most days is sufficient.",
    "Carbohydrate needs scale with training volume — athletes training 5+ hours per week need significantly more than sedentary individuals.",
    "Tracking macros for 2–4 weeks builds permanent nutritional awareness that persists even after stopping formal tracking.",
  ],
  "markdown-syntax-complete-reference": [
    "Markdown is a writing tool, not a styling tool — control visual appearance through CSS applied to the rendered HTML.",
    "Fenced code blocks with a language identifier (```javascript) enable syntax highlighting in most platforms.",
    "Tables, task lists, and strikethrough are GitHub Flavored Markdown extensions — not standard Markdown.",
    "Raw HTML is valid inside Markdown files and passes through most converters — useful for elements Markdown doesn't natively support.",
    "User-submitted Markdown must be sanitised before rendering to prevent XSS — Base64-encoding the content alone won't protect against it.",
  ],
  "md5-sha1-sha256-which-hash-to-use": [
    "MD5 and SHA-1 are cryptographically broken — practical collision attacks exist for both.",
    "SHA-256 is the current standard for digital signatures, TLS certificates, and data integrity.",
    "Never use a raw hash function for password storage — use bcrypt, Argon2, or scrypt instead.",
    "SHA-512 can be faster than SHA-256 on 64-bit processors because of its wider internal word size.",
    "A salt prevents rainbow table attacks — good password libraries (bcrypt, Argon2) handle salting automatically.",
  ],
  "meta-tags-complete-guide-for-seo": [
    "The title tag is the single most important on-page SEO element — include primary keyword in the first 50–60 characters.",
    "Meta descriptions don't directly affect rankings but significantly affect click-through rate from search results.",
    "Open Graph tags control social share previews — without them, platforms guess and usually get it wrong.",
    "og:image minimum 1200×630px — use an absolute URL including https://, never a relative path.",
    "Meta keywords are ignored by Google and have been since 2009 — don't spend time on them.",
  ],
  "metric-vs-imperial-unit-conversion-guide": [
    "Multiply km by 0.621 for miles, or divide by 1.609 — the rough 'divide by 1.6' approximation is accurate within 1%.",
    "Multiply kg by 2.2 for lbs — the exact factor is 2.205 but 2.2 is accurate enough for everyday use.",
    "°C to °F: multiply by 1.8 and add 32. Quick check: 20°C = 68°F, 37°C = 98.6°F (body temperature).",
    "US and UK pints are different — 1 US pint = 473ml; 1 UK pint = 568ml.",
    "DPI is irrelevant for web images — only pixel dimensions and file size matter on screen.",
  ],
  "morse-code-history-and-how-it-works": [
    "The most frequent English letters get the shortest codes — E is a single dot, T is a single dash.",
    "This frequency-based encoding is the same principle as Huffman coding used in modern data compression.",
    "SOS (··· — — — ···) was chosen because it's easy to transmit and unmistakably distinctive — the letters don't stand for anything.",
    "Morse code is still actively used in amateur radio, aviation navigation beacons, and some accessibility tools.",
    "Timing is relative to dot duration: dash = 3×, inter-letter space = 3×, inter-word space = 7×.",
  ],
  "open-graph-images-social-sharing-guide": [
    "Without OG tags, platforms guess — they extract whatever image they find first, which is almost always wrong.",
    "og:image must be an absolute URL including https:// — relative paths don't work.",
    "Minimum og:image size 1200×630px at 1.91:1 aspect ratio for reliable display across all platforms.",
    "Twitter falls back to OG tags if Twitter-specific card tags aren't present — set OG first, refine with Twitter tags.",
    "Platform caches are aggressive — use Facebook's Sharing Debugger or LinkedIn's Post Inspector to force a refresh after changes.",
  ],
  "ovulation-and-fertile-window-explained": [
    "The fertile window is approximately 5 days before ovulation plus ovulation day — not just the ovulation date itself.",
    "Ovulation typically occurs 12–16 days before the next period, not necessarily on day 14.",
    "The luteal phase (ovulation to next period) is relatively consistent at 12–16 days — the follicular phase is what varies.",
    "OPKs detect the LH surge 24–48 hours before ovulation — more reliable than calendar methods for predicting in advance.",
    "Calendar methods become unreliable for cycles varying by more than 3–4 days month to month — use OPKs instead.",
  ],
  "percentage-calculations-explained": [
    "Three types: what is X% of Y; X is what % of Y; X is Y% of what — most people can only do the first.",
    "Working backwards from a price: divide by (1 + the percentage), never subtract the percentage from the gross figure.",
    "Percentage change: ((new − old) ÷ old) × 100 — a 50% loss requires a 100% gain to recover.",
    "Percentage points are an absolute difference between two percentages; percent is a relative change — these are not the same.",
    "Stacking discounts multiply retained factors: 20% off then 10% off = paying 72%, not 70%.",
  ],
  "png-jpg-webp-which-image-format-to-use": [
    "WebP is typically 25–35% smaller than JPEG at equivalent quality — supported by all modern browsers.",
    "Use PNG for logos, icons, and any image with text or transparency — JPEG's lossy compression degrades hard edges.",
    "Converting JPG to PNG doesn't recover lost quality — lossless compression of an already-lossy file just makes it larger.",
    "SVG is always the right choice for logos and icons that need to scale — vector graphics at any resolution.",
    "GIF is obsolete for animation — WebP and AVIF support animation with far better compression and quality.",
  ],
  "pomodoro-technique-how-it-works": [
    "The technique removes the decision of when to take a break — scheduled breaks are the key mechanism.",
    "Single-tasking per Pomodoro eliminates context-switching overhead, which research shows costs 15–20 minutes per switch.",
    "Breaks require genuine mental disengagement — checking social media keeps cognitive load high.",
    "25/5 is the conventional split but 45/10 or 50/10 work better for tasks requiring long context-loading periods.",
    "Counting completed Pomodoros per task over weeks builds accurate self-knowledge for future project estimation.",
  ],
  "pregnancy-due-date-calculation-explained": [
    "Only 4% of babies arrive on their calculated due date — it's a statistical midpoint, not a prediction.",
    "Naegele's rule: add 280 days to the first day of the last menstrual period — accounts for the 2-week LMP-to-conception offset.",
    "First-trimester ultrasound Crown-Rump Length measurement is the most accurate dating method (±5–7 days).",
    "If ultrasound dating differs from LMP dating by more than a week in the first trimester, healthcare providers typically revise the date.",
    "Full-term delivery is 39–40 weeks; early term is 37–38 weeks; 80% of babies arrive within 2 weeks of EDD.",
  ],
  "profile-picture-sizes-for-every-platform": [
    "Profile pictures are often displayed as small as 32px in comment threads — the face must be large and centred in the frame.",
    "Most platforms display profile pictures as circles — ensure important content is well within the square frame with margin.",
    "Upload at the highest quality the platform accepts — compression at upload degrades quality, so starting higher preserves more detail.",
    "High contrast between subject and background is the most important factor for recognisability at small sizes.",
    "Crop tightly to the face or logo — wide shots that look fine at 400px become unrecognisable at 40px.",
  ],
  "random-name-generator-uses": [
    "Test databases seeded with realistic names look professional and are easier to read than TestUser1, TestUser2.",
    "Good name generators use phonotactic rules (legal sound patterns for a language), not random character sequences.",
    "Cultural coherence matters for fiction — names should fit the setting's geography, time period, and social context.",
    "Names are generally not copyrightable — generated names can be freely used in commercial and published work.",
    "For worldbuilding, define naming conventions per culture first, then generate names that follow them — consistency is more important than randomness.",
  ],
  "random-number-generation-explained": [
    "Never use Math.random() or Python's random module for security applications — they're not cryptographically secure.",
    "For security tokens and session IDs, use crypto.getRandomValues() (JavaScript) or the secrets module (Python).",
    "Standard PRNGs are perfectly adequate for games, simulations, statistical sampling, and A/B test assignments.",
    "To generate integers in a range: min + Math.floor(random() × (max − min + 1)).",
    "Fisher-Yates shuffle is the correct algorithm for random ordering without repeats — naive approaches introduce bias.",
  ],
  "regular-expressions-practical-guide": [
    "The dot (.) matches any character — add \\ before it to match a literal period.",
    "Quantifiers are greedy by default — add ? to make them lazy: .+? matches the shortest possible string.",
    "Anchors ^ and $ are critical for validation — without them, 'abc123' matches a pattern intended only for pure digits.",
    "Character classes [] are more readable and maintainable than long alternations for simple character matching.",
    "HTML and JSON parsing with regex always fails eventually — use proper parsers for nested or complex structured formats.",
  ],
  "retirement-planning-how-much-do-you-need": [
    "The 4% rule: multiply desired annual retirement income by 25 to get target portfolio size.",
    "The UK State Pension (£11,502/year in 2024/25) reduces how much private saving is needed — factor it in.",
    "Each additional year of working both adds contributions and reduces the drawdown period — extending work by 2 years has outsized impact.",
    "A common age-30 benchmark: 1× your annual salary saved by 30; 3× by 40; 6× by 50.",
    "Real (inflation-adjusted) return assumptions of 5–7% for equities are the evidence-based planning standard.",
  ],
  "robots-txt-complete-guide": [
    "Robots.txt is a request, not a rule — well-behaved crawlers respect it; malicious scrapers ignore it entirely.",
    "Blocking a page in robots.txt prevents crawling but doesn't remove it from search results if external sites link to it — use noindex for that.",
    "Never use robots.txt as a security measure — the file is publicly readable and can't protect sensitive content.",
    "Disallow: / (block everything) is appropriate for staging environments — accidentally deploying it to production causes ranking loss.",
    "Always include your sitemap URL in robots.txt — all major search engines support the Sitemap: directive.",
  ],
  "roman-numerals-explained": [
    "Two rules cover the entire system: addition (smaller/equal after larger → add) and subtraction (smaller before larger → subtract).",
    "Only I, X, and C can be used subtractively — and only before the next two higher values (I before V/X, X before L/C, C before D/M).",
    "MCMXCIX = 1,999: M(1000) + CM(900) + XC(90) + IX(9) — work left to right applying add/subtract as you go.",
    "Traditional clock faces use IIII rather than IV — a centuries-old convention, not an error.",
    "Standard Roman numerals cap at 3,999 (MMMCMXCIX) — larger numbers historically used an overline multiplying by 1,000.",
  ],
  "running-pace-guide-for-every-race-distance": [
    "Sub-4hr marathon requires under 5:41/km (9:09/mile) — every 10-second improvement per km saves 7 minutes total.",
    "Starting too fast is the single most common cause of second-half deterioration in races — negative splits consistently outperform even splits.",
    "Tempo pace is roughly 15–30 sec/km faster than target half marathon pace — the right intensity for threshold training.",
    "Easy runs should make up 70–80% of training volume — most runners do easy runs too fast and hard runs not hard enough.",
    "Converting between pace and speed: speed (km/h) = 60 ÷ pace (min/km).",
  ],
  "scientific-calculator-functions-explained": [
    "ln (natural log) uses base e ≈ 2.718; log uses base 10 — confusing them produces completely different answers.",
    "Degrees vs radians is the most common scientific calculator error — always check which mode you're in before trigonometry.",
    "To convert degrees to radians: multiply by π/180. 180° = π radians; 90° = π/2 radians.",
    "n! grows explosively — 10! = 3,628,800; 20! exceeds 2 quintillion.",
    "nCr (combinations) answers 'how many ways to choose r from n ignoring order' — a fundamental probability building block.",
  ],
  "sentence-length-and-readability": [
    "Varied sentence length is more important than average sentence length — uniform rhythm in either direction fatigues readers.",
    "A sentence over 30 words can almost always be split without losing meaning.",
    "Business writing and web content targets 12–18 word average sentence length — shorter than academic but longer than marketing copy.",
    "One short sentence (under 10 words) after every 2–3 medium sentences resets pace and provides emphasis.",
    "Reading your draft aloud reveals rhythm problems you can't see on the page — where you run out of breath is where to split.",
  ],
  "sleep-cycles-how-to-wake-up-feeling-rested": [
    "Sleep cycles are approximately 90 minutes — timing your alarm to cycle completions dramatically reduces sleep inertia.",
    "Waking during Stage 3 deep sleep produces the worst grogginess — it's concentrated in the first half of the night.",
    "REM sleep dominates the second half of the night — short sleep primarily cuts REM, affecting memory consolidation and mood.",
    "A consistent wake time anchors your circadian rhythm more effectively than a consistent bedtime.",
    "People who claim to function well on 5 hours consistently show measurable cognitive impairment in objective tests.",
  ],
  "social-media-audit-how-to-do-one": [
    "Most businesses have forgotten accounts on platforms they tested once — these can cause brand confusion or get misused.",
    "Inactive accounts are worse than no account — they signal abandonment and often have outdated contact details.",
    "Audit content performance for 3–6 months before drawing conclusions — shorter windows are too noisy for pattern detection.",
    "A fully completed profile (photo, bio, link, cover image) performs better in every platform's algorithm.",
    "Build a prioritised action list from findings — the goal is improvement, not documentation.",
  ],
  "social-media-character-limits-by-platform": [
    "Twitter's 280-character limit treats every URL as 23 characters regardless of actual length.",
    "Instagram shows only 125 characters before 'more' on mobile — the hook must land in that window.",
    "LinkedIn shows ~210 characters before 'see more' on desktop — your most compelling content must open within that limit.",
    "TikTok bio is only 80 characters — every word must earn its place.",
    "YouTube titles truncate at ~60–70 characters in search results — primary keyword should be in the first 50.",
  ],
  "social-media-engagement-rate-explained": [
    "Follower count is vanity; engagement rate measures whether your audience actually cares about your content.",
    "Reach-based ER (engagements ÷ reach) is more useful for content quality assessment; follower-based ER for brand comparisons.",
    "Accounts with 1,000–10,000 followers typically achieve 3–6% engagement; accounts over 100k drop to 0.5–1.5%.",
    "Saves and shares indicate high-value content that people want to reference or spread — weight them more than likes.",
    "Engagement rate declining while follower count grows is normal — larger audiences are naturally more passive.",
  ],
  "speed-distance-time-calculations": [
    "Speed = Distance ÷ Time; Distance = Speed × Time; Time = Distance ÷ Speed — know any two to find the third.",
    "For journeys with variable speeds, average speed = total distance ÷ total time — not the average of the segment speeds.",
    "Running pace (min/km) and speed (km/h) are inverses: pace = 60 ÷ speed; speed = 60 ÷ pace.",
    "Sub-4 hour marathon pace is 5:41/km (9:09/mile) — a useful reference point for race planning.",
    "Multiply mph by 1.609 for km/h; divide km/h by 1.609 for mph. Quick reference: 60mph ≈ 96.5km/h.",
  ],
  "text-case-styles-explained": [
    "camelCase is the standard for JavaScript variables and functions; PascalCase for classes and React components.",
    "snake_case is the standard for Python variables, database column names, and many API response fields.",
    "kebab-case is the standard for CSS class names, HTML attributes, URL slugs, and web file names.",
    "SCREAMING_SNAKE_CASE signals constants and environment variables across virtually all languages.",
    "URLs are case-sensitive on most servers — kebab-case lowercase slugs prevent duplicate content from capitalisation variants.",
  ],
  "text-repeater-use-cases-and-applications": [
    "Generating test strings for character limit testing or UI overflow testing is faster with a repeater than manual construction.",
    "Comma-separated repeated values can be pasted directly into SQL INSERT statements or CSV test data.",
    "A Lorem Ipsum generator is better for prose placeholder text; a repeater is better when you need a specific string reproduced exactly.",
    "Very large repeated outputs (tens of thousands of repetitions) may need a programmatic approach for performance.",
    "Repeated text in design mockups helps test how UI handles real word repetition — different from testing with lorem ipsum.",
  ],
  "tiktok-hooks-that-stop-the-scroll": [
    "You have 1–3 seconds — the hook is the only part of your video that runs before the viewer's decision to stay or leave.",
    "On-screen text reinforcing the verbal hook captures the ~50% of TikTok viewers who watch with sound off.",
    "Start mid-story — drop viewers into action already in progress rather than introducing the topic first.",
    "The curiosity gap ('most people get this wrong about X') works because the brain hates incomplete information.",
    "Test your hook: make the same video content with 2–3 different openings and compare watch time and completion rate.",
  ],
  "time-zone-conversion-guide-for-remote-teams": [
    "US and EU DST change on different dates — the offset between them differs by an hour for several weeks per year.",
    "Five countries don't observe DST at all: China, Japan, India, and most of Africa — verify current offsets, don't assume.",
    "UTC-first scheduling eliminates ambiguity for distributed teams — '14:00 UTC' is unambiguous; '2pm' is not.",
    "For wide geographic distributions (US West + Asia), accept that someone always has an inconvenient slot and rotate.",
    "Always include the timezone when sharing any time reference in cross-team communication.",
  ],
  "unix-timestamps-explained": [
    "A Unix timestamp is the number of seconds since 00:00:00 UTC on 1 January 1970.",
    "JavaScript's Date.now() returns milliseconds, not seconds — dividing by 1000 is the most common and overlooked conversion.",
    "Timestamps are timezone-agnostic; dates and times expressed from them require a timezone choice.",
    "The Year 2038 problem affects 32-bit signed integer timestamps — modern 64-bit systems are safe for ~292 billion years.",
    "ISO 8601 (2026-03-20T14:00:00Z) is human-readable and timezone-explicit — use it in developer-facing APIs alongside timestamps.",
  ],
  "url-encoding-explained": [
    "Use encodeURIComponent() for parameter values; encodeURI() for complete URLs — using the wrong one is a common bug source.",
    "Passing a URL as a query parameter requires encoding — the ? and & in the inner URL must become %3F and %26.",
    "Spaces in URLs are %20 in percent encoding but + in form encoding — mixing the two creates hard-to-debug parsing errors.",
    "URL encoding is not encryption or security — encoded characters are trivially decoded by anyone.",
    "The deprecated escape() function doesn't handle Unicode correctly — never use it.",
  ],
  "us-sales-tax-explained-by-state": [
    "No federal sales tax exists in the US — the 5 states with no state-level tax are Alaska, Delaware, Montana, New Hampshire, and Oregon.",
    "Combined rates (state + county + city) can exceed 12% in some localities — always use the combined rate for pricing.",
    "Since South Dakota v. Wayfair (2018), economic nexus rules require online sellers to collect sales tax in states where they exceed $100k sales or 200 transactions.",
    "What's taxable varies by state — groceries, clothing, and digital goods each have different taxability rules across states.",
    "Sales tax is added at the point of sale in the US — displayed prices typically exclude it, unlike most other countries.",
  ],
  "vat-explained-how-to-add-and-remove-it": [
    "To remove 20% VAT from a gross price: divide by 1.20 — never subtract 20% from the gross (that gives the wrong answer).",
    "£120 including 20% VAT: net = £120 ÷ 1.20 = £100. VAT = £20, not £24.",
    "Zero-rated (0%) and exempt are different: zero-rated allows input VAT recovery; exempt does not.",
    "UK VAT registration is mandatory once taxable turnover exceeds £90,000 (2024 threshold).",
    "For B2B sales, buyers who are VAT-registered can reclaim any VAT you charge — it's cost-neutral to them.",
  ],
  "viral-hooks-for-social-media": [
    "Every piece of content that spreads has a hook that worked first — the quality of the content is secondary.",
    "Curiosity gaps work because the brain treats incomplete information as a problem that needs resolution.",
    "Stakes ('this mistake cost me $15,000') demand attention because something important is at risk.",
    "Pattern interruption — something unexpected in the first moment — is the only reliable way to break habitual scrolling.",
    "The best hook for your specific audience is revealed by data, not intuition — test variations and measure completion rate.",
  ],
  "what-is-a-uuid-and-when-to-use-one": [
    "UUID v4 is 122 bits of random data — the probability of collision is approximately 1 in 5 undecillion.",
    "UUIDs can be generated independently by any node with no coordination — essential for distributed systems.",
    "UUID v7 adds a timestamp prefix making UUIDs sortable — significantly better for database B-tree indexes than v4.",
    "For simple single-database applications, auto-incrementing integers are smaller, faster, and simpler than UUIDs.",
    "Store UUIDs as binary(16) in databases — much more efficient than varchar(36) with hyphens.",
  ],
  "what-is-lorem-ipsum-and-why-designers-use-it": [
    "Lorem ipsum is scrambled Latin from Cicero's 'De Finibus' — it's been used as placeholder text since the 1500s.",
    "The goal is to prevent readers from focusing on copy rather than layout — meaningless text keeps attention on the design.",
    "Never publish lorem ipsum — a live page with placeholder text is treated as thin, low-quality content by search engines.",
    "For user testing, replace lorem ipsum with representative real content — users can't evaluate navigation or labels with gibberish.",
    "Generate exactly the amount you need: paragraphs for body text, shorter strings for labels and button copy.",
  ],
  "what-your-ip-address-reveals-about-you": [
    "IP geolocation accuracy: country level ~99%, region/state ~70%, city ~60% — your exact address is not determinable from IP alone.",
    "Your ISP can link an IP address to a specific subscriber at a specific time — law enforcement can request this linkage legally.",
    "A VPN masks your real IP but doesn't make you anonymous — the VPN provider can see your activity instead.",
    "Mobile carrier IPs are often associated with regional hubs, not your physical location.",
    "Dynamic IPs (most residential connections) change periodically — the same IP may be assigned to a different household the next day.",
  ],
  "when-to-spell-out-numbers-in-writing": [
    "AP Style (journalism, web): spell out one through nine; use numerals for 10 and above.",
    "Chicago Style (books, academia): spell out one through one hundred; use numerals for 101 and above.",
    "Universal rule: never start a sentence with a numeral — rewrite the sentence or spell the number out.",
    "Consistency within a sentence beats rule compliance — 'nine red chairs and 14 blue ones' looks inconsistent despite being AP-correct.",
    "Dates, ages, percentages, and measurements almost always use numerals regardless of style guide.",
  ],
  "when-to-use-bullet-points-and-when-not-to": [
    "Bullets work for genuinely list-shaped information — discrete, parallel items with no logical connection between them.",
    "When items are causally connected or build on each other, bullets strip the connections that make the logic clear.",
    "Two-item bullet lists almost always read better as prose — 'We offer X and Y' needs no formatting.",
    "Every bullet should start grammatically the same way — parallel structure makes lists scannable.",
    "Bullets created to avoid writing proper sentences signal that the thinking stopped before the writing did.",
  ],
  "why-html-minification-matters-for-page-speed": [
    "HTML minification produces 10–35% file size reduction depending on how verbose the source HTML is.",
    "Minification and compression (Gzip/Brotli) stack — minify the source, then compress the transfer on top.",
    "Images, JavaScript, and CSS typically contribute more to page weight than HTML — optimise those first.",
    "Never manually minify HTML — tooling handles edge cases (whitespace inside <pre> tags, etc.) that regex doesn't.",
    "LCP (Largest Contentful Paint) is the Core Web Vitals metric most affected by total page size — minification contributes indirectly.",
  ],
  "why-live-word-count-makes-you-a-faster-writer": [
    "A live word count prevents the 'discovered I'm 600 words short at the end of a draft' problem.",
    "Structural imbalances (400-word intro, 50-word conclusion) are visible in real time and fixable mid-draft.",
    "For client briefs, consistently under-delivering on word count signals incomplete topic coverage.",
    "The live counter separates writing from editing — you see your progress but aren't tempted to revise while the count is low.",
    "Filler words added to hit a target don't fool experienced readers — aim for the target by covering the topic more thoroughly.",
  ],
  "word-count-targets-for-every-content-type": [
    "Twitter's 280-character limit counts URLs as exactly 23 characters regardless of actual URL length.",
    "Instagram captions cut off after 125 characters on mobile — the hook must land before that truncation.",
    "Meta descriptions should be 140–160 characters — Google truncates longer ones and often ignores them to show its own snippet.",
    "Email subject lines over 40 characters are truncated on most mobile clients — lead with the most important words.",
    "For blog posts, target the length that covers the topic completely — neither pad to hit a target nor cut to appear concise.",
  ],
  "word-frequency-analysis-for-better-writing": [
    "Most writers use 3–5 favourite words they return to without noticing — frequency analysis makes this visible.",
    "Focus on content words (nouns, verbs, adjectives) — stop words like 'the' and 'and' will always dominate and tell you nothing.",
    "High-frequency repetition in the same paragraph is more noticeable to readers than the same repetition spread across an article.",
    "For SEO, analysing top-ranking competitor pages reveals the supporting vocabulary signalling topical depth.",
    "Use frequency analysis after drafting, not during — it's an editing tool, not a writing constraint.",
  ],
  "writing-captions-for-social-media": [
    "A caption's primary job depends on the goal: drive saves (value delivery), drive comments (ask a question), or drive action (clear CTA).",
    "The opening line is everything — write it last when you know exactly what the most compelling angle is.",
    "Not every post needs a CTA — over-prompting trains audiences to ignore CTAs when they actually matter.",
    "Different platforms have different tone expectations — what works on TikTok sounds wrong on LinkedIn.",
    "Batch caption writing (drafting a week at a time) produces more consistent quality than daily reactive creation.",
  ],
  "youtube-titles-and-descriptions-seo-guide": [
    "YouTube is the world's second largest search engine — SEO fundamentals apply as directly as they do to Google.",
    "Primary keyword at the start of the title gets more algorithmic weight and survives truncation at 60–70 characters.",
    "The first 157 characters of the description appear in search results — use them for the keyword and value proposition.",
    "Timestamps (00:00 Section name) appear as chapter markers in the player and improve watch time and search snippet features.",
    "External links in descriptions work fine — YouTube doesn't suppress them the way LinkedIn suppresses links in posts.",
  ],
  "was-my-password-in-a-data-breach-how-to-check-safely": [
    "Have I Been Pwned tracks over 12 billion breached accounts — being in one is nearly universal at this point.",
    "The k-anonymity method sends only 5 characters of a hashed password, never the password or full hash itself.",
    "A clean breach check doesn't mean a password is strong — it only means that exact string hasn't leaked yet.",
    "If a password is found, treat it as burned everywhere, not just where you noticed it — don't just tweak it.",
    "Credential stuffing (reusing leaked passwords against other sites) is why reuse is more dangerous than a single weak password.",
  ],
  "how-to-verify-a-file-checksum-and-why-it-matters": [
    "A checksum confirms a file matches its source exactly — one changed bit produces a completely different hash.",
    "MD5 and SHA-1 are broken for security purposes but still fine for catching accidental corruption.",
    "SHA-256 and SHA-512 are the current standard for anything security-sensitive, with no known practical collisions.",
    "A hash mismatch is most often caused by an incomplete download — re-download before assuming tampering.",
    "Checksum verification and antivirus scanning solve different problems — a matching hash says nothing about whether the source file is malicious.",
  ],
  "diceware-passphrases-vs-random-passwords-which-is-stronger": [
    "Length beats complexity for resisting brute-force attacks — a 5-word passphrase can out-entropy a 10-character complex password.",
    "Each random word from a 750-word list adds about 9.5 bits of entropy; a 7,776-word Diceware list adds about 12.9 bits.",
    "Passphrase security depends on true randomness — self-chosen memorable phrases are far weaker than machine-generated ones.",
    "5–6 random words suits most accounts; 7–8 words is worth it for a password manager's master password.",
    "Separators, capitalization, and a trailing digit or symbol satisfy legacy complexity rules without undermining the word-based approach.",
  ],
  "how-to-encrypt-text-with-a-passphrase-aes-explained": [
    "PBKDF2 stretches a memorable passphrase into a proper 256-bit AES key using 100,000+ hashing iterations.",
    "A random salt for every encryption prevents attackers from precomputing keys for common passphrases.",
    "AES-GCM is authenticated encryption — tampering with the ciphertext causes decryption to fail outright, not silently corrupt.",
    "Share the encrypted text and the passphrase through two different channels so one intercepted message doesn't expose both.",
    "There's no recovery if the passphrase is lost — no backdoor, no reset, by design.",
  ],
  "how-totp-two-factor-authentication-codes-actually-work": [
    "TOTP codes are computed independently on your device and the server from a one-time shared secret plus the current time.",
    "Nothing is transmitted to generate a code, which is why TOTP resists SIM-swapping attacks that intercept SMS codes.",
    "A device's clock drifting out of sync with the server is the most common reason codes stop matching.",
    "Most services default to 6 digits, a 30-second window, and SHA-1 — changing these requires both sides to agree.",
    "Losing the device that holds the secret means losing code generation — backup codes saved at setup are the usual recovery path.",
  ],
  "how-to-password-protect-and-redact-a-pdf-before-sharing": [
    "Drawing a black box over text doesn't remove it — the original content is often still selectable underneath unless it's actually redacted.",
    "Password protection controls who can open a file; redaction controls what's visible once it's open — they solve different problems.",
    "Redact sensitive content first, sign next, watermark after that, and password-protect last, since a locked PDF blocks further edits.",
    "A watermark deters redistribution and adds traceability but doesn't restrict access the way a password does.",
    "A weak password on a protected PDF can be brute-forced — treat it like any other password: long and unique.",
  ],
  "reorganizing-a-pdf-rotate-reorder-delete-crop-number-pages": [
    "Six operations — rotate, reorder, delete, crop, number, extract — cover nearly every PDF reorganization task.",
    "Rotating or cropping a page doesn't reduce the underlying scan resolution — only recompression does.",
    "Deleting keeps everything except the selected pages; extracting keeps only the selected pages as a new file.",
    "Page reordering works across a merged document regardless of which source file each page originally came from.",
    "Doing cleanup as separate small operations makes each change easy to verify, rather than one complex multi-step edit.",
  ],
  "converting-files-to-and-from-pdf-a-practical-guide": [
    "Word to PDF is effectively a one-way trip — PDF doesn't retain the editable document structure needed to convert back reliably.",
    "PDF-to-text extraction only works on digitally generated PDFs — a scanned image of text needs OCR instead.",
    "Excel's print area and page breaks determine how a spreadsheet paginates once converted to PDF.",
    "Most formatting loss during conversion comes down to fonts that aren't embedded and get substituted.",
    "PDF-to-JPG renders at the document's native resolution, unlike a screen-resolution-limited screenshot.",
  ],
  "filling-editing-and-extracting-data-from-pdfs": [
    "Form-filling tools only work on PDFs with actual interactive fields built in — not scanned images of forms.",
    "PDF metadata (title, author, keywords, dates) is separate from page content and can inadvertently expose information if left unedited.",
    "Extracting an embedded image pulls it at original resolution — copying from a viewer often grabs a lower-quality render.",
    "A flattened PDF form has its fields converted to static content and can no longer be edited — that's usually deliberate.",
    "Editing metadata never changes what's printed or displayed on the page itself.",
  ],
  "compressing-comparing-and-flattening-pdfs-when-each-matters": [
    "PDF compression mainly recompresses embedded images — text stays sharp regardless of compression level since it's vector data.",
    "Automated PDF comparison catches small, easy-to-miss changes — like an altered figure or date — that a skim-read often won't.",
    "Flattening converts form fields and annotations into permanent static content, and the change isn't reversible.",
    "These three tools map to a document's lifecycle: compare during review, flatten once final, compress before sending.",
    "Comparing a scanned PDF against a digital one usually needs OCR first, since a scan has no directly readable text layer.",
  ],
  "how-word-unscramblers-and-anagram-solvers-actually-work": [
    "Word unscramblers, anagram solvers, and Scrabble finders all run the same permutation-against-a-dictionary logic with different rules.",
    "An anagram must use every provided letter exactly once — a partial match doesn't count, unlike a general word unscrambler.",
    "Efficient solvers prune the search using the dictionary itself rather than generating every possible letter permutation first.",
    "Which dictionary a tool checks against matters more than the algorithm — Scrabble word lists include valid plays a general dictionary wouldn't.",
    "Word lists differ slightly between platforms, so a word valid in one game can come back as invalid in a generic checker.",
  ],
  "how-to-solve-wordle-faster-and-crack-any-crossword-clue": [
    "Wordle feedback (green/yellow/gray) filters the full valid-word list down to only words consistent with everything guessed so far.",
    "Repeated letters in Wordle answers trip up manual solving — a solver correctly handles a yellow letter that's also gray elsewhere.",
    "Crossword pattern matching narrows candidates using known crossing letters, even before the clue's wordplay is solved.",
    "A 5-letter English word is one of a few thousand realistic candidates, not one of 26⁵ possibilities, because letter patterns are constrained.",
    "Pattern matching alone doesn't parse cryptic clue wordplay — it narrows the field while the solver works out the rest separately.",
  ],
  "making-word-puzzles-for-classrooms-and-game-nights": [
    "Word scrambles require active recall of correct spelling, while word searches offer lower-pressure recognition-based reinforcement.",
    "Word searches need no rules explanation, making them useful for mixed-age groups and waiting-room activities.",
    "A random word generator is the open-ended building block behind writing prompts, party games, and custom scramble or search word lists.",
    "Grid size and hidden-word directions control word search difficulty; word length and letter count control scramble difficulty.",
    "Both the scramble and search makers accept a custom word list, useful for tying a puzzle to a specific lesson or vocabulary set.",
  ],
};

// ─── Category styling ─────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { pill: string }> = {
  Security: { pill: "bg-red-100 text-red-700" },
  Document: { pill: "bg-slate-100 text-slate-700" },
  Developer: { pill: "bg-indigo-100 text-indigo-700" },
  Writing: { pill: "bg-purple-100 text-purple-700" },
  "Social Media": { pill: "bg-pink-100 text-pink-700" },
  Finance: { pill: "bg-emerald-100 text-emerald-700" },
  "Web Performance": { pill: "bg-blue-100 text-blue-700" },
  Health: { pill: "bg-teal-100 text-teal-700" },
  Business: { pill: "bg-orange-100 text-orange-700" },
  Productivity: { pill: "bg-yellow-100 text-yellow-800" },
  "Content Creation": { pill: "bg-fuchsia-100 text-fuchsia-700" },
  Everyday: { pill: "bg-gray-100 text-gray-700" },
  Marketing: { pill: "bg-rose-100 text-rose-700" },
  Design: { pill: "bg-violet-100 text-violet-700" },
  Image: { pill: "bg-sky-100 text-sky-700" },
  Education: { pill: "bg-lime-100 text-lime-700" },
  Analytics: { pill: "bg-cyan-100 text-cyan-700" },
  Fun: { pill: "bg-amber-100 text-amber-800" },
};

const SITE_URL = "https://www.onlinetoolbase.com";
const SITE_NAME = "OnlineToolBase";

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Online Tool Base Blog`,
    description: post.description,
    keywords: post.tags.join(", "),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}
// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Page (server component) ──────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const PostContent = CONTENT_MAP[slug];
  if (!PostContent) notFound();

  const catStyle = CATEGORY_COLORS[post.category] ?? {
    pill: "bg-gray-100 text-gray-700",
  };
  const takeaways = KEY_TAKEAWAYS[slug] ?? null;
  const postUrl = `${SITE_URL}/blog/${slug}`;

  // The tool this post is primarily about — used for ClickBank/ad matching in
  // the sidebar. post.relatedTools only carries {href, label}, so resolve the
  // full tool record (slug, name, description, category) from the tools list.
  const primaryToolHref = post.relatedTools[0]?.href;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: postUrl,
    keywords: post.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-600" aria-hidden="true">
                ›
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li className="text-slate-600" aria-hidden="true">
                ›
              </li>
              <li className="text-slate-300 font-medium truncate max-w-xs">
                {post.category}
              </li>
            </ol>
          </nav>

          {/* Category + reading time pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${catStyle.pill}`}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight max-w-3xl mb-5">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-9">
            {post.description}
          </p>

          {/* Author / date bar */}
          <Link href="/about">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-6 border-t border-slate-700">
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-black select-none">
                  OT
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">
                    {SITE_NAME}
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Editorial Team
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              {/* Updated */}
              {post.updatedAt && (
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Updated {formatDate(post.updatedAt)}</span>
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Two-column grid: article (left) + sidebar (right) */}
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12 xl:gap-16">
            {/* ── ARTICLE COLUMN ─────────────────────────────────────────── */}
            <div className="min-w-0">
              {/* Key Takeaways */}
              {takeaways && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-indigo-200 shadow-sm">
                  <div className="bg-indigo-600 px-6 py-3.5 flex items-center gap-2.5">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-bold text-white tracking-wide uppercase">
                      Key Takeaways
                    </span>
                  </div>
                  <div className="bg-white px-6 py-5">
                    <ul className="space-y-3">
                      {takeaways.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                        >
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Article prose */}
              <article
                id="article-body"
                className="
                  bg-white rounded-2xl shadow-sm border border-slate-100
                  px-6 sm:px-10 lg:px-12 py-10 lg:py-12
                  prose prose-slate lg:prose-lg max-w-none
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-100
                  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-800
                  prose-p:text-slate-600 prose-p:leading-[1.85] prose-p:text-[1.05rem]
                  prose-a:text-indigo-600 prose-a:font-medium prose-a:no-underline
                  hover:prose-a:underline hover:prose-a:decoration-indigo-400
                  prose-strong:text-slate-900 prose-strong:font-semibold
                  prose-ul:my-5 prose-ol:my-5
                  prose-li:text-slate-600 prose-li:leading-relaxed prose-li:my-1
                  prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5
                  prose-code:rounded-md prose-code:text-[0.875em] prose-code:font-semibold
                  prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-md
                  prose-pre:text-sm prose-pre:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-indigo-400
                  prose-blockquote:bg-indigo-50/50 prose-blockquote:rounded-r-xl
                  prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:not-italic
                  prose-blockquote:text-slate-700
                  prose-table:text-sm prose-th:bg-slate-50 prose-th:font-semibold
                  prose-tr:border-slate-100
                "
              >
                <PostContent />
              </article>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white border border-slate-200 text-slate-500 px-3 py-1.5 rounded-full hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share bar */}
              <div className="mt-7 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Found this helpful?
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Share it with someone who&apos;d find it useful.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Share on X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0A66C2] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Share on LinkedIn
                  </a>
                </div>
              </div>

              {/* Related tools CTA */}
              {post.relatedTools.length > 0 && (
                <div className="mt-6 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-700 p-7 shadow-lg">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white mb-1">
                        Free tools mentioned in this article
                      </h2>
                      <p className="text-indigo-200 text-sm leading-snug">
                        Works in your browser — no signup, no install required.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {post.relatedTools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="inline-flex items-center gap-1.5 bg-white text-indigo-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                      >
                        {tool.label}
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Back link */}
              <div className="mt-8 pb-2">
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to all articles
                </a>
              </div>
            </div>

            {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
            <aside className="hidden lg:block">
              {/* Sticky wrapper */}
              <div className="sticky top-6 space-y-5">
                {/* Ad + Latest Articles + ClickBank recommendation */}
                {tool && <SidebarPromoWidgets tool={tool} />}

                {/* Scroll-spy TOC — client component */}
                <BlogPostClient postUrl={postUrl} postTitle={post.title} />

                {/* Tools widget */}
                {post.relatedTools.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100">
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        Free Tools
                      </p>
                    </div>
                    <div className="p-3 space-y-0.5">
                      {post.relatedTools.map((tool) => (
                        <a
                          key={tool.href}
                          href={tool.href}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-indigo-50 group transition-colors"
                        >
                          <span className="text-sm text-slate-700 group-hover:text-indigo-700 font-medium transition-colors leading-snug">
                            {tool.label}
                          </span>
                          <svg
                            className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {/*// Inside the sidebar sticky div, after the tools widget:*/}
                <SubscribeForm variant="inline" />
                {/* Promo card */}
                <div className="rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 p-6 text-white">
                  <div className="text-3xl mb-3">🛠️</div>
                  <h3 className="font-black text-base mb-2 leading-snug">
                    Online Calculators, Pdf Tools & More
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Calculators, converters, generators, Pdf Tools and more. No
                    account needed.
                  </p>
                  <a
                    href="/tools"
                    className="block text-center bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Browse All Tools →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}