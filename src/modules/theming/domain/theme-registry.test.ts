import { describe, expect, it } from 'vitest';

import { DEFAULT_THEME, isThemeName, THEME_NAMES } from './theme-registry';

describe('theme registry', () => {
  it('accepts every registered name', () => {
    for (const name of THEME_NAMES) {
      expect(isThemeName(name)).toBe(true);
    }
  });

  it('rejects names that are not registered', () => {
    expect(isThemeName('vigil')).toBe(false);
    expect(isThemeName('')).toBe(false);
    expect(isThemeName(undefined)).toBe(false);
  });

  it('registers the default theme', () => {
    expect(isThemeName(DEFAULT_THEME)).toBe(true);
  });
});
