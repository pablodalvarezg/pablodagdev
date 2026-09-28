import { describe, expect, it } from 'vitest';

import { parityError } from './parity';

describe('parityError', () => {
  it('passes when every locale ships the same set', () => {
    expect(
      parityError([
        { locale: 'en', shared: { stm: { draft: false }, atlas: { draft: true } } },
        { locale: 'es', shared: { stm: { draft: false }, atlas: { draft: true } } },
      ]),
    ).toBeNull();
  });

  it('catches a translation nobody wrote', () => {
    const error = parityError([
      { locale: 'en', shared: { stm: { draft: false }, atlas: { draft: false } } },
      { locale: 'es', shared: { stm: { draft: false } } },
    ]);

    expect(error).toMatch(/must exist in every locale/);
    expect(error).toContain('atlas');
  });

  it('catches a file that exists in one locale only', () => {
    expect(
      parityError([
        { locale: 'en', shared: { stm: { draft: false } } },
        { locale: 'es', shared: { stm: { draft: false }, atlas: { draft: false } } },
      ]),
    ).toContain('has extra [atlas]');
  });

  it('catches a draft flag that disagrees, which is the quiet one', () => {
    // Both files exist, both parse, the build succeeds, and Spanish silently has
    // no page: the failure this whole function exists to prevent.
    const error = parityError([
      { locale: 'en', shared: { stm: { draft: false } } },
      { locale: 'es', shared: { stm: { draft: true } } },
    ]);

    expect(error).toMatch(/'draft' describes the project/);
    expect(error).toContain('stm');
  });

  it('catches a cover that only one locale has', () => {
    // Quieter still: both pages ship and one of them just opens without the
    // screenshot. Nothing in a build log would say so.
    const error = parityError([
      { locale: 'en', shared: { stm: { draft: false, cover: '/case-studies/stm/catalog.webp' } } },
      { locale: 'es', shared: { stm: { draft: false } } },
    ]);

    expect(error).toMatch(/'cover' describes the project/);
    expect(error).toContain('stm');
  });

  it('has nothing to compare with a single locale', () => {
    expect(parityError([{ locale: 'en', shared: { stm: { draft: true } } }])).toBeNull();
    expect(parityError([])).toBeNull();
  });
});
