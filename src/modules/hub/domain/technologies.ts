/** A logo in the marquee. */
export interface Technology {
  /** File stem under public/logos. */
  file: string;
  /** Written out: this is the alt text a screen reader reads. */
  name: string;
  /**
   * Rendered size in pixels, measured from each file rather than shared.
   *
   * One height for all of them does not work: these range from taller than wide
   * to five times wider than tall, and at a shared height a wordmark reads as
   * several times the object a square mark does. Each height aims the logo at a
   * common optical width, clamped at both ends. The width follows from the
   * aspect ratio, and stating it keeps the row from reflowing as images arrive.
   */
  width: number;
  height: number;
  /**
   * Whether the dark background swallows this one. None of these files use
   * currentColor, so their colours cannot be inherited and the fix is a filter:
   * grayscale first, then invert. Grayscale is what keeps a two-tone mark from
   * turning a strange colour, since inverting alone would leave the Supabase
   * bolt magenta.
   */
  invertOnDark?: boolean;
}

/**
 * Two rows scrolling in opposite directions. Broadly the split is what the code
 * is written in and what it is wired to, with Bubble and Retool lifted into the
 * first row: they are the least expected things here, and the top row is the one
 * that gets read.
 */
export const TECHNOLOGY_ROWS: readonly (readonly Technology[])[] = [
  [
    { file: 'logo-react', name: 'React', width: 44, height: 40, invertOnDark: true },
    { file: 'textlogo-nodejs', name: 'Node.js', width: 65, height: 40, invertOnDark: true },
    { file: 'textlogo-expressjs', name: 'Express', width: 109, height: 29, invertOnDark: true },
    { file: 'textlogo-nextjs', name: 'Next.js', width: 110, height: 22, invertOnDark: true },
    { file: 'textlogo-nestjs', name: 'NestJS', width: 110, height: 39, invertOnDark: true },
    { file: 'logo-javascript', name: 'JavaScript', width: 40, height: 40, invertOnDark: true },
    { file: 'logo-python', name: 'Python', width: 40, height: 40 },
    { file: 'textlogo-php', name: 'PHP', width: 80, height: 40, invertOnDark: true },
    { file: 'logo-html5', name: 'HTML5', width: 40, height: 40, invertOnDark: true },
    { file: 'logo-css3', name: 'CSS3', width: 28, height: 40, invertOnDark: true },
    { file: 'textlogo-bubble', name: 'Bubble', width: 109, height: 25, invertOnDark: true },
    { file: 'textlogo-retool', name: 'Retool', width: 113, height: 22, invertOnDark: true },
  ],
  [
    { file: 'textlogo-postgresql', name: 'PostgreSQL', width: 87, height: 40, invertOnDark: true },
    { file: 'textlogo-mysql', name: 'MySQL', width: 67, height: 40, invertOnDark: true },
    { file: 'logo-mssql', name: 'SQL Server', width: 40, height: 40 },
    { file: 'textlogo-mariadb', name: 'MariaDB', width: 109, height: 31, invertOnDark: true },
    { file: 'textlogo-mongodb', name: 'MongoDB', width: 111, height: 28, invertOnDark: true },
    { file: 'textlogo-supabase', name: 'Supabase', width: 113, height: 22, invertOnDark: true },
    { file: 'textlogo-wordpress', name: 'WordPress', width: 108, height: 22 },
    { file: 'textlogo-odoo', name: 'Odoo', width: 110, height: 35 },
    { file: 'textlogo-make', name: 'Make', width: 110, height: 23, invertOnDark: true },
    { file: 'textlogo-n8n', name: 'n8n', width: 100, height: 40, invertOnDark: true },
    { file: 'textlogo-docker', name: 'Docker', width: 110, height: 25 },
  ],
];

/** Gap between logos at the base breakpoint, matching the gap class on the row. */
const GAP = 40;

/** How far the band travels per second. Shared, which is the entire point. */
const PIXELS_PER_SECOND = 22;

/**
 * Seconds for one full pass of a row.
 *
 * Both rows used to share a duration, which is not the same as sharing a speed:
 * a row holding more logos is wider, and covering more pixels in the same time
 * means moving faster. Deriving the duration from the measured width is what
 * makes the two actually match.
 */
export function marqueeSeconds(row: readonly Technology[]): number {
  const width = row.reduce((total, tech) => total + tech.width + GAP, 0);

  return Math.round(width / PIXELS_PER_SECOND);
}
