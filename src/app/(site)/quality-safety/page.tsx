import type { Metadata } from "next";
import { Shield, CheckCircle2, Award, AlertTriangle, ClipboardCheck, Users, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem, AnimateIn } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Quality & Safety",
  description: "Pentanet Engineering PLC's commitment to quality management, engineering standards, and workplace safety across all projects.",
};

const qualityPillars = [
  { icon: ClipboardCheck, title: "Quality Management", description: "Structured quality management processes applied at every stage — from design review through to construction oversight and final inspection." },
  { icon: Shield, title: "Safety in Design", description: "Safety is considered at the design stage, not just on site. We identify and eliminate hazards through thoughtful engineering decisions." },
  { icon: Award, title: "Standards Compliance", description: "All engineering outputs comply with applicable Ethiopian and international standards, codes of practice, and regulatory requirements." },
  { icon: Users, title: "Team Competence", description: "Our engineers hold relevant qualifications and maintain continuous professional development to stay current with best practice." },
  { icon: BookOpen, title: "Documentation & Audit", description: "Rigorous documentation, design reviews, and independent checks ensure outputs are reliable, traceable, and audit-ready." },
  { icon: AlertTriangle, title: "Risk Management", description: "Systematic risk identification and mitigation is embedded into our project delivery — protecting clients, contractors, and communities." },
];

const standards = [
  { code: "ISO 9001", name: "Quality Management Systems", note: "Placeholder — certification status to be confirmed" },
  { code: "Ethiopian Building Code", name: "EBCS Standards", note: "Applied to all relevant structural and civil works" },
  { code: "IFC Standards", name: "International Finance Corp. Performance Standards", note: "Placeholder — to be confirmed" },
  { code: "OHSAS / ISO 45001", name: "Occupational Health & Safety", note: "Placeholder — certification status to be confirmed" },
];

export default function QualitySafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Standards"
        title="Quality & Safety"
        description="Our commitment to quality engineering and workplace safety is not a compliance exercise — it is the foundation of everything we deliver."
        breadcrumbs={[{ label: "Quality & Safety", href: "/quality-safety" }]}
      />

      {/* Quality pillars */}
      <section className="py-24 bg-white" aria-labelledby="quality-heading">
        <div className="section-container">
          <SectionHeading
            id="quality-heading"
            eyebrow="Our Approach"
            title="Built-In Quality at Every Stage"
            description="Quality is not a final check — it is designed into our processes from the first day of a project to the last."
            className="mb-16"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {qualityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title}>
                  <div className="group card-base p-7 h-full hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-navy group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-navy group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-navy mb-3">{pillar.title}</h3>
                    <p className="text-sm text-graphite/70 leading-relaxed">{pillar.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Standards & certifications */}
      <section className="py-24 bg-gray-light" aria-labelledby="standards-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimateIn>
              <SectionHeading
                id="standards-heading"
                eyebrow="Standards"
                title="Codes & Certifications"
                description="Our work is aligned with recognised standards and regulatory frameworks applicable to engineering practice in Ethiopia and internationally."
                className="mb-8"
              />
              <p className="text-xs text-graphite/40 italic mb-6">
                * Certification details are placeholders — to be confirmed and updated by Pentanet Engineering PLC.
              </p>
              <div className="space-y-4">
                {standards.map((std) => (
                  <div key={std.code} className="bg-white rounded-xl p-5 shadow-card border-l-4 border-gold flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-gold" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gold uppercase tracking-wide">{std.code}</div>
                      <div className="font-semibold text-navy mt-0.5">{std.name}</div>
                      <div className="text-xs text-graphite/50 mt-1 italic">{std.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            {/* Safety commitments */}
            <AnimateIn direction="left" delay={0.15}>
              <SectionHeading eyebrow="Safety" title="Safety Commitments" className="mb-8" />
              <div className="space-y-4">
                {[
                  { title: "Zero Harm Objective", desc: "Our target is zero harm to workers, clients, and the public on every project." },
                  { title: "Safety in Design", desc: "Hazards are identified and mitigated during the design phase — before work begins on site." },
                  { title: "Construction Phase Support", desc: "We provide safety-conscious technical support during construction to ensure design intent is followed safely." },
                  { title: "Incident Reporting", desc: "All incidents are reported, investigated, and used to improve processes — a learning culture, not a blame culture." },
                  { title: "Regular Safety Audits", desc: "Projects undergo regular safety reviews and audits to maintain standards throughout delivery." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl shadow-card">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                      <p className="text-xs text-graphite/65 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Policy banner */}
      <section className="py-20 bg-navy" aria-labelledby="policy-heading">
        <div className="section-container text-center">
          <AnimateIn>
            <Shield className="w-14 h-14 text-gold mx-auto mb-6" aria-hidden="true" />
            <h2 id="policy-heading" className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">
              Quality & Safety Policy
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto mb-8 leading-relaxed">
              Pentanet Engineering PLC is committed to delivering engineering services that meet the expectations of our clients and the requirements of applicable standards, while protecting the health and safety of all people involved in our work.
            </p>
            <p className="text-white/30 text-xs italic mb-8">
              * Full formal policy statement to be provided and approved by Pentanet Engineering PLC management.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us About Our Standards <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </AnimateIn>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
