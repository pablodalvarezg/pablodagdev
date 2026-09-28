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
    <article className="case-study flex-1">
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

          {project.cover ? (
            /*
              eslint-disable-next-line @next/next/no-img-element --
              Same reason as the tech marquee: output: 'export' turns the
              optimiser off, so next/image would only add the layout hint that
              width and height already give.

              Eager, unlike the shots in the body: this one is the largest thing
              above the fold, so it is the LCP element and lazy-loading it would
              delay exactly the paint being measured.
            */
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              decoding="async"
            />
          ) : null}

          {/*
            The stack belongs in the same list as the other facts. As a heading it
            competed with the body's own "Stack" section: two h2s with one label,
            leading anyone navigating by heading to the wrong one.
          */}
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5">{fact.value}</dd>
              </div>
            ))}

            <div className="sm:col-span-3">
              <dt className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
                {labels.stack}
              </dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="border-border rounded-base border px-2.5 py-1 font-mono text-xs"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

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
