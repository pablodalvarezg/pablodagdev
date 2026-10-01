import type { Locale } from './locales';

/**
 * English is the reference dictionary: its keys define TranslationKey, so every
 * other locale fails to compile until it covers them all.
 */
const en = {
  'hero.role': 'Full-Stack & Low/No-Code Developer',
  'hero.location': 'Buenos Aires, Argentina',
  'hero.tagline':
    'I pick the right tool for each problem, from custom code to low-code and ERP, and I take care of the data behind it: where it lives, how it moves, and whether the numbers add up.',
  'hero.cta.contact': 'Get in touch',
  'hero.cta.work': 'See the work',

  'meta.home.description':
    'Portfolio of Pablo Álvarez Graña, full-stack and low/no-code developer based in Buenos Aires.',

  'nav.language': 'Language',
  'theme.toggle': 'Switch between light and dark',
  'language.en': 'English',
  'language.es': 'Español',

  'specialties.eyebrow': 'My Specialties',
  'specialties.title': 'What I can own end to end',
  'specialties.fullstack.title': 'Full-Stack (MERN)',
  'specialties.fullstack.body':
    'React and Next.js interfaces over Node APIs in Express or NestJS, with MongoDB or PostgreSQL behind them.',
  'specialties.data.title': 'Data & SQL',
  'specialties.data.body':
    'Modelling, migration and consolidation across SQL Server, PostgreSQL and Supabase, and the pipelines that keep them fed.',
  'specialties.lowcode.title': 'Low/No-Code & Automation',
  'specialties.lowcode.body':
    'Internal tools and automations built in Bubble, Retool, Make and n8n, wired to real APIs.',
  'specialties.erp.title': 'ERP (Odoo)',
  'specialties.erp.body':
    'Functional and technical Odoo work in Python, XML and JavaScript, data migration included.',
  'specialties.ai.title': 'Applied AI',
  'specialties.ai.body': 'LLM integrations inside apps that are already in production.',
  'specialties.seo.title': 'Technical SEO',
  'specialties.seo.body': 'Indexing and performance, worked against Search Console data.',
  'specialties.cta': 'See what I offer',

  'services.eyebrow': 'Services',
  'services.title': 'What I offer',
  'services.web.title': 'Websites',
  'services.web.body':
    'Marketing sites and web applications, from the Figma file to the deploy. React and Next.js where the product is the interface; WordPress or PHP where the content came first.',
  'services.internal.title': 'Internal tools',
  'services.internal.body':
    'The screens a team actually runs on: dashboards, admin panels and back-office flows. Custom-built, or in Retool when low-code gets there sooner and the difference does not matter.',
  'services.automation.title': 'Automation',
  'services.automation.body':
    'The manual step between two systems, removed: scheduled jobs, integrations between APIs, and data pipelines that keep a report current without anyone pasting into a spreadsheet.',
  'services.consulting.title': 'Consulting',
  'services.consulting.body':
    'A second opinion on something that already exists: technical SEO and performance audits, a data model that stopped scaling, or choosing between custom code, low-code and ERP before the budget is spent.',
  'meta.services.description':
    'Websites, internal tools, automation and technical consulting, built end to end by one developer in Buenos Aires.',

  'tech.eyebrow': 'Tech Stack',
  'tech.title': 'Technologies that I work with',

  'experience.eyebrow': 'Experience',
  'experience.title': 'Where I learned all this',
  'experience.present': 'present',
  'experience.assisted-living.summary':
    'Promoted to Tech Lead in June 2026, leading the engineering team without leaving the code. Doubled site traffic in three months by improving data quality and generating profiles algorithmically. Builds features from Figma designs, writes the internal tools and scripts that enrich the database for lead generation and targeting, and keeps the live site fast and without downtime.',
  'experience.sidetool.summary':
    'Built applications from scratch, sized to what each problem actually needed, from a single feature to a whole product: custom APIs, AI integrated into apps already in production, and the SQL and NoSQL databases underneath. Also took over projects already live, where the work is database management rather than new features.',
  'experience.activa.summary':
    'Implemented and supported the Odoo ERP end to end, functional and technical, in Python, XML, JavaScript and CSS. Also supported Softland in VBScript, SQL and the proprietary language of the platform, with database maintenance across SQL Server and PostgreSQL.',
  'experience.freelance.summary':
    'Web applications end to end for direct clients: React front ends over Node and Express, WordPress and PHP where the content came first, and internal tools in Retool.',

  'about.eyebrow': 'About',
  'about.title': 'Who is behind this',
  'about.body':
    "Full-stack developer in Buenos Aires. I trained at Coderhouse and work in English at a C1 level. Away from the keyboard I play padel, collect trading cards, and keep a long-running interest in Japanese culture, cyberpunk aesthetics, board games and sports cars. It's very likely that you'll find some (if not most) of these themes present in my side projects!",

  'work.eyebrow': 'Work',
  'work.title': 'What I have shipped',
  'work.cta': 'Read the case study',

  'upcoming.label': 'Coming soon',
  'upcoming.type-matrix.title': 'Type Matrix',
  'upcoming.type-matrix.summary':
    'A game room over creature data: team building, a daily puzzle and a combat calculator, with every answer checked on the server so the client never holds it.',
  'upcoming.bandeja.title': 'Bandeja',
  'upcoming.bandeja.summary':
    'A runner for americano padel tournaments: automatic pairing rotation, results entered from a phone and an ELO-style ranking, with the live scoreboard synced across devices and an offline queue behind it.',

  'project.role': 'Role',
  'project.period': 'Period',
  'project.client': 'Client',
  'project.stack': 'Stack',
  'project.visit': 'Visit the site',
  'nav.back': 'Back to the hub',

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
    'Elijo la herramienta justa para cada problema, desde código a medida hasta low-code y ERP, pensando siempre en los datos que sostienen cada proyecto: dónde viven, cómo se mueven y que los números cierren.',
  'hero.cta.contact': 'Escribime',
  'hero.cta.work': 'Ver el recorrido',

  'meta.home.description':
    'Portfolio de Pablo Álvarez Graña, desarrollador full-stack y low/no-code en Buenos Aires.',

  'nav.language': 'Idioma',
  'theme.toggle': 'Cambiar entre claro y oscuro',
  'language.en': 'English',
  'language.es': 'Español',

  'specialties.eyebrow': 'Mi especialidad',
  'specialties.title': 'Lo que puedo ejecutar de la A a la Z',
  'specialties.fullstack.title': 'Full-Stack (MERN)',
  'specialties.fullstack.body':
    'Interfaces en React y Next.js sobre APIs de Node con Express o NestJS, y MongoDB o PostgreSQL detrás.',
  'specialties.data.title': 'Data & SQL',
  'specialties.data.body':
    'Modelado, migración y consolidación entre SQL Server, PostgreSQL y Supabase, y los pipelines que los alimentan.',
  'specialties.lowcode.title': 'Low/No-Code y automatización',
  'specialties.lowcode.body':
    'Herramientas internas y automatizaciones en Bubble, Retool, Make y n8n, conectadas a APIs reales.',
  'specialties.erp.title': 'ERP (Odoo)',
  'specialties.erp.body':
    'Implementación funcional y técnica de Odoo en Python, XML y JavaScript, migración de datos incluida.',
  'specialties.ai.title': 'IA aplicada',
  'specialties.ai.body': 'Integración de LLMs en apps que ya están en producción.',
  'specialties.seo.title': 'SEO técnico',
  'specialties.seo.body':
    'Indexación y rendimiento, trabajados contra los datos de Search Console.',
  'specialties.cta': 'Ver qué ofrezco',

  'services.eyebrow': 'Servicios',
  'services.title': 'Qué ofrezco',
  'services.web.title': 'Páginas web',
  'services.web.body':
    'Sitios y aplicaciones web, del archivo de Figma al deploy. React y Next.js cuando el producto es la interfaz; WordPress o PHP cuando primero está el contenido.',
  'services.internal.title': 'Herramientas internas',
  'services.internal.body':
    'Las pantallas con las que un equipo realmente trabaja: dashboards, paneles de administración y flujos de back-office. A medida, o en Retool cuando el low-code llega antes y la diferencia no importa.',
  'services.automation.title': 'Automatizaciones',
  'services.automation.body':
    'El paso manual entre dos sistemas, eliminado: tareas programadas, integraciones entre APIs y pipelines de datos que mantienen un reporte al día sin que nadie copie y pegue en una planilla.',
  'services.consulting.title': 'Consulting',
  'services.consulting.body':
    'Una segunda opinión sobre algo que ya existe: auditorías de SEO técnico y performance, un modelo de datos que dejó de escalar, o elegir entre código a medida, low-code y ERP antes de gastar el presupuesto.',
  'meta.services.description':
    'Páginas web, herramientas internas, automatizaciones y consultoría técnica, construidas de punta a punta por un desarrollador en Buenos Aires.',

  'tech.eyebrow': 'Tech Stack',
  'tech.title': 'Tecnologías con las que trabajo',

  'experience.eyebrow': 'Experiencia',
  'experience.title': 'Dónde aprendí todo esto',
  'experience.present': 'hoy',
  'experience.assisted-living.summary':
    'Ascendido a Tech Lead en junio de 2026, liderando el equipo de ingeniería sin soltar el código. Duplicó el tráfico del sitio en tres meses mejorando la calidad de los datos y generando perfiles de forma algorítmica. Construye features a partir de diseños de Figma, escribe las herramientas internas y los scripts que enriquecen la base para generación de leads, y sostiene el sitio en vivo sin caídas.',
  'experience.sidetool.summary':
    'Construyó aplicaciones desde cero, del tamaño que cada problema pedía, desde una feature suelta hasta un producto entero: APIs a medida, IA integrada en apps ya en producción y las bases SQL y NoSQL que las sostienen. También se hizo cargo de proyectos ya en vivo, donde el trabajo es gestión de datos antes que features nuevas.',
  'experience.activa.summary':
    'Implementó y sostuvo el ERP Odoo de punta a punta, funcional y técnico, en Python, XML, JavaScript y CSS. También dio soporte a Softland en VBScript, SQL y el lenguaje propietario de la plataforma, con mantenimiento de bases en SQL Server y PostgreSQL.',
  'experience.freelance.summary':
    'Aplicaciones web de punta a punta para clientes directos: front ends en React sobre Node y Express, WordPress y PHP donde el contenido mandaba, y herramientas internas en Retool.',

  'about.eyebrow': 'Sobre mí',
  'about.title': 'Quién está atrás de esto',
  'about.body':
    'Desarrollador full-stack en Buenos Aires. Me formé en Coderhouse y trabajo en inglés a nivel C1. Lejos del teclado juego al pádel y colecciono juegos de mesa, y me interesan hace años la estética japonesa, la cyberpunk y los autos deportivos, así que no te sorprendas si alguna de estas cosas aparece en mis side projects.',

  'work.eyebrow': 'Trabajo',
  'work.title': 'Lo que llevo construido',
  'work.cta': 'Leer el case study',

  'upcoming.label': 'Próximamente',
  'upcoming.type-matrix.title': 'Type Matrix',
  'upcoming.type-matrix.summary':
    'Una sala de juegos sobre datos de criaturas: armado de equipos, puzzle diario y calculadora de combate, con toda respuesta validada en el servidor para que el cliente nunca la tenga.',
  'upcoming.bandeja.title': 'Bandeja',
  'upcoming.bandeja.summary':
    'Un organizador de torneos americanos de pádel: rotación automática de parejas, resultados cargados desde el celular y ranking tipo ELO, con el marcador en vivo sincronizado entre dispositivos y una cola offline atrás.',

  'project.role': 'Rol',
  'project.period': 'Período',
  'project.client': 'Cliente',
  'project.stack': 'Stack',
  'project.visit': 'Ver el sitio',
  'nav.back': 'Volver al hub',

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
