import type { Metadata } from "next";
import Link from "next/link";
import {
  Radio,
  HardHat,
  Zap,
  Sun,
  Server,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";
import { PENTANET_SERVICES } from "@/lib/constants/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Pentanet Engineering PLC delivers six specialised engineering sectors: telecom installation, tower erection, civil works, power installation, solar installation, and data center construction across Ethiopia and East Africa.",
};

// Map icon strings to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  Radio,
  TowerControl: Zap as LucideIcon, // Fallback — custom TowerControl rendered inline below
  HardHat,
  Zap,
  Sun,
  Server,
};

// Custom TowerControl SVG as a React component
function TowerControlIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 12a6 6 0 0 0-12 0" />
      <path d="M20.94 15A9 9 0 0 0 3.06 15" />
      <line x1="12" y1="12" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

const APPROACH_STEPS = [
  {
    num: "01",
    title: "Site Survey & Assessment",
    desc: "Every project starts with a detailed site survey, technical assessment, and feasibility review to establish a firm baseline for design and planning.",
  },
  {
    num: "02",
    title: "Engineering & Design",
    desc: "Our engineering team develops compliant, optimised designs covering civil, structural, electrical, and telecom requirements — all coordinated by one team.",
  },
  {
    num: "03",
    title: "Construction & Installation",
    desc: "We mobilise experienced, safety-certified teams to execute civil works, installations, and system integration to programme and quality standards.",
  },
  {
    num: "04",
    title: "Commissioning & Handover",
    desc: "Full system testing, commissioning, and structured handover with as-built documentation — so you receive a fully operational, documented facility.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Sectors"
        title="Engineering Services"
        description="Six specialised disciplines — telecom, tower, civil works, power, solar, and data center — delivered end-to-end by one accountable engineering team."
        breadcrumbs={[{ label: "Services", href: "/services" }]}
      />

      {/* Services detail cards */}
      <section className="py-24 bg-cloud dark:bg-graphite" aria-labelledby="services-detail-heading">
        <div className="section-container">
          <SectionHeading
            id="services-detail-heading"
            eyebrow="What We Deliver"
            title="Our Six Engineering Sectors"
            description="From the ground up — civil works, structures, power, and technology — Pentanet covers the full project lifecycle across all six sectors."
            className="mb-16"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.07}>
            {PENTANET_SERVICES.map((svc) => {
              const isTowerControl = svc.icon === "TowerControl";
              const Icon = isTowerControl ? null : (ICON_MAP[svc.icon] ?? Server);
              return (
                <StaggerItem key={svc.slug}>
                  <div className="group card-base p-7 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-start gap-5">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        {isTowerControl ? (
                          <TowerControlIcon className="w-6 h-6 text-white" />
                        ) : (
                          Icon && <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-display font-bold text-navy dark:text-cloud mb-2 group-hover:text-sky transition-colors">
                          {svc.title}
                        </h2>
                        <p className="text-graphite/70 dark:text-cloud/60 text-sm leading-relaxed">
                          {svc.fullDescription}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <ul
                      className="mt-6 pt-5 border-t border-soft-gray dark:border-graphite-light grid grid-cols-2 gap-y-2.5 gap-x-4"
                      role="list"
                    >
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-graphite/60 dark:text-cloud/50">
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-sky flex-shrink-0"
                            aria-hidden="true"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="inline-flex items-center gap-2 text-sky text-sm font-semibold hover:gap-3 transition-all duration-200"
                        aria-label={`Learn more about ${svc.title}`}
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-soft-gray dark:bg-graphite-light" aria-labelledby="approach-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionHeading
              id="approach-heading"
              eyebrow="Our Approach"
              title="How We Deliver Every Project"
              description="A structured, quality-driven process — from initial site survey through to commissioning and handover — applied consistently across all six sectors."
              className="lg:sticky lg:top-32"
            />
            <div className="space-y-5">
              {APPROACH_STEPS.map((step) => (
                <div key={step.num} className="bg-cloud dark:bg-graphite-surface rounded-2xl p-6 shadow-card flex gap-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)" }}>
                    <span className="text-navy font-display font-black text-xs">{step.num}</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-navy dark:text-cloud mb-1.5">{step.title}</h4>
                    <p className="text-sm text-graphite/70 dark:text-cloud/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
