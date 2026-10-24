/* eslint-disable @typescript-eslint/no-explicit-any */
export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "siteName", title: "Site Name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "contactEmail", title: "Contact Email", type: "string" },
    { name: "phone", title: "Phone Number", type: "string" },
    {
      name: "address", title: "Address", type: "object",
      fields: [
        { name: "street", title: "Street", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "country", title: "Country", type: "string" },
      ],
    },
    {
      name: "socialLinks", title: "Social Links", type: "object",
      fields: [
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
        { name: "twitter", title: "Twitter/X URL", type: "url" },
        { name: "facebook", title: "Facebook URL", type: "url" },
      ],
    },
    {
      name: "seoDefaults", title: "SEO Defaults", type: "object",
      fields: [
        { name: "metaTitle", title: "Default Meta Title", type: "string" },
        { name: "metaDescription", title: "Default Meta Description", type: "text" },
        { name: "ogImage", title: "Default OG Image", type: "image" },
      ],
    },
  ],
};
