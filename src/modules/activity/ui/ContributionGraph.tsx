import { getTranslations, LOCALE_REGIONS, type Locale, type TranslationKey } from '@modules/i18n';
import { site } from '@shared/config/site';

import {
  formatDay,
  levelRanges,
  weekdayNames,
  weekdayOf,
  type ContributionDay,
} from '../domain/calendar';

/** The window shown. The dictionary says "30 days", so the two change together. */
const DAYS = 30;

/**
 * Indexed by ContributionLevel: a tint of the accent, and the text that clears
 * AA on it in both schemes. The alphas are picked for that text, not by eye —
 * between 40% and 85% no single token reads in both light and dark, which is
 * why the scale jumps there. Re-check the pairs if the accent changes.
 */
const LEVEL_CLASSES = [
  'bg-border text-muted',
  'bg-accent/20 text-fg',
  'bg-accent/40 text-fg',
  'bg-accent/85 text-accent-fg',
  'bg-accent text-accent-fg',
] as const;

/**
 * Which way a tooltip opens. At 360 px a tooltip is wider than half the grid,
 * so the left of the week opens rightward, the right leftward, and Wednesday —
 * which has room on neither side — from its centre.
 */
function tooltipSide(weekday: number) {
  if (weekday < 3) return 'left-0';
  if (weekday > 3) return 'right-0';
  return 'left-1/2 -translate-x-1/2';
}

/**
 * The last 30 days of GitHub contributions laid out as a calendar: a column per
 * weekday, a row per week. Rendered on the server, with CSS tooltips, so no
 * script reaches the browser.
 */
export function ContributionGraph({ days, locale }: { days: ContributionDay[]; locale: Locale }) {
  const t = getTranslations(locale);
  const region = LOCALE_REGIONS[locale];
  const plural = new Intl.PluralRules(region);
  const counted = (n: number, one: TranslationKey, other: TranslationKey) =>
    t(plural.select(n) === 'one' ? one : other);

  const recent = days.slice(-DAYS);
  const total = recent.reduce((sum, day) => sum + day.count, 0);
  // Over the whole year, because that is what GitHub's levels are cut from.
  const ranges = levelRanges(days);

  return (
    <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-16">
      <div className="flex w-full max-w-xs flex-col gap-3">
        <p className="text-muted font-mono text-xs">
          {formatDay(recent[0]!.date, region)} – {formatDay(recent.at(-1)!.date, region)}
        </p>

        <div className="flex flex-col gap-1.5">
          {/* Every day already says its weekday to a screen reader. */}
          <div
            aria-hidden
            className="text-muted grid grid-cols-7 gap-1.5 text-center font-mono text-xs"
          >
            {weekdayNames(region).map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>

          <ol aria-label={t('activity.graph')} className="grid grid-cols-7 gap-1.5">
            {recent.map((day, index) => {
              const weekday = weekdayOf(day.date);
              const count = `${day.count} ${counted(day.count, 'activity.contribution.one', 'activity.contribution.other')}`;
              const date = formatDay(day.date, region);
              return (
                <li
                  key={day.date}
                  // The first day sits under its own weekday; the rest flow after it.
                  style={index === 0 ? { gridColumnStart: weekday + 1 } : undefined}
                  className={`group/day hover:ring-muted rounded-base relative flex aspect-square items-center justify-center font-mono text-xs hover:ring-2 ${LEVEL_CLASSES[day.level]}`}
                >
                  <span aria-hidden>{Number(day.date.slice(8))}</span>
                  <span className="sr-only">
                    {date}: {count}
                  </span>
                  {/*
                    The tooltip is for the pointer; the sr-only line above already
                    says the same to assistive tech. Hidden with display rather
                    than opacity: an invisible box still counts toward overflow.
                  */}
                  <span
                    aria-hidden
                    className={`bg-fg text-bg rounded-base pointer-events-none absolute bottom-full z-10 mb-2 hidden px-2.5 py-1.5 font-sans whitespace-nowrap group-hover/day:block ${tooltipSide(weekday)}`}
                  >
                    <span className="font-semibold">{count}</span> · {date}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="flex flex-col gap-1">
          <span className="text-4xl font-semibold tabular-nums">
            {new Intl.NumberFormat(region).format(total)}
          </span>
          <span className="text-muted text-sm">
            {counted(total, 'activity.total.one', 'activity.total.other')}
          </span>
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
            {t('activity.legend')}
          </p>
          <ul className="flex gap-3">
            {ranges.map((range, level) =>
              range ? (
                <li key={level} className="flex flex-col items-center gap-1.5">
                  <span className={`rounded-base size-4 ${LEVEL_CLASSES[level]}`} />
                  <span className="text-muted font-mono text-xs">
                    {range.min === range.max ? range.min : `${range.min}–${range.max}`}
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        </div>

        <a
          href={site.github}
          className="hover:text-accent text-sm underline-offset-4 transition-colors hover:underline"
        >
          {t('activity.profile')}
        </a>
      </div>
    </div>
  );
}
