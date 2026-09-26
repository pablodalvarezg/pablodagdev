import { describe, expect, it } from 'vitest';

import { openGraphBase } from './open-graph';

const base = { title: 'A title', description: 'A description.' } as const;

describe('openGraphBase', () => {
  it('qualifies og:locale with a region and an underscore', () => {
    // Open Graph does not take a BCP 47 tag: `es` alone is not a valid og:locale.
    expect(openGraphBase({ ...base, locale: 'en' }).locale).toBe('en_US');
    expect(openGraphBase({ ...base, locale: 'es' }).locale).toBe('es_AR');
  });

  it('lists the other locales as alternates and never itself', () => {
    expect(openGraphBase({ ...base, locale: 'es' }).alternateLocale).toEqual(['en_US']);
    expect(openGraphBase({ ...base, locale: 'en' }).alternateLocale).toEqual(['es_AR']);
  });

  it('omits url and images while there is no domain', () => {
    const og = openGraphBase({ ...base, locale: 'en' });

    expect(og).not.toHaveProperty('url');
    expect(og).not.toHaveProperty('images');
  });
});
