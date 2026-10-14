import { z } from 'zod';

/**
 * The only place the environment is read. NODE_ENV is set by Next itself rather
 * than configured by us, so it needs no schema — anything the site configures
 * gets validated with Zod here before it is exported.
 */
export const isProduction = process.env.NODE_ENV === 'production';

const schema = z.object({
  /**
   * Read-only token for the contribution graph, which GitHub's GraphQL API will
   * not serve anonymously. Required to ship, so a build without it fails instead
   * of quietly publishing a hub with the section missing; optional in dev, where
   * the section just does not render.
   */
  GITHUB_TOKEN: isProduction ? z.string().min(1) : z.string().min(1).optional(),
});

// An empty value is a blank line in .env.local, not a token: it counts as missing.
export const env = schema.parse({ GITHUB_TOKEN: process.env.GITHUB_TOKEN || undefined });
