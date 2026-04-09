"use client";
import React, { useState, useEffect } from "react";
import { Globe, MapPin, Server, Search, Copy, CheckCircle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface IpResults {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  continent: string;
  postal: string;
  latitude: string | number;
  longitude: string | number;
  timezone: string;
  isp: string;
  asn: string;
  currency: string;
  languages: string;
}

interface SampleIp {
  label: string;
  ip: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SAMPLE_IPS: SampleIp[] = [
  { label: "Google DNS", ip: "8.8.8.8" },
  { label: "Cloudflare DNS", ip: "1.1.1.1" },
  { label: "OpenDNS", ip: "208.67.222.222" },
];

const UNKNOWN = "Unknown";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function validateIpAddress(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = ip.match(ipv4Regex);
  if (match) {
    return match
      .slice(1)
      .map(Number)
      .every((n) => n >= 0 && n <= 255);
  }
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$/;
  return ipv6Regex.test(ip);
}

function str(value: unknown): string {
  if (value === null || value === undefined || value === "") return UNKNOWN;
  return String(value);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function IpAddressLookupClient() {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [myIp, setMyIp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<IpResults | null>(null);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    fetchMyIp();
  }, []);

  const fetchMyIp = async (): Promise<void> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = (await response.json()) as { ip?: string };
      if (data.ip) setMyIp(data.ip);
    } catch (err) {
      console.error("Failed to fetch IP:", err);
    }
  };

  const lookupIp = async (ip: string): Promise<void> => {
    if (!ip) {
      setError("Please enter an IP address");
      return;
    }
    if (!validateIpAddress(ip)) {
      setError("Invalid IP address format");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = (await response.json()) as Record<string, unknown> & {
        error?: boolean;
        reason?: string;
      };

      if (data.error) {
        setError(
          typeof data.reason === "string"
            ? data.reason
            : "Failed to lookup IP address",
        );
        return;
      }

      setResults({
        ip: str(data.ip),
        city: str(data.city),
        region: str(data.region),
        country: str(data.country_name),
        countryCode: str(data.country_code),
        continent: str(data.continent_code),
        postal: str(data.postal),
        latitude: (data.latitude as string | number) ?? UNKNOWN,
        longitude: (data.longitude as string | number) ?? UNKNOWN,
        timezone: str(data.timezone),
        isp: str(data.org),
        asn: str(data.asn),
        currency: str(data.currency),
        languages: str(data.languages),
      });
    } catch (err) {
      setError("Failed to lookup IP address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = (): void => {
    lookupIp(ipAddress);
  };

  const lookupMyIp = (): void => {
    if (myIp) {
      setIpAddress(myIp);
      lookupIp(myIp);
    }
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasCoords =
    results && results.latitude !== UNKNOWN && results.longitude !== UNKNOWN;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              IP Address Lookup
            </h2>
            <p className="text-gray-600">
              Get information about any IP address
            </p>
          </div>

          {/* Your IP banner */}
          {myIp && (
            <div className="mb-6 bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Your IP Address
                  </div>
                  <div className="font-mono font-bold text-indigo-600">
                    {myIp}
                  </div>
                </div>
                <button
                  onClick={lookupMyIp}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Lookup My IP
                </button>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IP Address
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={ipAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIpAddress(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") handleLookup();
                  }}
                  placeholder="Enter IP address (e.g., 8.8.8.8)"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                />
                <button
                  onClick={handleLookup}
                  disabled={loading}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Looking up…
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Lookup
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample IPs
              </label>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_IPS.map((sample) => (
                  <button
                    key={sample.ip}
                    onClick={() => {
                      setIpAddress(sample.ip);
                      lookupIp(sample.ip);
                    }}
                    className="px-3 py-2 bg-gray-100 hover:bg-indigo-100 border border-gray-200 hover:border-indigo-300 rounded-lg text-sm transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900">
                      {sample.label}
                    </div>
                    <div className="font-mono text-xs text-gray-600">
                      {sample.ip}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">
                    IP Information
                  </h3>
                  <button
                    onClick={() => copyToClipboard(results.ip)}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy IP
                      </>
                    )}
                  </button>
                </div>

                {/* IP display */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-1">IP Address</div>
                  <div className="text-2xl font-bold text-indigo-600 font-mono">
                    {results.ip}
                  </div>
                </div>

                {/* Info cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Location */}
                  <InfoCard
                    icon={<MapPin className="w-5 h-5 text-indigo-600" />}
                    title="Location"
                    rows={[
                      { label: "City", value: results.city },
                      { label: "Region", value: results.region },
                      {
                        label: "Country",
                        value: `${results.country} (${results.countryCode})`,
                      },
                      { label: "Postal Code", value: results.postal },
                      { label: "Continent", value: results.continent },
                    ]}
                  />

                  {/* Coordinates */}
                  <InfoCard
                    icon={<Globe className="w-5 h-5 text-indigo-600" />}
                    title="Coordinates"
                    rows={[
                      {
                        label: "Latitude",
                        value: String(results.latitude),
                        mono: true,
                      },
                      {
                        label: "Longitude",
                        value: String(results.longitude),
                        mono: true,
                      },
                      { label: "Timezone", value: results.timezone },
                      { label: "Currency", value: results.currency },
                      { label: "Languages", value: results.languages },
                    ]}
                  />

                  {/* Network */}
                  <div className="bg-white rounded-lg p-4 md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Server className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-semibold text-gray-900">
                        Network Information
                      </h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          ISP / Organization:
                        </span>
                        <span className="font-semibold text-gray-900 text-right">
                          {results.isp}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ASN:</span>
                        <span className="font-mono font-semibold text-gray-900">
                          {results.asn}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map link */}
              {hasCoords && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Map Location
                  </h4>
                  <a
                    href={`https://www.google.com/maps?q=${results.latitude},${results.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Google Maps
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-800">
              🌐 About IP Lookup:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>IP addresses can reveal approximate geographic location</li>
              <li>This tool supports both IPv4 and IPv6 addresses</li>
              <li>Information includes city, country, ISP, and coordinates</li>
              <li>Data is provided by third-party geolocation services</li>
              <li>
                Location accuracy varies — typically accurate to city level
              </li>
              <li>
                Your IP address is automatically detected when you load the page
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InfoRow {
  label: string;
  value: string;
  mono?: boolean;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  rows: InfoRow[];
}

function InfoCard({ icon, title, rows }: InfoCardProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="space-y-2 text-sm">
        {rows.map(({ label, value, mono }) => (
          <div key={label} className="flex justify-between">
            <span className="text-gray-600">{label}:</span>
            <span
              className={`font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
