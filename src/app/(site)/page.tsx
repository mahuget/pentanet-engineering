import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { SectorsShowcase } from "@/components/sections/SectorsShowcase";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title:
    "Pentanet Engineering PLC — Telecom, Power, Solar & Data Center Engineering in Ethiopia",
  description:
    "Pentanet Engineering PLC delivers end-to-end telecom installation, tower erection, civil works, power, solar, and data center infrastructure across Ethiopia and East Africa.",
  keywords: [
    "telecom installation Ethiopia",
    "tower erection",
    "telecom civil works",
    "power installation Ethiopia",
    "solar installation Ethiopia",
    "data center Ethiopia",
    "Pentanet Engineering",
  ],
};

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <SectorsShowcase />
      <WhyUsSection />
      <AboutTeaser />
      <ProjectsPreview />
      <CtaSection />
    </main>
  );
}
