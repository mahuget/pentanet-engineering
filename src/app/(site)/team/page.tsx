import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem, AnimateIn } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the experienced engineering professionals at Pentanet Engineering PLC dedicated to delivering quality projects.",
};

const DEPARTMENTS = [
  { name: "Leadership" },
  { name: "Engineering" },
];

const PLACEHOLDER_MEMBERS = [
  { id: "1", name: "Team Member", role: "Chief Executive Officer", bio: "Profile to be added by Pentanet Engineering PLC.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", dept: "Leadership" },
  { id: "2", name: "Team Member", role: "Technical Director", bio: "Profile to be added by Pentanet Engineering PLC.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", dept: "Leadership" },
  { id: "3", name: "Team Member", role: "Senior Engineer", bio: "Profile to be added by Pentanet Engineering PLC.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", dept: "Engineering" },
  { id: "4", name: "Team Member", role: "Project Manager", bio: "Profile to be added by Pentanet Engineering PLC.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", dept: "Engineering" },
  { id: "5", name: "Team Member", role: "Telecom Engineer", bio: "Profile to be added by Pentanet Engineering PLC.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", dept: "Engineering" },
  { id: "6", name: "Team Member", role: "Power Systems Engineer", bio: "Profile to be added by Pentanet Engineering PLC.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", dept: "Engineering" },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="Meet the Team"
        description="Pentanet Engineering PLC is powered by experienced engineers, project managers, and technical professionals committed to delivering excellence."
        breadcrumbs={[{ label: "Our Team", href: "/team" }]}
      />

      {/* Disclaimer */}
      <div className="bg-sky/5 dark:bg-sky/5 border-b border-sky/20">
        <div className="section-container py-3">
          <p className="text-xs text-graphite/60 dark:text-cloud/50 italic text-center">
            All profiles shown are placeholders. Real team information will be added once provided by Pentanet Engineering PLC.
          </p>
        </div>
      </div>

      {/* Team grid by department */}
      <section className="py-24 bg-cloud dark:bg-graphite" aria-label="Team members">
        <div className="section-container space-y-20">
          {DEPARTMENTS.map((dept) => {
            const members = PLACEHOLDER_MEMBERS.filter((m) => m.dept === dept.name);
            if (members.length === 0) return null;
            return (
              <div key={dept.name}>
                <SectionHeading eyebrow="Department" title={dept.name} className="mb-10" />
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
                  {members.map((member) => (
                    <StaggerItem key={member.id}>
                      <div className="group card-base overflow-hidden">
                        {/* Photo */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={member.image}
                            alt={`${member.name} — placeholder profile photo`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" aria-hidden="true" />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <button
                              className="w-10 h-10 bg-white/20 hover:bg-sky rounded-full flex items-center justify-center text-white hover:text-navy transition-all"
                              aria-label="LinkedIn profile — placeholder"
                            >
                              <Linkedin className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                              className="w-10 h-10 bg-white/20 hover:bg-sky rounded-full flex items-center justify-center text-white hover:text-navy transition-all"
                              aria-label="Email — placeholder"
                            >
                              <Mail className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        {/* Info */}
                        <div className="p-5">
                          <h3 className="font-display font-semibold text-navy dark:text-cloud">{member.name}</h3>
                          <p className="text-sky text-sm font-medium mt-0.5">{member.role}</p>
                          <p className="text-graphite/60 dark:text-cloud/50 text-xs mt-3 leading-relaxed line-clamp-3">{member.bio}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            );
          })}
        </div>
      </section>

      {/* Culture section */}
      <section className="py-24 bg-soft-gray dark:bg-graphite-light" aria-labelledby="culture-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <SectionHeading
                id="culture-heading"
                eyebrow="Our Culture"
                title="People Who Care About Quality"
                description="At Pentanet Engineering PLC, our team is united by a shared commitment to engineering excellence, professional integrity, and delivering outcomes that make a real difference."
              />
              <div className="mt-8 space-y-4">
                {[
                  "Continuous professional development supported",
                  "Multidisciplinary collaboration encouraged",
                  "Safety-first culture across all teams",
                  "Commitment to mentoring the next generation",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-graphite/80 dark:text-cloud/70">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)" }}
                      aria-hidden="true"
                    />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-navy mt-8 inline-flex">
                Learn About Us <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </AnimateIn>

            <AnimateIn direction="left" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Expert Engineers", value: "—", note: "To be confirmed" },
                  { label: "Years Experience", value: "—", note: "To be confirmed" },
                  { label: "Projects Delivered", value: "—", note: "To be confirmed" },
                  { label: "Sectors", value: "6", note: "Engineering disciplines" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-cloud dark:bg-graphite-surface rounded-2xl p-6 shadow-card text-center">
                    <div
                      className="text-3xl font-display font-black mb-1"
                      style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-navy dark:text-cloud">{stat.label}</div>
                    <div className="text-xs text-graphite/40 dark:text-cloud/30 mt-1 italic">{stat.note}</div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
