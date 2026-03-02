"use client";
import React, { useState } from "react";
import { Clock, Copy, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FieldKey = "min" | "hour" | "dom" | "month" | "dow";
type Mode = "every" | "specific" | "range" | "step";

interface FieldState {
  mode: Mode;
  specific: string;
  rangeFrom: string;
  rangeTo: string;
  stepEvery: string;
  stepStart: string;
}

interface CronField {
  key: FieldKey;
  label: string;
  min: number;
  max: number;
  names?: string[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FIELDS: CronField[] = [
  { key: "min", label: "Minute", min: 0, max: 59 },
  { key: "hour", label: "Hour", min: 0, max: 23 },
  { key: "dom", label: "Day of Month", min: 1, max: 31 },
  {
    key: "month",
    label: "Month",
    min: 1,
    max: 12,
    names: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  {
    key: "dow",
    label: "Day of Week",
    min: 0,
    max: 6,
    names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
];

const PRESETS: { label: string; expr: string; desc: string }[] = [
  { label: "Every minute", expr: "* * * * *", desc: "Runs every minute" },
  { label: "Every hour", expr: "0 * * * *", desc: "At minute 0 of every hour" },
  { label: "Daily midnight", expr: "0 0 * * *", desc: "Every day at 00:00" },
  { label: "Mon 9am", expr: "0 9 * * 1", desc: "Every Monday at 09:00" },
  { label: "Weekdays 8am", expr: "0 8 * * 1-5", desc: "Mon–Fri at 08:00" },
  { label: "Every 15 min", expr: "*/15 * * * *", desc: "Every 15 minutes" },
  { label: "Every 6 hours", expr: "0 */6 * * *", desc: "Every 6 hours" },
  { label: "1st of month", expr: "0 0 1 * *", desc: "Midnight on the 1st" },
  { label: "Every Sunday", expr: "0 0 * * 0", desc: "Midnight every Sunday" },
  { label: "Twice daily", expr: "0 6,18 * * *", desc: "At 06:00 and 18:00" },
];

const DEFAULT_FIELD: FieldState = {
  mode: "every",
  specific: "",
  rangeFrom: "",
  rangeTo: "",
  stepEvery: "",
  stepStart: "0",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildExpr(s: FieldState): string {
  switch (s.mode) {
    case "every":
      return "*";
    case "specific":
      return s.specific || "*";
    case "range":
      return s.rangeFrom && s.rangeTo ? `${s.rangeFrom}-${s.rangeTo}` : "*";
    case "step":
      return s.stepEvery ? `${s.stepStart || "*"}/${s.stepEvery}` : "*";
    default:
      return "*";
  }
}

function parsePreset(expr: string): Record<FieldKey, FieldState> {
  const parts = expr.split(" ");
  const keys: FieldKey[] = ["min", "hour", "dom", "month", "dow"];
  const result = {} as Record<FieldKey, FieldState>;
  keys.forEach((k, i) => {
    const p = parts[i] ?? "*";
    if (p === "*") {
      result[k] = { ...DEFAULT_FIELD };
    } else if (p.includes("/")) {
      const [start, step] = p.split("/");
      result[k] = {
        ...DEFAULT_FIELD,
        mode: "step",
        stepStart: start,
        stepEvery: step,
      };
    } else if (p.includes("-")) {
      const [from, to] = p.split("-");
      result[k] = {
        ...DEFAULT_FIELD,
        mode: "range",
        rangeFrom: from,
        rangeTo: to,
      };
    } else {
      result[k] = { ...DEFAULT_FIELD, mode: "specific", specific: p };
    }
  });
  return result;
}

function makeDefault(): Record<FieldKey, FieldState> {
  return {
    min: { ...DEFAULT_FIELD },
    hour: { ...DEFAULT_FIELD },
    dom: { ...DEFAULT_FIELD },
    month: { ...DEFAULT_FIELD },
    dow: { ...DEFAULT_FIELD },
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CronExpressionBuilderClient() {
  const [fields, setFields] =
    useState<Record<FieldKey, FieldState>>(makeDefault());
  const [copied, setCopied] = useState<boolean>(false);

  const expression = FIELDS.map((f) => buildExpr(fields[f.key])).join(" ");

  const update = (key: FieldKey, patch: Partial<FieldState>): void => {
    setFields((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  };

  const reset = (): void => {
    setFields(makeDefault());
    setCopied(false);
  };

  const copyExpr = (): void => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4'>
              <Clock className='w-8 h-8 text-indigo-600' />
            </div>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>
              Cron Expression Builder
            </h2>
            <p className='text-gray-600'>
              Build and validate cron job expressions with a visual editor
            </p>
          </div>

          <div className='space-y-6'>
            {/* Expression output */}
            <div className='bg-gray-900 rounded-xl p-6'>
              <div className='text-xs text-gray-400 uppercase tracking-wider mb-2'>
                Cron Expression
              </div>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <code className='text-2xl font-mono font-bold text-green-400 tracking-widest'>
                  {expression}
                </code>
                <div className='flex gap-2'>
                  <button
                    onClick={reset}
                    className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm'
                  >
                    <RotateCcw className='w-4 h-4' />
                    Reset
                  </button>
                  <button
                    onClick={copyExpr}
                    className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm'
                  >
                    <Copy className='w-4 h-4' />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Field editors */}
            <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
              <h3 className='font-semibold text-gray-700 mb-4'>
                Configure Fields
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
                {FIELDS.map((field) => {
                  const s = fields[field.key];
                  return (
                    <div key={field.key}>
                      <div className='flex items-center justify-between mb-2'>
                        <label className='block text-sm font-medium text-gray-700'>
                          {field.label}
                        </label>
                        <code className='text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono'>
                          {buildExpr(s)}
                        </code>
                      </div>
                      <select
                        value={s.mode}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          update(field.key, { mode: e.target.value as Mode })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm mb-2'
                      >
                        <option value='every'>Every</option>
                        <option value='specific'>Specific</option>
                        <option value='range'>Range</option>
                        <option value='step'>Every N</option>
                      </select>

                      {s.mode === "specific" && (
                        <input
                          type='text'
                          value={s.specific}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            update(field.key, { specific: e.target.value })
                          }
                          placeholder={`${field.min}–${field.max}`}
                          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm'
                        />
                      )}
                      {s.mode === "range" && (
                        <div className='flex gap-1 items-center'>
                          <input
                            type='number'
                            value={s.rangeFrom}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              update(field.key, { rangeFrom: e.target.value })
                            }
                            placeholder={String(field.min)}
                            min={field.min}
                            max={field.max}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm'
                          />
                          <span className='text-gray-400'>–</span>
                          <input
                            type='number'
                            value={s.rangeTo}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => update(field.key, { rangeTo: e.target.value })}
                            placeholder={String(field.max)}
                            min={field.min}
                            max={field.max}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm'
                          />
                        </div>
                      )}
                      {s.mode === "step" && (
                        <div className='space-y-1'>
                          <input
                            type='number'
                            value={s.stepEvery}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              update(field.key, { stepEvery: e.target.value })
                            }
                            placeholder='Every N'
                            min={1}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm'
                          />
                          <input
                            type='text'
                            value={s.stepStart}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              update(field.key, { stepStart: e.target.value })
                            }
                            placeholder='Start or *'
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm'
                          />
                        </div>
                      )}
                      {field.names && (
                        <div className='mt-2 flex flex-wrap gap-1'>
                          {field.names.map((name, i) => (
                            <button
                              key={name}
                              onClick={() =>
                                update(field.key, {
                                  mode: "specific",
                                  specific: String(field.min + i),
                                })
                              }
                              className='text-xs bg-white hover:bg-indigo-50 border border-gray-200 text-gray-600 hover:text-indigo-700 px-1.5 py-0.5 rounded transition-colors'
                            >
                              {name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Presets */}
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                Common Presets
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
                {PRESETS.map((p) => (
                  <button
                    key={p.expr}
                    onClick={() => setFields(parsePreset(p.expr))}
                    title={p.desc}
                    className='text-left bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-lg p-3 transition-colors'
                  >
                    <div className='text-xs font-semibold text-gray-700 mb-1'>
                      {p.label}
                    </div>
                    <code className='text-xs text-gray-500 font-mono'>
                      {p.expr}
                    </code>
                  </button>
                ))}
              </div>
            </div>

            {/* Reference */}
            <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200'>
              <h3 className='text-xl font-bold text-gray-800 mb-4'>
                Format Reference
              </h3>
              <div className='text-center font-mono text-lg mb-4 tracking-widest text-gray-600'>
                <span className='text-red-500'>min</span>{" "}
                <span className='text-amber-500'>hour</span>{" "}
                <span className='text-emerald-500'>dom</span>{" "}
                <span className='text-blue-500'>month</span>{" "}
                <span className='text-purple-500'>dow</span>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {[
                  { sym: "*", desc: "every value" },
                  { sym: "*/n", desc: "every n units" },
                  { sym: "a-b", desc: "range from a to b" },
                  { sym: "a,b", desc: "a and b" },
                ].map(({ sym, desc }) => (
                  <div key={sym} className='bg-white rounded-lg p-3'>
                    <div className='text-2xl font-bold text-indigo-600 font-mono'>
                      {sym}
                    </div>
                    <div className='text-sm text-gray-600 mt-1'>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Click any preset to instantly load that schedule</li>
              <li>Day of week: 0 = Sunday, 1 = Monday, through 6 = Saturday</li>
              <li>
                Use the month and day name buttons to quickly fill specific
                values
              </li>
              <li>
                Some systems use a 6-field format with seconds — this tool uses
                the standard 5-field cron format
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
