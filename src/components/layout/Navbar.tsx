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
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // On home page, start transparent; solidify on scroll or always solid on inner pages
  const isTransparent = isHomePage && !isScrolled && !isMobileOpen;

  const navBg = isTransparent
    ? "bg-transparent"
    : "bg-navy/98 dark:bg-graphite/98 backdrop-blur-md shadow-lg";

  const textColor = isTransparent ? "text-white" : "text-white";
  const activeColor = "text-sky";

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-sky focus:text-navy focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          navBg
        )}
      >
        <nav
          aria-label="Main navigation"
          className="section-container"
          ref={dropdownRef}
        >
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Pentanet Engineering PLC — Go to homepage"
              className="flex-shrink-0 focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2 rounded"
            >
              <Logo className="h-10 lg:h-11" variant="white" />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.children ? (
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setOpenDropdown(null);
                      }}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="menu"
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname.startsWith(item.href) && item.href !== "/"
                          ? activeColor
                          : cn(textColor, "hover:text-white hover:bg-white/10")
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                          ? activeColor
                          : cn(textColor, "hover:text-white hover:bg-white/10")
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div
                      role="menu"
                      aria-label={`${item.label} submenu`}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-graphite-surface rounded-2xl shadow-2xl border border-soft-gray dark:border-graphite-light overflow-hidden"
                    >
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className="block px-4 py-3 rounded-xl hover:bg-soft-gray dark:hover:bg-graphite-light transition-colors duration-150 group"
                          >
                            <div className="font-medium text-navy dark:text-cloud text-sm group-hover:text-sky transition-colors">
                              {child.label}
                            </div>
                            {child.description && (
                              <div className="text-xs text-graphite/60 dark:text-cloud/50 mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop right side: phone + theme toggle + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+251000000000"
                className={cn("flex items-center gap-2 text-sm font-medium transition-colors duration-200", textColor, "hover:text-sky")}
                aria-label="Call Pentanet Engineering"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call Us</span>
              </a>

              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                  "hover:bg-white/10",
                  textColor
                )}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4" aria-hidden="true" />
                )}
              </button>

              <Link
                href="/request-quote"
                className="btn-primary text-sm py-2.5 px-5"
              >
                Request Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-sky"
              >
                {isMobileOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className={cn(
            "lg:hidden fixed inset-0 top-[72px] bg-navy dark:bg-graphite z-40 transition-all duration-300 overflow-y-auto",
            isMobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="section-container py-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      aria-expanded={openDropdown === item.label}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-white/90 hover:bg-white/10 hover:text-white font-medium transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-sky/30 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-sm transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3.5 rounded-xl font-medium transition-colors",
                      pathname === item.href
                        ? "text-sky bg-white/5"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-6 pb-4 space-y-3 border-t border-white/10 mt-4">
              <Link href="/request-quote" className="btn-primary w-full justify-center">
                Request a Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-secondary w-full justify-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
