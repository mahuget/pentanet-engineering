import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Target, Eye, Heart, ArrowRight, Users, Award, Globe } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Pentanet Engineering PLC — our history, mission, values, and the principles that guide every project we deliver.",
};

const values = [
  { icon: Target, title: "Precision", description: "Every design decision and technical recommendation is grounded in rigorous analysis and attention to detail." },
  { icon: Award, title: "Quality", description: "We uphold the highest engineering standards on every project, regardless of scope or scale." },
  { icon: Heart, title: "Integrity", description: "Honest advice, transparent processes, and accountable delivery define how we work with clients." },
  { icon: Globe, title: "Sustainability", description: "We design with long-term environmental and social impact in mind — engineering that endures." },
  { icon: Users, title: "Collaboration", description: "We build lasting partnerships with clients, contractors, and communities to achieve shared goals." },
  { icon: Eye, title: "Innovation", description: "We apply current methodologies and emerging technologies to deliver smarter engineering outcomes." },
];

const milestones = [
  { year: "—", event: "Company founded in Addis Ababa, Ethiopia", note: "Placeholder — year to be confirmed" },
  { year: "—", event: "First major infrastructure project completed", note: "Placeholder — milestone to be confirmed" },
  { year: "—", event: "Expanded service portfolio across East Africa", note: "Placeholder — milestone to be confirmed" },
  { year: "—", event: "ISO certification achieved", note: "Placeholder — certification to be confirmed" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Engineering With Purpose"
        description="Pentanet Engineering PLC is a professional engineering firm committed to delivering technically excellent, socially responsible, and lasting infrastructure across Ethiopia and East Africa."
        breadcrumbs={[{ label: "About Us", href: "/about" }]}
      />

      {/* Mission & Vision */}
      <section className="py-24 bg-cloud dark:bg-graphite" aria-labelledby="mission-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn direction="right">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="Engineering team in discussion — placeholder image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-navy dark:bg-graphite-surface rounded-2xl p-6 shadow-2xl text-white" aria-hidden="true">
                  <p
                    className="font-display font-bold text-2xl"
                    style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    Est.
                  </p>
                  <p className="text-white/60 text-xs mt-1 uppercase tracking-widest">Addis Ababa, ET</p>
                </div>
                <div
                  className="absolute -top-4 -left-4 w-20 h-20 border-4 rounded-2xl opacity-30"
                  style={{ borderColor: "#38BDF8" }}
                  aria-hidden="true"
                />
              </div>
            </AnimateIn>

            <AnimateIn direction="left" delay={0.15}>
              <SectionHeading
                eyebrow="Who We Are"
                title="A Trusted Engineering Partner"
                description="Pentanet Engineering PLC brings together experienced engineers and technical professionals dedicated to delivering projects that meet the highest standards of quality, safety, and sustainability."
                className="mb-8"
              />
              <p className="text-graphite/70 dark:text-cloud/60 leading-relaxed mb-6">
                Founded in Addis Ababa, Ethiopia, Pentanet Engineering PLC has grown into a respected engineering firm delivering a comprehensive range of services across multiple disciplines. Our team combines local knowledge with international engineering standards to produce outcomes that stand the test of time.
              </p>
              <p className="text-graphite/40 dark:text-cloud/30 leading-relaxed mb-8 text-sm italic">
                * Company history and statistics to be provided and confirmed by Pentanet Engineering PLC
              </p>
              <Link href="/team" className="btn-navy">
                Meet Our Team <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values cards */}
      <section className="py-24 bg-soft-gray dark:bg-graphite-light" aria-labelledby="mission-heading">
        <div className="section-container">
          <SectionHeading
            id="mission-heading"
            eyebrow="Our Foundation"
            title="Mission, Vision & Values"
            description="The principles that guide every project, every decision, and every relationship at Pentanet Engineering PLC."
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Target,
                label: "Our Mission",
                text: "To deliver engineering solutions of the highest quality that contribute to the sustainable development of Ethiopia and the broader region, while maintaining the trust of every client we serve.",
              },
              {
                icon: Eye,
                label: "Our Vision",
                text: "To be the leading engineering firm in East Africa, recognised for technical excellence, innovation, and a commitment to building infrastructure that improves lives.",
              },
              {
                icon: Heart,
                label: "Our Promise",
                text: "Every project we undertake receives our full expertise, honest counsel, and dedication to outcomes that exceed expectations — regardless of scale.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <AnimateIn key={item.label} direction="up">
                  <div
                    className="bg-cloud dark:bg-graphite-surface rounded-2xl p-8 shadow-card h-full border-t-4"
                    style={{ borderColor: "#38BDF8" }}
                  >
                    <div className="w-12 h-12 bg-navy/10 dark:bg-sky/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-navy dark:text-sky" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-navy dark:text-cloud mb-3">{item.label}</h3>
                    <p className="text-graphite/70 dark:text-cloud/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>

          {/* Values grid */}
          <SectionHeading eyebrow="What Drives Us" title="Core Values" className="mb-10" />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <div className="bg-cloud dark:bg-graphite-surface rounded-xl p-6 shadow-card flex gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(56,189,248,0.12)" }}
                    >
                      <Icon className="w-5 h-5 text-sky" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-navy dark:text-cloud mb-1.5">{v.title}</h4>
                      <p className="text-sm text-graphite/70 dark:text-cloud/60 leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Company timeline */}
      <section className="py-24 bg-navy dark:bg-graphite" aria-labelledby="history-heading">
        <div className="section-container">
          <SectionHeading
            id="history-heading"
            eyebrow="Our Journey"
            title="Company Milestones"
            description="Key moments in the growth of Pentanet Engineering PLC — to be populated with confirmed company history."
            theme="dark"
            className="mb-16"
          />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block" aria-hidden="true" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <AnimateIn key={i} direction="left" delay={i * 0.1}>
                  <div className="flex gap-6 md:gap-10">
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-sm"
                        style={{ background: "rgba(56,189,248,0.1)", border: "2px solid rgba(56,189,248,0.3)", color: "#38BDF8" }}
                      >
                        {m.year}
                      </div>
                    </div>
                    <div className="pt-4">
                      <h4 className="text-white font-semibold mb-1">{m.event}</h4>
                      <p className="text-white/40 text-xs italic">{m.note}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
          <p className="text-white/25 text-xs italic text-center mt-12">All milestones are placeholders — to be confirmed and replaced with real company history</p>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-24 bg-cloud dark:bg-graphite" aria-labelledby="why-heading">
        <div className="section-container">
          <SectionHeading id="why-heading" eyebrow="Why Pentanet" title="What Sets Us Apart" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {[
              "Multidisciplinary engineering expertise under one roof",
              "Rigorous quality management on every project",
              "Local knowledge with international technical standards",
              "Transparent project reporting and communication",
              "Commitment to safety in design and on site",
              "Long-term partnerships focused on your success",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-soft-gray dark:bg-graphite-light rounded-xl px-5 py-4">
                <CheckCircle2 className="w-5 h-5 text-sky flex-shrink-0" aria-hidden="true" />
                <span className="text-graphite dark:text-cloud font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
