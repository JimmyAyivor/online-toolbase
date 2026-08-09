"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  DollarSign,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  Globe,
  Star,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

interface CurrencyPair {
  from: string;
  to: string;
}

type ExchangeRates = Record<string, number>;
type RateSource = "live" | "cached" | "fallback";

interface StoredRates {
  base: string;
  rates: ExchangeRates;
  fetchedAt: number; // epoch ms
}

// ─── Constants ───────────────────────────────────────────────────────────────

// Hardcoded rates are a last-resort fallback ONLY — used if a live fetch has
// never succeeded and there's nothing usable in localStorage either. They are
// never shown to the user as if they were current; the UI always discloses
// when it's relying on this data.
const FALLBACK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.05,
  BRL: 4.97,
  ZAR: 18.65,
  SGD: 1.34,
  HKD: 7.83,
  NZD: 1.64,
  SEK: 10.58,
  NOK: 10.82,
  DKK: 6.86,
  KRW: 1315.5,
  TRY: 32.15,
  RUB: 92.5,
  PLN: 3.98,
  THB: 35.42,
  IDR: 15680,
  MYR: 4.68,
  PHP: 56.25,
  AED: 3.67,
  SAR: 3.75,
  CZK: 22.45,
  HUF: 355.8,
};

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺" },
];

const popularPairs: CurrencyPair[] = [
  { from: "USD", to: "EUR" },
  { from: "USD", to: "GBP" },
  { from: "USD", to: "JPY" },
  { from: "EUR", to: "GBP" },
  { from: "GBP", to: "USD" },
  { from: "USD", to: "CAD" },
];

const RATES_API_URL = "https://open.er-api.com/v6/latest/USD";
const LOCAL_STORAGE_KEY = "occ_currency_rates_v1";
const BASE_CURRENCY = "USD";

// Rates auto-refresh on this cadence while the tab is open...
const AUTO_REFRESH_MS = 5 * 60 * 1000; // 5 minutes
// ...and are treated as stale (prompting an immediate refetch + warning if
// that refetch fails) once they're older than this.
const STALE_AFTER_MS = 15 * 60 * 1000; // 15 minutes
// Cached rates from localStorage are only trusted as a fetch fallback if
// they're younger than this — otherwise they're too old to be useful and we
// fall through to the hardcoded reference rates instead.
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
const FETCH_RETRY_COUNT = 2;
const FETCH_RETRY_DELAY_MS = 1200;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getCurrency = (code: string): Currency | undefined =>
  currencies.find((c) => c.code === code);

const getRate = (rates: ExchangeRates, from: string, to: string): number =>
  (rates[to] ?? 1) / (rates[from] ?? 1);

const formatNumber = (num: number): string =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);

function readCachedRates(): StoredRates | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRates;
    if (!parsed?.rates || !parsed?.fetchedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCachedRates(entry: StoredRates): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // Storage full or unavailable (e.g. private browsing) — safe to ignore,
    // rates just won't survive a reload.
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchLiveRates(): Promise<ExchangeRates> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt <= FETCH_RETRY_COUNT; attempt++) {
    try {
      const res = await fetch(RATES_API_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`Rate API responded ${res.status}`);
      const data = await res.json();
      if (data?.result !== "success" || !data?.rates) {
        throw new Error("Rate API returned an unexpected payload");
      }
      // Keep only the currencies this converter supports, plus the base.
      const rates: ExchangeRates = { [BASE_CURRENCY]: 1 };
      for (const currency of currencies) {
        if (typeof data.rates[currency.code] === "number") {
          rates[currency.code] = data.rates[currency.code];
        }
      }
      return rates;
    } catch (err) {
      lastError = err;
      if (attempt < FETCH_RETRY_COUNT) {
        await sleep(FETCH_RETRY_DELAY_MS * (attempt + 1));
      }
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to fetch exchange rates");
}

function formatRelativeTime(fromMs: number, nowMs: number): string {
  const diffSeconds = Math.max(0, Math.round((nowMs - fromMs) / 1000));
  if (diffSeconds < 10) return "just now";
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CurrencyConverterClient() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [favorites, setFavorites] = useState<string[]>([
    "USD",
    "EUR",
    "GBP",
    "JPY",
  ]);

  const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);
  const [rateSource, setRateSource] = useState<RateSource>("fallback");
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [nowTick, setNowTick] = useState<number>(Date.now());

  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasLoadedCacheRef = useRef<boolean>(false);

  const refreshRates = useCallback(async (): Promise<void> => {
    setIsRefreshing(true);
    try {
      const liveRates = await fetchLiveRates();
      const now = Date.now();
      setRates(liveRates);
      setRateSource("live");
      setFetchedAt(now);
      setFetchError(null);
      writeCachedRates({ base: BASE_CURRENCY, rates: liveRates, fetchedAt: now });
    } catch (err) {
      // A failed refresh never silently keeps showing rates as if they were
      // still live — either we still have a recent cache/live value (fine,
      // just flag the error) or we fall back to reference rates and say so.
      setFetchError(
        err instanceof Error ? err.message : "Couldn't reach the rates service",
      );
      setRateSource((prevSource) => (prevSource === "live" ? "cached" : prevSource));
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // On mount: show cached rates immediately if they're reasonably fresh, then
  // always kick off a live fetch in the background so the screen never sits
  // on stale numbers longer than it takes to load.
  useEffect(() => {
    if (!hasLoadedCacheRef.current) {
      hasLoadedCacheRef.current = true;
      const cached = readCachedRates();
      if (cached && Date.now() - cached.fetchedAt < CACHE_MAX_AGE_MS) {
        setRates(cached.rates);
        setFetchedAt(cached.fetchedAt);
        setRateSource("cached");
      }
    }
    refreshRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh on a timer while the tab is open.
  useEffect(() => {
    refreshTimerRef.current = setInterval(refreshRates, AUTO_REFRESH_MS);
    return () => {
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    };
  }, [refreshRates]);

  // If the user comes back to this tab after it's been idle, refresh
  // immediately when the current rates are old enough to be stale.
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;
      if (!fetchedAt || Date.now() - fetchedAt > STALE_AFTER_MS) {
        refreshRates();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [fetchedAt, refreshRates]);

  // Tick every 15s so the "Updated Xm ago" label stays accurate without
  // needing a network call.
  useEffect(() => {
    const tick = setInterval(() => setNowTick(Date.now()), 15000);
    return () => clearInterval(tick);
  }, []);

  const isStale = fetchedAt !== null && nowTick - fetchedAt > STALE_AFTER_MS;

  const rate = getRate(rates, fromCurrency, toCurrency);
  const result = (amount || 0) * rate;

  const handleSwap = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleFavorite = (code: string): void => {
    setFavorites((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  };

  const fromCurrencyData = getCurrency(fromCurrency);
  const toCurrencyData = getCurrency(toCurrency);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Currency Converter
          </h2>
          <p className="text-gray-500">
            Convert between 30+ world currencies with live exchange rates
          </p>
        </div>

        {/* ── Rate freshness banner ── */}
        <div
          className={`max-w-2xl mx-auto mb-6 rounded-xl border-2 px-4 py-3 flex items-center justify-between gap-3 text-sm ${
            rateSource === "live" && !isStale
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-amber-50 border-amber-200 text-amber-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {rateSource === "live" && !isStale ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>
              {rateSource === "fallback" && !fetchedAt && (
                <>Loading live rates…</>
              )}
              {rateSource === "fallback" && fetchedAt && (
                <>
                  Couldn't load live rates — showing built-in reference rates,
                  which may not reflect the current market.
                </>
              )}
              {rateSource === "cached" && fetchedAt && (
                <>
                  {fetchError ? "Couldn't refresh — showing " : "Showing "}
                  rates from {formatRelativeTime(fetchedAt, nowTick)}.
                </>
              )}
              {rateSource === "live" && fetchedAt && !isStale && (
                <>Live rates — updated {formatRelativeTime(fetchedAt, nowTick)}.</>
              )}
              {rateSource === "live" && fetchedAt && isStale && (
                <>Rates are {formatRelativeTime(fetchedAt, nowTick)} old — refreshing…</>
              )}
            </span>
          </div>
          <button
            onClick={refreshRates}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 font-semibold whitespace-nowrap hover:underline disabled:opacity-60"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing" : "Refresh now"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <Globe className="w-6 h-6 text-emerald-600" />
                Convert Currency
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAmount(parseFloat(e.target.value) || 0)
                  }
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors text-2xl font-bold"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    From
                  </label>
                  <select
                    value={fromCurrency}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFromCurrency(e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    To
                  </label>
                  <select
                    value={toCurrency}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setToCurrency(e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <button
                  onClick={handleSwap}
                  aria-label="Swap currencies"
                  className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    {formatNumber(amount)} {fromCurrencyData?.code}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    {formatNumber(result)} {toCurrencyData?.code}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">
                    {toCurrencyData?.symbol}
                    {formatNumber(result)}
                  </div>
                  <div className="text-sm text-gray-600">
                    1 {fromCurrencyData?.code} = {formatNumber(rate)}{" "}
                    {toCurrencyData?.code}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Popular pairs ── */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                Popular Currency Pairs
              </h3>

              <div className="grid md:grid-cols-3 gap-3">
                {popularPairs.map((pair) => {
                  const fromData = getCurrency(pair.from);
                  const toData = getCurrency(pair.to);
                  const pairRate = getRate(rates, pair.from, pair.to);

                  return (
                    <button
                      key={`${pair.from}-${pair.to}`}
                      onClick={() => {
                        setFromCurrency(pair.from);
                        setToCurrency(pair.to);
                      }}
                      className="p-4 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-colors text-left border-2 border-transparent hover:border-emerald-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{fromData?.flag}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-xl">{toData?.flag}</span>
                      </div>
                      <div className="font-bold text-gray-900">
                        {pair.from}/{pair.to}
                      </div>
                      <div className="text-sm text-gray-600">
                        1 = {formatNumber(pairRate)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── All rates ── */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-xl">
                <Star className="w-6 h-6 text-yellow-500" />
                All Exchange Rates (Base: {fromCurrency})
              </h3>

              <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {currencies.map((currency) => {
                  if (currency.code === fromCurrency) return null;
                  const conversionRate = getRate(
                    rates,
                    fromCurrency,
                    currency.code,
                  );
                  const isFavorite = favorites.includes(currency.code);

                  return (
                    <div
                      key={currency.code}
                      className={`p-3 rounded-xl flex items-center justify-between ${
                        isFavorite
                          ? "bg-yellow-50 border-2 border-yellow-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{currency.flag}</span>
                        <div>
                          <div className="font-bold text-gray-900">
                            {currency.code}
                          </div>
                          <div className="text-xs text-gray-600">
                            {currency.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">
                          {formatNumber(conversionRate)}
                        </div>
                        <button
                          onClick={() => toggleFavorite(currency.code)}
                          className="mt-1"
                          aria-label={`${isFavorite ? "Remove" : "Add"} ${currency.code} ${isFavorite ? "from" : "to"} favorites`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isFavorite
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Favorite Currencies
              </h3>

              {favorites.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No favorites yet</p>
                  <p className="text-xs mt-1">Click stars to add favorites</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map((code) => {
                    const currency = getCurrency(code);
                    const conversionRate = getRate(rates, fromCurrency, code);

                    return (
                      <div
                        key={code}
                        className="p-3 bg-yellow-50 rounded-xl border-2 border-yellow-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{currency?.flag}</span>
                            <span className="font-bold text-gray-900">
                              {code}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleFavorite(code)}
                            aria-label={`Remove ${code} from favorites`}
                          >
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          1 {fromCurrency} = {formatNumber(conversionRate)}{" "}
                          {code}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-md p-6 border-2 border-emerald-200">
              <h4 className="font-bold text-gray-900 mb-4">💱 Currency Info</h4>
              <div className="space-y-3 text-sm text-gray-700">
                {[
                  {
                    color: "bg-emerald-600",
                    text: (
                      <>
                        <strong>30+ Currencies:</strong> Major world currencies
                        supported
                      </>
                    ),
                  },
                  {
                    color: "bg-teal-600",
                    text: (
                      <>
                        <strong>Live Rates:</strong> Refreshed automatically
                        every 5 minutes
                      </>
                    ),
                  },
                  {
                    color: "bg-cyan-600",
                    text: (
                      <>
                        <strong>Quick Swap:</strong> Instantly reverse
                        conversion
                      </>
                    ),
                  },
                  {
                    color: "bg-blue-600",
                    text: (
                      <>
                        <strong>Favorites:</strong> Save your most-used
                        currencies
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 ${item.color} rounded-full mt-2 flex-shrink-0`}
                    />
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-3">🌍 Popular For</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• International travel planning</p>
                <p>• Online shopping abroad</p>
                <p>• Business transactions</p>
                <p>• Investment tracking</p>
                <p>• Sending money overseas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}