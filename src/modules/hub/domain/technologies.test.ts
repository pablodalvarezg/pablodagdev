import { describe, expect, it } from 'vitest';

import { marqueeRepeats, marqueeSeconds, TECHNOLOGY_ROWS, type Technology } from './technologies';

const logo = (width: number): Technology => ({ file: 'x', name: 'X', width, height: 32 });

describe('marqueeSeconds', () => {
  it('repeats a row until one half covers the widest the band can get', () => {
    // The blank stretch on a wide screen was a half narrower than the band: the
    // track slid its 50% and ran out of logos before the far edge.
    const rows = [[logo(100)], [logo(100), logo(100)], ...TECHNOLOGY_ROWS];

    for (const row of rows) {
      const width = row.reduce((total, tech) => total + tech.width + 40, 0);

      expect(width * marqueeRepeats(row)).toBeGreaterThanOrEqual(1920);
    }
  });

  it('gives rows of equal width equal time, whatever they hold', () => {
    const oneBig = marqueeSeconds([logo(200), logo(200)]);
    const manySmall = marqueeSeconds([logo(100), logo(100), logo(100), logo(100)]);

    // Same logo pixels, but four gaps instead of two, so the many-small row is
    // wider and takes longer. Equal speed, not equal time.
    expect(manySmall).toBeGreaterThan(oneBig);
  });

  it('moves the two real rows at the same speed, whatever they weigh', () => {
    // Not the same duration: the rows hold different logos and come out
    // different widths, so equal durations would mean the wider one runs
    // faster. Pixels per second is the thing that has to match.
    const speeds = TECHNOLOGY_ROWS.map((row) => {
      const width = row.reduce((total, tech) => total + tech.width + 40, 0);
      // The animation covers a whole half of the track, repeats included.
      return (width * marqueeRepeats(row)) / marqueeSeconds(row);
    });

    expect(Math.abs(speeds[0] - speeds[1])).toBeLessThan(0.5);
  });
});

describe('TECHNOLOGY_ROWS', () => {
  it('never lists the same logo twice', () => {
    const files = TECHNOLOGY_ROWS.flat().map((tech) => tech.file);

    expect(new Set(files).size).toBe(files.length);
  });

  it('gives every logo a measured size', () => {
    for (const tech of TECHNOLOGY_ROWS.flat()) {
      expect(tech.width).toBeGreaterThan(0);
      expect(tech.height).toBeGreaterThan(0);
    }
  });
});
