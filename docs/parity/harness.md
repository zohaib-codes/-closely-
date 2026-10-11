# Reference harness — baseline and future design

Status: initial user-built baseline exists as of 2026-10-11. The earlier assistant-created harness was removed on 2026-10-08. User-created infrastructure lives in infra/reference; three raw HTTP fixtures, a provenance manifest and SHA256SUMS live in tests/parity/fixtures/frappe-v16.51.0. tests/parity/response.ts parses stored responses and compares status/JSON; an explicit guest-user-denial policy substitutes only nested __frappe_exc_id values after validation.

Supplied local checks: six strict checksum checks, parity typecheck, 13 comparator/identity tests and root lint/format pass with exit 0. Workflow includes checksum and parity checks. Remote run38096611743 passed for commit72390de, including the explicit parity checks. Candidate tests are synthetic; this baseline does not establish live Closely compatibility. Header comparison, general manifest validation, automated capture/identity attestation, controlled scenarios and broader feature coverage remain future work.

## Purpose

A reference harness runs controlled scenarios against the pinned Frappe release and our implementation, recording and comparing observable behavior. Unit tests can prove our own logic; they alone cannot establish that the behavior matches Frappe.

## Planned responsibilities

- Verify the exact Frappe source revision and record runtime, app and configuration identities.
- Provision an isolated reference environment; keep its database separate from our native PostgreSQL system.
- Start with read-only v1/v2 ping and guest denied-access probes, then expand to two sites, contrasting roles and controlled mutations.
- Store reviewed request/response, lifecycle/database outcomes, worker events and browser fixtures with source/configuration/seed identities.
- Compare like-for-like native or compatibility endpoints; report missing/extra observations, status and payload differences.
- Redact secrets/private diagnostics. Normalize only specifically reviewed nondeterministic paths; never hide business differences.
- Fail on unreachable/wrong reference revisions, redirects, timeouts and invalid data. A failed capture must never become passing evidence.
- Exercise real database rollback, denied access, concurrency and retry failures as the corresponding modules are built.

## Evidence requirements

Source identity, synthetic comparator tests, live observations and complete capability verification are separate evidence categories. A three-probe baseline does not verify a broad API capability. Promote fixtures only after review and maintain per-feature coverage. Browser comparisons need fixed viewport, locale, fonts and seeded data.

The user will build each responsibility after its purpose, dependencies, code and verification have been explained. The recorded baseline paths above are implemented; remaining scripts and scenarios will be chosen during those lessons. This document describes scope and evidence limits.
