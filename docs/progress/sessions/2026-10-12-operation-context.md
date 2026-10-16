# M1.01 — operation context construction

Date: 2026-10-12. User implements and runs commands; assistant teaches and reviews read-only.

## Reviewed

Read startup/checkpoint/agreement/current tracker, roadmap/reading guide, engineering handbook, structure/conventions/data/API guidance, ADR-005 and OPS-001 feature entry. Live context is types only; public exports and registry/direct Host test fixture exist. Boolean trustProxy:false retained. Working tree has uncommitted registry/HTTP changes. Prior engine11/API7 pass is recorded user evidence, not a fresh assistant execution.

## Explained and assigned

Resolved site identifies tenant data; actor identifies who acts; source identifies HTTP/job/CLI entry point; operation ID correlates one operation. Factory is an internal typed constructor, never proof of authentication or permission. Guest is supplied explicitly. Snapshot and freeze nested objects because readonly is compile-time only and Object.freeze is shallow. Validate nonblank identifiers without changing spelling and reject unsupported actor/source variants. Existing ADR-005 applies; no tenancy or scope change. Relevant reading: TypeScript object readonly properties, JavaScript Object.freeze, Fastify5.12.x request id.

User chunk: append factory/helper in operation-context.ts, export factory, add engine behavioral tests for Guest/user snapshots, supported sources, invalid identifiers/discriminants and runtime immutability. Extend existing test-only fixture with context route; verify distinct per-request IDs/sites and explicit Guest despite forged identity headers. Keep existing site/error/liveness tests. No new dependency.

User verification: pnpm format/lint, uncached Nx engine/API typecheck/test/build, final format:check and explicit exit status. Expected green is not observed green.

## Actual progress and remaining

No user action reported this turn; no implementation edited or checks executed by assistant. Factory/test source and terminal evidence pending. Authentication, permission enforcement, tenant storage/isolation and Frappe parity remain pending. Questions belong at coding-session end. Progress documentation updated; formatting of these edits awaits user-run batch.

## First implementation review

User supplied first context-factory batch: root format succeeds; lint prerequisite builds contracts (cache) and engine successfully, then ESLint reports9 unsafe/unresolved-type errors in resolve-request-site.test.ts, explicit exit1. Read-only source review confirms factory/export/engine tests and fixture match assigned chunk except API test imports omit createOperationContext and OperationContext. Missing value/type bindings explain the cascading diagnostics. Chained uncached Nx checks and final format:check did not run.

Correct the two engine imports at the top of apps/api/src/resolve-request-site.test.ts: runtime import createOperationContext and createSiteRegistry; type import OperationContext and SiteRegistry. Then rerun root format/lint, uncached engine/API typecheck/test/build and final format:check with explicit exit status. Factory/export/engine tests and API fixture reviewed read-only; the first batch stopped at lint because these imports were omitted. No new test execution or final format:check evidence yet.

Progress docs updated only; no assistant implementation or build/check execution. New documentation edits postdate root formatting.

## Import correction verified

User context-import correction batch passes with explicit exit0: root format/lint, uncached engine/API typecheck/test/build, engine16 tests (5 context,4 hostname,7 registry), API8 tests (6 site/context, health and public consumer), and final format:check. Read-only review confirms corrected runtime/type imports and immutable factory. Prior source/test review retained. Behavioral evidence covers Guest construction, user snapshot/freeze, invalid identifiers/discriminants, supported sources and two request-local Guest contexts with distinct IDs/sites despite forged identity header. No authentication, database isolation or Frappe parity established.

M1.01 initial context construction is locally checked. End-of-session recap: why copying and freezing are both needed, and why user actor construction does not authenticate. Answers pending, never a quiz gate. Next coding lesson is M1.02 runtime boundary validation: explain typed internal factory versus arbitrary unknown request/metadata input, then select one concrete fixed-contract decoder and its denied/malformed cases before assigning code. No next decoder source or commands assigned yet; preserve current changes for the next normal checkpoint.

Only progress documentation updated by assistant. Latest passing formatter predates these documentation changes; no redundant docs-only check/commit loop assigned.

## Context learning recap

User correctly explains copying site/actor creates independent objects without freezing caller-owned objects, and trusted authentication must verify Alice before supplying a user actor. Assistant clarifies authentication establishes identity while engine authorization separately decides allowed actions on the resolved site. Authorization clarification not independently assessed.

M1.02 is next; no new implementation chunk assigned. No new checks executed or inferred.
