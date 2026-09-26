# 0002 — Migrating from Astro to Next.js

- **Status:** accepted
- **Date:** 2026-09-26 (records a decision taken earlier, mid-build)

## Context

The portfolio was first built in Astro, and it worked: a content-driven static
site with island hydration is close to what Astro is for, and it shipped less
JavaScript than any React framework would.

The problem was not technical. Pablo could not read or defend a `.astro` file in
an interview. The site's entire job is to be evidence of what he can build and
maintain, and a codebase its author cannot walk someone through fails at that
job no matter how well it performs. A portfolio that cannot be defended is worse
than a slower one.

The migration was requested with the project already standing, so the cost was
real and known: rewriting every component and every layout, and re-deciding the
things the framework had decided for us.

## Decision

Migrate to **Next.js 16** with the App Router and `output: 'export'`, React 19,
Server Components by default.

`output: 'export'` keeps the property that mattered about the Astro build: every
page resolves at build time and ships as plain HTML, with no server. What
changes is that the components are React, which Pablo writes and reads daily.

## Consequences

**The accepted cost.** Next ships more JavaScript by default than Astro does,
and nothing stops that drift automatically. It has to be watched by hand:
`"use client"` only where there is state, events or browser APIs, as far down
the tree as possible, and static content passed as `children` into client
components rather than imported inside them. The bundle size that `next build`
reports is the signal — if it grows, someone added a `"use client"` that was not
needed.

**What `output: 'export'` rules out.** No Server Actions, no dynamic route
handlers, no ISR. Every dynamic segment needs its `generateStaticParams`, and a
dynamic route has to generate at least one page or the build fails. If rendering
at request time is ever needed, that is an architecture decision and gets its
own ADR rather than a quiet config change.

**What the migration cleaned up.** The list of locales used to be duplicated in
Astro's config, which cannot import TypeScript. `generateStaticParams` can, so
the list now lives only in `modules/i18n`.

**What it complicated.** With the locale as the first URL segment, the `[lang]`
layout *is* the root layout and owns `<html>`. A nested page cannot reach
`<html>`, so a case study applies its world with `data-theme` on a wrapping
element — which only works because theme tokens are written outside `@layer`,
where they beat Tailwind's own layered tokens regardless of specificity.

**Turbopack.** It is the default in Next 16 and it compiles MDX in Rust, so MDX
plugins are named as strings in `next.config.ts`. Importing the plugin functions
compiles under webpack and fails under Turbopack.
