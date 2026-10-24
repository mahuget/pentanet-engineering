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

// Placeholder team structure — no real staff invented
const DEPARTMENTS = [
  { name: "Leadership", placeholder: 2 },
  { name: "Structural Engineering", placeholder: 3 },
  { name: "Civil Engineering", placeholder: 3 },
  { name: "Project Management", placeholder: 2 },
];

const PLACEHOLDER_MEMBER = {
  name: "Team Member",
  role: "Position Title",
  bio: "Professional biography and qualifications to be added once team information is provided by Pentanet Engineering PLC.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
};

const PLACEHOLDER_MEMBERS = [
  { ...PLACEHOLDER_MEMBER, id: "1", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", dept: "Leadership" },
  { ...PLACEHOLDER_MEMBER, id: "2", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", dept: "Leadership" },
  { ...PLACEHOLDER_MEMBER, id: "3", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", dept: "Structural Engineering" },
  { ...PLACEHOLDER_MEMBER, id: "4", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", dept: "Structural Engineering" },
  { ...PLACEHOLDER_MEMBER, id: "5", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", dept: "Civil Engineering" },
  { ...PLACEHOLDER_MEMBER, id: "6", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", dept: "Civil Engineering" },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our People"
        title="Meet the Team"
        description="Pentanet Engineering PLC is powered by experienced engineers, project managers, and technical professionals committed to engineering excellence."
        breadcrumbs={[{ label: "Our Team", href: "/team" }]}
      />

      {/* Disclaimer */}
      <div className="bg-gold/10 border-b border-gold/20">
        <div className="section-container py-3">
          <p className="text-xs text-graphite/60 italic text-center">
            All profiles shown are placeholders. Real team information will be added once provided by Pentanet Engineering PLC. No staff details have been invented.
          </p>
        </div>
      </div>

      {/* Team grid by department */}
      <section className="py-24 bg-white" aria-label="Team members">
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
                          {/* Hover overlay with links */}
                          <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <button className="w-10 h-10 bg-white/20 hover:bg-gold rounded-full flex items-center justify-center text-white hover:text-navy transition-all" aria-label="LinkedIn profile — placeholder">
                              <Linkedin className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button className="w-10 h-10 bg-white/20 hover:bg-gold rounded-full flex items-center justify-center text-white hover:text-navy transition-all" aria-label="Email — placeholder">
                              <Mail className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        {/* Info */}
                        <div className="p-5">
                          <h3 className="font-display font-semibold text-navy">{member.name}</h3>
                          <p className="text-gold text-sm font-medium mt-0.5">{member.role}</p>
                          <p className="text-graphite/60 text-xs mt-3 leading-relaxed line-clamp-3">{member.bio}</p>
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

      {/* Values section */}
      <section className="py-24 bg-gray-light" aria-labelledby="culture-heading">
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
                  <div key={item} className="flex items-center gap-3 text-graphite/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
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
                  { label: "Expert Engineers", value: "—", note: "TBC" },
                  { label: "Years Experience", value: "—", note: "TBC" },
                  { label: "Projects Delivered", value: "—", note: "TBC" },
                  { label: "Disciplines", value: "8+", note: "Engineering disciplines" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-card text-center">
                    <div className="text-3xl font-display font-black text-navy mb-1">{stat.value}</div>
                    <div className="text-sm font-semibold text-graphite">{stat.label}</div>
                    <div className="text-xs text-graphite/40 mt-1 italic">{stat.note}</div>
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
