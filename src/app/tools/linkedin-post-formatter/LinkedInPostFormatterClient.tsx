"use client";
import React, { useState, useMemo } from "react";
import { Copy, Check, Bold, Italic, Type } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type PostType =
  | "thought"
  | "story"
  | "tips"
  | "achievement"
  | "question"
  | "resource";

interface PostTemplate {
  label: string;
  icon: string;
  desc: string;
  template: string;
}

interface FormatOption {
  label: string;
  icon: React.ReactNode;
  apply: (s: string) => string;
  example: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

// Unicode bold/italic converters
const BOLD_MAP: Record<string, string> = Object.fromEntries([
  ..."abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((c, i) => [c, String.fromCodePoint(0x1d41a + i)]),
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((c, i) => [c, String.fromCodePoint(0x1d400 + i)]),
  ..."0123456789"
    .split("")
    .map((c, i) => [c, String.fromCodePoint(0x1d7ce + i)]),
]);

const ITALIC_MAP: Record<string, string> = Object.fromEntries([
  ..."abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((c, i) => [
      c,
      i === 8 ? "\u{1D456}" : String.fromCodePoint(0x1d44e + i),
    ]),
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((c, i) => [c, String.fromCodePoint(0x1d434 + i)]),
]);

const SANS_MAP: Record<string, string> = Object.fromEntries([
  ..."abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((c, i) => [c, String.fromCodePoint(0x1d5ba + i)]),
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((c, i) => [c, String.fromCodePoint(0x1d5a0 + i)]),
]);

function toBold(text: string): string {
  return text
    .split("")
    .map((c) => BOLD_MAP[c] ?? c)
    .join("");
}
function toItalic(text: string): string {
  return text
    .split("")
    .map((c) => ITALIC_MAP[c] ?? c)
    .join("");
}
function toSans(text: string): string {
  return text
    .split("")
    .map((c) => SANS_MAP[c] ?? c)
    .join("");
}

const FORMAT_OPTIONS: FormatOption[] = [
  {
    label: "Bold",
    icon: <Bold className='w-3.5 h-3.5' />,
    apply: toBold,
    example: "𝗛𝗲𝗹𝗹𝗼",
  },
  {
    label: "Italic",
    icon: <Italic className='w-3.5 h-3.5' />,
    apply: toItalic,
    example: "𝘏𝘦𝘭𝘭𝘰",
  },
  {
    label: "Sans",
    icon: <Type className='w-3.5 h-3.5' />,
    apply: toSans,
    example: "𝖧𝖾𝗅𝗅𝗈",
  },
];

const POST_TEMPLATES: Record<PostType, PostTemplate> = {
  thought: {
    label: "Thought Leadership",
    icon: "💡",
    desc: "Share a professional insight",
    template: `[Bold opening statement — your core insight or controversial opinion]

[Expand: 2-3 sentences explaining what you mean and why it matters]

Here's what most people get wrong:

→ [Common mistake or misconception]
→ [Another mistake]
→ [Third mistake]

The truth is: [Your reframe or solution]

[1-2 sentences on what this means for your audience]

What do you think? Drop your take in the comments 👇

#[Hashtag1] #[Hashtag2] #[Hashtag3]`,
  },
  story: {
    label: "Personal Story",
    icon: "📖",
    desc: "Narrative that leads to a lesson",
    template: `[Year/timeframe]: [What happened — state the dramatic outcome first]

Here's the full story:

[Set the scene — what was happening in your life/career]

[The challenge or problem you faced]

[The turning point — what changed or what you did]

[The result]

The 3 things I learned:

1. [Lesson one]
2. [Lesson two]
3. [Lesson three]

If you're going through something similar — [encouraging or practical message]

Follow me for more honest takes on [your topic] 📌`,
  },
  tips: {
    label: "Tips Post",
    icon: "📋",
    desc: "Valuable numbered list for your audience",
    template: `[N] [topic] tips that took me [X years/time] to learn:

(Save this. You'll want it later)

―――

1/ [Tip one]
→ [Brief explanation or how-to]

2/ [Tip two]
→ [Brief explanation or how-to]

3/ [Tip three]
→ [Brief explanation or how-to]

4/ [Tip four]
→ [Brief explanation or how-to]

5/ [Tip five — often the most surprising or counterintuitive]
→ [Brief explanation or how-to]

―――

Which one hit hardest? Let me know below 👇

Follow for weekly posts on [your topic]`,
  },
  achievement: {
    label: "Achievement",
    icon: "🏆",
    desc: "Share a win with context and lessons",
    template: `[The achievement — be specific] 🎉

I'm sharing this not to brag, but because [why it matters / what it represents]

[2-3 sentences of honest context: where you started, what it took]

What actually made the difference:

✅ [Factor 1]
✅ [Factor 2]
✅ [Factor 3]

The part most people don't see: [honest truth about the hard parts]

To anyone working toward [similar goal]: [encouraging, specific message]

#[Hashtag1] #[Hashtag2]`,
  },
  question: {
    label: "Engagement Question",
    icon: "💬",
    desc: "Spark discussion in your network",
    template: `[Thought-provoking question related to your industry] 🤔

I've been thinking about this a lot lately because [brief context — why this matters right now]

My take: [Your opinion in 1-2 sentences]

But I'd love to hear from others in [industry/role]:

→ [Sub-question 1]
→ [Sub-question 2]

There's no right answer here — I'm genuinely curious about different perspectives.

Tag someone whose opinion you'd love to see 👇`,
  },
  resource: {
    label: "Resource Share",
    icon: "📚",
    desc: "Curate valuable resources for your network",
    template: `The [N] best free resources for [topic] (I wish I'd found these sooner):

🔖 Save this for later

――

1. [Resource name]
What it is: [One sentence description]
Best for: [Who benefits most]
Link: [URL]

2. [Resource name]
What it is: [One sentence description]
Best for: [Who benefits most]
Link: [URL]

3. [Resource name]
What it is: [One sentence description]
Best for: [Who benefits most]
Link: [URL]

――

Got a resource that should be on this list? Drop it below 👇

Follow me for weekly [topic] resources`,
  },
};

const POST_TYPE_KEYS = Object.keys(POST_TEMPLATES) as PostType[];
const CHAR_LIMIT = 3000;
const PREVIEW_LIMIT = 210; // LinkedIn truncates after this

// ─── Helpers ─────────────────────────────────────────────────────────────────

function applyToSelection(
  textarea: HTMLTextAreaElement,
  text: string,
  fn: (s: string) => string,
  setText: (s: string) => void,
): void {
  const { selectionStart: start, selectionEnd: end } = textarea;
  if (start === end) return;
  const before = text.slice(0, start);
  const selected = text.slice(start, end);
  const after = text.slice(end);
  setText(before + fn(selected) + after);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function LinkedInPostFormatterClient() {
  const [postType, setPostType] = useState<PostType>("thought");
  const [text, setText] = useState<string>("");
  const [showFull, setShowFull] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const charCount = text.length;
  const over = charCount > CHAR_LIMIT;

  const loadTemplate = (type: PostType): void => {
    setPostType(type);
    setText(POST_TEMPLATES[type].template);
  };

  const applyFormat = (fn: (s: string) => string): void => {
    if (!textareaRef.current) return;
    applyToSelection(textareaRef.current, text, fn, setText);
  };

  const copyPost = (): void => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const previewText = useMemo(() => {
    if (!text) return "";
    return showFull
      ? text
      : text.slice(0, PREVIEW_LIMIT) + (text.length > PREVIEW_LIMIT ? "…" : "");
  }, [text, showFull]);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 p-4 md:p-8'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-700 rounded-2xl mb-4 shadow-lg'>
              <span className='text-2xl'>💼</span>
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              LinkedIn Post Formatter
            </h2>
            <p className='text-gray-600'>
              Create perfectly formatted, high-engagement LinkedIn posts
            </p>
          </div>

          {/* Post type selector */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Post Type
            </label>
            <div className='grid grid-cols-3 md:grid-cols-6 gap-2'>
              {POST_TYPE_KEYS.map((type) => {
                const tpl = POST_TEMPLATES[type];
                return (
                  <button
                    key={type}
                    onClick={() => loadTemplate(type)}
                    className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                      postType === type
                        ? "border-blue-600 bg-blue-50 text-blue-700 scale-105 shadow"
                        : "border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200"
                    }`}
                  >
                    <span className='text-xl'>{tpl.icon}</span>
                    <span className='text-center leading-tight'>
                      {tpl.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            {/* Editor */}
            <div className='space-y-3'>
              {/* Format toolbar */}
              <div className='flex items-center gap-2'>
                <span className='text-xs font-semibold text-gray-500 mr-1'>
                  Format selection:
                </span>
                {FORMAT_OPTIONS.map(({ label, icon, apply, example }) => (
                  <button
                    key={label}
                    onClick={() => applyFormat(apply)}
                    title={`${label} — ${example}`}
                    className='flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors'
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                placeholder='Paste or write your LinkedIn post here, or pick a template above…'
                rows={18}
                className='w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-sm resize-none leading-relaxed font-mono'
              />

              <div className='flex items-center justify-between'>
                <span
                  className={`text-sm font-semibold ${over ? "text-red-600" : charCount > CHAR_LIMIT * 0.85 ? "text-orange-500" : "text-gray-400"}`}
                >
                  {charCount.toLocaleString()} / {CHAR_LIMIT.toLocaleString()}{" "}
                  characters
                </span>
                <button
                  onClick={copyPost}
                  className='flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold text-sm transition-colors'
                >
                  {copied ? (
                    <>
                      <Check className='w-4 h-4' /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className='w-4 h-4' /> Copy Post
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live preview */}
            <div className='space-y-4'>
              <h3 className='font-bold text-gray-700'>Feed Preview</h3>

              {/* Fake LinkedIn card */}
              <div className='border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
                {/* Profile bar */}
                <div className='flex items-center gap-3 px-4 pt-4 pb-3'>
                  <div className='w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                    Y
                  </div>
                  <div>
                    <div className='text-sm font-bold text-gray-900'>
                      Your Name
                    </div>
                    <div className='text-xs text-gray-500'>
                      Your Title · 1st · Just now
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <span className='text-xs text-blue-700 font-semibold'>
                      + Follow
                    </span>
                  </div>
                </div>

                {/* Post content */}
                <div className='px-4 pb-2 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[80px]'>
                  {previewText || (
                    <span className='text-gray-400 italic'>
                      Your post will appear here…
                    </span>
                  )}
                </div>

                {text.length > PREVIEW_LIMIT && (
                  <button
                    onClick={() => setShowFull((v) => !v)}
                    className='px-4 pb-3 text-xs text-gray-500 hover:text-gray-700 font-semibold'
                  >
                    {showFull ? "…see less" : "…see more"}
                  </button>
                )}

                {/* Engagement bar */}
                <div className='border-t border-gray-100 px-4 py-2 flex gap-4 text-xs text-gray-500'>
                  {["👍 Like", "💬 Comment", "🔁 Repost", "✈️ Send"].map(
                    (a) => (
                      <span key={a} className='font-semibold'>
                        {a}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Character warnings */}
              <div className='bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-800 space-y-1.5'>
                <div className='font-bold text-blue-900 mb-2'>
                  📐 LinkedIn Post Rules
                </div>
                <div
                  className={
                    charCount > PREVIEW_LIMIT
                      ? "text-orange-700 font-semibold"
                      : ""
                  }
                >
                  {charCount > PREVIEW_LIMIT ? "⚠️" : "✅"} First 210 chars
                  visible before "see more" ({PREVIEW_LIMIT} limit)
                </div>
                <div className={over ? "text-red-700 font-semibold" : ""}>
                  {over ? "❌" : "✅"} Character limit:{" "}
                  {charCount.toLocaleString()} / {CHAR_LIMIT.toLocaleString()}
                </div>
                <div>📌 Best posting times: Tue–Thu, 7–9am or 5–6pm</div>
                <div>💡 3–5 hashtags outperform 10+ hashtags</div>
                <div>📊 Posts with line breaks get 2x more engagement</div>
              </div>

              {/* Format examples */}
              <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                <div className='text-xs font-bold text-gray-700 mb-2'>
                  Unicode Formatting Examples
                </div>
                <div className='space-y-1 text-sm'>
                  <div>
                    <span className='text-gray-400 text-xs'>Bold: </span>𝗧𝗵𝗶𝘀 𝗶𝘀
                    𝗯𝗼𝗹𝗱 𝘁𝗲𝘅𝘁
                  </div>
                  <div>
                    <span className='text-gray-400 text-xs'>Italic: </span>𝘛𝘩𝘪𝘴
                    𝘪𝘴 𝘪𝘵𝘢𝘭𝘪𝘤 𝘵𝘦𝘹𝘵
                  </div>
                  <div>
                    <span className='text-gray-400 text-xs'>Sans: </span>𝖳𝗁𝗂𝗌 𝗂𝗌
                    𝗌𝖺𝗇𝗌 𝗍𝖾𝗑𝗍
                  </div>
                  <div className='text-xs text-gray-400 mt-1'>
                    Select text in the editor → click a format button
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
