/**
 * Single source of valid theme names. Adding a world means adding its token file
 * under themes/ and its name here; no component changes.
 */
export const THEME_NAMES = ['base', 'markets'] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

/** The neutral hub identity, used by every page that is not a world. */
export const DEFAULT_THEME: ThemeName = 'base';
