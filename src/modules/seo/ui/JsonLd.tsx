import { jsonLdScript } from '../domain/json-ld';

/** Renders a structured data block. The escaping lives in domain, where it is tested. */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
  );
}
