# Reference harness — future design

Status: not implemented. The assistant-created harness and captured fixtures were removed on 2026-10-08 so the user can build them personally through explained lessons. No harness commands currently exist.

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

The user will build each responsibility after its purpose, dependencies, code and verification have been explained. Concrete scripts and paths will be chosen during those lessons; this document is a design, not an executable guide.
