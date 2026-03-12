import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | EpochNow",
  description: "EpochNow privacy policy. All conversions happen in your browser — no data collected.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-400">Last updated: March 10, 2026</p>
          <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Data Stays on Your Device</h2>
            <p>EpochNow is a <strong>100% client-side tool</strong>. All timestamp conversions happen entirely in your web browser using JavaScript. No data is sent to our servers or any third-party service.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">No Data Collection</h2>
            <p>We do not collect, store, transmit, or process any timestamps you convert. We do not use cookies for tracking. We do not require accounts or personal information.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h2>
            <p>We may use privacy-friendly analytics to understand general traffic patterns. These services do not use cookies and do not collect personal information.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Advertising</h2>
            <p>We may display advertisements through Google AdSense or similar ad networks. These services may use cookies to serve relevant ads. You can opt out via <a href="https://adssettings.google.com" className="text-violet-600 dark:text-violet-400 hover:underline" rel="noopener noreferrer" target="_blank">Google Ad Settings</a>.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Local Storage</h2>
            <p>We use browser localStorage solely to remember your theme preference (light/dark mode). This data never leaves your device.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact</h2>
            <p>Questions? Contact us at privacy@toolboxlite.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
