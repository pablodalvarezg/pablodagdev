---
name: pr-review
description: "Three-pass review of the current branch before a pull request: a broad correctness sweep, an adversarial second correctness pass, then over-engineering. Tags every finding FIX or CHECK and closes with a GTG or FIX verdict. Use when the user says /pr-review, asks for a review before opening or merging a PR, or asks whether a branch is good to go."
---

Run all three passes over the same diff, then report once. Scope is `main...HEAD`
unless the user names another target.

## Pass 1 — correctness, broad

Invoke the `code-review` skill. Sweep the whole diff for real defects: broken
logic, unhandled failure modes, type holes, accessibility or i18n regressions,
and violations of the dependency direction in CLAUDE.md. No formatting or naming
preferences.

## Pass 2 — correctness, adversarial

Invoke `code-review` a second time with one job: **try to refute pass 1**.

Take each pass 1 finding and argue against it from the code. Look for the reason
it is wrong: a guard that already exists, a caller that cannot reach that state,
an API that does not behave the way the finding assumes, a version where the
claim stopped being true, a fix that would not actually work. A finding survives
only when the attempt to refute it fails.

For every pass 1 finding report one of:

- `refuted` — and the evidence that kills it.
- `survives` — and what the refutation ran into.

Refuted findings do not reach the final report except as one line saying they
were dropped and why.

Then, with what is left, hunt where pass 1 moved fast: error paths, boundary
conditions, the files it barely opened. Anything new found here faces the same
refutation test before it is reported.

## Pass 3 — over-engineering

Invoke the `ponytail:ponytail-review` skill. Only what can be deleted:
speculative abstractions, reinvented standard library, dependencies a few lines
would replace, scaffolding for a future that has not arrived.

## Output

One report, the three passes as separate sections, findings ranked by severity.
Tag and close the verdict exactly as `## Forma de trabajo` in CLAUDE.md
defines it — that file is the single source of those rules, so do not restate
them here.

A pass that found nothing gets one line saying so, not padding.

## Before reporting a finding

Verify the claim against the code, the installed version, or the vendor docs.
A confident wrong finding costs more than a missed one: it sends someone to fix
something that was never broken, or proposes a fix that does not work. If a
claim cannot be checked, say it is unverified instead of asserting it.

This project ships its framework's own documentation in `node_modules/next/dist/docs/`,
and `AGENTS.md` says to read it before writing App Router code. Read it before
reporting a finding about one too: the version in the tree is the authority,
not recollection of an earlier Next.

## Checks worth running rather than assuming

Two failures in this project's history were both silent, and both would have
been caught by running something instead of reading:

- **A linter that passes while checking nothing.** After any change to
  `eslint.config.mjs` or to the boundaries element patterns, create temporary
  fixtures that violate the rules, confirm each one errors, then delete them. A
  plugin whose config syntax went stale reports success on an empty check.
- **A replacement that silently matched nothing.** String edits applied without
  asserting the match succeeded report success having changed no file. When a
  diff was produced that way, diff the result against `main` rather than
  trusting that the edit landed.
