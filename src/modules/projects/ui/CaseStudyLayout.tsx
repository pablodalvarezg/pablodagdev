import { Container } from '@shared/ui/Container';

import type { Project } from '../domain/project';
import type { ReactNode } from 'react';

interface Labels {
  role: string;
  period: string;
  client: string;
  stack: string;
  visit: string;
  back: string;
}

/**
 * The frame every case study shares. The world is applied here as data-theme, so
 * a project restyles the page through one frontmatter field and no component
 * knows which world it is rendering.
 */
export function CaseStudyLayout({
  project,
  labels,
  backHref,
  children,
}: {
  project: Project;
  labels: Labels;
  backHref: string;
  children: ReactNode;
}) {
  const facts = [
    { label: labels.role, value: project.role },
    ...(project.period ? [{ label: labels.period, value: project.period }] : []),
    ...(project.client ? [{ label: labels.client, value: project.client }] : []),
  ];

  return (
    <article data-theme={project.theme} className="bg-bg text-fg flex-1">
      <Container className="py-16">
        <a
          href={backHref}
          className="text-muted hover:text-accent font-mono text-xs tracking-[0.15em] uppercase transition-colors"
        >
          ← {labels.back}
        </a>

        <header className="border-border mt-8 border-b pb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-muted mt-4 max-w-prose text-lg text-pretty">{project.summary}</p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h2 className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
              {labels.stack}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="border-border rounded-base border px-2.5 py-1 font-mono text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {project.links.demo ? (
            <a
              href={project.links.demo}
              rel="noreferrer"
              target="_blank"
              className="text-accent mt-8 inline-flex font-medium underline underline-offset-4 hover:no-underline"
            >
              {labels.visit} ↗
            </a>
          ) : null}
        </header>

        {children}
      </Container>
    </article>
  );
}
