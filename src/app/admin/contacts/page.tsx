import type { Metadata } from "next";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { isDatabaseConfigured } from "@/lib/db";
import { ArrowRight, Search } from "lucide-react";

export const metadata: Metadata = { title: "Contact Enquiries" };

const STATUS_COLORS: Record<string, string> = {
  new: "bg-sky/15 text-sky border-sky/25",
  reviewed: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  responded: "bg-emerald/15 text-emerald border-emerald/25",
  archived: "bg-white/10 text-white/40 border-white/10",
};

async function getContacts() {
  if (!isDatabaseConfigured()) return [];
  try {
    const { prisma } = await import("@/lib/db");
    return prisma.contactSubmission.findMany({
      orderBy: { submittedAt: "desc" },
      select: { id: true, name: true, email: true, subject: true, status: true, submittedAt: true },
    });
  } catch { return []; }
}

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="flex min-h-screen bg-graphite-light">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-graphite border-b border-white/10 px-8 py-5">
          <h1 className="text-xl font-display font-bold text-white">Contact Enquiries</h1>
          <p className="text-white/40 text-sm mt-0.5">{contacts.length} total submissions</p>
        </div>

        <div className="p-8">
          {contacts.length === 0 ? (
            <div className="bg-graphite rounded-2xl border border-white/10 p-12 text-center">
              <Search className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40">No contact submissions yet.</p>
              {!isDatabaseConfigured() && (
                <p className="text-yellow-400/70 text-sm mt-2">Database not configured — add DATABASE_URL to environment variables.</p>
              )}
            </div>
          ) : (
            <div className="bg-graphite rounded-2xl border border-white/10 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/10 text-white/30 text-xs uppercase tracking-wide">
                <div className="col-span-3">Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-3">Subject</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Date</div>
              </div>

              <div className="divide-y divide-white/5">
                {contacts.map((c) => (
                  <Link
                    key={c.id}
                    href={`/admin/contacts/${c.id}`}
                    className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-white/5 transition-colors items-center group"
                  >
                    <div className="col-span-3 text-white text-sm font-medium truncate">{c.name}</div>
                    <div className="col-span-3 text-white/50 text-sm truncate">{c.email}</div>
                    <div className="col-span-3 text-white/50 text-sm truncate">{c.subject}</div>
                    <div className="col-span-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_COLORS[c.status] ?? STATUS_COLORS.new}`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-between">
                      <span className="text-white/25 text-xs">{new Date(c.submittedAt).toLocaleDateString()}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-sky transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
