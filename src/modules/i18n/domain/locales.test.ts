import { describe, expect, it } from 'vitest';

import { assertLocale, DEFAULT_LOCALE, FORMATTING_LOCALES, isLocale, LOCALES } from './locales';

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

describe('formatting locales', () => {
  it('covers every locale', () => {
    for (const locale of LOCALES) {
      expect(FORMATTING_LOCALES[locale]).toBeTruthy();
    }
  });

  it('carries a region, which is what makes numbers group', () => {
    for (const locale of LOCALES) {
      const tag = FORMATTING_LOCALES[locale];
      expect(tag, `${locale} -> ${tag}`).toMatch(/^[a-z]{2}-[A-Z]{2}$/);

      const formatted = new Intl.NumberFormat(tag).format(1200);
      expect(formatted, `${tag} grouped 1200`).not.toBe('1200');
    }
  });
});
