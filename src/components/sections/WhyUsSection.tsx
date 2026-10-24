"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { SectionHeading } from "@/components/shared/SectionHeading";

const WHY_ITEMS = [
  {
    num: "01",
    title: "Specialised Expertise",
    description:
      "We focus exclusively on telecom, power, solar, and data infrastructure — not generalist work. This specialisation means deeper technical knowledge and better outcomes.",
  },
  {
    num: "02",
    title: "End-to-End Delivery",
    description:
      "From site survey and design through construction and commissioning — one team, full accountability. No interface gaps, no blame games.",
  },
  {
    num: "03",
    title: "Safety First",
    description:
      "Rigorous health and safety standards on every site, every day. Zero-compromise approach to protecting our people, our clients, and the public.",
  },
  {
    num: "04",
    title: "Proven Reliability",
    description:
      "We deliver to programme and budget, with transparent reporting throughout every project. Our reputation is built on consistent, dependable performance.",
  },
];

function WhyItem({
  item,
  index,
}: {
  item: (typeof WHY_ITEMS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="flex gap-5 group"
    >
      {/* Left: number badge + connecting line */}
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)" }}
        >
          <span className="text-white font-display font-black text-xs">{item.num}</span>
        </div>
        {index < WHY_ITEMS.length - 1 && (
          <motion.div
            className="w-px mt-2"
            style={{ background: "linear-gradient(to bottom, #38BDF8, transparent)" }}
            initial={{ height: 0 }}
            animate={isInView ? { height: 56 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="pb-8">
        <h3 className="text-lg font-display font-bold text-navy dark:text-cloud mb-2 group-hover:text-sky transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-graphite/70 dark:text-cloud/60 text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export function WhyUsSection() {
  return (
    <section
      aria-labelledby="why-us-heading"
      className="py-24 lg:py-32 bg-soft-gray dark:bg-graphite-light overflow-hidden"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image column */}
          <AnimateIn direction="right">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Pentanet Engineering team at work on a telecom tower site"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-navy/40 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-4 lg:-right-8 bg-navy dark:bg-graphite-surface text-white rounded-2xl p-5 shadow-2xl z-10"
                aria-hidden="true"
              >
                <div
                  className="text-3xl font-display font-black leading-none"
                  style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  6
                </div>
                <div className="text-[11px] text-white/60 mt-1 uppercase tracking-wider">Sectors</div>
              </motion.div>

              {/* Sky corner accent */}
              <div
                className="absolute -top-4 -left-4 w-20 h-20 border-4 rounded-2xl opacity-40"
                style={{ borderColor: "#38BDF8" }}
                aria-hidden="true"
              />

              {/* Secondary decorative image */}
              <div className="absolute -bottom-4 -left-6 lg:-left-8 w-36 h-28 rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-graphite-surface hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80"
                  alt="Solar installation work"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
            </div>
          </AnimateIn>

          {/* Right: Content column */}
          <div>
            <SectionHeading
              id="why-us-heading"
              eyebrow="Why Choose Us"
              title="The Pentanet Difference"
              description="We combine specialist sector knowledge with end-to-end delivery capability — so you get one team, one contract, and total accountability."
              className="mb-10"
            />

            <div className="space-y-0">
              {WHY_ITEMS.map((item, i) => (
                <WhyItem key={item.num} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
