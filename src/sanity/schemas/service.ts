/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Sanity schema — Service
 * Requires `sanity` package to be installed and Sanity Studio configured.
 * This file is not compiled by Next.js directly.
 */

export const serviceSchema = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r: any) => r.required() },
    { name: "order", title: "Display Order", type: "number" },
    { name: "icon", title: "Icon Name (Lucide)", type: "string" },
    { name: "shortDescription", title: "Short Description", type: "text", rows: 3 },
    { name: "fullDescription", title: "Full Description", type: "array", of: [{ type: "block" }] },
    { name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } },
    { name: "features", title: "Key Features", type: "array", of: [{ type: "string" }] },
    { name: "relatedProjects", title: "Related Projects", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }] },
  ],
};
