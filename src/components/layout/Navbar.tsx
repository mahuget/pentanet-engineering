"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, ArrowRight, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { useTheme } from "@/components/shared/ThemeProvider";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services", description: "View our complete range of engineering services" },
      { label: "Telecom Installation", href: "/services/telecom-installation", description: "Base stations, antennas & network equipment" },
      { label: "Tower Erection", href: "/services/tower-erection", description: "Telecom towers, masts & structures" },
      { label: "Telecom CW Construction", href: "/services/telecom-cw-construction", description: "Civil works for telecom sites" },
      { label: "Power Installation", href: "/services/power-installation", description: "HV/LV power systems & generators" },
      { label: "Solar Installation", href: "/services/solar-installation", description: "Solar PV systems & battery storage" },
      { label: "Data Center", href: "/services/data-center", description: "Data center build & infrastructure" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Quality & Safety", href: "/quality-safety" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const isTransparent = isHomePage && !isScrolled && !isMobileOpen;
  const navBg = isTransparent
    ? "bg-transparent"
    : "bg-navy/98 dark:bg-graphite/98 backdrop-blur-md shadow-lg shadow-black/20";

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-sky focus:text-navy focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold">
        Skip to main content
      </a>

      {/* ── Navbar header ──────────────────────────── */}
      <header role="banner" className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", navBg)}>
        <nav aria-label="Main navigation" className="section-container" ref={dropdownRef}>
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" aria-label="Pentanet Engineering PLC — homepage" className="flex-shrink-0 z-10">
              <Logo className="h-9 lg:h-11" variant="white" />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.children ? (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      onKeyDown={(e) => { if (e.key === "Escape") setOpenDropdown(null); }}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="menu"
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname.startsWith(item.href) && item.href !== "/" ? "text-sky" : "text-white/90 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openDropdown === item.label && "rotate-180")} aria-hidden="true" />
                    </button>
                  ) : (
                    <Link href={item.href} className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "text-sky" : "text-white/90 hover:text-white hover:bg-white/10"
                    )}>
                      {item.label}
                    </Link>
                  )}

                  {/* Desktop dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div role="menu" aria-label={`${item.label} submenu`}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-graphite-surface rounded-2xl shadow-2xl border border-soft-gray dark:border-graphite-light overflow-hidden">
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href} role="menuitem"
                            className="block px-4 py-3 rounded-xl hover:bg-soft-gray dark:hover:bg-graphite-light transition-colors group">
                            <div className="font-medium text-navy dark:text-cloud text-sm group-hover:text-sky">{child.label}</div>
                            {child.description && <div className="text-xs text-graphite/60 dark:text-cloud/50 mt-0.5">{child.description}</div>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-2">
              <a href="tel:+251000000000" className="flex items-center gap-1.5 text-white/80 hover:text-sky text-sm font-medium transition-colors" aria-label="Call Pentanet">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call Us</span>
              </a>
              <button onClick={toggleTheme} aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link href="/request-quote" className="btn-primary text-sm py-2 px-4">
                Request Quote <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="lg:hidden flex items-center gap-1">
              <button onClick={toggleTheme} aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors">
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* ── Mobile menu — OUTSIDE header, full screen overlay ── */}
      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={cn(
          "lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-xs z-50",
          "bg-navy dark:bg-graphite",
          "transform transition-transform duration-300 ease-in-out",
          "overflow-y-auto",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Menu header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Logo className="h-8" variant="white" />
          <button
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    aria-expanded={openDropdown === item.label}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-white font-medium hover:bg-white/10 transition-colors text-left"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 flex-shrink-0", openDropdown === item.label && "rotate-180")} aria-hidden="true" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-4 mt-1 mb-2 space-y-0.5 border-l-2 border-sky/40 pl-3">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          className="block px-3 py-2.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 text-sm transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href}
                  className={cn(
                    "block px-4 py-3.5 rounded-xl font-medium transition-colors text-base",
                    pathname === item.href ? "text-sky bg-white/5 border border-sky/20" : "text-white hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* CTA buttons at bottom */}
        <div className="px-4 pb-8 pt-4 space-y-3 border-t border-white/10">
          <Link href="/request-quote" className="btn-primary w-full justify-center py-3.5" onClick={() => setIsMobileOpen(false)}>
            Request a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn-secondary w-full justify-center py-3.5" onClick={() => setIsMobileOpen(false)}>
            Contact Us
          </Link>
          <a href="tel:+251000000000" className="flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm transition-colors py-2">
            <Phone className="w-4 h-4" aria-hidden="true" />
            +251 000 000 000
          </a>
        </div>
      </div>
    </>
  );
}
