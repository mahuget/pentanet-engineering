/**
 * Prisma client singleton.
 * Prevents multiple instances during Next.js hot reload in development.
 * Logs errors only in production; errors + warnings in development.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Returns true when DATABASE_URL looks like a real, configured connection string.
 * Used to skip DB operations gracefully during local development without a DB.
 */
export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return Boolean(
    url &&
      !url.includes("placeholder") &&
      !url.includes("your-project") &&
      !url.includes("[ref]") &&
      url.startsWith("postgresql://")
  );
}
