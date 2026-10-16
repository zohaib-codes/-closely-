# M1.03 — engine site metadata integration

Date: 2026-10-13. Status: user implementation and passing batch reviewed. Earlier assignment notes below are historical.

## Inspected

Startup/checkpoint/agreement/roadmap, engineering handbook/data/project boundaries, META-001/META-013, live engine context/registry/public entry/manifests, metadata constructor/registry/tests/public entry and Nx ordering. Engine has no metadata dependency or site metadata consumer. Earlier metadata25-test pass is recorded user evidence, not rerun today.

## Explained and assigned

Engine selects a fixed metadata registry using explicit operation site identity. Metadata continues owning definition validation; engine depends on its public package. Trusted startup definitions are copied into separate per-site registries. Exact site identities, duplicate-site rejection, unknown-site result and no fallback. This is the existing architecture applied to an initial in-memory slice, not a new tenancy design or Frappe parity claim.

User edits engine dependencies and root lint prerequisite projects; creates packages/engine/src/site-metadata-registry.ts and its test; adds public exports. Five tests cover different definitions for the same model across sites, absent model/site with no fallback, duplicate/blank bindings, propagation of definition/name errors and caller mutation after construction. Input is trusted typed configuration, not an unknown JSON decoder or authentication boundary.

User-run verification: pnpm install && pnpm run format && pnpm run lint && pnpm exec nx run-many --projects=@closely/metadata,@closely/engine,@closely/api --targets=typecheck,test,build --skipNxCache --outputStyle=static && pnpm run format:check; then echo $?. Expected engine26/metadata25/API8 tests if unchanged, not observed.

## Evidence and pending

Assistant changed progress documents only. No implementation performed, no commands assigned to user executed by assistant, and no new passing checks. Last completed user step remains metadata registry25-test batch. Review user implementation/output before advancing. Full permissions, production entry-point wiring, database isolation, customization/cache lifecycle and Frappe runtime parity remain pending. Learning questions reserved for session end. Corrected stale state knownLimitations text that incorrectly said constructor/registry were absent.

## Completed batch review

User-supplied site metadata integration batch passes with final exit0: pnpm install, root format/lint with contracts/metadata/engine prerequisite builds, uncached metadata/engine/API typecheck/test/build, metadata25/engine26/API8 tests, final format:check. Read-only factory/tests/public exports/manifest/lockfile and emitted declaration/index review match assignment. Covers explicit site selection, no fallback, duplicate/blank bindings, metadata validation propagation and caller mutation protection. No production route wiring, authentication, database isolation or Frappe runtime parity established.

Next: Continue metadata boundary work after the checked M1.03 site-selection slice: explain unknown raw metadata versus trusted internal DocTypeDefinition, review pinned reference flag/default behavior, then assign a focused decoder/normalization lesson. No next implementation or commands assigned yet. Full field catalog remains M1.04; real metadata/database isolation remains M1.10.

Assistant updated progress documents only; no implementation edits or test execution. End-of-chunk recap asks why site selection belongs in engine and what happens when only another site has a requested model. Answers pending.
