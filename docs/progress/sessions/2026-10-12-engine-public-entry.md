# M1.01 — Public engine entry and API consumer resolution

Date: 2026-10-12. User owns edits/install/check execution.

## Starting evidence

Hostname/registry slice previously passed supplied local format/lint, uncached typecheck/build and 11 tests with exit0. User correctly explained duplicate normalization and malformed versus unknown hostname. Live engine exports still point only to operation-context; no API engine dependency, public index or consumer test exists at assignment review.

## Assigned chunk and explanations

Public engine entry chunk assigned: user creates packages/engine/src/index.ts explicitly re-exporting context types, createSiteRegistry and registry types; changes engine root exports to dist/index.d.ts and dist/index.js; adds @closely/engine workspace:* under API dependencies and expands API test script to vitest run src; creates apps/api/src/engine-public-entry.test.ts importing the package factory/type; adds test.dependsOn:["^build"] in nx.json so API tests build dependency artifacts first. User runs pnpm install (lockfile update expected), root format/lint, uncached engine+API typecheck/test/build and format:check; output/exit pending. No new external dependency or HTTP routing assigned.

Explain future Save flow: API imports engine responsibilities through a stable public package surface rather than internal paths. index.ts lists supported exports, retains existing context types and exposes the registry factory/types; normalizer remains internal. package.json types condition directs TS to emitted declarations; default directs runtime to emitted JS and does not mean a default JS export. API-to-engine dependency is allowed; reverse dependency remains forbidden. workspace:* requires the local workspace package. Engine belongs under runtime dependencies because API composition will use the factory; Vitest remains existing development tooling. pnpm install updates the workspace link and lockfile; frozen install cannot introduce an intentional new manifest dependency.

Consumer test imports @closely/engine and SiteRegistry to exercise both declaration/runtime entry points via a normalized approved lookup plus unknown result. Test is a package integration check, not HTTP or database parity. Root Nx test dependsOn ^build ensures dependency builds before tests on clean checkout; API typecheck/build already have that rule. Existing all-target CI needs no workflow edit. Test-runner execution and CI remain unverified until supplied evidence.

Official reading: Node24 Packages entry points/conditional exports, TS modules type-only exports/re-exports, pnpm workspace protocol. No new external library installation. Preserve all engine boundary rules and existing health test. Expected engine11/API2 tests and green lint/typecheck/build/format exit0. Progress docs updated; no assistant implementation/install/checks.

## First public-entry run — missing built entry before lint

User public-entry batch: pnpm install succeeds and lockfile links API to local engine; root formatting succeeds; lint fails with6 no-unsafe errors in engine-public-entry.test.ts, final exit1. Chained Nx checks/final format:check did not run. Read-only index/exports/API manifest/test/Nx review matches lesson. Engine dist lacks index.js/index.d.ts while exports points there; workspace symlink is correct. Missing built declarations explain unresolved consumer types. Existing 11 engine tests retain prior passing evidence, not a new result.

Assistant command order omitted that typed ESLint consumes emitted declarations too; acknowledged and corrected teaching. Existing CI lint order has the same prerequisite. No unsafe rule suppressed.

Public-entry recovery: user updates root package.json lint script to build current public libraries @closely/contracts and @closely/engine with Nx before graph refresh and typed ESLint. This provides declarations before lint locally and in existing CI, which runs lint before its check batch. Then run root format/lint, uncached engine+API typecheck/test/build and final format:check; supply output/exit. No source/test change or install needed for this script correction; public consumer success pending.

Normal lint prerequisite builds use existing Nx build cache; full evidence batch remains uncached. Exact current library selection avoids building API/Desk merely to prepare lint and will need expansion as further emitted public libraries are introduced. Newest documentation formatting unchecked.

## Public consumer batch passes

User public-entry recovery batch passed with explicit exit0: root lint first builds contracts/engine then graph refresh/typed ESLint succeeds; uncached Nx engine+API typecheck/test/build succeeds, with engine11 tests and API2 tests (health plus public package consumer). Supplied task output shows engine build before API tests. Final format:check passes. Read-only root script and emitted index.js/index.d.ts confirm runtime factory and type exports. Workspace link/lockfile reviewed previously. Local public consumer integration checked; no new commit/exact-SHA remote CI, HTTP routing, authentication or database isolation evidence.

Next M1.01 working chunk: teach the API request-host boundary and explicit dependency wiring before site-aware HTTP operations. Inspect Fastify hostname/Host/trustProxy behavior and choose authority parsing/trusted-header policy, preserving global liveness. Then supply a small user-owned host-to-approved-site adapter and meaningful known/unknown/malformed/two-site HTTP checks. No HTTP code/commands assigned yet; recap optional, not a gate. Actor authentication, Unicode/IDNA, provisioning/lifecycle states and storage remain pending.

Optional recap prompts: why consumers use the package name instead of src paths; why lint needs built declaration files. Answers pending; prior registry/hostname understanding retained. Newest progress docs postdate formatter check; no new remote evidence inferred.

## Public-entry recap reviewed

User correctly explains that API imports @closely/engine through its official public entry instead of depending on internal source paths. User correctly explains that typed lint needs generated engine type information to check API code. Understanding of these two public-package/declaration-build reasons is demonstrated; HTTP authority/proxy parsing and authentication understanding are not inferred.

Implementation/check evidence unchanged. Next remains API request-host boundary; no HTTP code assigned in this recap. Latest documentation formatting unchecked.
