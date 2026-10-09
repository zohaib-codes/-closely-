# Closely — current learning checkpoint

Updated 2026-10-10 after completed contracts recap and selection of Git foundation. Read AGENTS.md, START-HERE.md, learning/WORKING-AGREEMENT.md, CURRENT.md/state.json and learning/ROADMAP.md. User writes code/runs commands; assistant teaches, reviews read-only and maintains docs. One manageable step, official reading and explanations; comprehension questions at session end.

## Last completed user work
User added API package scripts: typecheck, test, build and start. Created apps/api/tsconfig.build.json inheriting ./tsconfig.json, enabling noEmitOnError and excluding src/**/*.test.ts. User compiled and ran emitted JavaScript directly, then through named build/start scripts; confirmed expected health body and cleanup exit 0. Assistant edited only progress docs and ran no implementation/build/test commands.

Prior health inject lesson remains complete: supplied initial passing test and deliberate body-assertion failure, restored pass/typecheck by user report, and correct recap. Do not repeat that lesson or install tools again.

## Actual files reviewed
apps/api/package.json scripts: typecheck = tsc --project tsconfig.json --noEmit; test = vitest run src/app.test.ts; build = tsc --project tsconfig.build.json; start = node dist/server.js. Build config reviewed, and dist contains app.js/server.js with no emitted test. Generated code reviewed earlier: erased types, ESM ./app.js import, status ok health route and shutdown timer cleanup preserved. Final handoff re-inspected manifest/build config and output inventory read-only.

Source roles unchanged: app.ts constructs Fastify/routes; server.ts listens on 127.0.0.1:3000 and handles guarded signals with a 10-second unrefed watchdog and finally/clearTimeout; app.test.ts asserts HTTP 200 and exact body with finally close. Existing Node 24/pnpm/TS tooling and Fastify/Vitest dependencies require no reinstall.

## Evidence and limits
- Named typecheck: supplied compiler invocation and returned prompt without diagnostics.
- Named test: user reported testpassed; fresh summary not supplied. Earlier first-test output remains historical evidence.
- Initial build: no errors/new dist files by user report plus read-only output review.
- Direct compiled run: supplied GET /health/live HTTP 200 logs for PID 117446; cleanup exit 0 user-reported. Startup banner/body were not separately supplied for that run.
- Named build: first invocation supplied compiler command and returned prompt without diagnostics; second invocation excerpt lacks final prompt.
- Named start: supplied node dist/server.js and listening log for PID 118608.
- Named-run body/cleanup: user replied yes , got 0 to requested expected-body confirmation and Ctrl+C/echo $?; recorded body and exit 0 as user-reported, no fresh response/shutdown logs supplied.
No known retained project service after reported cleanup; no fresh process inventory performed. Successful startup and health do not prove active-request draining, shutdown deadline/failure paths or production deployment readiness. noEmitOnError does not clean stale output; cleanup strategy remains future work.

## Understanding and exact resume point
Build/start recap completed: old emitted code runs without rebuild, tests need typechecking but are excluded from runtime output. Null exercise recap completed; assistant clarified unannotated const initialized to null still infers null.

L06/L04 foundation example now demonstrated. User created packages/contracts/src/health.ts (exported HealthResponse/status literal ok), private ESM manifest with public root types/default exports, and strict declaration-build config. Contracts emission reviewed with health.d.ts and empty-module health.js. API devDependency workspace:* recorded as local link in lockfile/node_modules; installation user-reported without terminal output. Public type-only consumer and Promise<HealthResponse> handler reviewed. Supplied TS2307 proves unexported package subpath rejection; supplied TS2322 citing contracts/dist/health.d.ts proves literal mismatch rejection. Restored green checks user-reported.

Fresh API build supplied exact filtered command/compiler invocation and returned prompt without diagnostics. Emitted app.js reviewed: Fastify and status ok handler retained, contracts type import/annotation and old constrainedMemory import absent. No new runtime smoke. Package encapsulation demonstrated for package specifiers, not filesystem-relative imports; lint enforcement pending.

L06/L04 recap completed on 2026-10-10: user correctly identifies generated declaration usage/type import erasure and workspace:* local-only resolution.

L01 root .gitignore created by user and reviewed: node_modules/ and dist/. Git ignore behavior not yet verified. Prior read-only Git inspection reports no repository.

User Git initialization on main passed using supplied output and read-only branch/status review. Status shows untracked source/config/docs, no staged entries observed.

Ignore verification passed using supplied exact check-ignore output: root/nested node_modules ignored by line 1, API/contracts dist by line 2, source and lockfile unignored (:: fields).

User supplied corrected staged .gitignore diff with final newline. Read-only index confirms only .gitignore staged. Git author identity unavailable on read-only git var check; no values printed or retained.

First ignore-only commit bcf7bac (chore: ignore dependencies and build output) supplied and confirmed by read-only log; one file/two insertions. Other foundation/docs files remain untracked. Author identity usable; values not retained.

Foundation staging supplied: 13 files/1878 insertions. Read-only staged source/config and inventory reviewed, matching intended API/contracts/workspace files; no dist/node_modules. Existing formatting differences deferred to formatting lesson. Prior test/build evidence unchanged; no fresh checks executed.

Foundation commit 8ba5d24 supplied (13 files/1878 insertions) and read-only log confirmed. Only AGENTS.md/README.md/docs remain untracked. Documentation inventory and research provenance reviewed; reference snapshots are evidence outside product packages. Assistant corrected stale README empty-app/no-runtime summary to present foundation and evidence limits.

Documentation staged scope reviewed: supplied summary has 79 files/21492 insertions; index inventory matches AGENTS/README/docs. Read-only SHA256 comparison of 29 staged snapshots against staged reference lock has no mismatches. This does not attest live reference runtime or parity. Assistant refreshed progress docs after staging.

Next single action: git add docs/progress, then git commit -m "docs: preserve engineering guidance and learning checkpoints"; supply output. Restaging captures these progress updates. Documentation commit pending; no assistant Git mutations. Then review status/history and close L01 recap.

## Remaining M0 scope
Build foundation has progressed; M0 and SCAFFOLD-001 remain in progress. The public exports/local workspace dependency foundation example is now demonstrated. Nx task/cache graph, formatting/lint/boundaries, Desk shell, CI and attested reference baseline remain incomplete. Strict-configuration rejection exercise and broader operational coverage are not established. All 116 parity features unchanged; tooling work earns no parity claim. No automated progress harness exists.

Latest session: sessions/2026-10-10-git-foundation.md. Contracts lesson: sessions/2026-10-09-build-checkpoint-resume.md. Build evidence session: sessions/2026-10-09-api-build.md. Earlier package-script details: sessions/2026-10-09-package-scripts-resume.md. Earlier first-test recap: sessions/2026-10-09-source-review-resume.md. Architecture unchanged; separate build config is routine L05/L10 foundation work.
