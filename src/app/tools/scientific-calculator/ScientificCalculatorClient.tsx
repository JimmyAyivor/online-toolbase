"use client";
import React, { useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type AngleMode = "deg" | "rad";

// ─── Constants ───────────────────────────────────────────────────────────────

const BUTTONS: {
  label: string;
  value: string;
  type: "number" | "op" | "fn" | "special";
}[] = [
  { label: "sin", value: "sin(", type: "fn" },
  { label: "cos", value: "cos(", type: "fn" },
  { label: "tan", value: "tan(", type: "fn" },
  { label: "√", value: "sqrt(", type: "fn" },
  { label: "log", value: "log(", type: "fn" },
  { label: "ln", value: "ln(", type: "fn" },
  { label: "(", value: "(", type: "op" },
  { label: ")", value: ")", type: "op" },
  { label: "π", value: "pi", type: "special" },
  { label: "e", value: "e", type: "special" },
  { label: "^", value: "^", type: "op" },
  { label: "C", value: "clear", type: "special" },
  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "÷", value: "/", type: "op" },
  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "×", value: "*", type: "op" },
  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },
  { label: "−", value: "-", type: "op" },
  { label: "0", value: "0", type: "number" },
  { label: ".", value: ".", type: "number" },
  { label: "⌫", value: "back", type: "special" },
  { label: "+", value: "+", type: "op" },
  { label: "=", value: "=", type: "special" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeEval(expr: string, mode: AngleMode): string {
  try {
    const PI = Math.PI;
    const E = Math.E;
    const deg = (x: number) => (mode === "deg" ? (x * PI) / 180 : x);

    const prepared = expr
      .replace(/pi/g, String(PI))
      .replace(/\be\b/g, String(E))
      .replace(/\^/g, "**")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/sin\(/g, `Math.sin(deg(`)
      .replace(/cos\(/g, `Math.cos(deg(`)
      .replace(/tan\(/g, `Math.tan(deg(`);

    // Count extra closing parens needed for trig
    const trigCount = (expr.match(/sin\(|cos\(|tan\(/g) ?? []).length;
    const closingExtra = ")".repeat(trigCount);

    const safe = prepared + closingExtra;

    // Validate: only allow safe characters
    if (/[^0-9+\-*/().eE,Math_a-z\s]/i.test(safe.replace(/Math\.\w+/g, ""))) {
      return "Error";
    }

    // eslint-disable-next-line no-new-func
    const result = new Function(`"use strict"; return (${safe})`)();
    if (!isFinite(result)) return "Error";
    const n = Number(result);
    return Number.isInteger(n)
      ? String(n)
      : n.toPrecision(10).replace(/\.?0+$/, "");
  } catch {
    return "Error";
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ScientificCalculatorClient() {
  const [expr, setExpr] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [mode, setMode] = useState<AngleMode>("deg");
  const [history, setHistory] = useState<string[]>([]);

  const press = (value: string): void => {
    if (value === "clear") {
      setExpr("");
      setResult("");
      return;
    }
    if (value === "back") {
      setExpr((p) => p.slice(0, -1));
      return;
    }
    if (value === "=") {
      const r = safeEval(expr, mode);
      setResult(r);
      if (r !== "Error") {
        setHistory((prev) => [`${expr} = ${r}`, ...prev.slice(0, 9)]);
      }
      return;
    }
    setExpr((p) => p + value);
    setResult("");
  };

  const reset = (): void => {
    setExpr("");
    setResult("");
    setHistory([]);
  };

  const btnColor: Record<string, string> = {
    number: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200",
    op: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold",
    fn: "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-sm",
    special:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-700 to-indigo-800 rounded-2xl mb-4 shadow-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Scientific Calculator
            </h2>
            <p className="text-gray-500">
              Full-featured scientific calculator with trigonometry and
              logarithm functions
            </p>
          </div>

          <div className="space-y-6">
            {/* Angle mode + reset */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Angle Mode
                  </label>
                  <div className="flex gap-2">
                    {(["deg", "rad"] as AngleMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm uppercase transition-colors border ${
                          mode === m
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Display */}
            <div className="bg-gray-900 rounded-xl p-5 min-h-[90px] flex flex-col items-end justify-center">
              <div className="text-gray-400 text-sm font-mono min-h-[20px]">
                {expr || " "}
              </div>
              <div
                className={`font-mono font-bold text-3xl ${
                  result === "Error" ? "text-red-400" : "text-green-400"
                }`}
              >
                {result || "0"}
              </div>
            </div>

            {/* Button grid */}
            <div className="grid grid-cols-4 gap-2">
              {BUTTONS.map(({ label, value, type }) => (
                <button
                  key={`${label}-${value}`}
                  onClick={() => press(value)}
                  className={`py-3 rounded-lg font-semibold text-sm transition-colors ${btnColor[type]} ${
                    label === "="
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600"
                      : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  History
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="max-h-48 overflow-y-auto">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {history.map((entry, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm font-mono text-gray-600">
                              {entry}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Switch between DEG and RAD for trigonometric functions — sin(90)
                in DEG = 1
              </li>
              <li>Use ^ for exponentiation — e.g. 2^10 = 1024</li>
              <li>
                π and e are available as constants — click the buttons or type
                pi / e in the expression
              </li>
              <li>
                The last 10 calculations are saved in History for quick
                reference
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
