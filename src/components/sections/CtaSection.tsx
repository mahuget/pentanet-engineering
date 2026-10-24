"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Radio, Zap, Sun, Server } from "lucide-react";

const SECTOR_ICONS = [Radio, Zap, Sun, Server];

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="py-24 lg:py-32 bg-soft-gray dark:bg-graphite overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #102A43 0%, #0a1e30 50%, #171C26 100%)" }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Subtle rings */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full border border-sky/10 -top-48 -right-48"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full border border-teal/5 -bottom-24 -left-24"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />
            {/* Sky radial glow */}
            <div
              className="absolute top-0 right-0 w-96 h-96 opacity-15"
              style={{ background: "radial-gradient(circle at top right, #38BDF8, transparent 65%)" }}
            />
            {/* Floating sector icons */}
            {SECTOR_ICONS.map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
                style={{
                  right: `${12 + i * 7}%`,
                  top: `${20 + (i % 2) * 45}%`,
                }}
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4 + i, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="w-5 h-5 text-sky/50" aria-hidden="true" />
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center max-w-3xl mx-auto">
            {/* Sky accent */}
            <motion.div
              className="flex justify-center mb-5"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="h-0.5 w-12 rounded-full"
                style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
                aria-hidden="true"
              />
            </motion.div>

            <motion.h2
              id="cta-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-3xl lg:text-4xl font-display font-bold text-white mb-4"
            >
              Ready to Start Your Next
              <span className="text-gradient-brand block">Engineering Project?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-white/65 text-lg leading-relaxed mb-10"
            >
              Get in touch with our engineering team. Whether it&apos;s telecom installation, tower erection,
              power systems, solar, or a data center — we deliver end-to-end.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/request-quote" className="btn-sky-glow text-base px-8 py-4">
                Request a Quote
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                <Phone className="w-5 h-5" aria-hidden="true" />
                Contact Us
              </Link>
            </motion.div>

            {/* Sector tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-2 mt-10"
              aria-label="Our sectors"
            >
              {["Telecom", "Tower Erection", "Civil Works", "Power", "Solar", "Data Center"].map((s) => (
                <span key={s} className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
