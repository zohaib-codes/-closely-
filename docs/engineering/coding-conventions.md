# Coding conventions

Twenty's pinned contributor guide informs named exports, types over interfaces, descriptive names, literal unions, functional React components, limited comments, and behavior-based tests. These are adapted rules; we do not adopt Twenty-specific Jotai, Linaria, GraphQL decorators, or commands.

## TypeScript

- Enable `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `useUnknownInCatchVariables`, and consistent casing. Target native ESM for server packages.
- Use `unknown` for untrusted JSON, caught exceptions, script results, provider responses, and user-defined records; validate before narrowing.
- No `any`, `@ts-ignore`, non-null assertions, double casts, or unchecked `as` at trust boundaries. A library interop exception must be local, explained, and checked by a test.
- Prefer `type` aliases and discriminated unions. Interfaces are appropriate for extension/augmentation or adapter contracts.
- Prefer string-literal unions over TS enums. Protocol strings and numeric docstatus values retain reference semantics.
- Use descriptive generic names and parameter names. Named exports only, except tooling that explicitly requires a default export.
- `undefined` means omitted/not loaded; `null` means explicit empty value where a field permits it. PATCH omission preserves the old value. Never normalize these globally without field policy.

## Naming and formatting

Kebab-case TS filenames; PascalCase React component filenames. Functions/variables camelCase, types/classes PascalCase, constants SCREAMING_SNAKE_CASE. Database and external DocField names use snake_case. IDs, names, references, and timestamps are distinct concepts; avoid ambiguous `data` where a meaningful noun exists.

Prettier owns formatting. ESLint owns correctness rules and boundary constraints. Do not manually reformat unrelated modules. All human-facing strings use i18next; stable error codes are not translated. Comments explain constraints and reasoning. Concise TSDoc is allowed for public SDK contracts; do not forbid useful generated SDK documentation just because upstream prefers line comments.

## Functions and modules

One module owns one responsibility. Composition roots wire dependencies. Pure calculations use explicit inputs. Async side effects are awaited or placed in a tracked queue; no floating promises. Use bounded concurrency for imports, schema operations, and external providers.

No mutable process-global tenant/user/transaction. AsyncLocalStorage may propagate tracing context; correctness must still use an explicit immutable operation context. Never share one checked-out transaction connection across unrelated requests.

Reuse established helpers before adding new ones. Avoid speculative base classes, universal repositories, and generic workflow DSLs. A feature-specific abstraction is introduced when its actual callers and contract exist.

## Validation and configuration

Validate HTTP, job payloads, provider replies, app manifests, and metadata at their boundaries. DTOs cannot mutate trusted actor/site flags. Normalize dynamic schemas to an allowed grammar with bounded sizes/depth before compiling. No `eval` for field conditions or formulas; use a maintained expression parser with our allowlisted evaluator.

Read environment configuration once at startup; validate types and fail with a clear redacted error. Keep site-specific configuration versioned and scoped. Provider secrets are never serialized to the browser.

## Extensions and compatibility

Public SDK APIs have typed inputs, documented lifecycle/transaction context, and compatibility tests. App authors do not import internal file paths. Generated files are reproducible and marked generated; edit generators/definitions instead.

Changing document names, hook order, field normalization, template behavior, or response semantics requires an explicit parity review. Production migrations are append-only. Add a regression scenario for every correctness/security bug fixed.
