/**
 * The only place the environment is read. NODE_ENV is set by Next itself rather
 * than configured by us, so it needs no schema — anything the site configures
 * gets validated with Zod here before it is exported.
 */
export const isProduction = process.env.NODE_ENV === 'production';
