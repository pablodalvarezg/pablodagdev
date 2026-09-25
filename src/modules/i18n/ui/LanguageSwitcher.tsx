'use client';

import { usePathname } from 'next/navigation';

import { LOCALES, type Locale } from '../domain/locales';
import { localeUrl, pathWithoutLocale } from '../domain/paths';

/**
 * Client because a Server Component does not know the pathname, and deriving it
 * is the point: when this took the path as a prop, a page that forgot to pass
 * it linked to the locale home instead of its own translation, with no error
 * and no failing build.
 */
export function LanguageSwitcher({
  locale,
  label,
  names,
}: {
  locale: Locale;
  label: string;
  names: Record<Locale, string>;
}) {
  const path = pathWithoutLocale(usePathname());

  return (
    <nav aria-label={label}>
      <ul className="flex gap-3 font-mono text-xs">
        {LOCALES.map((candidate) => (
          <li key={candidate}>
            <a
              href={localeUrl(candidate, path)}
              hrefLang={candidate}
              lang={candidate}
              aria-current={candidate === locale ? 'page' : undefined}
              className="text-muted aria-[current]:text-fg underline-offset-4 transition-colors hover:underline"
            >
              {names[candidate]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
