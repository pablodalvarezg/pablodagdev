import { describe, expect, it } from 'vitest';

import { publishedProjects, sortProjects, type Project } from './project';

const project = (overrides: Partial<Project>): Project => ({
  slug: 'a',
  title: 'A',
  summary: '',
  role: '',
  stack: [],
  skills: [],
  theme: 'base',
  links: {},
  featured: false,
  draft: false,
  ...overrides,
});

describe('sortProjects', () => {
  it('puts featured projects first', () => {
    const sorted = sortProjects([
      project({ slug: 'plain' }),
      project({ slug: 'starred', featured: true }),
    ]);

    expect(sorted.map((p) => p.slug)).toEqual(['starred', 'plain']);
  });

  it('orders by slug within a group, so two builds agree', () => {
    const sorted = sortProjects([project({ slug: 'c' }), project({ slug: 'a' })]);

    expect(sorted.map((p) => p.slug)).toEqual(['a', 'c']);
  });

  it('leaves the input untouched', () => {
    const input = [project({ slug: 'b' }), project({ slug: 'a' })];
    sortProjects(input);

    expect(input.map((p) => p.slug)).toEqual(['b', 'a']);
  });
});

describe('publishedProjects', () => {
  const projects = [project({ slug: 'done' }), project({ slug: 'wip', draft: true })];

  it('drops drafts when they are not included', () => {
    expect(publishedProjects(projects, false).map((p) => p.slug)).toEqual(['done']);
  });

  it('keeps drafts while developing', () => {
    expect(publishedProjects(projects, true)).toHaveLength(2);
  });
});
