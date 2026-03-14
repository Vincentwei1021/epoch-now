"use client";
import { useState, useEffect, useCallback } from "react";
import CopyButton from "./CopyButton";

const TIMEZONES = [
  "UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Asia/Tokyo", "Asia/Shanghai",
  "Asia/Kolkata", "Asia/Dubai", "Australia/Sydney", "Pacific/Auckland",
];

const TZ_LABELS: Record<string, string> = {
  "UTC": "UTC", "America/New_York": "New York (EST/EDT)", "America/Chicago": "Chicago (CST/CDT)",
  "America/Denver": "Denver (MST/MDT)", "America/Los_Angeles": "Los Angeles (PST/PDT)",
  "Europe/London": "London (GMT/BST)", "Europe/Paris": "Paris (CET/CEST)", "Europe/Berlin": "Berlin (CET/CEST)",
  "Asia/Tokyo": "Tokyo (JST)", "Asia/Shanghai": "Shanghai (CST)", "Asia/Kolkata": "Mumbai (IST)",
  "Asia/Dubai": "Dubai (GST)", "Australia/Sydney": "Sydney (AEST/AEDT)", "Pacific/Auckland": "Auckland (NZST/NZDT)",
};

type Unit = "s" | "ms" | "us";

function formatDateInTz(date: Date, tz: string): string {
  try {
    return date.toLocaleString("en-US", {
      timeZone: tz, weekday: "short", year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
    });
  } catch { return date.toUTCString(); }
}

function toMs(value: number, unit: Unit): number {
  if (unit === "s") return value * 1000;
  if (unit === "us") return value / 1000;
  return value;
}

function fromMs(ms: number, unit: Unit): number {
  if (unit === "s") return Math.floor(ms / 1000);
  if (unit === "us") return ms * 1000;
  return ms;
}

export default function EpochConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [unit, setUnit] = useState<Unit>("s");
  const [selectedTz, setSelectedTz] = useState("UTC");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [result, setResult] = useState<{ date: Date; display: Record<string, string> } | null>(null);
  const [liveMode, setLiveMode] = useState(true);
  const [liveTs, setLiveTs] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  // Client-only mount to avoid hydration mismatch (P3-005)
  useEffect(() => {
    setMounted(true);
    setLiveTs(Date.now());
  }, []);

  // Live mode tick
  useEffect(() => {
    if (!liveMode || !mounted) return;
    const id = setInterval(() => setLiveTs(Date.now()), 50);
    return () => clearInterval(id);
  }, [liveMode, mounted]);

  // Convert timestamp → date
  const convertTimestamp = useCallback(() => {
    if (!timestamp.trim()) { setError("Enter a Unix timestamp"); setResult(null); return; }
    const num = Number(timestamp.trim());
    if (isNaN(num)) { setError("Invalid number"); setResult(null); return; }
    const ms = toMs(num, unit);
    const date = new Date(ms);
    if (isNaN(date.getTime())) { setError("Invalid date"); setResult(null); return; }
    setError("");
    const display: Record<string, string> = {};
    TIMEZONES.forEach(tz => { display[tz] = formatDateInTz(date, tz); });
    setResult({ date, display });
  }, [timestamp, unit]);

  // Convert date → timestamp
  const convertDate = useCallback(() => {
    if (!dateStr) { setError("Pick a date"); setResult(null); return; }
    const full = `${dateStr}T${timeStr || "00:00:00"}`;
    let date: Date;
    if (selectedTz === "UTC") {
      date = new Date(full + "Z");
    } else {
      // Parse in selected timezone
      date = new Date(full);
      // Adjust for timezone — create in user's perspective of that tz
      const utcStr = new Date(full).toLocaleString("en-US", { timeZone: selectedTz });
      const localStr = new Date(full).toLocaleString("en-US");
      const diff = new Date(localStr).getTime() - new Date(utcStr).getTime();
      date = new Date(date.getTime() + diff);
    }
    if (isNaN(date.getTime())) { setError("Invalid date"); setResult(null); return; }
    setError("");
    const ts = fromMs(date.getTime(), unit);
    setTimestamp(String(ts));
    const display: Record<string, string> = {};
    TIMEZONES.forEach(tz => { display[tz] = formatDateInTz(date, tz); });
    setResult({ date, display });
  }, [dateStr, timeStr, selectedTz, unit]);

  const liveSeconds = liveTs ? Math.floor(liveTs / 1000) : 0;
  const liveMillis = liveTs ?? 0;
  const liveMicros = (liveTs ?? 0) * 1000;

  return (
    <section id="converter" className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Live Clock */}
        <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 shadow-sm dark:border-violet-800 dark:from-violet-950/50 dark:to-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">🔴 Live Unix Timestamp</h2>
            <button onClick={() => setLiveMode(!liveMode)} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${liveMode ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"}`}>
              {liveMode ? "⏸ Pause" : "▶ Resume"}
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="min-w-0 rounded-xl bg-white p-4 dark:bg-gray-900">
              <p className="text-xs font-medium text-gray-400 mb-1">Seconds</p>
              <div className="flex items-center gap-2">
                <p suppressHydrationWarning className={`font-mono text-2xl font-bold text-violet-600 dark:text-violet-400 tabular-nums truncate ${liveMode ? "animate-pulse-glow" : ""}`}>{mounted ? liveSeconds : "\u00A0"}</p>
                <CopyButton text={String(liveSeconds)} />
              </div>
            </div>
            <div className="min-w-0 rounded-xl bg-white p-4 dark:bg-gray-900">
              <p className="text-xs font-medium text-gray-400 mb-1">Milliseconds</p>
              <div className="flex items-center gap-2">
                <p suppressHydrationWarning className={`font-mono text-lg font-bold text-violet-600 dark:text-violet-400 tabular-nums truncate ${liveMode ? "animate-pulse-glow" : ""}`}>{mounted ? liveMillis : "\u00A0"}</p>
                <CopyButton text={String(liveMillis)} />
              </div>
            </div>
            <div className="min-w-0 rounded-xl bg-white p-4 dark:bg-gray-900">
              <p className="text-xs font-medium text-gray-400 mb-1">Microseconds</p>
              <div className="flex items-center gap-2">
                <p suppressHydrationWarning className={`font-mono text-sm font-bold text-violet-600 dark:text-violet-400 tabular-nums truncate ${liveMode ? "animate-pulse-glow" : ""}`}>{mounted ? liveMicros : "\u00A0"}</p>
                <CopyButton text={String(liveMicros)} />
              </div>
            </div>
          </div>
          <p suppressHydrationWarning className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            {mounted && liveTs ? formatDateInTz(new Date(liveTs), "UTC") + " (UTC)" : "\u00A0"}
          </p>
        </div>

        {/* Converter Panels */}
        <div className="grid gap-6 lg:grid-cols-2" style={{ minWidth: 0 }}>
          {/* Timestamp → Date */}
          <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">⏱ Timestamp → Date</h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="e.g. 1710000000"
                  className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
                <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                  <option value="s">Seconds</option>
                  <option value="ms">Milliseconds</option>
                  <option value="us">Microseconds</option>
                </select>
              </div>
              <button onClick={convertTimestamp} className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600">
                Convert →
              </button>
              <button onClick={() => { setTimestamp(String(fromMs(Date.now(), unit))); }} className="w-full rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                Use Current Time
              </button>
            </div>
          </div>

          {/* Date → Timestamp */}
          <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">📅 Date → Timestamp</h2>
            <div className="space-y-3">
              <input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
              <input type="time" step="1" value={timeStr} onChange={(e) => setTimeStr(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
              <select value={selectedTz} onChange={(e) => setSelectedTz(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                {TIMEZONES.map(tz => <option key={tz} value={tz}>{TZ_LABELS[tz]}</option>)}
              </select>
              <button onClick={convertDate} className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600">
                Convert →
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
            ❌ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-fade-in">
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">🌍 Result — All Timezones</h2>
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <p className="text-xs text-gray-400">ISO 8601</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{result.date.toISOString()}</p>
                  <CopyButton text={result.date.toISOString()} />
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <p className="text-xs text-gray-400">Unix (seconds)</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{Math.floor(result.date.getTime() / 1000)}</p>
                  <CopyButton text={String(Math.floor(result.date.getTime() / 1000))} />
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <p className="text-xs text-gray-400">Unix (milliseconds)</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{result.date.getTime()}</p>
                  <CopyButton text={String(result.date.getTime())} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {TIMEZONES.map(tz => (
              <div key={tz} className="flex flex-col gap-1 rounded-lg bg-gray-50 px-4 py-2.5 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 shrink-0">{TZ_LABELS[tz]}</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-sm text-gray-800 dark:text-gray-200 truncate">{result.display[tz]}</span>
                    <CopyButton text={result.display[tz]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
