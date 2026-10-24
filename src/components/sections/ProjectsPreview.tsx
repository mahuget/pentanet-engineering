"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";

const PLACEHOLDER_PROJECTS = [
  {
    id: "1",
    title: "Telecom Tower Installation",
    category: "Tower Erection",
    location: "Addis Ababa, Ethiopia",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    href: "/projects",
    large: true,
  },
  {
    id: "2",
    title: "Solar Power System",
    category: "Solar Installation",
    location: "Oromia Region, Ethiopia",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80",
    href: "/projects",
    large: false,
  },
  {
    id: "3",
    title: "Data Center Fit-Out",
    category: "Data Center",
    location: "Addis Ababa, Ethiopia",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80",
    href: "/projects",
    large: false,
  },
  {
    id: "4",
    title: "Power Distribution Installation",
    category: "Power Installation",
    location: "Hawassa, Ethiopia",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80",
    href: "/projects",
    large: false,
  },
];

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: (typeof PLACEHOLDER_PROJECTS)[0];
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className={large ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
    >
      <Link
        href={project.href}
        className="group block rounded-2xl overflow-hidden bg-white dark:bg-graphite-surface border border-soft-gray dark:border-graphite-light shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full hover:border-sky/40 dark:hover:border-sky/30"
        aria-label={`View project: ${project.title}`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${large ? "aspect-[4/3] lg:aspect-auto lg:h-[340px]" : "aspect-video"}`}>
          <Image
            src={project.image}
            alt={`${project.title} — placeholder project image`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" aria-hidden="true" />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              project.status === "Completed" ? "bg-emerald text-white" :
              project.status === "In Progress" ? "bg-sky text-navy" : "bg-white/20 text-white"
            }`}>
              {project.status}
            </span>
          </div>

          {/* Hover arrow */}
          <div className="absolute top-3 right-3 w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4 text-white" aria-hidden="true" />
          </div>

          {/* Bottom content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-sky text-xs font-semibold uppercase tracking-wide mb-1.5">
              {project.category}
            </p>
            <h3 className="text-white font-display font-bold text-base group-hover:text-sky transition-colors duration-200">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 text-white/50 text-xs mt-2">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {project.location}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsPreview() {
  return (
    <section aria-labelledby="projects-preview-heading" className="py-24 lg:py-32 bg-cloud dark:bg-graphite">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            id="projects-preview-heading"
            eyebrow="Our Work"
            title="Featured Projects"
            description="A selection of telecom, power, solar, and data center projects delivered by Pentanet Engineering PLC. Real portfolio coming soon."
          />
          <Link
            href="/projects"
            className="btn-outline-navy flex-shrink-0 self-start lg:self-auto"
            aria-label="View all projects"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="text-xs text-graphite/35 dark:text-cloud/30 italic mb-8">
          * Placeholder projects — real portfolio to be added via Sanity CMS
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          <ProjectCard project={PLACEHOLDER_PROJECTS[0]} index={0} large />
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {PLACEHOLDER_PROJECTS.slice(1).map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
