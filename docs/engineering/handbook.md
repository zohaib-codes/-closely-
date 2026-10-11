# Engineering handbook

Status: adopted project rules, 2026-10-08. The original assistant scaffold was removed at the learning reset. The user has built foundation packages, formatting/lint/typecheck/build checks, a focused API test, CI and reference-response tooling. Coverage is limited to recorded checks; see current progress for evidence and remaining gates. The user builds through explained lessons; see ../learning/WORKING-AGREEMENT.md and ../progress/state.json.

## How we learn from stable systems

Frappe is the behavioral authority. Twenty is the TypeScript organization/conventions reference. ERPNext is the consumer that exposes transaction, precision, ledger, and upgrade requirements. Existing systems are evidence, not a guarantee that every implementation detail is ideal.

Every significant choice is labeled:

- **Adopted:** retain observed behavior or convention.
- **Adapted:** preserve responsibility/behavior while translating technology.
- **Project choice:** a selected implementation with a stated tradeoff.
- **Divergence:** observable difference requiring a parity entry and ADR.

Examples: DocTypes and document lifecycle are adopted from Frappe. Nx packages and strict TS conventions are adapted from Twenty. Fastify, Kysely, Zustand, PostgreSQL-only support, and outbox delivery are project choices. Python script replacement is an explicit divergence.

See [sources](../research/sources.md) for pinned links. Live docs explain intent but do not override tagged source and recorded reference behavior. Release-note summaries alone are insufficient evidence. Do not make users read upstream code; maintain concise explanations and reproducible fixtures here.

## Non-negotiable properties

1. Tenant isolation: every operation resolves one site before touching tenant resources.
2. Authorization: server-side checks apply to records, fields, actions, lists, counts, search, reports, files, sockets, and jobs.
3. Transaction integrity: parent, child, document versions, and delivery intents commit or roll back together.
4. Predictable lifecycle: public hooks execute in the pinned-reference order; SQL access cannot silently substitute for document actions.
5. Upgrade integrity: applied changes are immutable; interrupted upgrades have a recorded recovery path.
6. Traceability: request/job identifiers connect user-visible failures with redacted logs.
7. Extension boundaries: installed trusted app code and site-authored scripts have different privileges.
8. Reproducibility: pinned dependencies, reference fixtures, migration history, and repeatable environment builds.

## Workflow for a feature

Select a parity ID, read its source, capture happy/denied/failure behavior, define the contract, implement through the engine, test at the relevant boundaries, then update the parity evidence. Changes must list observable behavior and dependencies rather than implementation chronology.

Use an ADR before changing tenancy, public contracts, document semantics, metadata precedence, permission policy, execution isolation, or infrastructure ownership. Routine implementation details stay in the relevant module; they do not need architectural ceremony.

## Done means

- Acceptance behavior is explicit and appropriate tests pass.
- Permissions, transaction failure, and cross-site cases are covered where relevant.
- Logs do not expose secrets or sensitive records.
- Changes to schema/contracts have upgrade and compatibility treatment.
- Loading, empty, denied, validation, and unexpected-error UI states exist.
- Parity evidence lists the reference revision, fixture, actual comparison, and approved differences.

`implemented` is not `verified`. A reference inventory is not a completed test suite. Documentation cannot guarantee that no problems occur; it establishes consistent choices and reviewable gates.

## Decisions needing reference fixtures

Exact legacy error payloads, frontend script API coverage, dynamic-link delete/rename semantics, workflow hook order, import partial-success rules, permission-query interactions, template differences, and optional connector behavior must be measured against the pinned reference before their implementation is marked compatible. They remain in scope.

## Enforcement implementation order

First scaffold package boundaries and strict TS checks. Then implement the contract/error adapter and site context. Add real-database document/permission tests before expanding Desk features. Foundation CI and an isolated reference launcher now exist, with focused execution evidence recorded in ../progress/state.json. Broader engine/database/product suites remain future user-built work. Record local and remote checks separately; configuration alone does not establish successful execution.
