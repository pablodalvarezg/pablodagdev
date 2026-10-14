import { describe, expect, it } from 'vitest';

import {
  formatDay,
  levelRanges,
  weekdayNames,
  weekdayOf,
  type ContributionLevel,
} from './calendar';

describe('levelRanges', () => {
  it('reports the fewest and most contributions seen at each level', () => {
    const counts = [0, 1, 2, 4, 3, 9, 12, 0];
    const levels: ContributionLevel[] = [0, 1, 1, 2, 2, 4, 4, 0];
    const days = counts.map((count, i) => ({ date: '2026-10-04', count, level: levels[i]! }));

    expect(levelRanges(days)).toEqual([
      { min: 0, max: 0 },
      { min: 1, max: 2 },
      { min: 3, max: 4 },
      null,
      { min: 9, max: 12 },
    ]);
  });
});

describe('formatDay', () => {
  it('prints the date it was given, not the day before', () => {
    // Read in local time west of UTC, this would come out as Sep 30.
    expect(formatDay('2026-10-01', 'en-US')).toBe('Thu, Oct 1');
  });
});

describe('weekdayOf', () => {
  it('puts a day in its weekday column, Sunday first, whatever the local timezone', () => {
    expect(weekdayOf('2026-10-04')).toBe(0);
    expect(weekdayOf('2026-10-13')).toBe(2);
    expect(weekdayOf('2026-10-10')).toBe(6);
  });
});

describe('weekdayNames', () => {
  it('names the seven columns, Sunday first, in the given locale', () => {
    expect(weekdayNames('en-US')).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    expect(weekdayNames('es-AR')[1]).toMatch(/^lun/);
  });
});
