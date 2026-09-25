import { describe, expect, it } from 'vitest';

import { DEFAULT_THEME, THEME_NAMES } from './theme-registry';

describe('theme registry', () => {
  it('registers the default theme', () => {
    expect(THEME_NAMES).toContain(DEFAULT_THEME);
  });

  it('holds no duplicates, which would make two worlds share a name', () => {
    expect(new Set(THEME_NAMES).size).toBe(THEME_NAMES.length);
  });
});
