/* eslint-disable @typescript-eslint/no-explicit-any */
export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r: any) => r.required() },
    { name: "category", title: "Category", type: "string" },
    { name: "status", title: "Status", type: "string", options: { list: ["Completed", "In Progress", "Planning"] } },
    { name: "location", title: "Location", type: "string" },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "description", title: "Full Description", type: "array", of: [{ type: "block" }] },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    { name: "services", title: "Related Services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] },
  ],
};
