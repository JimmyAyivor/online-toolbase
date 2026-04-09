"use client";
import React, { useState, useEffect } from "react";
import { Clock, Copy, Check, RotateCcw, ArrowLeftRight } from "lucide-react";

type Mode = "tsToDate" | "dateToTs";
type Unit = "seconds" | "milliseconds";

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Kolkata",
  "Australia/Sydney",
];

function formatDate(d: Date, tz: string): string {
  return d.toLocaleString("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

function formatIso(d: Date): string {
  return d.toISOString();
}

export default function TimestampConverterClient() {
  const [mode, setMode] = useState<Mode>("tsToDate");
  const [unit, setUnit] = useState<Unit>("seconds");
  const [tsInput, setTsInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("UTC");
  const [now, setNow] = useState<number>(Math.floor(Date.now() / 1000));
  const [copied, setCopied] = useState<string>("");

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  // ── Timestamp → Date
  const tsMs: number | null = (() => {
    const raw = tsInput.trim();
    if (!raw) return null;
    const n = Number(raw);
    if (isNaN(n)) return null;
    return unit === "seconds" ? n * 1000 : n;
  })();

  const tsDate: Date | null = tsMs !== null ? new Date(tsMs) : null;
  const tsValid = tsDate && !isNaN(tsDate.getTime());

  // ── Date → Timestamp
  const dateTs: { s: number; ms: number } | null = (() => {
    if (!dateInput) return null;
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return { s: Math.floor(d.getTime() / 1000), ms: d.getTime() };
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Timestamp Converter
            </h2>
            <p className="text-gray-600">
              Convert Unix timestamps to dates and dates to Unix timestamps
            </p>
          </div>

          {/* Live clock */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 text-center">
            <p className="text-xs text-gray-500 mb-1">
              Current Unix timestamp (seconds)
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-mono font-bold text-indigo-700">
                {now.toLocaleString()}
              </span>
              <button
                onClick={() => copy(String(now), "now")}
                className="text-indigo-400 hover:text-indigo-700 transition-colors"
              >
                {copied === "now" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Updates every second</p>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={() => setMode("tsToDate")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${mode === "tsToDate" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
            >
              Timestamp → Date
            </button>
            <button
              onClick={() => setMode("dateToTs")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${mode === "dateToTs" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
            >
              Date → Timestamp
            </button>
          </div>

          {mode === "tsToDate" ? (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unix Timestamp
                  </label>
                  <input
                    type="text"
                    value={tsInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTsInput(e.target.value)
                    }
                    placeholder={
                      unit === "seconds"
                        ? "e.g. 1700000000"
                        : "e.g. 1700000000000"
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setUnit(e.target.value as Unit)
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value="seconds">Seconds</option>
                    <option value="milliseconds">Milliseconds</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTimezone(e.target.value)
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setTsInput(String(now))}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-lg text-sm transition-colors border border-gray-200"
                >
                  Use current time
                </button>
              </div>

              {tsValid && tsDate && (
                <div className="space-y-3 mt-2">
                  {[
                    {
                      label: "Local date & time",
                      value: formatDate(tsDate, timezone),
                      key: "local",
                    },
                    {
                      label: "UTC / ISO 8601",
                      value: formatIso(tsDate),
                      key: "iso",
                    },
                    {
                      label: "Unix (seconds)",
                      value: String(Math.floor(tsDate.getTime() / 1000)),
                      key: "s",
                    },
                    {
                      label: "Unix (milliseconds)",
                      value: String(tsDate.getTime()),
                      key: "ms",
                    },
                  ].map(({ label, value, key }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 gap-4"
                    >
                      <div>
                        <p className="text-xs text-gray-400 font-medium mb-0.5">
                          {label}
                        </p>
                        <p className="font-mono text-sm text-gray-800 break-all">
                          {value}
                        </p>
                      </div>
                      <button
                        onClick={() => copy(value, key)}
                        className="text-indigo-400 hover:text-indigo-700 flex-shrink-0 transition-colors"
                      >
                        {copied === key ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {tsInput && !tsValid && (
                <p className="text-red-600 text-sm">
                  Invalid timestamp — check your input.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={dateInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDateInput(e.target.value)
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const n = new Date();
                    setDateInput(n.toISOString().slice(0, 16));
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-700 rounded-lg text-sm transition-colors border border-gray-200"
                >
                  Use now
                </button>
              </div>
              {dateTs && (
                <div className="space-y-3 mt-2">
                  {[
                    {
                      label: "Unix timestamp (seconds)",
                      value: String(dateTs.s),
                      key: "ds",
                    },
                    {
                      label: "Unix timestamp (milliseconds)",
                      value: String(dateTs.ms),
                      key: "dms",
                    },
                    {
                      label: "ISO 8601",
                      value: new Date(dateTs.ms).toISOString(),
                      key: "diso",
                    },
                  ].map(({ label, value, key }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 gap-4"
                    >
                      <div>
                        <p className="text-xs text-gray-400 font-medium mb-0.5">
                          {label}
                        </p>
                        <p className="font-mono text-sm text-gray-800">
                          {value}
                        </p>
                      </div>
                      <button
                        onClick={() => copy(value, key)}
                        className="text-indigo-400 hover:text-indigo-700 flex-shrink-0 transition-colors"
                      >
                        {copied === key ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => {
              setTsInput("");
              setDateInput("");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mt-6 mb-8"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2">Understanding Unix timestamps:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Unix time counts seconds since 00:00:00 UTC on 1 January 1970
                (the Unix epoch)
              </li>
              <li>
                Most programming languages use seconds; JavaScript uses
                milliseconds natively
              </li>
              <li>
                Timestamps are timezone-agnostic — they represent a single
                moment in time universally
              </li>
              <li>
                The 32-bit timestamp overflow ("Year 2038 problem") occurs at
                Unix time 2,147,483,647
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
