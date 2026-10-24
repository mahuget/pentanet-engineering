/* eslint-disable @typescript-eslint/no-explicit-any */
export const newsPostSchema = {
  name: "newsPost",
  title: "News & Insights",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r: any) => r.required() },
    { name: "publishedAt", title: "Published At", type: "datetime", validation: (r: any) => r.required() },
    { name: "category", title: "Category", type: "string" },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r: any) => r.required() },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "body", title: "Article Body", type: "array", of: [{ type: "block" }, { type: "image" }] },
    { name: "author", title: "Author", type: "reference", to: [{ type: "teamMember" }] },
  ],
};
