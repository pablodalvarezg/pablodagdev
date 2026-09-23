import { describe, expect, it } from 'vitest';

import { getTranslations, TRANSLATION_KEYS } from './dictionaries';
import { LOCALES } from './locales';

describe('dictionaries', () => {
  it('resolves every key in every locale', () => {
    expect(TRANSLATION_KEYS.length).toBeGreaterThan(0);

    for (const locale of LOCALES) {
      const t = getTranslations(locale);
      for (const key of TRANSLATION_KEYS) {
        expect(t(key), `${locale} / ${key}`).toBeTruthy();
      }
    }
  });

  it('actually translates rather than repeating English', () => {
    const en = getTranslations('en');
    const es = getTranslations('es');
    const differing = TRANSLATION_KEYS.filter((key) => en(key) !== es(key));

    // Some values are proper nouns and identical on purpose; most are not.
    expect(differing.length).toBeGreaterThan(TRANSLATION_KEYS.length / 2);
  });
});
