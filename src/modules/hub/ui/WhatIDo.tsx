import { getTranslations, type Locale } from '@modules/i18n';
import { Section } from '@shared/ui/Section';

// Order of the blocks; the copy itself lives in the dictionary.
const AREAS = ['fullstack', 'data', 'lowcode', 'erp', 'ai', 'seo'] as const;

export function WhatIDo({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <Section id="what-i-do" eyebrow={t('services.eyebrow')} title={t('services.title')}>
      <ul className="grid gap-px overflow-hidden">
        {AREAS.map((id, index) => (
          <li
            key={id}
            className="border-border flex flex-col gap-2 border-t py-5 last:border-b sm:flex-row sm:gap-8"
          >
            <span className="text-muted w-8 shrink-0 font-mono text-xs">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-medium">{t(`services.${id}.title`)}</h3>
              <p className="text-muted max-w-prose text-sm text-pretty">
                {t(`services.${id}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
