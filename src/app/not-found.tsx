import Link from "next/link";
import type { Metadata } from "next";
import { Home, ArrowRight, Phone, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  const helpfulLinks = [
    { label: "Services", href: "/services", desc: "Explore our engineering disciplines" },
    { label: "Projects", href: "/projects", desc: "View our project portfolio" },
    { label: "About Us", href: "/about", desc: "Learn about Pentanet Engineering" },
    { label: "News", href: "/news", desc: "Latest updates and insights" },
    { label: "Contact Us", href: "/contact", desc: "Get in touch with our team" },
    { label: "Request Quote", href: "/request-quote", desc: "Start a project enquiry" },
  ];

  return (
    <div
      className="min-h-screen bg-navy dark:bg-graphite flex flex-col items-center justify-center relative overflow-hidden"
      aria-labelledby="not-found-heading"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338BDF8' fill-opacity='1'%3E%3Cpath d='M50 50v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-40V6h-2v4h-4v2h4v4h2v-4h4V6h-4zM10 50v-4H8v4H4v2h4v4h2v-4h4v-2h-4zM10 10V6H8v4H4v2h4v4h2v-4h4V6h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Sky radial glows */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[400px] opacity-10"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at top left, #38BDF8, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] opacity-10"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at bottom right, #14B8A6, transparent 70%)" }}
      />

      <div className="relative z-10 section-container py-20 text-center">
        {/* 404 number */}
        <div className="mb-2" aria-hidden="true">
          <span
            className="text-[9rem] sm:text-[12rem] font-display font-black leading-none"
            style={{
              background: "linear-gradient(135deg, #38BDF8 0%, #5eead4 50%, #14B8A6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
        </div>

        <div
          className="h-1 w-16 rounded-full mx-auto mb-8"
          style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
          aria-hidden="true"
        />

        <h1 id="not-found-heading" className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for may have been moved, renamed, or no longer exists. Let&apos;s
          get you back on track.
        </p>

        {/* Primary actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link href="/" className="btn-primary text-base px-7 py-3.5">
            <Home className="w-5 h-5" aria-hidden="true" /> Go to Homepage
          </Link>
          <Link href="/contact" className="btn-secondary text-base px-7 py-3.5">
            <Phone className="w-5 h-5" aria-hidden="true" /> Contact Us
          </Link>
        </div>

        {/* Helpful links grid */}
        <div className="max-w-2xl mx-auto">
          <p className="text-white/40 text-sm mb-5 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" aria-hidden="true" /> Or try one of these pages
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {helpfulLinks.map(({ label, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky/40 rounded-xl p-4 text-left transition-all duration-200"
              >
                <div className="font-semibold text-white group-hover:text-sky transition-colors text-sm flex items-center justify-between">
                  {label}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
                <div className="text-white/40 text-xs mt-1">{desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
