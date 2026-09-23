import type { ReactNode } from 'react';

import { Container } from './Container';

interface Props {
  title: string;
  /**
   * Required: it labels the landmark and anchors the section, and a shared
   * fallback would collide the moment a second section omitted it.
   */
  id: string;
  eyebrow?: string;
  children: ReactNode;
}

export function Section({ title, id, eyebrow, children }: Props) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="py-16">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          {eyebrow ? (
            <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">{eyebrow}</p>
          ) : null}
          <h2 id={headingId} className="text-2xl font-semibold text-balance">
            {title}
          </h2>
        </div>
        {children}
      </Container>
    </section>
  );
}
