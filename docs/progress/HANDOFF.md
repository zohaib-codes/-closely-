# Closely — current learning checkpoint

Updated 2026-10-11 for requested chat switch. Read AGENTS.md, START-HERE.md, WORKING-AGREEMENT.md, CURRENT.md/state.json and ROADMAP.md, then inspect relevant live files. User writes implementation and runs commands; assistant teaches, reviews read-only and maintains progress docs. Give one manageable step at a time with purpose, focused official docs, exact path/code/command and explanation. Learning questions belong at the end of practical work; no quiz gate or delegation.

## Last completed user action

User-created .github/workflows/ci.yml reviewed: assigned checkout@v7/pnpm setup@v3 Node24/install false, frozen install, format/lint/Nx uncached checks retained. Attachment supplies frozen install pnpm12.10.1/up-to-date lock, formatter/check pass, lint/all3 names/no diagnostics, contracts/Desk/API typechecks/builds and API one passing health test. Nx cache skipped; final explicit0. This is current local evidence, not clean-checkout or GitHub runner execution. Formatter pass predates this progress update.

## Exact next working chunk

User formats docs/progress, stages maintained workflow/foundation/docs files and supplies git diff --cached --stat and --check with exit status. Review staged scope before assigning commit. GitHub repository URL/create-private preference requested via input question; no remote currently configured. Remote setup/push/Actions result follow after staged review and user-owned commit. No assistant Git mutations or implementation commands.

Faster pacing requested: coherent edit-and-check chunks, focused explanations, no routine save-only turns/redundant preparation probes. Scope and required gates retained. Optional L11 recap: HTML/main/App entry and tsc noEmit versus Vite build; no quiz gate. Static Node rule does not cover dynamic imports. Broader architecture boundaries still pending.

## Retained L11 work and evidence

Desk manifest/tags, strict browser TS config, React entry/App, HTML, Vite config and dev/typecheck/build/preview scripts are user-built and reviewed. Supplied Nx discovery and current-source typecheck pass with exit 0. Supplied first production build passes with exit 0; emitted HTML/bundle reviewed. Dev and preview display/no errors are user-reported; fresh runtime logs absent. Cleanup exit 0 recorded; no known retained Desk server, no fresh process inventory.

Root typed/Nx lint scopes include TSX. Supplied JSON inventory has exactly eight eligible files with no diagnostics/exit 0. Browser Nx constraint rejects runtime:server internal targets and Fastify/pg external dependencies. Fastify re-export and temporary contracts runtime:server tag probes both fail as expected/exit 1; cleanup is reviewed and restored lint exit 0 supplied. PostgreSQL/subpath bans not individually exercised. Node rule baseline plus both denials and restored green evidenced; probe removed.

## Retained earlier lessons and limits

L09 first health inject test/red-green/recap complete. L10 focused normal startup/liveness/signals/occupied-port/build-start foundation retained; active-request draining/deadline/failure unverified. L07 focused task ordering/cache reuse/output restoration/source-dependency invalidation and recap complete; fresh-checkout/CI/shared-root invalidation unverified. L08 formatting/typed lint/current-package boundaries and recap retained; wider engine/UI/ERP boundary gates incomplete. Preserve TS7 CLI and TS6 compiler-API alias.

M0 remains in progress. All 116 parity features remain not_started. No automated progress harness exists. CI workflow configured, remote run pending. Working-tree work remains uncommitted; no commit assigned. Latest supplied formatter pass predates this progress update; no post-update result claimed. No assistant implementation edits or install/build/test/lint executions performed. Do not equate files, node_modules or dist with fresh check execution or parity.

Details: [Desk session](sessions/2026-10-10-desk-bootstrap.md), [current summary](CURRENT.md), [manual state](state.json). Read older session notes only when current checkpoint lacks needed detail.

Latest CI evidence: [CI session](sessions/2026-10-11-ci-foundation.md).

Staging checkpoint: user supplied37-file stat/5096 insertions/353 deletions and whitespace check exit0. Read-only staged source/inventory confirms intended Desk/tooling/workflow/docs/lock scope, no generated outputs or temporary probes. Next: format/restage progress docs, check formatting/staged whitespace, user commit with message feat: add Desk bootstrap and automated foundation checks, inspect log/status. Commit and remote CI pending; GitHub repository question unanswered.
