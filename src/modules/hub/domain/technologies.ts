/** A logo in the marquee. */
export interface Technology {
  /** File stem under public/logos. */
  file: string;
  /** Written out: this is the alt text a screen reader reads. */
  name: string;
  /**
   * Rendered height in pixels; the width follows from the aspect ratio.
   *
   * One height for all of them does not work here. These range from taller than
   * wide (CSS3 at 0.71) to five times wider than tall (Supabase at 5.14), and at
   * a shared height a wordmark reads as several times the object a square mark
   * does. Each value aims the logo at a common optical width, clamped at both
   * ends, because past a point a tall logo stops reading as wider and starts
   * reading as bigger.
   */
  height: number;
}

/**
 * Two rows scrolling in opposite directions, split by kind: what the code is
 * written in, and what it is wired to.
 */
export const TECHNOLOGY_ROWS: readonly (readonly Technology[])[] = [
  [
    { file: 'logo-react', name: 'React', height: 32 },
    { file: 'textlogo-nodejs', name: 'Node.js', height: 32 },
    { file: 'textlogo-nextjs', name: 'Next.js', height: 18 },
    { file: 'textlogo-nestjs', name: 'NestJS', height: 31 },
    { file: 'logo-javascript', name: 'JavaScript', height: 32 },
    { file: 'logo-python', name: 'Python', height: 32 },
    { file: 'textlogo-php', name: 'PHP', height: 32 },
    { file: 'logo-html5', name: 'HTML5', height: 32 },
    { file: 'logo-css3', name: 'CSS3', height: 32 },
    { file: 'textlogo-sass', name: 'Sass', height: 32 },
  ],
  [
    { file: 'textlogo-postgresql', name: 'PostgreSQL', height: 32 },
    { file: 'logo-mssql', name: 'SQL Server', height: 32 },
    { file: 'textlogo-mariadb', name: 'MariaDB', height: 25 },
    { file: 'textlogo-mongodb', name: 'MongoDB', height: 22 },
    { file: 'textlogo-supabase', name: 'Supabase', height: 18 },
    { file: 'textlogo-wordpress', name: 'WordPress', height: 18 },
    { file: 'textlogo-bubble', name: 'Bubble', height: 32 },
    { file: 'textlogo-retool', name: 'Retool', height: 32 },
    { file: 'textlogo-make', name: 'Make', height: 18 },
    { file: 'textlogo-n8n', name: 'n8n', height: 32 },
    { file: 'textlogo-docker', name: 'Docker', height: 20 },
    { file: 'textlogo-git', name: 'Git', height: 32 },
    { file: 'logo-github', name: 'GitHub', height: 32 },
  ],
];
