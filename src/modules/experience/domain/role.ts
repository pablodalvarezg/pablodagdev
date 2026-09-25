/** Registry of timeline entries; the ids key their copy in the dictionaries. */
export const ROLE_IDS = ['assisted-living', 'sidetool', 'activa', 'freelance'] as const;

export type RoleId = (typeof ROLE_IDS)[number];

/** A position in the work timeline. Dates are `YYYY-MM`; a null end means current. */
export interface Role {
  id: RoleId;
  company: string;
  title: string;
  start: string;
  end: string | null;
}

/** Inclusive span the whole timeline covers, in `YYYY-MM`. */
export interface Span {
  start: string;
  end: string;
}

/** Where a role's bar sits inside the span, as percentages of the full width. */
export interface Bar {
  offset: number;
  width: number;
}

const toMonths = (value: string): number => {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
};

const asMonthYear = (value: string): string => {
  const [year, month] = value.split('-');
  return `${month}/${year}`;
};

/** Most recent first, by start date. Two current roles may overlap. */
export function sortByRecency(roles: readonly Role[]): Role[] {
  return [...roles].sort((a, b) => b.start.localeCompare(a.start));
}

/**
 * Renders `MM/YYYY – MM/YYYY`, or the caller's label for an open end. The label
 * is passed in because this layer cannot reach the dictionaries.
 */
export function formatPeriod(role: Role, presentLabel: string): string {
  return `${asMonthYear(role.start)} – ${role.end ? asMonthYear(role.end) : presentLabel}`;
}

/**
 * The range every bar is measured against: the earliest start to whichever is
 * later, the latest end or today. `today` is a parameter so this stays pure and
 * the tests do not drift with the calendar.
 */
export function spanOf(roles: readonly Role[], today: string): Span {
  const starts = roles.map((role) => role.start);
  const ends = roles.map((role) => role.end ?? today);

  return {
    start: starts.reduce((a, b) => (a < b ? a : b)),
    end: [...ends, today].reduce((a, b) => (a > b ? a : b)),
  };
}

/**
 * A role's bar within the span. Open roles run to the end of the span, which is
 * what makes two simultaneous roles read as simultaneous instead of as a list.
 */
export function timelineBar(role: Role, span: Span, today: string): Bar {
  const from = toMonths(span.start);
  const total = toMonths(span.end) - from;

  if (total <= 0) {
    return { offset: 0, width: 100 };
  }

  const start = toMonths(role.start) - from;
  const end = toMonths(role.end ?? today) - from;
  const width = Math.max(end - start, 1);

  return {
    offset: (start / total) * 100,
    width: Math.min((width / total) * 100, 100 - (start / total) * 100),
  };
}
