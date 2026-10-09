# Teaching and delivery roadmap

Version 1, 2026-10-08. User-requested teaching plan; no implementation is authorized by this document. Read [working agreement](WORKING-AGREEMENT.md) first.

## Target and limits of advance planning

Build the pinned Frappe v16.51.0 capability baseline in TypeScript, then separately specify and build the ERPNext-equivalent consumer. Preserve the full scope and serious engineering standards. The current baseline has 116 capability entries, 44 field types, 301 canonical standard DocType paths and 23 API-route inventory entries. These inventories require deeper behavioral expansion; counts do not certify exhaustive coverage or production readiness.

Fix responsibilities, dependency direction, architectural defaults, acceptance gates and milestone scope now. Detail the next lessons before work starts. Exact hook sequences, compatibility payloads, dynamic metadata behavior and library integration details require reference evidence. Record them as unresolved until measured; do not invent an answer to make the plan appear complete.

Do not silently diverge. An architectural/scope change requires a explained proposal, human agreement, ADR and updates to affected lessons/feature entries. Routine corrections within the accepted design are explained and recorded. Exact versions are verified before each installation; a broken dependency is not retained just because an old plan named it. No calendar estimate or promise of expert status/bug-free operation is made. Skills and reliability require demonstrated evidence.

## Lesson protocol and library admission

Pacing update from the user: start concrete workspace/API setup now, explain concepts during the work, and place learning questions at the end of a coding session. Foundation lesson IDs remain topic references rather than a mandatory lecture/quiz sequence; teach Git before recording the first implementation commit.

Every lesson has a stable ID, prerequisite, engineering question, official reading, user artifact, verification and feature mapping where relevant. The user executes one manageable action at a time; a lesson may span several turns. Code is explained before it is written. Exercises are actual product work or clearly labeled disposable experiments, never quietly counted as parity.

Before first use of every dependency, including small utilities and transitive integration tools:

1. Explain the problem it solves and why the selected tool fits; compare relevant alternatives.
2. Provide official, version-appropriate documentation and specific sections with a reading goal. Do not assign an entire documentation site without guidance.
3. Separate library guarantees from our responsibilities; cover runtime validation, security, failures and limitations where relevant.
4. Explain exact version selection, license/compatibility, dependency versus devDependency, installation command and flags.
5. Wait for reading questions and the user action. Review actual output before proceeding.
6. Record version, reading, decision and evidence. No hidden installs or generators.

Start with [reading guide](READING-GUIDE.md). Future library links/sections are expanded and verified before their lesson. Never infer that linked documentation has been read or understood.

## Detailed foundation sequence — M0

These are planned lessons, not tasks already performed. Advance one user action at a time.

| Lesson | Engineering question / user artifact | Verification or learning evidence |
| --- | --- | --- |
| L00 | Repository, monorepo, apps and packages; explain the planned graph | User can trace a request and identify who owns a rule; no understanding assumed |
| L01 | Git working tree, staging, commit, diff, ignore rules; user initializes history | User can inspect and explain a deliberate documentation change |
| L02 | Node runtime versus TypeScript compiler versus package manager; inspect local versions | Compatible versions selected with official evidence, no broad installs |
| L03 | package.json: private root, ESM, packageManager, scripts, dependencies/devDependencies | User explains every root field before creating it |
| L04 | pnpm workspace declaration, workspace dependencies, lockfile, install reproducibility | An internal dependency resolves locally; no accidental registry resolution |
| L05 | TypeScript strict configuration, Node/browser targets and module resolution | Deliberately invalid input/type code is rejected; emitted runtime understood |
| L06 | Modules, named exports, type-only imports, public package exports | Consumer imports public surface; forbidden deep import is demonstrated |
| L07 | Nx project graph, task graph, input/output and cache responsibilities | Dependency build order understood; changes invalidate the relevant cache |
| L08 | Formatting versus lint versus typecheck; enforce planned dependency direction | A deliberate engine-to-HTTP/UI/ERP dependency is rejected |
| L09 | First testing configuration; meaningful behavioral test and failure | User sees both red and green, explains assertion and error output |
| L10 | Thin API bootstrap, dependency wiring, request ID, liveness and shutdown | Server starts/stops predictably; liveness is not mistaken for readiness |
| L11 | Thin Desk bootstrap, browser boundary and Vite dev/build distinction | User explains entry point/bundle and sees no server imports in browser |
| L12 | First CI workflow, frozen installation and local/remote evidence | Checks run from a clean checkout; remote execution recorded separately |
| L13 | Pinned reference environment, source/runtime identity and isolated resources | Exact reference revision recorded; test resources cannot affect user sites |
| L14 | Read-only reference capture: success, version envelope and denied access | Reviewed live observations, no credentials persisted |
| L15 | Comparator, fixture identity, scoped nondeterminism and wrong-candidate test | Deliberate mismatch fails; synthetic checks distinguished from live parity |
| L16 | Progress tooling only if useful now; manual records remain usable | Actual user work, check results and next lesson survive a new chat |

M0 exit: reproducible user-built workspace, enforceable boundaries, meaningful checks, thin entry points and an attested reference baseline. Product capabilities remain pending. Reference tooling is part of verification, not the document engine.

## M1 — Metadata, sites and storage (14 baseline capabilities)

Prerequisite: M0. Owners: metadata, contracts, engine interfaces and database adapter.

- M1.01: Explicit site/actor/operation context; routing registry and unknown-site failures.
- M1.02: Boundary validation: unknown input, fixed wire contracts versus dynamic DocType schemas.
- M1.03: DocType/DocField definitions, logical names, reserved identifiers and registry.
- M1.04: Field-type registry; every one of the 44 types gets storage/UI/validation/filter/import/print cases, including layout-only fields.
- M1.05: Standard/custom metadata, property overrides, normalization, precedence and provenance.
- M1.06: PostgreSQL pools, adapter interfaces, parameterized values and metadata-approved identifiers.
- M1.07: Relational storage generation, schema diff, indexes, child tables and special DocTypes.
- M1.08: Migration history/checksums, locks, partial failure and recovery; applied migrations immutable.
- M1.09: Metadata cache identity/invalidation and concurrent schema updates.
- M1.10: Two-site metadata/database isolation; mapping canonical standard DocTypes to executable behavior.

Teach structural typing, literal/discriminated unions, narrowing, unknown, satisfies, generics and SQL fundamentals in the relevant work. Dynamic metadata requires runtime checks even when application code is statically typed.

Exit: models synchronize and upgrade without cross-site leakage or partial falsely successful schema changes. The complete META feature requires generated API/Desk behavior later; an M1 backend milestone does not prematurely verify that feature.

## M2 — Document engine and permissions (29 baseline capabilities)

Prerequisite: M1. Authorization belongs to the engine from the first real mutation; HTTP login UI can follow in M3.

- M2.01: Document identity, persistence state, loading and schema-driven normalization.
- M2.02: Required/default/unique/link/dynamic-link rules; parent/child ownership.
- M2.03: Create/save/update lifecycle; measure hook order before implementing its contract.
- M2.04: Submit/cancel/amend, docstatus transitions and update-after-submit restrictions.
- M2.05: Single/tree documents, naming series and atomic name allocation.
- M2.06: Explicit unit of work, transactions and error-driven rollback across parent/children/version records.
- M2.07: Roles, document/owner/user/share permissions, field/action checks and internal capability audit.
- M2.08: Authorized filters, lists, counts, search and reports; no query bypass of document policy.
- M2.09: Rename/delete/link integrity, versions, comments/activity and relevant reference cases.
- M2.10: Concurrent writers, optimistic conflict policy, database constraints and deadlock handling.
- M2.11: Transactional outbox, no pre-commit external effects and failure windows.
- M2.12: Same policy through HTTP, CLI, jobs and trusted hooks; minimal voucher acceptance probe.

Teach interfaces at adapter boundaries, error unions/classes, resource cleanup, async failure propagation and practical transaction/isolation reasoning. Avoid interfaces for every class or generic abstractions without a concrete responsibility.

Exit: positive, denied, cross-site, rollback and real-connection concurrency comparisons pass. A voucher probe demonstrates framework seams; it does not count as ERP implementation.

## M3 — HTTP, authentication and public SDKs (10 baseline capabilities)

Prerequisite: M2, reusing foundation HTTP shells.

- M3.01: Fastify registration/lifecycle, transport validation, serialization and composition roots.
- M3.02: Native errors versus endpoint-specific Frappe v1/v2/RPC envelopes; unknown errors redacted.
- M3.03: Cookie/Redis sessions, credentials/password hashing, login/logout/reset and session invalidation.
- M3.04: CSRF, rate/body limits, trusted proxy policy and secrets handling.
- M3.05: MFA/API authentication, OAuth/OIDC/LDAP adapters according to pinned feature requirements.
- M3.06: Resource APIs, allowed method registry, pagination/query semantics and denied paths.
- M3.07: Public server/browser SDK exports, compatibility facade and app manifest contracts.
- M3.08: Realtime authentication, room/site authorization and permission change handling.

Exit: all applicable API inventory entries and AUTH/API capabilities have measured compatible behavior; two-site auth and every entry-point policy case pass. HTTP contracts do not certify backend internals by themselves.

## M4 — Metadata-driven Desk (14 baseline capabilities)

Prerequisite: M3; metadata/document features earn full end-to-end coverage here.

- M4.01: React rendering, effects, component boundaries and accessible shell/navigation.
- M4.02: Query owns remote state; Zustand shared UI; RHF unsaved forms; URL shareable view state.
- M4.03: Router, page/error/loading/denied states and permission-aware navigation.
- M4.04: Field renderer registry spanning all 44 types; defaults, conditional requirements and validation.
- M4.05: Child-table editing, save/submit/cancel/amend and conflict feedback.
- M4.06: Lists, filtering/sorting/paging, bulk actions, virtualized tables and persisted views.
- M4.07: Kanban/calendar/Gantt/tree/map and other inventoried views.
- M4.08: Metadata/form/workspace builders, layout changes, accessibility and keyboard behavior.
- M4.09: Client scripting facade, translations, time zones, decimal/date presentation.
- M4.10: Fixed-reference workflows, field coverage, browser comparisons and large-form behavior.

Exit: users can define a supported model and obtain permitted working forms/lists without hand-writing a custom screen for each model. No UI-only hiding is mistaken for authorization.

## M5 — Installed apps, customizations and automation (11 baseline capabilities)

Prerequisite: M2/M3 contracts; builders also depend on M4.

- M5.01: App discovery/manifests/dependency ordering, installation and migrations through public SDK.
- M5.02: Trusted server hooks and deterministic registration; no request-controlled imports.
- M5.03: Custom fields/properties/layouts and preserving overlays through app upgrades.
- M5.04: Workflow states/transitions/actions and exact lifecycle interactions.
- M5.05: Expression evaluator, automation graph, triggers and durable execution state.
- M5.06: BullMQ workers, retry budgets, deduplication/idempotency and crash/redelivery.
- M5.07: Site-aware scheduler, overlap prevention, occurrence identity and missed-run policy.
- M5.08: Restricted script-runner capabilities, CPU/memory/time limits and forbidden access cases.
- M5.09: Auditability and safe uninstall/dependency failures.

Exit: isolation, retry, transitions, hook failure and installed-app upgrade fixtures pass. TypeScript scripts are a recorded adaptation, not automatic execution of existing Python scripts.

## M6 — Reports, files, printing and mail (16 baseline capabilities)

Prerequisite: M3, documents and durable delivery; UI-facing work also uses M4.

- M6.01: Query/script/report builders with authorized parameters and fields.
- M6.02: Aggregation, charts/dashboards, exports and representative query plans.
- M6.03: CSV/spreadsheet import/export, validation, child relations and partial-success policy.
- M6.04: File ownership/access, uploads, object storage, size/content restrictions and images.
- M6.05: Template rendering and sanitization; Nunjucks/Jinja differences tracked.
- M6.06: Print layouts, Chromium workers, resource access limits and output comparison.
- M6.07: Outgoing/incoming mail, attachments, templates/groups/unsubscribe requirements.
- M6.08: Durable delivery, provider failures, timeouts and duplicate attempts.

Exit: relevant permission, export/import, page layout and delivery failure cases pass. Libraries provide primitives, not the complete Frappe feature.

## M7 — Website, portal and integrations (11 baseline capabilities)

Prerequisite: M3, relevant M4–M6 modules.

- M7.01: Website routing/pages/themes/content and configured public assets.
- M7.02: Web forms and portal identity/ownership; public versus private document policy.
- M7.03: Search/SEO/sitemap and safe caching of public versus private content.
- M7.04: Webhooks, signatures, durable retries, OAuth integrations and secret management.
- M7.05: Configured optional connector adapters, sync/search and inventoried auxiliary providers.
- M7.06: Guest/portal browsers, cross-site, integration timeout and duplicate-delivery comparisons.

Exit: configured-provider evidence covers the required feature entries. An unavailable provider or unsupported adapter is recorded, never silently removed from scope.

## M8 — Operations and recovery (11 baseline capabilities)

Operational basics start in M0 and accompany every module; this milestone completes and proves them.

- M8.01: CLI site/app/config/migrate/backup/restore/execute/version responsibilities.
- M8.02: Provisioning, domain resolution and recoverable partial failures.
- M8.03: Immutable Docker builds, Compose deployment, proxy/TLS and private infrastructure.
- M8.04: Readiness, bounded shutdown, pools, cancellation, request/job limits and configuration validation.
- M8.05: Structured Pino logs, OpenTelemetry traces, metrics and actionable alerts.
- M8.06: Backup consistency across DB/files/app revisions and secrets; isolated full restore drills.
- M8.07: Interrupted upgrades, crash recovery, worker reconciliation and disaster runbooks.
- M8.08: Representative k6 load, query/pool/queue analysis, capacity limits and measured SLOs.
- M8.09: Dependency/license/security review, release provenance and safe rollout/recovery.

Exit: real recovery and interrupted-migration drills pass; load assumptions, performance and operational limits are measured. “Production-grade” requires evidence under an actual deployment/workload, not a framework choice.

## M9 — Framework parity audit and ERP readiness

- Account for every baseline feature, field type, standard DocType and route; expand incidental behavior discovered during comparison.
- Complete reference coverage, browser evidence, upgrade/customization tests and denied/failure scenarios.
- List every intentional difference with an ADR; “approved divergence” stays separate from exact match.
- Run installed-app voucher/ledger/stock probes through public SDK without engine changes specific to ERP.
- Release only with reproducible builds, recovery evidence and documented supported workloads/limits.

Exit: no unexplained capability gaps; verified matches and explicit differences are reported honestly. Current choices (TS scripts, PostgreSQL, React, Nunjucks/Chromium) mean unmodified Python apps/templates cannot be promised to work.

## ERP phase — subsequent full specification

ERPNext parity is not yet specified. Before ERP implementation, pin its behavioral release and create its own capability inventory, dependencies, accounting/stock invariants, reference data and acceptance matrix. Do not claim this framework roadmap is a complete ERP specification.

Planned teaching order: shared company/currency/fiscal masters and precision rules; accounting/posting engine and chart of accounts; stock/valuation/warehouse invariants; selling/buying and receivables/payables; fulfillment/manufacturing/assets/projects and other required modules; statutory/configured integrations; module-level parity and recovery audit. Actual ordering and scope are determined by the pinned ERP inventory. ERP uses public framework extension contracts and stays outside core.

## Completion and skill evidence

Every lesson records explained, user-performed and checked states separately. A stage completes on its acceptance evidence. To assess engineering skills, the user should explain the design, implement a nearby change, diagnose a failure, defend a tradeoff and review a boundary violation with decreasing guidance. These are learning assessments, not a guaranteed title.

The full module/feature backlog remains in [state.json](../progress/state.json) and [features.json](../parity/features.json). Detailed lesson/file lists expand before each stage. Do not pre-create empty packages or install future tools to make the roadmap look complete.
