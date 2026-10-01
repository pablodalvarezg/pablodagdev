/**
 * The next projects to be built, in build order, as the brief numbers them.
 *
 * Not MDX and not a `Project`: a draft case study is absent from a production
 * build, so it cannot announce anything, and a project that does not exist has
 * no role, no stack and no theme to carry. A slug is all there is, and the copy
 * lives in the dictionary — so the list stays two words long and a missing
 * translation fails to compile.
 *
 * An entry leaves this list when its case study arrives, not before.
 */
export const UPCOMING_PROJECTS = ['type-matrix', 'bandeja'] as const;
