# Official reading guide

Before first use, give the exact relevant sections, a reading goal and a version appropriate to the dependency we are installing. Current web pages explain tools; they do not override pinned Frappe behavior. Do not read or install everything now.

## L00 — read now

| Source | Focus | Question to answer |
| --- | --- | --- |
| [Git tutorial](https://git-scm.com/docs/gittutorial) | Importing a new project; making changes | What is saved by a commit, and how is history different from a folder? |
| [pnpm workspaces](https://pnpm.io/workspaces) | Workspace definition and workspace protocol | How do separately named packages share one repository and depend on each other locally? |
| [Nx: what is a monorepo?](https://nx.dev/docs/kb/what-is-a-monorepo) | Monorepo organization and shared tooling | What belongs together, and what tradeoffs follow? |
| [TypeScript modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) | Module scope; import/export | How does a source file expose a public symbol to another file? |
| [Frappe apps](https://docs.frappe.io/framework/user/en/basics/apps) | App responsibilities | How is an installed business app different from the framework that executes it? |

Read the explanations; no commands from these pages need to be run in this lesson. Nx/pnpm are future tools, not currently installed project infrastructure. The Frappe page is conceptual context; tagged v16.51.0 evidence settles compatibility specifics.

## Subsequent foundation readings

[TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) introduces types; later lessons select narrowing, generics and module-resolution sections. [Nx module boundaries](https://nx.dev/docs/features/enforce-module-boundaries) explains enforceable dependency rules. Node packages/ESM, pnpm package manifests and ESLint/Prettier/Vitest/CI documentation will be linked and verified before their individual installation/configuration lessons.

## Later stages — starting points, not current assignments

| Stage | Official starting points |
| --- | --- |
| M1 storage | [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html), [Kysely introduction](https://www.kysely.dev/docs/intro) |
| M3 HTTP | [Fastify TypeScript](https://fastify.dev/docs/latest/Reference/TypeScript/) |
| M4 browser | [React learn](https://react.dev/learn) |
| M5 workers | [BullMQ introduction](https://docs.bullmq.io/) |
| Browser verification | [Playwright introduction](https://playwright.dev/docs/intro) |

The full library inventory lives in [stack.md](../architecture/stack.md). Every library there, including state/UI/auth/date/decimal/printing/telemetry utilities, receives its own relevant official reading and decision explanation before use. This initial guide does not assert that every future library has already been individually researched or version-locked.
