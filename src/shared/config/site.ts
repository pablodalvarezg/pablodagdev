/** Site-wide constants that are not content and do not belong to any domain. */
export const site = {
  name: 'Pablo Álvarez Graña',
  email: 'pablo.alvarez4284@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pablodalvarezg',
  github: 'https://github.com/pablodalvarezg',

  /** Where he works from. Structured because JSON-LD wants the parts separately. */
  location: { city: 'Buenos Aires', country: 'AR' },
} as const;
