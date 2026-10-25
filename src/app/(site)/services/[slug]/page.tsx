import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";
import { PENTANET_SERVICES } from "@/lib/constants/services";

interface Props {
  params: Promise<{ slug: string }>;
}

const PROCESS_STEPS = [
  { step: "01", title: "Site Survey & Assessment", desc: "We begin with a thorough site survey, reviewing existing conditions, access, and all technical constraints before any design work begins." },
  { step: "02", title: "Engineering & Design", desc: "Our in-house engineers develop all necessary designs — coordinated to eliminate conflicts and reduce programme risk." },
  { step: "03", title: "Construction & Installation", desc: "Experienced, safety-trained field teams execute all works to approved drawings and quality plans, with daily progress reporting." },
  { step: "04", title: "Commissioning & Handover", desc: "Full functional testing, system commissioning, and structured handover with complete as-built documentation." },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = PENTANET_SERVICES.find((s) => s.slug === slug);
  if (!svc) return { title: "Service Not Found" };
  return { title: svc.title, description: svc.shortDescription };
}

export async function generateStaticParams() {
  return PENTANET_SERVICES.map((svc) => ({ slug: svc.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const svc = PENTANET_SERVICES.find((s) => s.slug === slug);
  if (!svc) notFound();

  const relatedServices = PENTANET_SERVICES.filter((s) => s.slug !== svc.slug);

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

      <section className="py-24 bg-cloud dark:bg-graphite">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/30 to-transparent" aria-hidden="true" />
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <h2 className="text-2xl font-display font-bold text-navy dark:text-cloud mb-4">{svc.title} at Pentanet</h2>
                <p className="text-graphite/75 dark:text-cloud/70 leading-relaxed">{svc.fullDescription}</p>
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <h3 className="text-xl font-display font-bold text-navy dark:text-cloud mb-5">What&apos;s Included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 bg-soft-gray dark:bg-graphite-light rounded-xl px-4 py-3.5">
                      <CheckCircle2 className="w-4 h-4 text-sky flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-graphite dark:text-cloud font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <h3 className="text-xl font-display font-bold text-navy dark:text-cloud mb-6">Our Process</h3>
                <div className="space-y-4">
                  {PROCESS_STEPS.map((p) => (
                    <div key={p.step} className="flex gap-4 p-5 bg-soft-gray dark:bg-graphite-light rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-navy dark:bg-sky flex items-center justify-center flex-shrink-0">
                        <span className="text-sky dark:text-navy font-display font-black text-xs">{p.step}</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-navy dark:text-cloud mb-1">{p.title}</h4>
                        <p className="text-sm text-graphite/70 dark:text-cloud/60 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            <aside className="space-y-6">
              <AnimateIn direction="left">
                <div className="bg-navy rounded-2xl p-6 text-white">
                  <h3 className="font-display font-semibold text-lg mb-3">Discuss This Service</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">Ready to talk about your project? Our team is available to answer your questions.</p>
                  <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                    <Phone className="w-4 h-4" aria-hidden="true" /> Get in Touch
                  </Link>
                  <Link href="/request-quote" className="btn-secondary w-full justify-center text-sm mt-3">
                    Request a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="bg-soft-gray dark:bg-graphite-light rounded-2xl p-6">
                  <h3 className="font-display font-bold text-navy dark:text-cloud mb-4">Other Services</h3>
                  <ul className="space-y-1" role="list">
                    {relatedServices.map((rel) => (
                      <li key={rel.slug}>
                        <Link href={`/services/${rel.slug}`}
                          className="flex items-center justify-between text-sm text-graphite/70 dark:text-cloud/60 hover:text-sky transition-colors py-2.5 group border-b border-gray-200 dark:border-graphite last:border-0">
                          <span>{rel.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
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
