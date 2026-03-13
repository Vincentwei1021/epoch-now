import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Working with Epoch Time in JavaScript, Python, and Go",
  description: "Practical code examples for converting, comparing, and formatting Unix timestamps in JavaScript, Python, and Go — the three most popular backend languages.",
  keywords: ["epoch time javascript", "unix timestamp python", "timestamp go", "convert epoch", "date to timestamp"],
  alternates: { canonical: "/blog/epoch-time-programming" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Working with Epoch Time in JavaScript, Python, and Go",
  description: "Practical code examples for converting, comparing, and formatting Unix timestamps in JavaScript, Python, and Go — the three most popular backend languages.",
  datePublished: "2026-03-08",
  dateModified: "2026-03-08",
  author: { "@type": "Organization", name: "EpochNow" },
  publisher: { "@type": "Organization", name: "EpochNow" },
};

export default function EpochTimeProgramming() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">← Back to Blog</Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Working with Epoch Time in JavaScript, Python, and Go
          </h1>
          <time className="text-sm text-gray-400">March 8, 2026</time>

          <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Every developer works with Unix timestamps regularly — parsing API responses, logging events, scheduling tasks, comparing dates. But the syntax varies significantly between languages. This guide provides practical, copy-paste-ready examples for the three languages you&apos;re most likely to encounter in backend and full-stack development: JavaScript, Python, and Go.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">JavaScript: The Millisecond Language</h2>
            <p>
              JavaScript is unique among major languages because <code>Date.now()</code> returns <strong>milliseconds</strong>, not seconds. This catches many developers off guard when interacting with APIs that use second-precision timestamps.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Getting the Current Timestamp</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`// Milliseconds (JavaScript native)
const msTimestamp = Date.now();           // 1710000000000

// Seconds (most APIs expect this)
const secTimestamp = Math.floor(Date.now() / 1000);  // 1710000000

// High-resolution (Node.js only)
const hrTime = process.hrtime.bigint();  // nanoseconds`}</code></pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Converting Timestamp to Date</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`// From seconds (multiply by 1000!)
const date = new Date(1710000000 * 1000);

// From milliseconds (direct)
const date2 = new Date(1710000000000);

// Format as ISO 8601
date.toISOString();  // "2024-03-09T16:00:00.000Z"

// Format in a specific timezone
date.toLocaleString('en-US', {
  timeZone: 'America/New_York',
  dateStyle: 'full',
  timeStyle: 'long'
});
// "Saturday, March 9, 2024 at 11:00:00 AM EST"`}</code></pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Converting Date to Timestamp</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`// From a date string
const ts = Math.floor(new Date('2026-03-10T14:30:00Z').getTime() / 1000);

// From date components (months are 0-indexed!)
const ts2 = Math.floor(new Date(2026, 2, 10, 14, 30).getTime() / 1000);

// Common gotcha: new Date() without 'Z' uses LOCAL timezone
new Date('2026-03-10T14:30:00');   // local timezone ⚠️
new Date('2026-03-10T14:30:00Z');  // UTC ✅`}</code></pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Date Arithmetic</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`// Add 24 hours
const tomorrow = new Date(Date.now() + 86400 * 1000);

// Difference in minutes
const diff = (date2 - date1) / (1000 * 60);

// Start of today (UTC)
const startOfDay = new Date();
startOfDay.setUTCHours(0, 0, 0, 0);`}</code></pre>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Python: Clean and Intuitive</h2>
            <p>
              Python&apos;s <code>time</code> and <code>datetime</code> modules make timestamp handling straightforward. Python uses <strong>seconds with float precision</strong> by default.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Getting the Current Timestamp</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`import time
from datetime import datetime, timezone

# Seconds (float with microsecond precision)
time.time()          # 1710000000.123456

# Seconds (integer)
int(time.time())     # 1710000000

# Using datetime
datetime.now(timezone.utc).timestamp()  # 1710000000.123456`}</code></pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Converting Timestamp to Date</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`from datetime import datetime, timezone

# UTC datetime from timestamp
dt = datetime.fromtimestamp(1710000000, tz=timezone.utc)
# datetime(2024, 3, 9, 16, 0, tzinfo=timezone.utc)

# Format as ISO 8601
dt.isoformat()  # "2024-03-09T16:00:00+00:00"

# Custom format
dt.strftime("%B %d, %Y at %I:%M %p UTC")
# "March 09, 2024 at 04:00 PM UTC"

# ⚠️ NEVER use fromtimestamp() without tz parameter
# It uses local timezone and causes bugs in production!
datetime.fromtimestamp(1710000000)  # Local TZ — BAD ⚠️
datetime.fromtimestamp(1710000000, tz=timezone.utc)  # UTC — GOOD ✅`}</code></pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Converting Date to Timestamp</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`from datetime import datetime, timezone

# From a date string
dt = datetime.fromisoformat("2026-03-10T14:30:00+00:00")
int(dt.timestamp())  # 1773333000

# From components (always specify timezone!)
dt = datetime(2026, 3, 10, 14, 30, tzinfo=timezone.utc)
int(dt.timestamp())  # 1773333000`}</code></pre>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Go: Explicit and Type-Safe</h2>
            <p>
              Go&apos;s <code>time</code> package is well-designed and explicit. It uses a <code>time.Time</code> type that carries timezone information, avoiding common pitfalls. Go&apos;s unique date formatting uses a reference date: <code>Mon Jan 2 15:04:05 MST 2006</code>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Getting the Current Timestamp</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`package main
import "time"

// Seconds
ts := time.Now().Unix()        // int64: 1710000000

// Milliseconds
tsMs := time.Now().UnixMilli() // int64: 1710000000000

// Microseconds
tsUs := time.Now().UnixMicro() // int64: 1710000000000000

// Nanoseconds
tsNs := time.Now().UnixNano()  // int64: 1710000000000000000`}</code></pre>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Converting Timestamp to Date</h3>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`// From seconds
t := time.Unix(1710000000, 0)  // 2024-03-09 16:00:00 +0000 UTC

// From milliseconds
t := time.UnixMilli(1710000000000)

// Format (Go's reference time: Mon Jan 2 15:04:05 MST 2006)
t.Format(time.RFC3339)  // "2024-03-09T16:00:00Z"
t.Format("2006-01-02")  // "2024-03-09"
t.Format("January 2, 2006 at 3:04 PM MST")  // "March 9, 2024 at 4:00 PM UTC"

// Convert to a timezone
loc, _ := time.LoadLocation("America/New_York")
t.In(loc).Format(time.RFC3339)  // "2024-03-09T11:00:00-05:00"`}</code></pre>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Common Gotchas Across Languages</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Seconds vs milliseconds:</strong> JavaScript uses ms, Python uses seconds (float), Go has separate methods. Always check which unit an API expects.</li>
              <li><strong>Timezone-naive dates:</strong> In Python and JavaScript, creating dates without explicit timezone info uses the local timezone of the server — a recipe for bugs in production.</li>
              <li><strong>Integer overflow:</strong> In languages with 32-bit integers, timestamps after 2038 will overflow. Use 64-bit integers (<code>int64</code> in Go, <code>BigInt</code> in JS if needed).</li>
              <li><strong>Floating point precision:</strong> Python&apos;s <code>time.time()</code> returns a float, which loses precision for large timestamps. Use <code>int()</code> or <code>time.time_ns()</code> for exact values.</li>
              <li><strong>Daylight Saving Time:</strong> When converting from a local date string to a timestamp, be aware that some local times are ambiguous (during the DST &quot;fall back&quot; hour) or don&apos;t exist (during the &quot;spring forward&quot; skip).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Conversion Cheat Sheet</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 text-left font-semibold">Task</th>
                    <th className="py-2 text-left font-semibold">JavaScript</th>
                    <th className="py-2 text-left font-semibold">Python</th>
                    <th className="py-2 text-left font-semibold">Go</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-sans">Now (sec)</td>
                    <td className="py-2"><code>Math.floor(Date.now()/1000)</code></td>
                    <td className="py-2"><code>int(time.time())</code></td>
                    <td className="py-2"><code>time.Now().Unix()</code></td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-sans">ts → Date</td>
                    <td className="py-2"><code>new Date(ts*1000)</code></td>
                    <td className="py-2"><code>datetime.fromtimestamp(ts, utc)</code></td>
                    <td className="py-2"><code>time.Unix(ts, 0)</code></td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-sans">Date → ts</td>
                    <td className="py-2"><code>Math.floor(d.getTime()/1000)</code></td>
                    <td className="py-2"><code>int(dt.timestamp())</code></td>
                    <td className="py-2"><code>t.Unix()</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Conclusion</h2>
            <p>
              Working with Unix timestamps is a daily task for backend developers, and the patterns shown here cover 95% of real-world use cases. When you need a quick conversion without opening your IDE, use <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">EpochNow</Link> — it handles seconds, milliseconds, and microseconds across 14+ timezones, all in your browser.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
