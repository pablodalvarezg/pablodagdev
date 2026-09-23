import { describe, expect, it } from 'vitest';

import { assertLocale, DEFAULT_LOCALE, isLocale, LOCALES } from './locales';

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

  it('registers the default locale', () => {
    expect(isLocale(DEFAULT_LOCALE)).toBe(true);
  });

  it('throws on an unsupported route param instead of falling back', () => {
    expect(() => assertLocale('pt')).toThrow(/Unsupported locale/);
    expect(assertLocale('es')).toBe('es');
  });
});
