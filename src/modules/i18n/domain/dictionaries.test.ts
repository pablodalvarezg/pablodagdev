import { describe, expect, it } from 'vitest';

import { getTranslations, type TranslationKey } from './dictionaries';
import { LOCALES } from './locales';

const KEYS: TranslationKey[] = [
  'hero.role',
  'hero.location',
  'hero.tagline',
  'meta.home.description',
  'nav.language',
  'language.en',
  'language.es',
];

describe('dictionaries', () => {
  it('resolves every key in every locale', () => {
    for (const locale of LOCALES) {
      const t = getTranslations(locale);
      for (const key of KEYS) {
        expect(t(key)).not.toBe('');
      }
    }
  });

  it('translates the tagline per locale', () => {
    expect(getTranslations('en')('hero.tagline')).not.toBe(getTranslations('es')('hero.tagline'));
  });
});
