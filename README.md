# Closely — TypeScript Frappe rebuild

The goal is to build Frappe-like framework behavior in TypeScript, then an ERPNext-equivalent app on top. The behavioral baseline is Frappe v16.51.0, pinned in [reference-lock.json](docs/research/reference-lock.json).

**Current state: user-built API and contracts foundation; M0 remains in progress.** The workspace contains a Fastify API with a liveness route, guarded shutdown, an inject test, typecheck/build/start scripts, and a shared health-response contract consumed through a local workspace dependency. Builds, compiler rejection exercises, and earlier runtime/test checks have recorded evidence; supplied output and user reports are distinguished in [current status](docs/progress/CURRENT.md) and [task state](docs/progress/state.json). Nx, lint/boundary enforcement, Desk, CI and an attested reference runtime remain future work. The earlier assistant scaffold was removed on 2026-10-08. Architecture and stack documents describe the intended system.

The user writes files and runs commands. The assistant explains each step before it is performed, reviews the result and helps record progress. See [working agreement](docs/learning/WORKING-AGREEMENT.md) and [agent instructions](AGENTS.md).

Start with [session startup](docs/progress/START-HERE.md), [current status](docs/progress/CURRENT.md) and [task state](docs/progress/state.json).

Preserved design references:

- [Engineering handbook](docs/engineering/handbook.md), [project structure](docs/engineering/project-structure.md), [coding conventions](docs/engineering/coding-conventions.md).
- [Errors and API](docs/engineering/errors-and-api.md), [documents and data](docs/engineering/data-and-documents.md), [frontend](docs/engineering/frontend.md), [testing and operations](docs/engineering/testing-and-operations.md).
- [Stack](docs/architecture/stack.md), [decisions](docs/architecture/decisions.md), [research sources](docs/research/sources.md).
- [Parity specification](docs/parity/frappe-v16.51.0.md), [feature tracker](docs/parity/features.json), [acceptance scenarios](docs/parity/acceptance-scenarios.md), [future harness design](docs/parity/harness.md).

Archived upstream snapshots under docs/research are evidence, not product code or required reading for the learner. All tracked Frappe parity capabilities remain not started; foundation work does not establish parity.

Teaching plan: [roadmap](docs/learning/ROADMAP.md), [official reading guide](docs/learning/READING-GUIDE.md), [first conceptual lesson](docs/learning/LESSON-00.md).

Switching chats: use the [current checkpoint](docs/progress/HANDOFF.md) and [reusable new-chat prompt](docs/progress/NEW-CHAT-PROMPT.md). Teaching style and implementation ownership persist in AGENTS.md and the working agreement.
