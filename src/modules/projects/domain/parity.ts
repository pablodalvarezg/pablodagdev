import type { Locale } from '@modules/i18n';

/**
 * The frontmatter that describes the project rather than the translation. It is
 * copied into every locale's file, so nothing but this rule keeps the copies
 * from drifting apart. `cover` is the path only: its alt is prose and differs
 * between languages on purpose.
 */
export interface SharedFields {
  draft: boolean;
  cover?: string;
}

/** Compared one at a time so the message can name the field that drifted. */
const SHARED_FIELDS = ['draft', 'cover'] as const satisfies readonly (keyof SharedFields)[];

/** One locale as the parity rules see it: slug to the fields that must match. */
export interface LocaleFields {
  locale: Locale;
  shared: Record<string, SharedFields>;
}

/**
 * Why a set of case studies cannot ship, or null when it can.
 *
 * A slug is what pairs two translations, so every gap here ends the same way: the
 * two languages ship different things and nothing errors. A missing file is the
 * loud version — the switcher links to a 404 — and a field that disagrees is the
 * quiet one: both pages build, and one of them is simply poorer.
 *
 * Returns the message instead of throwing so the rule stays a pure function; the
 * data layer is what turns it into a failed build.
 */
export function parityError(perLocale: readonly LocaleFields[]): string | null {
  const [reference, ...rest] = perLocale;

  if (!reference) return null;

  const referenceSlugs = Object.keys(reference.shared);

  for (const { locale, shared } of rest) {
    const slugs = Object.keys(shared);
    const missing = referenceSlugs.filter((slug) => !slugs.includes(slug));
    const extra = slugs.filter((slug) => !referenceSlugs.includes(slug));

    if (missing.length > 0 || extra.length > 0) {
      return (
        `Case studies must exist in every locale. ` +
        `'${locale}' is missing [${missing.join(', ')}] and has extra [${extra.join(', ')}] ` +
        `compared to '${reference.locale}'.`
      );
    }

    for (const field of SHARED_FIELDS) {
      const disagreeing = referenceSlugs.filter(
        (slug) => shared[slug][field] !== reference.shared[slug][field],
      );

      if (disagreeing.length > 0) {
        return (
          `'${field}' describes the project, not the translation, so it must match in every locale. ` +
          `[${disagreeing.join(', ')}] disagree between '${reference.locale}' and '${locale}', ` +
          `so the two languages would not ship the same page.`
        );
      }
    }
  }

  return null;
}
