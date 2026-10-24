"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PENTANET_SERVICES } from "@/lib/constants/services";

export function SectorsShowcase() {
  return (
    <section
      aria-labelledby="sectors-showcase-heading"
      className="w-full overflow-hidden bg-navy dark:bg-graphite"
    >
      <h2 id="sectors-showcase-heading" className="sr-only">
        Our Engineering Sectors
      </h2>

      {/* Desktop: horizontal accordion panels */}
      <div className="hidden lg:flex h-[520px] w-full">
        {PENTANET_SERVICES.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.6 }}
            className="relative flex-1 group overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:flex-[3]"
          >
            {/* Background image */}
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1280px) 50vw, 16vw"
            />

            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-navy/75 group-hover:bg-navy/40 transition-colors duration-500"
              aria-hidden="true"
            />

            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy/90 to-transparent"
              aria-hidden="true"
            />

            {/* Sky/teal bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <div className="overflow-hidden">
                <h3 className="text-white font-display font-bold text-lg leading-tight mb-3 transition-all duration-500">
                  {service.title}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                  {service.shortDescription}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sky text-xs font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 hover:gap-3"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: stacked cards */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-0">
        {PENTANET_SERVICES.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="relative h-52 overflow-hidden"
          >
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-navy/65" aria-hidden="true" />
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-end p-5">
              <div>
                <h3 className="text-white font-display font-bold text-base">{service.title}</h3>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sky text-xs font-semibold inline-flex items-center gap-1 mt-1.5"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
