/** Single source of supported locales. generateStaticParams reads this directly. */
export const LOCALES = ['en', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * The region each locale means. A bare language tag is enough to pick a
 * dictionary and wrong everywhere else: og:locale wants a region, and so does
 * anything formatting a number or a date, where plain `es` prints 1200 as
 * "1200 US$" while `es-AR` gives "US$ 1.200".
 */
export const LOCALE_REGIONS: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-AR',
};

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
