# 2026-10-17 — Database access handoff

## Current checkpoint

Branch codex/site-database-access; HEAD 9fdabfdb11c471b8c5d6359c4239762c1415cc8c, the PR #2 merge. No upstream, new checkpoint commit, push or PR for access restriction. Preserve all uncommitted work. Prior PR #2 CI passed at ebd4ab7; that evidence does not cover the new changes.

## User and assistant work

User created a partial restrict-site-database-access.ts draft, then explicitly authorized assistant completion of this task. Assistant removed the empty catch, aligned the public function name, added postcondition verification, public export, CLI dispatch/errors and ten invalid-name tests. This is authorized assistant work, not independent user completion. Default resumes user implementation/specification-first teaching. Earlier missing-owner refinement was also explicitly authorized separately.

## Verified evidence

Assistant-run root format/lint, uncached database/CLI typecheck/build, 41 database tests, final format:check and diff --check passed. Live Beta restriction and repeat each returned SITE_DATABASE_ACCESS_RESTRICTED with exit 0. Catalog showed Beta owner closely_beta, datallowconn=false and no PUBLIC database privileges. Alpha remained bootstrap-owned, datallowconn=true, default ACL and PUBLIC CONNECT/TEMPORARY. Missing/extra CLI arguments, invalid name, missing database and wrong password produced expected safe errors, exit 1. No pending user output for these checks.

Insufficient-grant/postcondition-failure behavior has not been independently exercised. No automated PostgreSQL integration test or concurrency proof. A successful REVOKE followed by failed verification can leave the restriction applied; the command does not automatically regrant permissions. Repetition is supported. Revoking PUBLIC does not remove direct/membership grants and is not complete site isolation.

## Files to review and preserve

- packages/database/src/restrict-site-database-access.ts (new; includes user draft completed by assistant)
- packages/database/src/restrict-site-database-access.test.ts (new)
- packages/database/src/index.ts
- apps/cli/src/main.ts
- docs/progress/CURRENT.md
- docs/progress/HANDOFF.md
- docs/progress/NEW-CHAT-PROMPT.md
- docs/progress/state.json
- docs/progress/sessions/2026-10-17-role-permissions-handoff.md
- docs/progress/sessions/2026-10-17-database-access-handoff.md (this note)

## Next single action

Before new implementation, inspect the current diff and prepare a user-run checkpoint commit on codex/site-database-access. Stage explicit access function/test, database public export, CLI and related progress paths after formatting/whitespace checks; suggested commit: feat: restrict public access to site databases. First push requires git push -u origin codex/site-database-access. Await user output before recording commit/push. Then review PR/CI for the bounded increment or explicitly record any remaining acceptance scope. Do not repeat already-passed checks without changed source or a new concern. Insufficient-grant/postcondition-failure live path is still untested. Resume user-owned teaching; prior task-specific assistant implementation authorization is not blanket permission.

## Feature context

Goal remains create a local site, save its setup, and reopen after restart. Beta exists with NOLOGIN owner and no PUBLIC database privileges; connections remain disabled. Alpha is an existing separate bootstrap-owned database and must not be silently changed. Development PostgreSQL was running for live probes; it was not stopped. Runtime login, explicit runtime grants, credential persistence, setup recovery, startup wiring and two-site denial/restart behavior remain pending. Kysely is planned beneath the custom Document engine, not installed. No full Frappe parity claim.

No new learning quiz was completed. Explain purpose, package responsibility and tradeoffs before one manageable specification; exact corrections/code when requested. Do not treat task-specific delegation as continuing authorization.

## Read-only resume

2026-10-17 resume: assistant inspected access function/tests, public export, CLI and progress diff read-only. Local branch remains codex/site-database-access at 9fdabfdb11c471b8c5d6359c4239762c1415cc8c with no upstream. Earlier test/live results are recorded prior-session evidence, not rerun this session. Next user step is formatting check and explicit staging/review of the ten checkpoint files; commit/push output remains pending.

No implementation, test/build command or Git mutation performed. User-owned teaching continues; no new learning assessment.
