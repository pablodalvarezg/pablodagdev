import { notFound } from 'next/navigation';

import { assertLocale, getTranslations, localeUrl, LOCALES } from '@modules/i18n';
import { SiteHeader } from '@modules/hub';
import { CaseStudyLayout, getCaseStudy, getProjects } from '@modules/projects';

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

  return {
    title: `${caseStudy.project.title} — Pablo Álvarez Graña`,
    description: caseStudy.project.summary,
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
    <>
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
            back: t('project.back'),
          }}
        >
          <Body />
        </CaseStudyLayout>
      </main>
    </>
  );
}
