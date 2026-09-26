/**
 * A project that does not exist yet, in the same grid as the ones that do.
 *
 * Deliberately not a link and not focusable: there is nothing to navigate to,
 * and a card that takes focus to go nowhere is worse than one that does not.
 * The dashed border carries the difference for anyone who skips the label.
 */
export function UpcomingCard({
  title,
  summary,
  label,
}: {
  title: string;
  summary: string;
  label: string;
}) {
  return (
    <li className="rise border-border flex h-full flex-col gap-3 border border-dashed p-6">
      <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">{label}</p>
      <h3 className="text-muted text-lg font-semibold">{title}</h3>
      <p className="text-muted text-pretty">{summary}</p>
    </li>
  );
}
