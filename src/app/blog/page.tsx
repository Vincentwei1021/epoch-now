import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Unix Time & Developer Guides | EpochNow",
  description: "Practical guides on Unix timestamps, epoch time, and time handling for developers.",
  alternates: { canonical: "/blog" },
};

const posts = [
  { slug: "what-is-unix-timestamp", title: "What Is a Unix Timestamp? A Developer's Complete Guide", excerpt: "Everything you need to know about Unix timestamps — history, how they work, the Year 2038 problem, and practical examples in every major language.", date: "2026-03-10" },
  { slug: "epoch-time-programming", title: "Working with Epoch Time in JavaScript, Python, and Go", excerpt: "Practical code examples for converting, comparing, and formatting Unix timestamps in the three most popular backend languages.", date: "2026-03-08" },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Blog</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Practical guides on timestamps, epoch time, and time handling.</p>
          <div className="mt-10 space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                <time className="text-xs font-medium text-gray-400">{post.date}</time>
                <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-violet-600 dark:hover:text-violet-400">{post.title}</Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400">Read more →</Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
