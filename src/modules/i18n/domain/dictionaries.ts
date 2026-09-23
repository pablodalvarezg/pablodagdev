import type { Locale } from './locales';

/**
 * English is the reference dictionary: its keys define TranslationKey, so every
 * other locale fails to compile until it covers them all.
 */
const en = {
  'hero.role': 'Full-Stack & Low/No-Code Developer',
  'hero.location': 'Buenos Aires, Argentina',
  'hero.tagline':
    'I pick the right tool for each problem, from custom code to low-code and ERP, and I own the data layer.',
  'meta.home.description':
    'Portfolio of Pablo Álvarez Graña, full-stack and low/no-code developer based in Buenos Aires.',
  'nav.language': 'Language',
  'theme.toggle': 'Switch between light and dark',
  'language.en': 'English',
  'language.es': 'Español',
} as const;

export type TranslationKey = keyof typeof en;

const es: Record<TranslationKey, string> = {
  'hero.role': 'Full-Stack & Low/No-Code Developer',
  'hero.location': 'Buenos Aires, Argentina',
  'hero.tagline':
    'Elijo la herramienta justa para cada problema, desde código a medida hasta low-code y ERP, y domino la capa de datos.',
  'meta.home.description':
    'Portfolio de Pablo Álvarez Graña, desarrollador full-stack y low/no-code en Buenos Aires.',
  'nav.language': 'Idioma',
  'theme.toggle': 'Cambiar entre claro y oscuro',
  'language.en': 'English',
  'language.es': 'Español',
};

const dictionaries: Record<Locale, Record<TranslationKey, string>> = { en, es };

/**
 * Named `get`, not `use`: this runs in Server Components, and a `use` prefix
 * would read as a React hook to both people and the lint rules.
 */
export function getTranslations(locale: Locale) {
  return (key: TranslationKey): string => dictionaries[locale][key];
}
