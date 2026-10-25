import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title, description: `${title} — News and insights from Pentanet Engineering PLC` };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <PageHero eyebrow="News & Insights" title={title}
        description="Article content will be loaded from Sanity CMS once published."
        breadcrumbs={[{ label: "News & Insights", href: "/news" }, { label: title, href: `/news/${slug}` }]}
      />

      <section className="py-24 bg-cloud dark:bg-graphite">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2 space-y-8">
              <AnimateIn>
                <div className="rounded-2xl overflow-hidden aspect-video relative shadow-lg">
                  <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
                    alt={`${title} cover`} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 66vw" />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <span className="bg-sky/10 text-sky text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Tag className="w-3 h-3" aria-hidden="true" /> Category Placeholder
                  </span>
                  <span className="text-graphite/50 dark:text-cloud/40 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" /> Date placeholder
                  </span>
                </div>

                <div className="prose max-w-none text-graphite/80 dark:text-cloud/75">
                  <p>Article body will be rendered from Sanity CMS Portable Text once published by the Pentanet Engineering PLC team.</p>
                  <p className="text-sm italic text-graphite/40 dark:text-cloud/30">* Placeholder content.</p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-soft-gray dark:border-graphite-light">
                  <span className="text-graphite/50 dark:text-cloud/40 text-sm flex items-center gap-2">
                    <Share2 className="w-4 h-4" aria-hidden="true" /> Share
                  </span>
                  {["LinkedIn", "Twitter", "Email"].map((p) => (
                    <button key={p} className="text-xs bg-soft-gray dark:bg-graphite-light hover:bg-sky hover:text-navy px-3 py-1.5 rounded-lg font-medium transition-colors text-graphite dark:text-cloud">
                      {p}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-soft-gray dark:border-graphite-light">
                  <Link href="/news" className="flex items-center gap-2 text-graphite/60 dark:text-cloud/50 hover:text-navy dark:hover:text-sky text-sm font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All Articles
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 text-sky font-medium text-sm transition-colors">
                    Discuss a Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </AnimateIn>
            </article>

            <aside className="space-y-6">
              <AnimateIn direction="left">
                <div className="bg-soft-gray dark:bg-graphite-light rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-navy dark:text-cloud mb-4 text-sm uppercase tracking-wide">Author</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-navy/10 overflow-hidden relative flex-shrink-0">
                      <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                        alt="Author" fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy dark:text-cloud text-sm">Author Name</div>
                      <div className="text-graphite/50 dark:text-cloud/40 text-xs">Author Role — Placeholder</div>
                    </div>
                  </div>
                </div>

                <div className="bg-navy rounded-2xl p-6">
                  <h3 className="font-semibold text-white mb-2">Have a project?</h3>
                  <p className="text-white/60 text-sm mb-4">Talk to our engineering team about your requirements.</p>
                  <Link href="/request-quote" className="btn-primary w-full justify-center text-sm">
                    Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
