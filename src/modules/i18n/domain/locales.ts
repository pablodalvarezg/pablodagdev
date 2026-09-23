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
