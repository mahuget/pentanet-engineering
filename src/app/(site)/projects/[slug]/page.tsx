import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Calendar, Tag, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title, description: `Project details for ${title} — Pentanet Engineering PLC` };
}

const galleryImages = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
];

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <PageHero eyebrow="Projects" title={title}
        description="Full project details will be available once content is entered into the Sanity CMS."
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: title, href: `/projects/${slug}` }]}
      />

      <section className="py-24 bg-cloud dark:bg-graphite">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <AnimateIn>
                <div className="rounded-2xl overflow-hidden aspect-video relative shadow-xl">
                  <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
                    alt={`${title} — placeholder`} fill className="object-cover" priority
                    sizes="(max-width: 1024px) 100vw, 66vw" />
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <SectionHeading eyebrow="Project Overview" title="About This Project" className="mb-5" />
                <p className="text-graphite/75 dark:text-cloud/70 leading-relaxed">
                  Full project description will be loaded from Sanity CMS once project details are provided by Pentanet Engineering PLC.
                </p>
                <p className="text-xs italic text-graphite/35 dark:text-cloud/25 mt-3">* Placeholder page. No real project information is represented here.</p>
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <h3 className="text-xl font-display font-semibold text-navy dark:text-cloud mb-5">Project Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {galleryImages.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                      <Image src={img} alt={`Gallery image ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 50vw, 33vw" />
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            <aside className="space-y-6">
              <AnimateIn direction="left">
                <div className="bg-soft-gray dark:bg-graphite-light rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-navy dark:text-cloud mb-5">Project Details</h3>
                  <dl className="space-y-4">
                    {[
                      { icon: Tag, dt: "Category", dd: "Placeholder — TBC" },
                      { icon: MapPin, dt: "Location", dd: "Ethiopia — TBC" },
                      { icon: Calendar, dt: "Year", dd: "— TBC" },
                      { icon: Tag, dt: "Status", dd: "Placeholder" },
                    ].map(({ icon: Icon, dt, dd }) => (
                      <div key={dt} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 text-sky mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <dt className="text-xs text-graphite/50 dark:text-cloud/40 uppercase tracking-wide font-medium">{dt}</dt>
                          <dd className="text-graphite dark:text-cloud text-sm mt-0.5">{dd}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>

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
