import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { CtaSection } from "@/components/sections/CtaSection";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse the project portfolio of Pentanet Engineering PLC — engineering excellence delivered across Ethiopia and East Africa.",
};

const CATEGORIES = ["All", "Structural", "Civil", "MEP", "Water", "Environmental"];

// Placeholder projects — replaced by Sanity CMS data
const PLACEHOLDER_PROJECTS = [
  { id: "1", title: "Project Title — Placeholder", category: "Structural Engineering", location: "Addis Ababa, Ethiopia", status: "Completed", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", href: "/projects/project-1" },
  { id: "2", title: "Project Title — Placeholder", category: "Civil Engineering", location: "Addis Ababa, Ethiopia", status: "Completed", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", href: "/projects/project-2" },
  { id: "3", title: "Project Title — Placeholder", category: "MEP Engineering", location: "Dire Dawa, Ethiopia", status: "In Progress", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", href: "/projects/project-3" },
  { id: "4", title: "Project Title — Placeholder", category: "Water & Sanitation", location: "Hawassa, Ethiopia", status: "Completed", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80", href: "/projects/project-4" },
  { id: "5", title: "Project Title — Placeholder", category: "Structural Engineering", location: "Bahir Dar, Ethiopia", status: "Planning", image: "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=600&q=80", href: "/projects/project-5" },
  { id: "6", title: "Project Title — Placeholder", category: "Civil Engineering", location: "Mekelle, Ethiopia", status: "In Progress", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80", href: "/projects/project-6" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Project Portfolio"
        description="A selection of engineering projects delivered by Pentanet Engineering PLC across Ethiopia. Real project data will be entered via Sanity CMS."
        breadcrumbs={[{ label: "Projects", href: "/projects" }]}
      />

      {/* Filter bar */}
      <div className="bg-cloud dark:bg-graphite border-b border-soft-gray dark:border-graphite-light sticky top-20 z-30">
        <div className="section-container">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={cat === "All"}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${cat === "All" ? "bg-navy text-white" : "bg-soft-gray dark:bg-graphite-light text-graphite dark:text-cloud hover:bg-sky/10"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <section className="py-20 bg-soft-gray dark:bg-graphite" aria-label="Projects listing">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading eyebrow="Portfolio" title="All Projects" />
            <span className="text-graphite/50 dark:text-cloud/40 text-sm">{PLACEHOLDER_PROJECTS.length} projects</span>
          </div>

          <p className="text-xs text-graphite/40 dark:text-cloud/30 italic mb-8">
            * All projects shown are placeholders. Real portfolio content will be added via Sanity CMS once provided by Pentanet Engineering PLC.
          </p>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
            {PLACEHOLDER_PROJECTS.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  status={project.status}
                  image={project.image}
                  href={project.href}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
