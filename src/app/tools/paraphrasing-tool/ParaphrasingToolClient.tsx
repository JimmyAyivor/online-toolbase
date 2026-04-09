"use client";
import React, { useState } from "react";
import {
  RefreshCw,
  Copy,
  Check,
  FileText,
  Wand2,
  ArrowRight,
  Download,
  Trash2,
} from "lucide-react";

export default function ParaphrasingToolClient() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const modes = [
    {
      id: "standard",
      name: "Standard",
      description: "Balanced rewrite",
      icon: "📝",
    },
    {
      id: "fluent",
      name: "Fluent",
      description: "Natural and flowing",
      icon: "✨",
    },
    {
      id: "formal",
      name: "Formal",
      description: "Professional tone",
      icon: "💼",
    },
    {
      id: "simple",
      name: "Simple",
      description: "Easy to understand",
      icon: "🎯",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Unique expression",
      icon: "🎨",
    },
    { id: "expand", name: "Expand", description: "More detailed", icon: "📚" },
  ];

  const synonymMap = {
    important: ["significant", "crucial", "vital", "essential", "key"],
    good: ["excellent", "great", "positive", "beneficial", "favorable"],
    bad: ["poor", "negative", "unfavorable", "detrimental", "adverse"],
    big: ["large", "substantial", "considerable", "significant", "major"],
    small: ["minor", "limited", "modest", "slight", "little"],
    very: [
      "extremely",
      "highly",
      "remarkably",
      "exceptionally",
      "particularly",
    ],
    many: ["numerous", "several", "various", "multiple", "countless"],
    help: ["assist", "aid", "support", "facilitate", "enable"],
    use: ["utilize", "employ", "apply", "implement", "leverage"],
    show: ["demonstrate", "illustrate", "display", "reveal", "indicate"],
    make: ["create", "produce", "generate", "develop", "establish"],
    think: ["believe", "consider", "assume", "suppose", "presume"],
    need: ["require", "necessitate", "demand", "call for", "warrant"],
    want: ["desire", "wish", "seek", "aspire", "aim"],
    get: ["obtain", "acquire", "secure", "gain", "receive"],
  };

  const paraphraseText = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      let paraphrased = inputText;

      // Simple paraphrasing logic (in production, you'd use an API or advanced NLP)
      Object.keys(synonymMap).forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        const matches = paraphrased.match(regex);

        if (matches) {
          matches.forEach(() => {
            const synonyms = synonymMap[word as keyof typeof synonymMap];
            const replacement =
              synonyms[Math.floor(Math.random() * synonyms.length)];
            paraphrased = paraphrased.replace(regex, replacement);
          });
        }
      });

      // Mode-specific adjustments
      if (mode === "formal") {
        paraphrased = paraphrased.replace(/don't/gi, "do not");
        paraphrased = paraphrased.replace(/won't/gi, "will not");
        paraphrased = paraphrased.replace(/can't/gi, "cannot");
      } else if (mode === "simple") {
        paraphrased = paraphrased.replace(/utilize/gi, "use");
        paraphrased = paraphrased.replace(/demonstrate/gi, "show");
      } else if (mode === "expand") {
        const sentences = paraphrased.split(". ");
        paraphrased = sentences
          .map((s) => {
            if (s.length > 0 && s.split(" ").length < 15) {
              return s + ", which is particularly noteworthy";
            }
            return s;
          })
          .join(". ");
      }

      // Sentence restructuring
      const sentences = paraphrased.split(". ");
      paraphrased = sentences
        .map((sentence) => {
          if (Math.random() > 0.5 && sentence.includes(",")) {
            const parts = sentence.split(",");
            if (parts.length === 2) {
              return parts[1].trim() + ", " + parts[0].toLowerCase();
            }
          }
          return sentence;
        })
        .join(". ");

      setOutputText(paraphrased);
      setIsProcessing(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([outputText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "paraphrased-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const stats = {
    inputWords: inputText.trim() ? inputText.trim().split(/\s+/).length : 0,
    outputWords: outputText.trim() ? outputText.trim().split(/\s+/).length : 0,
    inputChars: inputText.length,
    outputChars: outputText.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-violet-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Paraphrasing Tool
          </h2>
          <p className="text-gray-500">
            Rewrite your text with different words while keeping the meaning
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <FileText className="w-6 h-6 text-violet-600" />
                Original Text
              </h3>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste or type your text here to paraphrase..."
                className="w-full h-64 px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none text-base leading-relaxed"
              />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-violet-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-violet-600">
                    {stats.inputWords}
                  </div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.inputChars}
                  </div>
                  <div className="text-sm text-gray-600">Characters</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={paraphraseText}
                disabled={!inputText.trim() || isProcessing}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                  !inputText.trim() || isProcessing
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6" />
                    Paraphrase Text
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>

            {outputText && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-xl">
                    <Wand2 className="w-6 h-6 text-violet-600" />
                    Paraphrased Text
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handleClear}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {outputText}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-violet-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-violet-600">
                      {stats.outputWords}
                    </div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.outputChars}
                    </div>
                    <div className="text-sm text-gray-600">Characters</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-violet-600" />
                Paraphrasing Mode
              </h3>

              <div className="space-y-3">
                {modes.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                      mode === m.id
                        ? "bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-500"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={m.id}
                      checked={mode === m.id}
                      onChange={(e) => setMode(e.target.value)}
                      className="mt-1 w-5 h-5 text-violet-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{m.icon}</span>
                        <span className="font-bold text-gray-900">
                          {m.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {m.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
              <p className="font-semibold mb-2 text-gray-800">💡 Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Always review and edit the output before publishing</li>
                <li>
                  Use Formal mode for business emails and professional documents
                </li>
                <li>Use Simple mode to make complex text more accessible</li>
                <li>Use Expand mode to add depth to short or thin content</li>
                <li>Use Creative mode for marketing copy and social media</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
