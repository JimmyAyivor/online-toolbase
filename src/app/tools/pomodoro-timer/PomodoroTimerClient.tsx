"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Clock,
  CheckCircle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TimerMode = "work" | "shortBreak" | "longBreak";

interface TimerSettings {
  workTime: number;
  shortBreak: number;
  longBreak: number;
  sessionsUntilLongBreak: number;
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

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function playBeep(): void {
  const audio = new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0fPTgjMGHW7A7+OZSA==",
  );
  audio.play().catch(() => {});
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

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, timeLeft]);

  const handleTimerComplete = (): void => {
    setIsRunning(false);
    playBeep();

    if (mode === "work") {
      setCompletedSessions((prev) => {
        const next = prev + 1;
        setTotalSessions((t) => t + 1);
        if (next % settings.sessionsUntilLongBreak === 0) {
          setMode("longBreak");
          setTimeLeft(settings.longBreak * 60);
        } else {
          setMode("shortBreak");
          setTimeLeft(settings.shortBreak * 60);
        }
        return next;
      });
    } else {
      setMode("work");
      setTimeLeft(settings.workTime * 60);
    }
  };

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
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-4 shadow-lg'>
              <Clock className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Pomodoro Timer
            </h2>
            <p className='text-gray-500'>
              Stay focused with work/break intervals
            </p>
          </div>

          {/* Mode selector */}
          <div className='flex gap-2 mb-6'>
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
          <div className='w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-8'>
            <div
              className={`h-full transition-all duration-1000 ${getProgressBarColor(mode)}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Timer display */}
          <div className='text-center mb-8'>
            <div className='text-8xl font-bold text-gray-900 mb-4 font-mono'>
              {formatTime(timeLeft)}
            </div>
            <div className='text-lg text-gray-600'>{getModeLabel(mode)}</div>
          </div>

          {/* Controls */}
          <div className='flex gap-3 mb-8'>
            <button
              onClick={toggleTimer}
              className={`flex-1 ${getButtonColor(mode)} text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2`}
            >
              {isRunning ? (
                <>
                  <Pause className='w-6 h-6' /> Pause
                </>
              ) : (
                <>
                  <Play className='w-6 h-6' /> Start
                </>
              )}
            </button>
            <button
              onClick={() => resetTimer()}
              className='px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2'
            >
              <RotateCcw className='w-5 h-5' />
              Reset
            </button>
            <button
              onClick={openSettings}
              aria-label='Open settings'
              className='px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors'
            >
              <Settings className='w-5 h-5' />
            </button>
          </div>

          {/* Stats */}
          <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
            <h3 className='font-semibold text-gray-900 mb-4 flex items-center gap-2'>
              <CheckCircle className='w-5 h-5' />
              Session Statistics
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {[
                { label: "Completed Sessions", value: completedSessions },
                { label: "Total Sessions", value: totalSessions },
              ].map(({ label, value }) => (
                <div key={label} className='bg-white rounded-lg p-4'>
                  <div className='text-3xl font-bold text-gray-900'>
                    {value}
                  </div>
                  <div className='text-sm text-gray-600'>{label}</div>
                </div>
              ))}
            </div>
            <div className='mt-4 text-sm text-gray-600'>
              Next long break after {sessionsUntilNext} more session(s)
            </div>
          </div>

          {/* Settings modal */}
          {showSettings && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
              <div className='bg-white rounded-2xl p-6 max-w-md w-full'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                  Timer Settings
                </h2>

                <div className='space-y-4 mb-6'>
                  {SETTINGS_SLIDERS.map(({ key, label, min, max }) => (
                    <div key={key}>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        {label}: {draftSettings[key]}
                      </label>
                      <input
                        type='range'
                        min={min}
                        max={max}
                        value={draftSettings[key]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDraftSettings((prev) => ({
                            ...prev,
                            [key]: Number(e.target.value),
                          }))
                        }
                        className='w-full'
                        aria-label={label}
                      />
                    </div>
                  ))}
                </div>

                <div className='flex gap-3'>
                  <button
                    onClick={saveSettings}
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors'
                  >
                    Save Settings
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className='px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className='mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <p className='font-semibold mb-2'>How to use Pomodoro Technique:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Work for 25 minutes with full focus (1 Pomodoro)</li>
              <li>Take a 5-minute short break</li>
              <li>After 4 Pomodoros, take a 15-minute long break</li>
              <li>Repeat the cycle to maintain productivity</li>
              <li>Customize durations in settings to fit your workflow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}