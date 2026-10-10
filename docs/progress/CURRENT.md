# Closely — current project state

Updated 2026-10-11. User implements and runs commands; assistant teaches, reviews read-only and maintains documentation. M0 remains in progress; all 116 parity features remain not_started.

L11 Desk bootstrap is user-built: manifest/Nx tags, React19.3.0 runtime/types, Vite8.3.4/plugin6.1.2, Node-run Vite config, strict browser tsconfig, App.tsx/main.tsx, HTML and dev/typecheck/build/preview scripts reviewed. Supplied Nx discovery and current-source typecheck pass/exit0. Supplied first production build passes/exit0; generated HTML/bundle inspected. Dev and production-preview display/no errors user-reported, fresh logs absent. Cleanup exit0 recorded; no known retained Desk server, no fresh process inventory.

Root typed/Nx ESLint scopes now include TSX. Supplied JSON inventory exactly8 eligible files, no diagnostics/exit0. Browser constraint rejects runtime:server internal targets and Fastify/pg external dependencies. Fastify type-export and temporary internal server-tag negatives fail as expected/exit1, restored lint passes/exit0. Cleanup confirmed read-only: App original and contracts tags platform/contract only. PostgreSQL ban/subpaths not individually exercised.

L11 practical checks complete for current Desk slice: both Node spellings rejected/exit1, cleanup reviewed, restored root lint supplied exit0 and formatting supplied exit0. Formatting covers files before this progress update. Recap pending; dynamic imports and broader boundaries unverified. Faster coherent user-owned edit-and-check pacing retained.

L12 workflow user-created and reviewed. Supplied local frozen install (pnpm12.10.1/up-to-date lock), format/check, lint and uncached Nx contracts/Desk/API typechecks/builds plus one API health test succeed; final exit0. No clean-checkout or GitHub runner evidence. No Git remote. Next user chunk formats updated progress docs, stages maintained foundation/workflow/docs and supplies staged stat/check for review. GitHub repository URL/create-private preference requested; commit/push/remote CI follow. Faster coherent user-owned pacing retained.

Retained foundation: L09 first-health-test/red-green/recap complete. L10 normal startup/liveness/signals/occupied-port/build-start evidence retained; active-request drain/shutdown deadline/failure unverified. L07 focused ordering/cache exercises/recap complete; fresh-checkout/CI/shared-root invalidation unverified. L08 formatter/typed lint and initial boundaries evidenced. TS7 CLI and TS6 compiler-API alias retained.

CI workflow configured; remote execution pending. No progress harness or parity certification. Working-tree changes uncommitted; no commit assigned. Latest supplied formatter pass predates this progress update; no post-update pass claimed. Detailed evidence: [Desk session](sessions/2026-10-10-desk-bootstrap.md), [lint session](sessions/2026-10-10-lint-resume.md), [checkpoint](HANDOFF.md), [state](state.json).

Latest CI evidence: [CI session](sessions/2026-10-11-ci-foundation.md).

Staging checkpoint: user supplied37-file stat/5096 insertions/353 deletions and whitespace check exit0. Read-only staged source/inventory confirms intended Desk/tooling/workflow/docs/lock scope, no generated outputs or temporary probes. Next: format/restage progress docs, check formatting/staged whitespace, user commit with message feat: add Desk bootstrap and automated foundation checks, inspect log/status. Commit and remote CI pending; GitHub repository question unanswered.
