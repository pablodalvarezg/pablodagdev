import { Container } from '@shared/ui/Container';

import { marqueeSeconds, TECHNOLOGY_ROWS, type Technology } from '../domain/technologies';

import type { CSSProperties } from 'react';

/**
 * One pass of a row. The loop needs the same logos twice so the track can slide
 * a full half-width and land where it started, and the second copy is decorative
 * by definition: `aria-hidden` with empty alts, or every tool is announced twice.
 */
function Row({ items, duplicate = false }: { items: readonly Technology[]; duplicate?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
      aria-hidden={duplicate || undefined}
      data-duplicate={duplicate || undefined}
    >
      {items.map((tech) => (
        <li key={tech.file} className="shrink-0">
          {/*
            eslint-disable-next-line @next/next/no-img-element --
            The rule assumes next/image will optimise this, and here it cannot:
            output: 'export' turns the optimiser off unless images.unoptimized is
            set, and next/image does not process SVG in any case. What would be
            left is the layout hint, which width and height already give.
          */}
          <img
            src={`/logos/${tech.file}.svg`}
            alt={duplicate ? '' : tech.name}
            width={tech.width}
            height={tech.height}
            loading="lazy"
            decoding="async"
            className="max-w-none"
            data-invert-on-dark={tech.invertOnDark || undefined}
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * The technologies, scrolling. Rows run in opposite directions and never stop.
 *
 * Each row carries its own duration rather than sharing one, because sharing a
 * duration is not sharing a speed: the wider row would cover more pixels in the
 * same time and visibly outrun the other.
 *
 * Everything moves in CSS. This component ships no JavaScript, which is the
 * point: an infinite marquee is exactly the kind of decoration that quietly
 * turns into a client bundle.
 */
export function TechMarquee({ title }: { title: string }) {
  const headingId = 'tech-stack-heading';

  return (
    <section aria-labelledby={headingId} className="border-border border-y py-10">
      {/* The heading is contained like every other section; only the band bleeds. */}
      <Container>
        <h2
          id={headingId}
          className="text-muted mb-8 font-mono text-xs tracking-[0.15em] uppercase"
        >
          {title}
        </h2>
      </Container>

      {/*
        The fade is a mask rather than a gradient overlay: an overlay would have
        to match the background, and there are two schemes and a theme per world
        to match. A mask hides the pixels instead, so it is right in all of them.
      */}
      <div className="marquee flex flex-col gap-8 overflow-hidden">
        {TECHNOLOGY_ROWS.map((row, index) => (
          <div
            key={index}
            className="marquee-track flex w-max"
            data-direction={index % 2 === 1 ? 'reverse' : undefined}
            style={{ '--marquee-seconds': `${marqueeSeconds(row)}s` } as CSSProperties}
          >
            <Row items={row} />
            <Row items={row} duplicate />
          </div>
        ))}
      </div>
    </section>
  );
}
