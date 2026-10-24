import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Facebook } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { AnimateIn } from "@/components/shared/AnimateIn";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Pentanet Engineering PLC. We are ready to discuss your project requirements and answer your questions.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "Addis Ababa, Ethiopia\n[Street address — placeholder]",
    note: "Placeholder — to be confirmed",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+251 000 000 000",
    href: "tel:+251000000000",
    note: "Placeholder — to be confirmed",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@pentanet.com",
    href: "mailto:info@pentanet.com",
    note: "Placeholder — to be confirmed",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday – Friday\n8:00 AM – 5:00 PM (EAT)",
    note: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Reach out to discuss your engineering project. Our team responds to all enquiries promptly."
        breadcrumbs={[{ label: "Contact Us", href: "/contact" }]}
      />

      <section className="py-24 bg-soft-gray dark:bg-graphite" aria-label="Contact information and form">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <AnimateIn direction="right" className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-semibold text-navy dark:text-cloud mb-6">Contact Information</h2>
                <p className="text-xs text-graphite/40 dark:text-cloud/30 italic mb-6">
                  * Contact details are placeholders — to be confirmed by Pentanet Engineering PLC.
                </p>
                <ul className="space-y-5" role="list" aria-label="Contact details">
                  {contactDetails.map(({ icon: Icon, label, value, href, note }) => (
                    <li key={label} className="flex gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(56,189,248,0.1)" }}
                      >
                        <Icon className="w-5 h-5 text-sky" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-graphite/50 dark:text-cloud/40 uppercase tracking-wide font-semibold mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-graphite dark:text-cloud hover:text-sky transition-colors text-sm whitespace-pre-line">
                            {value}
                          </a>
                        ) : (
                          <p className="text-graphite dark:text-cloud text-sm whitespace-pre-line">{value}</p>
                        )}
                        {note && <p className="text-xs italic text-graphite/35 dark:text-cloud/30 mt-0.5">{note}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-sm font-semibold text-graphite dark:text-cloud uppercase tracking-wide mb-4">Follow Us</h3>
                <div className="flex gap-3" aria-label="Social media links">
                  {[
                    { Icon: Linkedin, label: "LinkedIn" },
                    { Icon: Twitter, label: "Twitter" },
                    { Icon: Facebook, label: "Facebook" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={`Pentanet Engineering on ${label}`}
                      className="w-10 h-10 bg-navy dark:bg-graphite-surface rounded-xl flex items-center justify-center text-white/70 hover:bg-sky hover:text-navy transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="bg-navy/10 dark:bg-sky/5 rounded-2xl h-48 flex items-center justify-center border-2 border-dashed border-navy/20 dark:border-sky/20"
                role="img"
                aria-label="Map placeholder — location to be confirmed"
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-navy/30 dark:text-sky/30 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-navy/40 dark:text-cloud/30 text-xs">Map will be embedded once<br />address is confirmed</p>
                </div>
              </div>
            </AnimateIn>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <AnimateIn direction="left" delay={0.1}>
                <div className="bg-cloud dark:bg-graphite-surface rounded-2xl p-8 shadow-card">
                  <h2 className="text-xl font-display font-semibold text-navy dark:text-cloud mb-2">Send a Message</h2>
                  <p className="text-graphite/60 dark:text-cloud/50 text-sm mb-8">
                    Fill in the form below and we will get back to you as soon as possible.
                  </p>
                  <ContactForm />
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
