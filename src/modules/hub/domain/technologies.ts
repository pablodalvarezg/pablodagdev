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
   * A second file drawn for the dark scheme, shown in place of the first.
   *
   * Some marks cannot survive the white treatment. A square with its lettering
   * in black, or a shield with a knocked-out numeral, flattens to a plain white
   * block once every channel is crushed: the meaning of the mark lives inside
   * its own outline, and the filter erases exactly that. The twin draws the
   * shape in white with the lettering black, which is the result the filter was
   * reaching for and could not produce.
   *
   * Both files share an aspect ratio, so swapping one for the other does not
   * resize the row.
   */
  darkFile?: string;
}

/**
 * Two rows scrolling in opposite directions. Broadly the split is what the code
 * is written in and what it is wired to, with Bubble and Retool lifted into the
 * first row: they are the least expected things here, and the top row is the one
 * that gets read.
 */
export const TECHNOLOGY_ROWS: readonly (readonly Technology[])[] = [
  [
    { file: 'logo-react', name: 'React', width: 55, height: 50 },
    { file: 'textlogo-nodejs', name: 'Node.js', width: 81, height: 50 },
    { file: 'textlogo-expressjs', name: 'Express', width: 136, height: 36 },
    { file: 'textlogo-nextjs', name: 'Next.js', width: 138, height: 28 },
    { file: 'textlogo-nestjs', name: 'NestJS', width: 138, height: 49 },
    {
      file: 'logo-javascript',
      name: 'JavaScript',
      width: 40,
      height: 40,
      darkFile: 'logo-javascript-dark',
    },
    { file: 'logo-python', name: 'Python', width: 50, height: 50 },
    { file: 'textlogo-php', name: 'PHP', width: 100, height: 50 },
    { file: 'logo-html5', name: 'HTML5', width: 50, height: 50, darkFile: 'logo-html5-dark' },
    { file: 'logo-css3', name: 'CSS3', width: 35, height: 50, darkFile: 'logo-css3-dark' },
    { file: 'textlogo-bubble', name: 'Bubble', width: 136, height: 31 },
    { file: 'textlogo-retool', name: 'Retool', width: 141, height: 28 },
  ],
  [
    { file: 'textlogo-postgresql', name: 'PostgreSQL', width: 109, height: 50 },
    { file: 'textlogo-mysql', name: 'MySQL', width: 84, height: 50 },
    { file: 'logo-mssql', name: 'SQL Server', width: 50, height: 50 },
    { file: 'textlogo-mariadb', name: 'MariaDB', width: 136, height: 39 },
    { file: 'textlogo-mongodb', name: 'MongoDB', width: 139, height: 35 },
    { file: 'textlogo-supabase', name: 'Supabase', width: 141, height: 28 },
    { file: 'textlogo-wordpress', name: 'WordPress', width: 135, height: 28 },
    { file: 'textlogo-odoo', name: 'Odoo', width: 138, height: 44 },
    { file: 'textlogo-make', name: 'Make', width: 138, height: 29 },
    { file: 'textlogo-n8n', name: 'n8n', width: 125, height: 50 },
    { file: 'textlogo-docker', name: 'Docker', width: 138, height: 31 },
  ],
];

/** Gap between logos at the base breakpoint, matching the gap class on the row. */
const GAP = 40;

/** How far the band travels per second. Shared, which is the entire point. */
const PIXELS_PER_SECOND = 22;

/** The band never draws wider than this, so a half only has to cover this much. */
const MAX_BAND_WIDTH = 1920;

function rowWidth(row: readonly Technology[]): number {
  return row.reduce((total, tech) => total + tech.width + GAP, 0);
}

/**
 * How many times a row repeats inside one half of the track.
 *
 * The loop slides the track by half its width and lands where it started, which
 * only looks continuous while that half is at least as wide as the band. One
 * pass of these rows is narrower than a wide screen, so on one the track ran out
 * mid-animation and left the blank stretch the band was supposed to fill.
 *
 * Repeating until a half covers the widest the band can get closes it, and the
 * repeats are derived rather than fixed: change the logos and the count follows.
 */
export function marqueeRepeats(row: readonly Technology[]): number {
  return Math.ceil(MAX_BAND_WIDTH / rowWidth(row));
}

/**
 * Seconds for one full pass of a half of the track.
 *
 * Both rows used to share a duration, which is not the same as sharing a speed:
 * a row holding more logos is wider, and covering more pixels in the same time
 * means moving faster. Deriving the duration from the measured width is what
 * makes the two actually match, and the repeats have to be in it, because the
 * animation travels a whole half and not a single pass.
 */
export function marqueeSeconds(row: readonly Technology[]): number {
  return Math.round((rowWidth(row) * marqueeRepeats(row)) / PIXELS_PER_SECOND);
}
