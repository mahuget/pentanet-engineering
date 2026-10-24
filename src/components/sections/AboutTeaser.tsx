"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Radio, Zap, Sun, Server, HardHat } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { SectionHeading } from "@/components/shared/SectionHeading";

const SECTOR_PILLS = [
  { icon: Radio,   label: "Telecom",     color: "bg-sky-50   dark:bg-sky-900/30  text-sky-700   dark:text-sky-300  border-sky-100  dark:border-sky-800" },
  { icon: HardHat, label: "Civil Works", color: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800" },
  { icon: Zap,     label: "Power",       color: "bg-teal-50  dark:bg-teal-900/30  text-teal-700  dark:text-teal-300  border-teal-100  dark:border-teal-800" },
  { icon: Sun,     label: "Solar",       color: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800" },
  { icon: Server,  label: "Data Center", color: "bg-sky-50   dark:bg-sky-900/30  text-sky-700   dark:text-sky-300  border-sky-100  dark:border-sky-800" },
];

const COMMITMENTS = [
  "End-to-end delivery — one team, full accountability",
  "Telecom, power, solar & data center specialists",
  "Ethiopian expertise with international standards",
  "Safety-first approach on every site",
];

export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-teaser-heading"
      className="py-24 lg:py-32 bg-soft-gray dark:bg-graphite-light overflow-hidden"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Image Column */}
          <AnimateIn direction="right">
            <div className="relative pl-4 pb-8">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Pentanet Engineering PLC team working on-site"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy/40 to-transparent" aria-hidden="true" />

                {/* Overlay sector pills */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2" aria-hidden="true">
                  {SECTOR_PILLS.map(({ icon: Icon, label, color }) => (
                    <span key={label} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm bg-white/90 dark:bg-graphite/80 ${color}`}>
                      <Icon className="w-3 h-3" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="absolute -bottom-2 -right-2 lg:-right-6 bg-navy dark:bg-graphite-surface text-white rounded-2xl p-5 shadow-2xl"
                aria-hidden="true"
              >
                <div
                  className="text-4xl font-display font-black leading-none"
                  style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  6
                </div>
                <div className="text-white/60 text-xs mt-1 uppercase tracking-widest">Sectors</div>
              </motion.div>

              {/* Sky corner accent */}
              <div
                className="absolute top-0 left-0 w-16 h-16 border-4 rounded-2xl -translate-x-4 -translate-y-4 opacity-50"
                style={{ borderColor: "#38BDF8" }}
                aria-hidden="true"
              />
            </div>
          </AnimateIn>

          {/* Content Column */}
          <AnimateIn direction="left" delay={0.15}>
            <SectionHeading
              id="about-teaser-heading"
              eyebrow="About Pentanet"
              title="Building Ethiopia's Telecom & Energy Infrastructure"
              description="Pentanet Engineering PLC is an engineering company specialising in telecommunications, power, solar, and data center infrastructure — delivering complete projects from civil works through commissioning across Ethiopia and East Africa."
              className="mb-8"
            />

            <ul className="space-y-3 mb-10" role="list">
              {COMMITMENTS.map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(56,189,248,0.15)", border: "1.5px solid rgba(56,189,248,0.4)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky block" aria-hidden="true" />
                  </span>
                  <span className="text-graphite/80 dark:text-cloud/70 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-navy">
                Learn About Us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/services" className="btn-outline-navy">
                Our Sectors
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
