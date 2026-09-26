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
    { file: 'logo-react', name: 'React', width: 36, height: 32, invertOnDark: true },
    { file: 'textlogo-nodejs', name: 'Node.js', width: 52, height: 32, invertOnDark: true },
    { file: 'textlogo-expressjs', name: 'Express', width: 87, height: 23, invertOnDark: true },
    { file: 'textlogo-nextjs', name: 'Next.js', width: 90, height: 18, invertOnDark: true },
    { file: 'textlogo-nestjs', name: 'NestJS', width: 87, height: 31, invertOnDark: true },
    { file: 'logo-javascript', name: 'JavaScript', width: 32, height: 32, invertOnDark: true },
    { file: 'logo-python', name: 'Python', width: 32, height: 32 },
    { file: 'textlogo-php', name: 'PHP', width: 64, height: 32, invertOnDark: true },
    { file: 'logo-html5', name: 'HTML5', width: 32, height: 32, invertOnDark: true },
    { file: 'logo-css3', name: 'CSS3', width: 23, height: 32, invertOnDark: true },
    { file: 'textlogo-sass', name: 'Sass', width: 43, height: 32, invertOnDark: true },
    { file: 'textlogo-bubble', name: 'Bubble', width: 87, height: 20, invertOnDark: true },
    { file: 'textlogo-retool', name: 'Retool', width: 93, height: 18, invertOnDark: true },
  ],
  [
    { file: 'textlogo-postgresql', name: 'PostgreSQL', width: 70, height: 32, invertOnDark: true },
    { file: 'textlogo-mysql', name: 'MySQL', width: 54, height: 32, invertOnDark: true },
    { file: 'logo-mssql', name: 'SQL Server', width: 32, height: 32 },
    { file: 'textlogo-mariadb', name: 'MariaDB', width: 88, height: 25, invertOnDark: true },
    { file: 'textlogo-mongodb', name: 'MongoDB', width: 87, height: 22, invertOnDark: true },
    { file: 'textlogo-supabase', name: 'Supabase', width: 93, height: 18, invertOnDark: true },
    { file: 'textlogo-wordpress', name: 'WordPress', width: 88, height: 18 },
    { file: 'textlogo-odoo', name: 'Odoo', width: 88, height: 28 },
    { file: 'textlogo-make', name: 'Make', width: 86, height: 18, invertOnDark: true },
    { file: 'textlogo-n8n', name: 'n8n', width: 80, height: 32, invertOnDark: true },
    { file: 'textlogo-docker', name: 'Docker', width: 88, height: 20 },
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
