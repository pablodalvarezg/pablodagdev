import { getTranslations, localeUrl, type Locale } from '@modules/i18n';
import { NumberedList } from '@shared/ui/NumberedList';
import { Section } from '@shared/ui/Section';

// Order of the blocks; the copy itself lives in the dictionary.
const AREAS = ['fullstack', 'data', 'lowcode', 'erp', 'ai', 'seo'] as const;

export function WhatIDo({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <Section id="what-i-do" eyebrow={t('specialties.eyebrow')} title={t('specialties.title')}>
      <NumberedList
        items={AREAS.map((id) => ({
          id,
          title: t(`specialties.${id}.title`),
          body: t(`specialties.${id}.body`),
        }))}
      />

      {/* These are the tools; the services page is the work they get used for.
          The hub answers "what does he know", and this is the one way through
          to "what can I hire him for". */}
      <a
        href={localeUrl(locale, 'services')}
        className="text-accent self-start font-medium underline underline-offset-4 hover:no-underline"
      >
        {t('specialties.cta')} →
      </a>
    </Section>
  );
}
