import { currentMonth, getRoles, Timeline } from '@modules/experience';
import { About, Contact, Hero, SiteHeader, WhatIDo } from '@modules/hub';
import { assertLocale, getTranslations, localeUrl } from '@modules/i18n';
import { getProjects, ProjectCard } from '@modules/projects';
import { Section } from '@shared/ui/Section';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const t = getTranslations(assertLocale((await params).lang));

  return { description: t('meta.home.description') };
}

export default async function HubPage({ params }: PageProps<'/[lang]'>) {
  const locale = assertLocale((await params).lang);
  const t = getTranslations(locale);

  const projects = await getProjects(locale);
  const roles = getRoles();
  const today = currentMonth();
  const summaries = Object.fromEntries(
    roles.map((role) => [role.id, t(`experience.${role.id}.summary`)]),
  );

  return (
    <>
      <SiteHeader
        locale={locale}
        languageLabel={t('nav.language')}
        themeLabel={t('theme.toggle')}
        names={{ en: t('language.en'), es: t('language.es') }}
      />

      <main className="flex-1">
        <Hero
          role={t('hero.role')}
          location={t('hero.location')}
          tagline={t('hero.tagline')}
          contactLabel={t('hero.cta.contact')}
          workLabel={t('hero.cta.work')}
        />
        <WhatIDo locale={locale} />

        <Section id="experience" eyebrow={t('experience.eyebrow')} title={t('experience.title')}>
          <Timeline
            roles={roles}
            today={today}
            presentLabel={t('experience.present')}
            summaries={summaries}
          />
        </Section>

        {projects.length > 0 ? (
          <Section id="work" eyebrow={t('work.eyebrow')} title={t('work.title')}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  href={localeUrl(locale, `projects/${project.slug}`)}
                />
              ))}
            </ul>
          </Section>
        ) : null}

        <About locale={locale} />
        <Contact locale={locale} />
      </main>
    </>
  );
}
