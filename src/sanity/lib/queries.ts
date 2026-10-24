/**
 * GROQ queries for Sanity CMS.
 * All public content is fetched server-side via these queries.
 */

// Services
export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  icon,
  "heroImage": heroImage.asset->url,
  features[]
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  icon,
  "heroImage": heroImage.asset->url,
  features[],
  "relatedProjects": relatedProjects[]->{ _id, title, slug, "coverImage": coverImage.asset->url, category, location }
}`;

// Projects
export const projectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  status,
  location,
  excerpt,
  "coverImage": coverImage.asset->url,
  services[]->{ title, slug }
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  status,
  location,
  description,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[].asset->url,
  services[]->{ title, slug }
}`;

// Team
export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  department,
  bio,
  "photo": photo.asset->url
}`;

// News
export const newsPostsQuery = `*[_type == "newsPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  category,
  "coverImage": coverImage.asset->url,
  "author": author->{ name, "photo": photo.asset->url }
}`;

export const newsPostBySlugQuery = `*[_type == "newsPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  body,
  category,
  "coverImage": coverImage.asset->url,
  "author": author->{ name, bio, "photo": photo.asset->url }
}`;

// Site settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName,
  tagline,
  contactEmail,
  phone,
  address,
  socialLinks,
  seoDefaults
}`;
