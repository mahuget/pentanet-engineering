import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Radio,
  HardHat,
  Zap,
  Sun,
  Server,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";
import { PENTANET_SERVICES } from "@/lib/constants/services";

interface Props {
  params: { slug: string };
}

const ICON_MAP: Record<string, LucideIcon> = {
  Radio,
  TowerControl: Zap as LucideIcon,
  HardHat,
  Zap,
  Sun,
  Server,
};

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

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Site Survey & Assessment",
    desc: "We begin with a thorough site survey, reviewing existing conditions, access, soil, utilities, and all technical constraints before any design work begins.",
  },
  {
    step: "02",
    title: "Engineering & Design",
    desc: "Our in-house engineers develop all necessary designs — civil, structural, electrical, and telecom — coordinated to eliminate conflicts and reduce programme risk.",
  },
  {
    step: "03",
    title: "Construction & Installation",
    desc: "Experienced, safety-trained field teams execute all works to approved drawings and quality plans, with daily progress reporting and client visibility.",
  },
  {
    step: "04",
    title: "Commissioning & Handover",
    desc: "Full functional testing, system commissioning, and structured handover with complete as-built documentation so you receive a fully operational facility.",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const svc = PENTANET_SERVICES.find((s) => s.slug === params.slug);
  if (!svc) {
    return { title: "Service Not Found" };
  }
  return {
    title: svc.title,
    description: svc.shortDescription,
  };
}

export async function generateStaticParams() {
  return PENTANET_SERVICES.map((svc) => ({ slug: svc.slug }));
}

export default function ServiceDetailPage({ params }: Props) {
  const svc = PENTANET_SERVICES.find((s) => s.slug === params.slug);
  if (!svc) notFound();

  const relatedServices = PENTANET_SERVICES.filter((s) => s.slug !== svc.slug);
  const isTowerControl = svc.icon === "TowerControl";
  const Icon = isTowerControl ? null : (ICON_MAP[svc.icon] ?? Server);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={svc.title}
        description={svc.shortDescription}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: svc.title, href: `/services/${svc.slug}` },
        ]}
      />

      {/* Service overview */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Hero image */}
              <AnimateIn>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/7] shadow-2xl">
                  <Image
                    src={svc.heroImage}
                    alt={`${svc.title} — Pentanet Engineering PLC`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-navy/30 to-transparent"
                    aria-hidden="true"
                  />
                  {/* Icon badge */}
                  <div
                    className={`absolute bottom-5 left-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center shadow-lg`}
                    aria-hidden="true"
                  >
                    {isTowerControl ? (
                      <TowerControlIcon className="w-7 h-7 text-white" />
                    ) : (
                      Icon && <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                    )}
                  </div>
                </div>
              </AnimateIn>

              {/* Full description */}
              <AnimateIn delay={0.1}>
                <h2 className="text-2xl font-display font-bold text-navy mb-4">
                  {svc.title} at Pentanet
                </h2>
                <p className="text-graphite/75 leading-relaxed text-base">{svc.fullDescription}</p>
              </AnimateIn>

              {/* Features */}
              <AnimateIn delay={0.15}>
                <h3 className="text-xl font-display font-bold text-navy mb-5">
                  What&apos;s Included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                  {svc.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 bg-gray-light rounded-xl px-4 py-3.5"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-gold flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-graphite font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>

              {/* Process */}
              <AnimateIn delay={0.2}>
                <h3 className="text-xl font-display font-bold text-navy mb-6">Our Process</h3>
                <div className="space-y-4">
                  {PROCESS_STEPS.map((p) => (
                    <div key={p.step} className="flex gap-4 p-5 bg-gray-light rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                        <span className="text-gold font-display font-black text-xs">{p.step}</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-navy mb-1">{p.title}</h4>
                        <p className="text-sm text-graphite/70 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AnimateIn direction="left">
                {/* Quick contact */}
                <div className="bg-navy rounded-2xl p-6 text-white">
                  <h3 className="font-display font-semibold text-lg mb-3">
                    Discuss This Service
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    Ready to talk about your project? Our engineering team is available to answer
                    your questions and provide a tailored proposal.
                  </p>
                  <Link
                    href="/contact"
                    className="btn-primary w-full justify-center text-sm"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" /> Get in Touch
                  </Link>
                  <Link
                    href="/request-quote"
                    className="btn-secondary w-full justify-center text-sm mt-3"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>

                {/* Related services */}
                <div className="bg-gray-light rounded-2xl p-6">
                  <h3 className="font-display font-bold text-navy mb-4">
                    Other Services
                  </h3>
                  <ul className="space-y-1" role="list">
                    {relatedServices.map((rel) => (
                      <li key={rel.slug}>
                        <Link
                          href={`/services/${rel.slug}`}
                          className="flex items-center justify-between text-sm text-graphite/70 hover:text-gold transition-colors py-2.5 group border-b border-gray-200 last:border-0"
                        >
                          <span>{rel.title}</span>
                          <ArrowRight
                            className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="block mt-4 text-gold text-xs font-semibold hover:underline"
                  >
                    View all services →
                  </Link>
                </div>
              </AnimateIn>
            </aside>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
