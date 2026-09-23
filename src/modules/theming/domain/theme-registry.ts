/**
 * Single source of valid theme names. Adding a world means adding its token file
 * under themes/ and its name here; no component changes.
 */
export const THEME_NAMES = ['base'] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

/** The neutral hub identity, used by every page that is not a world. */
export const DEFAULT_THEME: ThemeName = 'base';

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === 'string' && (THEME_NAMES as readonly string[]).includes(value);
}
