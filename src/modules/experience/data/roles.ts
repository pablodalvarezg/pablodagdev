import type { Role } from '../domain/role';

/**
 * The timeline is small and stable, so it lives here rather than in a content
 * collection. Only this file changes if it ever moves to one.
 */
const ROLES: readonly Role[] = [
  {
    id: 'assisted-living',
    company: 'Assisted Living Magazine',
    title: 'Full-Stack & WordPress Developer',
    start: '2025-07',
    end: null,
  },
  {
    id: 'sidetool',
    company: 'Sidetool',
    title: 'Full-Stack & Low/No-Code Developer',
    start: '2024-10',
    end: '2025-07',
  },
  {
    id: 'activa',
    company: 'Activa Soluciones IT',
    title: 'IT Consultant',
    start: '2023-07',
    end: '2024-10',
  },
  {
    id: 'freelance',
    company: 'Freelance',
    title: 'Web Developer',
    start: '2022-01',
    end: null,
  },
];

export function getRoles(): readonly Role[] {
  return ROLES;
}

/**
 * Today as `YYYY-MM`. Ambient, non-deterministic input, so it lives out here
 * rather than in domain. On a static export this is the build month, which is
 * the honest answer: the page says what was true when it was built.
 */
export function currentMonth(now: Date = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}
