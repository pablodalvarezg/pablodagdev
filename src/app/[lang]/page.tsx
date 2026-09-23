import { assertLocale, getTranslations } from '@modules/i18n';

export default async function HubPage({ params }: PageProps<'/[lang]'>) {
  const locale = assertLocale((await params).lang);
  const t = getTranslations(locale);

  return (
    <main>
      <h1>Pablo Álvarez Graña</h1>
      <p>
        {t('hero.role')} — {t('hero.location')}
      </p>
      <p>{t('hero.tagline')}</p>
    </main>
  );
}
