"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-sky/50 " +
  "bg-white dark:bg-graphite-surface text-navy dark:text-cloud placeholder:text-graphite/40 dark:placeholder:text-cloud/30 " +
  "hover:border-sky/40 dark:hover:border-sky/30";

const inputNormal = cn(inputBase, "border-soft-gray dark:border-graphite-light");
const inputError  = cn(inputBase, "border-red-400 bg-red-50 dark:bg-red-950/30");

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      turnstileToken: "placeholder-token",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
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
      setServerError("Unable to send message. Please check your connection and try again.");
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
        <h3 className="text-xl font-display font-semibold text-navy dark:text-cloud mb-2">Message Sent</h3>
        <p className="text-graphite/65 dark:text-cloud/60 mb-6 max-w-sm">
          Thank you for getting in touch. We will review your message and respond shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-outline-navy text-sm px-5 py-2.5"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Hidden turnstile token */}
      <input type="hidden" {...register("turnstileToken")} value="placeholder-token" />

      {/* Server error */}
      {status === "error" && serverError && (
        <div
          className="flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-red-700 dark:text-red-400 text-sm">{serverError}</p>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5"
          >
            Full Name <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            placeholder="Your full name"
            className={errors.name ? inputError : inputNormal}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-red-600 dark:text-red-400 text-xs mt-1.5" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5"
          >
            Email Address <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            placeholder="your@email.com"
            className={errors.email ? inputError : inputNormal}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-red-600 dark:text-red-400 text-xs mt-1.5" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5"
        >
          Phone Number{" "}
          <span className="text-graphite/40 dark:text-cloud/40 text-xs font-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          {...register("phone")}
          placeholder="+251 000 000 000"
          className={inputNormal}
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5"
        >
          Subject <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          {...register("subject")}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          placeholder="What is your enquiry about?"
          className={errors.subject ? inputError : inputNormal}
        />
        {errors.subject && (
          <p id="contact-subject-error" className="text-red-600 dark:text-red-400 text-xs mt-1.5" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-graphite dark:text-cloud/80 mb-1.5"
        >
          Message <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder="Tell us about your enquiry or project..."
          className={cn(errors.message ? inputError : inputNormal, "resize-none")}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-red-600 dark:text-red-400 text-xs mt-1.5" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Spam protection notice */}
      <div className="bg-navy/5 dark:bg-sky/5 border border-navy/10 dark:border-sky/10 rounded-xl p-3 text-xs text-graphite/50 dark:text-cloud/40">
        🔒 Spam protection (Cloudflare Turnstile) will be active once configured.
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
        aria-disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" /> Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs text-graphite/40 dark:text-cloud/30">
        By submitting this form, you agree to our{" "}
        <a href="/privacy-policy" className="text-sky hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
