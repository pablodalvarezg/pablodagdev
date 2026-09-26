import { describe, expect, it } from 'vitest';

import { parityError } from './parity';

describe('parityError', () => {
  it('passes when every locale ships the same set', () => {
    expect(
      parityError([
        { locale: 'en', drafts: { stm: false, atlas: true } },
        { locale: 'es', drafts: { stm: false, atlas: true } },
      ]),
    ).toBeNull();
  });

  it('catches a translation nobody wrote', () => {
    const error = parityError([
      { locale: 'en', drafts: { stm: false, atlas: false } },
      { locale: 'es', drafts: { stm: false } },
    ]);

    expect(error).toMatch(/must exist in every locale/);
    expect(error).toContain('atlas');
  });

  it('catches a file that exists in one locale only', () => {
    expect(
      parityError([
        { locale: 'en', drafts: { stm: false } },
        { locale: 'es', drafts: { stm: false, atlas: false } },
      ]),
    ).toContain('has extra [atlas]');
  });

  it('catches a draft flag that disagrees, which is the quiet one', () => {
    // Both files exist, both parse, the build succeeds, and Spanish silently has
    // no page: the failure this whole function exists to prevent.
    const error = parityError([
      { locale: 'en', drafts: { stm: false } },
      { locale: 'es', drafts: { stm: true } },
    ]);

    expect(error).toMatch(/draft in every locale or in none/);
    expect(error).toContain('stm');
  });

  it('has nothing to compare with a single locale', () => {
    expect(parityError([{ locale: 'en', drafts: { stm: true } }])).toBeNull();
    expect(parityError([])).toBeNull();
  });
});
