/** 0 is a day with nothing, 4 the busiest quartile. GitHub decides the cut points. */
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  count: number;
  level: ContributionLevel;
}

/** The fewest and most contributions seen on a day at one level. */
export interface LevelRange {
  min: number;
  max: number;
}

/**
 * What each colour means in contributions per day, from the days actually seen.
 * GitHub sends the level but not its thresholds, so the observed range is what
 * there is to show. Null for a level no day reached.
 */
export function levelRanges(days: ContributionDay[]): (LevelRange | null)[] {
  const ranges: (LevelRange | null)[] = [null, null, null, null, null];
  for (const { count, level } of days) {
    const range = ranges[level];
    ranges[level] = range
      ? { min: Math.min(range.min, count), max: Math.max(range.max, count) }
      : { min: count, max: count };
  }
  return ranges;
}

/**
 * UTC on both ends: a date string parsed and printed in local time can land on
 * the previous day, and on the first of the month that is the wrong month.
 */
const parse = (date: string) => new Date(`${date}T00:00:00Z`);

/** 0 for Sunday through 6 for Saturday: the column a day takes in the calendar. */
export function weekdayOf(date: string): number {
  return parse(date).getUTCDay();
}

/** Short weekday names, Sunday first like GitHub's own graph: "Sun" … "Sat". */
export function weekdayNames(locale: string): string[] {
  const format = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  // 2026-10-04 is a Sunday; any Sunday would do.
  return Array.from({ length: 7 }, (_, i) => format.format(Date.UTC(2026, 9, 4 + i)));
}

/** A day as a person reads it, for the tooltip: "Mon, Oct 5". */
export function formatDay(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(parse(date));
}
