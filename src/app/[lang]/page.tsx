import { About, Contact, Hero, SiteHeader, WhatIDo } from '@modules/hub';
import { assertLocale, getTranslations } from '@modules/i18n';

export default async function HubPage({ params }: PageProps<'/[lang]'>) {
  const locale = assertLocale((await params).lang);
  const t = getTranslations(locale);

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
        <About locale={locale} />
        <Contact locale={locale} />
      </main>
    </>
  );
}
