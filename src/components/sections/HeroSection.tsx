"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Globe, Layers, CheckCircle2 } from "lucide-react";

const CYCLING_WORDS = ["Telecom", "Power", "Solar", "Towers", "Data"];

const STATS = [
  { icon: Layers, label: "6 Sectors" },
  { icon: Globe, label: "Ethiopia & Beyond" },
  { icon: CheckCircle2, label: "End-to-End Delivery" },
  { icon: Shield, label: "Quality Assured" },
];

// 6 sector icons arranged in a circle around the center
const SECTOR_NODES = [
  { label: "Telecom",    angle: -90  },
  { label: "Towers",     angle: -18  },
  { label: "Civil",      angle:  54  },
  { label: "Power",      angle: 126  },
  { label: "Solar",      angle: 198  },
  { label: "Data",       angle: 270  },
];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="Hero — Pentanet Engineering PLC"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-cloud dark:bg-graphite"
    >
      {/* Light mode: subtle gradient. Dark mode: navy-graphite */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "var(--hero-bg, linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 60%, #dbeafe 100%))",
        }}
        aria-hidden="true"
      />
      <style>{`
        .dark [aria-label="Hero — Pentanet Engineering PLC"] {
          --hero-bg: linear-gradient(135deg, #102A43 0%, #171C26 100%);
        }
        [aria-label="Hero — Pentanet Engineering PLC"] {
          --hero-bg: linear-gradient(135deg, #F8FAFC 0%, #e0f2fe 60%, #ccfbf1 100%);
        }
      `}</style>

      {/* Subtle radial accent — sky blue */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, #38BDF8, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom left, #14B8A6, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="relative z-10 section-container flex-1 flex items-center py-36 lg:py-44">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left: text */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-7"
            >
              <motion.div
                className="h-px bg-gradient-to-r from-sky to-teal"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                aria-hidden="true"
              />
              <span className="text-sky dark:text-sky-light text-xs font-semibold uppercase tracking-widest">
                Pentanet Engineering PLC
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-4xl sm:text-5xl lg:text-display-lg font-display font-bold text-navy dark:text-cloud leading-tight"
            >
              {"Ethiopia's Trusted "}
              <br className="hidden sm:block" />
              <span className="inline-flex flex-col relative">
                <span className="relative inline-block min-w-[10rem] sm:min-w-[13rem]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="text-gradient-brand block"
                    >
                      {CYCLING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>

                  {/* Sky blue animated underline */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
                    animate={{ width: ["0%", "100%"] }}
                    key={`underline-${wordIndex}`}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    aria-hidden="true"
                  />
                </span>
              </span>
              {" Partner"}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-7 text-lg sm:text-xl text-graphite/75 dark:text-cloud/70 max-w-2xl leading-relaxed"
            >
              Pentanet Engineering PLC delivers end-to-end telecom, power, solar, and data center
              infrastructure — from civil works and tower erection to full system commissioning
              across Ethiopia and East Africa.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/services"
                className="btn-primary text-base px-8 py-4"
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center gap-2 border-2 border-navy dark:border-sky text-navy dark:text-sky font-semibold text-base px-8 py-4 rounded-xl hover:bg-navy hover:text-white dark:hover:bg-sky dark:hover:text-graphite active:scale-[0.98] transition-all duration-200"
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>

          {/* Right: network diagram visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-80 h-80">
              {/* Center pentagon logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl"
                  style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)" }}
                >
                  {/* Pentagram mini SVG */}
                  <svg viewBox="0 0 48 48" className="w-14 h-14" fill="none">
                    {/* Point-down pentagon nodes */}
                    {Array.from({ length: 5 }, (_, i) => {
                      const deg = 90 + i * 72;
                      const rad = (deg * Math.PI) / 180;
                      const nx = 24 + 18 * Math.cos(rad);
                      const ny = 24 + 18 * Math.sin(rad);
                      // star lines
                      const nj = (i + 2) % 5;
                      const degj = 90 + nj * 72;
                      const radj = (degj * Math.PI) / 180;
                      const px = 24 + 18 * Math.cos(radj);
                      const py = 24 + 18 * Math.sin(radj);
                      return (
                        <g key={i}>
                          <line x1={nx} y1={ny} x2={px} y2={py} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx={nx} cy={ny} r={i === 0 ? 3 : 2.5}
                            fill={i === 0 ? "#F97316" : "rgba(255,255,255,0.9)"}
                            stroke={i === 0 ? "#EA580C" : "rgba(255,255,255,0.5)"}
                            strokeWidth="0.8" />
                        </g>
                      );
                    })}
                    <circle cx="24" cy="24" r="3.5" fill="rgba(16,42,67,0.8)" />
                  </svg>
                </div>
              </div>

              {/* Orbit ring */}
              <div className="absolute inset-4 rounded-full border border-sky/20 dark:border-sky/15" />
              <div className="absolute inset-0 rounded-full border border-teal/10 dark:border-teal/10" />

              {/* Sector nodes arranged in a circle */}
              {SECTOR_NODES.map(({ label, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const orbR = 130; // orbit radius px from center (160/2 = 80 center)
                const left = 160 + orbR * Math.cos(rad) - 30;
                const top  = 160 + orbR * Math.sin(rad) - 30;
                return (
                  <motion.div
                    key={label}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4 + angle * 0.01, repeat: Infinity, ease: "easeInOut", delay: angle * 0.005 }}
                    className="absolute w-[60px] h-[60px] rounded-xl flex items-center justify-center text-center shadow-card"
                    style={{ left, top, background: "var(--bg-surface, #fff)" }}
                  >
                    <span className="text-[10px] font-bold text-navy dark:text-cloud leading-tight">{label}</span>
                  </motion.div>
                );
              })}

              {/* Connection lines from center to each node */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                {SECTOR_NODES.map(({ angle }, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx2 = 160 + 130 * Math.cos(rad);
                  const cy2 = 160 + 130 * Math.sin(rad);
                  return (
                    <line
                      key={i}
                      x1="160" y1="160"
                      x2={cx2} y2={cy2}
                      stroke="url(#lineGrad)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.4"
                    />
                  );
                })}
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#14B8A6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats Row ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 border-t border-soft-gray dark:border-graphite-light bg-white/70 dark:bg-navy/60 backdrop-blur-sm"
        aria-label="Key capabilities"
      >
        <div className="section-container py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-soft-gray dark:lg:divide-graphite-light">
            {STATS.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 lg:px-8 first:pl-0 last:pr-0"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(20,184,166,0.15))" }}
                >
                  <Icon className="w-4 h-4 text-sky" aria-hidden="true" />
                </div>
                <span className="text-navy dark:text-cloud text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Floating status card ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-28 right-6 lg:right-12 z-20 hidden lg:flex items-center gap-3 bg-white/90 dark:bg-graphite-surface/90 backdrop-blur-md border border-soft-gray dark:border-graphite-light rounded-2xl px-4 py-3 shadow-card"
        aria-hidden="true"
      >
        <div className="relative w-3 h-3 flex-shrink-0">
          <span className="absolute inset-0 rounded-full bg-teal animate-ping opacity-75" />
          <span className="relative w-3 h-3 rounded-full bg-teal block" />
        </div>
        <div>
          <div className="text-navy dark:text-cloud text-xs font-semibold">Trusted Engineering Partner</div>
          <div className="text-graphite/50 dark:text-cloud/40 text-xs">Ethiopia &amp; East Africa</div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-32 lg:bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-navy/30 dark:text-white/30 text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-navy/20 dark:border-white/20 flex items-start justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1.5 rounded-full bg-sky/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
