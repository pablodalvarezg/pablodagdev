/**
 * What someone can hire Pablo for, in the order the page presents them:
 * broadest and most familiar first, so a visitor recognises themselves early.
 *
 * Deliberately not the same list as the hub's specialties. A specialty is a
 * tool — MERN, Odoo, SQL — and an offering is a job someone has. The overlap is
 * real but partial: "Automation" is sold here as an outcome, while low-code is
 * listed there as one of the ways of reaching it.
 *
 * Two words long because the copy lives in the dictionary, which is what makes
 * a missing translation fail to compile.
 */
export const OFFERINGS = ['web', 'internal', 'automation', 'consulting'] as const;

export type Offering = (typeof OFFERINGS)[number];
