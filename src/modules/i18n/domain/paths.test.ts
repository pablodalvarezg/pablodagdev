import { describe, expect, it } from 'vitest';

import { localeUrl, pathWithoutLocale } from './paths';

describe('pathWithoutLocale', () => {
  it('drops the locale prefix', () => {
    expect(pathWithoutLocale('/en/')).toBe('');
    expect(pathWithoutLocale('/es/projects/vigil')).toBe('projects/vigil');
  });

  it('keeps a path that carries no locale', () => {
    expect(pathWithoutLocale('/')).toBe('');
    expect(pathWithoutLocale('/projects/vigil')).toBe('projects/vigil');
  });

  it('does not mistake a segment that merely starts like a locale', () => {
    expect(pathWithoutLocale('/english/posts')).toBe('english/posts');
  });
});

describe('localeUrl', () => {
  it('always ends in a slash, which is the URL actually served', () => {
    expect(localeUrl('en')).toBe('/en/');
    expect(localeUrl('es', 'projects/vigil')).toBe('/es/projects/vigil/');
  });

  it('round-trips with pathWithoutLocale', () => {
    const path = pathWithoutLocale('/en/projects/vigil/');
    expect(localeUrl('es', path)).toBe('/es/projects/vigil/');
  });
});
