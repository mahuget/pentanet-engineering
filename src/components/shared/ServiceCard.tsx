import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  iconColor?: string;
  iconBg?: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, href, iconColor = "text-navy", iconBg = "bg-navy/10", className }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group card-base flex flex-col h-full p-7 hover:-translate-y-1 transition-all duration-300",
        className
      )}
      aria-label={`Learn more about ${title}`}
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110", iconBg)}>
        <Icon className={cn("w-6 h-6", iconColor)} aria-hidden="true" />
      </div>
      <h3 className="text-lg font-display font-semibold text-navy mb-3 group-hover:text-gold transition-colors duration-200">{title}</h3>
      <p className="text-sm text-graphite/70 leading-relaxed flex-1">{description}</p>
      <div className="flex items-center gap-1.5 mt-5 text-gold text-sm font-semibold">
        Learn more
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
      </div>
      <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gold rounded-full transition-all duration-500" aria-hidden="true" />
    </Link>
  );
}
