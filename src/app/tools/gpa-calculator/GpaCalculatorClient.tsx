"use client";
import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  BookOpen,
  Target,
  Award,
  Calculator,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type GradeScale = "4.0" | "5.0" | "letter";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

interface GPALevel {
  label: string;
  color: string;
  emoji: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GRADE_SCALES: Record<GradeScale, Record<string, number>> = {
  "4.0": {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  },
  "5.0": {
    "A+": 5.0,
    A: 5.0,
    "A-": 4.7,
    "B+": 4.3,
    B: 4.0,
    "B-": 3.7,
    "C+": 3.3,
    C: 3.0,
    "C-": 2.7,
    "D+": 2.3,
    D: 2.0,
    "D-": 1.7,
    F: 0.0,
  },
  letter: {
    "A+": 97.5,
    A: 95,
    "A-": 92,
    "B+": 88,
    B: 85,
    "B-": 82,
    "C+": 78,
    C: 75,
    "C-": 72,
    "D+": 68,
    D: 65,
    "D-": 62,
    F: 50,
  },
};

const GRADE_SCALE_KEYS = Object.keys(GRADE_SCALES["4.0"]);

const SCALE_BUTTONS: { value: GradeScale; label: string }[] = [
  { value: "4.0", label: "4.0 Scale" },
  { value: "5.0", label: "5.0 Scale" },
  { value: "letter", label: "Percentage" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getGPALevel(gpaValue: number): GPALevel {
  if (gpaValue >= 3.7)
    return { label: "Excellent", color: "emerald", emoji: "🌟" };
  if (gpaValue >= 3.0) return { label: "Good", color: "green", emoji: "✅" };
  if (gpaValue >= 2.5)
    return { label: "Average", color: "yellow", emoji: "📚" };
  if (gpaValue >= 2.0)
    return { label: "Below Average", color: "orange", emoji: "⚠️" };
  return { label: "Needs Improvement", color: "red", emoji: "📉" };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function GpaCalculatorClient() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", grade: "", credits: 3 },
  ]);
  const [gradeScale, setGradeScale] = useState<GradeScale>("4.0");
  const [currentGPA, setCurrentGPA] = useState<string>("");
  const [currentCredits, setCurrentCredits] = useState<string>("");
  const [gpa, setGPA] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [cumulativeGPA, setCumulativeGPA] = useState<number>(0);

  useEffect(() => {
    calculateGPA();
  }, [courses, gradeScale, currentGPA, currentCredits]);

  const calculateGPA = (): void => {
    const scale = GRADE_SCALES[gradeScale];
    const validCourses = courses.filter((c) => c.grade && c.credits > 0);

    if (validCourses.length === 0) {
      setGPA(0);
      setTotalCredits(0);
      setCumulativeGPA(0);
      return;
    }

    let totalPoints = 0;
    let totalCreds = 0;

    validCourses.forEach((course) => {
      const gradePoint = scale[course.grade] ?? 0;
      totalPoints += gradePoint * course.credits;
      totalCreds += course.credits;
    });

    const semesterGPA = totalCreds > 0 ? totalPoints / totalCreds : 0;
    setGPA(semesterGPA);
    setTotalCredits(totalCreds);

    const prevGPA = parseFloat(currentGPA) || 0;
    const prevCredits = parseFloat(currentCredits) || 0;

    if (currentGPA && currentCredits && prevCredits > 0) {
      const cumGPA =
        (prevGPA * prevCredits + totalPoints) / (prevCredits + totalCreds);
      setCumulativeGPA(cumGPA);
    } else {
      setCumulativeGPA(semesterGPA);
    }
  };

  const addCourse = (): void => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), name: "", grade: "", credits: 3 },
    ]);
  };

  const removeCourse = (id: number): void => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (
    id: number,
    field: keyof Course,
    value: string | number,
  ): void => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const gpaLevel = getGPALevel(gpa);
  const currentScale = GRADE_SCALES[gradeScale];
  const prevCreditsNum = parseFloat(currentCredits) || 0;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            GPA Calculator
          </h2>
          <p className="text-gray-500">
            Calculate your semester and cumulative GPA easily
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Left / main column ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grade scale selector */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <Calculator className="w-6 h-6 text-indigo-600" />
                Grade Scale
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {SCALE_BUTTONS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setGradeScale(value)}
                    className={`p-4 rounded-xl font-semibold transition-all ${
                      gradeScale === value
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">
                  Current GPA (Optional)
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your current GPA and credits to calculate cumulative GPA
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={currentGPA}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCurrentGPA(e.target.value)
                      }
                      placeholder="3.50"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Completed Credits
                    </label>
                    <input
                      type="number"
                      value={currentCredits}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCurrentCredits(e.target.value)
                      }
                      placeholder="60"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course list */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-xl">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  Courses
                </h3>
                <button
                  onClick={addCourse}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Course
                </button>
              </div>

              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={course.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-700">
                        Course {index + 1}
                      </span>
                      {courses.length > 1 && (
                        <button
                          onClick={() => removeCourse(course.id)}
                          aria-label={`Remove course ${index + 1}`}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Course Name"
                        value={course.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateCourse(course.id, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                      />

                      <select
                        value={course.grade}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          updateCourse(course.id, "grade", e.target.value)
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="">Select Grade</option>
                        {GRADE_SCALE_KEYS.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade} ({currentScale[grade]})
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        placeholder="Credits"
                        value={course.credits}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateCourse(
                            course.id,
                            "credits",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        min="0"
                        step="0.5"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white sticky top-8">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-xl">
                <Award className="w-6 h-6" />
                Your Results
              </h3>

              <div className="space-y-6">
                {/* Semester GPA */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-5 border-2 border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-indigo-100">
                      Semester GPA
                    </span>
                    <span className="text-2xl">{gpaLevel.emoji}</span>
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    {gpa.toFixed(2)}
                  </div>
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                    {gpaLevel.label}
                  </div>
                </div>

                {/* Total credits */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-sm text-indigo-100 mb-1">
                    Total Credits This Semester
                  </div>
                  <div className="text-3xl font-bold">
                    {totalCredits.toFixed(1)}
                  </div>
                </div>

                {/* Cumulative GPA */}
                {currentGPA && currentCredits && (
                  <div className="bg-white/20 backdrop-blur rounded-xl p-5 border-2 border-white/30">
                    <div className="text-sm text-indigo-100 mb-2">
                      Cumulative GPA
                    </div>
                    <div className="text-4xl font-bold mb-1">
                      {cumulativeGPA.toFixed(2)}
                    </div>
                    <div className="text-xs text-indigo-100">
                      Total: {(prevCreditsNum + totalCredits).toFixed(1)}{" "}
                      credits
                    </div>
                  </div>
                )}

                {/* Grade breakdown */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <h4 className="font-bold text-sm text-indigo-100 mb-3 uppercase tracking-wider">
                    Grade Breakdown
                  </h4>
                  <div className="space-y-2">
                    {courses
                      .filter((c) => c.grade)
                      .map((course) => (
                        <div
                          key={course.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="truncate flex-1 mr-2">
                            {course.name || "Untitled"}
                          </span>
                          <span className="font-bold whitespace-nowrap">
                            {course.grade} ({course.credits}cr)
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scale guide */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                GPA Scale Guide
              </h4>
              <div className="space-y-3 text-sm">
                {[
                  {
                    label: "A (Excellent)",
                    range: "3.7 – 4.0",
                    bg: "bg-emerald-50",
                    text: "emerald",
                  },
                  {
                    label: "B (Good)",
                    range: "3.0 – 3.6",
                    bg: "bg-green-50",
                    text: "green",
                  },
                  {
                    label: "C (Average)",
                    range: "2.0 – 2.9",
                    bg: "bg-yellow-50",
                    text: "yellow",
                  },
                  {
                    label: "D (Pass)",
                    range: "1.0 – 1.9",
                    bg: "bg-orange-50",
                    text: "orange",
                  },
                  {
                    label: "F (Fail)",
                    range: "0.0",
                    bg: "bg-red-50",
                    text: "red",
                  },
                ].map(({ label, range, bg, text }) => (
                  <div
                    key={label}
                    className={`flex justify-between items-center p-3 ${bg} rounded-lg`}
                  >
                    <span className={`font-semibold text-${text}-900`}>
                      {label}
                    </span>
                    <span className={`text-${text}-700`}>{range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study tips */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-6 border-2 border-indigo-200">
              <h4 className="font-bold text-gray-900 mb-3">📚 Study Tips</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Aim for consistency across all courses</p>
                <p>• Focus extra effort on higher credit courses</p>
                <p>• Seek help early if struggling</p>
                <p>• Balance course difficulty each semester</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
