import { FORMATTING_LOCALES, getTranslations, type Locale } from '@modules/i18n';
import { Section } from '@shared/ui/Section';

/**
 * The amounts are the same number in both languages; only the copy around them
 * is translated, and the formatting follows the reader's locale.
 *
 * `from` prices are floors, not quotes: the copy says what moves them.
 */
const SERVICES = [
  { id: 'website', amount: 1200, unit: 'from' },
  { id: 'tooling', amount: 800, unit: 'from' },
  { id: 'consulting', amount: 25, unit: 'hour' },
] as const;

export function Pricing({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const money = new Intl.NumberFormat(FORMATTING_LOCALES[locale], {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <Section id="pricing" eyebrow={t('pricing.eyebrow')} title={t('pricing.title')}>
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col">
          {SERVICES.map(({ id, amount, unit }) => (
            <li
              key={id}
              className="border-border rise flex flex-col gap-3 border-t py-6 last:border-b sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div className="flex flex-col gap-1.5 sm:max-w-prose">
                <h3 className="font-medium">{t(`pricing.${id}.title`)}</h3>
                <p className="text-muted text-sm text-pretty">{t(`pricing.${id}.body`)}</p>
              </div>

              <p className="shrink-0 font-mono text-sm whitespace-nowrap sm:text-right">
                {unit === 'from' ? (
                  <span className="text-muted mr-1.5 text-xs tracking-wider uppercase">
                    {t('pricing.from')}
                  </span>
                ) : null}
                <span className="text-accent text-base">{money.format(amount)}</span>
                {unit === 'hour' ? (
                  <span className="text-muted ml-1.5 text-xs tracking-wider uppercase">
                    {t('pricing.perHour')}
                  </span>
                ) : null}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-muted max-w-prose text-sm text-pretty">{t('pricing.note')}</p>
      </div>
    </Section>
  );
}
