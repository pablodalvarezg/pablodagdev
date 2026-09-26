import { describe, expect, it } from 'vitest';

import { site } from '@shared/config/site';

import { personSchema } from './person';

const schema = personSchema({ jobTitle: 'Full-Stack Developer', description: 'A description.' });

describe('personSchema', () => {
  it('declares the vocabulary and the type a parser needs', () => {
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Person');
  });

  it('takes the localised copy from the caller', () => {
    expect(schema.jobTitle).toBe('Full-Stack Developer');
    expect(schema.description).toBe('A description.');
  });

  it('links the profiles that prove the identity', () => {
    expect(schema.sameAs).toEqual([site.linkedin, site.github]);
    expect(schema.email).toBe(`mailto:${site.email}`);
  });

  it('omits url and image while there is no domain', () => {
    // A placeholder domain here would publish a canonical identity pointing at a
    // page that does not exist, which is worse than saying nothing.
    expect(schema).not.toHaveProperty('url');
    expect(schema).not.toHaveProperty('image');
  });
});
