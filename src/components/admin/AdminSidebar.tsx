"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageSquare, FileText, LogOut, ExternalLink, Shield } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard",          icon: LayoutDashboard },
  { href: "/admin/contacts",  label: "Contact Enquiries",  icon: MessageSquare   },
  { href: "/admin/quotes",    label: "Quote Requests",     icon: FileText        },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    } catch {
      // Proceed regardless
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-graphite min-h-screen flex flex-col border-r border-white/10">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Logo className="h-8" variant="white" />
        <div className="flex items-center gap-1.5 mt-2">
          <Shield className="w-3 h-3 text-sky" aria-hidden="true" />
          <span className="text-sky text-xs font-semibold uppercase tracking-wider">Admin Portal</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-sky/15 text-sky border border-sky/25"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all"
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          View Website
        </a>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
