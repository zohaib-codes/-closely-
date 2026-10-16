# Closely — current checkpoint

Updated 2026-10-16. User writes implementation and runs commands; assistant teaches, reviews read-only and maintains documentation.

## Last completed user action

User changed database-name suffix maximum from 56 to 55 and added rejection for closely_ plus 56 characters, preserving the 57-character case. Read-only diff confirms both edits. User-supplied database-source formatting and uncached @closely/database typecheck/test/build passed: 10 tests, exit 0. No new full-workspace lint/CI or live maximum-length database creation check supplied.

## Git checkpoint

PR #1 (https://github.com/zohaib-codes/-closely-/pull/1) merged as ac3c6d30c5de52e23e882dc9652bc7f04282af9e. Assistant verified successful PR CI run 38836586596 for f319d07e125b1fc947b0e4289b6a7090dd0a6e67 before merge. User fast-forwarded local main, deleted the fully merged local codex/site-foundation-checkpoint branch, and created codex/site-database-account. Current correction and handoff docs are uncommitted; no push or upstream configured for this new branch has been confirmed. Do not repeat the previous PR workflow or claim these latest edits have CI coverage.

## Feature and actual implementation

Goal: create a local site, persist its setup, and reopen it after restart. Physical database creation works; full site creation does not yet exist. CLI exposes check-database and create-site-database through @closely/database. Existing closely_alpha is bootstrap-owned; do not silently reuse, drop or recreate it.

Latest user SQL inspection passed exit 0: closely_bootstrap has superuser, create-database, create-role and login attributes; closely_alpha owner is closely_bootstrap and datacl is null (default privileges). Explain PostgreSQL accounts separately from application guest/user actors. PUBLIC includes every role and defaults include database CONNECT; a separate login alone does not prove isolation. No site login, grants, credentials persistence or account creation code implemented.

Site/context/metadata components are locally checked, but production API still only serves liveness. Full Frappe parity, tenant database isolation and production routing are not established. M1 remains in progress; parity capability status is unchanged.

## Next single lesson

Before further runtime work, review and commit/push the small verified database-name correction with related handoff docs on codex/site-database-account (user executes commands). User-supplied documentation formatting and git diff --check passed with exit 0; commit and push remain pending. Then resume site-account design and assign one manageable implementation specification without solution code unless requested. Explain exact CLI caller, database-package responsibility, name/password handling, grants, duplicate/failure behavior, and verification before edits. No account implementation specification or files have yet been assigned.

## Teaching and evidence limits

Continue beginner-first complete-feature teaching: visible goal, how files cooperate, brief official reading, one manageable user-owned edit/check chunk. User prefers specifications without solution code for an independent attempt. Questions belong at session end, not as prerequisites. No unresolved learner question was explicitly recorded; account ownership/grants and secret persistence still require design, not assumptions.

The earlier recommendation to increase the suffix to 56 was an assistant teaching error: closely_ is 8 ASCII bytes, so the 63-byte limit allows 55 suffix characters. The correction is now inspected and locally tested; do not assign it again. User supplied successful documentation formatting and whitespace-check output; subsequent checkpoint wording updates require the final pre-commit formatting pass. No assistant implementation/build/test commands were run. PostgreSQL availability is supported by supplied SQL output, not a fresh assistant service check.

Details: [latest session](sessions/2026-10-16-site-account-handoff.md), [state](state.json).
