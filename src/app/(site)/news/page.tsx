import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimateIn";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "News & Insights",
  description: "Latest news, project updates, technical insights, and company announcements from Pentanet Engineering PLC.",
};

const CATEGORIES = ["All", "Company News", "Project Updates", "Technical Insights", "Industry"];

// Placeholder articles — replaced by Sanity CMS
const PLACEHOLDER_POSTS = [
  {
    id: "1", title: "Article Title — Placeholder", slug: "article-placeholder-1",
    category: "Company News", date: "2024-01-01", readTime: "—",
    excerpt: "Article excerpt placeholder. Real news and insights will be published here once content is entered into the Sanity CMS by Pentanet Engineering PLC staff.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    featured: true,
  },
  {
    id: "2", title: "Article Title — Placeholder", slug: "article-placeholder-2",
    category: "Technical Insights", date: "2024-01-01", readTime: "—",
    excerpt: "Article excerpt placeholder. Technical articles and engineering insights will be published here via the CMS.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    featured: false,
  },
  {
    id: "3", title: "Article Title — Placeholder", slug: "article-placeholder-3",
    category: "Project Updates", date: "2024-01-01", readTime: "—",
    excerpt: "Project update placeholder. News about ongoing and completed projects will appear here.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    featured: false,
  },
  {
    id: "4", title: "Article Title — Placeholder", slug: "article-placeholder-4",
    category: "Industry", date: "2024-01-01", readTime: "—",
    excerpt: "Industry news placeholder. Commentary on the Ethiopian engineering sector and regional developments.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    featured: false,
  },
  {
    id: "5", title: "Article Title — Placeholder", slug: "article-placeholder-5",
    category: "Technical Insights", date: "2024-01-01", readTime: "—",
    excerpt: "Technical insight placeholder. Engineering methodology and best practice articles to be published by the team.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    featured: false,
  },
];

const featured = PLACEHOLDER_POSTS.find((p) => p.featured);
const rest = PLACEHOLDER_POSTS.filter((p) => !p.featured);

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Insights"
        title="Latest Updates"
        description="Company news, project updates, and engineering insights from the Pentanet Engineering PLC team."
        breadcrumbs={[{ label: "News & Insights", href: "/news" }]}
      />

      {/* Category filter */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="section-container">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Filter articles by category">
            {CATEGORIES.map((cat) => (
              <button key={cat} role="tab" aria-selected={cat === "All"}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${cat === "All" ? "bg-navy text-white" : "bg-gray-100 text-graphite hover:bg-navy/10"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20 bg-gray-light">
        <div className="section-container">
          <p className="text-xs text-graphite/40 italic mb-8 text-center">
            * All articles shown are placeholders. Real news and insights will be published via Sanity CMS.
          </p>

          {/* Featured post */}
          {featured && (
            <div className="mb-12">
              <SectionHeading eyebrow="Featured" title="Latest Article" className="mb-6" />
              <Link href={`/news/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
                aria-label={`Read: ${featured.title}`}>
                <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                  <Image src={featured.image} alt={`${featured.title} — placeholder`} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full">{featured.category}</span>
                    <span className="flex items-center gap-1.5 text-graphite/50 text-xs">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" /> {featured.date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-navy mb-3 group-hover:text-gold transition-colors">{featured.title}</h2>
                  <p className="text-graphite/70 leading-relaxed mb-6">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Article grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
            {rest.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/news/${post.slug}`}
                  className="group card-base flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                  aria-label={`Read: ${post.title}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={post.image} alt={`${post.title} — placeholder`} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-gold/10 text-gold text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" aria-hidden="true" /> {post.category}
                      </span>
                      <span className="text-graphite/40 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" /> {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-navy mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
                    <p className="text-graphite/65 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-graphite/40 text-xs flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" /> {post.date}
                      </span>
                      <span className="text-gold text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
