"use client";
import React, { useState } from "react";
import { Calendar, Plus, Trash2, Download, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Platform =
  | "Instagram"
  | "LinkedIn"
  | "TikTok"
  | "Twitter"
  | "Facebook"
  | "YouTube";
type ContentType = "Post" | "Story" | "Reel" | "Video" | "Article" | "Thread";

interface Entry {
  id: string;
  day: string;
  platform: Platform;
  type: ContentType;
  topic: string;
  notes: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PLATFORMS: Platform[] = [
  "Instagram",
  "LinkedIn",
  "TikTok",
  "Twitter",
  "Facebook",
  "YouTube",
];
const TYPES: ContentType[] = [
  "Post",
  "Story",
  "Reel",
  "Video",
  "Article",
  "Thread",
];
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PLATFORM_COLORS: Record<Platform, string> = {
  Instagram: "bg-pink-100 text-pink-700 border-pink-200",
  LinkedIn: "bg-blue-100 text-blue-700 border-blue-200",
  TikTok: "bg-gray-900 text-white border-gray-700",
  Twitter: "bg-sky-100 text-sky-700 border-sky-200",
  Facebook: "bg-indigo-100 text-indigo-700 border-indigo-200",
  YouTube: "bg-red-100 text-red-700 border-red-200",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function exportCSV(entries: Entry[]): void {
  const rows = [
    ["Day", "Platform", "Type", "Topic", "Notes"],
    ...entries.map((e) => [e.day, e.platform, e.type, e.topic, e.notes]),
  ];
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "content-calendar.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Component ───────────────────────────────────────────────────────────────

const BLANK: Omit<Entry, "id"> = {
  day: "Monday",
  platform: "Instagram",
  type: "Post",
  topic: "",
  notes: "",
};

export default function ContentCalendarPlannerClient() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState<Omit<Entry, "id">>(BLANK);

  const addEntry = (): void => {
    if (!form.topic.trim()) return;
    setEntries((prev) => [...prev, { ...form, id: newId() }]);
    setForm(BLANK);
  };

  const removeEntry = (id: string): void => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const reset = (): void => {
    setEntries([]);
    setForm(BLANK);
  };

  const entriesByDay = DAYS.map((day) => ({
    day,
    items: entries.filter((e) => e.day === day),
  }));

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Content Calendar Planner
            </h2>
            <p className="text-gray-500">
              Plan and organise your social media content — export to CSV when
              ready
            </p>
          </div>

          <div className="space-y-6">
            {/* Add entry form */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Plus className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-700">Add Content</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Day
                  </label>
                  <select
                    value={form.day}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setForm((f) => ({ ...f, day: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <select
                    value={form.platform}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setForm((f) => ({
                        ...f,
                        platform: e.target.value as Platform,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setForm((f) => ({
                        ...f,
                        type: e.target.value as ContentType,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic / Caption Idea
                  </label>
                  <input
                    type="text"
                    value={form.topic}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm((f) => ({ ...f, topic: e.target.value }))
                    }
                    placeholder="What is this post about?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optional)
                  </label>
                  <input
                    type="text"
                    value={form.notes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    placeholder="Hashtags, links, visuals needed..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={addEntry}
                  disabled={!form.topic.trim()}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add to Calendar
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </div>

            {/* Stats */}
            {entries.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Weekly Summary
                  </h3>
                  <button
                    onClick={() => exportCSV(entries)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Posts", value: entries.length },
                    {
                      label: "Days Planned",
                      value: new Set(entries.map((e) => e.day)).size,
                    },
                    {
                      label: "Platforms",
                      value: new Set(entries.map((e) => e.platform)).size,
                    },
                    {
                      label: "Content Types",
                      value: new Set(entries.map((e) => e.type)).size,
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-indigo-600">
                        {value}
                      </div>
                      <div className="text-sm text-gray-600">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar grid */}
            {entries.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Weekly Calendar
                </h3>
                <div className="grid md:grid-cols-7 gap-3">
                  {entriesByDay.map(({ day, items }) => (
                    <div
                      key={day}
                      className="bg-white border border-gray-200 rounded-lg p-3 min-h-24"
                    >
                      <div className="text-xs font-bold text-gray-500 uppercase mb-2">
                        {day.slice(0, 3)}
                      </div>
                      <div className="space-y-1">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={`text-xs px-2 py-1 rounded border flex items-start justify-between gap-1 ${PLATFORM_COLORS[item.platform]}`}
                          >
                            <div>
                              <div className="font-semibold">
                                {item.platform}
                              </div>
                              <div className="truncate">{item.topic}</div>
                            </div>
                            <button
                              onClick={() => removeEntry(item.id)}
                              className="flex-shrink-0 opacity-60 hover:opacity-100"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Entry list */}
            {entries.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  All Entries
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="max-h-96 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 sticky top-0">
                        <tr>
                          {[
                            "Day",
                            "Platform",
                            "Type",
                            "Topic",
                            "Notes",
                            "",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {entries.map((entry) => (
                          <tr key={entry.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {entry.day}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {entry.platform}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {entry.type}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {entry.topic}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {entry.notes}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => removeEntry(entry.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
                Add multiple posts per day — there is no limit per platform or
                day
              </li>
              <li>
                Use the Notes field for hashtags, links, or visual asset
                reminders
              </li>
              <li>
                Export to CSV and open in Excel or Google Sheets to share with
                your team
              </li>
              <li>
                The weekly calendar view gives you a quick visual overview of
                your posting frequency
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
