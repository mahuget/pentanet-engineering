"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PENTANET_SERVICES } from "@/lib/constants/services";

interface StatItem {
  value: string;
  label: string;
  isNumber: boolean;
  numericValue?: number;
  suffix?: string;
}

const STATS: StatItem[] = [
  {
    value: "6",
    label: "Engineering Sectors",
    isNumber: true,
    numericValue: 6,
  },
  {
    value: "100%",
    label: "Quality Assured",
    isNumber: true,
    numericValue: 100,
    suffix: "%",
  },
  {
    value: "EPC",
    label: "End-to-End Delivery",
    isNumber: false,
  },
  {
    value: "ET",
    label: "Ethiopia & East Africa",
    isNumber: false,
  },
];

const MARQUEE_ITEMS = [
  ...PENTANET_SERVICES.map((s) => s.title),
  ...PENTANET_SERVICES.map((s) => s.title),
];

function CountUp({
  target,
  suffix = "",
  duration = 2000,
  active,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="relative flex flex-col items-center text-center px-8 py-10 group"
    >
      {/* Vertical divider (except last) */}
      {index < STATS.length - 1 && (
        <div
          className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-sky/20 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Sky/teal accent top line */}
      <motion.div
        className="w-8 h-0.5 rounded-full mb-5"
        style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
        initial={{ width: 0 }}
        animate={isInView ? { width: 32 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
        aria-hidden="true"
      />

      {/* Value */}
      <div className="text-5xl lg:text-6xl font-display font-black text-white leading-none tracking-tight">
        {stat.isNumber && stat.numericValue !== undefined ? (
          <CountUp target={stat.numericValue} suffix={stat.suffix} active={isInView} />
        ) : (
          stat.value
        )}
      </div>

      {/* Label */}
      <div className="mt-3 text-white/50 text-sm uppercase tracking-widest font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="py-20 lg:py-28 overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #102A43 0%, #171C26 100%)" }}
    >
      {/* Sky accent line */}
      <div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #38BDF8, transparent)" }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <h2 id="stats-heading" className="sr-only">
          Pentanet Engineering PLC — Key Statistics
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Horizontal divider for mobile */}
          <div
            className="lg:hidden col-span-2 h-px absolute left-0 right-0 opacity-20"
            style={{ top: "50%", background: "linear-gradient(90deg, transparent, #38BDF8, transparent)" }}
            aria-hidden="true"
          />
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Marquee — uses CSS class from globals.css, no style jsx */}
        <div
          className="mt-16 relative overflow-hidden border-t border-white/10 pt-10"
          aria-hidden="true"
        >
          <div className="flex gap-0 whitespace-nowrap animate-marquee">
            {MARQUEE_ITEMS.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 text-white/25 text-sm uppercase tracking-widest font-medium px-8"
              >
                {name}
                <span className="w-1.5 h-1.5 rounded-full bg-sky/40 flex-shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
