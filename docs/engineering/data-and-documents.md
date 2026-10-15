# Data, documents, tenancy, and migrations

## Adopt Frappe semantics

DocType metadata defines fields, links, child ownership, permissions, naming, and behavior. Normal records use relational tables; single settings and virtual/provider-backed DocTypes have explicit adapters. Preserve public `doctype`, `name`, `owner`, `creation`, `modified`, `modified_by`, and `docstatus` semantics. Children preserve `parent`, `parenttype`, `parentfield`, and ordered `idx` semantics.

Metadata precedence is base app definition plus site customization overlays. Preserve standard definitions during upgrades and retain Custom Field/Property Setter intent. Record metadata revisions and invalidate caches only after committed changes. Define exact precedence and fixtures before implementing customization parity.

PostgreSQL identifiers are derived from validated registry entries and safely quoted; user text is never an SQL fragment. Parameterize values. Tenant resource keys always include site identity. File paths and object keys are validated independently of display filenames.

## Document lifecycle

Translate the pinned `Document` behavior rather than inventing a new lifecycle. Important save phases include permission/latest checks, `before_validate`, `validate`, `before_save`, persistence of parent/children, `on_update`, version/search/update actions, and `on_change`. Insert additionally has insert/naming hooks. Submit uses submit hooks; cancel uses cancel hooks. Record exact action-specific ordering in fixtures, including framework validation interleaving; this overview is not the full execution algorithm.

Adopt docstatus 0/1/2, allowed-on-submit fields, amendment linkage, rename/delete rules, mandatory/link/unique checks, and stale-version rejection. No generic CRUD method bypasses these checks. Realtime updates and delivery happen after commit.

Permission bypass is an internal capability, not a request flag or a boolean supplied by app users. Maintenance jobs have named capabilities and an audit trail. Internal SQL/report privileges are reviewed separately from ordinary document permissions.

## Transactions and concurrency

One mutation owns one explicit unit of work. Hooks receive that unit of work; they cannot silently commit it. Parent rows, child rows, audit/version rows, and outbox intents are atomic. Hook failure rolls back all of them. Savepoints are supported for specified import/recovery behavior, not as a substitute for overall atomicity.

Validate the stored revision under an appropriate row lock before saving. Naming counters and submit/cancel transitions are concurrency-safe. Unique constraints close races that preflight checks cannot prevent. Select lock order consistently for multi-record operations. Start at READ COMMITTED with targeted locking/constraints; use SERIALIZABLE only for measured invariants and bounded full-transaction retry.

Outbox consumers provide at-least-once delivery with idempotent handlers; we do not claim exactly-once execution. Emails, file writes, provider calls, and sockets do not participate automatically in a PostgreSQL transaction. Use staged files, cleanup/reconciliation, durable intents, and provider idempotency where available.

## ERP consumer requirements

ERP remains an installed app. Framework never knows accounting or inventory business rules. ERP controllers must be able to atomically write voucher, ledger, stock, versions, and delivery intents. Decimal calculations use explicit precision and rounding policy; timestamps and business dates are separate types. Cancellations preserve audit/reversal semantics verified against ERPNext fixtures; do not casually delete ledger history.

Pinned ERPNext general/stock ledger code is architectural evidence, not a completed ERP specification. Tests must cover balanced accounting entries, stock valuation/reposting, duplicate submission, closed-period policy, rollback, and concurrent updates before the ERP is called production-ready.

## Tenancy

One database per site, following Frappe's site boundary. PostgreSQL clusters may host multiple site databases. A minimal control registry resolves domains, lifecycle state, and secret references. It contains no tenant business records. Connection pools are bounded, lazy, and evict idle site pools; maximum total connections and overload behavior are configured.

API/CLI/jobs always use an explicit site context. Redis keys, locks, job payloads, Socket.IO rooms, file namespaces and search all include site identity. Socket reconnects reauthenticate. Permission changes invalidate authorization caches, including active delivery subscriptions.

### Initial hostname boundary lesson

M1.01/M1.02 initial implemented policy: registrations and lookups share one pure normalizer accepting unknown input. The initial supported grammar is ASCII labels of 1–63 characters, alphanumeric at both ends, with internal hyphens; canonical total length is at most 253 characters. Single labels are allowed. Lowercase ASCII and remove one optional terminal DNS root dot before duplicate detection/lookup. Reject whitespace, empty labels, URL/port/path syntax and non-string inputs; do not trim or coerce them. Malformed input throws a stable code; a valid unregistered hostname remains an explicit unknown-site lookup result. HTTP error translation is separate.

This is an incremental project policy, not verified Frappe parsing parity or complete hostname support. Unicode/IDNA conversion, IP classification, raw Host authority/port parsing, forwarded-header trust and provisioning-state resolution remain pending. No arbitrary tenant connection is derived from these strings; only approved registry entries resolve sites. Local verification recorded on 2026-10-12: user-supplied engine typecheck/build, 11 behavioral tests and root lint/format pass with exit0; source reviewed read-only. These checks do not establish HTTP/database isolation or pinned Frappe parity.

### Initial fixed configuration decoder

M1.02 initial configuration boundary: decodeSiteRegistrations accepts unknown JSON-like server configuration, requires exact own enumerable hostname/site keys and nested siteName, checks string types without coercion and rejects blank site names. It returns independent typed copies. createSiteRegistry owns hostname grammar, canonicalization and duplicate rejection. This decoder checks shape, not configuration provenance, authentication or provisioning authority; no HTTP registration endpoint or production configuration loader exists. Strict unknown-key rejection is project policy, not verified Frappe parsing parity. TypeBox/Ajv HTTP schema tooling and metadata-driven dynamic document validation remain planned.

User-supplied local root lint/format and uncached engine/API typecheck/test/build pass on 2026-10-12 with engine21/API8 tests and exit0; source/public consumer reviewed read-only. This does not establish tenant database isolation or product parity.

## Migrations and app upgrades

Plan schema/metadata/fixture/data changes before execution. Track app version, migration identifier, checksum, start/end/failure and metadata revision per site. Applied migrations are immutable; corrections are new migrations. Take a verified recovery point for destructive changes.

Serialize site migrations with advisory locks and maintenance state. Workers/API cannot run incompatible operations while a site is partially migrated. Use expand/backfill/contract where practical; do not promise universal zero downtime. Keep resumable backfills separate from short DDL transactions. Concurrent index creation has its own non-transactional execution and recovery path.

Standard app metadata synchronization and customization preservation need separate tests. Data loss (column removal/type narrowing) requires a concrete backup/plan and deliberate execution, never an implicit result of editing JSON. Rollback is not always possible: document forward repair and restore as alternatives.

## Search, reports, and caches

Apply record/field permissions before returning rows, aggregates, counts, highlights, exports, and report downloads. Search indexes do not authorize access. Cache keys include site, metadata revision, permission context where needed, and query identity. Permission decisions never depend on an unscoped global cache. Use bounded invalidation and TTL fallback.
