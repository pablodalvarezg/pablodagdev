import { describe, expect, it } from 'vitest';

import { marqueeSeconds, TECHNOLOGY_ROWS, type Technology } from './technologies';

const logo = (width: number): Technology => ({ file: 'x', name: 'X', width, height: 32 });

describe('marqueeSeconds', () => {
  it('scales with the width of the row', () => {
    // The whole reason this function exists: a shared duration is not a shared
    // speed. Twice the pixels in the same time is twice as fast.
    const narrow = marqueeSeconds([logo(100)]);
    const wide = marqueeSeconds([logo(100), logo(100), logo(100), logo(100)]);

    expect(wide).toBeGreaterThan(narrow * 3);
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
      return width / marqueeSeconds(row);
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
