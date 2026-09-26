import { describe, expect, it } from 'vitest';

import { assertLocale, isLocale, LOCALE_REGIONS, LOCALES } from './locales';

describe('locales', () => {
  it('accepts every supported locale', () => {
    for (const locale of LOCALES) {
      expect(isLocale(locale)).toBe(true);
    }
  });

  it('rejects anything else', () => {
    expect(isLocale('pt')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it('gives every locale a region, because a bare tag is wrong outside i18n', () => {
    for (const locale of LOCALES) {
      expect(LOCALE_REGIONS[locale]).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
    }
  });

  it('throws on an unsupported route param instead of falling back', () => {
    expect(() => assertLocale('pt')).toThrow(/Unsupported locale/);
    expect(assertLocale('es')).toBe('es');
  });
});
