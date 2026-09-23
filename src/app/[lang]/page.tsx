import { currentMonth, getRoles, Timeline } from '@modules/experience';
import { About, Contact, Hero, Pricing, SiteHeader, WhatIDo } from '@modules/hub';
import { assertLocale, getTranslations } from '@modules/i18n';
import { Section } from '@shared/ui/Section';

export default async function HubPage({ params }: PageProps<'/[lang]'>) {
  const locale = assertLocale((await params).lang);
  const t = getTranslations(locale);

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
          servicesLabel={t('hero.cta.services')}
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

        <Pricing locale={locale} />
        <About locale={locale} />
        <Contact locale={locale} />
      </main>
    </>
  );
}
