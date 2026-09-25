import { formatPeriod, sortByRecency, spanOf, timelineBar, type Role } from '../domain/role';

interface Props {
  roles: readonly Role[];
  today: string;
  presentLabel: string;
  /** One summary per role id, resolved by the caller: ui does not translate. */
  summaries: Record<string, string>;
}

export function Timeline({ roles, today, presentLabel, summaries }: Props) {
  const ordered = sortByRecency(roles);
  const span = spanOf(roles, today);

  return (
    <ol className="flex flex-col">
      {ordered.map((role) => {
        const bar = timelineBar(role, span, today);
        const ongoing = role.end === null;

        return (
          <li
            key={role.id}
            className="border-border rise grid grid-cols-[auto_1fr] gap-x-4 border-t py-6 last:border-b"
          >
            <span
              aria-hidden="true"
              className={`rounded-base mt-1.5 h-2 w-2 ${ongoing ? 'bg-accent' : 'border-muted border'}`}
            />

            <div className="flex flex-col gap-2">
              <p className="text-muted font-mono text-xs tracking-wider">
                {formatPeriod(role, presentLabel)}
              </p>

              <div className="flex flex-col gap-0.5">
                <h3 className="font-medium">{role.title}</h3>
                <p className="text-muted text-sm">{role.company}</p>
              </div>

              {/*
                The bar is the point of this timeline: two of these roles run at
                the same time, and a stacked list reads as a sequence. Decorative
                on its own, so it is hidden from assistive tech: the dates above
                already say the same thing in words.
              */}
              <div
                aria-hidden="true"
                className="bg-border relative mt-1 h-1 w-full overflow-hidden"
              >
                <span
                  className={`absolute inset-y-0 ${ongoing ? 'bg-accent' : 'bg-secondary'}`}
                  style={{ left: `${bar.offset}%`, width: `${bar.width}%` }}
                />
              </div>

              <p className="max-w-prose pt-1 text-sm text-pretty">{summaries[role.id]}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
