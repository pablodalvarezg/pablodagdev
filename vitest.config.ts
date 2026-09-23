import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

// The aliases mirror tsconfig paths. Kept explicit rather than pulled from a
// plugin: three lines against a dependency that only reads the same file.
const alias = {
  '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
  '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
  '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
};

export default defineConfig({
  resolve: { alias },
  test: { include: ['src/**/*.test.ts'] },
});
