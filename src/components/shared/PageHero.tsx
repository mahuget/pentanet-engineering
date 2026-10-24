"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

export function PageHero({ eyebrow, title, description, breadcrumbs, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative bg-navy dark:bg-graphite pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden",
        className
      )}
      aria-labelledby="page-hero-title"
    >
      {/* Background geometric pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338BDF8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Sky radial glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle at top right, #38BDF8, transparent 70%)" }}
      />

      <div className="section-container relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 flex-wrap" role="list">
              <li>
                <Link
                  href="/"
                  className="text-white/40 hover:text-sky transition-colors text-sm flex items-center gap-1"
                >
                  <Home className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-white/20" aria-hidden="true" />
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-white/60 text-sm" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-white/40 hover:text-sky transition-colors text-sm"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sky text-xs font-semibold uppercase tracking-widest mb-3"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          id="page-hero-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-display-sm font-display font-bold text-white leading-tight"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          className="mt-4 h-1 w-14 rounded-full origin-left"
          style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
          aria-hidden="true"
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 text-white/65 text-lg max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
