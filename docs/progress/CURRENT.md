# Closely — current project state

Updated 2026-10-11. User implements and runs commands; assistant teaches, reviews read-only and maintains documentation. M0 remains in progress; all 116 parity features remain not_started.

L11 Desk bootstrap is user-built: manifest/Nx tags, React19.3.0 runtime/types, Vite8.3.4/plugin6.1.2, Node-run Vite config, strict browser tsconfig, App.tsx/main.tsx, HTML and dev/typecheck/build/preview scripts reviewed. Supplied Nx discovery and current-source typecheck pass/exit0. Supplied first production build passes/exit0; generated HTML/bundle inspected. Dev and production-preview display/no errors user-reported, fresh logs absent. Cleanup exit0 recorded; no known retained Desk server, no fresh process inventory.

Root typed/Nx ESLint scopes now include TSX. Supplied JSON inventory exactly8 eligible files, no diagnostics/exit0. Browser constraint rejects runtime:server internal targets and Fastify/pg external dependencies. Fastify type-export and temporary internal server-tag negatives fail as expected/exit1, restored lint passes/exit0. Cleanup confirmed read-only: App original and contracts tags platform/contract only. PostgreSQL ban/subpaths not individually exercised.

L11 practical checks complete for current Desk slice: both Node spellings rejected/exit1, cleanup reviewed, restored root lint supplied exit0 and formatting supplied exit0. Formatting covers files before this progress update. Recap pending; dynamic imports and broader boundaries unverified. Faster coherent user-owned edit-and-check pacing retained.

L12 foundation CI complete: user pushed main; read-only gh verified successful fresh-runner run38086470833 for04f93c6, frozen install/format/lint/uncached typecheck,test,build and one health test. L13 isolated reference bootstrap passed/exit0 at pinned Frappe16.51.0 commit, assets built and reference.localhost created.

Retained foundation: L09 first-health-test/red-green/recap complete. L10 normal startup/liveness/signals/occupied-port/build-start evidence retained; active-request drain/shutdown deadline/failure unverified. L07 focused ordering/cache exercises/recap complete; fresh-checkout/CI/shared-root invalidation unverified. L08 formatter/typed lint and initial boundaries evidenced. TS7 CLI and TS6 compiler-API alias retained.

First committed foundation CI run passed. No progress harness or parity certification. Foundation committed; this progress update leaves documentation changes uncommitted. Latest supplied formatter pass predates this progress update; no post-update pass claimed. Detailed evidence: [Desk session](sessions/2026-10-10-desk-bootstrap.md), [lint session](sessions/2026-10-10-lint-resume.md), [checkpoint](HANDOFF.md), [state](state.json).

Latest CI evidence: [CI session](sessions/2026-10-11-ci-foundation.md).

L14 capture/provenance: User formatted fixture manifest then supplied six sha256sum --check OK lines for compose/bootstrap/manifest/three raw responses. Assistant reviewed manifest and SHA256SUMS read-only; pinned source, previously verified tools, captured timestamp and requests agree with recorded evidence. No fresh runtime tool inventory or independent checksum execution claimed. Raw200/message pong,200/data pong and403/PermissionError responses reviewed.

L15 staged checkpoint: User staging batch supplies root format/check pass, all6 strict checksum OKs, staged whitespace check reached summary,19 staged files640 insertions24 deletions. Terminal remains in pager at END; final shell status not supplied yet. Assistant read-only index review confirms intended attrs/workflow/progress/harness/reference infra/parity files only; hashes of6 staged blobs match staged SHA256SUMS. .gitattributes preserves raw HTTP bytes. Prior parity typecheck/13 tests/lint final0 retained.

Next: User exits Git pager with q. After latest progress edits, format docs/progress, root format:check, restage docs/progress, git --no-pager diff --cached --check, commit test: add pinned Frappe reference fixtures and comparator, git push, echo status. Supply commit/push output; assistant then verifies new remote CI for exact commit. No new remote result assumed. Keep local reference services/HTTP running until explicit cleanup lesson.
