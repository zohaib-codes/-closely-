# Closely — current checkpoint

Updated 2026-10-16. User writes implementation and runs commands; assistant teaches, reviews read-only and maintains documentation.

## Last completed user action

Role creation chunk checked locally: user-supplied root lint/format, uncached database/CLI typecheck/build and 20 database tests passed with exit 0. Live CLI created closely_beta (0), rejected duplicate SITE_ROLE_ALREADY_EXISTS (1), and rejected invalid name INVALID_SITE_ROLE_NAME (1). Catalog inspection returned one role with all six flags false, no closely_beta database, exit 0. Local socket login failed explicitly because role is not permitted to log in, exit 2. Source reviewed read-only; no assistant test execution.

## Git checkpoint

PR #1 (https://github.com/zohaib-codes/-closely-/pull/1) merged as ac3c6d30c5de52e23e882dc9652bc7f04282af9e. Assistant verified successful PR CI run 38836586596 for f319d07e125b1fc947b0e4289b6a7090dd0a6e67 before merge. User fast-forwarded local main, deleted the fully merged local codex/site-foundation-checkpoint branch, and created codex/site-database-account. Correction and handoff docs committed as dd87ebcf7eecc626704e291e152a99fea7163f91. Assistant read-only verification confirms the remote branch has that same commit and the working tree was clean before this evidence update. Do not repeat the previous PR workflow or claim these latest edits have CI coverage.

## Feature and actual implementation

Goal: create a local site, persist its setup, and reopen it after restart. Physical database creation works; full site creation does not yet exist. CLI exposes check-database and create-site-database through @closely/database. Existing closely_alpha is bootstrap-owned; do not silently reuse, drop or recreate it.

Latest user SQL inspection passed exit 0: closely_bootstrap has superuser, create-database, create-role and login attributes; closely_alpha owner is closely_bootstrap and datacl is null (default privileges). Explain PostgreSQL accounts separately from application guest/user actors. PUBLIC includes every role and defaults include database CONNECT; a separate login alone does not prove isolation. Role creation code and NOLOGIN denial are locally checked; closely_beta exists without a matching database. Grants, credentials persistence and login activation remain unimplemented.

Site/context/metadata components are locally checked, but production API still only serves liveness. Full Frappe parity, tenant database isolation and production routing are not established. M1 remains in progress; parity capability status is unchanged.

## Next single lesson

Format updated progress docs, stage the four role implementation/test/CLI files and five progress files explicitly, commit and push on codex/site-database-account. Await command output before recording commit/push success. Then design database permissions and ownership before password/login activation; closely_alpha is bootstrap-owned and closely_beta is an existing NOLOGIN role, not a complete site.

## Teaching and evidence limits

Continue beginner-first complete-feature teaching: visible goal, how files cooperate, brief official reading, one manageable user-owned edit/check chunk. User prefers specifications without solution code for an independent attempt. Questions belong at session end, not as prerequisites. No unresolved learner question was explicitly recorded; account ownership/grants and secret persistence still require design, not assumptions.

The earlier recommendation to increase the suffix to 56 was an assistant teaching error: closely_ is 8 ASCII bytes, so the 63-byte limit allows 55 suffix characters. The correction is now inspected and locally tested; do not assign it again. User supplied successful documentation formatting and whitespace-check output; subsequent checkpoint wording updates require the final pre-commit formatting pass. No assistant implementation/build/test commands were run. PostgreSQL availability is supported by supplied SQL output, not a fresh assistant service check.

Details: [latest session](sessions/2026-10-16-site-account-handoff.md), [state](state.json).
