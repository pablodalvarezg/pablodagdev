import { describe, expect, it } from 'vitest';

import { formatPeriod, sortByRecency, spanOf, timelineBar, type Role, type RoleId } from './role';

const role = (id: RoleId, start: string, end: string | null = null): Role => ({
  id,
  company: id,
  title: id,
  start,
  end,
});

const TODAY = '2026-09';

describe('sortByRecency', () => {
  it('puts the most recent start first', () => {
    const sorted = sortByRecency([
      role('freelance', '2022-01'),
      role('assisted-living', '2025-07'),
    ]);
    expect(sorted.map((r) => r.id)).toEqual(['assisted-living', 'freelance']);
  });

  it('does not mutate its input', () => {
    const roles = [role('freelance', '2022-01'), role('assisted-living', '2025-07')];
    sortByRecency(roles);
    expect(roles.map((r) => r.id)).toEqual(['freelance', 'assisted-living']);
  });
});

describe('formatPeriod', () => {
  it('renders both ends as MM/YYYY', () => {
    expect(formatPeriod(role('activa', '2023-07', '2024-10'), 'present')).toBe('07/2023 – 10/2024');
  });

  it('uses the caller label when the role is current', () => {
    expect(formatPeriod(role('assisted-living', '2025-07'), 'hoy')).toBe('07/2025 – hoy');
  });
});

describe('spanOf', () => {
  it('runs from the earliest start to today when a role is open', () => {
    const span = spanOf(
      [role('freelance', '2022-01'), role('activa', '2023-07', '2024-10')],
      TODAY,
    );
    expect(span).toEqual({ start: '2022-01', end: TODAY });
  });

  it('never ends before today, so an open role reaches the edge', () => {
    const span = spanOf([role('activa', '2023-07', '2024-10')], TODAY);
    expect(span.end).toBe(TODAY);
  });
});

describe('timelineBar', () => {
  const span = { start: '2022-01', end: '2026-01' };

  it('gives a role starting at the span start a zero offset', () => {
    expect(timelineBar(role('freelance', '2022-01'), span, '2026-01').offset).toBe(0);
  });

  it('spans the full width for a role open since the beginning', () => {
    const bar = timelineBar(role('freelance', '2022-01'), span, '2026-01');
    expect(bar.width).toBe(100);
  });

  it('places a later role proportionally', () => {
    // Half of a four-year span is two years in.
    const bar = timelineBar(role('activa', '2024-01', '2026-01'), span, '2026-01');
    expect(bar.offset).toBeCloseTo(50, 5);
    expect(bar.width).toBeCloseTo(50, 5);
  });

  it('never lets a bar run past the end of the span', () => {
    const bar = timelineBar(role('sidetool', '2025-01'), span, '2026-01');
    expect(bar.offset + bar.width).toBeLessThanOrEqual(100);
  });

  it('keeps a one-month role visible rather than zero width', () => {
    const bar = timelineBar(role('sidetool', '2024-01', '2024-01'), span, '2026-01');
    expect(bar.width).toBeGreaterThan(0);
  });
});
