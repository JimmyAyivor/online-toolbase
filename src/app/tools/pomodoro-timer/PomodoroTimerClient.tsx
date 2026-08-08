"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Clock,
  CheckCircle,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TimerMode = "work" | "shortBreak" | "longBreak";
type AlarmSound = "beep" | "chime" | "bell" | "digital";

interface TimerSettings {
  workTime: number;
  shortBreak: number;
  longBreak: number;
  sessionsUntilLongBreak: number;
  alarmSound: AlarmSound;
  alarmVolume: number; // 0–100
  alarmRepeat: number; // how many times the alarm rings before auto-stopping (0 = until dismissed)
  autoStartNext: boolean;
  notificationsEnabled: boolean;
}

interface ModeConfig {
  id: TimerMode;
  label: string;
  activeColor: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: TimerSettings = {
  workTime: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionsUntilLongBreak: 4,
  alarmSound: "chime",
  alarmVolume: 70,
  alarmRepeat: 0,
  autoStartNext: false,
  notificationsEnabled: false,
};

const MODE_CONFIGS: ModeConfig[] = [
  { id: "work", label: "Work", activeColor: "bg-red-600" },
  { id: "shortBreak", label: "Short Break", activeColor: "bg-green-600" },
  { id: "longBreak", label: "Long Break", activeColor: "bg-blue-600" },
];

const SETTINGS_SLIDERS: Array<{
  key: keyof TimerSettings;
  label: string;
  min: number;
  max: number;
}> = [
  { key: "workTime", label: "Work Duration (minutes)", min: 1, max: 60 },
  { key: "shortBreak", label: "Short Break (minutes)", min: 1, max: 30 },
  { key: "longBreak", label: "Long Break (minutes)", min: 1, max: 60 },
  {
    key: "sessionsUntilLongBreak",
    label: "Sessions Until Long Break",
    min: 2,
    max: 10,
  },
];

const ALARM_SOUND_OPTIONS: Array<{ id: AlarmSound; label: string }> = [
  { id: "beep", label: "Simple Beep" },
  { id: "chime", label: "Chime" },
  { id: "bell", label: "Bell" },
  { id: "digital", label: "Digital Alert" },
];

const ALARM_REPEAT_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 1, label: "Once" },
  { value: 3, label: "3 times" },
  { value: 5, label: "5 times" },
  { value: 0, label: "Until dismissed" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSecondsForMode(mode: TimerMode, settings: TimerSettings): number {
  switch (mode) {
    case "work":
      return settings.workTime * 60;
    case "shortBreak":
      return settings.shortBreak * 60;
    case "longBreak":
      return settings.longBreak * 60;
  }
}

function getModeColor(mode: TimerMode): string {
  switch (mode) {
    case "work":
      return "from-red-50 to-orange-100";
    case "shortBreak":
      return "from-green-50 to-emerald-100";
    case "longBreak":
      return "from-blue-50 to-cyan-100";
  }
}

function getButtonColor(mode: TimerMode): string {
  switch (mode) {
    case "work":
      return "bg-red-600 hover:bg-red-700";
    case "shortBreak":
      return "bg-green-600 hover:bg-green-700";
    case "longBreak":
      return "bg-blue-600 hover:bg-blue-700";
  }
}

function getProgressBarColor(mode: TimerMode): string {
  switch (mode) {
    case "work":
      return "bg-red-600";
    case "shortBreak":
      return "bg-green-600";
    case "longBreak":
      return "bg-blue-600";
  }
}

function getModeLabel(mode: TimerMode): string {
  switch (mode) {
    case "work":
      return "Focus Time";
    case "shortBreak":
      return "Short Break";
    case "longBreak":
      return "Long Break";
  }
}

function getNextModeLabel(mode: TimerMode): string {
  switch (mode) {
    case "work":
      return "break";
    case "shortBreak":
    case "longBreak":
      return "work session";
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// ─── Alarm engine (Web Audio API — no external files, so it can't 404 or be blocked) ─

type ToneStep = {
  freq: number;
  duration: number;
  delay: number;
  type?: OscillatorType;
};

const ALARM_PATTERNS: Record<AlarmSound, ToneStep[]> = {
  beep: [{ freq: 880, duration: 0.18, delay: 0, type: "sine" }],
  chime: [
    { freq: 659.25, duration: 0.22, delay: 0, type: "sine" },
    { freq: 987.77, duration: 0.4, delay: 0.18, type: "sine" },
  ],
  bell: [
    { freq: 523.25, duration: 0.6, delay: 0, type: "triangle" },
    { freq: 1046.5, duration: 0.5, delay: 0.05, type: "sine" },
  ],
  digital: [
    { freq: 1200, duration: 0.1, delay: 0, type: "square" },
    { freq: 1200, duration: 0.1, delay: 0.15, type: "square" },
    { freq: 1200, duration: 0.1, delay: 0.3, type: "square" },
  ],
};

function playAlarmTone(sound: AlarmSound, volume: number): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const gainScale = Math.max(0, Math.min(100, volume)) / 100;

    ALARM_PATTERNS[sound].forEach(({ freq, duration, delay, type }) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.type = type ?? "sine";
      oscillator.frequency.value = freq;

      const startTime = ctx.currentTime + delay;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.35 * gainScale, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration + 0.05);
    });

    // Close the context after the pattern finishes to free resources.
    const totalMs =
      Math.max(...ALARM_PATTERNS[sound].map((s) => s.delay + s.duration)) *
        1000 +
      200;
    setTimeout(() => ctx.close().catch(() => {}), totalMs);
  } catch {
    // Web Audio unavailable — fail silently rather than crash the timer.
  }
}

function sendCompletionNotification(mode: TimerMode): void {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  const title = mode === "work" ? "Work session complete!" : "Break's over!";
  const body =
    mode === "work"
      ? "Nice focus. Time for a break."
      : "Break's done — ready to get back to it?";
  try {
    new Notification(title, { body, tag: "pomodoro-timer" });
  } catch {
    // Some browsers restrict Notification outside a user gesture in certain contexts.
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PomodoroTimerClient() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState<number>(
    DEFAULT_SETTINGS.workTime * 60,
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [draftSettings, setDraftSettings] =
    useState<TimerSettings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [totalSessions, setTotalSessions] = useState<number>(0);

  // Alarm state: when a session ends, the alarm "rings" (repeatedly, per
  // settings) until the user dismisses it or starts the next session.
  const [isAlarming, setIsAlarming] = useState<boolean>(false);
  const [alarmRingCount, setAlarmRingCount] = useState<number>(0);
  const [pendingMode, setPendingMode] = useState<TimerMode | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "unsupported"
  >("default");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setNotificationPermission(Notification.permission);
    } else {
      setNotificationPermission("unsupported");
    }
  }, []);

  // Countdown ticking.
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      triggerAlarm();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, timeLeft]);

  // Live countdown / alarm state in the browser tab title.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isAlarming) {
      document.title = "⏰ Time's up! — Pomodoro Timer";
    } else if (isRunning) {
      document.title = `${formatTime(timeLeft)} — ${getModeLabel(mode)}`;
    } else {
      document.title = "Pomodoro Timer";
    }
  }, [timeLeft, isRunning, isAlarming, mode]);

  // Ring the alarm on a loop until dismissed / repeat limit hit.
  useEffect(() => {
    if (!isAlarming) {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
      return;
    }

    playAlarmTone(settings.alarmSound, settings.alarmVolume);
    setAlarmRingCount(1);

    alarmIntervalRef.current = setInterval(() => {
      setAlarmRingCount((prev) => {
        const next = prev + 1;
        if (settings.alarmRepeat !== 0 && next > settings.alarmRepeat) {
          dismissAlarm();
          return prev;
        }
        playAlarmTone(settings.alarmSound, settings.alarmVolume);
        return next;
      });
    }, 1800);

    return () => {
      if (alarmIntervalRef.current) clearInterval(alarmIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlarming]);

  const triggerAlarm = useCallback((): void => {
    setIsRunning(false);
    sendCompletionNotification(mode);

    if (mode === "work") {
      const nextCompleted = completedSessions + 1;
      setCompletedSessions(nextCompleted);
      setTotalSessions((t) => t + 1);
      const isLongBreak = nextCompleted % settings.sessionsUntilLongBreak === 0;
      setPendingMode(isLongBreak ? "longBreak" : "shortBreak");
    } else {
      setPendingMode("work");
    }
    setIsAlarming(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, completedSessions, settings.sessionsUntilLongBreak]);

  const dismissAlarm = useCallback((): void => {
    setIsAlarming(false);
    setAlarmRingCount(0);
    if (pendingMode) {
      setMode(pendingMode);
      setTimeLeft(getSecondsForMode(pendingMode, settings));
      if (settings.autoStartNext) {
        setIsRunning(true);
      }
      setPendingMode(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMode, settings]);

  const toggleTimer = (): void => setIsRunning((v) => !v);

  const resetTimer = (currentMode = mode, currentSettings = settings): void => {
    setIsRunning(false);
    setTimeLeft(getSecondsForMode(currentMode, currentSettings));
  };

  const switchMode = (newMode: TimerMode): void => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getSecondsForMode(newMode, settings));
  };

  const openSettings = (): void => {
    setDraftSettings(settings);
    setShowSettings(true);
  };

  const saveSettings = (): void => {
    setSettings(draftSettings);
    setShowSettings(false);
    resetTimer(mode, draftSettings);
  };

  const requestNotificationPermission = async (): Promise<void> => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setNotificationPermission(result);
    setDraftSettings((prev) => ({
      ...prev,
      notificationsEnabled: result === "granted",
    }));
  };

  const previewAlarmSound = (sound: AlarmSound): void => {
    playAlarmTone(sound, draftSettings.alarmVolume);
  };

  const progress =
    ((getSecondsForMode(mode, settings) - timeLeft) /
      getSecondsForMode(mode, settings)) *
    100;
  const sessionsUntilNext =
    settings.sessionsUntilLongBreak -
    (completedSessions % settings.sessionsUntilLongBreak);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getModeColor(mode)} p-4 transition-colors duration-500`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Pomodoro Timer
            </h2>
            <p className="text-gray-500">
              Stay focused with work/break intervals
            </p>
          </div>

          {/* Mode selector */}
          <div className="flex gap-2 mb-6">
            {MODE_CONFIGS.map(({ id, label, activeColor }) => (
              <button
                key={id}
                onClick={() => switchMode(id)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  mode === id
                    ? `${activeColor} text-white`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-8">
            <div
              className={`h-full transition-all duration-1000 ${getProgressBarColor(mode)}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Timer display */}
          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-gray-900 mb-4 font-mono">
              {formatTime(timeLeft)}
            </div>
            <div className="text-lg text-gray-600 flex items-center justify-center gap-2">
              {getModeLabel(mode)}
              {settings.notificationsEnabled &&
                notificationPermission === "granted" && (
                  <Bell
                    className="w-4 h-4 text-gray-400"
                    aria-label="Alerts enabled"
                  />
                )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={toggleTimer}
              className={`flex-1 ${getButtonColor(mode)} text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-6 h-6" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" /> Start
                </>
              )}
            </button>
            <button
              onClick={() => resetTimer()}
              className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
            <button
              onClick={openSettings}
              aria-label="Open settings"
              className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Session Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Completed Sessions", value: completedSessions },
                { label: "Total Sessions", value: totalSessions },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-lg p-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {value}
                  </div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Next long break after {sessionsUntilNext} more session(s)
            </div>
          </div>

          {/* ─── Alarm overlay: shown when a session ends, rings until dismissed ─── */}
          {isAlarming && pendingMode && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[60]"
              role="alertdialog"
              aria-live="assertive"
              aria-label="Timer complete"
            >
              <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-pulse-once">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mb-4">
                  <Bell className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {mode === "work" ? "Work session complete!" : "Break's over!"}
                </h2>
                <p className="text-gray-600 mb-6">
                  Ready to start your {getNextModeLabel(mode)}?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      dismissAlarm();
                      setIsRunning(true);
                    }}
                    className={`flex-1 ${getButtonColor(pendingMode)} text-white py-3 rounded-lg font-semibold transition-colors`}
                  >
                    Start {getModeLabel(pendingMode)}
                  </button>
                  <button
                    onClick={dismissAlarm}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
                {settings.alarmRepeat === 0 && (
                  <p className="text-xs text-gray-400 mt-4">
                    Alarm ring #{alarmRingCount} — will keep ringing until
                    dismissed
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Settings modal */}
          {showSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full my-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Timer Settings
                </h2>

                <div className="space-y-4 mb-6">
                  {SETTINGS_SLIDERS.map(({ key, label, min, max }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}: {draftSettings[key]}
                      </label>
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={draftSettings[key] as number}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDraftSettings((prev) => ({
                            ...prev,
                            [key]: Number(e.target.value),
                          }))
                        }
                        className="w-full"
                        aria-label={label}
                      />
                    </div>
                  ))}
                </div>

                <hr className="my-6 border-gray-200" />

                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Alarm
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alarm Sound
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ALARM_SOUND_OPTIONS.map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setDraftSettings((prev) => ({
                            ...prev,
                            alarmSound: id,
                          }));
                          previewAlarmSound(id);
                        }}
                        className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                          draftSettings.alarmSound === id
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Tap a sound to preview it
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    {draftSettings.alarmVolume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                    Alarm Volume: {draftSettings.alarmVolume}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={draftSettings.alarmVolume}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDraftSettings((prev) => ({
                        ...prev,
                        alarmVolume: Number(e.target.value),
                      }))
                    }
                    className="w-full"
                    aria-label="Alarm volume"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alarm Repeats
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ALARM_REPEAT_OPTIONS.map(({ value, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          setDraftSettings((prev) => ({
                            ...prev,
                            alarmRepeat: value,
                          }))
                        }
                        className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                          draftSettings.alarmRepeat === value
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <label
                    htmlFor="auto-start-next"
                    className="text-sm font-medium text-gray-700"
                  >
                    Auto-start next session
                  </label>
                  <input
                    id="auto-start-next"
                    type="checkbox"
                    checked={draftSettings.autoStartNext}
                    onChange={(e) =>
                      setDraftSettings((prev) => ({
                        ...prev,
                        autoStartNext: e.target.checked,
                      }))
                    }
                    className="w-5 h-5"
                  />
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {notificationPermission === "granted" ? (
                      <Bell className="w-4 h-4" />
                    ) : (
                      <BellOff className="w-4 h-4" />
                    )}
                    Browser notifications
                  </div>
                  {notificationPermission === "unsupported" ? (
                    <span className="text-xs text-gray-400">Not supported</span>
                  ) : notificationPermission === "granted" ? (
                    <input
                      type="checkbox"
                      checked={draftSettings.notificationsEnabled}
                      onChange={(e) =>
                        setDraftSettings((prev) => ({
                          ...prev,
                          notificationsEnabled: e.target.checked,
                        }))
                      }
                      className="w-5 h-5"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={requestNotificationPermission}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Enable
                    </button>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={saveSettings}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Save Settings
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">How to use Pomodoro Technique:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Work for 25 minutes with full focus (1 Pomodoro)</li>
              <li>Take a 5-minute short break</li>
              <li>After 4 Pomodoros, take a 15-minute long break</li>
              <li>Repeat the cycle to maintain productivity</li>
              <li>Customize durations, alarm sound, and volume in settings</li>
              <li>
                Turn on browser notifications to get alerted even if you're on
                another tab
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
