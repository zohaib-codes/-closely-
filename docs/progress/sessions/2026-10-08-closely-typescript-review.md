# 2026-10-08 — Closely naming and TypeScript review

User confirms project name Closely and creation of closely-workspace root manifest and @closely/api manifest. User explicitly reports no packages installed. Read-only inspection confirms both manifests, pnpm-workspace.yaml, apps/api/src, and absent root node_modules/lockfile.

User asks why not TypeScript 7. Official release announcement confirms stable release on July 8, 2026, native Go compiler and no TypeScript 7.0 programmatic compiler API. Microsoft documents side-by-side TS7 CLI with TS6 API tooling via aliases. Registry inspection confirms typescript 7.0.2, @typescript/typescript6 6.0.2 and typescript-eslint 8.71.1 with TypeScript peer range >=4.8.4 <6.1.0.

Sources: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/ and https://typescript-eslint.io/users/dependency-versions/ . These facts inform dependency selection; no Closely compiler/lint/editor/Nx integration has been tested yet.

Recommendation proposed: native TS7 typechecking/builds and a pinned TS6 compatibility package exposed under the typescript name for compiler-API tools, following Microsoft's documented alias pattern. Earlier TS6-only pin was conservative for tooling support, not evidence that TS7 is a preview or unsuitable for production. Do not silently change user manifests or execute installation. Confirm exact commands/aliases when proceeding; use @closely/api.

Assistant updated documentation only. Next: resolve the user's compiler question, then teach the selected dependency installation; no conceptual quiz prerequisite. No automated runtime checks exist.
