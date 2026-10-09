# Build checkpoint resume — 2026-10-09

## Reviewed
Read AGENTS.md, startup/checkpoint/current state, working agreement, roadmap, engineering handbook and project structure. Reviewed API manifest, both API TypeScript configs, shared config, app.ts, server.ts and app.test.ts; inspected dist file inventory. Files match the checkpoint. No implementation changes or install/build/test commands performed.

## User work and evidence
No new user implementation or check output in this session. Prior supplied-output versus user-reported evidence remains unchanged. Existing dist files do not establish a fresh successful build. Shutdown draining/deadline/failure paths remain unverified.

## Pending single step
Resume the two unanswered end-of-session build/start recap questions: which version start executes after a source edit without rebuilding; why tests remain in typecheck but are excluded from runtime build. These close the previous session and are not a new implementation gate. Then choose one focused remaining M0 lesson. No new implementation command assigned.

## Recap and next lesson
User answered both build/start questions correctly: old emitted code runs without rebuilding; tests need typechecking but are excluded from runtime output. Assistant clarified dist/server.js behavior. L05 strictNullChecks exercise selected from the remaining M0 gate. Official TypeScript strictNullChecks documentation linked; temporary string/null mismatch explained. User is to edit the health handler and run the existing filtered typecheck. No edit/output supplied yet; restoration to status ok and a green check remain required afterward. This is a disposable compiler exercise, not product/parity progress.

## Strict null rejection evidence
User supplied filtered typecheck output: TS2322 at app.ts:9, null not assignable to string, one error, script exit 1. Read-only source confirms assignment and an additional unused constrainedMemory import from process. Expected failure recorded; restore original status ok handler and remove unused import, then obtain green typecheck. No assistant implementation edits or checks run.

## Restoration reviewed
User reports no output from typecheck. Source confirms status ok restored. Expected rejection and subsequent pass complete at supplied-failure/user-reported-pass evidence levels. Unused constrainedMemory import still present despite prior cleanup instruction; remove it next. Current configuration does not enable noUnusedLocals, so this passing typecheck does not establish unused-import cleanliness. No assistant implementation edits or check execution.

## Import cleanup confirmed
User reports cleanup done. Read-only app.ts review confirms constrainedMemory import removed and status ok retained. No new checks run or claimed. Next single step is end-of-exercise recap: why explicit string/null assignment fails while an inferred null variable is valid. No implementation command pending; next M0 lesson selection follows recap.

## Recap and contract lesson
User correctly explains explicit string/null mismatch and omitted annotation. Assistant clarified TypeScript infers null for the unannotated const; independent restatement not assessed. L06/L04 selected: define packages/contracts/src/health.ts with exported HealthResponse type and status literal ok. Contracts owner follows project-structure.md; health is native foundation work, not Frappe parity. Read errors-and-api.md, workspace patterns and parity inventory; no packages directory exists. Official TypeScript Everyday Types sections Type Aliases and Literal Types linked. User writes only the focused type file now; manifest/config/exports/local dependency and meaningful compiler checks follow in dependent steps. No source created by assistant; no checks run.

## Contracts source reviewed; manifest assigned
User reports health.ts written; read-only review confirms exact type. package.json absent. Next user action: create private ESM @closely/contracts manifest with typecheck/build scripts and root exports mapping types to dist/health.d.ts, default to dist/health.js. Official Node 24 package entry points/conditional exports and TypeScript package exports docs linked. Compiled package approach selected: consumer uses generated declarations without pulling source outside API rootDir; contracts must build first. No new dependency needed. TS config, actual emission, workspace link, consumer and denied deep-import checks remain pending.

## Manifest reviewed; declaration build assigned
User reports manifest complete; read-only review confirms correct private ESM identity, scripts, exports order and paths. Next: user creates contracts tsconfig inheriting root strict config, ES2024/NodeNext, lib ES2024, types [], src/dist roots, declaration/noEmitOnError true and src include; runs filtered build and supplies output. Official TypeScript declaration/types/lib docs linked. Explain declarations versus erased type-only JS, no implicit Node/DOM globals, and that explicit imports are not blocked by types []. Config/emission/check not yet observed. Workspace linking, API consumer and denied deep-import verification remain pending.

## Contracts build reviewed; local dependency assigned
Supplied tsc invocation returned to prompt without diagnostics; exact command line not pasted. Config matches lesson; emitted health.d.ts preserves HealthResponse/status ok and health.js contains export {}. Additional supplied install-style output does not prove an API contracts link; current lockfile search has no contracts match and API manifest has only Fastify. Next: user adds @closely/contracts workspace:* under API devDependencies and runs root pnpm install. Type-only consumption explains devDependency placement; runtime imports later require dependencies. Official pnpm workspace protocol/install docs linked. Manifest/link/lock review and API type import still pending.

## Local link reviewed; consumer assigned
User reports dependency/install done. Manifest has API devDependency workspace:*; lockfile records link:../../packages/contracts; readlink resolves local package. No install terminal output supplied. Next user action: app.ts imports HealthResponse with import type from package root and annotates async handler Promise<HealthResponse>; run filtered API typecheck and supply output. Official TypeScript type-only imports/Promise return docs linked. Resolution/pass not yet established; denied deep-import and emitted import erasure checks remain future steps.

## Public consumer reviewed; deep import exercise assigned
User reports no-output API typecheck. Source confirms root type-only import and Promise<HealthResponse> handler; passing result user-reported, no fresh terminal output. Next: temporarily import @closely/contracts/dist/health.js and run filtered API typecheck. Existing dist file is intentionally unexported; expect module-resolution rejection. Restore root and green check after reviewing failure. This demonstrates package-specifier encapsulation, not filesystem security or ESLint enforcement against relative paths.

## Deep-import rejection evidence
User supplied filtered typecheck failure: TS2307 at app.ts:2 for @closely/contracts/dist/health.js, one error, exit 1. Expected unexported-subpath rejection demonstrated. Next single action: restore package-root type import and rerun filtered API typecheck. Restoration/green result pending; no assistant implementation edits/checks.

Read-only review in the same turn finds the public root import already restored. Only the post-restoration filtered typecheck remains the next action; no need to ask user to repeat the edit.

## Root import green; literal contract exercise assigned
User reports restored filtered API typecheck produced no output. Deep-import rejection/restoration complete at supplied-failure/reported-pass evidence levels. Next single step: temporarily change health response status to wrong, retain Promise<HealthResponse>, and run filtered API typecheck. Expect literal mismatch; restore ok and green check afterward. No changes/rebuild to contracts needed. Dist type declaration reviewed with literal ok. Emitted API type import erasure still unverified.

## Literal contract rejection evidence
Supplied TS2322 app.ts:11 rejects wrong against ok and cites contracts/dist/health.d.ts:2; one error, exit 1. This directly demonstrates consumer use of the generated public declaration. Read-only current source already restores ok. Next single action is filtered API typecheck; green result pending. API emission/erasure review remains afterward. No assistant runtime edits/check execution.

## Contract restoration green; API emit check assigned
User reports post-restoration typecheck no output. Source retains public type import, Promise<HealthResponse> and status ok. Next user command: pnpm --filter @closely/api run build; supply output, then assistant reviews emitted app.js for type import erasure. Existing dist alone is not evidence of a fresh build. No runtime smoke repetition assigned because runtime behavior unchanged. Closing L06/L04 recap follows emission verification; M0 remains incomplete.

## API emitted import erasure verified
User supplied exact filtered build command, tsc tsconfig.build.json invocation and returned prompt without diagnostics. Read-only generated app.js preserves Fastify and status ok route, erases HealthResponse import/annotation and removes old constrainedMemory import. Dist inventory has API app/server JS, contracts health JS/declaration, no test output. L06/L04 foundation example demonstrated (public consumer/local dependency/denied deep import/contract mismatch/emission), recap pending. Next: ask which declaration the compiler reads and why no runtime contracts import remains; why workspace:* for internal dependency. No implementation command pending; broader M0 gates remain incomplete. No new runtime smoke or parity claim.
