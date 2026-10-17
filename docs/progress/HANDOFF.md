# Closely — current checkpoint

Updated 2026-10-17. User writes implementation and runs commands; assistant teaches, reviews read-only and maintains documentation.

## Latest implementation and verification

2026-10-17 explicit one-time user authorization: assistant implemented missing-owner catalog preflight and actionable CLI message. Assistant-run root format/lint, uncached database/CLI typecheck/build, database tests, format:check and diff --check passed (exit 0). Live missing owner returned SITE_OWNER_NOT_FOUND with fixed recovery text, exit 1; catalog before/after showed role=false and database=false, exit 0. Existing Beta duplicate still returns DATABASE_ALREADY_EXISTS, exit 1. Earlier 31-test count and Beta ownership/closed connection evidence remain recorded separately. This implementation was subsequently committed/pushed at cda9add; see Git checkpoint.

## Verified role checkpoint

User implemented createSiteRole, its public export, create-site-role CLI dispatch/error handling, and 10 invalid-name tests. User-supplied root format/lint, uncached database/CLI typecheck/build, 20 database tests and final formatting/whitespace checks passed with exit 0. Assistant inspected corrected source read-only; no assistant build/test execution.

Live user output: create-site-role closely_beta succeeded (0); duplicate returned SITE_ROLE_ALREADY_EXISTS (1); invalid name returned INVALID_SITE_ROLE_NAME (1). Catalog showed one role with LOGIN/SUPERUSER/CREATEDB/CREATEROLE/REPLICATION/BYPASSRLS all false, no closely_beta database, exit 0. Local socket login explicitly failed because closely_beta is not permitted to log in (2).

## Git checkpoint

User committed and pushed cda9add0ed35c77ce678216ff26177c0bdf96b82 (feat: create site databases with explicit ownership), exit 0. Assistant confirmed HEAD and local upstream-tracking ref match, with a clean working tree before this documentation update. Prior de36f17 role checkpoint and dd87ebc correction are included on the branch. PR #2 https://github.com/zohaib-codes/-closely-/pull/2 is open. Assistant full branch review found no blocking code findings for this increment. PR CI run 38987185589 and push run 38984922110 both passed for cda9add; GitHub reports CLEAN/mergeable. No formal approval or merge recorded. CI does not run the manual live PostgreSQL probes. Only this checkpoint documentation is newly uncommitted.

## Feature and existing resources

Goal: create a local site, persist setup, and reopen after restart. Full site creation is unfinished. CLI currently offers check-database, create-site-database and create-site-role; database package owns SQL/client cleanup, CLI owns arguments and safe output.

- closely_bootstrap: powerful setup account, not an application user.
- closely_alpha: existing database owned by closely_bootstrap, with previously inspected default ACL. Do not silently adopt, drop, recreate or change its ownership.
- closely_beta: existing NOLOGIN role owns the closely_beta database. User catalog output confirms datallowconn=false; an attempted bootstrap connection was refused with exit 2. Preserve both resources.

No passwords, site grants, saved credentials, setup recovery, startup connection wiring or two-site isolation implemented/verified. Production API still provides liveness only. M1 remains in progress; full Frappe parity is not established.

## Next single lesson

PR #2 is open and attached. Full branch review found no blocking code findings for the bounded prerequisite. PR CI run 38987185589 and push CI run 38984922110 succeeded for cda9add0ed35c77ce678216ff26177c0bdf96b82; GitHub mergeStateStatus CLEAN, no formal review approval recorded. User formats/stages/commits/pushes the five pending progress files, then assistant verifies CI at the new PR head before guiding a normal merge commit. No merge performed; do not keep creating another documentation-only commit merely to record the next CI refresh.

## Teaching continuity

User paused to ask what database creation versus role creation actually accomplishes. Explain using a familiar CRUD connection string: database holds data; PostgreSQL account controls server access; Closely application users and their document permissions are a separate layer. Roles are cluster-wide; matching names do not bind a role to a database. Distinguish LOGIN, database CONNECT, schema/table permissions and ownership. PUBLIC defaults mean granting own-site access alone cannot establish isolation.

Continue purpose and complete feature journey before files. User prefers an independent specification without solution code, but explicitly requested exact fixes when review found issues. Give one manageable edit/check chunk, wait for evidence, and save learning questions for session end. Do not assume prior explanations establish understanding.

Details: [latest session](sessions/2026-10-17-role-permissions-handoff.md), [state](state.json).
