import { site } from '@shared/config/site';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';

/**
 * Prefills the subject of the contact mail. It is a prompt rather than a label:
 * it arrives already sorted in the inbox and asks the sender for the one thing
 * a cold enquiry usually leaves out.
 *
 * Deliberately in English in both locales, since it is the sender who edits it.
 */
const CONTACT_SUBJECT = 'Need a Developer: [Your Project Name Here]';

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
        <Button href={`mailto:${site.email}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`}>
          {contactLabel}
        </Button>
        <Button href="#experience" variant="outline">
          {workLabel}
        </Button>
      </div>
    </Container>
  );
}
