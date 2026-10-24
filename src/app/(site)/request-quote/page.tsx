import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { CheckCircle2, Clock, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Submit your project details and receive a tailored engineering proposal from Pentanet Engineering PLC.",
};

const whyRequest = [
  { icon: Clock, title: "Fast Response", desc: "We acknowledge all enquiries within one business day." },
  { icon: Shield, title: "No Obligation", desc: "Receiving a quote does not commit you to any engagement." },
  { icon: Users, title: "Expert Review", desc: "Your request is reviewed by senior engineers, not a sales team." },
  { icon: CheckCircle2, title: "Detailed Proposal", desc: "We prepare clear, itemised proposals tailored to your project." },
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get Started"
        title="Request a Quote"
        description="Tell us about your project and we will prepare a tailored engineering proposal for your consideration."
        breadcrumbs={[{ label: "Request a Quote", href: "/request-quote" }]}
      />

      <section className="py-24 bg-soft-gray dark:bg-graphite" aria-label="Quote request section">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Why request info */}
            <AnimateIn direction="right" className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-semibold text-navy dark:text-cloud mb-2">What Happens Next?</h2>
                <p className="text-graphite/65 dark:text-cloud/60 text-sm leading-relaxed mb-6">
                  After you submit your request, our engineering team will review your requirements and prepare a tailored proposal.
                </p>
                <ol className="space-y-4" role="list">
                  {[
                    "Submit your project details",
                    "Our team reviews the requirements",
                    "We contact you to clarify if needed",
                    "You receive a detailed proposal",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span
                        className="w-6 h-6 rounded-full text-navy text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-graphite/80 dark:text-cloud/70">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {whyRequest.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3 bg-cloud dark:bg-graphite-surface rounded-xl p-4 shadow-card">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(56,189,248,0.1)" }}
                    >
                      <Icon className="w-4 h-4 text-sky" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy dark:text-cloud text-sm">{title}</div>
                      <div className="text-graphite/60 dark:text-cloud/50 text-xs mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            {/* Quote form */}
            <div className="lg:col-span-2">
              <AnimateIn direction="left" delay={0.1}>
                <div className="bg-cloud dark:bg-graphite-surface rounded-2xl p-8 shadow-card">
                  <h2 className="text-xl font-display font-semibold text-navy dark:text-cloud mb-2">Project Details</h2>
                  <p className="text-graphite/60 dark:text-cloud/50 text-sm mb-8">
                    Please provide as much detail as possible so we can prepare an accurate proposal.
                  </p>
                  <QuoteForm />
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
