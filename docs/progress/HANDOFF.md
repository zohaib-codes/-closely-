# Closely — current learning checkpoint

Updated 2026-10-11. Read AGENTS.md, START-HERE.md, WORKING-AGREEMENT.md, CURRENT.md/state.json and ROADMAP.md, then inspect relevant live files. User writes implementation and runs commands; assistant teaches, reviews read-only and maintains progress docs. Give one manageable step at a time with purpose, focused official docs, exact path/code/command and explanation. Learning questions belong at the end of practical work; no quiz gate or delegation.

## Last completed user action

User staging batch supplies root format/check pass, all6 strict checksum OKs, staged whitespace check reached summary,19 staged files640 insertions24 deletions. Terminal remains in pager at END; final shell status not supplied yet. Assistant read-only index review confirms intended attrs/workflow/progress/harness/reference infra/parity files only; hashes of6 staged blobs match staged SHA256SUMS. .gitattributes preserves raw HTTP bytes. Prior parity typecheck/13 tests/lint final0 retained.

## Exact next working chunk

User exits Git pager with q. After latest progress edits, format docs/progress, root format:check, restage docs/progress, git --no-pager diff --cached --check, commit test: add pinned Frappe reference fixtures and comparator, git push, echo status. Supply commit/push output; assistant then verifies new remote CI for exact commit. No new remote result assumed. Keep local reference services/HTTP running until explicit cleanup lesson.

Faster pacing requested: coherent edit-and-check chunks, focused explanations, no routine save-only turns/redundant preparation probes. Scope and required gates retained. Optional L11 recap: HTML/main/App entry and tsc noEmit versus Vite build; no quiz gate. Static Node rule does not cover dynamic imports. Broader architecture boundaries still pending.

## Retained L11 work and evidence

Desk manifest/tags, strict browser TS config, React entry/App, HTML, Vite config and dev/typecheck/build/preview scripts are user-built and reviewed. Supplied Nx discovery and current-source typecheck pass with exit 0. Supplied first production build passes with exit 0; emitted HTML/bundle reviewed. Dev and preview display/no errors are user-reported; fresh runtime logs absent. Cleanup exit 0 recorded; no known retained Desk server, no fresh process inventory.

Root typed/Nx lint scopes include TSX. Supplied JSON inventory has exactly eight eligible files with no diagnostics/exit 0. Browser Nx constraint rejects runtime:server internal targets and Fastify/pg external dependencies. Fastify re-export and temporary contracts runtime:server tag probes both fail as expected/exit 1; cleanup is reviewed and restored lint exit 0 supplied. PostgreSQL/subpath bans not individually exercised. Node rule baseline plus both denials and restored green evidenced; probe removed.

## Retained earlier lessons and limits

L09 first health inject test/red-green/recap complete. L10 focused normal startup/liveness/signals/occupied-port/build-start foundation retained; active-request draining/deadline/failure unverified. L07 focused task ordering/cache reuse/output restoration/source-dependency invalidation and recap complete; fresh-checkout/CI/shared-root invalidation unverified. L08 formatting/typed lint/current-package boundaries and recap retained; wider engine/UI/ERP boundary gates incomplete. Preserve TS7 CLI and TS6 compiler-API alias.

M0 remains in progress. All 116 parity features remain not_started. No automated progress harness exists. First committed CI run passed. Working-tree work remains uncommitted; no commit assigned. Latest supplied formatter pass predates this progress update; no post-update result claimed. No assistant implementation edits or install/build/test/lint executions performed. Do not equate files, node_modules or dist with fresh check execution or parity.

Details: [Desk session](sessions/2026-10-10-desk-bootstrap.md), [current summary](CURRENT.md), [manual state](state.json). Read older session notes only when current checkpoint lacks needed detail.

Latest CI evidence: [CI session](sessions/2026-10-11-ci-foundation.md).

CI evidence: https://github.com/zohaib-codes/-closely-/actions/runs/38086470833.
