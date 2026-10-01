import { notFound } from 'next/navigation';

import { assertLocale, getTranslations, localeUrl, LOCALES } from '@modules/i18n';
import { SiteHeader } from '@modules/hub';
import { CaseStudyLayout, getCaseStudy, getProjects } from '@modules/projects';
import { openGraphBase } from '@modules/seo';
import { site } from '@shared/config/site';

import type { Metadata } from 'next';

/**
 * Drafts are absent here in a production build, so an unfinished case study is
 * not merely hidden: the page never exists.
 */
export async function generateStaticParams() {
  const perLocale = await Promise.all(
    LOCALES.map(async (lang) => (await getProjects(lang)).map(({ slug }) => ({ lang, slug }))),
  );

  return perLocale.flat();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/projects/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params;
  const caseStudy = await getCaseStudy(assertLocale(lang), slug);

  if (!caseStudy) return {};

  const description = caseStudy.project.summary;

  return {
    // The suffix belongs in <title>, where the name gives a bare tab its owner.
    title: `${caseStudy.project.title} — ${site.name}`,
    description,
    openGraph: {
      // og:title drops it: og:site_name already carries the name, and a share
      // preview has one line to spend on what this page actually is.
      ...openGraphBase({
        title: caseStudy.project.title,
        description,
        locale: assertLocale(lang),
      }),
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<'/[lang]/projects/[slug]'>) {
  const { lang, slug } = await params;
  const locale = assertLocale(lang);
  const caseStudy = await getCaseStudy(locale, slug);

  if (!caseStudy) notFound();

  const t = getTranslations(locale);
  const { project, Body } = caseStudy;

  return (
    /*
      The world wraps the whole route, chrome included, rather than just the
      article: a nested page cannot reach <html>, and leaving the header outside
      left it on the hub's tokens. Invisible between these two palettes and not
      between the next two.
    */
    <div data-theme={project.theme} className="bg-bg text-fg flex flex-1 flex-col">
      <SiteHeader
        locale={locale}
        languageLabel={t('nav.language')}
        themeLabel={t('theme.toggle')}
        names={{ en: t('language.en'), es: t('language.es') }}
      />

      <main className="flex flex-1 flex-col">
        <CaseStudyLayout
          project={project}
          backHref={localeUrl(locale)}
          labels={{
            role: t('project.role'),
            period: t('project.period'),
            client: t('project.client'),
            stack: t('project.stack'),
            visit: t('project.visit'),
            back: t('nav.back'),
          }}
        >
          <Body />
        </CaseStudyLayout>
      </main>
    </div>
  );
}
