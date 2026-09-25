import type { Project } from '../domain/project';

/**
 * A project in the hub grid. Keeps the hub's neutral tokens rather than the
 * project's world: the grid is a list, not a preview of each theme.
 */
export function ProjectCard({
  project,
  href,
  clientLabel,
}: {
  project: Project;
  href: string;
  clientLabel?: string;
}) {
  return (
    <li className="rise">
      <a
        href={href}
        className="border-border hover:border-accent group flex h-full flex-col gap-3 border p-6 transition-colors"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="group-hover:text-accent text-lg font-semibold transition-colors">
            {project.title}
          </h3>
          {project.period ? (
            <span className="text-muted shrink-0 font-mono text-xs">{project.period}</span>
          ) : null}
        </div>

        {clientLabel ? (
          <p className="text-accent font-mono text-xs tracking-[0.15em] uppercase">{clientLabel}</p>
        ) : null}

        <p className="text-muted text-pretty">{project.summary}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-3">
          {project.stack.slice(0, 4).map((item) => (
            <li key={item} className="text-muted font-mono text-xs">
              {item}
            </li>
          ))}
        </ul>
      </a>
    </li>
  );
}
