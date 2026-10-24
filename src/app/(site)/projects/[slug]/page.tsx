import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Calendar, Tag, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title,
    description: `Project details for ${title} — Pentanet Engineering PLC`,
  };
}

// Placeholder gallery images — replaced by Sanity CMS
const galleryImages = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
];

export default function ProjectDetailPage({ params }: Props) {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={title}
        description="Full project details will be available once content is entered into the Sanity CMS."
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: title, href: `/projects/${params.slug}` },
        ]}
      />

      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Hero image */}
              <AnimateIn>
                <div className="rounded-2xl overflow-hidden aspect-video relative shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
                    alt={`${title} — placeholder project image`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-navy/10" aria-hidden="true" />
                </div>
              </AnimateIn>

              {/* Description */}
              <AnimateIn delay={0.1}>
                <SectionHeading eyebrow="Project Overview" title="About This Project" className="mb-5" />
                <div className="prose max-w-none text-graphite/75 leading-relaxed space-y-4">
                  <p>
                    Full project description will be loaded from Sanity CMS once project details are provided by Pentanet Engineering PLC. This placeholder confirms the page structure is in place and ready to receive content.
                  </p>
                  <p className="text-xs italic text-graphite/35">* This is a placeholder page. No real project information is represented here.</p>
                </div>
              </AnimateIn>

              {/* Photo gallery */}
              <AnimateIn delay={0.15}>
                <h3 className="text-xl font-display font-semibold text-navy mb-5">Project Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {galleryImages.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`Project gallery image ${i + 1} — placeholder`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs italic text-graphite/35 mt-2">* Placeholder images — real project photography to be added</p>
              </AnimateIn>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AnimateIn direction="left">
                {/* Project details card */}
                <div className="bg-gray-light rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-navy mb-5">Project Details</h3>
                  <dl className="space-y-4">
                    {[
                      { icon: Tag, dt: "Category", dd: "Placeholder — TBC" },
                      { icon: MapPin, dt: "Location", dd: "Ethiopia — TBC" },
                      { icon: Calendar, dt: "Year", dd: "— TBC" },
                      { icon: Tag, dt: "Status", dd: "Placeholder" },
                    ].map(({ icon: Icon, dt, dd }) => (
                      <div key={dt} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <dt className="text-xs text-graphite/50 uppercase tracking-wide font-medium">{dt}</dt>
                          <dd className="text-graphite text-sm mt-0.5">{dd}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Related services */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-semibold text-navy mb-4">Services Used</h3>
                  <ul className="space-y-2" role="list">
                    {["Structural Engineering", "Civil Engineering"].map((s) => (
                      <li key={s}>
                        <span className="inline-flex items-center gap-2 text-sm text-graphite/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs italic text-graphite/35 mt-3">* Placeholder — to be confirmed</p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-3">
                  <Link href="/projects" className="btn-outline-navy w-full justify-center text-sm">
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All Projects
                  </Link>
                  <Link href="/request-quote" className="btn-primary w-full justify-center text-sm">
                    Start a Similar Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
