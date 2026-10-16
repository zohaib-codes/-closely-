# 2026-10-16 — Site account branch handoff

## Explained

Separate PostgreSQL login from application users; setup account privileges; database owner and default ACL; PUBLIC CONNECT requires explicit treatment for site isolation. Account creation/grants and persistent credentials remain to be designed before implementation.

## User completed and checked

User changed database-name suffix maximum from 56 to 55 and added rejection for closely_ plus 56 characters, preserving the 57-character case. Read-only diff confirms both edits. User-supplied database-source formatting and uncached @closely/database typecheck/test/build passed: 10 tests, exit 0. No new full-workspace lint/CI or live maximum-length database creation check supplied.

## Git

Previous feature PR #1 merged at ac3c6d3 after exact-head CI success for f319d07. Local main synchronized and old local branch deleted. User created codex/site-database-account. Two runtime/test edits and progress documentation remain uncommitted. No new-branch push confirmed.

## Next action

Before further runtime work, review and commit/push the small verified database-name correction with related handoff docs on codex/site-database-account (user executes commands). User-supplied documentation formatting and git diff --check passed with exit 0; commit and push remain pending. Then resume site-account design and assign one manageable implementation specification without solution code unless requested. Explain exact CLI caller, database-package responsibility, name/password handling, grants, duplicate/failure behavior, and verification before edits. No account implementation specification or files have yet been assigned.

## Outstanding evidence

User supplied documentation formatting and git diff --check success with exit 0. Checkpoint wording updated afterward; final pre-commit formatting and correction commit/push remain pending. No role creation, grant/denial behavior, persisted setup, restart behavior, or two-site database isolation verified. Prior 68 package tests plus 13 comparator tests passed before this correction; latest focused database run has 10 tests. No need to replay Docker setup or previous Git checkpoint.
