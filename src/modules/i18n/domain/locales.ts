/** Single source of supported locales. generateStaticParams reads this directly. */
export const LOCALES = ['en', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Narrows a route param, failing loudly instead of silently serving the default. */
export function assertLocale(value: unknown): Locale {
  if (!isLocale(value)) {
    throw new Error(`Unsupported locale: ${String(value)}`);
  }
  return value;
}

/**
 * BCP 47 tags for Intl formatting. A bare language tag is not enough: 'es'
 * formats 1200 as '1200 US$' with no grouping at all, while 'es-AR' gives
 * 'US$ 1.200'. Numbers and dates need the region, even when the copy does not.
 */
export const FORMATTING_LOCALES: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-AR',
};
