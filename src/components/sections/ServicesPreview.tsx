"use client";

import Link from "next/link";
import { ArrowRight, Radio, HardHat, Zap, Sun, Server } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { PENTANET_SERVICES } from "@/lib/constants/services";

const ICON_MAP: Record<string, React.ElementType> = {
  Radio,
  TowerControl: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
      aria-hidden="true"
    >
      <path d="M18 12a6 6 0 0 0-12 0" />
      <path d="M20.94 15A9 9 0 0 0 3.06 15" />
      <line x1="12" y1="12" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  HardHat,
  Zap,
  Sun,
  Server,
};

// Updated icon gradients — sky/teal for main, emerald for solar
const SERVICE_GRADIENTS: Record<string, string> = {
  "telecom-installation":    "from-sky-400 to-sky-600",
  "tower-erection":          "from-teal-400 to-teal-600",
  "telecom-cw-construction": "from-sky-500 to-teal-500",
  "power-installation":      "from-amber-400 to-orange-500",
  "solar-installation":      "from-emerald-400 to-teal-500",
  "data-center":             "from-sky-600 to-teal-700",
};

export function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-preview-heading"
      className="py-24 lg:py-32 bg-cloud dark:bg-graphite"
    >
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionHeading
            id="services-preview-heading"
            eyebrow="Our Sectors"
            title="What We Build & Install"
            description="Six specialised engineering disciplines — delivered end-to-end by one accountable team across Ethiopia and East Africa."
          />
          <Link
            href="/services"
            className="btn-outline-navy flex-shrink-0 self-start lg:self-auto"
            aria-label="View all engineering services"
          >
            All Services
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {PENTANET_SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Server;
            const gradientClass = SERVICE_GRADIENTS[service.slug] ?? "from-sky-400 to-teal-500";
            return (
              <StaggerItem key={service.slug}>
                <div className="group card-base flex flex-col h-full p-7 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-6 h-6 text-white">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-display font-bold text-navy dark:text-cloud mb-3 group-hover:text-sky transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-graphite/70 dark:text-cloud/60 leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>

                  {/* Feature bullets */}
                  <ul className="space-y-1.5 mb-6 flex-1" role="list">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-graphite/60 dark:text-cloud/50">
                        <span
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${gradientClass} flex-shrink-0`}
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sky text-sm font-semibold hover:gap-3 transition-all duration-200"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  {/* Sky/teal bottom border on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                    style={{ background: "linear-gradient(90deg, #38BDF8, #14B8A6)" }}
                    aria-hidden="true"
                  />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
