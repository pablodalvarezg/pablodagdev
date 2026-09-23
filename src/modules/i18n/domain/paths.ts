import { LOCALES, type Locale } from './locales';

/**
 * Strips the locale prefix from a pathname so the path can be rebuilt for another
 * locale. Returns the path without leading or trailing slashes.
 */
export function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if ((LOCALES as readonly string[]).includes(segments[0])) {
    segments.shift();
  }

  return segments.join('/');
}

/**
 * Builds an in-site URL for a locale. The trailing slash is deliberate: with
 * `trailingSlash: true` that is the URL actually served, and a link or a
 * canonical without it points at a redirect.
 */
export function localeUrl(locale: Locale, path = ''): string {
  return path ? `/${locale}/${path}/` : `/${locale}/`;
}
