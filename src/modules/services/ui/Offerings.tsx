import { getTranslations, type Locale } from '@modules/i18n';
import { NumberedList } from '@shared/ui/NumberedList';

import { OFFERINGS } from '../domain/offerings';

/**
 * The offerings as a list, with no heading of its own: the page it sits on is
 * about exactly this, so the title belongs to the page's h1 and repeating it
 * here as an h2 would give one page two names for one thing.
 */
export function Offerings({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <NumberedList
      items={OFFERINGS.map((id) => ({
        id,
        title: t(`services.${id}.title`),
        body: t(`services.${id}.body`),
      }))}
    />
  );
}
