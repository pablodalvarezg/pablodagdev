import { describe, expect, it } from 'vitest';

import { jsonLdScript } from './json-ld';

describe('jsonLdScript', () => {
  it('never emits a closing script tag', () => {
    // The shipped version of this replaced `<` with `<`, which is what a single
    // backslash means in a JS string literal. It read as a guard and was not one.
    const output = jsonLdScript({ jobTitle: 'Dev</script><img onerror=x>' });

    expect(output).not.toContain('</script>');
    expect(output).not.toContain('<');
  });

  it('survives the round trip, so escaping does not change the data', () => {
    const schema = { jobTitle: 'Dev</script>', name: 'Pablo' };

    expect(JSON.parse(jsonLdScript(schema))).toEqual(schema);
  });

  it('leaves ordinary content alone', () => {
    expect(jsonLdScript({ name: 'Pablo Álvarez Graña' })).toBe('{"name":"Pablo Álvarez Graña"}');
  });
});
