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
  'hero.cta.contact': 'Get in touch',
  'hero.cta.services': 'See what I charge',

  'meta.home.description':
    'Portfolio of Pablo Álvarez Graña, full-stack and low/no-code developer based in Buenos Aires.',

  'nav.language': 'Language',
  'theme.toggle': 'Switch between light and dark',
  'language.en': 'English',
  'language.es': 'Español',

  'services.eyebrow': 'What I do',
  'services.title': 'Five things, one data layer underneath',
  'services.fullstack.title': 'Full-Stack (MERN)',
  'services.fullstack.body':
    'React front ends over Node and Express APIs, with MongoDB or PostgreSQL behind them.',
  'services.data.title': 'Data & SQL',
  'services.data.body':
    'Modelling, migration and consolidation across SQL Server, PostgreSQL and Supabase, and the pipelines that keep them fed.',
  'services.lowcode.title': 'Low/No-Code & Automation',
  'services.lowcode.body':
    'Internal tools and automations built in Bubble, Retool, WeWeb, Make and n8n, wired to real APIs.',
  'services.erp.title': 'ERP (Odoo)',
  'services.erp.body':
    'Functional and technical Odoo work in Python, XML and JavaScript, data migration included.',
  'services.ai.title': 'Applied AI & Technical SEO',
  'services.ai.body':
    'LLM integrations inside production apps, and technical SEO worked against Search Console data.',

  'experience.eyebrow': 'Experience',
  'experience.title': 'Where the data layer came from',
  'experience.present': 'present',
  'experience.assisted-living.summary':
    'Features built from Figma, performance work, technical SEO and data pipelines.',
  'experience.sidetool.summary':
    'Full applications from scratch, custom APIs, AI integration and SQL/NoSQL database work.',
  'experience.activa.summary':
    'Functional and technical Odoo implementation in Python, XML and JavaScript, plus Softland support on SQL Server and PostgreSQL.',
  'experience.freelance.summary': 'React, Node and Express, WordPress and Retool.',

  'pricing.eyebrow': 'Rates',
  'pricing.title': 'What things cost',
  'pricing.from': 'from',
  'pricing.perHour': 'per hour',
  'pricing.website.title': 'B2C or B2B website',
  'pricing.website.body':
    'Design through deploy: responsive from 360 px, technical SEO, and the analytics to know whether it works. The final number moves with design complexity, how many pages, and whether it needs a shopping cart.',
  'pricing.tooling.title': 'Internal tooling',
  'pricing.tooling.body':
    'Dashboards and internal apps that replace a manual process, built in Retool, WeWeb or Bubble when that is faster, and in code when it is not.',
  'pricing.consulting.title': 'Consulting',
  'pricing.consulting.body':
    'Architecture, the data layer, code review, technical SEO. Billed by the hour, with no minimum.',
  'pricing.note':
    'Prices in US dollars, as a starting point rather than a quote. Tell me what you need and I will put a number to it.',

  'about.eyebrow': 'About',
  'about.title': 'Who is behind this',
  'about.body':
    'Full-stack developer in Buenos Aires. I trained at Coderhouse and work in English at a C1 level. Away from the keyboard I play padel and collect board games, and I keep a long-running interest in Japanese and cyberpunk aesthetics and in sports cars, which is where most of my side projects start.',

  'contact.eyebrow': 'Contact',
  'contact.title': 'Tell me what you need',
  'contact.body': 'Email is the quickest way to reach me.',
  'contact.email': 'Email',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',
} as const;

export type TranslationKey = keyof typeof en;

/** Every key, derived from the reference dictionary so a test cannot go stale. */
export const TRANSLATION_KEYS = Object.keys(en) as TranslationKey[];

const es: Record<TranslationKey, string> = {
  'hero.role': 'Full-Stack & Low/No-Code Developer',
  'hero.location': 'Buenos Aires, Argentina',
  'hero.tagline':
    'Elijo la herramienta justa para cada problema, desde código a medida hasta low-code y ERP, y domino la capa de datos.',
  'hero.cta.contact': 'Escribime',
  'hero.cta.services': 'Ver precios',

  'meta.home.description':
    'Portfolio de Pablo Álvarez Graña, desarrollador full-stack y low/no-code en Buenos Aires.',

  'nav.language': 'Idioma',
  'theme.toggle': 'Cambiar entre claro y oscuro',
  'language.en': 'English',
  'language.es': 'Español',

  'services.eyebrow': 'Qué hago',
  'services.title': 'Cinco cosas, con la capa de datos abajo de todas',
  'services.fullstack.title': 'Full-Stack (MERN)',
  'services.fullstack.body':
    'Front ends en React sobre APIs de Node y Express, con MongoDB o PostgreSQL detrás.',
  'services.data.title': 'Data & SQL',
  'services.data.body':
    'Modelado, migración y consolidación entre SQL Server, PostgreSQL y Supabase, y los pipelines que los alimentan.',
  'services.lowcode.title': 'Low/No-Code y automatización',
  'services.lowcode.body':
    'Herramientas internas y automatizaciones en Bubble, Retool, WeWeb, Make y n8n, conectadas a APIs reales.',
  'services.erp.title': 'ERP (Odoo)',
  'services.erp.body':
    'Implementación funcional y técnica de Odoo en Python, XML y JavaScript, migración de datos incluida.',
  'services.ai.title': 'IA aplicada y SEO técnico',
  'services.ai.body':
    'Integración de LLMs en apps en producción, y SEO técnico trabajado contra datos de Search Console.',

  'experience.eyebrow': 'Experiencia',
  'experience.title': 'De dónde salió la capa de datos',
  'experience.present': 'hoy',
  'experience.assisted-living.summary':
    'Features desde Figma, performance, SEO técnico y pipelines de datos.',
  'experience.sidetool.summary':
    'Apps completas desde cero, APIs a medida, integración de IA y gestión de bases SQL/NoSQL.',
  'experience.activa.summary':
    'Implementación funcional y técnica de Odoo en Python, XML y JavaScript, más soporte de Softland con SQL Server y PostgreSQL.',
  'experience.freelance.summary': 'React, Node y Express, WordPress y Retool.',

  'pricing.eyebrow': 'Precios',
  'pricing.title': 'Cuánto sale cada cosa',
  'pricing.from': 'desde',
  'pricing.perHour': 'por hora',
  'pricing.website.title': 'Sitio web B2C o B2B',
  'pricing.website.body':
    'Del diseño al deploy: responsive desde 360 px, SEO técnico, y la analítica para saber si funciona. El número final se mueve según la complejidad del diseño, cuántas páginas y si lleva carrito de compras.',
  'pricing.tooling.title': 'Herramientas internas',
  'pricing.tooling.body':
    'Dashboards y apps internas que reemplazan un proceso manual, en Retool, WeWeb o Bubble cuando es más rápido, y en código cuando no.',
  'pricing.consulting.title': 'Consultoría',
  'pricing.consulting.body':
    'Arquitectura, capa de datos, code review, SEO técnico. Por hora, sin mínimo.',
  'pricing.note':
    'Precios en dólares, como punto de partida y no como presupuesto cerrado. Contame qué necesitás y le pongo un número.',

  'about.eyebrow': 'Sobre mí',
  'about.title': 'Quién está atrás de esto',
  'about.body':
    'Desarrollador full-stack en Buenos Aires. Me formé en Coderhouse y trabajo en inglés a nivel C1. Lejos del teclado juego al pádel y colecciono juegos de mesa, y me interesan hace años la estética japonesa, la cyberpunk y los autos deportivos, de donde sale casi todo lo que termina siendo un side project.',

  'contact.eyebrow': 'Contacto',
  'contact.title': 'Contame qué necesitás',
  'contact.body': 'El mail es la vía más rápida.',
  'contact.email': 'Email',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',
};

const dictionaries: Record<Locale, Record<TranslationKey, string>> = { en, es };

/**
 * Named `get`, not `use`: this runs in Server Components, and a `use` prefix
 * would read as a React hook to both people and the lint rules.
 */
export function getTranslations(locale: Locale) {
  return (key: TranslationKey): string => dictionaries[locale][key];
}
