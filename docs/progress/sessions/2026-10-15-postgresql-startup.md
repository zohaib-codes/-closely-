# PostgreSQL startup reviewed — 2026-10-15

2026-10-15 user-supplied Compose config/up/ps/psql batch passed with final exit0. Pinned PostgreSQL18.6-bookworm image pulled; closely-development network, named postgres-data volume and postgres container created. Container healthy on127.0.0.1:15432->5432. SQL reports PostgreSQL18.6, database postgres, account closely_bootstrap. Read-only infra/development/compose.yaml matches assignment. This verifies container startup and in-container SQL only; host TCP authentication, Node connection, persisted site creation and survival after recreation remain unverified.

## Next single lesson

Continue the same create-and-reopen-site feature: explain how a Node command connects to PostgreSQL on127.0.0.1:15432, introduce the planned database package and pg driver only with a concrete caller/use in the site command. Verify exact dependency versions and public boundaries before assigning one coherent connection/check chunk. No connection code/install commands assigned yet. Site database/setup creation, restricted runtime accounts, failure recovery and restart/two-site proof remain required; no debug route detour.

Assistant inspected configuration and updated progress documentation only; no runtime changes or checks executed. Container reported running and intentionally retained for the ongoing feature. PostgreSQL bootstrap account is for setup, not ordinary per-site application access. Named volume configuration is present, but survival after replacement is not yet demonstrated.

## Next assignment: runnable CLI database check

Assigned user-owned Node connection chunk: create @closely/database with pg8.23.1 runtime and @types/pg8.23.1 dev dependencies and checkPostgresConnection; create @closely/cli runtime consumer with check-database command reading CLOSELY_DATABASE_URL; copy existing server TS/build configurations and add database to root lint prerequisite builds. User installs, formats/lints, builds/typechecks database/cli, then runs CLI with valid and invalid local password (expect DATABASE_CONNECTION_OK exit0, DATABASE_CHECK_FAILED exit1). No code/check output received yet. Same create-and-reopen-site feature; site creation/storage and restart proof still pending.

Official npm registry metadata checked read-only: pg8.23.1 and @types/pg8.23.1 MIT; pg requires Node>=16 and supplies ESM named Client export. Official node-postgres connecting/Client docs reviewed. Existing Node24 target is compatible by declared engine range, not yet runtime verified. Client for one short-lived CLI operation, with connection/query timeout and finally end; no pooling or Kysely yet. CLI uses redacted stable output codes; does not print connection URI/raw errors. Database package type:adapter/runtime:server consumes no engine yet. Existing scope/browser boundary applies; no independently verified adapter-specific restriction. No implementation or installs executed by assistant.
