# Closely — current project state

Updated 2026-10-16. User writes source and runs commands; assistant teaches, reviews read-only and maintains progress docs. M1 remains in progress; all116 parity entries remain not_started.

## Last completed user action

2026-10-16 user-supplied full checkpoint batch passed with final exit 0: frozen install, formatting, six reference checksum checks, root lint, uncached Nx typecheck/test/build for seven projects, metadata 25/engine 26/database 9/API 8 tests, parity TypeScript check and 13 comparator tests, final format:check and git diff --check. Local evidence only; no new commit, push or remote CI confirmed.

## Current implementation

Metadata exposes normal-DocType/Data contracts, immutable validated construction and a fixed per-instance DocType registry. Engine now consumes public @closely/metadata through workspace:*; lockfile links ../metadata. createSiteMetadataRegistry constructs one private registry per exact configured site name and selects it using OperationContext.site.siteName. Unknown site/model are distinct results; no fallback. Root lint explicitly prepares contracts/metadata/engine declarations.

Existing hostname registry, configuration decoder, immutable operation context and test-only HTTP Host/context routes remain. Production API provides liveness only. Database package now checks connections and creates validated/quoted physical databases through pg. CLI exposes check-database and create-site-database. User created closely_alpha in the local development PostgreSQL service; it is bootstrap-owned and is not yet a registered complete site.

## Next single lesson

User output confirms successful push of implementation commit 15179c2d137ccf6051142d7745758a2fc3be7ca2 to origin/codex/site-foundation-checkpoint and upstream tracking. Next user formats and stages AGENTS.md, the four changed learning documents, and docs/progress for the second documentation commit; supplies staged summary and whitespace-check result. Then review, commit and push documentation, open a PR and verify current-head CI before merging. No PR, CI or merge confirmed.

## Evidence limits

Typed startup registrations are not an unknown-input decoder or authentication boundary. Site selection is locally checked in memory, not actual tenant database isolation. Raw flags/default decoding, complete field/mode/options/permission support, module/controller/route checks, customization, cache invalidation and storage remain pending. Source review is not Frappe runtime parity. Logical identifier limits do not establish physical SQL identifier safety.

No new remote CI inspected. Local implementation commit is 15179c2; recorded remote CI still predates these changes. User output shows closely-development-postgres-1 running healthy; no assistant live service inventory. Documentation updates postdate the passing formatter and await the next normal check batch. No missing output from this batch. User correctly answered the site-selection recap; broader architecture understanding needs guided explanation. Questions are not a prerequisite gate.

Details: [session](sessions/2026-10-13-site-metadata-integration.md), [state](state.json).

Teaching correction: see [working agreement](../learning/WORKING-AGREEMENT.md) and [session](sessions/2026-10-13-teaching-reset.md). Live read-only search confirms createSiteRegistry/createOperationContext callers are tests; app.ts registers only /health/live.

Latest evidence: [PostgreSQL startup](sessions/2026-10-15-postgresql-startup.md).
