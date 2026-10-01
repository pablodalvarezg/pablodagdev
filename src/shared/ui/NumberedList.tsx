/**
 * A numbered run of title-and-body rows: the site's one shape for "a list of
 * things I do". Specialties and services are different questions with the same
 * answer shape, and having them drift apart visually would read as two designs
 * rather than two sections.
 *
 * The number is decorative — it counts rows, it does not rank them — so it stays
 * out of the accessible name and the list is the semantics a reader gets.
 */
export function NumberedList({
  items,
}: {
  items: readonly { id: string; title: string; body: string }[];
}) {
  return (
    <ul className="grid gap-px overflow-hidden">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="border-border flex flex-col gap-2 border-t py-5 last:border-b sm:flex-row sm:gap-8"
        >
          <span aria-hidden className="text-muted w-8 shrink-0 font-mono text-xs">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-muted max-w-prose text-sm text-pretty">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
