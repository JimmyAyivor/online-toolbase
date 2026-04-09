"use client";
import React, { useState, useEffect } from "react";
import {
  Clock,
  Globe,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  RefreshCw,
  Sun,
  Moon,
  Sunrise,
  Sunset,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TimezoneEntry {
  id: number;
  zone: string;
}

interface PopularTimezone {
  zone: string;
  name: string;
  offset: string;
}

interface ConvertedTime {
  time: string;
  date: string;
}

interface TimeOfDay {
  icon: React.ElementType;
  label: string;
  color: string;
}

interface Tip {
  color: string;
  label: string;
  desc: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const POPULAR_TIMEZONES: PopularTimezone[] = [
  { zone: "America/New_York", name: "New York (EST)", offset: "UTC-5" },
  { zone: "America/Los_Angeles", name: "Los Angeles (PST)", offset: "UTC-8" },
  { zone: "America/Chicago", name: "Chicago (CST)", offset: "UTC-6" },
  { zone: "America/Denver", name: "Denver (MST)", offset: "UTC-7" },
  { zone: "Europe/London", name: "London (GMT)", offset: "UTC+0" },
  { zone: "Europe/Paris", name: "Paris (CET)", offset: "UTC+1" },
  { zone: "Europe/Berlin", name: "Berlin (CET)", offset: "UTC+1" },
  { zone: "Asia/Dubai", name: "Dubai (GST)", offset: "UTC+4" },
  { zone: "Asia/Tokyo", name: "Tokyo (JST)", offset: "UTC+9" },
  { zone: "Asia/Shanghai", name: "Shanghai (CST)", offset: "UTC+8" },
  { zone: "Asia/Singapore", name: "Singapore (SGT)", offset: "UTC+8" },
  { zone: "Asia/Hong_Kong", name: "Hong Kong (HKT)", offset: "UTC+8" },
  { zone: "Australia/Sydney", name: "Sydney (AEDT)", offset: "UTC+11" },
  { zone: "Pacific/Auckland", name: "Auckland (NZDT)", offset: "UTC+13" },
  { zone: "America/Toronto", name: "Toronto (EST)", offset: "UTC-5" },
  { zone: "America/Mexico_City", name: "Mexico City (CST)", offset: "UTC-6" },
  { zone: "America/Sao_Paulo", name: "São Paulo (BRT)", offset: "UTC-3" },
  { zone: "Africa/Cairo", name: "Cairo (EET)", offset: "UTC+2" },
];

const TIPS: Tip[] = [
  {
    color: "bg-sky-600",
    label: "Scheduling Meetings",
    desc: "Check multiple time zones before booking",
  },
  {
    color: "bg-blue-600",
    label: "Daylight Saving",
    desc: "Time zones may shift during DST changes",
  },
  {
    color: "bg-indigo-600",
    label: "Travel Planning",
    desc: "Consider time differences for flights",
  },
  {
    color: "bg-purple-600",
    label: "Remote Work",
    desc: "Coordinate with global team schedules",
  },
];

const POPULAR_USES = [
  "International business meetings",
  "Global team coordination",
  "Travel planning & jet lag prep",
  "Live event streaming times",
  "Remote family & friend calls",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function nowDateStr(): string {
  return new Date().toISOString().split("T")[0] ?? "";
}
function nowTimeStr(): string {
  return new Date().toTimeString().slice(0, 5);
}

function getConvertedTime(base: Date, targetZone: string): ConvertedTime {
  const time = base.toLocaleTimeString("en-US", {
    timeZone: targetZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const date = base.toLocaleDateString("en-US", {
    timeZone: targetZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return { time, date };
}

function getTimeOfDay(time: string): TimeOfDay {
  const parts = time.split(":");
  const hourRaw = parseInt(parts[0] ?? "0", 10);
  const isPM = time.includes("PM");
  const hour24 = isPM
    ? hourRaw === 12
      ? 12
      : hourRaw + 12
    : hourRaw === 12
      ? 0
      : hourRaw;

  if (hour24 >= 5 && hour24 < 12)
    return { icon: Sunrise, label: "Morning", color: "yellow" };
  if (hour24 >= 12 && hour24 < 17)
    return { icon: Sun, label: "Afternoon", color: "orange" };
  if (hour24 >= 17 && hour24 < 21)
    return { icon: Sunset, label: "Evening", color: "purple" };
  return { icon: Moon, label: "Night", color: "indigo" };
}

function buildBaseDate(selectedDate: string, selectedTime: string): Date {
  if (selectedDate && selectedTime) {
    return new Date(`${selectedDate}T${selectedTime}:00`);
  }
  return new Date();
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TimeZoneConverterClient() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(nowDateStr());
  const [selectedTime, setSelectedTime] = useState<string>(nowTimeStr());
  const [sourceTimezone, setSourceTimezone] =
    useState<string>("America/New_York");
  const [timezones, setTimezones] = useState<TimezoneEntry[]>([
    { id: 1, zone: "America/Los_Angeles" },
    { id: 2, zone: "Europe/London" },
    { id: 3, zone: "Asia/Tokyo" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const resetToNow = (): void => {
    setSelectedDate(nowDateStr());
    setSelectedTime(nowTimeStr());
  };

  const addTimezone = (): void =>
    setTimezones((prev) => [
      ...prev,
      { id: Date.now(), zone: "America/New_York" },
    ]);

  const removeTimezone = (id: number): void =>
    setTimezones((prev) => prev.filter((tz) => tz.id !== id));

  const updateTimezone = (id: number, zone: string): void =>
    setTimezones((prev) =>
      prev.map((tz) => (tz.id === id ? { ...tz, zone } : tz)),
    );

  // Derive base date once (re-uses currentTime as live fallback)
  const baseDate = buildBaseDate(selectedDate, selectedTime) ?? currentTime;
  const sourceTime = getConvertedTime(baseDate, sourceTimezone);
  const sourceOfDay = getTimeOfDay(sourceTime.time);
  const SourceIcon = sourceOfDay.icon;
  const sourceCityName =
    POPULAR_TIMEZONES.find((tz) => tz.zone === sourceTimezone)?.name.split(
      " ",
    )[0] ?? "";

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Time Zone Converter
          </h2>
          <p className="text-gray-500">
            Convert time across different time zones instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* ── Main ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Source card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <Clock className="w-6 h-6 text-sky-600" />
                Source Time
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Select Time Zone
                </label>
                <select
                  value={sourceTimezone}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSourceTimezone(e.target.value)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                >
                  {POPULAR_TIMEZONES.map((tz) => (
                    <option key={tz.zone} value={tz.zone}>
                      {tz.name} – {tz.offset}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSelectedDate(e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Time
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSelectedTime(e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={resetToNow}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Use Current Time
              </button>

              <div className="mt-6 p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border-2 border-sky-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <SourceIcon
                      className={`w-6 h-6 text-${sourceOfDay.color}-600`}
                    />
                    <span className="text-sm font-semibold text-gray-600">
                      {sourceOfDay.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {sourceCityName}
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {sourceTime.time}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {sourceTime.date}
                </div>
              </div>
            </div>

            {/* Target zones */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-xl">
                  <Globe className="w-6 h-6 text-sky-600" />
                  Convert To
                </h3>
                <button
                  onClick={addTimezone}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Zone
                </button>
              </div>

              <div className="space-y-4">
                {timezones.map((tz) => {
                  const converted = getConvertedTime(baseDate, tz.zone);
                  const tod = getTimeOfDay(converted.time);
                  const TodIcon = tod.icon;

                  return (
                    <div
                      key={tz.id}
                      className="p-5 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <select
                          value={tz.zone}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            updateTimezone(tz.id, e.target.value)
                          }
                          className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 transition-colors mr-3"
                        >
                          {POPULAR_TIMEZONES.map((ptz) => (
                            <option key={ptz.zone} value={ptz.zone}>
                              {ptz.name}
                            </option>
                          ))}
                        </select>
                        {timezones.length > 1 && (
                          <button
                            onClick={() => removeTimezone(tz.id)}
                            aria-label="Remove timezone"
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <TodIcon
                              className={`w-5 h-5 text-${tod.color}-600`}
                            />
                            <span className="text-3xl font-bold text-gray-900">
                              {converted.time}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {converted.date}
                          </div>
                        </div>
                        <div
                          className={`px-4 py-2 bg-${tod.color}-100 text-${tod.color}-700 rounded-lg font-semibold text-sm`}
                        >
                          {tod.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-sky-600 to-blue-600 rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-8">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-xl">
                <Clock className="w-6 h-6" />
                Current Times
              </h3>
              <div className="space-y-4">
                {POPULAR_TIMEZONES.slice(0, 6).map((tz) => {
                  const t = getConvertedTime(currentTime, tz.zone);
                  return (
                    <div
                      key={tz.zone}
                      className="bg-white/10 backdrop-blur rounded-xl p-4"
                    >
                      <div className="text-sm text-sky-100 mb-1">
                        {tz.name.split(" ")[0]}
                      </div>
                      <div className="text-2xl font-bold">{t.time}</div>
                      <div className="text-xs text-sky-100 mt-1">
                        {tz.offset}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-4">💡 Quick Tips</h4>
              <div className="space-y-3 text-sm text-gray-700">
                {TIPS.map(({ color, label, desc }) => (
                  <div key={label} className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 ${color} rounded-full mt-2 flex-shrink-0`}
                    />
                    <p>
                      <strong>{label}:</strong> {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl shadow-md p-6 border-2 border-sky-200">
              <h4 className="font-bold text-gray-900 mb-3">🌍 Popular Uses</h4>
              <div className="space-y-2 text-sm text-gray-700">
                {POPULAR_USES.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
