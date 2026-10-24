import { z } from "zod";

export const quoteSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name is too long")
    .trim(),
  company: z
    .string()
    .max(300, "Company name is too long")
    .trim()
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(320, "Email is too long")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .max(50, "Phone number is too long")
    .trim()
    .optional()
    .or(z.literal("")),
  projectType: z
    .string()
    .min(2, "Project type is required")
    .max(200, "Project type is too long")
    .trim(),
  projectLocation: z
    .string()
    .max(300, "Location is too long")
    .trim()
    .optional()
    .or(z.literal("")),
  budgetRange: z
    .string()
    .max(100, "Budget range is too long")
    .optional()
    .or(z.literal("")),
  timeline: z
    .string()
    .max(100, "Timeline is too long")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters")
    .max(5000, "Description is too long")
    .trim(),
  services: z
    .array(z.string().max(100))
    .max(20, "Too many services selected")
    .optional()
    .default([]),
  turnstileToken: z.string().min(1, "Verification token is required"),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
