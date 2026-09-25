import { getTranslations, type Locale } from '@modules/i18n';
import { Section } from '@shared/ui/Section';

export function About({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <Section id="about" eyebrow={t('about.eyebrow')} title={t('about.title')}>
      <p className="max-w-prose text-lg text-pretty">{t('about.body')}</p>
    </Section>
  );
}
