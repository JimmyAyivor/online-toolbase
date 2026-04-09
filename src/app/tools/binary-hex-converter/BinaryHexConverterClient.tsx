"use client";
import React, { useState } from "react";
import { Binary, Copy, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Base = "binary" | "octal" | "decimal" | "hex";

interface BaseConfig {
  key: Base;
  label: string;
  prefix: string;
  radix: number;
  placeholder: string;
  valueColor: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const BASES: BaseConfig[] = [
  {
    key: "binary",
    label: "Binary",
    prefix: "0b",
    radix: 2,
    placeholder: "e.g. 10101111",
    valueColor: "text-red-600",
  },
  {
    key: "octal",
    label: "Octal",
    prefix: "0o",
    radix: 8,
    placeholder: "e.g. 257",
    valueColor: "text-amber-600",
  },
  {
    key: "decimal",
    label: "Decimal",
    prefix: "",
    radix: 10,
    placeholder: "e.g. 175",
    valueColor: "text-emerald-600",
  },
  {
    key: "hex",
    label: "Hexadecimal",
    prefix: "0x",
    radix: 16,
    placeholder: "e.g. AF",
    valueColor: "text-indigo-600",
  },
];

const REFERENCE_VALUES = [0, 1, 2, 4, 8, 10, 15, 16, 32, 64, 128, 255];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function convertFromBase(
  value: string,
  radix: number,
): Record<Base, string> | null {
  const cleaned = value.trim().replace(/\s/g, "");
  if (!cleaned) return null;
  const n = parseInt(cleaned, radix);
  if (isNaN(n) || n < 0) return null;
  return {
    binary: n.toString(2),
    octal: n.toString(8),
    decimal: n.toString(10),
    hex: n.toString(16).toUpperCase(),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BinaryHexConverterClient() {
  const [inputs, setInputs] = useState<Record<Base, string>>({
    binary: "",
    octal: "",
    decimal: "",
    hex: "",
  });
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<Base | null>(null);

  const handleChange = (base: Base, value: string): void => {
    setError("");
    const cfg = BASES.find((b) => b.key === base)!;
    const result = convertFromBase(value, cfg.radix);
    if (value.trim() && !result) {
      setError(`"${value.trim()}" is not a valid ${cfg.label} value.`);
      setInputs({ binary: "", octal: "", decimal: "", hex: "", [base]: value });
      return;
    }
    setInputs(result ?? { binary: "", octal: "", decimal: "", hex: "" });
  };

  const reset = (): void => {
    setInputs({ binary: "", octal: "", decimal: "", hex: "" });
    setError("");
    setCopied(null);
  };

  const copyValue = (base: Base): void => {
    navigator.clipboard.writeText(inputs[base]);
    setCopied(base);
    setTimeout(() => setCopied(null), 2000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Binary className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Binary &amp; Hex Converter
            </h2>
            <p className="text-gray-600">
              Type in any field and all other bases update instantly
            </p>
          </div>

          <div className="space-y-6">
            {/* Converter */}
            <div className="grid md:grid-cols-2 gap-4">
              {BASES.map((cfg) => (
                <div key={cfg.key}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {cfg.label}
                      {cfg.prefix && (
                        <span className="text-gray-400 font-normal ml-1">
                          ({cfg.prefix})
                        </span>
                      )}
                    </label>
                    {inputs[cfg.key] && (
                      <button
                        onClick={() => copyValue(cfg.key)}
                        className="flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                      >
                        <Copy className="w-3 h-3" />
                        {copied === cfg.key ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={inputs[cfg.key]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(cfg.key, e.target.value)
                    }
                    placeholder={cfg.placeholder}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-lg ${cfg.valueColor}`}
                  />
                </div>
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All
              </button>
            </div>

            {/* Stats */}
            {inputs.decimal && !error && (
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {inputs.decimal} in all bases
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {BASES.map((cfg) => (
                    <div key={cfg.key} className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">
                        {cfg.label}
                      </div>
                      <div
                        className={`font-mono font-bold text-sm break-all ${cfg.valueColor}`}
                      >
                        {cfg.prefix}
                        {inputs[cfg.key]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reference table */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Common Values Reference
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        {BASES.map((cfg) => (
                          <th
                            key={cfg.key}
                            className={`px-4 py-3 text-left text-sm font-semibold ${cfg.valueColor}`}
                          >
                            {cfg.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {REFERENCE_VALUES.map((n) => (
                        <tr
                          key={n}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleChange("decimal", String(n))}
                        >
                          <td className="px-4 py-3 text-sm font-mono text-red-600">
                            {n.toString(2)}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-amber-600">
                            {n.toString(8)}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-emerald-600">
                            {n}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-indigo-600">
                            {n.toString(16).toUpperCase()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Click any row in the reference table to load that value</li>
              <li>Binary uses only 0 and 1; hexadecimal uses 0–9 and A–F</li>
              <li>
                0xFF = 255 decimal — this notation is commonly used for byte
                masks in programming
              </li>
              <li>
                Spaces in binary input are ignored, so you can paste
                space-separated nibbles like &ldquo;1010 1111&rdquo;
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
