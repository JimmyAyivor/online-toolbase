"use client";
import React, { useState, useEffect } from "react";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Heart,
  User,
  Scale,
} from "lucide-react";

/* ================= TYPES ================= */

type Unit = "metric" | "imperial";
type Gender = "male" | "female";

type Category = {
  name: string;
  min: number;
  max: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  advice: string;
};

/* ================= COMPONENT ================= */

const BmiCalculatorClient = () => {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<Gender>("male");
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<Category | null>(null);

  const categories: Category[] = [
    {
      name: "Underweight",
      min: 0,
      max: 18.5,
      color: "blue",
      icon: TrendingDown,
      advice:
        "Consider consulting a healthcare provider about healthy weight gain.",
    },
    {
      name: "Normal weight",
      min: 18.5,
      max: 24.9,
      color: "green",
      icon: CheckCircle,
      advice:
        "Great! Maintain your healthy lifestyle with balanced diet and exercise.",
    },
    {
      name: "Overweight",
      min: 25,
      max: 29.9,
      color: "yellow",
      icon: AlertCircle,
      advice:
        "Consider increasing physical activity and improving dietary habits.",
    },
    {
      name: "Obese (Class I)",
      min: 30,
      max: 34.9,
      color: "orange",
      icon: TrendingUp,
      advice:
        "Consult a healthcare provider for a personalized weight management plan.",
    },
    {
      name: "Obese (Class II)",
      min: 35,
      max: 39.9,
      color: "red",
      icon: TrendingUp,
      advice:
        "Medical intervention recommended. Please consult a healthcare professional.",
    },
    {
      name: "Obese (Class III)",
      min: 40,
      max: 100,
      color: "red",
      icon: TrendingUp,
      advice:
        "Urgent medical attention recommended. Please see a healthcare provider.",
    },
  ];

  const calculateBMI = (): void => {
    let weightKg = weight;
    let heightM = height / 100;

    if (unit === "imperial") {
      weightKg = weight * 0.453592;
      heightM = (height * 2.54) / 100;
    }

    const bmiValue = weightKg / (heightM * heightM);
    setBmi(bmiValue);

    const cat =
      categories.find((c: Category) => bmiValue >= c.min && bmiValue < c.max) ??
      categories[categories.length - 1];

    setCategory(cat);
  };

  useEffect(() => {
    if (weight > 0 && height > 0) {
      calculateBMI();
    }
  }, [weight, height, unit]);

  const getHealthyWeightRange = (): {
    min: string;
    max: string;
    unit: string;
  } => {
    let heightM = height / 100;
    if (unit === "imperial") {
      heightM = (height * 2.54) / 100;
    }

    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;

    if (unit === "imperial") {
      return {
        min: (minWeight / 0.453592).toFixed(1),
        max: (maxWeight / 0.453592).toFixed(1),
        unit: "lbs",
      };
    }

    return {
      min: minWeight.toFixed(1),
      max: maxWeight.toFixed(1),
      unit: "kg",
    };
  };

  const healthyRange = getHealthyWeightRange();
  const CategoryIcon = category?.icon ?? Activity;

  const getBMIPosition = (): number => {
    if (bmi < 18.5) return (bmi / 18.5) * 25;
    if (bmi < 25) return 25 + ((bmi - 18.5) / 6.4) * 25;
    if (bmi < 30) return 50 + ((bmi - 25) / 5) * 20;
    if (bmi < 35) return 70 + ((bmi - 30) / 5) * 15;
    if (bmi < 40) return 85 + ((bmi - 35) / 5) * 10;
    return Math.min(95 + ((bmi - 40) / 10) * 5, 100);
  };

  const bmiPosition = getBMIPosition();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BMI Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your Body Mass Index and get health insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <User className="w-6 h-6 text-green-600" />
                Your Information
              </h3>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setUnit("metric")}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                    unit === "metric"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Metric (kg, cm)
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                    unit === "imperial"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Imperial (lbs, in)
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setGender("male")}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                    gender === "male"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                    gender === "female"
                      ? "bg-pink-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Female
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Age: {age} years
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-green-200 to-emerald-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Weight: {weight} {unit === "metric" ? "kg" : "lbs"}
                  </label>
                  <input
                    type="range"
                    min={unit === "metric" ? 30 : 66}
                    max={unit === "metric" ? 200 : 440}
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-cyan-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Height: {height} {unit === "metric" ? "cm" : "in"}
                  </label>
                  <input
                    type="range"
                    min={unit === "metric" ? 130 : 51}
                    max={unit === "metric" ? 230 : 91}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {category && (
              <>
                <div
                  className={`bg-gradient-to-br from-${category.color}-600 to-${category.color}-700 rounded-2xl shadow-xl p-6 md:p-8 text-white`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <CategoryIcon className="w-12 h-12" />
                    <div>
                      <h3 className="text-3xl font-bold">
                        BMI: {bmi.toFixed(1)}
                      </h3>
                      <p className="text-lg opacity-90">{category.name}</p>
                    </div>
                  </div>

                  <div className="relative h-8 bg-white/20 backdrop-blur rounded-full overflow-hidden mb-4">
                    <div
                      className="absolute top-0 left-0 h-full bg-white/40 transition-all duration-500"
                      style={{ width: `${bmiPosition}%` }}
                    ></div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-500"
                      style={{ left: `calc(${bmiPosition}% - 8px)` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-6 gap-1 text-xs text-white/80 mb-4">
                    <div>0</div>
                    <div>18.5</div>
                    <div>25</div>
                    <div>30</div>
                    <div>35</div>
                    <div>40+</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <p className="text-sm leading-relaxed">{category.advice}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                    <Scale className="w-6 h-6 text-green-600" />
                    BMI Categories
                  </h3>

                  <div className="space-y-3">
                    {categories.map((cat, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl transition-all ${
                          cat.name === category.name
                            ? `bg-${cat.color}-50 border-2 border-${cat.color}-300 shadow-md`
                            : "bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full bg-${cat.color}-500`}
                            ></div>
                            <div>
                              <div className="font-bold text-gray-900">
                                {cat.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                BMI {cat.min} -{" "}
                                {cat.max === 100 ? "40+" : cat.max}
                              </div>
                            </div>
                          </div>
                          {cat.name === category.name && (
                            <CheckCircle
                              className={`w-6 h-6 text-${cat.color}-600`}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                Health Insights
              </h3>

              {category ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <div className="font-bold text-gray-900 mb-2">
                      Healthy Weight Range
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {healthyRange.min} - {healthyRange.max}{" "}
                      {healthyRange.unit}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      For your height of {height}{" "}
                      {unit === "metric" ? "cm" : "in"}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <div className="font-bold text-gray-900 mb-2">Your BMI</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {bmi.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Category: {category.name}
                    </div>
                  </div>

                  {bmi < 18.5 && (
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="text-sm text-gray-700">
                        <strong>Weight to gain:</strong>{" "}
                        {(parseFloat(healthyRange.min) - weight).toFixed(1)}{" "}
                        {healthyRange.unit} to reach healthy range
                      </div>
                    </div>
                  )}

                  {bmi >= 25 && (
                    <div className="p-4 bg-orange-50 rounded-xl">
                      <div className="text-sm text-gray-700">
                        <strong>Weight to lose:</strong>{" "}
                        {(weight - parseFloat(healthyRange.max)).toFixed(1)}{" "}
                        {healthyRange.unit} to reach healthy range
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Adjust sliders to calculate BMI</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-6 border-2 border-green-200">
              <h4 className="font-bold text-gray-900 mb-4">💡 Health Tips</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Balanced Diet:</strong> Eat plenty of fruits,
                    vegetables, and whole grains
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Regular Exercise:</strong> Aim for 150 minutes of
                    moderate activity per week
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Stay Hydrated:</strong> Drink 8-10 glasses of water
                    daily
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Sleep Well:</strong> Get 7-9 hours of quality sleep
                    each night
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-900">
                <strong>⚠️ Disclaimer:</strong> BMI is a screening tool and
                doesn't diagnose health. Consult healthcare professionals for
                personalized advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculatorClient;
