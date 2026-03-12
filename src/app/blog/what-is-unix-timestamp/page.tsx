import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What Is a Unix Timestamp? A Developer's Complete Guide",
  description: "Everything developers need to know about Unix timestamps — history, how they work, the Year 2038 problem, and practical examples in every major programming language.",
  alternates: { canonical: "/blog/what-is-unix-timestamp" },
};

export default function WhatIsUnixTimestamp() {
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-sm text-violet-600 dark:text-violet-400 hover:underline">← Back to Blog</Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Is a Unix Timestamp? A Developer&apos;s Complete Guide
          </h1>
          <time className="text-sm text-gray-400">March 10, 2026</time>

          <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              If you&apos;ve ever looked at a database column, a server log, or an API response and seen a mysterious number like <code>1710000000</code>, you&apos;ve encountered a Unix timestamp. Also known as epoch time, POSIX time, or simply &quot;Unix time,&quot; this deceptively simple number is one of the most fundamental concepts in computing.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">The Unix Epoch: Where It All Begins</h2>
            <p>
              A Unix timestamp represents the number of seconds that have elapsed since <strong>January 1, 1970, at 00:00:00 UTC</strong> — a moment known as the Unix Epoch. This date was chosen by the early Unix developers at Bell Labs as a convenient, arbitrary starting point. At that exact moment, the Unix timestamp was <code>0</code>.
            </p>
            <p>
              Right now, the Unix timestamp is a 10-digit number well past 1.7 billion. Every second, it increments by one. It doesn&apos;t care about timezones, daylight saving time, leap years, or calendar reforms. It just counts seconds from that single fixed point in time. This simplicity is precisely what makes it so powerful.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why Unix Timestamps Matter</h2>
            <p>
              Timestamps solve one of the hardest problems in computing: representing time unambiguously. Consider the string &quot;03/04/2026&quot; — is that March 4th or April 3rd? Depends on whether you&apos;re American or European. Now consider <code>1775001600</code> — that&apos;s unambiguous everywhere on Earth. It means exactly one moment in time, period.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Timezone-agnostic:</strong> Unix timestamps are always UTC. No timezone confusion, no DST headaches. Convert to local time only at the display layer.</li>
              <li><strong>Easy to compare:</strong> Is event A before event B? Just compare two numbers. <code>1775001600 &lt; 1775088000</code>. Done.</li>
              <li><strong>Compact storage:</strong> A 32-bit integer (4 bytes) stores a timestamp. A human-readable date string like &quot;2026-03-10T14:30:00.000Z&quot; takes 24 bytes.</li>
              <li><strong>Universal support:</strong> Every programming language, database, and operating system understands Unix timestamps. It&apos;s the lingua franca of time.</li>
              <li><strong>Simple arithmetic:</strong> &quot;What time is it 24 hours from now?&quot; Just add 86400. &quot;How many minutes between two events?&quot; Subtract and divide by 60.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Seconds vs Milliseconds vs Microseconds</h2>
            <p>
              The original Unix timestamp counts <strong>seconds</strong> and is typically a 10-digit number (as of 2026). But many modern systems need finer precision:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Seconds (s):</strong> 10 digits. <code>1710000000</code>. The classic format used by most Unix systems, PHP, Python&apos;s <code>time.time()</code>.</li>
              <li><strong>Milliseconds (ms):</strong> 13 digits. <code>1710000000000</code>. Used by JavaScript (<code>Date.now()</code>), Java (<code>System.currentTimeMillis()</code>), and many modern APIs.</li>
              <li><strong>Microseconds (μs):</strong> 16 digits. <code>1710000000000000</code>. Used by PostgreSQL, some high-frequency trading systems, and scientific applications.</li>
            </ul>
            <p>
              A quick way to identify the format: count the digits. 10 digits = seconds, 13 = milliseconds, 16 = microseconds. Tools like <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">EpochNow</Link> let you convert between all three formats instantly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Getting the Current Unix Timestamp</h2>
            <p>Here&apos;s how to get the current Unix timestamp in the most popular languages:</p>
            <pre className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-sm overflow-x-auto"><code>{`# JavaScript
Math.floor(Date.now() / 1000)   // seconds
Date.now()                       // milliseconds

# Python
import time
int(time.time())                 // seconds

# Go
time.Now().Unix()                // seconds

# Bash
date +%s                         // seconds

# PHP
time()                           // seconds

# Ruby
Time.now.to_i                    // seconds

# SQL (PostgreSQL)
SELECT EXTRACT(EPOCH FROM NOW())::INTEGER;`}</code></pre>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">The Year 2038 Problem</h2>
            <p>
              Many older systems store Unix timestamps as a <strong>signed 32-bit integer</strong>, which has a maximum value of 2,147,483,647. That number corresponds to <strong>Tuesday, January 19, 2038, at 03:14:07 UTC</strong>. One second later, the integer overflows and wraps around to a negative number — representing a date in December 1901.
            </p>
            <p>
              This is often called the &quot;Y2K38 problem&quot; or the &quot;Unix Millennium Bug.&quot; While it sounds alarming, the fix is straightforward: use 64-bit integers instead. Most modern operating systems (Linux, macOS, Windows) have already migrated to 64-bit timestamps, which won&apos;t overflow for approximately 292 billion years. However, embedded systems, legacy databases, and some file formats still use 32-bit timestamps and will need updating before 2038.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Negative Timestamps: Before the Epoch</h2>
            <p>
              Unix timestamps can be negative, representing dates before January 1, 1970. For example, <code>-86400</code> represents December 31, 1969 (one day before the epoch). <code>-2208988800</code> represents January 1, 1900. This is how Unix systems handle historical dates — they simply count seconds backwards from the epoch.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leap Seconds and Unix Time</h2>
            <p>
              One subtlety: Unix time does <em>not</em> account for leap seconds. The UTC timekeeping system occasionally adds a leap second to synchronize with Earth&apos;s irregular rotation, but Unix timestamps simply pretend this doesn&apos;t happen. In practice, most systems handle leap seconds by &quot;smearing&quot; them — slightly adjusting the clock speed over a period of hours so the jump is imperceptible.
            </p>
            <p>
              For the vast majority of applications, this doesn&apos;t matter. If you&apos;re building a satellite navigation system or a particle physics experiment, you&apos;ll need TAI (International Atomic Time) instead. For everything else, Unix timestamps work perfectly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Best Practices for Working with Timestamps</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Store timestamps in UTC.</strong> Always. Convert to local time only when displaying to the user.</li>
              <li><strong>Use 64-bit integers</strong> for new systems. There&apos;s no reason to use 32-bit timestamps in 2026.</li>
              <li><strong>Be explicit about precision.</strong> Document whether your timestamps are in seconds, milliseconds, or microseconds. Name your columns <code>created_at_ms</code> instead of <code>created_at</code> if using milliseconds.</li>
              <li><strong>Use ISO 8601 for human-facing formats.</strong> When timestamps need to be human-readable (APIs, logs, exports), use ISO 8601: <code>2026-03-10T14:30:00Z</code>.</li>
              <li><strong>Test with edge cases.</strong> Test with timestamp <code>0</code>, negative timestamps, the Year 2038 boundary, and very large millisecond timestamps.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Conclusion</h2>
            <p>
              Unix timestamps are elegant in their simplicity: a single number representing an exact moment in time, universally understood by every computer on Earth. Understanding how they work — including their edge cases like the 2038 problem, negative timestamps, and precision variants — is fundamental knowledge for any developer. Bookmark <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">EpochNow</Link> for those moments when you need a quick, reliable conversion.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
