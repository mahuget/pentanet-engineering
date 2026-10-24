/* eslint-disable @typescript-eslint/no-explicit-any */
export const teamMemberSchema = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Full Name", type: "string", validation: (r: any) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "role", title: "Job Title", type: "string", validation: (r: any) => r.required() },
    { name: "department", title: "Department", type: "string" },
    { name: "bio", title: "Biography", type: "text", rows: 5 },
    { name: "photo", title: "Profile Photo", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
