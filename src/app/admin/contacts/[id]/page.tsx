import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStatusUpdater } from "@/components/admin/AdminStatusUpdater";
import { isDatabaseConfigured } from "@/lib/db";
import { ArrowLeft, Mail, Phone, Calendar, Tag } from "lucide-react";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Contact #${id.slice(0, 8)}` };
}

async function getContact(id: string) {
  if (!isDatabaseConfigured()) return null;
  try {
    const { prisma } = await import("@/lib/db");
    return prisma.contactSubmission.findUnique({ where: { id } });
  } catch { return null; }
}

export default async function ContactDetailPage({ params }: Props) {
  const { id } = await params;
  const contact = await getContact(id);
  if (!contact) notFound();

  const STATUS_OPTIONS = ["new", "reviewed", "responded", "archived"];

  return (
    <div className="flex min-h-screen bg-graphite-light">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-graphite border-b border-white/10 px-8 py-5">
          <Link href="/admin/contacts" className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Contacts
          </Link>
          <h1 className="text-xl font-display font-bold text-white">Contact Enquiry</h1>
          <p className="text-white/40 text-sm mt-0.5">Submitted {new Date(contact.submittedAt).toLocaleString()}</p>
        </div>

        <div className="p-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-graphite rounded-2xl border border-white/10 p-6">
                <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide text-white/40">Message</h2>
                <h3 className="text-white font-bold text-lg mb-3">{contact.subject}</h3>
                <p className="text-white/70 leading-relaxed whitespace-pre-wrap text-sm">{contact.message}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Contact details */}
              <div className="bg-graphite rounded-2xl border border-white/10 p-5">
                <h2 className="text-white/40 text-xs uppercase tracking-wide mb-4">Sender Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-sky" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs">Name</div>
                      <div className="text-white text-sm font-medium">{contact.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-sky" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs">Email</div>
                      <a href={`mailto:${contact.email}`} className="text-sky text-sm hover:underline">{contact.email}</a>
                    </div>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-sky" />
                      </div>
                      <div>
                        <div className="text-white/40 text-xs">Phone</div>
                        <a href={`tel:${contact.phone}`} className="text-sky text-sm hover:underline">{contact.phone}</a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-sky" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs">Submitted</div>
                      <div className="text-white text-sm">{new Date(contact.submittedAt).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky/10 flex items-center justify-center flex-shrink-0">
                      <Tag className="w-4 h-4 text-sky" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs">Current Status</div>
                      <div className="text-white text-sm capitalize">{contact.status}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status updater */}
              <div className="bg-graphite rounded-2xl border border-white/10 p-5">
                <h2 className="text-white/40 text-xs uppercase tracking-wide mb-4">Update Status</h2>
                <AdminStatusUpdater
                  id={contact.id}
                  currentStatus={contact.status}
                  type="contact"
                  options={STATUS_OPTIONS}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
