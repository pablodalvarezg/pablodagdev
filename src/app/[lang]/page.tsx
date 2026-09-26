import { currentMonth, getRoles, Timeline } from '@modules/experience';
import { About, Contact, Hero, SiteHeader, WhatIDo } from '@modules/hub';
import { assertLocale, getTranslations, localeUrl } from '@modules/i18n';
import { getProjects, ProjectCard, UPCOMING_PROJECTS, UpcomingCard } from '@modules/projects';
import { JsonLd, openGraphBase, personSchema } from '@modules/seo';
import { site } from '@shared/config/site';
import { Section } from '@shared/ui/Section';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const locale = assertLocale((await params).lang);
  const t = getTranslations(locale);
  const description = t('meta.home.description');

  return {
    description,
    openGraph: {
      ...openGraphBase({ title: site.name, description, locale }),
      type: 'website',
    },
  };
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
      {/* The hub is the page about him, so the Person block lives here and not
          on every page, where duplicate entities only compete with each other. */}
      <JsonLd
        schema={personSchema({
          jobTitle: t('hero.role'),
          description: t('meta.home.description'),
        })}
      />

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

        {/*
          One grid, not two: a case study is an article about a project, not a
          category of its own. Shipped work first, then what is being built next.

          The emptiness check this replaced could never be false. With every case
          study in draft, generateStaticParams yields nothing and the build fails
          before this renders — so the branch only looked like a safeguard.
        */}
        <Section id="work" eyebrow={t('work.eyebrow')} title={t('work.title')}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                href={localeUrl(locale, `projects/${project.slug}`)}
              />
            ))}

            {UPCOMING_PROJECTS.map((slug) => (
              <UpcomingCard
                key={slug}
                title={t(`upcoming.${slug}.title`)}
                summary={t(`upcoming.${slug}.summary`)}
                label={t('upcoming.label')}
              />
            ))}
          </ul>
        </Section>

        <About locale={locale} />
        <Contact locale={locale} />
      </main>
    </>
  );
}
