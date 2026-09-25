import { site } from '@shared/config/site';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';

interface Props {
  role: string;
  location: string;
  tagline: string;
  contactLabel: string;
  workLabel: string;
}

export function Hero({ role, location, tagline, contactLabel, workLabel }: Props) {
  return (
    <Container className="flex flex-col gap-6 py-20 sm:py-28">
      <p className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
        {role} · {location}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {site.name}
      </h1>
      <p className="max-w-prose text-lg text-pretty">{tagline}</p>
      <div className="mt-2 flex flex-wrap gap-3">
        <Button href={`mailto:${site.email}`}>{contactLabel}</Button>
        <Button href="#experience" variant="outline">
          {workLabel}
        </Button>
      </div>
    </Container>
  );
}
