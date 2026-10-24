"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  dark?: boolean;
  className?: string;
}

export function StatCard({ value, label, description, dark = false, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("text-center p-6 rounded-2xl", dark ? "bg-white/5 border border-white/10" : "bg-white shadow-card border border-gray-100", className)}
    >
      <div className={cn("text-4xl font-display font-black mb-2", dark ? "text-gold" : "text-navy")}>{value}</div>
      <div className={cn("font-semibold text-sm uppercase tracking-wide", dark ? "text-white" : "text-graphite")}>{label}</div>
      {description && <p className={cn("text-xs mt-1.5 leading-relaxed", dark ? "text-white/50" : "text-graphite/50")}>{description}</p>}
    </motion.div>
  );
}
