import { site } from '@shared/config/site';

interface PersonInput {
  /** Localised, so the page passes it: domain does not translate. */
  jobTitle: string;
  description: string;
}

/**
 * JSON-LD for the person this portfolio is about. Every value comes from the site
 * config or the dictionary — nothing here is inferred, and no credential appears
 * that is not already published somewhere else on the page.
 *
 * No `url` and no `image`: both need the domain, which does not exist yet.
 */
export function personSchema({ jobTitle, description }: PersonInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle,
    description,
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.github],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.country,
    },
  };
}
