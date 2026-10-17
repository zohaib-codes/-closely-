# Closely — current checkpoint

Updated 2026-10-17. User writes implementation and runs commands; assistant teaches, reviews read-only and maintains documentation.

## Latest implementation and verification

2026-10-17 explicit one-time user authorization: assistant implemented missing-owner catalog preflight and actionable CLI message. Assistant-run root format/lint, uncached database/CLI typecheck/build, database tests, format:check and diff --check passed (exit 0). Live missing owner returned SITE_OWNER_NOT_FOUND with fixed recovery text, exit 1; catalog before/after showed role=false and database=false, exit 0. Existing Beta duplicate still returns DATABASE_ALREADY_EXISTS, exit 1. Earlier 31-test count and Beta ownership/closed connection evidence remain recorded separately. No commit/push performed.

## Verified role checkpoint

User implemented createSiteRole, its public export, create-site-role CLI dispatch/error handling, and 10 invalid-name tests. User-supplied root format/lint, uncached database/CLI typecheck/build, 20 database tests and final formatting/whitespace checks passed with exit 0. Assistant inspected corrected source read-only; no assistant build/test execution.

Live user output: create-site-role closely_beta succeeded (0); duplicate returned SITE_ROLE_ALREADY_EXISTS (1); invalid name returned INVALID_SITE_ROLE_NAME (1). Catalog showed one role with LOGIN/SUPERUSER/CREATEDB/CREATEROLE/REPLICATION/BYPASSRLS all false, no closely_beta database, exit 0. Local socket login explicitly failed because closely_beta is not permitted to log in (2).

## Git checkpoint

Branch codex/site-database-account. Last confirmed commit/push de36f17c3f331bef1808ce6306d262c53e558a06, feat: create restricted PostgreSQL site roles. User supplied successful push and exit 0; assistant confirmed local HEAD and clean tree before subsequent documentation updates. Preceding correction dd87ebc is also pushed. No PR or CI result checked for this increment. Prior PR #1 was merged; do not repeat that workflow.

Current uncommitted work includes create-site-database.ts, its tests, CLI main.ts, architecture and progress documentation. Source and targeted live checks passed; latest documentation wording needs the final user-run formatting check before staging. Commit/push this coherent increment after review and verification.

## Feature and existing resources

Goal: create a local site, persist setup, and reopen after restart. Full site creation is unfinished. CLI currently offers check-database, create-site-database and create-site-role; database package owns SQL/client cleanup, CLI owns arguments and safe output.

- closely_bootstrap: powerful setup account, not an application user.
- closely_alpha: existing database owned by closely_bootstrap, with previously inspected default ACL. Do not silently adopt, drop, recreate or change its ownership.
- closely_beta: existing NOLOGIN role owns the closely_beta database. User catalog output confirms datallowconn=false; an attempted bootstrap connection was refused with exit 2. Preserve both resources.

No passwords, site grants, saved credentials, setup recovery, startup connection wiring or two-site isolation implemented/verified. Production API still provides liveness only. M1 remains in progress; full Frappe parity is not established.

## Next single lesson

Review and checkpoint the verified explicit-owner/closed-database increment plus missing-owner diagnostic: user formats/checks latest docs, stages explicit intended source/test/architecture/progress paths, inspects staged diff, commits and pushes codex/site-database-account. Last confirmed pushed commit remains de36f17; no new PR/CI evidence. Teaching/user-owned implementation resumes after this one-time assistant authorization. Runtime login, grants, saved setup, recovery and restart remain pending.

## Teaching continuity

User paused to ask what database creation versus role creation actually accomplishes. Explain using a familiar CRUD connection string: database holds data; PostgreSQL account controls server access; Closely application users and their document permissions are a separate layer. Roles are cluster-wide; matching names do not bind a role to a database. Distinguish LOGIN, database CONNECT, schema/table permissions and ownership. PUBLIC defaults mean granting own-site access alone cannot establish isolation.

Continue purpose and complete feature journey before files. User prefers an independent specification without solution code, but explicitly requested exact fixes when review found issues. Give one manageable edit/check chunk, wait for evidence, and save learning questions for session end. Do not assume prior explanations establish understanding.

Details: [latest session](sessions/2026-10-17-role-permissions-handoff.md), [state](state.json).
