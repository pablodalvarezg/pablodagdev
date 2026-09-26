# 0001 — Modular monolith

- **Status:** accepted
- **Date:** 2026-09-26

## Context

This is a portfolio: one static site, one author, no users to serve at runtime.
It has to hold a hub, a growing set of case studies, two locales and a theme per
project, and it has to stay readable by the one person who maintains it.

The pressure to split it comes from the side projects, not from the site. Each
side project is its own repository with its own backend, and the temptation is to
mirror that separation inside the portfolio too: a service for content, another
for i18n, a package per module. That would buy nothing here. There is no
independent scaling need, no team boundary to respect, and no deploy that has to
ship without the others — the whole thing resolves at build time and ships as
HTML.

The real risk is the opposite one: a single `src/components` folder that grows
until nobody can tell what depends on what, and a change to the theme system
touches a file that also reads the filesystem.

## Decision

One repository, one deploy, organised as a **modular monolith**: modules by
domain (`projects`, `hub`, `experience`, `theming`, `i18n`), each exposing a
public API through its `index.ts`, each split into `domain` (pure TypeScript),
`data` (the only layer with I/O) and `ui` (presentation, props only).

Dependencies flow one way: `app → modules → shared`, and within a module
`ui → domain` and `data → domain`. `shared` never imports from `modules`. Deep
imports across modules are forbidden.

The boundaries are enforced by `eslint-plugin-boundaries` rather than by
discipline, because a rule nobody checks is a rule that is already broken.

No microservices, no queues, no separate backends, no multi-package monorepo.
Scalability is bought with good limits between modules, not with a network
between services.

## Consequences

**What this gives us.** A module can be understood, tested and replaced on its
own. `domain` is pure, so it takes the detailed unit tests without a framework
in the way. `data` is the only place that reads the filesystem, so the question
"where does this content come from" has exactly one answer. Adding a world is a
token file plus a registry entry, because no component knows which theme it is
rendering.

**What it costs.** The structure is heavier than a portfolio strictly needs:
five modules and a `shared` layer for a site with four pages. That cost is
accepted on purpose — the site exists to be read by an interviewer, and the way
it is organised is part of what it demonstrates. The layers are also not
uniform: a small module may skip one, and that is allowed, but layers never get
mixed inside a single file.

**What it forbids.** If a module ever needs another module's internals, the
boundary is wrong: the shared piece moves to `shared` or the domain gets
rethought. Relaxing the linter is not an option on the table; the design gets
fixed instead.

**When to revisit.** If a side project's backend ever needs to live inside this
repository, or if the site needs rendering at request time rather than at build
time. Neither is true today, and the second one gets its own ADR.
