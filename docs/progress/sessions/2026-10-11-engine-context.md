# Engine context lesson resume — 2026-10-11

## Reviewed

Read AGENTS.md, START-HERE.md, HANDOFF.md, WORKING-AGREEMENT.md, CURRENT.md, state.json, ROADMAP.md and relevant engineering/architecture documents. Read-only inspection confirms API, Desk and contracts packages; engine is absent. Current boundary configuration covers platform/contract/browser tags but has no type:engine constraint. CI workflow includes uncached Nx checks and focused parity tooling/checksums. No execution result inferred from configuration or generated files.

Relevant capability foundations: META-013 cross-site metadata cache isolation and OPS-001 approved-domain routing. Neither feature is implemented or verified by defining context types. The pinned Frappe request snapshot resolves site before connecting; ADR-005 adapts context propagation to explicit inputs.

## Explained and assigned

One coherent user-owned chunk: engine manifest/public export, strict TS config, site/actor/operation type module, and engine dependency constraint. Explain site as tenant, actor as trusted acting identity, operation ID/source as correlation metadata. Guest/user discriminated union does not encode role grants or permission bypass. Readonly protects typed writes but does not freeze runtime objects or validate untrusted input. No new library is required; existing compiler/linter are development tooling.

Official reading: TypeScript Object Types readonly Properties; Everyday Types Type Aliases, Union Types and Literal Types; Nx v23 module-boundary Dependency constraints; pnpm v12 install --lockfile-only. Existing ESM/public exports and compiler configuration patterns reused.

User verification assigned: pnpm install --lockfile-only; root format; uncached Nx engine typecheck/build; root lint; format:check; explicit final status. All pending. No assistant implementation edits or install/build/test/lint execution.

## Evidence and next step

Last user-confirmed implementation remains the recorded 72390de commit/push and successful exact-SHA reference CI checkpoint. This turn only reviewed files and maintained documentation. No new understanding or user completion claimed.

After user output/review: deliberate engine-to-HTTP/UI/ERP denied imports and restored-green checks, then explicit broader M0 gate review before M1 site registry runtime work. The first context contract is M0 engine-boundary preparation toward M1.01, not a declaration that M0 has exited. Runtime site resolution, unknown-site failures, authenticated actor construction and two-site isolation remain pending. Learning questions remain at the end of practical work.

## User result and Nx recovery

User supplied engine baseline batch: pnpm12.10.1 workspace operations report five projects/up-to-date; root formatting ran. Nx uncached engine typecheck and build report success, then DB transaction SqliteFailure foreign-key constraint787 and explicit exit1. Chained root lint and format:check not reached. Read-only engine manifest/config/context and ESLint constraint match supplied lesson. No fresh remote CI or negative engine-boundary evidence.

User runs pnpm exec nx reset --onlyDaemon --onlyWorkspaceData, then uncached verbose engine typecheck/build, root lint, root format and format:check in a chained batch; supplies output and final status. Reset is recovery of Nx generated state, not a confirmed diagnosis. After restored baseline, teach engine-to-HTTP/UI/ERP denied imports and restored green; M0 gate review remains pending.

Official Nx v23 reset documentation and installed23.3.0 reset implementation reviewed: combined onlyDaemon/onlyWorkspaceData stops daemon and clears generated daemon/workspace data including database location, retaining task artifact cache. Cause is unconfirmed; reset is a recovery attempt. Compiler success is recorded separately from failed Nx orchestration. No dependency upgrade assigned.

## Recovery baseline passed; external boundary probe assigned

User supplied recovery output: Nx daemon/workspace reset succeeds; uncached engine typecheck/build succeeds with Cache Skipped and no SQLite error. Root lint discovers contracts/engine/Desk/API and has no diagnostics. Root format/check completes with All matched files use Prettier code style and explicit final0. Read-only engine source unchanged; only operation-context.ts exists. Recovery successful for this run; root cause and recurrence unresolved. No negative engine-boundary or remote CI result yet.

User creates temporary packages/engine/src/boundary-probe.ts with type re-exports of FastifyInstance from fastify and ReactNode from react; runs pnpm run lint and echo $?; supplies output. Expect two type:engine banned-external-import errors and exit1. Keep probe for read-only review; removal/restored green and internal ERP-direction probe follow after output. M0 remains in progress.

Explain that export type creates a compile-time dependency even when erased from JavaScript; HTTP/UI framework types should remain outside engine. Probe is disposable verification code, not a product export or capability. Nx v23 Dependency constraints reading reused. Expected negative output is not claimed as observed. Learning recap remains at session end.

## External denial evidence and teaching correction

User supplies two expected @nx/enforce-module-boundaries errors in engine boundary-probe.ts: type:engine rejects fastify1:1 and react2:1, zero warnings, explicit exit1. Read-only probe matches the two type re-exports. External HTTP/UI type dependency denial demonstrated; probe remains. Removal/restored green and internal ERP denial pending.

User explicitly objects that engine/package and operation-context instructions did not explain why or where they fit in the full Frappe clone. User seeks architecture/engineering/production learning with beginner-friendly language. Acknowledge the teaching failure; explain through finished-system save flow and future shared HTTP/job/CLI rules. Distinguish generic document rules from ERP-specific rules; our engine package name and explicit context are TS organization/adaptations, not Frappe directory parity. Types currently neither execute saves nor validate/authenticate input. Update teaching agreement; no new implementation action in this reply. Understanding remains unconfirmed.

Teaching repair: explain engine and operation-context through a future save flow in plain English, including framework versus ERP responsibilities, site/actor/operation purpose, explicit-input tradeoff and compile-time-only current types. No new implementation action assigned this turn. Next practical action after questions is removal of reviewed boundary-probe.ts and user-run restored lint; internal ERP boundary gate and M0 exit review still pending.

## Cleanup assigned

User says next after the architecture explanation. No understanding or cleanup inferred. User deletes temporary packages/engine/src/boundary-probe.ts, then runs root lint, root format and format:check in the supplied chained batch and shares final output/status. Expected restored lint/format exit0; not yet observed. Internal ERP-direction denial and broader M0 gate review remain pending. No understanding inferred from user saying next.

Explain deliberate-failure/restored-success verification: rejected forbidden imports prove the rule catches violations; restored success checks the original permitted source still passes. No new library or runtime behavior introduced.

## External probe cleanup passed; ERP direction probe assigned

User supplied probe-cleanup batch: graph-refresh lint lists contracts/engine/Desk/API with no diagnostics; root format and format:check pass, explicit final0. Read-only source inventory confirms boundary-probe.ts removed and operation-context.ts retained. External HTTP/UI denial plus restored-green cycle complete. Internal ERP denial and broader M0 gate review remain pending.

User temporarily replaces scope:platform with scope:erp in packages/contracts/package.json tags, retains type:contract, and creates packages/engine/src/boundary-probe.ts exporting type HealthResponse from @closely/contracts. Run root lint and echo $?; share diagnostics. Expected platform-to-ERP scope rejection for engine and existing API import, exit1. This is a disposable stand-in, not ERP implementation; no install/typecheck needed for this lint-only probe. Restore tag/remove probe and restored-green check only after review.

Teach core document rules versus business-app accounting rules before the edit. Existing contracts package temporarily represents an ERP-scoped target; tags are enforcement labels and do not change runtime code. scope:platform constraints combine with type:engine constraints. Expected engine/API denials remain unobserved; no parity or M0 completion claimed.

## ERP-labelled target rejected; restoration assigned

User supplied ERP-label probe lint: graph refresh discovers four projects; API app.ts2:1 and engine boundary-probe.ts1:1 each rejected by scope:platform onlyDependOnLibsWithTags scope:platform, two errors/zero warnings, explicit exit1. Read-only contracts manifest confirms temporary scope:erp/type:contract and engine probe confirms HealthResponse type re-export. Internal engine-to-ERP-labelled target denial evidenced; actual ERP package not built. Restoration/green pending.

User restores contracts Nx tags to scope:platform/type:contract, deletes packages/engine/src/boundary-probe.ts, then runs root format, root lint, uncached Nx engine typecheck/build and format:check in supplied chained batch; shares output/final status. Expect restored green0. After review, assess remaining M0 gates before site registry work; no milestone completion or understanding assumed.

Explain cleanup restores true contracts ownership and removes disposable export, then lint refresh must see restored tags. Uncached engine compiler rerun covers latest real source after both probe exercises. No reference parity or milestone completion claimed.

## Restored ERP scope passed; M0 gate review

User supplies ERP-probe restoration batch: root formatting runs; graph-refresh lint lists all four projects/no diagnostics; engine typecheck/build succeeds with Cache Skipped; format:check passes and explicit final0. Read-only contracts tags scope:platform/type:contract restored; engine source inventory has only operation-context.ts. External HTTP/UI and internal ERP-labelled engine dependency denial/restoration cycles complete for current slice.

Reviewed ROADMAP foundation exit and state evidence: L06 public/deep import denial/restored success and literal mismatch already demonstrated; L07 focused task/cache exercises retained; L08 current engine-to-HTTP/UI/ERP rules now have denial/restoration evidence; L09 health test red/green; L10 focused API liveness/start/normal signals; L11 Desk and browser static boundaries; L12 prior fresh-runner CI; L13-L15 attested raw-reference fixtures/checksums/comparator wrong-candidate checks. Prior exact-SHA CI excludes new engine package. No new remote evidence or comprehensive production/parity claim.

User runs combined foundation checkpoint: frozen install, strict reference fixture checksums, root format/check, root lint, all-project uncached Nx typecheck/test/build, explicit parity typecheck/13-test suite and final status. No new source edit assigned. After supplied evidence/read-only review, user commit/push and exact-SHA CI validation are next, before marking M0 exited and beginning site registry runtime lesson.

Explain combined verification exercises whole current workspace and original fixture baseline before framework runtime work. Existing compiler/test tools reused, no new dependency. Correct stale engineering status summaries (handbook and testing/operations) using recorded evidence; this does not assert the planned full suite is implemented. Learning recap stays at coding-session end.

## Combined local foundation checkpoint passed

User supplied combined foundation batch passed with explicit final0: frozen install pnpm12.10.1 five workspace projects, six strict checksum OKs, root format/check and graph-refresh lint/no diagnostics, uncached Nx typecheck/test/build across four projects including one API health test, explicit parity typecheck and13 comparator tests. No SQLite error. Read-only diff confirms engine source/config, boundary rule and teaching/progress/engineering docs; probes absent, contracts restored, no staged changes. New engine revision not committed/remote-verified yet.

User formats/checks latest documentation, stages explicit reviewed engine/ESLint and documentation paths, checks staged whitespace, commits feat: add explicit engine operation context and dependency boundaries, pushes current main tracking branch, supplies commit/push/final-status output. Assistant then performs read-only exact-SHA GitHub CI verification; M0 remains open until that result. No source/build checks need repeat solely for current progress-document changes.

Explain commit records exact source/docs revision; push makes it available to remote CI, which starts without local node_modules/dist. Existing Git workflow reused. Explicit staging excludes unrelated/generated files. After source checks passed, only documentation changed in this reply; format/check required, no redundant source-suite rerun assigned.
