# Closely — current checkpoint

Updated 2026-10-17. User implements and runs commands; assistant teaches, reviews read-only and maintains docs. Follow START-HERE.md for selective startup. This checkpoint supersedes historical next-action notes, but actual files and evidence must still be inspected.

## Objective and current scope

Build a usable local site: create PostgreSQL storage, save setup and reopen after restart. Full site creation is unfinished. Active work is the bounded CLI/database prerequisite that removes PUBLIC database privileges and verifies their absence. M1 remains in progress; OPS-001 is brought forward under the roadmap's feature-first sequence. No full Frappe parity or two-site isolation claim.

## Implementation and recorded evidence

User drafted restrict-site-database-access.ts, then specifically authorized assistant completion in the prior session. Assistant completed validation/revocation/postcondition/cleanup, public export, CLI dispatch/safe errors and ten invalid-name tests. This was authorized assistant work, not independent user completion or continuing implementation permission.

Prior-session assistant-run checks recorded passing: root format/lint, uncached database/CLI typecheck/build, 41 database tests, final format:check and diff --check. Live Beta restriction and repetition returned SITE_DATABASE_ACCESS_RESTRICTED/exit 0. Catalog showed Beta owner closely_beta, datallowconn=false and no PUBLIC privileges; Alpha ownership/connection setting/default PUBLIC privileges were unchanged. Missing/extra arguments, invalid name, missing database and wrong password produced safe failures/exit 1. These checks were not rerun in the current chat. Details: sessions/2026-10-17-database-access-handoff.md.

Current-chat read-only review inspected source/tests/export/CLI and progress diff. User then supplied successful format:check and staged whitespace/stat checks with final exit 0; assistant confirmed all ten intended files staged. These formatting results PRECEDE the workflow documentation edits below.

## Git and working tree

Last inspected branch: codex/site-database-access, HEAD 9fdabfdb11c471b8c5d6359c4239762c1415cc8c (PR #2 merge), no upstream. Prior PR #2 CI passed for ebd4ab7; it does not cover current access changes. No access checkpoint commit/push/PR/CI yet.

Ten paths were staged by the user: apps/cli/src/main.ts; packages/database/src/index.ts, restrict-site-database-access.ts and its test; docs/progress/CURRENT.md, HANDOFF.md, NEW-CHAT-PROMPT.md, state.json and sessions/2026-10-17-role-permissions-handoff.md plus 2026-10-17-database-access-handoff.md. Assistant subsequently edited workflow docs WITHOUT staging, committing or changing implementation. Some docs now have staged and newer unstaged versions; new archive/session files are untracked. Inspect both diffs and restage intended docs before committing. Never overwrite or silently unstage the user's snapshot.

## Latest decision and next single action

User requested lower startup overhead without losing cross-chat reliability. Assistant changed only workflow/progress docs: one authoritative HANDOFF, small state index, CURRENT pointer, selective startup and generic new-chat prompt. The complete previous tracker is preserved byte-for-byte in archive/state-through-2026-10-17.json. Detailed rationale/verification: sessions/2026-10-17-workflow-streamlining.md. No product scope or engineering gate removed.

Next: user runs formatting check for the changed docs, then we inspect/restage explicit intended documentation alongside the already-staged implementation. Review the complete staged diff before commit. Suggested implementation checkpoint message remains feat: restrict public access to site databases; workflow changes may be separately grouped if useful, preserving existing staged work. Then first push uses git push -u origin codex/site-database-access; await output, review PR and CI at its actual head before merge. Do not repeat passed runtime checks merely for documentation changes. No new runtime lesson before this checkpoint.

## Limits and protected resources

Insufficient-grant/postcondition-failure live path remains untested; no automated PostgreSQL integration or concurrency proof. Revocation followed by verification failure can leave restrictions applied; no automatic regrant. PUBLIC removal does not remove direct/member grants.

closely_bootstrap is a powerful setup account. Preserve closely_alpha (bootstrap-owned, default privileges) and closely_beta (NOLOGIN owner role, database connections disabled). Development PostgreSQL was running at the last live probe; current process state is not reverified. No secrets belong in docs/Git. Runtime login/grants, persisted credentials, setup recovery, startup wiring, restart and two-site denial tests remain pending. Production API still exposes liveness only.

## Teaching and reading pointers

Prefer an independent specification without solution code unless requested; explain purpose, whole feature journey, file responsibility and tradeoffs, then one edit/check step. Link focused official docs; learning questions belong at session end. No unanswered coding question or pending runtime output; workflow formatting is pending.

For this Git step: AGENTS Git rules and actual staged/unstaged diff. Before later runtime work: ROADMAP M1.06/M1.08/M1.10 and feature-first delivery, engineering/handbook.md, engineering/project-structure.md and testing-and-operations.md, parity/features.json OPS-001. Retrieve exact historical commands from the linked implementation session only as needed. state.json indexes older task evidence; never treat its archive as current status.
