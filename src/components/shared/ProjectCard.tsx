import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  location: string;
  status: string;
  image: string;
  href: string;
  dark?: boolean;
  className?: string;
}

export function ProjectCard({ title, category, location, status, image, href, dark = false, className }: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-2xl overflow-hidden transition-all duration-300",
        dark
          ? "bg-white/5 border border-white/10 hover:border-gold/40"
          : "bg-white border border-gray-100 shadow-card hover:shadow-card-hover",
        className
      )}
      aria-label={`View project: ${title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={`${title} project image`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={cn("absolute inset-0 transition-colors duration-300", dark ? "bg-navy/30 group-hover:bg-navy/10" : "bg-navy/10 group-hover:bg-navy/5")} aria-hidden="true" />
        <div className="absolute top-3 left-3">
          <span className="bg-gold text-navy text-xs font-semibold px-2.5 py-1 rounded-full">{status}</span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs text-gold font-semibold uppercase tracking-wide mb-2">{category}</p>
        <h3 className={cn("font-display font-semibold text-base mb-3 transition-colors duration-200", dark ? "text-white group-hover:text-gold" : "text-navy group-hover:text-gold")}>
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-1.5 text-xs", dark ? "text-white/50" : "text-graphite/50")}>
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            {location}
          </div>
          <ArrowRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200", dark ? "text-gold" : "text-navy")} aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
