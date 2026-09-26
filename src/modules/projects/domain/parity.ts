import type { Locale } from '@modules/i18n';

/** One locale's case studies as the parity rules see them: slug to draft flag. */
export interface LocaleDrafts {
  locale: Locale;
  drafts: Record<string, boolean>;
}

/**
 * Why a set of case studies cannot ship, or null when it can.
 *
 * A slug is what pairs two translations, so every gap here ends the same way: one
 * language has a page and the other does not, the switcher links to a 404, and
 * nothing errors. Two invariants, with a message each because the fixes differ —
 * a missing file is a translation nobody wrote, a disagreeing `draft` is one that
 * exists and was left unpublished.
 *
 * Returns the message instead of throwing so the rule stays a pure function; the
 * data layer is what turns it into a failed build.
 */
export function parityError(perLocale: readonly LocaleDrafts[]): string | null {
  const [reference, ...rest] = perLocale;

  if (!reference) return null;

  const referenceSlugs = Object.keys(reference.drafts);

  for (const { locale, drafts } of rest) {
    const slugs = Object.keys(drafts);
    const missing = referenceSlugs.filter((slug) => !slugs.includes(slug));
    const extra = slugs.filter((slug) => !referenceSlugs.includes(slug));

    if (missing.length > 0 || extra.length > 0) {
      return (
        `Case studies must exist in every locale. ` +
        `'${locale}' is missing [${missing.join(', ')}] and has extra [${extra.join(', ')}] ` +
        `compared to '${reference.locale}'.`
      );
    }

    const disagreeing = referenceSlugs.filter((slug) => drafts[slug] !== reference.drafts[slug]);

    if (disagreeing.length > 0) {
      return (
        `A case study must be a draft in every locale or in none. ` +
        `[${disagreeing.join(', ')}] disagree between '${reference.locale}' and '${locale}', ` +
        `so one language would ship a page the other does not.`
      );
    }
  }

  return null;
}
