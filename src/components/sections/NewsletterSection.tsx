"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Phase 3: wire to actual email list
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="py-16 bg-graphite dark:bg-graphite-surface"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(56,189,248,0.15)" }}
            >
              <Mail className="w-6 h-6 text-sky" aria-hidden="true" />
            </div>
            <div>
              <h2 id="newsletter-heading" className="text-white font-display font-bold text-lg">
                Stay Updated
              </h2>
              <p className="text-white/50 text-sm">
                Company news and sector updates from Pentanet Engineering PLC.
              </p>
            </div>
          </div>

          {/* Form */}
          {status === "success" ? (
            <div className="flex items-center gap-2 text-teal font-medium">
              <CheckCircle className="w-5 h-5" aria-hidden="true" />
              Thank you — we&apos;ll be in touch.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 w-full md:w-auto"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-sky/50 focus:border-sky/50 transition-all"
              />
              <button
                type="submit"
                className="btn-primary py-2.5 px-5 text-sm flex-shrink-0"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
