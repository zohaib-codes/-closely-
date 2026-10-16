# Database creation checked — 2026-10-16

2026-10-16 database creation batch: user-supplied root format/lint succeeds; uncached database/CLI typecheck/build and9 invalid-name tests pass; final format:check and exit0. Read-only creation function/tests/public export/CLI/package review matches correction. Manual CLI: check-database success0; closely_alpha creation success0; duplicate DATABASE_ALREADY_EXISTS1; invalid alpha INVALID_DATABASE_NAME1; wrong-password closely_denied creation fails1. PostgreSQL catalog query returns only closely_alpha and exit0. Physical database creation confirmed by supplied live output; no complete site or tenant-role isolation established.

## Next

Next within create/reopen-site feature: explain and design persistent site setup linking site identity, approved hostname and physical database, plus where connection credentials live. Decide and record storage/ownership and partial-failure recovery before implementation; account for existing bootstrap-owned closely_alpha without silently reusing it as a completed site. Restricted per-site database roles, initial tables, production startup use and restart/two-site proof remain required. No next code assigned. User prefers independent attempts by default, but explicitly requested solution code for the last correction/CLI chunk.

No assistant implementation edits or check execution. No new remote CI evidence.9 tests cover invalid input rejection; manual database integration covers actual mutation/duplicate/auth failure.63-character valid-name boundary, network interruption/ambiguous success, cleanup failure, container recreation and real tenant isolation not checked. Existing database retained; no cleanup requested. Progress edits postdate passing format check.

## Persistent setup design discussion

Next design checkpoint: per-site JSON setup outside source checkout, following Frappe file-based site configuration responsibility; credentials referenced separately under existing control-registry rule. Propose native versioned setup with explicit siteName, approved hostname, database connection identity and lifecycle state; distinguish creating from ready. Before source assignment finalize credential storage, safe paths/atomic writes, duplicate-host ownership and recovery. Existing closely_alpha is bootstrap-owned and must not be silently registered as ready. User is to review concrete persistence design; no new code/checks assigned.

Pinned Frappe config.py and official site_config documentation inspected. Frappe JSON config responsibility is evidence; exact native control registry/secret layout remains a proposal, not completed or approved compatibility. Full implementation requirements include publishing only complete setup, distinguishing incomplete creation, and rejecting existing database adoption without explicit verification.
