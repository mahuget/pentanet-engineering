"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-widest mb-3",
            isDark ? "text-sky-light" : "text-sky"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-display-sm font-display font-bold leading-tight",
          isDark ? "text-cloud" : "text-navy dark:text-cloud"
        )}
      >
        {title}
      </h2>
      {/* Sky/teal gradient accent line */}
      <div
        className={cn(
          "mt-3 h-1 w-12 rounded-full",
          align === "center" && "mx-auto"
        )}
        style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
        aria-hidden="true"
      />
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            isDark ? "text-cloud/70" : "text-graphite/70 dark:text-cloud/60"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
