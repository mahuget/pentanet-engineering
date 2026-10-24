/**
 * Sanity CMS client — server-side read only.
 *
 * Returns null when not configured (development without a Sanity project).
 * All public fetches should use safeFetch() which handles null gracefully.
 *
 * IMPORTANT: SANITY_API_TOKEN must be a read-only token.
 * Never use an Editor or Admin token server-side.
 */

import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

export const isConfigured =
  Boolean(projectId) &&
  projectId !== "unconfigured" &&
  projectId !== "your-sanity-project-id";

export const sanityClient: SanityClient | null = isConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

/**
 * Fetch from Sanity, returning null on error or when not configured.
 * Use this instead of client.fetch() directly to ensure graceful fallback.
 */
export async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch (err) {
    console.error(
      "[sanity] fetch error:",
      err instanceof Error ? err.message : "unknown"
    );
    return null;
  }
}

export { projectId, dataset, apiVersion };
