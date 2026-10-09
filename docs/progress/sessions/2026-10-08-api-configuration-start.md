# 2026-10-08 — API configuration start

User requested next step. Read-only inspection confirms root TS7/TS6 aliases, tsx/Node types, API Fastify, dependency tree and lockfile. No runtime source files are present. pnpm-workspace.yaml contains allowBuilds.esbuild: set this to true or false; installation is not yet considered fully verified.

Resolved esbuild is 0.28.2, a transitive tsx dependency with node install.js postinstall. Official pnpm build-settings docs confirm version-scoped allowBuilds and unreviewed placeholders. User instructions will replace this with esbuild@0.28.2: true and rerun pnpm install; assistant did not edit that config or execute install.

Next user work: shared strict TS configuration, API NodeNext/ES2024 configuration and named-export createApi factory with /health/live. Typecheck using pnpm exec tsc --project apps/api/tsconfig.json --noEmit. Factory does not listen yet; listener/graceful shutdown is a subsequent lesson. No compiler checks or server tests run by assistant; success is not assumed.

Only documentation/progress/ADR updated by assistant. Await user changes/output before advancing. No quizzes before coding.
