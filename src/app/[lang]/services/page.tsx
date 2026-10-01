import { Contact, SiteHeader } from '@modules/hub';
import { assertLocale, getTranslations, localeUrl } from '@modules/i18n';
import { openGraphBase } from '@modules/seo';
import { Offerings } from '@modules/services';
import { site } from '@shared/config/site';
import { Container } from '@shared/ui/Container';

import type { Metadata } from 'next';

// No generateStaticParams here: [lang] is the layout's segment and the layout
// already enumerates it, so this page inherits both locales.

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/services'>): Promise<Metadata> {
  const locale = assertLocale((await params).lang);
  const t = getTranslations(locale);
  const description = t('meta.services.description');
  const title = t('services.title');

  return {
    // Same convention as a case study: the suffix belongs in <title>, where the
    // name gives a bare tab and a search result its owner.
    title: `${title} — ${site.name}`,
    description,
    openGraph: {
      // og:title drops it, because og:site_name already carries the name.
      ...openGraphBase({ title, description, locale }),
      type: 'website',
    },
  };
}

export default async function ServicesPage({ params }: PageProps<'/[lang]/services'>) {
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
        {/*
          The page owns its h1 rather than letting Offerings open at h2: this is
          a page of its own, not a section of the hub, and the header has no home
          link, so it also carries its own way back — the same one a case study
          uses.
        */}
        <Container className="flex flex-col gap-8 py-16">
          <a
            href={localeUrl(locale)}
            className="text-muted hover:text-accent self-start font-mono text-xs tracking-[0.15em] uppercase transition-colors"
          >
            ← {t('nav.back')}
          </a>

          <div className="flex flex-col gap-2">
            <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
              {t('services.eyebrow')}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {t('services.title')}
            </h1>
          </div>

          <Offerings locale={locale} />
        </Container>

        <Contact locale={locale} />
      </main>
    </>
  );
}
