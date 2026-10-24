"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { quoteSchema, type QuoteFormData } from "@/lib/validations/quote";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const PROJECT_TYPES = [
  "Select project type...",
  "Telecom Installation",
  "Tower Erection",
  "Telecom Civil Works",
  "Power Installation",
  "Solar Installation",
  "Data Center",
  "Multiple Sectors",
  "Other",
];

const BUDGET_RANGES = [
  "Select budget range...",
  "Under ETB 1 million",
  "ETB 1M – 5M",
  "ETB 5M – 20M",
  "ETB 20M – 100M",
  "Over ETB 100M",
  "Prefer not to say",
];

const TIMELINES = [
  "Select timeline...",
  "As soon as possible",
  "Within 3 months",
  "Within 6 months",
  "Within 12 months",
  "Over 12 months",
  "Timeline not defined",
];

const SERVICES = [
  "Telecom Installation",
  "Tower Erection",
  "Civil Works",
  "Power Installation",
  "Solar Installation",
  "Data Center",
  "Project Management",
  "Consultancy",
];

const inputBase =
  "w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-sky/50 " +
  "bg-white dark:bg-graphite-surface text-navy dark:text-cloud placeholder:text-graphite/40 dark:placeholder:text-cloud/30 " +
  "hover:border-sky/40 dark:hover:border-sky/30";

const inputNormal = cn(inputBase, "border-soft-gray dark:border-graphite-light");
const inputError  = cn(inputBase, "border-red-400 bg-red-50 dark:bg-red-950/30");

export function QuoteForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      projectLocation: "",
      budgetRange: "",
      timeline: "",
      description: "",
      services: [],
      turnstileToken: "placeholder-token",
    },
  });

  const selectedServices = watch("services") ?? [];

  function toggleService(svc: string) {
    const current = selectedServices;
    if (current.includes(svc)) {
      setValue("services", current.filter((s) => s !== svc));
    } else {
      setValue("services", [...current, svc]);
    }
  }

  async function onSubmit(data: QuoteFormData) {
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setServerError(json.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setServerError("Unable to submit. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-emerald" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-display font-semibold text-navy dark:text-cloud mb-2">
          Request Submitted
        </h3>
        <p className="text-graphite/65 dark:text-cloud/60 mb-6 max-w-sm">
          Thank you for your project enquiry. Our engineering team will review the details and be in touch soon.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-outline-navy text-sm px-5 py-2.5">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Quote request form"
      className="space-y-5"
    >
      <input type="hidden" {...register("turnstileToken")} value="placeholder-token" />

      {status === "error" && serverError && (
        <div
          className="flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-red-700 dark:text-red-400 text-sm">{serverError}</p>
        </div>
      )}

      {/* Personal details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quote-name" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            aria-invalid={!!errors.name}
            placeholder="Your full name"
            className={errors.name ? inputError : inputNormal}
          />
          {errors.name && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1.5" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="quote-company" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
            Company / Organisation{" "}
            <span className="text-graphite/40 dark:text-cloud/40 text-xs font-normal">(optional)</span>
          </label>
          <input
            id="quote-company"
            type="text"
            autoComplete="organization"
            {...register("company")}
            placeholder="Your company name"
            className={inputNormal}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quote-email" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            placeholder="your@email.com"
            className={errors.email ? inputError : inputNormal}
          />
          {errors.email && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1.5" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="quote-phone" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
            Phone Number{" "}
            <span className="text-graphite/40 dark:text-cloud/40 text-xs font-normal">(optional)</span>
          </label>
          <input
            id="quote-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            placeholder="+251 000 000 000"
            className={inputNormal}
          />
        </div>
      </div>

      {/* Project details */}
      <div className="pt-4 border-t border-soft-gray dark:border-graphite-light">
        <h3 className="text-sm font-semibold text-graphite dark:text-cloud uppercase tracking-wide mb-4">
          Project Information
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quote-project-type" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
            Project Type <span className="text-red-500">*</span>
          </label>
          <select
            id="quote-project-type"
            {...register("projectType")}
            aria-invalid={!!errors.projectType}
            className={cn(errors.projectType ? inputError : inputNormal, "cursor-pointer")}
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t === "Select project type..." ? "" : t}>
                {t}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1.5" role="alert">
              {errors.projectType.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="quote-location" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
            Project Location{" "}
            <span className="text-graphite/40 dark:text-cloud/40 text-xs font-normal">(optional)</span>
          </label>
          <input
            id="quote-location"
            type="text"
            {...register("projectLocation")}
            placeholder="City, Region, Ethiopia"
            className={inputNormal}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quote-budget" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
            Approximate Budget
          </label>
          <select
            id="quote-budget"
            {...register("budgetRange")}
            className={cn(inputNormal, "cursor-pointer")}
          >
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b === "Select budget range..." ? "" : b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quote-timeline" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
            Desired Timeline
          </label>
          <select
            id="quote-timeline"
            {...register("timeline")}
            className={cn(inputNormal, "cursor-pointer")}
          >
            {TIMELINES.map((t) => (
              <option key={t} value={t === "Select timeline..." ? "" : t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services checkboxes */}
      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-3">
            Services Required{" "}
            <span className="text-graphite/40 dark:text-cloud/40 text-xs font-normal">
              (select all that apply)
            </span>
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SERVICES.map((svc) => {
              const checked = selectedServices.includes(svc);
              return (
                <button
                  key={svc}
                  type="button"
                  onClick={() => toggleService(svc)}
                  aria-pressed={checked}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200 text-left",
                    checked
                      ? "text-navy border-sky"
                      : "bg-white dark:bg-graphite-surface text-graphite dark:text-cloud/70 border-soft-gray dark:border-graphite-light hover:border-sky/40"
                  )}
                  style={checked ? { background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(20,184,166,0.15))" } : undefined}
                >
                  {svc}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="quote-description" className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5">
          Project Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="quote-description"
          rows={6}
          {...register("description")}
          aria-invalid={!!errors.description}
          placeholder="Describe your project — scope, objectives, key requirements, and any relevant background..."
          className={cn(errors.description ? inputError : inputNormal, "resize-none")}
        />
        {errors.description && (
          <p className="text-red-600 dark:text-red-400 text-xs mt-1.5" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="bg-navy/5 dark:bg-sky/5 border border-navy/10 dark:border-sky/10 rounded-xl p-3 text-xs text-graphite/50 dark:text-cloud/40">
        🔒 Spam protection (Cloudflare Turnstile) will be active once configured.
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" /> Submit Quote Request
          </>
        )}
      </button>

      <p className="text-center text-xs text-graphite/40 dark:text-cloud/30">
        By submitting, you agree to our{" "}
        <a href="/privacy-policy" className="text-sky hover:underline">
          Privacy Policy
        </a>
        . We will never share your information.
      </p>
    </form>
  );
}
