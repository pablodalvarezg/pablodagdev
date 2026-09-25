import fs from 'node:fs';
import path from 'node:path';

import { LOCALES, type Locale } from '@modules/i18n';
import { isProduction } from '@shared/config/env';

import { publishedProjects, sortProjects, type Project } from '../domain/project';
import { frontmatterSchema } from './schema';

import type { ComponentType } from 'react';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'projects');

/** What an MDX module exports once remark-mdx-frontmatter has run over it. */
interface ContentModule {
  default: ComponentType;
  frontmatter?: unknown;
}

export interface CaseStudy {
  project: Project;
  Body: ComponentType;
}

function slugsIn(locale: Locale): string[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, locale))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
    .sort();
}

/**
 * Every slug, checked to exist in all locales. A slug is what pairs the two
 * translations for hreflang, so a missing one is a broken alternate link rather
 * than a missing page, and that fails quietly. Better to fail the build.
 */
export function allSlugs(): string[] {
  const [reference, ...rest] = LOCALES.map((locale) => ({ locale, slugs: slugsIn(locale) }));

  for (const { locale, slugs } of rest) {
    const missing = reference.slugs.filter((slug) => !slugs.includes(slug));
    const extra = slugs.filter((slug) => !reference.slugs.includes(slug));

    if (missing.length > 0 || extra.length > 0) {
      throw new Error(
        `Case studies must exist in every locale. ` +
          `'${locale}' is missing [${missing.join(', ')}] and has extra [${extra.join(', ')}] ` +
          `compared to '${reference.locale}'.`,
      );
    }
  }

  return reference.slugs;
}

async function read(locale: Locale, slug: string): Promise<CaseStudy> {
  const mdx: ContentModule = await import(`@content/projects/${locale}/${slug}.mdx`);
  const frontmatter = frontmatterSchema.parse(mdx.frontmatter);

  return { project: { slug, ...frontmatter }, Body: mdx.default };
}

/** A single case study, or null when it is a draft in a production build. */
export async function getCaseStudy(locale: Locale, slug: string): Promise<CaseStudy | null> {
  const caseStudy = await read(locale, slug);
  return caseStudy.project.draft && isProduction ? null : caseStudy;
}

/** Every project that should be listed, already ordered for the hub grid. */
export async function getProjects(locale: Locale): Promise<Project[]> {
  const loaded = await Promise.all(allSlugs().map((slug) => read(locale, slug)));

  return sortProjects(
    publishedProjects(
      loaded.map(({ project }) => project),
      !isProduction,
    ),
  );
}
