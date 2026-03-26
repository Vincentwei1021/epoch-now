import Header from "@/components/Header";
import EpochConverter from "@/components/EpochConverter";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import DevToolsNav from "@/components/DevToolsNav";
import { faqData } from "@/data/faq";

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EpochNow",
  url: "https://epoch.toolboxlite.com",
  description: "Free online Unix timestamp converter. Convert epoch time to human-readable dates and back. Live clock, multiple timezones, seconds/milliseconds/microseconds support.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question", name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert Unix Timestamps Online",
  description: "Convert Unix epoch timestamps to human-readable dates using EpochNow.",
  step: [
    { "@type": "HowToStep", name: "Enter your timestamp", text: "Type or paste a Unix timestamp into the input field. Select the unit (seconds, milliseconds, or microseconds)." },
    { "@type": "HowToStep", name: "Click Convert", text: "Press the Convert button to see the human-readable date across 14+ timezones." },
    { "@type": "HowToStep", name: "Copy the result", text: "Click Copy next to any timezone result to save it to your clipboard." },
  ],
  tool: { "@type": "HowToTool", name: "EpochNow — Unix Timestamp Converter" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="px-4 pt-12 pb-4 sm:px-6 sm:pt-16 sm:pb-6">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
              ⚡ Real-Time · 14+ Timezones · 100% Private
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Unix Timestamp<br />
              <span className="text-violet-600 dark:text-violet-400">Converter</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              Convert Unix epoch timestamps to human-readable dates and back. Live mode shows the current timestamp ticking in real time. Supports seconds, milliseconds, and microseconds.
            </p>
          </div>
        </section>

        <EpochConverter />

        {/* Features */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Why Developers Use EpochNow
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "🔴", title: "Live Mode", desc: "Watch the current Unix timestamp tick in real time — seconds, milliseconds, and microseconds. Pause anytime. One-click copy for instant use in your code." },
                { icon: "🌍", title: "14+ Timezones", desc: "See your converted date across major timezones worldwide. From New York to Tokyo, London to Sydney — all at a glance with copy buttons." },
                { icon: "🔢", title: "Multi-Precision", desc: "Supports seconds (10 digits), milliseconds (13 digits), and microseconds (16 digits). Automatic detection coming soon." },
                { icon: "🔒", title: "100% Private", desc: "All conversions happen in your browser. No data sent to servers. No tracking, no cookies, no accounts. Just fast, reliable conversion." },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-3 text-3xl">{f.icon}</div>
                  <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section className="px-4 py-12 sm:px-6 sm:py-16 bg-white dark:bg-gray-800">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Notable Unix Timestamps
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 text-left font-semibold text-gray-900 dark:text-white">Event</th>
                    <th className="py-3 text-left font-semibold text-gray-900 dark:text-white">Timestamp</th>
                    <th className="py-3 text-left font-semibold text-gray-900 dark:text-white">Date (UTC)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-300">
                  {[
                    ["Unix Epoch", "0", "Jan 1, 1970 00:00:00"],
                    ["1 Billion", "1,000,000,000", "Sep 9, 2001 01:46:40"],
                    ["Max 32-bit", "2,147,483,647", "Jan 19, 2038 03:14:07"],
                    ["2 Billion", "2,000,000,000", "May 18, 2033 03:33:20"],
                    ["Y2K", "946,684,800", "Jan 1, 2000 00:00:00"],
                  ].map(([event, ts, date]) => (
                    <tr key={event} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3">{event}</td>
                      <td className="py-3 font-mono">{ts}</td>
                      <td className="py-3">{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <FAQ />

        {/* About */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">About EpochNow</h2>
            <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-left sm:text-center">
              <p>
                <strong>EpochNow</strong> is a modern <strong>Unix timestamp converter</strong> built for developers, DevOps engineers, and anyone who works with epoch time. Whether you need to decode a timestamp from a server log, convert a date to Unix time for an API call, or simply check the current epoch — EpochNow does it instantly.
              </p>
              <p>
                The <strong>Live Mode</strong> feature displays the current Unix timestamp in real time, updating every 50 milliseconds. It&apos;s perfect for grabbing the exact current timestamp for testing, debugging, or documentation. Choose between seconds, milliseconds, or microseconds precision.
              </p>
              <p>
                All conversions show results across <strong>14+ major timezones</strong> simultaneously, eliminating the back-and-forth of timezone math. Each result has a one-click copy button. EpochNow runs entirely in your browser — no server calls, no data collection, completely private.
              </p>
            </div>
          </div>
        </section>
        <DevToolsNav currentSlug="epoch-now" />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}
