import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import boundaries from 'eslint-plugin-boundaries';
import prettier from 'eslint-config-prettier';

/**
 * Element types are ordered from most to least specific: `boundaries` assigns the
 * first descriptor that matches, so the module layers must precede `module`.
 */
const elements = [
  { type: 'module-domain', pattern: 'src/modules/*/domain', capture: ['module'] },
  { type: 'module-data', pattern: 'src/modules/*/data', capture: ['module'] },
  { type: 'module-ui', pattern: 'src/modules/*/ui', capture: ['module'] },
  { type: 'module', pattern: 'src/modules/*', capture: ['module'] },
  { type: 'app', pattern: 'src/app' },
  { type: 'shared', pattern: 'src/shared' },
  { type: 'content', pattern: 'src/content' },
];

const to = (type, extra) => ({ to: { element: { type, ...extra } } });

/** A module is reachable from the outside only through its public API. */
const publicApi = to('module', { fileInternalPath: 'index.ts' });

/** Restricts a layer to the module the importer itself belongs to. */
const ownLayer = (type) => to(type, { captured: { module: '{{from.element.captured.module}}' } });

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: { boundaries },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': elements,
      'import/resolver': { typescript: { project: './tsconfig.json' } },
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'app' } },
              allow: [publicApi, to('shared')],
            },
            {
              from: { element: { type: 'module' } },
              allow: [
                ownLayer('module-domain'),
                ownLayer('module-data'),
                ownLayer('module-ui'),
                publicApi,
                to('shared'),
              ],
            },
            {
              from: { element: { type: 'module-ui' } },
              allow: [ownLayer('module-domain'), publicApi, to('shared')],
            },
            {
              // data is the layer that reads the outside world, so it is also the
              // layer that validates it: the content schema checks a theme name
              // against the theming module's registry.
              from: { element: { type: 'module-data' } },
              allow: [ownLayer('module-domain'), publicApi, to('shared'), to('content')],
            },
            // domain carries no I/O and no framework. It may still name another
            // module's types, which is what CLAUDE.md allows any module to do:
            // through the public API, never a deep import.
            { from: { element: { type: 'module-domain' } }, allow: [publicApi, to('shared')] },
            { from: { element: { type: 'shared' } }, allow: [to('shared')] },
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  prettier,
]);
