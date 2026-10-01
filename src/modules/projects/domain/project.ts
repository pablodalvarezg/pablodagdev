import type { ThemeName } from '@modules/theming';

/**
 * What a project demonstrates. Drives the filter on the hub grid and is the
 * vocabulary the brief's skills map uses, so it stays a closed set.
 */
export const SKILLS = ['fullstack', 'data', 'lowcode', 'erp', 'ai', 'seo', 'design'] as const;

export type Skill = (typeof SKILLS)[number];

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  /** Absent when there is no date worth publishing. Never a guess. */
  period?: string;
  /**
   * Present only on professional work, and only when there is permission to name
   * the company. Its absence is what makes a project a side project: there is no
   * separate `type` field to keep in sync with it.
   */
  client?: string;
  /** What the project is about, when there is no client. Never both at once. */
  category?: string;
  stack: string[];
  skills: Skill[];
  theme: ThemeName;
  links: { demo?: string; repo?: string };
  /** The screenshot under the title. The path is shared; the alt is per locale. */
  cover?: { src: string; width: number; height: number; alt: string };
  featured: boolean;
  draft: boolean;
}

/** Featured first, and a stable order within each group so builds are reproducible. */
export function sortProjects(projects: readonly Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Drafts render while developing and are absent from a production build, so an
 * unfinished case study can never ship — not as a page, and not as a card
 * pointing at one.
 */
export function publishedProjects(projects: readonly Project[], includeDrafts: boolean): Project[] {
  return projects.filter((project) => includeDrafts || !project.draft);
}
