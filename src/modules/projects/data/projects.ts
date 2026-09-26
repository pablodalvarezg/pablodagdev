import fs from 'node:fs';
import path from 'node:path';

import { LOCALES, type Locale } from '@modules/i18n';
import { isProduction } from '@shared/config/env';

import { parityError } from '../domain/parity';
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

/** Each slug in a locale with its draft flag, which only the frontmatter knows. */
async function draftsIn(locale: Locale): Promise<Record<string, boolean>> {
  const entries = await Promise.all(
    slugsIn(locale).map(async (slug) => [slug, (await read(locale, slug)).project.draft] as const),
  );

  return Object.fromEntries(entries);
}

/**
 * Every slug, checked to ship the same pages in every locale. Reading the
 * frontmatter costs nothing extra: module imports are cached, so the load below
 * hits the same modules again.
 */
async function allSlugs(): Promise<string[]> {
  const perLocale = await Promise.all(
    LOCALES.map(async (locale) => ({ locale, drafts: await draftsIn(locale) })),
  );

  const error = parityError(perLocale);

  if (error) throw new Error(error);

  const [reference] = perLocale;

  return Object.keys(reference.drafts);
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
  const loaded = await Promise.all((await allSlugs()).map((slug) => read(locale, slug)));

  return sortProjects(
    publishedProjects(
      loaded.map(({ project }) => project),
      !isProduction,
    ),
  );
}
