"use client";
import React, { useState } from "react";
import { Dices, Trash2, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Die {
  id: number;
  sides: number;
  count: number;
}

interface RollResult {
  sides: number;
  count: number;
  rolls: number[];
  subtotal: number;
}

interface RollRecord {
  id: number;
  rollResults: RollResult[];
  modifier: number;
  subtotal: number;
  total: number;
  maxPossible: number;
  minPossible: number;
  timestamp: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DICE_TYPES: number[] = [4, 6, 8, 10, 12, 20, 100];

const DICE_ICONS: Record<number, string> = {
  4: "△",
  6: "⚅",
  8: "◊",
  10: "◇",
  12: "◬",
  20: "◈",
  100: "%",
};

const getDiceIcon = (sides: number): string => DICE_ICONS[sides] ?? "⚄";

// ─── Component ───────────────────────────────────────────────────────────────

export default function DiceRollerClient() {
  const [dice, setDice] = useState<Die[]>([{ id: 1, sides: 6, count: 1 }]);
  const [modifier, setModifier] = useState<number>(0);
  const [results, setResults] = useState<RollRecord | null>(null);
  const [history, setHistory] = useState<RollRecord[]>([]);
  const [rolling, setRolling] = useState<boolean>(false);

  const addDie = (sides: number): void => {
    setDice((prev) => {
      const existing = prev.find((d) => d.sides === sides);
      if (existing) {
        return prev.map((d) =>
          d.sides === sides ? { ...d, count: d.count + 1 } : d,
        );
      }
      return [...prev, { id: Date.now(), sides, count: 1 }];
    });
  };

  const removeDie = (id: number): void => {
    setDice((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDieCount = (id: number, count: number): void => {
    if (count < 1) {
      removeDie(id);
    } else {
      setDice((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, count: Math.min(count, 99) } : d,
        ),
      );
    }
  };

  const rollDice = (): void => {
    if (dice.length === 0) return;
    setRolling(true);

    setTimeout(() => {
      const rollResults: RollResult[] = [];
      let total = 0;

      dice.forEach((die) => {
        const rolls: number[] = [];
        for (let i = 0; i < die.count; i++) {
          const roll = Math.floor(Math.random() * die.sides) + 1;
          rolls.push(roll);
          total += roll;
        }
        rollResults.push({
          sides: die.sides,
          count: die.count,
          rolls,
          subtotal: rolls.reduce((a, b) => a + b, 0),
        });
      });

      const finalTotal = total + modifier;
      const maxPossible =
        dice.reduce((sum, d) => sum + d.sides * d.count, 0) + modifier;
      const minPossible = dice.reduce((sum, d) => sum + d.count, 0) + modifier;

      const newResult: RollRecord = {
        id: Date.now(),
        rollResults,
        modifier,
        subtotal: total,
        total: finalTotal,
        maxPossible,
        minPossible,
        timestamp: new Date().toLocaleTimeString(),
      };

      setResults(newResult);
      setHistory((prev) => [newResult, ...prev.slice(0, 9)]);
      setRolling(false);
    }, 500);
  };

  const clearAll = (): void => {
    setDice([{ id: 1, sides: 6, count: 1 }]);
    setModifier(0);
    setResults(null);
  };

  const getDiceNotation = (): string => {
    const notation = dice.map((d) => `${d.count}d${d.sides}`).join(" + ");
    if (modifier > 0) return `${notation} + ${modifier}`;
    if (modifier < 0) return `${notation} - ${Math.abs(modifier)}`;
    return notation;
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <Dices className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dice Roller
            </h2>
            <p className="text-gray-500">
              Roll virtual dice for games and decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* ── Left / main column ── */}
            <div className="md:col-span-2 space-y-6">
              {/* Select dice */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Select Dice
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {DICE_TYPES.map((sides) => (
                    <button
                      key={sides}
                      onClick={() => addDie(sides)}
                      className="p-4 bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 rounded-lg transition-colors text-center"
                    >
                      <div className="text-3xl mb-1">{getDiceIcon(sides)}</div>
                      <div className="text-sm font-semibold text-gray-900">
                        d{sides}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Your dice */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Your Dice</h3>
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear All
                  </button>
                </div>

                {dice.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No dice selected. Click dice above to add.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dice.map((die) => (
                      <div
                        key={die.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="text-2xl">{getDiceIcon(die.sides)}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            d{die.sides}
                          </div>
                          <div className="text-xs text-gray-500">
                            {die.sides}-sided die
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateDieCount(die.id, die.count - 1)
                            }
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded font-bold transition-colors"
                            aria-label={`Decrease d${die.sides} count`}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={die.count}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) =>
                              updateDieCount(
                                die.id,
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="w-12 text-center border border-gray-300 rounded py-1 font-semibold"
                            min="1"
                            max="99"
                            aria-label={`d${die.sides} count`}
                          />
                          <button
                            onClick={() =>
                              updateDieCount(die.id, die.count + 1)
                            }
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded font-bold transition-colors"
                            aria-label={`Increase d${die.sides} count`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeDie(die.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                          aria-label={`Remove d${die.sides}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modifier */}
              <div>
                <label
                  htmlFor="modifier-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Modifier
                </label>
                <input
                  id="modifier-input"
                  type="number"
                  value={modifier}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setModifier(parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add/subtract from total"
                />
              </div>

              {/* Notation */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-gray-600 mb-1">Dice Notation</div>
                <div className="text-2xl font-bold text-purple-600 font-mono">
                  {getDiceNotation()}
                </div>
              </div>

              {/* Roll button */}
              <button
                onClick={rollDice}
                disabled={dice.length === 0 || rolling}
                className={`w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-bold text-xl transition-colors flex items-center justify-center gap-3 ${
                  rolling ? "animate-pulse" : ""
                }`}
              >
                <Dices className="w-6 h-6" />
                {rolling ? "Rolling..." : "Roll Dice"}
              </button>

              {/* Results */}
              {results && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">
                    Results
                  </h3>

                  <div className="space-y-3 mb-4">
                    {results.rollResults.map((result, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {getDiceIcon(result.sides)}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {result.count}d{result.sides}
                            </span>
                          </div>
                          <span className="text-xl font-bold text-purple-600">
                            {result.subtotal}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {result.rolls.map((roll, rollIdx) => (
                            <div
                              key={rollIdx}
                              className={`w-10 h-10 flex items-center justify-center rounded font-bold ${
                                roll === result.sides
                                  ? "bg-green-100 text-green-700"
                                  : roll === 1
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {roll}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {modifier !== 0 && (
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Dice Total:</span>
                        <span className="text-xl font-bold text-gray-900">
                          {results.subtotal}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Modifier:</span>
                        <span className="text-xl font-bold text-gray-900">
                          {modifier > 0 ? "+" : ""}
                          {modifier}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="bg-purple-600 text-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Final Total</span>
                      <span className="text-4xl font-bold">
                        {results.total}
                      </span>
                    </div>
                    <div className="text-xs opacity-75 mt-2">
                      Range: {results.minPossible} – {results.maxPossible}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── History column ── */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Roll History</h3>
              <div className="space-y-2">
                {history.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No rolls yet
                  </div>
                ) : (
                  history.map((roll) => (
                    <div
                      key={roll.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          {roll.timestamp}
                        </span>
                        <span className="text-lg font-bold text-purple-600">
                          {roll.total}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 font-mono">
                        {roll.rollResults
                          .map((r) => `${r.count}d${r.sides}`)
                          .join(" + ")}
                        {roll.modifier > 0 && ` + ${roll.modifier}`}
                        {roll.modifier < 0 && ` - ${Math.abs(roll.modifier)}`}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">Dice Guide:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>d4:</strong> 4-sided die (tetrahedron) — common in
                D&amp;D for daggers
              </li>
              <li>
                <strong>d6:</strong> Standard 6-sided cube — most common die
              </li>
              <li>
                <strong>d8:</strong> 8-sided die (octahedron) — used for medium
                weapons
              </li>
              <li>
                <strong>d10:</strong> 10-sided die — often used for percentages
              </li>
              <li>
                <strong>d12:</strong> 12-sided die (dodecahedron) — heavy
                weapons
              </li>
              <li>
                <strong>d20:</strong> 20-sided die — most iconic RPG die for
                skill checks
              </li>
              <li>
                <strong>d100:</strong> Percentile die — for percentage-based
                rolls
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
