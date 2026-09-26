import { LOCALE_REGIONS, LOCALES, type Locale } from '@modules/i18n';
import { site } from '@shared/config/site';

/** og:locale takes a region-qualified tag with an underscore, not a BCP 47 one. */
function ogLocale(locale: Locale): string {
  return LOCALE_REGIONS[locale].replace('-', '_');
}

/**
 * The Open Graph fields every page shares. The page adds its own `type` rather
 * than passing one in, which keeps that literal narrow enough for Next's
 * metadata types to check without a generic here.
 *
 * No `url` and no `images`: both need the domain. Omitted rather than guessed,
 * because a wrong og:url is worse than an absent one — it makes every share
 * point at a page that is not the one being shared.
 */
export function openGraphBase({
  title,
  description,
  locale,
}: {
  title: string;
  description: string;
  locale: Locale;
}) {
  return {
    title,
    description,
    siteName: site.name,
    locale: ogLocale(locale),
    alternateLocale: LOCALES.filter((other) => other !== locale).map(ogLocale),
  };
}
