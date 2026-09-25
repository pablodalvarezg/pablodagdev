import { THEME_NAMES } from '@modules/theming';
import { z } from 'zod';

import { SKILLS } from '../domain/project';

/**
 * The contract for a case study's frontmatter, and the reason a broken one fails
 * the build instead of rendering a half-empty page. Strict on purpose: a typo in
 * a key would otherwise pass silently and drop the value.
 */
export const frontmatterSchema = z.strictObject({
  title: z.string().min(1),
  summary: z.string().min(1),
  role: z.string().min(1),
  // Optional: a project with no public period is better than an invented one.
  period: z.string().min(1).optional(),
  client: z.string().min(1).optional(),
  stack: z.array(z.string().min(1)).min(1),
  skills: z.array(z.enum(SKILLS)).min(1),
  // Reads the theming registry, so an unregistered world fails here rather than
  // rendering the page with no tokens applied and looking merely ugly.
  theme: z.enum(THEME_NAMES),
  links: z.strictObject({ demo: z.url().optional(), repo: z.url().optional() }).default({}),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
