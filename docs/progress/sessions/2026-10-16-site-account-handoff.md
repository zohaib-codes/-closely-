# 2026-10-16 — Site account branch handoff

## Explained

Separate PostgreSQL login from application users; setup account privileges; database owner and default ACL; PUBLIC CONNECT requires explicit treatment for site isolation. Account creation/grants and persistent credentials remain to be designed before implementation.

## User completed and checked

User changed database-name suffix maximum from 56 to 55 and added rejection for closely_ plus 56 characters, preserving the 57-character case. Read-only diff confirms both edits. User-supplied database-source formatting and uncached @closely/database typecheck/test/build passed: 10 tests, exit 0. No new full-workspace lint/CI or live maximum-length database creation check supplied.

## Git

Previous feature PR #1 merged at ac3c6d3 after exact-head CI success for f319d07. Local main synchronized and old local branch deleted. User created codex/site-database-account. Correction and progress documentation committed as dd87ebcf7eecc626704e291e152a99fea7163f91. Assistant verified matching remote head using git ls-remote. Repeated commit command returned 1 because there was nothing left to commit; it did not indicate a failed test or lost change.

## Next action

Correction committed as dd87ebcf7eecc626704e291e152a99fea7163f91 and remote branch verified with git ls-remote; resume site-account design. No CI result for this commit has been checked. Then resume site-account design and assign one manageable implementation specification without solution code unless requested. Explain exact CLI caller, database-package responsibility, name/password handling, grants, duplicate/failure behavior, and verification before edits. No account implementation specification or files have yet been assigned.

## Outstanding evidence

User supplied documentation formatting and git diff --check success with exit 0. Commit and remote push now verified at dd87ebc; this later documentation-only evidence update remains uncommitted. No role creation, grant/denial behavior, persisted setup, restart behavior, or two-site database isolation verified. Prior 68 package tests plus 13 comparator tests passed before this correction; latest focused database run has 10 tests. No need to replay Docker setup or previous Git checkpoint.

## Next implementation specification assigned

Implement create-site-role as a CLI-connected prerequisite: create a NOLOGIN PostgreSQL role with no elevated attributes or memberships. Add create-site-role.ts, public export, CLI branch and invalid-name tests. No password, grants, database ownership changes or login activation in this chunk. Review user code before live role creation. Next connect permissions and credentials before enabling login; site creation remains incomplete.

Role name policy: closely_ plus 1-55 lowercase ASCII letters/digits/underscores, reject padding. PostgreSQL role names are cluster-wide. Explicit NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS, no memberships. Duplicate SQLSTATE 42710 becomes SITE_ROLE_ALREADY_EXISTS; invalid name becomes INVALID_SITE_ROLE_NAME. CLI success SITE_ROLE_CREATED, unexpected failure SITE_ROLE_CREATION_FAILED. No user implementation or checks received for this assignment. PostgreSQL 18 CREATE ROLE/privileges and node-postgres utility docs consulted. NOLOGIN stages the account before permissions/password activation; no isolation claim.

## First role implementation review

User wrote role function, public export, CLI wiring and 10 invalid-name test cases; assistant reviewed source only. Fix CLI dispatch so each command executes only its own operation, add SITE_ROLE_ALREADY_EXISTS to safe codes and SITE_ROLE_CREATION_FAILED fallback, and change role validator regex binding to const. Review corrected code before checks or live execution. No tests/build/lint or role creation verified.

Inspected: validation precedes connection, quoted role identifier, six restricted attributes, duplicate SQLSTATE mapping and finally cleanup. Blocking dispatch defect: both create commands fall through database creation then role creation, causing unintended database or role mutations. Error mapping omits duplicate role safe code and role-specific unexpected failure. Test cases are present, not executed.

## Second role implementation review

Second source review: const binding and SITE_ROLE_ALREADY_EXISTS safe code fixed. CLI still executes database then role unconditionally; role-specific failure fallback missing. Exact replacement branches and fallback supplied for user to apply, plus regex variable spelling cleanup. Run formatting/lint, database and CLI typecheck/build, database tests after corrections; no live role command until checks reviewed. No new check results supplied.

## Role implementation local checks passed

User-supplied role correction check batch passed with exit 0: root format/lint, uncached database and CLI typecheck/build, 20 database tests (10 database-name and 10 role-name), final format check and whitespace check. Assistant read-only source review confirms separate command branches, safe duplicate-role code, role-specific fallback and const pattern. Live role creation and denial behavior remain unverified.

User runs live create-site-role closely_beta, duplicate and invalid-name cases, then inspects pg_roles and pg_database and attempts local socket login as the NOLOGIN role. Review actual outputs before commit/push of this coherent chunk; no site isolation or credentials persistence claim.

Evidence: user attachment 1240ce48-4e7c-42bc-8120-6c3dc0b9f9ff/Pasted text.txt. Documentation updates follow the passing formatting check. No assistant builds or tests executed.

## Live role checks complete; Git checkpoint pending

Role creation chunk checked locally: user-supplied root lint/format, uncached database/CLI typecheck/build and 20 database tests passed with exit 0. Live CLI created closely_beta (0), rejected duplicate SITE_ROLE_ALREADY_EXISTS (1), and rejected invalid name INVALID_SITE_ROLE_NAME (1). Catalog inspection returned one role with all six flags false, no closely_beta database, exit 0. Local socket login failed explicitly because role is not permitted to log in, exit 2. Source reviewed read-only; no assistant test execution.

Format updated progress docs, stage the four role implementation/test/CLI files and five progress files explicitly, commit and push on codex/site-database-account. Await command output before recording commit/push success. Then design database permissions and ownership before password/login activation; closely_alpha is bootstrap-owned and closely_beta is an existing NOLOGIN role, not a complete site.

No role-authentication-failure fallback probe, cross-site permissions, password configuration, restart persistence, new CI or Frappe parity established. Documentation updated after the passing formatter.
