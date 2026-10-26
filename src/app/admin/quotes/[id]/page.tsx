import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStatusUpdater } from "@/components/admin/AdminStatusUpdater";
import { isDatabaseConfigured } from "@/lib/db";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Tag, DollarSign, Clock } from "lucide-react";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Quote #${id.slice(0, 8)}` };
}

async function getQuote(id: string) {
  if (!isDatabaseConfigured()) return null;
  try {
    const { prisma } = await import("@/lib/db");
    return prisma.quoteRequest.findUnique({ where: { id } });
  } catch { return null; }
}

export default async function QuoteDetailPage({ params }: Props) {
  const { id } = await params;
  const quote = await getQuote(id);
  if (!quote) notFound();

  const STATUS_OPTIONS = ["new", "under_review", "quoted", "closed"];

  return (
    <div className="flex min-h-screen bg-graphite-light">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-graphite border-b border-white/10 px-8 py-5">
          <Link href="/admin/quotes" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Quotes
          </Link>
          <h1 className="text-xl font-display font-bold text-white">Quote Request</h1>
          <p className="text-white/40 text-sm mt-0.5">{quote.projectType} — {new Date(quote.submittedAt).toLocaleString()}</p>
        </div>

        <div className="p-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-graphite rounded-2xl border border-white/10 p-6">
                <h2 className="text-white/40 text-xs uppercase tracking-wide mb-4">Project Description</h2>
                <p className="text-white/70 leading-relaxed whitespace-pre-wrap text-sm">{quote.description}</p>
              </div>

              {quote.services && quote.services.length > 0 && (
                <div className="bg-graphite rounded-2xl border border-white/10 p-6">
                  <h2 className="text-white/40 text-xs uppercase tracking-wide mb-4">Services Requested</h2>
                  <div className="flex flex-wrap gap-2">
                    {quote.services.map((s) => (
                      <span key={s} className="bg-sky/10 text-sky border border-sky/20 text-xs px-3 py-1.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-graphite rounded-2xl border border-white/10 p-5">
                <h2 className="text-white/40 text-xs uppercase tracking-wide mb-4">Request Details</h2>
                <div className="space-y-3">
                  {[
                    { icon: Mail, label: "Name", value: quote.name },
                    { icon: Mail, label: "Email", value: quote.email, href: `mailto:${quote.email}` },
                    ...(quote.phone ? [{ icon: Phone, label: "Phone", value: quote.phone, href: `tel:${quote.phone}` }] : []),
                    ...(quote.company ? [{ icon: Tag, label: "Company", value: quote.company }] : []),
                    { icon: Tag, label: "Project Type", value: quote.projectType },
                    ...(quote.projectLocation ? [{ icon: MapPin, label: "Location", value: quote.projectLocation }] : []),
                    ...(quote.budgetRange ? [{ icon: DollarSign, label: "Budget", value: quote.budgetRange }] : []),
                    ...(quote.timeline ? [{ icon: Clock, label: "Timeline", value: quote.timeline }] : []),
                    { icon: Calendar, label: "Submitted", value: new Date(quote.submittedAt).toLocaleString() },
                  ].map(({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-sky/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-sky" />
                      </div>
                      <div>
                        <div className="text-white/40 text-xs">{label}</div>
                        {href ? (
                          <a href={href} className="text-sky text-sm hover:underline">{value}</a>
                        ) : (
                          <div className="text-white text-sm">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-graphite rounded-2xl border border-white/10 p-5">
                <h2 className="text-white/40 text-xs uppercase tracking-wide mb-4">Update Status</h2>
                <AdminStatusUpdater id={quote.id} currentStatus={quote.status} type="quote" options={STATUS_OPTIONS} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
