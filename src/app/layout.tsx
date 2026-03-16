import FeedbackWidget from "@/components/FeedbackWidget";
import Script from "next/script";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading", weight: ["400","500","600","700","800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://epoch.toolboxlite.com";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter — Epoch to Date Online | EpochNow",
  description: "Convert Unix timestamps to human-readable dates and back. Supports seconds, milliseconds, and microseconds. Live clock, multiple timezones. Free, instant, private.",
  keywords: ["unix timestamp converter", "epoch converter", "unix time", "epoch to date", "timestamp to date", "unix timestamp", "epoch time converter"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Unix Timestamp Converter — Epoch to Date | EpochNow",
    description: "Convert Unix timestamps to dates and back. Live clock, multiple timezones. Free & private.",
    url: siteUrl, siteName: "EpochNow", type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "EpochNow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unix Timestamp Converter | EpochNow",
    description: "Convert Unix epoch timestamps to human-readable dates. Live mode, multi-timezone.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5881105388002876" crossOrigin="anonymous" strategy="afterInteractive" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='dark'||((!t)&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()` }} />
      </head>
      <body className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable} font-sans antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        {children}
        <FeedbackWidget />
      </body>
    </html>
  );
}
