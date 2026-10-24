import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title,
    description: `${title} — News and insights from Pentanet Engineering PLC`,
  };
}

export default function NewsArticlePage({ params }: Props) {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <PageHero
        eyebrow="News & Insights"
        title={title}
        description="Article content will be loaded from Sanity CMS once published by Pentanet Engineering PLC."
        breadcrumbs={[
          { label: "News & Insights", href: "/news" },
          { label: title, href: `/news/${params.slug}` },
        ]}
      />

      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article body */}
            <article className="lg:col-span-2 space-y-8" aria-label="Article content">
              <AnimateIn>
                {/* Cover image */}
                <div className="rounded-2xl overflow-hidden aspect-video relative shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
                    alt={`${title} cover image — placeholder`}
                    fill className="object-cover"
                    priority sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <span className="bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Tag className="w-3 h-3" aria-hidden="true" /> Category Placeholder
                  </span>
                  <span className="text-graphite/50 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" /> Date placeholder
                  </span>
                </div>

                {/* Body content — placeholder for Sanity Portable Text */}
                <div className="prose prose-lg max-w-none text-graphite/80">
                  <p>
                    This article body will be rendered from Sanity CMS Portable Text content once the article is published. The structure is in place and ready to receive real editorial content from the Pentanet Engineering PLC team.
                  </p>
                  <p className="text-sm italic text-graphite/40">
                    * Placeholder content — no real article information is represented here.
                  </p>
                </div>

                {/* Share */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                  <span className="text-graphite/50 text-sm flex items-center gap-2">
                    <Share2 className="w-4 h-4" aria-hidden="true" /> Share this article
                  </span>
                  {["LinkedIn", "Twitter", "Email"].map((platform) => (
                    <button key={platform}
                      className="text-xs bg-gray-100 hover:bg-gold hover:text-navy px-3 py-1.5 rounded-lg font-medium transition-colors"
                      aria-label={`Share on ${platform}`}>
                      {platform}
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <Link href="/news" className="flex items-center gap-2 text-graphite/60 hover:text-navy text-sm font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All Articles
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 text-gold hover:text-gold-dark text-sm font-medium transition-colors">
                    Discuss a Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </AnimateIn>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AnimateIn direction="left">
                {/* Author card */}
                <div className="bg-gray-light rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-navy mb-4 text-sm uppercase tracking-wide">Author</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-navy/10 overflow-hidden relative flex-shrink-0">
                      <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                        alt="Author — placeholder" fill className="object-cover"
                        sizes="48px" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy text-sm">Author Name</div>
                      <div className="text-graphite/50 text-xs">Author Role — Placeholder</div>
                    </div>
                  </div>
                </div>

                {/* More articles */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-semibold text-navy mb-4">More Articles</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Link key={i} href="/news"
                        className="flex gap-3 group hover:bg-gray-light rounded-lg p-2 -mx-2 transition-colors">
                        <div className="w-16 h-12 rounded-lg overflow-hidden relative flex-shrink-0">
                          <Image
                            src={`https://images.unsplash.com/photo-${1486325212027 + i * 1000}-8081e485255e?w=100&q=60`}
                            alt="Article thumbnail — placeholder" fill className="object-cover"
                            sizes="64px" onError={() => {}} />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-navy group-hover:text-gold transition-colors line-clamp-2">
                            Article Title — Placeholder
                          </div>
                          <div className="text-xs text-graphite/40 mt-1">Date placeholder</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/news" className="block mt-4 text-gold text-xs font-semibold hover:underline">
                    View all articles →
                  </Link>
                </div>

                {/* CTA */}
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
