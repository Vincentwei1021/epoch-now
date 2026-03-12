import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | EpochNow",
  description: "EpochNow terms of service and conditions of use.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-400">Last updated: March 10, 2026</p>
          <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Acceptance of Terms</h2>
            <p>By using EpochNow, you agree to these Terms of Service. If you do not agree, please do not use the Service.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Description of Service</h2>
            <p>EpochNow provides free, browser-based Unix timestamp conversion tools. All conversions run entirely in your browser.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Use of the Service</h2>
            <p>You may use EpochNow for any lawful purpose. Do not use automated systems to excessively access the Service in a way that degrades performance.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">No Warranty</h2>
            <p>EpochNow is provided &quot;as is&quot; without warranties of any kind. We do not guarantee accuracy for mission-critical applications. Always verify important conversions through multiple methods.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Limitation of Liability</h2>
            <p>In no event shall EpochNow or its operators be liable for any indirect, incidental, special, or consequential damages.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Changes to Terms</h2>
            <p>We may update these terms. Continued use constitutes acceptance of updated terms.</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact</h2>
            <p>Questions? Contact us at legal@toolboxlite.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
