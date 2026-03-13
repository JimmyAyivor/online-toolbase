"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeftRight,
  Ruler,
  Weight,
  Thermometer,
  Clock,
  Zap,
  Droplets,
  Wind,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface UnitDef {
  name: string;
  factor?: number; // undefined only for temperature units
}

interface CategoryDef {
  icon: React.ElementType;
  name: string;
  units: Record<string, UnitDef>;
}

type CategoryKey =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "speed"
  | "time";

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES: Record<CategoryKey, CategoryDef> = {
  length: {
    icon: Ruler,
    name: "Length",
    units: {
      meters: { name: "Meters", factor: 1 },
      kilometers: { name: "Kilometers", factor: 0.001 },
      centimeters: { name: "Centimeters", factor: 100 },
      millimeters: { name: "Millimeters", factor: 1000 },
      miles: { name: "Miles", factor: 0.000621371 },
      yards: { name: "Yards", factor: 1.09361 },
      feet: { name: "Feet", factor: 3.28084 },
      inches: { name: "Inches", factor: 39.3701 },
    },
  },
  weight: {
    icon: Weight,
    name: "Weight",
    units: {
      kilograms: { name: "Kilograms", factor: 1 },
      grams: { name: "Grams", factor: 1000 },
      milligrams: { name: "Milligrams", factor: 1000000 },
      pounds: { name: "Pounds", factor: 2.20462 },
      ounces: { name: "Ounces", factor: 35.274 },
      tons: { name: "Metric Tons", factor: 0.001 },
    },
  },
  temperature: {
    icon: Thermometer,
    name: "Temperature",
    units: {
      celsius: { name: "Celsius" },
      fahrenheit: { name: "Fahrenheit" },
      kelvin: { name: "Kelvin" },
    },
  },
  volume: {
    icon: Droplets,
    name: "Volume",
    units: {
      liters: { name: "Liters", factor: 1 },
      milliliters: { name: "Milliliters", factor: 1000 },
      gallons: { name: "Gallons (US)", factor: 0.264172 },
      quarts: { name: "Quarts", factor: 1.05669 },
      pints: { name: "Pints", factor: 2.11338 },
      cups: { name: "Cups", factor: 4.22675 },
      fluid_ounces: { name: "Fluid Ounces", factor: 33.814 },
    },
  },
  speed: {
    icon: Wind,
    name: "Speed",
    units: {
      meters_per_second: { name: "Meters/second", factor: 1 },
      kilometers_per_hour: { name: "Kilometers/hour", factor: 3.6 },
      miles_per_hour: { name: "Miles/hour", factor: 2.23694 },
      knots: { name: "Knots", factor: 1.94384 },
      feet_per_second: { name: "Feet/second", factor: 3.28084 },
    },
  },
  time: {
    icon: Clock,
    name: "Time",
    units: {
      seconds: { name: "Seconds", factor: 1 },
      minutes: { name: "Minutes", factor: 1 / 60 },
      hours: { name: "Hours", factor: 1 / 3600 },
      days: { name: "Days", factor: 1 / 86400 },
      weeks: { name: "Weeks", factor: 1 / 604800 },
      months: { name: "Months (30 days)", factor: 1 / 2592000 },
      years: { name: "Years (365 days)", factor: 1 / 31536000 },
    },
  },
};

const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;
  if (from === "celsius") celsius = value;
  else if (from === "fahrenheit") celsius = ((value - 32) * 5) / 9;
  else celsius = value - 273.15;

  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

function convert(
  value: string,
  from: string,
  to: string,
  category: CategoryKey,
): string {
  if (!value || isNaN(Number(value))) return "";
  const num = parseFloat(value);
  const units = CATEGORIES[category].units;

  if (category === "temperature") {
    return convertTemperature(num, from, to).toFixed(4);
  }

  const fromFactor = units[from]?.factor ?? 1;
  const toFactor = units[to]?.factor ?? 1;
  const base = num / fromFactor;
  const result = base * toFactor;
  return result.toFixed(6).replace(/\.?0+$/, "");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function UnitConverterClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("length");
  const [fromUnit, setFromUnit] = useState<string>("meters");
  const [toUnit, setToUnit] = useState<string>("feet");
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");

  // Reset units when category changes
  useEffect(() => {
    const units = Object.keys(CATEGORIES[activeCategory].units);
    setFromUnit(units[0] ?? "");
    setToUnit(units[1] ?? units[0] ?? "");
    setFromValue("");
    setToValue("");
  }, [activeCategory]);

  // Recompute toValue whenever inputs change
  useEffect(() => {
    if (fromValue) {
      setToValue(convert(fromValue, fromUnit, toUnit, activeCategory));
    } else {
      setToValue("");
    }
  }, [fromValue, fromUnit, toUnit, activeCategory]);

  const handleSwap = (): void => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const CategoryIcon = CATEGORIES[activeCategory].icon;
  const unitEntries = Object.entries(CATEGORIES[activeCategory].units);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg'>
            <Zap className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Unit Converter
          </h2>
          <p className='text-gray-500'>
            Fast, accurate, and easy to use conversion tool
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6'>
          {/* Category tabs */}
          <div className='grid grid-cols-3 md:grid-cols-6 gap-3 mb-8'>
            {CATEGORY_KEYS.map((key) => {
              const { icon: Icon, name } = CATEGORIES[key];
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className='w-6 h-6 mb-2' />
                  <span className='text-xs font-medium'>{name}</span>
                </button>
              );
            })}
          </div>

          {/* Converter */}
          <div className='space-y-4'>
            {/* From */}
            <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6'>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFromUnit(e.target.value)
                }
                className='w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-indigo-500 transition-colors'
              >
                {unitEntries.map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <input
                type='number'
                value={fromValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFromValue(e.target.value)
                }
                placeholder='Enter value'
                className='w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-indigo-500 transition-colors'
              />
            </div>

            {/* Swap */}
            <div className='flex justify-center'>
              <button
                onClick={handleSwap}
                aria-label='Swap units'
                className='p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110'
              >
                <ArrowLeftRight className='w-6 h-6' />
              </button>
            </div>

            {/* To */}
            <div className='bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6'>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                To
              </label>
              <select
                value={toUnit}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setToUnit(e.target.value)
                }
                className='w-full px-4 py-3 bg-white border-2 border-indigo-200 rounded-lg mb-4 focus:outline-none focus:border-indigo-500 transition-colors'
              >
                {unitEntries.map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <div className='w-full px-4 py-4 bg-white border-2 border-indigo-200 rounded-lg text-lg font-semibold text-indigo-600'>
                {toValue || "0"}
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6 text-sm text-gray-600'>
          <p>
            💡 <strong>Tip:</strong> Switch between different unit categories
            using the buttons above
          </p>
        </div>
      </div>
    </div>
  );
}
