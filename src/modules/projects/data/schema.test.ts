import { describe, expect, it } from 'vitest';

import { frontmatterSchema } from './schema';

const valid = {
  title: 'A project',
  summary: 'One line about it.',
  role: 'Sole developer',
  stack: ['TypeScript'],
  skills: ['fullstack'],
  theme: 'base',
};

describe('frontmatterSchema', () => {
  it('accepts the minimum a case study needs', () => {
    const parsed = frontmatterSchema.parse(valid);

    expect(parsed.draft).toBe(false);
    expect(parsed.featured).toBe(false);
    expect(parsed.links).toEqual({});
    expect(parsed.period).toBeUndefined();
  });

  it('rejects a theme that is not in the registry', () => {
    expect(() => frontmatterSchema.parse({ ...valid, theme: 'cyberpunk' })).toThrow();
  });

  it('accepts a registered world', () => {
    expect(frontmatterSchema.parse({ ...valid, theme: 'markets' }).theme).toBe('markets');
  });

  it('rejects an unknown key, so a typo cannot drop a value silently', () => {
    expect(() => frontmatterSchema.parse({ ...valid, sumary: 'typo' })).toThrow();
  });

  it('rejects a skill outside the closed set', () => {
    expect(() => frontmatterSchema.parse({ ...valid, skills: ['devops'] })).toThrow();
  });

  it('rejects a link that is not a URL', () => {
    expect(() => frontmatterSchema.parse({ ...valid, links: { demo: 'stm.co' } })).toThrow();
  });
});
