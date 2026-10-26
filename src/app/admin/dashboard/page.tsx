import type { Metadata } from "next";
import { MessageSquare, FileText, Clock, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStatsChart } from "@/components/admin/AdminStatsChart";
import { isDatabaseConfigured } from "@/lib/db";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  if (!isDatabaseConfigured()) {
    return {
      totalContacts: 0, newContacts: 0,
      totalQuotes: 0, newQuotes: 0,
      recentContacts: [], recentQuotes: [],
      weeklyData: [],
      dbConnected: false,
    };
  }

  try {
    const { prisma } = await import("@/lib/db");

    const [totalContacts, newContacts, totalQuotes, newQuotes, recentContacts, recentQuotes] =
      await Promise.all([
        prisma.contactSubmission.count(),
        prisma.contactSubmission.count({ where: { status: "new" } }),
        prisma.quoteRequest.count(),
        prisma.quoteRequest.count({ where: { status: "new" } }),
        prisma.contactSubmission.findMany({
          take: 5,
          orderBy: { submittedAt: "desc" },
          select: { id: true, name: true, subject: true, status: true, submittedAt: true },
        }),
        prisma.quoteRequest.findMany({
          take: 5,
          orderBy: { submittedAt: "desc" },
          select: { id: true, name: true, projectType: true, status: true, submittedAt: true },
        }),
      ]);

    // Build weekly data for chart (last 7 days)
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    const weeklyData = await Promise.all(
      days.map(async (day) => {
        const start = new Date(day); start.setHours(0,0,0,0);
        const end   = new Date(day); end.setHours(23,59,59,999);
        const [contacts, quotes] = await Promise.all([
          prisma.contactSubmission.count({ where: { submittedAt: { gte: start, lte: end } } }),
          prisma.quoteRequest.count({ where: { submittedAt: { gte: start, lte: end } } }),
        ]);
        return {
          day: day.toLocaleDateString("en-US", { weekday: "short" }),
          contacts,
          quotes,
        };
      })
    );

    return { totalContacts, newContacts, totalQuotes, newQuotes, recentContacts, recentQuotes, weeklyData, dbConnected: true };
  } catch (err) {
    console.error("[admin/dashboard] DB error:", err instanceof Error ? err.message : "unknown");
    return { totalContacts: 0, newContacts: 0, totalQuotes: 0, newQuotes: 0, recentContacts: [], recentQuotes: [], weeklyData: [], dbConnected: false };
  }
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-sky/15 text-sky border-sky/25",
    reviewed: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    responded: "bg-emerald/15 text-emerald border-emerald/25",
    archived: "bg-white/10 text-white/40 border-white/10",
    under_review: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    quoted: "bg-emerald/15 text-emerald border-emerald/25",
    closed: "bg-white/10 text-white/40 border-white/10",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${styles[status] ?? styles.new}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default async function DashboardPage() {
  const stats = await getStats();

  const statCards = [
    { label: "Total Contacts", value: stats.totalContacts, sub: `${stats.newContacts} new`, icon: MessageSquare, color: "text-sky", bg: "bg-sky/10" },
    { label: "Total Quote Requests", value: stats.totalQuotes, sub: `${stats.newQuotes} new`, icon: FileText, color: "text-teal", bg: "bg-teal/10" },
    { label: "Pending Action", value: stats.newContacts + stats.newQuotes, sub: "Need response", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Total Submissions", value: stats.totalContacts + stats.totalQuotes, sub: "All time", icon: TrendingUp, color: "text-emerald", bg: "bg-emerald/10" },
  ];

  return (
    <div className="flex min-h-screen bg-graphite-light">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-graphite border-b border-white/10 px-8 py-5">
          <h1 className="text-xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-0.5">Overview of all enquiries and activity</p>
        </div>

        <div className="p-8 space-y-8">
          {/* DB warning */}
          {!stats.dbConnected && (
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 text-yellow-300 text-sm">
              ⚠ Database not connected — add DATABASE_URL to your environment variables to see real data.
            </div>
          )}

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-graphite rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${card.color}`} aria-hidden="true" />
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-white/20" aria-hidden="true" />
                  </div>
                  <div className={`text-3xl font-display font-black ${card.color}`}>{card.value}</div>
                  <div className="text-white/60 text-sm mt-1">{card.label}</div>
                  <div className="text-white/30 text-xs mt-0.5">{card.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="bg-graphite rounded-2xl p-6 border border-white/10">
            <h2 className="text-white font-semibold mb-1">Submissions — Last 7 Days</h2>
            <p className="text-white/40 text-xs mb-6">Contact enquiries and quote requests per day</p>
            <AdminStatsChart data={stats.weeklyData} />
          </div>

          {/* Recent tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Recent contacts */}
            <div className="bg-graphite rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <h2 className="text-white font-semibold text-sm">Recent Contact Enquiries</h2>
                <Link href="/admin/contacts" className="text-sky text-xs hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {stats.recentContacts.length === 0 ? (
                <div className="px-5 py-8 text-center text-white/30 text-sm">No submissions yet</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {stats.recentContacts.map((c) => (
                    <Link key={c.id} href={`/admin/contacts/${c.id}`}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-white/5 transition-colors">
                      <div>
                        <div className="text-white text-sm font-medium">{c.name}</div>
                        <div className="text-white/40 text-xs mt-0.5">{c.subject}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={c.status} />
                        <span className="text-white/25 text-xs">{new Date(c.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recent quotes */}
            <div className="bg-graphite rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <h2 className="text-white font-semibold text-sm">Recent Quote Requests</h2>
                <Link href="/admin/quotes" className="text-sky text-xs hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {stats.recentQuotes.length === 0 ? (
                <div className="px-5 py-8 text-center text-white/30 text-sm">No requests yet</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {stats.recentQuotes.map((q) => (
                    <Link key={q.id} href={`/admin/quotes/${q.id}`}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-white/5 transition-colors">
                      <div>
                        <div className="text-white text-sm font-medium">{q.name}</div>
                        <div className="text-white/40 text-xs mt-0.5">{q.projectType}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={q.status} />
                        <span className="text-white/25 text-xs">{new Date(q.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
