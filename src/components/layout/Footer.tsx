import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const FOOTER_SERVICES = [
  { label: "Telecom Installation", href: "/services/telecom-installation" },
  { label: "Tower Erection", href: "/services/tower-erection" },
  { label: "Telecom CW Construction", href: "/services/telecom-cw-construction" },
  { label: "Power Installation", href: "/services/power-installation" },
  { label: "Solar Installation", href: "/services/solar-installation" },
  { label: "Data Center", href: "/services/data-center" },
];

const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/projects" },
  { label: "Our Team", href: "/team" },
  { label: "Quality & Safety", href: "/quality-safety" },
  { label: "News & Insights", href: "/news" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-navy dark:bg-graphite text-white" aria-label="Site footer">
      {/* CTA band */}
      <div className="bg-graphite dark:bg-graphite-surface border-b border-white/10">
        <div className="section-container py-10 lg:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl lg:text-2xl font-display font-bold text-white">
                Ready to start your next project?
              </h2>
              <p className="text-white/60 mt-1 text-sm">
                Talk to our engineering team about your requirements.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/request-quote" className="btn-primary">
                Request a Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Pentanet Engineering PLC home">
              <Logo className="h-10" variant="white" />
            </Link>
            <p className="mt-4 text-white/55 text-sm leading-relaxed">
              Pentanet Engineering PLC specialises in telecom, tower erection, power, solar, and
              data center infrastructure across Ethiopia and East Africa.
            </p>
            <div className="flex gap-2.5 mt-6" aria-label="Social media links">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Pentanet Engineering on ${label}`}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-sky hover:text-navy transition-all duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">
              Our Sectors
            </h3>
            <ul className="space-y-2.5" role="list">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 hover:text-sky transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-2.5" role="list">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 hover:text-sky transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-5">
              Contact
            </h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky mt-0.5 flex-shrink-0" aria-hidden="true" />
                <address className="not-italic text-sm text-white/55 leading-relaxed">
                  Addis Ababa, Ethiopia
                  <br />
                  <span className="text-white/30 text-xs italic">[Address — to be confirmed]</span>
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky flex-shrink-0" aria-hidden="true" />
                <a href="tel:+251000000000" className="text-sm text-white/55 hover:text-sky transition-colors">
                  +251 000 000 000
                  <span className="text-white/25 text-xs block italic">Placeholder</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@pentanet.com" className="text-sm text-white/55 hover:text-sky transition-colors">
                  info@pentanet.com
                  <span className="text-white/25 text-xs block italic">Placeholder</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
            <p>
              &copy; {currentYear} Pentanet Engineering PLC. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">
                Privacy Policy
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/contact" className="hover:text-white/60 transition-colors">
                Contact
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/sitemap.xml" className="hover:text-white/60 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
