import { Button } from '@shared/ui/Button';
import type { Project } from '../domain/project';

/**
 * A project in the hub grid. Keeps the hub's neutral tokens rather than the
 * project's world: the grid is a list, not a preview of each theme.
 *
 * The button is the card's only link and it stretches over the whole card, so
 * the surface stays clickable for anyone who already expects that, without
 * nesting interactive elements or repeating the destination in the tab order.
 *
 * The title rides along inside the link, hidden visually: the label alone is
 * the same string on every card, and a list of identical links is what a screen
 * reader would otherwise get out of this grid.
 */
export function ProjectCard({
  project,
  href,
  cta,
}: {
  project: Project;
  href: string;
  cta: string;
}) {
  // Client work names the client; a side project names its subject. One slot,
  // because both answer "what is this" and no project carries both.
  const eyebrow = project.client ?? project.category;

  return (
    <li className="rise border-border hover:border-accent group relative flex h-full flex-col gap-3 border p-6 transition-colors">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="group-hover:text-accent text-lg font-semibold transition-colors">
          {project.title}
        </h3>
        {project.period ? (
          <span className="text-muted shrink-0 font-mono text-xs">{project.period}</span>
        ) : null}
      </div>

      {eyebrow ? (
        <p className="text-accent font-mono text-xs tracking-[0.15em] uppercase">{eyebrow}</p>
      ) : null}

      <p className="text-muted text-pretty">{project.summary}</p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-3">
        {project.stack.slice(0, 4).map((item) => (
          <li key={item} className="text-muted font-mono text-xs">
            {item}
          </li>
        ))}
      </ul>

      <Button
        href={href}
        variant="outline"
        className="mt-2 self-start after:absolute after:inset-0"
      >
        {cta}
        <span className="sr-only">: {project.title}</span>
      </Button>
    </li>
  );
}
