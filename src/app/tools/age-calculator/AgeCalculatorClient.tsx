"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Cake, Clock, Heart, Baby, User, Users } from "lucide-react";

interface AgeData {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: string;
  daysUntilBirthday: number;
  dayOfWeekBorn: string;
  zodiac: {
    name: string;
    emoji: string;
  };
}

const AgeCalculatorClient = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [useTargetDate, setUseTargetDate] = useState(false);
  const [ageData, setAgeData] = useState<AgeData | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      setAgeData(null);
      return;
    }

    const birth = new Date(birthDate);
    const target =
      useTargetDate && targetDate ? new Date(targetDate) : new Date();

    if (birth.getTime() > target.getTime()) {
      setAgeData(null);
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next birthday
    let nextBirthday = new Date(
      target.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );
    if (nextBirthday.getTime() < target.getTime()) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Day of week born
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeekBorn = daysOfWeek[birth.getDay()];

    // Zodiac sign
    const zodiacSigns = [
      { name: "Capricorn", start: [12, 22], end: [1, 19], emoji: "♑" },
      { name: "Aquarius", start: [1, 20], end: [2, 18], emoji: "♒" },
      { name: "Pisces", start: [2, 19], end: [3, 20], emoji: "♓" },
      { name: "Aries", start: [3, 21], end: [4, 19], emoji: "♈" },
      { name: "Taurus", start: [4, 20], end: [5, 20], emoji: "♉" },
      { name: "Gemini", start: [5, 21], end: [6, 20], emoji: "♊" },
      { name: "Cancer", start: [6, 21], end: [7, 22], emoji: "♋" },
      { name: "Leo", start: [7, 23], end: [8, 22], emoji: "♌" },
      { name: "Virgo", start: [8, 23], end: [9, 22], emoji: "♍" },
      { name: "Libra", start: [9, 23], end: [10, 22], emoji: "♎" },
      { name: "Scorpio", start: [10, 23], end: [11, 21], emoji: "♏" },
      { name: "Sagittarius", start: [11, 22], end: [12, 21], emoji: "♐" },
    ];

    const birthMonth = birth.getMonth() + 1;
    const birthDay = birth.getDate();
    let zodiac = zodiacSigns.find((sign) => {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;

      if (startMonth === endMonth) {
        return (
          birthMonth === startMonth &&
          birthDay >= startDay &&
          birthDay <= endDay
        );
      } else {
        return (
          (birthMonth === startMonth && birthDay >= startDay) ||
          (birthMonth === endMonth && birthDay <= endDay)
        );
      }
    });

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      nextBirthday: nextBirthday.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      daysUntilBirthday,
      dayOfWeekBorn,
      zodiac: zodiac || { name: "Unknown", emoji: "🔮" },
    });
  };

  useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate, useTargetDate]);

  const getLifeStage = (years: number) => {
    if (years < 2) return { stage: "Infant", icon: Baby, color: "pink" };
    if (years < 13) return { stage: "Child", icon: User, color: "blue" };
    if (years < 20) return { stage: "Teenager", icon: User, color: "purple" };
    if (years < 40) return { stage: "Young Adult", icon: User, color: "green" };
    if (years < 60)
      return { stage: "Middle Age", icon: Users, color: "orange" };
    return { stage: "Senior", icon: Users, color: "indigo" };
  };

  const lifeStage = ageData ? getLifeStage(ageData.years) : null;
  const LifeStageIcon = lifeStage?.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Cake className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Age Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your exact age in years, months, days, and more
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <Calendar className="w-6 h-6 text-pink-600" />
                Date of Birth
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Enter Your Birth Date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors text-lg"
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl cursor-pointer hover:shadow-md transition-all">
                  <input
                    type="checkbox"
                    checked={useTargetDate}
                    onChange={(e) => setUseTargetDate(e.target.checked)}
                    className="w-5 h-5 text-pink-600 rounded"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Calculate age on a specific date
                    </div>
                    <div className="text-xs text-gray-600">
                      Leave unchecked to calculate current age
                    </div>
                  </div>
                </label>
              </div>

              {useTargetDate && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors text-lg"
                  />
                </div>
              )}
            </div>

            {ageData && (
              <>
                <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    {LifeStageIcon && <LifeStageIcon className="w-8 h-8" />}
                    <div>
                      <h3 className="text-2xl font-bold">
                        You are {ageData.years} years old
                      </h3>
                      <p className="text-pink-100">
                        Life Stage: {lifeStage?.stage}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold">{ageData.years}</div>
                      <div className="text-sm text-pink-100 mt-1">Years</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold">{ageData.months}</div>
                      <div className="text-sm text-pink-100 mt-1">Months</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold">{ageData.days}</div>
                      <div className="text-sm text-pink-100 mt-1">Days</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-pink-600" />
                      Total Time Lived
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                        <span className="text-gray-700">Total Months</span>
                        <span className="font-bold text-pink-600">
                          {ageData.totalMonths.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">Total Weeks</span>
                        <span className="font-bold text-purple-600">
                          {ageData.totalWeeks.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">Total Days</span>
                        <span className="font-bold text-blue-600">
                          {ageData.totalDays.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                        <span className="text-gray-700">Total Hours</span>
                        <span className="font-bold text-indigo-600">
                          {ageData.totalHours.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                        <span className="text-gray-700">Total Minutes</span>
                        <span className="font-bold text-violet-600">
                          {ageData.totalMinutes.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Cake className="w-5 h-5 text-pink-600" />
                      Birthday Information
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-pink-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">
                          Next Birthday
                        </div>
                        <div className="font-bold text-gray-900">
                          {ageData.nextBirthday}
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">
                          Days Until Birthday
                        </div>
                        <div className="font-bold text-gray-900">
                          {ageData.daysUntilBirthday} days
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">
                          You Were Born On
                        </div>
                        <div className="font-bold text-gray-900">
                          {ageData.dayOfWeekBorn}
                        </div>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">
                          Zodiac Sign
                        </div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          <span className="text-2xl">
                            {ageData.zodiac.emoji}
                          </span>
                          {ageData.zodiac.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                Fun Facts
              </h3>

              {ageData ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
                    <div className="text-2xl mb-2">🎂</div>
                    <div className="font-bold text-gray-900 mb-1">
                      Heartbeats
                    </div>
                    <div className="text-sm text-gray-700">
                      Your heart has beaten approximately{" "}
                      {Math.round(ageData.totalMinutes * 70).toLocaleString()}{" "}
                      times!
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200">
                    <div className="text-2xl mb-2">😴</div>
                    <div className="font-bold text-gray-900 mb-1">
                      Sleep Time
                    </div>
                    <div className="text-sm text-gray-700">
                      You've slept for about{" "}
                      {Math.round(ageData.totalDays / 3).toLocaleString()} days
                      (assuming 8 hours/day)
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                    <div className="text-2xl mb-2">🌍</div>
                    <div className="font-bold text-gray-900 mb-1">
                      Earth Orbits
                    </div>
                    <div className="text-sm text-gray-700">
                      Earth has orbited the sun {ageData.years} times since you
                      were born
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <div className="text-2xl mb-2">💪</div>
                    <div className="font-bold text-gray-900 mb-1">
                      Breaths Taken
                    </div>
                    <div className="text-sm text-gray-700">
                      You've taken approximately{" "}
                      {Math.round(ageData.totalMinutes * 16).toLocaleString()}{" "}
                      breaths!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    Enter your birth date to see fun facts!
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-md p-6 border-2 border-pink-200">
              <h4 className="font-bold text-gray-900 mb-4">🎯 Life Stages</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Infant:</strong> 0-2 years
                </p>
                <p>
                  <strong>Child:</strong> 2-12 years
                </p>
                <p>
                  <strong>Teenager:</strong> 13-19 years
                </p>
                <p>
                  <strong>Young Adult:</strong> 20-39 years
                </p>
                <p>
                  <strong>Middle Age:</strong> 40-59 years
                </p>
                <p>
                  <strong>Senior:</strong> 60+ years
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculatorClient;
